import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, 
  Flame, 
  Rotate3d, 
  Volume2, 
  RotateCcw, 
  Key, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  BookMarked, 
  TrendingUp, 
  Sparkles, 
  Award,
  ChevronLeft,
  ChevronRight,
  Filter,
  Check,
  Download,
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  Target,
  FileText,
  Percent,
  Play,
  Info,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Zap,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { Flashcard, ExamResult, TopicImprovement } from '../types';
import { MOCK_FLASHCARDS } from '../data/mockData';
import { clearGeminiApiKey } from '../lib/api-handler';
import { clearExamHistoryAndTracking } from '../lib/examEngineService';

interface DashboardProps {
  onOpenApiKeyModal: () => void;
  onBackToMain?: () => void;
  onStartExam?: () => void;
  isActive?: boolean;
}

interface CategoryAccuracy {
  category: string;
  module: 'Grammar' | 'Vocabulary' | 'Reading' | 'Writing' | string;
  correct: number;
  total: number;
  incorrect: number;
  accuracy: number;
  status: 'Weak' | 'Moderate' | 'Strong';
  recommendation: string;
}

// Fallback topic tips if not provided in exam result
function getFallbackTopicTip(categoryName: string): string {
  const t = categoryName.toLowerCase();
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
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  onOpenApiKeyModal, 
  onBackToMain, 
  onStartExam,
  isActive 
}) => {
  // Flashcard state
  const [flashcards] = useState<Flashcard[]>(MOCK_FLASHCARDS);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  // Analytics & Test Records State
  const [examHistory, setExamHistory] = useState<ExamResult[]>([]);
  const [writingHistory, setWritingHistory] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Filter & sorting states for test attempts
  const [attemptFilterMode, setAttemptFilterMode] = useState<'all' | 'full' | 'core' | 'reading' | 'writing'>('all');
  const [attemptSortOrder, setAttemptSortOrder] = useState<'newest' | 'highest' | 'lowest'>('newest');
  const [expandedAttemptId, setExpandedAttemptId] = useState<string | null>(null);

  // Diagnostic topics filter
  const [topicFilter, setTopicFilter] = useState<'all' | 'weak' | 'moderate' | 'strong'>('all');

  // Confirmation Modal state for Reset Stats
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);

  // Load test history and sync with localStorage
  const loadAnalyticsData = () => {
    try {
      const storedExamsStr = localStorage.getItem('icap_exam_results');
      const exams: ExamResult[] = storedExamsStr ? JSON.parse(storedExamsStr) : [];
      setExamHistory(exams);

      const storedWritingStr = localStorage.getItem('icap_writing_results');
      const writing = storedWritingStr ? JSON.parse(storedWritingStr) : [];
      setWritingHistory(writing);

      const storedMastered = localStorage.getItem('icap_mastered_flashcards');
      if (storedMastered) {
        setMasteredCards(JSON.parse(storedMastered));
      }
    } catch (e) {
      console.warn('Error reading dashboard analytics:', e);
    }
  };

  useEffect(() => {
    loadAnalyticsData();

    // Event listeners to sync automatically when tests are completed
    const handleUpdate = () => loadAnalyticsData();
    window.addEventListener('icap_exam_updated', handleUpdate);
    window.addEventListener('icap_exam_reset', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('icap_exam_updated', handleUpdate);
      window.removeEventListener('icap_exam_reset', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Also re-check whenever the tab becomes active
  useEffect(() => {
    if (isActive) {
      loadAnalyticsData();
    }
  }, [isActive]);

  // Derive helper methods for exam metrics
  const getExamCorrectCount = (ex: ExamResult): number => {
    if (typeof ex.correctAnswers === 'number') return ex.correctAnswers;
    if (ex.testMode === 'core') return (ex.grammarScore || 0) + (ex.vocabScore || 0);
    if (ex.testMode === 'reading') return Math.round(((ex.readingScore || 0) / 50) * 23);
    if (ex.testMode === 'writing') return Math.round(((ex.writingScore || 0) / 50) * 5);
    const core = (ex.grammarScore || 0) + (ex.vocabScore || 0);
    const reading = Math.round(((ex.readingScore || 0) / 50) * 23);
    const writing = Math.round(((ex.writingScore || 0) / 50) * 5);
    return core + reading + writing;
  };

  const getExamTotalQuestions = (ex: ExamResult): number => {
    if (typeof ex.totalQuestions === 'number' && ex.totalQuestions > 0) return ex.totalQuestions;
    if (ex.testMode === 'core') return 50;
    if (ex.testMode === 'reading') return 23;
    if (ex.testMode === 'writing') return 5;
    return 78;
  };

  const getExamIncorrectCount = (ex: ExamResult): number => {
    if (typeof ex.incorrectAnswers === 'number') return ex.incorrectAnswers;
    const total = getExamTotalQuestions(ex);
    const correct = getExamCorrectCount(ex);
    const unanswered = ex.unansweredQuestions || 0;
    return Math.max(0, total - correct - unanswered);
  };

  const getExamMaxScore = (ex: ExamResult): number => {
    if (typeof ex.maxScore === 'number' && ex.maxScore > 0) return ex.maxScore;
    if (ex.testMode === 'full') return 150;
    return 50;
  };

  // Aggregated Overall Preparation Progress KPIs
  const totalAttempts = examHistory.length;
  const fullExamsCount = examHistory.filter(e => e.testMode === 'full').length;
  const passedAttempts = examHistory.filter(e => e.isPassed).length;
  const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;

  const avgPercentage = totalAttempts > 0 
    ? Math.round(examHistory.reduce((sum, e) => sum + (e.percentage || 0), 0) / totalAttempts) 
    : 0;

  const bestPercentage = totalAttempts > 0 
    ? Math.max(...examHistory.map(e => e.percentage || 0)) 
    : 0;

  const totalMarksEarned = examHistory.reduce((sum, e) => sum + (e.totalScore || 0), 0);
  const totalMaxMarksPossible = examHistory.reduce((sum, e) => sum + getExamMaxScore(e), 0);

  const totalQuestionsAnswered = examHistory.reduce((sum, e) => sum + getExamTotalQuestions(e), 0);
  const totalCorrectAnswers = examHistory.reduce((sum, e) => sum + getExamCorrectCount(e), 0);
  const totalIncorrectAnswers = examHistory.reduce((sum, e) => sum + getExamIncorrectCount(e), 0);
  const totalUnanswered = examHistory.reduce((sum, e) => sum + (e.unansweredQuestions || 0), 0);

  const overallAccuracyPercent = totalQuestionsAnswered > 0 
    ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100) 
    : 0;

  // Preparation Readiness Index (Weighted towards average score and consistency)
  const readinessIndex = useMemo(() => {
    if (totalAttempts === 0) return 0;
    // Readiness is calculated with 60% average percentage + 40% pass rate
    const score = Math.round((avgPercentage * 0.6) + (passRate * 0.4));
    return Math.min(100, Math.max(0, score));
  }, [totalAttempts, avgPercentage, passRate]);

  // Aggregate Category & Weak Point Heatmap
  const aggregatedTopics: CategoryAccuracy[] = useMemo(() => {
    const topicMap: Record<string, { correct: number; total: number; module: string }> = {};

    if (examHistory.length > 0) {
      examHistory.forEach(ex => {
        // Collect from categoryScores if recorded
        if (ex.categoryScores) {
          Object.entries(ex.categoryScores).forEach(([cat, val]) => {
            if (!topicMap[cat]) {
              let mod = 'Grammar';
              const c = cat.toLowerCase();
              if (c.includes('reading') || c.includes('text') || c.includes('paragraph') || c.includes('gap-fill')) mod = 'Reading';
              else if (c.includes('vocab') || c.includes('synonym') || c.includes('collocation') || c.includes('definition')) mod = 'Vocabulary';
              else if (c.includes('writing') || c.includes('tone') || c.includes('register')) mod = 'Writing';
              topicMap[cat] = { correct: 0, total: 0, module: mod };
            }
            topicMap[cat].correct += val.correct;
            topicMap[cat].total += val.total;
          });
        }
      });
    }

    // If no test history or sparse topics, provide standard ICAP syllabus benchmark topics
    if (Object.keys(topicMap).length === 0) {
      const benchmarkDefaults: Record<string, { correct: number; total: number; module: string }> = {
        'Subject-Verb Agreement': { correct: 4, total: 5, module: 'Grammar' },
        'Prepositions & Collocations': { correct: 2, total: 5, module: 'Grammar' },
        'Inversions & Limiting Adverbials': { correct: 1, total: 4, module: 'Grammar' },
        'Passive Voice in Audit Reports': { correct: 3, total: 5, module: 'Grammar' },
        'Business Definitions & Diction': { correct: 4, total: 5, module: 'Vocabulary' },
        'Synonyms & Word Matching': { correct: 5, total: 5, module: 'Vocabulary' },
        'Reading Gap-Fill & Cohesion': { correct: 2, total: 5, module: 'Reading' },
        'Text Coherence & Sequencing': { correct: 3, total: 6, module: 'Reading' },
        'Multi-Text Information Matching': { correct: 5, total: 7, module: 'Reading' },
        'Formal Email Register': { correct: 4, total: 5, module: 'Writing' }
      };
      Object.entries(benchmarkDefaults).forEach(([k, v]) => {
        topicMap[k] = v;
      });
    }

    const list: CategoryAccuracy[] = Object.entries(topicMap).map(([topic, data]) => {
      const acc = Math.round((data.correct / Math.max(data.total, 1)) * 100);
      let status: 'Weak' | 'Moderate' | 'Strong' = 'Moderate';
      if (acc < 50) status = 'Weak';
      else if (acc >= 75) status = 'Strong';

      return {
        category: topic,
        module: data.module,
        correct: data.correct,
        total: data.total,
        incorrect: Math.max(0, data.total - data.correct),
        accuracy: acc,
        status,
        recommendation: getFallbackTopicTip(topic)
      };
    });

    // Sort by lowest accuracy first (weakest first)
    return list.sort((a, b) => a.accuracy - b.accuracy);
  }, [examHistory]);

  const filteredTopics = useMemo(() => {
    if (topicFilter === 'weak') return aggregatedTopics.filter(t => t.status === 'Weak');
    if (topicFilter === 'moderate') return aggregatedTopics.filter(t => t.status === 'Moderate');
    if (topicFilter === 'strong') return aggregatedTopics.filter(t => t.status === 'Strong');
    return aggregatedTopics;
  }, [aggregatedTopics, topicFilter]);

  // Filter and Sort Exam Attempts
  const processedExamAttempts = useMemo(() => {
    let list = [...examHistory];

    if (attemptFilterMode !== 'all') {
      list = list.filter(e => (e.testMode || 'full') === attemptFilterMode);
    }

    if (attemptSortOrder === 'newest') {
      list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    } else if (attemptSortOrder === 'highest') {
      list.sort((a, b) => (b.percentage || 0) - (a.percentage || 0));
    } else if (attemptSortOrder === 'lowest') {
      list.sort((a, b) => (a.percentage || 0) - (b.percentage || 0));
    }

    return list;
  }, [examHistory, attemptFilterMode, attemptSortOrder]);

  // Execute Stats Reset
  const handleConfirmReset = () => {
    try {
      clearExamHistoryAndTracking();
      localStorage.removeItem('icap_exam_results');
      localStorage.removeItem('icap_writing_results');
      localStorage.removeItem('icap_mastered_flashcards');
      
      setExamHistory([]);
      setWritingHistory([]);
      setMasteredCards({});
      setIsResetModalOpen(false);
      setStatusMessage('All exam statistics, attempts, scores, and accuracy history have been successfully reset.');
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (e) {
      console.warn('Could not reset history:', e);
    }
  };

  const handleResetApiKey = () => {
    try {
      clearGeminiApiKey();
      setStatusMessage('Custom API key removed from browser storage.');
      setTimeout(() => setStatusMessage(null), 3000);
      onOpenApiKeyModal();
    } catch (e) {
      console.warn('Could not reset API key:', e);
    }
  };

  // Flashcards navigation
  const categories = ['All', 'Audit & Assurance', 'Financial Reporting', 'Corporate Law', 'Business Ethics'];
  const filteredFlashcards = flashcards.filter(
    (fc) => selectedCategory === 'All' || fc.category === selectedCategory
  );
  const currentCard = filteredFlashcards[currentCardIndex] || filteredFlashcards[0];

  const handleSpeakPhrase = (e: React.MouseEvent, phrase: string) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(phrase);
      u.rate = 0.9;
      u.lang = 'en-GB';
      window.speechSynthesis.speak(u);
    }
  };

  const handleToggleMastered = (cardId: string) => {
    const updated = {
      ...masteredCards,
      [cardId]: !masteredCards[cardId]
    };
    setMasteredCards(updated);
    try {
      localStorage.setItem('icap_mastered_flashcards', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleNextCard = () => {
    if (filteredFlashcards.length === 0) return;
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % filteredFlashcards.length);
  };

  const handlePrevCard = () => {
    if (filteredFlashcards.length === 0) return;
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + filteredFlashcards.length) % filteredFlashcards.length);
  };

  // Helper for formatting time
  const formatDuration = (seconds: number): string => {
    if (!seconds || seconds <= 0) return '0 min';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m >= 60) {
      const h = Math.floor(m / 60);
      const remM = m % 60;
      return `${h}h ${remM}m`;
    }
    return `${m}m ${s > 0 ? `${s}s` : ''}`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* TOP NAVIGATION & ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {onBackToMain && (
          <button
            onClick={onBackToMain}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition shadow-sm"
            title="Return to Main Practice Exam Page"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>← Back to Practice Exam</span>
          </button>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {onStartExam && (
            <button
              onClick={onStartExam}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition shadow-sm"
              title="Launch Practice Test"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Take Practice Exam</span>
            </button>
          )}

          <button
            onClick={() => setIsResetModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition shadow-sm"
            title="Clear all recorded test attempts and reset stats"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
            <span>Reset Stats</span>
          </button>

          <button
            onClick={onOpenApiKeyModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Manage Gemini AI API Key"
          >
            <Key className="w-3.5 h-3.5 text-emerald-400" />
            <span>API Key</span>
          </button>
        </div>
      </div>

      {/* SUCCESS / STATUS BANNER */}
      {statusMessage && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl text-xs font-medium flex items-center justify-between animate-fade-in shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
          <button 
            onClick={() => setStatusMessage(null)} 
            className="text-emerald-400 hover:text-white ml-2 text-sm font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* DASHBOARD HERO HEADER */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                Performance Analytics & Preparation Tracking
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {totalAttempts} {totalAttempts === 1 ? 'Exam Attempt' : 'Exam Attempts'} Logged
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              ICAP ECS Student Progress & Diagnostic Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Real-time tracking of marks, percentages, correct and incorrect answers, topic diagnostic accuracy heatmaps, and exam preparation readiness for the Aptis ICAP English Communication Skills exam.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto flex-shrink-0">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center min-w-[120px]">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Readiness</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-0.5">
                {totalAttempts > 0 ? `${readinessIndex}%` : '--'}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                {totalAttempts === 0 ? 'No tests yet' : readinessIndex >= 75 ? 'Exam Ready' : readinessIndex >= 60 ? 'Approaching' : 'Needs Practice'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: OVERALL PREPARATION PROGRESS & METRIC CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-500" />
            <span>Overall Preparation Progress</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Based on all completed mock tests
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          
          {/* Card 1: Overall Readiness */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Readiness</span>
              <BrainCircuit className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {totalAttempts > 0 ? `${readinessIndex}%` : '0%'}
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-700" 
                style={{ width: `${Math.max(readinessIndex, 4)}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {totalAttempts === 0 ? 'Start your 1st test' : readinessIndex >= 75 ? 'Target achieved (≥75%)' : 'Target: 75% for pass'}
            </div>
          </div>

          {/* Card 2: Tests Attempted */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Attempts</span>
              <FileText className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {totalAttempts}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
              <span className="text-emerald-500 font-bold">{fullExamsCount} Full</span>
              <span>•</span>
              <span>{totalAttempts - fullExamsCount} Modular</span>
            </div>
            <div className="text-[10px] text-slate-400">
              {totalAttempts > 0 ? 'Tests recorded' : 'No tests recorded'}
            </div>
          </div>

          {/* Card 3: Average Score */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Avg Score</span>
              <Percent className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {totalAttempts > 0 ? `${avgPercentage}%` : '--'}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Best: <strong className="text-emerald-500 font-bold">{totalAttempts > 0 ? `${bestPercentage}%` : '--'}</strong>
            </div>
            <div className="text-[10px] text-slate-400">
              {avgPercentage >= 65 ? 'CEFR Band B2/C' : avgPercentage >= 50 ? 'CEFR Band B1' : 'Needs Practice'}
            </div>
          </div>

          {/* Card 4: Total Marks Scored */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Total Marks</span>
              <Award className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white truncate">
              {totalMarksEarned} <span className="text-xs font-normal text-slate-400">/ {totalMaxMarksPossible}</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {totalMaxMarksPossible > 0 ? `${Math.round((totalMarksEarned / totalMaxMarksPossible) * 100)}% of total marks` : '0 marks'}
            </div>
            <div className="text-[10px] text-slate-400">
              Cumulative score
            </div>
          </div>

          {/* Card 5: Correct vs Incorrect Questions */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Answers</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {totalCorrectAnswers} <span className="text-xs font-medium text-emerald-500">✓</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <span className="text-rose-500">{totalIncorrectAnswers} ✗ wrong</span>
              {totalUnanswered > 0 && (
                <span className="text-slate-400">({totalUnanswered} skip)</span>
              )}
            </div>
            <div className="text-[10px] text-slate-400">
              {overallAccuracyPercent}% overall accuracy
            </div>
          </div>

          {/* Card 6: Pass Rate */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Pass Rate</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {totalAttempts > 0 ? `${passRate}%` : '--'}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <strong className="text-emerald-500 font-bold">{passedAttempts}</strong> of {totalAttempts} passed
            </div>
            <div className="text-[10px] text-slate-400">
              Benchmark: ≥ 50%
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: TOPICS NEEDING IMPROVEMENT & DIAGNOSTIC HEATMAP */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Topics Needing Improvement & Diagnostic Heatmap
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live accuracy tracking by topic with actionable preparation tips for your weakest areas
            </p>
          </div>

          {/* Topic Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setTopicFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                topicFilter === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All Topics ({aggregatedTopics.length})
            </button>
            <button
              onClick={() => setTopicFilter('weak')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                topicFilter === 'weak'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100'
              }`}
            >
              <span>🔴 Weak (&lt; 50%)</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-rose-500/20 rounded-full font-extrabold">
                {aggregatedTopics.filter(t => t.status === 'Weak').length}
              </span>
            </button>
            <button
              onClick={() => setTopicFilter('moderate')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                topicFilter === 'moderate'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 hover:bg-amber-100'
              }`}
            >
              <span>🟡 Moderate (50-74%)</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 rounded-full font-extrabold">
                {aggregatedTopics.filter(t => t.status === 'Moderate').length}
              </span>
            </button>
            <button
              onClick={() => setTopicFilter('strong')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                topicFilter === 'strong'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100'
              }`}
            >
              <span>🟢 Mastered (≥ 75%)</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 rounded-full font-extrabold">
                {aggregatedTopics.filter(t => t.status === 'Strong').length}
              </span>
            </button>
          </div>
        </div>

        {/* Topics List with Visual Bars and Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTopics.map((topic, idx) => {
            const isWeak = topic.status === 'Weak';
            const isModerate = topic.status === 'Moderate';

            let barColor = 'from-emerald-500 to-teal-400';
            let badgeBg = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
            let borderStyle = 'border-slate-200 dark:border-slate-800';

            if (isWeak) {
              barColor = 'from-rose-500 to-rose-400';
              badgeBg = 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
              borderStyle = 'border-rose-200/80 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-950/10';
            } else if (isModerate) {
              barColor = 'from-amber-500 to-amber-400';
              badgeBg = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
              borderStyle = 'border-amber-200/80 dark:border-amber-900/40 bg-amber-50/20 dark:bg-amber-950/10';
            }

            return (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl border ${borderStyle} space-y-3 transition hover:shadow-md`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {topic.module}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${badgeBg}`}>
                        {topic.status === 'Weak' ? '⚠️ Weak Topic' : topic.status === 'Moderate' ? 'Needs Review' : '✓ Mastered'}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5">
                      {topic.category}
                    </h3>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-base font-black text-slate-900 dark:text-white">
                      {topic.accuracy}%
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      {topic.correct} / {topic.total} correct
                    </div>
                  </div>
                </div>

                {/* Accuracy Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`bg-gradient-to-r ${barColor} h-2 rounded-full transition-all duration-700`}
                    style={{ width: `${Math.max(topic.accuracy, 6)}%` }}
                  />
                </div>

                {/* Target Recommendation / Actionable Tip */}
                <div className="text-[11px] p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                  <Info className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-800 dark:text-slate-200">Study Tip:</strong> {topic.recommendation}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* SECTION 3: ALL RECORDED TEST ATTEMPTS WITH MARKS, PERCENTAGES, CORRECT & INCORRECT */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Exam Attempts & Comprehensive Test History
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tracks every test submission with marks, percentage, correct/incorrect questions, and module breakdowns
            </p>
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <span className="text-slate-400 px-1.5 text-[11px]">Filter:</span>
              <button
                onClick={() => setAttemptFilterMode('all')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  attemptFilterMode === 'all' 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold' 
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                All ({examHistory.length})
              </button>
              <button
                onClick={() => setAttemptFilterMode('full')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  attemptFilterMode === 'full' 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold' 
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Full (1h50m)
              </button>
              <button
                onClick={() => setAttemptFilterMode('core')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  attemptFilterMode === 'core' 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold' 
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Core
              </button>
              <button
                onClick={() => setAttemptFilterMode('reading')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  attemptFilterMode === 'reading' 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold' 
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Reading
              </button>
              <button
                onClick={() => setAttemptFilterMode('writing')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  attemptFilterMode === 'writing' 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold' 
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Writing
              </button>
            </div>

            <select
              value={attemptSortOrder}
              onChange={(e) => setAttemptSortOrder(e.target.value as any)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="newest">Newest First</option>
              <option value="highest">Highest Score</option>
              <option value="lowest">Lowest Score</option>
            </select>
          </div>
        </div>

        {/* Test Attempts List */}
        {processedExamAttempts.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border-2 border-dashed border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No Practice Exam Attempts Recorded Yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Take your first timed mock exam to automatically log your marks, percentages, correct vs incorrect question counts, and weak-point diagnostics here.
            </p>
            {onStartExam && (
              <button
                onClick={onStartExam}
                className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition shadow-md inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Full Exam (1 Hour 50 Minutes)</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {processedExamAttempts.map((attempt, index) => {
              const maxScore = getExamMaxScore(attempt);
              const correctCount = getExamCorrectCount(attempt);
              const totalQ = getExamTotalQuestions(attempt);
              const incorrectCount = getExamIncorrectCount(attempt);
              const unansweredCount = attempt.unansweredQuestions || 0;
              const isExpanded = expandedAttemptId === attempt.id;

              const modeLabel = 
                attempt.testMode === 'full' ? 'Full Exam (1h 50m)' :
                attempt.testMode === 'core' ? 'Core Test (25m)' :
                attempt.testMode === 'reading' ? 'Reading Test (35m)' : 'Writing Test (50m)';

              return (
                <div 
                  key={attempt.id || index}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-xs"
                >
                  {/* Top Row: Title, Date, Mode & Pass Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${
                          attempt.testMode === 'full' 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                        }`}>
                          {modeLabel}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {attempt.date}
                        </span>
                        {attempt.timeSpentSeconds > 0 && (
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            • {formatDuration(attempt.timeSpentSeconds)} spent
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {attempt.testTitle || `ICAP Practice Exam Attempt #${processedExamAttempts.length - index}`}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wide ${
                        attempt.isPassed 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' 
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                      }`}>
                        {attempt.isPassed ? '✓ PASSED' : '⚠️ NEEDS WORK'}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        Band {attempt.cefrLevel || 'B1'}
                      </span>
                    </div>
                  </div>

                  {/* Middle Row: Marks, Percentage, and Answers Count Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                    
                    {/* Marks Scored */}
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                        Marks Scored
                      </span>
                      <div className="text-lg font-black text-slate-900 dark:text-white">
                        {attempt.totalScore} <span className="text-xs text-slate-400 font-normal">/ {maxScore}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {attempt.percentage}% of total marks
                      </span>
                    </div>

                    {/* Percentage */}
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                        Percentage
                      </span>
                      <div className="text-lg font-black text-emerald-500">
                        {attempt.percentage}%
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Passing benchmark: 50%
                      </span>
                    </div>

                    {/* Correct Answers */}
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                        Correct Answers
                      </span>
                      <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{correctCount}</span>
                        <span className="text-xs font-normal text-slate-400">/ {totalQ}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0}% accuracy
                      </span>
                    </div>

                    {/* Incorrect Answers */}
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                        Incorrect / Skipped
                      </span>
                      <div className="text-lg font-black text-rose-500 flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        <span>{incorrectCount}</span>
                        {unansweredCount > 0 && (
                          <span className="text-xs font-normal text-slate-400">
                            (+{unansweredCount} skip)
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Mistakes to review
                      </span>
                    </div>

                  </div>

                  {/* Sectional Breakdown Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="text-[11px] font-bold text-slate-400 mr-1">Section Scores:</span>
                    
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Grammar: <strong className="text-slate-900 dark:text-white font-bold">{attempt.grammarScore ?? 0}</strong>/25
                    </span>

                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Vocab: <strong className="text-slate-900 dark:text-white font-bold">{attempt.vocabScore ?? 0}</strong>/25
                    </span>

                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      Reading: <strong className="text-slate-900 dark:text-white font-bold">{attempt.readingScore ?? 0}</strong>/50
                    </span>

                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      Writing: <strong className="text-slate-900 dark:text-white font-bold">{attempt.writingScore ?? 0}</strong>/50
                    </span>

                    <button
                      onClick={() => setExpandedAttemptId(isExpanded ? null : attempt.id)}
                      className="ml-auto text-xs font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-emerald-500/10 transition"
                    >
                      <span>{isExpanded ? 'Hide Topic Details' : 'View Topic Details'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Expandable Topic Diagnostic for this Specific Attempt */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3 animate-fade-in">
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        <span>Topic Diagnostic Breakdown for this Attempt:</span>
                      </div>

                      {attempt.topicsNeedingImprovement && attempt.topicsNeedingImprovement.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {attempt.topicsNeedingImprovement.map((topic, ti) => (
                            <div 
                              key={ti}
                              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5"
                            >
                              <div className="flex items-center justify-between font-bold">
                                <span className="text-slate-800 dark:text-slate-200">{topic.topic}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                  topic.accuracy < 50 
                                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                }`}>
                                  {topic.accuracy}% ({topic.incorrectCount} mistakes)
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                {topic.recommendation}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 dark:text-slate-400">
                          Great job! No critical weak topics were flagged for this attempt.
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* SECTION 4: BUSINESS VOCABULARY & COLLOCATION FLASHCARD ENGINE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                Collocation Flashcard Engine
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                ICAP High-Frequency Business Word Pairs
              </span>
            </div>
            <h2 className="text-xl font-display font-extrabold text-slate-900 dark:text-white">
              Interactive 3D Business Phrase Cards
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Interactive Flip-Card Container */}
        {currentCard && (
          <div className="max-w-2xl mx-auto">
            
            <div className="text-center text-xs text-slate-500 mb-2 font-medium">
              Card {currentCardIndex + 1} of {filteredFlashcards.length} • Click card to flip
            </div>

            {/* Flip Card Stage */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full min-h-[300px] cursor-pointer rounded-3xl border-2 transition-all duration-300 transform perspective-1000 shadow-lg p-6 sm:p-8 flex flex-col justify-between relative bg-gradient-to-br from-slate-900 to-slate-950 text-white border-slate-800 hover:border-emerald-500/50 select-none"
            >
              {!isFlipped ? (
                /* FRONT OF CARD */
                <div className="flex flex-col justify-between h-full space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {currentCard.category}
                    </span>
                    <button
                      onClick={(e) => handleSpeakPhrase(e, currentCard.phrase)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 transition"
                      title="Audio Pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-center py-6">
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                      "{currentCard.phrase}"
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-emerald-400 mt-2">
                      {currentCard.pronunciation}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
                    <span className="flex items-center gap-1">
                      <Rotate3d className="w-3.5 h-3.5 text-emerald-400" /> Click to reveal definition & Urdu
                    </span>
                    {masteredCards[currentCard.id] && (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mastered
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                /* BACK OF CARD */
                <div className="flex flex-col justify-between h-full space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                      Accounting Definition
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMastered(currentCard.id);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                        masteredCards[currentCard.id]
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{masteredCards[currentCard.id] ? 'Mastered!' : 'Mark Mastered'}</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                      {currentCard.definition}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
                      <strong className="text-emerald-400 block mb-1">CA Context Example:</strong>
                      "{currentCard.exampleSentence}"
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs space-y-1">
                      <div className="text-emerald-300 font-urdu text-sm">
                        {currentCard.urduMeaning}
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Roman Urdu: {currentCard.romanUrdu}
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                    Click to flip back
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handlePrevCard}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={() => handleToggleMastered(currentCard.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  masteredCards[currentCard.id]
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{masteredCards[currentCard.id] ? 'Card Mastered' : 'Mark as Known'}</span>
              </button>

              <button
                onClick={handleNextCard}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>

      {/* SECTION 5: PRIVACY & SYSTEM STORAGE MANAGEMENT */}
      <div className="bg-slate-100 dark:bg-slate-900/60 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">
            Client-Side Privacy & Storage Settings
          </h4>
          <p>
            All test records, marks, answer history, and API keys are stored locally on your device in browser localStorage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetApiKey}
            className="px-3.5 py-2 font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-xl transition shadow-xs"
          >
            Update / Clear API Key
          </button>
          <button
            onClick={() => setIsResetModalOpen(true)}
            className="px-3.5 py-2 font-bold text-rose-600 dark:text-rose-400 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 rounded-xl transition shadow-xs"
          >
            Reset All Statistics
          </button>
        </div>
      </div>

      {/* CONFIRMATION MODAL FOR STATS RESET */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-scale-up">
            
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Reset All Exam Statistics?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This action cannot be reversed
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p className="font-semibold text-slate-900 dark:text-white">
                Are you sure you want to clear your statistics? This will permanently delete:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-500 dark:text-slate-400">
                <li>All logged test attempts and completion history ({totalAttempts} attempts)</li>
                <li>Marks, percentages, correct & incorrect answers tracking</li>
                <li>Weak point diagnostic heatmaps and topic accuracy metrics</li>
                <li>Seen questions memory and test attempt tracking</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-rose-600 hover:bg-rose-500 text-white transition shadow-md flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Reset All Statistics</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
