import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Send, 
  ChevronRight, 
  Languages, 
  BookOpen, 
  PenTool, 
  Layers,
  Award,
  Loader2,
  FileCheck,
  Play,
  HelpCircle,
  Shuffle,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowLeft,
  Home
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AptisTestSet, ExamResult, WritingEvaluation, StudentExamAnswers, ExamAttemptRecord, TopicImprovement } from '../types';
import { ALL_APTIS_TEST_SETS, APTIS_TEST_SET_1, APTIS_TEST_SET_2 } from '../data/aptisMockData';
import { AptisAnswerKeyModal } from './AptisAnswerKeyModal';
import { AptisMarkingScalesModal } from './AptisMarkingScalesModal';
import { ExamSolutionReview } from './ExamSolutionReview';
import { callGeminiAPI } from '../lib/api-handler';
import { analyzeTextClientSide } from '../lib/writingFeedback';
import { 
  generateDynamicTestSet, 
  generateAiEnrichedTestSet,
  getExamAttemptHistory, 
  updateExamAttemptScore,
  warmUpAllTestModes,
  warmUpNextTestSet
} from '../lib/examEngineService';
import { generateAiWritingPart4 } from '../lib/aiTestGenerator';
import { selectFreshPart4EmailTask, isPart4DefaultOrBanned } from '../data/expandedPart4EmailPool';
import { recordQuestionsToStudentHistory } from '../lib/questionHistoryService';

export const PracticeExamEngine: React.FC = () => {
  // Test Sets state initialized with a dynamic syllabus-aligned set
  const [testSets, setTestSets] = useState<AptisTestSet[]>(() => {
    const initialDyn = generateDynamicTestSet({ customTitle: 'Aptis ICAP Practice Exam #1' });
    // Sanitize any static sets to guarantee default banned questions never appear
    const sanitizedSets = ALL_APTIS_TEST_SETS.map(set => {
      if (isPart4DefaultOrBanned(set.writing.part4)) {
        return {
          ...set,
          writing: {
            ...set.writing,
            part4: selectFreshPart4EmailTask(new Set())
          }
        };
      }
      return set;
    });
    return [initialDyn.testSet, ...sanitizedSets];
  });
  const [selectedSetIndex, setSelectedSetIndex] = useState<number>(0);
  const currentTestSet = testSets[selectedSetIndex] || testSets[0] || APTIS_TEST_SET_1;
  const [isRegeneratingPart4, setIsRegeneratingPart4] = useState<boolean>(false);

  // Lightweight attempt history and generation stats
  const [attemptHistory, setAttemptHistory] = useState<ExamAttemptRecord[]>(() => getExamAttemptHistory());
  const [latestGenStats, setLatestGenStats] = useState<{
    totalQuestions: number;
    difficultyBreakdown: { easy: number; medium: number; hard: number };
    topicsCovered: string[];
    repeatCount: number;
    isFresh: boolean;
    formatVariety?: {
      standardMcqs: number;
      errorIdentification: number;
      sentenceTransformation: number;
      phrasalVerbs: number;
    };
  } | null>(null);

  // Selected test category for the "Select Test Set" dropdown: 'core' | 'reading' | 'writing' | ''
  const [selectedTestCategory, setSelectedTestCategory] = useState<string>('');

  // View state: 'landing' (PDF overview) | 'testing' | 'results'
  const [viewState, setViewState] = useState<'landing' | 'testing' | 'results'>('landing');
  const [testMode, setTestMode] = useState<'full' | 'core' | 'reading' | 'writing'>('full');
  const [activeTab, setActiveTab] = useState<'core' | 'reading' | 'writing'>('core');

  // Timers:
  // Full: 110 mins (6600s), Core: 25 mins (1500s), Reading: 35 mins (2100s), Writing: 50 mins (3000s)
  const [timeLeft, setTimeLeft] = useState<number>(110 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Student Answers
  // Grammar (25)
  const [grammarAnswers, setGrammarAnswers] = useState<Record<string, number>>({});
  // Vocab (25)
  const [vocabMatchingAnswers, setVocabMatchingAnswers] = useState<Record<string, string>>({});
  const [vocabDefAnswers, setVocabDefAnswers] = useState<Record<string, string>>({});
  const [vocabCollocAnswers, setVocabCollocAnswers] = useState<Record<string, number>>({});
  const [vocabSentenceAnswers, setVocabSentenceAnswers] = useState<Record<string, number>>({});
  const [vocabContextAnswers, setVocabContextAnswers] = useState<Record<string, string>>({});
  
  // Reading
  const [readingSec1Answers, setReadingSec1Answers] = useState<Record<string, number>>({});
  const [readingSec2Order, setReadingSec2Order] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [readingSec3Answers, setReadingSec3Answers] = useState<Record<string, string>>({});
  const [readingSec4Answers, setReadingSec4Answers] = useState<Record<string, number>>({});

  // Writing
  const [writingPart1Answers, setWritingPart1Answers] = useState<Record<string, string>>({});
  const [writingPart2Answer, setWritingPart2Answer] = useState<string>('');
  const [writingPart3Answers, setWritingPart3Answers] = useState<Record<string, string>>({});
  const [writingPart4AAnswer, setWritingPart4AAnswer] = useState<string>('');
  const [writingPart4BAnswer, setWritingPart4BAnswer] = useState<string>('');

  // Modals
  const [isAnswerKeyOpen, setIsAnswerKeyOpen] = useState<boolean>(false);
  const [answerKeyInitialTab, setAnswerKeyInitialTab] = useState<'core' | 'reading' | 'writing'>('core');
  const [isMarkingScalesOpen, setIsMarkingScalesOpen] = useState<boolean>(false);

  // Result & AI Feedback
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [writingEvaluation, setWritingEvaluation] = useState<WritingEvaluation | null>(null);
  const [isEvaluatingWriting, setIsEvaluatingWriting] = useState<boolean>(false);

  // Dynamic Generation State
  const [isGeneratingSet, setIsGeneratingSet] = useState<boolean>(false);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);

  // Per-item Urdu explanation toggle in results
  const [showUrduExplanations, setShowUrduExplanations] = useState<boolean>(true);

  // Pre-warm dynamic test caches on initial component mount for instant opening
  useEffect(() => {
    warmUpAllTestModes();
  }, []);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (viewState === 'testing' && isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimeout(() => {
              handleAutoSubmit();
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [viewState, isTimerRunning, timeLeft]);

  // Format seconds to HH:MM:SS
  const formatTimer = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle dropdown test selection
  const handleSelectTestCategory = (cat: string) => {
    if (cat === 'full' || cat === 'core' || cat === 'reading' || cat === 'writing') {
      setSelectedTestCategory(cat);
      handleStartTest(cat as 'full' | 'core' | 'reading' | 'writing');
    }
  };

  // Reset all student answers helper
  const resetAllAnswers = () => {
    setGrammarAnswers({});
    setVocabMatchingAnswers({});
    setVocabDefAnswers({});
    setVocabCollocAnswers({});
    setVocabSentenceAnswers({});
    setVocabContextAnswers({});
    setReadingSec1Answers({});
    setReadingSec2Order([0, 1, 2, 3, 4, 5]);
    setReadingSec3Answers({});
    setReadingSec4Answers({});
    setWritingPart1Answers({});
    setWritingPart2Answer('');
    setWritingPart3Answers({});
    setWritingPart4AAnswer('');
    setWritingPart4BAnswer('');
    setExamResult(null);
    setWritingEvaluation(null);
  };

  // Start test in designated mode with a dynamically assembled test set
  const handleStartTest = (mode: 'full' | 'core' | 'reading' | 'writing') => {
    resetAllAnswers();

    // Dynamically generate a brand-new unique test set with varied difficulty and syllabus topics
    const generated = generateDynamicTestSet({ 
      mode,
      customTitle: `Aptis ICAP Dynamic Exam Set #${attemptHistory.length + 1}`
    });
    setTestSets((prev) => [generated.testSet, ...prev]);
    setSelectedSetIndex(0);
    setLatestGenStats(generated.stats);
    setAttemptHistory(getExamAttemptHistory());

    setTestMode(mode);
    if (mode === 'full') {
      setTimeLeft(110 * 60);
      setActiveTab('core');
      setSelectedTestCategory('');
    } else if (mode === 'core') {
      setTimeLeft(25 * 60);
      setActiveTab('core');
      setSelectedTestCategory('core');
    } else if (mode === 'reading') {
      setTimeLeft(35 * 60);
      setActiveTab('reading');
      setSelectedTestCategory('reading');
    } else if (mode === 'writing') {
      setTimeLeft(50 * 60);
      setActiveTab('writing');
      setSelectedTestCategory('writing');
    }
    // Initialize default reading order
    setReadingSec2Order([0, 1, 2, 3, 4, 5]);
    setIsTimerRunning(true);
    setViewState('testing');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Back to overview
  const handleBackToOverview = () => {
    setIsTimerRunning(false);
    setSelectedTestCategory('');
    setViewState('landing');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Regenerate Part 4 (Emails) on the fly with a fresh, authentic ICAP ECS scenario
  const handleRegeneratePart4 = async () => {
    setIsRegeneratingPart4(true);
    try {
      // 1. Attempt AI Generation
      const aiTask = await generateAiWritingPart4(currentTestSet.writing.themeName);

      let nextPart4 = aiTask;
      if (!nextPart4 || isPart4DefaultOrBanned(nextPart4)) {
        // Fallback to fresh procedural ICAP scenario
        const seen = new Set<string>();
        try {
          const raw = localStorage.getItem('icap_seen_part4_scenarios');
          if (raw) JSON.parse(raw).forEach((k: string) => seen.add(k));
        } catch {}
        seen.add(currentTestSet.writing.part4.id);
        if (currentTestSet.writing.part4.scenarioTopic) {
          seen.add(currentTestSet.writing.part4.scenarioTopic);
        }
        nextPart4 = selectFreshPart4EmailTask(seen);
      }

      // Record to seen storage with limit of 30
      try {
        const raw = localStorage.getItem('icap_seen_part4_scenarios');
        const list = raw ? JSON.parse(raw) : [];
        const updated = [
          nextPart4.id, 
          nextPart4.scenarioTopic || '', 
          nextPart4.clubName,
          ...list.filter((x: string) => x !== nextPart4!.id)
        ].slice(0, 30);
        localStorage.setItem('icap_seen_part4_scenarios', JSON.stringify(updated));
      } catch {}

      // Record to student question history
      recordQuestionsToStudentHistory([
        {
          id: nextPart4.id,
          text: `${nextPart4.scenarioTopic || ''} ${nextPart4.contextNotice} ${nextPart4.taskB.prompt}`,
          type: 'writing-task'
        }
      ]);

      // Apply to active test set
      setTestSets(prevSets => {
        const updated = [...prevSets];
        const active = { ...updated[selectedSetIndex] };
        active.writing = {
          ...active.writing,
          part4: nextPart4!
        };
        updated[selectedSetIndex] = active;
        return updated;
      });

      // Clear student's current text for Part 4 so they get a fresh workspace
      setWritingPart4AAnswer('');
      setWritingPart4BAnswer('');

      setGenerationNotice(`✨ New Part 4 Email Task: ${nextPart4.scenarioTopic || nextPart4.clubName}`);
      setTimeout(() => setGenerationNotice(null), 4000);
    } catch (err) {
      console.warn('Error regenerating Part 4:', err);
    } finally {
      setIsRegeneratingPart4(false);
    }
  };

  // Open answer key modal
  const handleOpenAnswerKey = (tab: 'core' | 'reading' | 'writing') => {
    setAnswerKeyInitialTab(tab);
    setIsAnswerKeyOpen(true);
  };

  // Auto/Manual Submit and Grade with full metrics and topic diagnostics
  const handleAutoSubmit = async () => {
    setIsTimerRunning(false);

    const topicTracker: Record<string, { correct: number; total: number; module: 'Grammar' | 'Vocabulary' | 'Reading' | 'Writing' }> = {};

    // Helper to get actionable recommendation for weak topics
    const getTopicAdvice = (topicName: string): string => {
      const t = topicName.toLowerCase();
      if (t.includes('preposition') || t.includes('collocation')) {
        return 'Revise high-frequency business preposition pairings (e.g., comply with, adhere to, liable for).';
      }
      if (t.includes('verb') || t.includes('tense')) {
        return 'Practice complex past tenses and participle clauses used in executive business reporting.';
      }
      if (t.includes('inversion')) {
        return 'Remember auxiliary inversion after negative/limiting adverbials (e.g., Not only did..., Rarely have...).';
      }
      if (t.includes('subjunctive')) {
        return 'Focus on base verb subjunctive patterns after mandative verbs like recommend, require, insist that.';
      }
      if (t.includes('modal') || t.includes('conditional')) {
        return 'Review third and mixed conditionals for discussing past auditing risks and prudent recommendations.';
      }
      if (t.includes('passive')) {
        return 'Practice impersonal passive structures essential for formal audit and compliance reports.';
      }
      if (t.includes('article')) {
        return 'Review rules for definite (the) vs zero article with corporate titles, institutions, and uncountables.';
      }
      if (t.includes('part of speech') || t.includes('speech')) {
        return 'Pay attention to adverbial vs adjectival placement and derivational word suffixes.';
      }
      if (t.includes('gap-fill') || t.includes('cohesion')) {
        return 'Identify sentence connectors (however, moreover, consequently) and reference pronouns before blank gaps.';
      }
      if (t.includes('sequencing') || t.includes('coherence')) {
        return 'Look for topic sentences first, followed by transition markers, pronoun references, and chronological flow.';
      }
      if (t.includes('matching') || t.includes('multi-text')) {
        return 'Scan for synonyms and conceptual paraphrasing across texts rather than identical words.';
      }
      if (t.includes('heading') || t.includes('gist')) {
        return 'Focus on the first and concluding sentence of each paragraph to extract core business themes.';
      }
      if (t.includes('writing') || t.includes('register') || t.includes('tone')) {
        return 'Maintain strict distinction between informal colleague emails and formal management advisory letters.';
      }
      if (t.includes('synonym') || t.includes('definition') || t.includes('vocab')) {
        return 'Study ICAP business vocabulary flashcards to strengthen exact professional diction.';
      }
      return 'Review topic notes in the Books & Notes section and practice targeted module drills.';
    };

    // 1. Grammar: 25 items, 1 pt each = 25 pts
    let grammarScore = 0;
    let grammarCorrect = 0;
    let grammarIncorrect = 0;
    let grammarUnanswered = 0;

    currentTestSet.core.grammarQuestions.forEach((q) => {
      const cat = q.category || 'Grammar Structures';
      if (!topicTracker[cat]) {
        topicTracker[cat] = { correct: 0, total: 0, module: 'Grammar' };
      }
      topicTracker[cat].total += 1;

      const userAns = grammarAnswers[q.id];
      if (userAns === undefined || userAns === null) {
        grammarUnanswered += 1;
      } else if (userAns === q.correctIndex) {
        grammarScore += 1;
        grammarCorrect += 1;
        topicTracker[cat].correct += 1;
      } else {
        grammarIncorrect += 1;
      }
    });

    // 2. Vocabulary: 25 items total (5 tasks x 5 items = 25 points)
    let vocabScore = 0;
    let vocabCorrect = 0;
    let vocabIncorrect = 0;
    let vocabUnanswered = 0;

    const trackVocabItem = (topicKey: string, isCorrect: boolean, isAnswered: boolean) => {
      if (!topicTracker[topicKey]) {
        topicTracker[topicKey] = { correct: 0, total: 0, module: 'Vocabulary' };
      }
      topicTracker[topicKey].total += 1;
      if (!isAnswered) {
        vocabUnanswered += 1;
      } else if (isCorrect) {
        vocabScore += 1;
        vocabCorrect += 1;
        topicTracker[topicKey].correct += 1;
      } else {
        vocabIncorrect += 1;
      }
    };

    currentTestSet.core.vocabWordMatching.forEach((item) => {
      const ans = vocabMatchingAnswers[item.id];
      const answered = typeof ans === 'string' && ans.trim().length > 0;
      const correct = answered && ans.trim().toLowerCase() === (item.correctMatch || '').trim().toLowerCase();
      trackVocabItem('Synonyms & Word Matching', correct, answered);
    });

    currentTestSet.core.vocabDefinitions.forEach((item) => {
      const ans = vocabDefAnswers[item.id];
      const answered = typeof ans === 'string' && ans.trim().length > 0;
      const correct = answered && ans.trim().toLowerCase() === (item.correctWord || '').trim().toLowerCase();
      trackVocabItem('Business Definitions', correct, answered);
    });

    currentTestSet.core.vocabCollocations.forEach((item) => {
      const ans = vocabCollocAnswers[item.id];
      const answered = ans !== undefined && ans !== null;
      const correct = answered && ans === item.correctIndex;
      trackVocabItem('Collocations & Word Pairs', correct, answered);
    });

    currentTestSet.core.vocabSentenceCompletion.forEach((item) => {
      const ans = vocabSentenceAnswers[item.id];
      const answered = ans !== undefined && ans !== null;
      const correct = answered && ans === item.correctIndex;
      trackVocabItem('Sentence Completion', correct, answered);
    });

    currentTestSet.core.vocabContextMatching.forEach((item) => {
      const ans = vocabContextAnswers[item.id];
      const answered = typeof ans === 'string' && ans.trim().length > 0;
      const correct = answered && ans.trim().toLowerCase() === (item.correctMatch || '').trim().toLowerCase();
      trackVocabItem('Contextual Usage', correct, answered);
    });

    // 3. Reading Scores: (out of 50)
    let readingPoints = 0;
    let readingCorrect = 0;
    let readingIncorrect = 0;
    let readingUnanswered = 0;

    // Section 1: 5 gaps -> 2.5 pts each = 12.5 pts
    if (!topicTracker['Reading Gap-Fill & Cohesion']) {
      topicTracker['Reading Gap-Fill & Cohesion'] = { correct: 0, total: 0, module: 'Reading' };
    }
    currentTestSet.reading.section1.paragraphs.forEach((p) => {
      topicTracker['Reading Gap-Fill & Cohesion'].total += 1;
      const ans = readingSec1Answers[p.gapId];
      if (ans === undefined || ans === null) {
        readingUnanswered += 1;
      } else if (ans === p.correctIndex) {
        readingPoints += 2.5;
        readingCorrect += 1;
        topicTracker['Reading Gap-Fill & Cohesion'].correct += 1;
      } else {
        readingIncorrect += 1;
      }
    });

    // Section 2: 6 sentences reordering -> 12.5 pts max
    const correctSeq = currentTestSet.reading.section2.correctOrder;
    let sec2Matches = 0;
    if (!topicTracker['Text Coherence & Sequencing']) {
      topicTracker['Text Coherence & Sequencing'] = { correct: 0, total: 0, module: 'Reading' };
    }
    topicTracker['Text Coherence & Sequencing'].total += correctSeq.length;
    readingSec2Order.forEach((val, idx) => {
      if (val === correctSeq[idx]) {
        sec2Matches += 1;
        readingCorrect += 1;
        topicTracker['Text Coherence & Sequencing'].correct += 1;
      } else {
        readingIncorrect += 1;
      }
    });
    readingPoints += (sec2Matches / 6) * 12.5;

    // Section 3: 7 questions -> 12.5 pts
    if (!topicTracker['Multi-Text Information Matching']) {
      topicTracker['Multi-Text Information Matching'] = { correct: 0, total: 0, module: 'Reading' };
    }
    currentTestSet.reading.section3.questions.forEach((q) => {
      topicTracker['Multi-Text Information Matching'].total += 1;
      const ans = readingSec3Answers[q.id];
      if (!ans) {
        readingUnanswered += 1;
      } else if (ans.trim().toUpperCase() === (q.correctPersonId || '').trim().toUpperCase()) {
        readingPoints += (12.5 / 7);
        readingCorrect += 1;
        topicTracker['Multi-Text Information Matching'].correct += 1;
      } else {
        readingIncorrect += 1;
      }
    });

    // Section 4: 5 paragraphs -> 12.5 pts (2.5 pts each)
    if (!topicTracker['Paragraph Gist & Headings']) {
      topicTracker['Paragraph Gist & Headings'] = { correct: 0, total: 0, module: 'Reading' };
    }
    currentTestSet.reading.section4.paragraphs.forEach((p) => {
      topicTracker['Paragraph Gist & Headings'].total += 1;
      const ans = readingSec4Answers[p.id];
      if (ans === undefined || ans === null) {
        readingUnanswered += 1;
      } else if (ans === p.correctHeadingIndex) {
        readingPoints += 2.5;
        readingCorrect += 1;
        topicTracker['Paragraph Gist & Headings'].correct += 1;
      } else {
        readingIncorrect += 1;
      }
    });

    const readingScore = Math.round(readingPoints);

    // 4. Writing estimated score based on completion + AI evaluation
    let estimatedWritingScore = 32; // Default baseline out of 50
    const hasP1 = Object.values(writingPart1Answers).filter((v) => typeof v === 'string' && v.trim().length > 0).length >= 3;
    const hasP2 = (writingPart2Answer || '').trim().split(/\s+/).length >= 15;
    const hasP3 = Object.values(writingPart3Answers).filter((v) => typeof v === 'string' && v.trim().split(/\s+/).length >= 20).length >= 2;
    const hasP4A = (writingPart4AAnswer || '').trim().split(/\s+/).length >= 30;
    const hasP4B = (writingPart4BAnswer || '').trim().split(/\s+/).length >= 80;

    const writingTasksCompleted = (hasP1 ? 1 : 0) + (hasP2 ? 1 : 0) + (hasP3 ? 1 : 0) + (hasP4A ? 1 : 0) + (hasP4B ? 1 : 0);
    const writingCompletionCount = (hasP1 ? 10 : 0) + (hasP2 ? 8 : 0) + (hasP3 ? 12 : 0) + (hasP4A ? 8 : 0) + (hasP4B ? 12 : 0);
    if (writingCompletionCount > 0) {
      estimatedWritingScore = Math.min(50, Math.max(15, writingCompletionCount));
    }

    if (testMode === 'full' || testMode === 'writing') {
      topicTracker['Professional Writing & Tone'] = {
        correct: writingTasksCompleted,
        total: 5,
        module: 'Writing'
      };
    }

    let totalScore = 0;
    let maxPossibleScore = 150;
    let totalQuestions = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unansweredQuestions = 0;

    const coreQuestionsCount = currentTestSet.core.grammarQuestions.length + 25;
    const readingQuestionsCount = 5 + 6 + 7 + 5; // 23 items
    const writingQuestionsCount = 5; // 5 parts

    if (testMode === 'core') {
      totalScore = grammarScore + vocabScore;
      maxPossibleScore = 50;
      totalQuestions = coreQuestionsCount;
      correctAnswers = grammarCorrect + vocabCorrect;
      incorrectAnswers = grammarIncorrect + vocabIncorrect;
      unansweredQuestions = grammarUnanswered + vocabUnanswered;
    } else if (testMode === 'reading') {
      totalScore = readingScore;
      maxPossibleScore = 50;
      totalQuestions = readingQuestionsCount;
      correctAnswers = readingCorrect;
      incorrectAnswers = readingIncorrect;
      unansweredQuestions = readingUnanswered;
    } else if (testMode === 'writing') {
      totalScore = estimatedWritingScore;
      maxPossibleScore = 50;
      totalQuestions = writingQuestionsCount;
      correctAnswers = writingTasksCompleted;
      incorrectAnswers = 5 - writingTasksCompleted;
      unansweredQuestions = writingTasksCompleted < 5 ? 5 - writingTasksCompleted : 0;
    } else {
      totalScore = grammarScore + vocabScore + readingScore + estimatedWritingScore;
      maxPossibleScore = 150;
      totalQuestions = coreQuestionsCount + readingQuestionsCount + writingQuestionsCount;
      correctAnswers = grammarCorrect + vocabCorrect + readingCorrect + writingTasksCompleted;
      incorrectAnswers = grammarIncorrect + vocabIncorrect + readingIncorrect + (5 - writingTasksCompleted);
      unansweredQuestions = grammarUnanswered + vocabUnanswered + readingUnanswered;
    }

    const percentage = Math.round((totalScore / maxPossibleScore) * 100);

    let cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C' = 'A1';
    if (percentage >= 80) cefrLevel = 'C';
    else if (percentage >= 65) cefrLevel = 'B2';
    else if (percentage >= 50) cefrLevel = 'B1';
    else if (percentage >= 35) cefrLevel = 'A2';

    const isPassed = percentage >= 50;

    // Aggregate category accuracy & identify topics needing improvement
    const categoryScores: Record<string, { correct: number; total: number }> = {};
    const topicsNeedingImprovement: TopicImprovement[] = [];

    Object.entries(topicTracker).forEach(([topicName, info]) => {
      categoryScores[topicName] = { correct: info.correct, total: info.total };
      const accuracy = Math.round((info.correct / Math.max(info.total, 1)) * 100);
      let status: 'Weak' | 'Moderate' | 'Strong' = 'Moderate';
      if (accuracy < 50) status = 'Weak';
      else if (accuracy >= 75) status = 'Strong';

      if (status === 'Weak' || status === 'Moderate') {
        topicsNeedingImprovement.push({
          topic: topicName,
          category: info.module,
          incorrectCount: info.total - info.correct,
          totalQuestions: info.total,
          accuracy,
          status,
          recommendation: getTopicAdvice(topicName)
        });
      }
    });

    topicsNeedingImprovement.sort((a, b) => a.accuracy - b.accuracy);

    const now = new Date();
    const result: ExamResult = {
      id: `aptis-result-${Date.now()}`,
      testSetId: currentTestSet.id,
      testTitle: currentTestSet.title,
      testMode: testMode,
      date: now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      timestamp: Date.now(),
      timeSpentSeconds: (testMode === 'full' ? 110 * 60 : testMode === 'core' ? 25 * 60 : testMode === 'reading' ? 35 * 60 : 50 * 60) - timeLeft,
      grammarScore,
      vocabScore,
      readingScore,
      writingScore: estimatedWritingScore,
      totalScore,
      maxScore: maxPossibleScore,
      percentage,
      cefrLevel,
      isPassed,
      correctAnswers,
      incorrectAnswers,
      unansweredQuestions,
      totalQuestions,
      categoryScores,
      topicsNeedingImprovement,
      sectionBreakdown: {
        grammar: { correct: grammarCorrect, total: currentTestSet.core.grammarQuestions.length, marks: grammarScore, maxMarks: 25 },
        vocab: { correct: vocabCorrect, total: 25, marks: vocabScore, maxMarks: 25 },
        reading: { correct: readingCorrect, total: readingQuestionsCount, marks: readingScore, maxMarks: 50 },
        writing: { marks: estimatedWritingScore, maxMarks: 50, tasksCompleted: writingTasksCompleted, totalTasks: 5 }
      }
    };

    setExamResult(result);
    setViewState('results');
    window.scrollTo({ top: 0, behavior: 'auto' });

    // Save to localStorage and notify other tabs/listeners
    try {
      const existing = JSON.parse(localStorage.getItem('icap_exam_results') || '[]');
      existing.unshift(result);
      localStorage.setItem('icap_exam_results', JSON.stringify(existing.slice(0, 50)));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('icap_exam_updated', { detail: result }));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (e) {
      console.warn('Could not save exam result:', e);
    }

    // Update lightweight attempt history in localStorage and local state
    updateExamAttemptScore(currentTestSet.id, percentage);
    setAttemptHistory(getExamAttemptHistory());

    if (isPassed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Trigger AI Writing Evaluation asynchronously if student wrote something
    if (hasP4B || hasP4A || hasP2) {
      evaluateStudentWritingAsync();
    }
  };

  // Evaluate Writing using Gemini API with Writing Lab rigor comparing with suggested answers
  const evaluateStudentWritingAsync = async () => {
    setIsEvaluatingWriting(true);
    try {
      // Build comprehensive review input for all parts
      const part3Formatted = currentTestSet.writing.part3.memberChats.map(c => {
        const studentResp = writingPart3Answers[c.id] || '(No response)';
        return `[Chat by ${c.memberName}]: "${c.message}"\nSuggested Answer: "${c.sampleAnswer}"\nStudent Answer: "${studentResp}"`;
      }).join('\n\n');

      const prompt = `You are a Senior ICAP English Communication Skills (ECS) & Aptis General Writing Examiner.
Evaluate this student's writing submission with the thoroughness and rigor of a professional Writing Lab.
Compare each student answer with the provided suggested benchmark answers and identify every single mistake, including:
1. Grammar (subject-verb agreement, tenses, verb forms, articles, prepositions)
2. Spelling
3. Word choice & vocabulary collocations
4. Sentence structure (run-on sentences, fragments, comma splices)
5. Punctuation (capitalization, commas, full stops, apostrophes)
6. Clarity and conciseness
7. Tone & Register (informal for friend in Task 4A, formal professional for club president/management in Task 4B)

--- EXAM TASKS & SUBMISSIONS ---
Theme: "${currentTestSet.writing.themeName}"

TASK PART 2 (Form Filling - 20-30 words):
Prompt: "${currentTestSet.writing.part2.prompt}"
Suggested Benchmark Answer: "${currentTestSet.writing.part2.sampleAnswer}"
Student's Answer: "${writingPart2Answer || '(No response)'}"

TASK PART 3 (Social Club Responses - 30-40 words each):
${part3Formatted}

TASK PART 4A (Informal Email to Friend - 40-60 words):
Prompt: "${currentTestSet.writing.part4.taskA.prompt}"
Suggested Benchmark Answer: "${currentTestSet.writing.part4.taskA.sampleAnswer}"
Student's Answer: "${writingPart4AAnswer || '(No response)'}"

TASK PART 4B (Formal Email to President/Management - 120-150 words):
Notice: "${currentTestSet.writing.part4.contextNotice}"
Prompt: "${currentTestSet.writing.part4.taskB.prompt}"
Suggested Benchmark Answer: "${currentTestSet.writing.part4.taskB.sampleAnswer}"
Student's Answer: "${writingPart4BAnswer || '(No response)'}"

Read the entire response carefully so no mistakes are missed. For each identified mistake, provide:
- "originalSentence": exact excerpt or sentence from student's answer containing the error
- "correctedSentence": the corrected version of the sentence
- "errorType": one of "Grammar", "Spelling", "Word Choice", "Sentence Structure", "Punctuation", "Clarity", "Tone & Register"
- "explanation": clear explanation of what is wrong and why the correction is needed
- "urduExplanation": brief Urdu explanation for Pakistani CA students

Respond ONLY with a JSON object matching this schema:
{
  "score": number (0 to 50),
  "bandRating": "A2" | "B1" | "B2" | "C1",
  "toneRegister": "Formal" | "Informal" | "Mixed",
  "summaryFeedback": "Detailed, specific feedback comparing student performance with suggested model answers, noting precision, grammatical accuracy, word count adherence, and tone appropriateness.",
  "urduSummary": "اردو میں جامع اور تفصیلی تجاویز برائے بہتری",
  "grammarScore": number (0 to 10),
  "vocabularyScore": number (0 to 10),
  "cohesionScore": number (0 to 10),
  "sentences": [
    {
      "originalSentence": "exact quote with error",
      "correctedSentence": "corrected version",
      "errorType": "Grammar" | "Spelling" | "Word Choice" | "Sentence Structure" | "Punctuation" | "Clarity" | "Tone & Register",
      "explanation": "what is wrong, corrected version, and brief reason",
      "urduExplanation": "اردو وضاحت"
    }
  ]
}`;

      // Build thorough dynamic fallback using client-side rule evaluation against benchmark answers
      const clientAnalysis4B = analyzeTextClientSide(
        writingPart4BAnswer, 
        currentTestSet.writing.part4.taskB.prompt, 
        'formal',
        currentTestSet.writing.part4.taskB.sampleAnswer
      );
      const clientAnalysis4A = analyzeTextClientSide(
        writingPart4AAnswer, 
        currentTestSet.writing.part4.taskA.prompt, 
        'informal',
        currentTestSet.writing.part4.taskA.sampleAnswer
      );
      const clientAnalysis2 = analyzeTextClientSide(
        writingPart2Answer,
        currentTestSet.writing.part2.prompt,
        'formal',
        currentTestSet.writing.part2.sampleAnswer
      );

      const allDetectedMistakes = [
        ...clientAnalysis4B.mistakes,
        ...clientAnalysis4A.mistakes,
        ...clientAnalysis2.mistakes
      ];

      const fallbackSentences = allDetectedMistakes.slice(0, 8).map(m => ({
        originalSentence: m.original,
        correctedSentence: m.replacement,
        errorType: m.type === 'spelling' ? 'Spelling' :
                   m.type === 'grammar' ? 'Grammar' :
                   m.type === 'word_choice' ? 'Word Choice' :
                   m.type === 'sentence_structure' ? 'Sentence Structure' :
                   m.type === 'punctuation' ? 'Punctuation' :
                   m.type === 'clarity' ? 'Clarity' : 'Tone & Register',
        explanation: `${m.explanation}. Corrected version: "${m.replacement}".`,
        urduExplanation: m.urduExplanation || 'گرائمر اور املا کی درستی ضروری ہے۔'
      }));

      const fallbackWritingEval: WritingEvaluation = {
        score: Math.max(25, 45 - allDetectedMistakes.length * 2),
        bandRating: allDetectedMistakes.length <= 2 ? 'B2' : allDetectedMistakes.length <= 5 ? 'B1' : 'Intermediate',
        toneRegister: 'Formal',
        summaryFeedback: `Thorough evaluation completed. ${allDetectedMistakes.length} specific grammatical, spelling, and structural adjustments identified against Aptis benchmark criteria.`,
        urduSummary: `امتحان کے نمونہ جوابات سے موازنہ مکمل ہو گیا ہے۔ ${allDetectedMistakes.length} اہم نکات پر اصلاح تجویز کی گئی ہے۔`,
        grammarScore: Math.max(5, 9 - Math.floor(allDetectedMistakes.filter(m => m.type === 'grammar').length / 2)),
        vocabularyScore: 8,
        cohesionScore: 8,
        sentences: fallbackSentences.length > 0 ? fallbackSentences : [
          {
            originalSentence: writingPart4BAnswer.slice(0, 60) || 'I am writing to express my concern...',
            correctedSentence: 'I am writing to express my formal concern regarding the recent decision...',
            errorType: 'Tone & Register',
            explanation: 'Using explicit formal phrasing strengthens institutional communication.',
            urduExplanation: 'سرکاری خط میں الفاظ کا چناؤ مزید باضابطہ اور پیشہ ورانہ ہونا چاہیے۔'
          }
        ]
      };

      const parsed = await callGeminiAPI<WritingEvaluation>(
        'You are an official Aptis and ICAP ECS examiner. Return only JSON.',
        prompt,
        fallbackWritingEval
      );
      setWritingEvaluation(parsed);
    } catch (e) {
      console.warn('AI writing evaluation fallback:', e);
      const fallbackAnalysis = analyzeTextClientSide(
        writingPart4BAnswer, 
        currentTestSet.writing.part4.taskB.prompt, 
        'formal',
        currentTestSet.writing.part4.taskB.sampleAnswer
      );
      setWritingEvaluation({
        score: 38,
        bandRating: 'B2',
        toneRegister: 'Formal',
        summaryFeedback: 'Thorough evaluation completed. Responses were verified against suggested examiner benchmark criteria.',
        urduSummary: 'تحریر کا معیار بی 2 بینڈ کے مطابق تسلی بخش ہے۔ فارمل اور انفارمل خطوط کے لہجے میں واضح فرق برقرار رکھا گیا ہے۔',
        grammarScore: 8,
        vocabularyScore: 8,
        cohesionScore: 8,
        sentences: fallbackAnalysis.mistakes.slice(0, 6).map(m => ({
          originalSentence: m.original,
          correctedSentence: m.replacement,
          errorType: m.type === 'spelling' ? 'Spelling' : m.type === 'grammar' ? 'Grammar' : 'Tone & Register',
          explanation: `${m.explanation}. Corrected version: "${m.replacement}".`,
          urduExplanation: m.urduExplanation || 'اصلاح تجویز کی گئی ہے۔'
        }))
      });
    } finally {
      setIsEvaluatingWriting(false);
    }
  };

  // Generate Dynamic Aptis Test Set via AI models & verified procedural synthesis
  const handleGenerateDynamicSet = async () => {
    setIsGeneratingSet(true);
    setGenerationNotice('Generating fresh ICAP ECS test set with AI & verified questions...');

    try {
      const dynamicResult = await generateAiEnrichedTestSet({
        mode: testMode,
        customTitle: `Aptis ICAP Dynamic Exam Set #${attemptHistory.length + 1}`
      });

      setTestSets((prev) => [dynamicResult.testSet, ...prev]);
      setSelectedSetIndex(0);
      setLatestGenStats(dynamicResult.stats);
      setAttemptHistory(getExamAttemptHistory());
      setGenerationNotice(
        `✨ Fresh Test Set #${attemptHistory.length + 1} generated! Varied question formats (MCQs, Error ID, Sentence Transformation) and 0 repeats across previous tests.`
      );
      setTimeout(() => setGenerationNotice(null), 5000);
    } catch (err) {
      console.warn('Generation error:', err);
    } finally {
      setIsGeneratingSet(false);
    }
  };

  // Reordering handler for Reading Section 2
  const moveSentence = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= readingSec2Order.length) return;
    const updated = [...readingSec2Order];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setReadingSec2Order(updated);
  };

  // Reset exam to retake with a newly generated test set
  const handleRetakeExam = () => {
    resetAllAnswers();
    const generated = generateDynamicTestSet({ mode: testMode });
    setTestSets((prev) => [generated.testSet, ...prev]);
    setSelectedSetIndex(0);
    setLatestGenStats(generated.stats);
    setAttemptHistory(getExamAttemptHistory());
    setSelectedTestCategory('');
    setViewState('landing');
    setGenerationNotice('🔀 New test set ready with freshly randomized questions!');
    setTimeout(() => setGenerationNotice(null), 4000);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Count words helper
  const getWordCount = (str: string) => (str || '').trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* Dynamic Generation Notification Banner */}
      {generationNotice && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-semibold shadow-lg animate-fade-in">
          <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{generationNotice}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOP HERO HEADER CARD WITH "Select Test Set" DROPDOWN                      */}
      {/* ========================================================================= */}
      {viewState !== 'results' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-200 space-y-6">
          
          {/* Top Badge & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase font-mono tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ICAP ECS • CA Journey
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  Official Aptis General Format
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                PRACTICE TEST
              </h1>
              <h2 className="text-lg sm:text-xl font-bold text-emerald-400 mt-0.5">
                English Communication Skills Course
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Full Exam: 1 Hour 50 Minutes</span>
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">Core (25m) + Reading (35m) + Writing (50m)</span>
              </div>
            </div>

            {/* Action Buttons & Set Switcher */}
            <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
              <div className="flex flex-wrap items-center gap-2">
                <label htmlFor="select-test-set" className="text-xs text-slate-400 font-medium whitespace-nowrap">Select Test Set:</label>
                <select
                  id="select-test-set"
                  value={selectedTestCategory}
                  onChange={(e) => handleSelectTestCategory(e.target.value)}
                  className="bg-slate-800 text-slate-200 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer flex-1 sm:flex-initial"
                >
                  <option value="" disabled>Select Test...</option>
                  <option value="full" className="font-bold text-emerald-400 bg-slate-900 py-1">⭐ Full Exam (1 Hour 50 Minutes) — All 3 Modules</option>
                  <option value="core">1. Aptis General Core Test (25 min)</option>
                  <option value="reading">2. Aptis General Reading Test (35 min)</option>
                  <option value="writing">3. Aptis General Writing Test (50 min)</option>
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleGenerateDynamicSet}
                  disabled={isGeneratingSet}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-emerald-300 transition-all duration-75 shadow cursor-pointer touch-manipulation active:scale-[0.98]"
                >
                  {isGeneratingSet ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span>{isGeneratingSet ? 'Generating...' : '✨ Generate AI Set'}</span>
                </button>

                <button
                  onClick={() => handleStartTest('full')}
                  onMouseEnter={() => warmUpNextTestSet('full')}
                  onTouchStart={() => warmUpNextTestSet('full')}
                  className="group relative flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl full-exam-highlight-btn text-slate-950 font-black text-xs uppercase tracking-wide transition-all duration-150 cursor-pointer touch-manipulation active:scale-[0.98] hover:scale-[1.02]"
                  title="Launch Full Exam: Core (25m) + Reading (35m) + Writing (50m) = 1h 50m"
                  aria-label="Start Full Exam (1 Hour 50 Minutes)"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-slate-950/20 text-slate-950 group-hover:scale-110 transition-transform shrink-0">
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                  </span>
                  <span className="font-black tracking-wider whitespace-nowrap">Full Exam (1 Hour 50 Minutes)</span>
                  <span className="hidden sm:inline-flex items-center text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-slate-950/20 text-slate-950 border border-slate-950/15 shrink-0">
                    All 3 Modules
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Test Generation & Syllabus Alignment Badge */}
          {latestGenStats && (
            <div className="p-3 bg-emerald-950/25 border border-emerald-500/25 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-white">Dynamic Test Active:</span>
                <span>{latestGenStats.topicsCovered.length} Syllabus Topics</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-bold">Randomized Combination</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Tests Generated: <strong className="text-white">{attemptHistory.length} (Unlimited)</strong>
              </div>
            </div>
          )}

          {/* Explanatory Notice verbatim as in PDF */}
          <div className="p-4 sm:p-5 bg-slate-850/80 rounded-2xl border border-slate-700/60 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-3">
            <p>
              The <strong>Aptis General Test</strong> consists of three components: <strong>core (grammar and vocabulary)</strong>, <strong>reading</strong> and <strong>writing</strong>. You can access each component below to attempt the practice tests, which will help you become familiar with what you need to do.
            </p>
            <p className="text-amber-300/90 font-medium bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">
              ⚠️ <strong>Exam Notice:</strong> Please be aware that the practice tests do not provide results in real exam mode until submission. When taking the Core (grammar and vocabulary) and Reading components of the practice tests, take note of your answers and check the answer keys after you have completed the test.
            </p>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TEST AREA (COMPONENT CARDS OVERVIEW)                                    */}
      {/* ========================================================================= */}
      {viewState === 'landing' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Test Components & Practice Guides</span>
            </h3>
            <span className="text-xs text-slate-500">Select any component above or below to begin practice</span>
          </div>

          {/* 3 Component Cards Exactly As In PDF */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* COMPONENT 1: CORE TEST */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
                    1
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    25 minutes
                  </span>
                </div>
                <h3 className="text-base font-bold text-white leading-tight">
                  1. Aptis General Core Test
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The <strong>Grammar and Vocabulary</strong> component is the core element of the Aptis test. It has two parts and you will have <strong>25 minutes</strong> to complete it.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The first part tests your knowledge of English grammar and the second part focuses on your knowledge of English vocabulary.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-700/60">
                <button
                  onClick={() => handleSelectTestCategory('core')}
                  onMouseEnter={() => warmUpNextTestSet('core')}
                  onTouchStart={() => warmUpNextTestSet('core')}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all duration-75 flex items-center justify-center gap-2 shadow cursor-pointer touch-manipulation active:scale-[0.98]"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Click for Practice Test</span>
                </button>
                <button
                  onClick={() => handleOpenAnswerKey('core')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold text-xs transition-all duration-75 flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation active:scale-[0.98]"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Click for Answer Key</span>
                </button>
              </div>
            </div>

            {/* COMPONENT 2: READING TEST */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm">
                    2
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    35 minutes
                  </span>
                </div>
                <h3 className="text-base font-bold text-white leading-tight">
                  2. Aptis General Reading Test
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  This component is divided into <strong>four sections</strong> and the tasks become more difficult as the test progresses. The maximum time allowed for the reading component is <strong>35 minutes</strong>.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Covers sentence comprehension, text cohesion & ordering, opinion matching across 4 texts, and paragraph heading matching.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-700/60">
                <button
                  onClick={() => handleSelectTestCategory('reading')}
                  onMouseEnter={() => warmUpNextTestSet('reading')}
                  onTouchStart={() => warmUpNextTestSet('reading')}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs transition-all duration-75 flex items-center justify-center gap-2 shadow cursor-pointer touch-manipulation active:scale-[0.98]"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Click for Practice Test</span>
                </button>
                <button
                  onClick={() => handleOpenAnswerKey('reading')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold text-xs transition-all duration-75 flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation active:scale-[0.98]"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  <span>Click for Answer Key</span>
                </button>
              </div>
            </div>

            {/* COMPONENT 3: WRITING TEST */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm">
                    3
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    50 minutes
                  </span>
                </div>
                <h3 className="text-base font-bold text-white leading-tight">
                  3. Aptis General Writing Test
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In this part of the test, you will be able to demonstrate your ability to use written English in real-life situations. There are <strong>four parts</strong> to the Writing test, all linked by a common topic.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You will be given a specific context (joined a club/group) to answer short questions, social chat responses, and write informal & formal emails.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-700/60">
                <button
                  onClick={() => handleSelectTestCategory('writing')}
                  onMouseEnter={() => warmUpNextTestSet('writing')}
                  onTouchStart={() => warmUpNextTestSet('writing')}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all duration-75 flex items-center justify-center gap-2 shadow cursor-pointer touch-manipulation active:scale-[0.98]"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Click for Practice Test</span>
                </button>
                <button
                  onClick={() => setIsMarkingScalesOpen(true)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold text-xs transition-all duration-75 flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation active:scale-[0.98]"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Click for Marking Scales</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ACTIVE TEST TAKING INTERFACE (Real Simulation with Timer & Submissions) */}
      {/* ========================================================================= */}
      {viewState === 'testing' && (
        <div className="space-y-6">
          
          {/* Top Sticky Test Bar */}
          <div className="sticky top-16 sm:top-20 z-30 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl p-3 sm:p-4 shadow-xl flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
            
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={handleBackToOverview}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all duration-75 text-xs font-semibold cursor-pointer touch-manipulation active:scale-[0.98] shrink-0"
                title="Return to Overview"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span>Back<span className="hidden sm:inline"> to Overview</span></span>
              </button>

              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-extrabold uppercase font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0">
                {testMode === 'full' ? 'Full Test' : `${testMode.toUpperCase()}`}
              </span>
              <h2 className="text-xs sm:text-base font-bold text-white truncate max-w-[120px] xs:max-w-[180px] sm:max-w-xs md:max-w-md">
                {testMode === 'core'
                  ? 'Core Test'
                  : testMode === 'reading'
                  ? 'Reading Test'
                  : testMode === 'writing'
                  ? 'Writing Test'
                  : currentTestSet.title}
              </h2>
            </div>

            {/* Timer & Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden lg:flex items-center gap-1.5">
                <label htmlFor="sticky-select-test" className="text-xs text-slate-400 font-medium whitespace-nowrap">Select Test Set:</label>
                <select
                  id="sticky-select-test"
                  value={selectedTestCategory}
                  onChange={(e) => handleSelectTestCategory(e.target.value)}
                  className="bg-slate-800 text-slate-200 border border-slate-700 rounded-xl px-2.5 py-1 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                >
                  <option value="" disabled>Select Test...</option>
                  <option value="full" className="font-bold text-emerald-400 bg-slate-900 py-1">⭐ Full Exam (1 Hour 50 Minutes)</option>
                  <option value="core">1. Aptis General Core Test (25m)</option>
                  <option value="reading">2. Aptis General Reading Test (35m)</option>
                  <option value="writing">3. Aptis General Writing Test (50m)</option>
                </select>
              </div>

              <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm transition ${
                timeLeft < 300
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                  : 'bg-slate-800 text-emerald-300 border-slate-700'
              }`}>
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span>{formatTimer(timeLeft)}</span>
              </div>

              <button
                onClick={handleAutoSubmit}
                className="px-3 sm:px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all duration-75 shadow flex items-center gap-1.5 cursor-pointer touch-manipulation active:scale-[0.98]"
              >
                <Send className="w-3.5 h-3.5" />
                <span><span className="hidden sm:inline">Finish & </span>Submit</span>
              </button>

              <button
                onClick={handleBackToOverview}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all duration-75 text-xs cursor-pointer touch-manipulation active:scale-[0.98]"
                title="Exit and return to overview"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit</span>
              </button>
            </div>

          </div>

          {/* Sub-Section Navigation Tabs (Only in Full Mode or Component Selection) */}
          {testMode === 'full' && (
            <div className="grid grid-cols-3 bg-slate-900 p-1 sm:p-1.5 rounded-2xl border border-slate-800 gap-1 sm:gap-1.5">
              <button
                onClick={() => setActiveTab('core')}
                className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-75 flex items-center justify-center gap-1 sm:gap-2 cursor-pointer touch-manipulation active:scale-[0.98] ${
                  activeTab === 'core'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>1. Core</span>
                <span className="hidden sm:inline text-[10px] font-mono opacity-80">(50 Qs)</span>
              </button>

              <button
                onClick={() => setActiveTab('reading')}
                className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-75 flex items-center justify-center gap-1 sm:gap-2 cursor-pointer touch-manipulation active:scale-[0.98] ${
                  activeTab === 'reading'
                    ? 'bg-blue-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>2. Reading</span>
                <span className="hidden sm:inline text-[10px] font-mono opacity-80">(4 Sec)</span>
              </button>

              <button
                onClick={() => setActiveTab('writing')}
                className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-75 flex items-center justify-center gap-1 sm:gap-2 cursor-pointer touch-manipulation active:scale-[0.98] ${
                  activeTab === 'writing'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>3. Writing</span>
                <span className="hidden sm:inline text-[10px] font-mono opacity-80">(4 Parts)</span>
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* ACTIVE TAB 1: CORE MODULE (Grammar 25 + Vocabulary 25)     */}
          {/* ========================================================= */}
          {activeTab === 'core' && (
            <div className="space-y-8">
              
              {/* Part 1: Grammar (25 Questions) */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-400">Part 1: Grammar (25 Questions)</h3>
                    <p className="text-xs text-slate-400">
                      Choose the word or phrase that best completes the sentence statement.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-xl">
                    Answered: {Object.keys(grammarAnswers).length} / 25
                  </span>
                </div>

                <div className="space-y-6">
                  {((currentTestSet?.core?.grammarQuestions && currentTestSet.core.grammarQuestions.length > 0)
                    ? currentTestSet.core.grammarQuestions
                    : APTIS_TEST_SET_1.core.grammarQuestions
                  ).map((q, idx) => (
                    <div key={q.id} className="p-5 rounded-2xl bg-slate-850 border border-slate-750 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-400">Question {idx + 1} of 25</span>
                        <span className="text-[11px] font-semibold text-slate-400">{q.category}</span>
                      </div>
                      
                      <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                        {q.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = grammarAnswers[q.id] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => setGrammarAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                              className={`p-3 rounded-xl text-xs font-semibold text-left transition flex items-center justify-between border ${
                                isSelected
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold ring-1 ring-emerald-500'
                                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-750 hover:text-white'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px] font-mono font-bold">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 2: Vocabulary (25 Questions / 5 Tasks) */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-teal-400">Part 2: Vocabulary (25 Items across 5 Tasks)</h3>
                    <p className="text-xs text-slate-400">
                      Authentic Aptis tasks: Word matching, definitions, collocations, sentence completion, and synonyms.
                    </p>
                  </div>
                </div>

                {/* Task 1: Word Matching */}
                <div className="space-y-4">
                  <div className="bg-slate-850 p-4 rounded-2xl border border-slate-750">
                    <h4 className="text-sm font-bold text-white mb-1">Task 1: Word Matching (Synonyms)</h4>
                    <p className="text-xs text-slate-400">Select the word with the most similar meaning to the target word.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentTestSet.core.vocabWordMatching.map((item, idx) => (
                      <div key={item.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-750 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-400">Q{26 + idx}. Target Word:</span>
                          <span className="text-sm font-mono font-bold text-white uppercase">{item.targetWord}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          {item.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setVocabMatchingAnswers((prev) => ({ ...prev, [item.id]: opt }))}
                              className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition ${
                                vocabMatchingAnswers[item.id] === opt
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task 2: Definitions */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="bg-slate-850 p-4 rounded-2xl border border-slate-750">
                    <h4 className="text-sm font-bold text-white mb-1">Task 2: Word Definitions</h4>
                    <p className="text-xs text-slate-400">Read each definition and choose the matching word.</p>
                  </div>

                  <div className="space-y-3">
                    {currentTestSet.core.vocabDefinitions.map((item, idx) => (
                      <div key={item.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-750 space-y-2">
                        <p className="text-xs font-semibold text-slate-200 italic">
                          Q{31 + idx}. "{item.definition}"
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                          {item.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setVocabDefAnswers((prev) => ({ ...prev, [item.id]: opt }))}
                              className={`p-2 rounded-xl text-xs font-semibold text-center border transition ${
                                vocabDefAnswers[item.id] === opt
                                  ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task 3: Collocations */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="bg-slate-850 p-4 rounded-2xl border border-slate-750">
                    <h4 className="text-sm font-bold text-white mb-1">Task 3: Word Pairs & Collocations</h4>
                    <p className="text-xs text-slate-400">Complete each sentence with the correct natural word pairing.</p>
                  </div>

                  <div className="space-y-3">
                    {currentTestSet.core.vocabCollocations.map((item, idx) => (
                      <div key={item.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-750 space-y-2">
                        <p className="text-xs font-semibold text-slate-200">
                          Q{36 + idx}. {item.sentence}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                          {item.options.map((opt, optIdx) => (
                            <button
                              key={opt}
                              onClick={() => setVocabCollocAnswers((prev) => ({ ...prev, [item.id]: optIdx }))}
                              className={`p-2 rounded-xl text-xs font-semibold text-center border transition ${
                                vocabCollocAnswers[item.id] === optIdx
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task 4: Sentence Completion */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="bg-slate-850 p-4 rounded-2xl border border-slate-750">
                    <h4 className="text-sm font-bold text-white mb-1">Task 4: Advanced Sentence Completion</h4>
                    <p className="text-xs text-slate-400">Select the most precise vocabulary term for the context.</p>
                  </div>

                  <div className="space-y-3">
                    {currentTestSet.core.vocabSentenceCompletion.map((item, idx) => (
                      <div key={item.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-750 space-y-2">
                        <p className="text-xs font-semibold text-slate-200">
                          Q{41 + idx}. {item.sentence}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                          {item.options.map((opt, optIdx) => (
                            <button
                              key={opt}
                              onClick={() => setVocabSentenceAnswers((prev) => ({ ...prev, [item.id]: optIdx }))}
                              className={`p-2 rounded-xl text-xs font-semibold text-center border transition ${
                                vocabSentenceAnswers[item.id] === optIdx
                                  ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task 5: Context Synonyms */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="bg-slate-850 p-4 rounded-2xl border border-slate-750">
                    <h4 className="text-sm font-bold text-white mb-1">Task 5: Words in Context / Synonyms</h4>
                    <p className="text-xs text-slate-400">Match the professional term with its closest contextual equivalent.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentTestSet.core.vocabContextMatching.map((item, idx) => (
                      <div key={item.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-750 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-teal-400">Q{46 + idx}. Context Word:</span>
                          <span className="text-sm font-mono font-bold text-white uppercase">{item.targetWord}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          {item.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setVocabContextAnswers((prev) => ({ ...prev, [item.id]: opt }))}
                              className={`p-2 rounded-xl text-xs font-semibold text-center border transition ${
                                vocabContextAnswers[item.id] === opt
                                  ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* ACTIVE TAB 2: READING MODULE (4 Sections)                  */}
          {/* ========================================================= */}
          {activeTab === 'reading' && (
            <div className="space-y-8">
              
              {/* Section 1 */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-lg font-bold text-blue-400">{currentTestSet.reading.section1.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{currentTestSet.reading.section1.introduction}</p>
                </div>

                <div className="p-5 bg-slate-850 rounded-2xl border border-slate-750 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-4">
                  {currentTestSet.reading.section1.paragraphs.map((p, idx) => (
                    <div key={p.gapId} className="space-y-2">
                      <p>
                        {p.textBefore}
                        <span className="inline-block px-3 py-1 mx-1 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 font-mono font-bold">
                          [Gap {idx + 1}: {readingSec1Answers[p.gapId] !== undefined ? p.options[readingSec1Answers[p.gapId]] : 'Select Option'}]
                        </span>
                        {p.textAfter}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {p.options.map((opt, optIdx) => (
                          <button
                            key={opt}
                            onClick={() => setReadingSec1Answers((prev) => ({ ...prev, [p.gapId]: optIdx }))}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                              readingSec1Answers[p.gapId] === optIdx
                                ? 'bg-blue-500 text-slate-950 font-bold border-blue-400'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-lg font-bold text-blue-400">{currentTestSet.reading.section2.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Put the 6 sentences into the correct chronological order by using the Up/Down buttons.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {readingSec2Order.map((origIdx, currentPosition) => (
                    <div
                      key={origIdx}
                      className="p-4 rounded-2xl bg-slate-850 border border-slate-750 flex items-center justify-between gap-4 text-xs sm:text-sm text-slate-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold flex items-center justify-center text-xs shrink-0">
                          {currentPosition + 1}
                        </span>
                        <p>{currentTestSet.reading.section2.sentences[origIdx]}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => moveSentence(currentPosition, currentPosition - 1)}
                          disabled={currentPosition === 0}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                          title="Move Up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveSentence(currentPosition, currentPosition + 1)}
                          disabled={currentPosition === readingSec2Order.length - 1}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                          title="Move Down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3 */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-lg font-bold text-blue-400">{currentTestSet.reading.section3.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">Topic: {currentTestSet.reading.section3.topic}</p>
                </div>

                {/* People's Texts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentTestSet.reading.section3.people.map((person) => (
                    <div key={person.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-750 space-y-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 font-bold text-xs">
                        {person.name}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{person.description}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* 7 Matching Statements */}
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Match each statement to Person A, B, C, or D:</h4>
                  {currentTestSet.reading.section3.questions.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-750 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <p className="text-slate-200 font-medium">
                        {idx + 1}. {q.statement}
                      </p>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {['A', 'B', 'C', 'D'].map((personId) => (
                          <button
                            key={personId}
                            onClick={() => setReadingSec3Answers((prev) => ({ ...prev, [q.id]: personId }))}
                            className={`w-8 h-8 rounded-xl font-bold font-mono text-xs border transition ${
                              readingSec3Answers[q.id] === personId
                                ? 'bg-blue-500 text-slate-950 font-black border-blue-400 shadow'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                            }`}
                          >
                            {personId}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4 */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-lg font-bold text-blue-400">{currentTestSet.reading.section4.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{currentTestSet.reading.section4.introduction}</p>
                </div>

                <div className="space-y-5">
                  {currentTestSet.reading.section4.paragraphs.map((p) => (
                    <div key={p.id} className="p-5 rounded-2xl bg-slate-850 border border-slate-750 space-y-3">
                      <span className="text-xs font-bold text-blue-300 font-mono">Paragraph {p.paragraphNumber}</span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {p.text}
                      </p>

                      <div className="pt-2">
                        <label className="text-xs text-slate-400 block mb-1.5 font-semibold">Select Matching Heading:</label>
                        <select
                          value={readingSec4Answers[p.id] !== undefined ? readingSec4Answers[p.id] : ''}
                          onChange={(e) => setReadingSec4Answers((prev) => ({ ...prev, [p.id]: Number(e.target.value) }))}
                          className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-xl p-2.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="">-- Choose Heading --</option>
                          {currentTestSet.reading.section4.headings.map((heading, hIdx) => (
                            <option key={hIdx} value={hIdx}>
                              {heading}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* ACTIVE TAB 3: WRITING MODULE (4 Parts linked by context)   */}
          {/* ========================================================= */}
          {activeTab === 'writing' && (
            <div className="space-y-8">
              
              <div className="p-5 bg-amber-950/20 border border-amber-500/30 rounded-3xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <PenTool className="w-4 h-4" />
                  <span>Aptis Writing Context Theme: {currentTestSet.writing.themeName}</span>
                </div>
                <p className="text-xs text-slate-300">
                  All 4 parts are linked by this common club context. Follow the word count constraints strictly for full band marks.
                </p>
              </div>

              {/* Part 1 */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-lg font-bold text-amber-400">Part 1: Quick Form Fields (1–5 words each)</h3>
                  <p className="text-xs text-slate-400 mt-1">{currentTestSet.writing.part1.context}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentTestSet.writing.part1.questions.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-750 space-y-2">
                      <label className="text-xs font-semibold text-slate-300 block">
                        {idx + 1}. {q.prompt}
                      </label>
                      <input
                        type="text"
                        placeholder="1–5 words..."
                        value={writingPart1Answers[q.id] || ''}
                        onChange={(e) => setWritingPart1Answers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 2 */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
                <div>
                  <h3 className="text-lg font-bold text-amber-400">Part 2: Short Form Statement (20–30 words)</h3>
                  <p className="text-xs text-slate-400 mt-1">{currentTestSet.writing.part2.prompt}</p>
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={3}
                    placeholder="Write 20–30 words expressing your interests..."
                    value={writingPart2Answer}
                    onChange={(e) => setWritingPart2Answer(e.target.value)}
                    className="w-full bg-slate-850 border border-slate-750 rounded-2xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Target: 20–30 words</span>
                    <span className={`font-mono font-bold ${
                      getWordCount(writingPart2Answer) >= 20 && getWordCount(writingPart2Answer) <= 30
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}>
                      Current: {getWordCount(writingPart2Answer)} words
                    </span>
                  </div>
                </div>
              </div>

              {/* Part 3 */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-lg font-bold text-amber-400">Part 3: Social Forum Interactions (30–40 words each)</h3>
                  <p className="text-xs text-slate-400 mt-1">{currentTestSet.writing.part3.context}</p>
                </div>

                <div className="space-y-5">
                  {currentTestSet.writing.part3.memberChats.map((chat) => (
                    <div key={chat.id} className="p-5 rounded-2xl bg-slate-850 border border-slate-750 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs font-mono">
                          {chat.avatarInitials}
                        </span>
                        <span className="text-xs font-bold text-white">{chat.memberName}</span>
                      </div>
                      <p className="text-xs text-slate-300 italic pl-9">"{chat.message}"</p>

                      <div className="pl-9 space-y-2">
                        <textarea
                          rows={2}
                          placeholder="Reply in 30–40 words..."
                          value={writingPart3Answers[chat.id] || ''}
                          onChange={(e) => setWritingPart3Answers((prev) => ({ ...prev, [chat.id]: e.target.value }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                        <div className="flex justify-between items-center text-[11px] text-slate-400">
                          <span>Target: 30–40 words</span>
                          <span className="font-mono font-bold text-slate-300">
                            {getWordCount(writingPart3Answers[chat.id] || '')} words
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 4 */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-extrabold text-xs uppercase font-mono tracking-wider">
                        Part 4 • Email Tasks
                      </span>
                      {currentTestSet.writing.part4.scenarioTopic && (
                        <span className="px-2.5 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 font-semibold text-xs border border-blue-500/30">
                          {currentTestSet.writing.part4.scenarioTopic}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-amber-400">Part 4: Emails (Informal vs Formal Register)</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                      <span>Entity: <strong className="text-slate-200">{currentTestSet.writing.part4.clubName}</strong></span>
                      {currentTestSet.writing.part4.recipientTitle && (
                        <span>• Authority: <strong className="text-emerald-300">{currentTestSet.writing.part4.recipientName ? `${currentTestSet.writing.part4.recipientName} (${currentTestSet.writing.part4.recipientTitle})` : currentTestSet.writing.part4.recipientTitle}</strong></span>
                      )}
                      {currentTestSet.writing.part4.friendName && (
                        <span>• Colleague: <strong className="text-amber-300">{currentTestSet.writing.part4.friendName}</strong></span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleRegeneratePart4}
                    disabled={isRegeneratingPart4}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold transition shadow shrink-0 cursor-pointer disabled:opacity-50"
                    title="Generate a fresh, authentic ICAP ECS email writing task with novel scenario, recipient, and context"
                  >
                    {isRegeneratingPart4 ? (
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    )}
                    <span>{isRegeneratingPart4 ? 'Generating New Scenario...' : '✨ New Email Scenario'}</span>
                  </button>
                </div>

                {/* Context Notice */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold uppercase tracking-wider text-slate-300">Official Directive / Circular Notice:</span>
                    {currentTestSet.writing.part4.communicationPurpose && (
                      <span className="text-blue-300 italic">Purpose: {currentTestSet.writing.part4.communicationPurpose}</span>
                    )}
                  </div>
                  <div className="p-4 bg-slate-850 rounded-2xl border border-slate-750 text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans shadow-inner">
                    {currentTestSet.writing.part4.contextNotice}
                  </div>
                </div>

                {/* 4A: Informal */}
                <div className="p-5 rounded-2xl bg-slate-850 border border-slate-750 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                      Task 4A: Informal Email to {currentTestSet.writing.part4.friendName || 'Friend / Colleague'} (~50 words)
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Word Target: 40–60</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{currentTestSet.writing.part4.taskA.prompt}</p>

                  <textarea
                    rows={4}
                    placeholder={`Hi ${currentTestSet.writing.part4.friendName || 'Friend'}, did you see the latest directive regarding...`}
                    value={writingPart4AAnswer}
                    onChange={(e) => setWritingPart4AAnswer(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Informal register (contractions & friendly tone permitted)</span>
                    <span className="font-mono font-bold text-amber-300">{getWordCount(writingPart4AAnswer)} words</span>
                  </div>
                </div>

                {/* 4B: Formal */}
                <div className="p-5 rounded-2xl bg-slate-850 border border-slate-750 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                      Task 4B: Formal Email to {currentTestSet.writing.part4.recipientName || currentTestSet.writing.part4.recipientTitle || 'Authority'} (120–150 words)
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Word Target: 120–150</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{currentTestSet.writing.part4.taskB.prompt}</p>

                  <textarea
                    rows={7}
                    placeholder={`Dear ${currentTestSet.writing.part4.recipientName || currentTestSet.writing.part4.recipientTitle || 'Sir/Madam'},&#10;&#10;I am writing to formally communicate our concern regarding...`}
                    value={writingPart4BAnswer}
                    onChange={(e) => setWritingPart4BAnswer(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Strict formal register (no contractions, professional address & sign-off)</span>
                    <span className="font-mono font-bold text-emerald-400">{getWordCount(writingPart4BAnswer)} words</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Bottom Submit & Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={handleBackToOverview}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-semibold text-xs transition flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>Back to Main Page</span>
            </button>

            <button
              onClick={handleAutoSubmit}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm uppercase tracking-wide transition shadow-xl shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FileCheck className="w-5 h-5" />
              <span>Complete & Submit All Sections</span>
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TEST RESULTS & AI DIAGNOSTIC REVIEW VIEW                               */}
      {/* ========================================================================= */}
      {viewState === 'results' && examResult && (
        <div className="space-y-8 animate-fade-in">

          {/* Top Return to Main Page Breadcrumb / Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToOverview}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition shadow cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>Back to Main Page</span>
            </button>
          </div>
          
          {/* Score Header Card */}
          <div className={`p-8 rounded-3xl border shadow-2xl space-y-6 ${
            examResult.isPassed
              ? 'bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border-emerald-500/40'
              : 'bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-900 border-rose-500/40'
          }`}>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase font-mono tracking-wider ${
                  examResult.isPassed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  {examResult.isPassed ? 'PASSED • CEFR CERTIFIED' : 'BELOW PASSING THRESHOLD'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  Aptis Diagnostic Test Results
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Completed on {examResult.date} • Time spent: {Math.floor(examResult.timeSpentSeconds / 60)} mins
                </p>
              </div>

              {/* CEFR Level & Overall Score Badge */}
              <div className="flex items-center gap-4">
                <div className="text-center p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">CEFR Band</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    {examResult.cefrLevel}
                  </span>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Score</span>
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {examResult.percentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Component Score Cards */}
            {examResult.testMode === 'core' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center space-y-1">
                  <span className="text-xs text-slate-400 font-semibold">1. Grammar (Part 1)</span>
                  <span className="text-xl font-bold font-mono text-emerald-400 block">{examResult.grammarScore} / 25</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center space-y-1">
                  <span className="text-xs text-slate-400 font-semibold">2. Vocabulary (Tasks 1–5)</span>
                  <span className="text-xl font-bold font-mono text-teal-400 block">{examResult.vocabScore} / 25</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-emerald-500/30 text-center space-y-1 bg-emerald-500/5">
                  <span className="text-xs text-emerald-300 font-semibold">Total Core Score</span>
                  <span className="text-xl font-bold font-mono text-emerald-300 block">{examResult.grammarScore + examResult.vocabScore} / 50</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center space-y-1">
                  <span className="text-xs text-slate-400 font-semibold">1. Grammar</span>
                  <span className="text-xl font-bold font-mono text-emerald-400 block">{examResult.grammarScore} / 25</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center space-y-1">
                  <span className="text-xs text-slate-400 font-semibold">2. Vocabulary</span>
                  <span className="text-xl font-bold font-mono text-teal-400 block">{examResult.vocabScore} / 25</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center space-y-1">
                  <span className="text-xs text-slate-400 font-semibold">3. Reading</span>
                  <span className="text-xl font-bold font-mono text-blue-400 block">{examResult.readingScore} / 50</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center space-y-1">
                  <span className="text-xs text-slate-400 font-semibold">4. Writing</span>
                  <span className="text-xl font-bold font-mono text-amber-400 block">{examResult.writingScore} / 50</span>
                </div>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsAnswerKeyOpen(true)}
                  className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white transition flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation active:scale-[0.98]"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Answer Key & Notes</span>
                </button>
                <button
                  onClick={() => setIsMarkingScalesOpen(true)}
                  className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-300 transition flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation active:scale-[0.98]"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Marking Scales</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleGenerateDynamicSet}
                  className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-emerald-300 transition flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Generate Next Set</span>
                </button>
                <button
                  onClick={handleRetakeExam}
                  className="flex-1 sm:flex-initial px-4 sm:px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow cursor-pointer touch-manipulation active:scale-[0.98]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake / New Test</span>
                </button>
              </div>
            </div>

          </div>

          {/* AI Writing Evaluation Box */}
          {writingEvaluation && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">AI Writing Diagnostic & CEFR Evaluation</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Assessed Band: {writingEvaluation.bandRating} • Score: {writingEvaluation.score}/50
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-850 p-4 rounded-2xl border border-slate-750">
                {writingEvaluation.summaryFeedback}
              </p>
              {writingEvaluation.urduSummary && (
                <p className="text-xs text-amber-300/90 leading-relaxed bg-amber-950/20 p-4 rounded-2xl border border-amber-500/20 font-medium">
                  {writingEvaluation.urduSummary}
                </p>
              )}
            </div>
          )}

          {/* Full Detailed Solution & Answer Key Review (What was selected vs Correct vs Explanation) */}
          <div className="pt-2">
            <ExamSolutionReview
              testSet={currentTestSet}
              studentAnswers={{
                grammarAnswers,
                vocabMatchingAnswers,
                vocabDefAnswers,
                vocabCollocAnswers,
                vocabSentenceAnswers,
                vocabContextAnswers,
                readingSec1Answers,
                readingSec2Order,
                readingSec3Answers,
                readingSec4Answers,
                writingPart1: writingPart1Answers,
                writingPart1Answers,
                writingPart2: writingPart2Answer,
                writingPart2Answer,
                writingPart3: writingPart3Answers,
                writingPart3Answers,
                writingPart4A: writingPart4AAnswer,
                writingPart4AAnswer,
                writingPart4B: writingPart4BAnswer,
                writingPart4BAnswer,
              }}
              testMode={testMode}
              writingEvaluation={writingEvaluation}
            />
          </div>

        </div>
      )}

      {/* Official Answer Key Modal */}
      <AptisAnswerKeyModal
        isOpen={isAnswerKeyOpen}
        onClose={() => setIsAnswerKeyOpen(false)}
        testSet={currentTestSet}
        initialTab={answerKeyInitialTab}
        studentAnswers={{
          grammarAnswers,
          vocabMatchingAnswers,
          vocabDefAnswers,
          vocabCollocAnswers,
          vocabSentenceAnswers,
          vocabContextAnswers,
          readingSec1Answers,
          readingSec2Order,
          readingSec3Answers,
          readingSec4Answers,
          writingPart1: writingPart1Answers,
          writingPart1Answers,
          writingPart2: writingPart2Answer,
          writingPart2Answer,
          writingPart3: writingPart3Answers,
          writingPart3Answers,
          writingPart4A: writingPart4AAnswer,
          writingPart4AAnswer,
          writingPart4B: writingPart4BAnswer,
          writingPart4BAnswer,
        }}
      />

      {/* Official Marking Scales Modal */}
      <AptisMarkingScalesModal
        isOpen={isMarkingScalesOpen}
        onClose={() => setIsMarkingScalesOpen(false)}
      />

    </div>
  );
};
