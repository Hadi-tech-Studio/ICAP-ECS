import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  BookOpen, 
  Languages, 
  Sparkles, 
  Filter, 
  Check, 
  X, 
  HelpCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight,
  Scale,
  Award
} from 'lucide-react';
import { AptisTestSet, StudentExamAnswers, WritingEvaluation } from '../types';
import { APTIS_TEST_SET_1 } from '../data/aptisMockData';
import { 
  evaluateExamWritingTaskSync, 
  evaluateExamWritingTask, 
  WritingFeedbackResult 
} from '../lib/writingFeedback';
import { WritingFeedbackDisplay } from './WritingFeedbackDisplay';

interface ExamSolutionReviewProps {
  testSet: AptisTestSet;
  studentAnswers: StudentExamAnswers;
  testMode?: 'full' | 'core' | 'reading' | 'writing';
  writingEvaluation?: WritingEvaluation | null;
}

export const ExamSolutionReview: React.FC<ExamSolutionReviewProps> = ({
  testSet,
  studentAnswers,
  testMode = 'full',
  writingEvaluation
}) => {
  const [activeSection, setActiveSection] = useState<'all' | 'grammar' | 'vocab' | 'reading' | 'writing'>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'incorrectOnly'>('all');
  const [showUrdu, setShowUrdu] = useState<boolean>(true);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Safe normalized answer objects to prevent any undefined access
  const safeGrammarAnswers = useMemo(() => studentAnswers?.grammarAnswers || {}, [studentAnswers?.grammarAnswers]);
  const safeVocabMatchingAnswers = useMemo(() => studentAnswers?.vocabMatchingAnswers || {}, [studentAnswers?.vocabMatchingAnswers]);
  const safeVocabDefAnswers = useMemo(() => studentAnswers?.vocabDefAnswers || {}, [studentAnswers?.vocabDefAnswers]);
  const safeVocabCollocAnswers = useMemo(() => studentAnswers?.vocabCollocAnswers || {}, [studentAnswers?.vocabCollocAnswers]);
  const safeVocabSentenceAnswers = useMemo(() => studentAnswers?.vocabSentenceAnswers || {}, [studentAnswers?.vocabSentenceAnswers]);
  const safeVocabContextAnswers = useMemo(() => studentAnswers?.vocabContextAnswers || {}, [studentAnswers?.vocabContextAnswers]);
  const safeReadingSec1Answers = useMemo(() => studentAnswers?.readingSec1Answers || {}, [studentAnswers?.readingSec1Answers]);
  const safeReadingSec2Order = useMemo(() => {
    return studentAnswers?.readingSec2Order && studentAnswers.readingSec2Order.length === 6
      ? studentAnswers.readingSec2Order
      : [0, 1, 2, 3, 4, 5];
  }, [studentAnswers?.readingSec2Order]);
  const safeReadingSec3Answers = useMemo(() => studentAnswers?.readingSec3Answers || {}, [studentAnswers?.readingSec3Answers]);
  const safeReadingSec4Answers = useMemo(() => studentAnswers?.readingSec4Answers || {}, [studentAnswers?.readingSec4Answers]);
  const safeWritingPart1Answers = useMemo(() => studentAnswers?.writingPart1Answers || studentAnswers?.writingPart1 || {}, [studentAnswers?.writingPart1Answers, studentAnswers?.writingPart1]);
  const safeWritingPart2Answer = studentAnswers?.writingPart2Answer || studentAnswers?.writingPart2 || '';
  const safeWritingPart3Answers = useMemo(() => studentAnswers?.writingPart3Answers || studentAnswers?.writingPart3 || {}, [studentAnswers?.writingPart3Answers, studentAnswers?.writingPart3]);
  const safeWritingPart4AAnswer = studentAnswers?.writingPart4AAnswer || studentAnswers?.writingPart4A || '';
  const safeWritingPart4BAnswer = studentAnswers?.writingPart4BAnswer || studentAnswers?.writingPart4B || '';

  // 1. Part 1 Feedback (1-5 word answers checked against limits and sample answers)
  const part1Feedbacks = useMemo(() => {
    const map: Record<string, WritingFeedbackResult> = {};
    testSet.writing?.part1?.questions?.forEach(q => {
      const text = safeWritingPart1Answers[q.id] || '';
      if (text.trim()) {
        map[q.id] = evaluateExamWritingTaskSync(
          text,
          q.sampleAnswer,
          { taskName: `Part 1: ${q.prompt}`, prompt: q.prompt, targetWordCount: '1–5 words', register: 'general' }
        );
      }
    });
    return map;
  }, [safeWritingPart1Answers, testSet.writing?.part1?.questions]);

  // Initial Sync Feedbacks
  const initialPart2Feedback = useMemo(() => {
    if (!safeWritingPart2Answer?.trim() || !testSet.writing?.part2) return null;
    return evaluateExamWritingTaskSync(
      safeWritingPart2Answer,
      testSet.writing.part2.sampleAnswer,
      { taskName: 'Part 2: Short Form Filling', prompt: testSet.writing.part2.prompt, targetWordCount: '20–30 words', register: 'formal' }
    );
  }, [safeWritingPart2Answer, testSet.writing?.part2]);

  const initialPart3Feedbacks = useMemo(() => {
    const map: Record<string, WritingFeedbackResult> = {};
    testSet.writing?.part3?.memberChats?.forEach(chat => {
      const text = safeWritingPart3Answers[chat.id] || '';
      if (text.trim()) {
        map[chat.id] = evaluateExamWritingTaskSync(
          text,
          chat.sampleAnswer,
          { taskName: `Part 3: Response to ${chat.memberName}`, prompt: chat.message, targetWordCount: '30–40 words', register: 'formal' }
        );
      }
    });
    return map;
  }, [safeWritingPart3Answers, testSet.writing?.part3?.memberChats]);

  const initialPart4AFeedback = useMemo(() => {
    if (!safeWritingPart4AAnswer?.trim() || !testSet.writing?.part4?.taskA) return null;
    return evaluateExamWritingTaskSync(
      safeWritingPart4AAnswer,
      testSet.writing.part4.taskA.sampleAnswer,
      { taskName: 'Task 4A: Informal Email', prompt: testSet.writing.part4.taskA.prompt, targetWordCount: '40–60 words', register: 'informal' }
    );
  }, [safeWritingPart4AAnswer, testSet.writing?.part4?.taskA]);

  const initialPart4BFeedback = useMemo(() => {
    if (!safeWritingPart4BAnswer?.trim() || !testSet.writing?.part4?.taskB) return null;
    return evaluateExamWritingTaskSync(
      safeWritingPart4BAnswer,
      testSet.writing.part4.taskB.sampleAnswer,
      { taskName: 'Task 4B: Formal Email', prompt: testSet.writing.part4.taskB.prompt, targetWordCount: '120–150 words', register: 'formal' }
    );
  }, [safeWritingPart4BAnswer, testSet.writing?.part4?.taskB]);

  const [part2Feedback, setPart2Feedback] = useState<WritingFeedbackResult | null>(initialPart2Feedback);
  const [part3Feedbacks, setPart3Feedbacks] = useState<Record<string, WritingFeedbackResult>>(initialPart3Feedbacks);
  const [part4AFeedback, setPart4AFeedback] = useState<WritingFeedbackResult | null>(initialPart4AFeedback);
  const [part4BFeedback, setPart4BFeedback] = useState<WritingFeedbackResult | null>(initialPart4BFeedback);

  // Sync state when initial feedback memo changes
  useEffect(() => {
    setPart2Feedback(initialPart2Feedback);
  }, [initialPart2Feedback]);

  useEffect(() => {
    setPart3Feedbacks(initialPart3Feedbacks);
  }, [initialPart3Feedbacks]);

  useEffect(() => {
    setPart4AFeedback(initialPart4AFeedback);
  }, [initialPart4AFeedback]);

  useEffect(() => {
    setPart4BFeedback(initialPart4BFeedback);
  }, [initialPart4BFeedback]);

  const part3Serialized = useMemo(() => JSON.stringify(safeWritingPart3Answers), [safeWritingPart3Answers]);

  // Asynchronously upgrade feedback with Gemini analysis in the background without blocking render
  useEffect(() => {
    let isCancelled = false;

    const runAsyncWritingEvaluation = async () => {
      // Part 2
      if (safeWritingPart2Answer?.trim() && testSet.writing?.part2) {
        try {
          const res = await evaluateExamWritingTask(
            safeWritingPart2Answer,
            testSet.writing.part2.sampleAnswer,
            { taskName: 'Part 2: Short Form Filling', prompt: testSet.writing.part2.prompt, register: 'formal' }
          );
          if (!isCancelled && res) setPart2Feedback(res);
        } catch {
          // Keep instantaneous client evaluation
        }
      }

      // Part 3 member chats
      if (testSet.writing?.part3?.memberChats) {
        for (const chat of testSet.writing.part3.memberChats) {
          const text = safeWritingPart3Answers[chat.id] || '';
          if (text.trim()) {
            try {
              const res = await evaluateExamWritingTask(
                text,
                chat.sampleAnswer,
                { taskName: `Part 3: Response to ${chat.memberName}`, prompt: chat.message, register: 'formal' }
              );
              if (!isCancelled && res) {
                setPart3Feedbacks(prev => ({ ...prev, [chat.id]: res }));
              }
            } catch {
              // Keep instantaneous client evaluation
            }
          }
        }
      }

      // Part 4A
      if (safeWritingPart4AAnswer?.trim() && testSet.writing?.part4?.taskA) {
        try {
          const res = await evaluateExamWritingTask(
            safeWritingPart4AAnswer,
            testSet.writing.part4.taskA.sampleAnswer,
            { taskName: 'Task 4A: Informal Email', prompt: testSet.writing.part4.taskA.prompt, register: 'informal' }
          );
          if (!isCancelled && res) setPart4AFeedback(res);
        } catch {
          // Keep instantaneous client evaluation
        }
      }

      // Part 4B
      if (safeWritingPart4BAnswer?.trim() && testSet.writing?.part4?.taskB) {
        try {
          const res = await evaluateExamWritingTask(
            safeWritingPart4BAnswer,
            testSet.writing.part4.taskB.sampleAnswer,
            { taskName: 'Task 4B: Formal Email', prompt: testSet.writing.part4.taskB.prompt, register: 'formal' }
          );
          if (!isCancelled && res) setPart4BFeedback(res);
        } catch {
          // Keep instantaneous client evaluation
        }
      }
    };

    runAsyncWritingEvaluation();

    return () => {
      isCancelled = true;
    };
  }, [
    testSet.id,
    safeWritingPart2Answer,
    part3Serialized,
    safeWritingPart4AAnswer,
    safeWritingPart4BAnswer
  ]);

  // Grammar Stats
  const grammarQuestionsList = (testSet?.core?.grammarQuestions && testSet.core.grammarQuestions.length > 0)
    ? testSet.core.grammarQuestions
    : APTIS_TEST_SET_1.core.grammarQuestions;
  const totalGrammar = grammarQuestionsList.length;
  const correctGrammarCount = grammarQuestionsList.filter(
    q => safeGrammarAnswers[q.id] === q.correctIndex
  ).length;

  // Vocab Stats
  const totalVocab1 = testSet.core.vocabWordMatching.length;
  const correctVocab1 = testSet.core.vocabWordMatching.filter(
    item => (safeVocabMatchingAnswers[item.id] || '').trim().toLowerCase() === item.correctMatch.trim().toLowerCase()
  ).length;

  const totalVocab2 = testSet.core.vocabDefinitions.length;
  const correctVocab2 = testSet.core.vocabDefinitions.filter(
    item => (safeVocabDefAnswers[item.id] || '').trim().toLowerCase() === item.correctWord.trim().toLowerCase()
  ).length;

  const totalVocab3 = testSet.core.vocabCollocations.length;
  const correctVocab3 = testSet.core.vocabCollocations.filter(
    item => safeVocabCollocAnswers[item.id] === item.correctIndex
  ).length;

  const totalVocab4 = testSet.core.vocabSentenceCompletion.length;
  const correctVocab4 = testSet.core.vocabSentenceCompletion.filter(
    item => safeVocabSentenceAnswers[item.id] === item.correctIndex
  ).length;

  const totalVocab5 = testSet.core.vocabContextMatching.length;
  const correctVocab5 = testSet.core.vocabContextMatching.filter(
    item => (safeVocabContextAnswers[item.id] || '').trim().toLowerCase() === item.correctMatch.trim().toLowerCase()
  ).length;

  const totalVocab = totalVocab1 + totalVocab2 + totalVocab3 + totalVocab4 + totalVocab5;
  const correctVocabCount = correctVocab1 + correctVocab2 + correctVocab3 + correctVocab4 + correctVocab5;

  // Reading Stats
  const correctReadingSec1 = testSet.reading.section1.paragraphs.filter(
    p => safeReadingSec1Answers[p.gapId] === p.correctIndex
  ).length;

  // Reading Sec 2
  const correctReadingSec2 = safeReadingSec2Order.filter(
    (val, idx) => val === testSet.reading.section2.correctOrder[idx]
  ).length;

  const correctReadingSec3 = testSet.reading.section3.questions.filter(
    q => (safeReadingSec3Answers[q.id] || '').toUpperCase() === q.correctPersonId.toUpperCase()
  ).length;

  const correctReadingSec4 = testSet.reading.section4.paragraphs.filter(
    p => safeReadingSec4Answers[p.id] === p.correctHeadingIndex
  ).length;

  const totalReading = testSet.reading.section1.paragraphs.length + 6 + testSet.reading.section3.questions.length + testSet.reading.section4.paragraphs.length;
  const correctReadingCount = correctReadingSec1 + correctReadingSec2 + correctReadingSec3 + correctReadingSec4;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl">
      
      {/* SECTION HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Detailed Answer Key & Comprehensive Solutions
              </h3>
              <p className="text-xs text-slate-400">
                Compare your submitted selections against the official answer key with in-depth grammatical rules and conceptual explanations.
              </p>
            </div>
          </div>
        </div>

        {/* Global Controls: Urdu toggle & Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterMode(prev => prev === 'all' ? 'incorrectOnly' : 'all')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
              filterMode === 'incorrectOnly'
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-300'
            }`}
            title="Filter to focus on mistakes"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{filterMode === 'incorrectOnly' ? 'Showing: Mistakes Only' : 'Showing: All Questions'}</span>
          </button>

          <button
            onClick={() => setShowUrdu(!showUrdu)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
              showUrdu
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{showUrdu ? 'Urdu Notes: ON' : 'Urdu Notes: OFF'}</span>
          </button>
        </div>
      </div>

      {/* SECTION SELECTOR TABS */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        <button
          onClick={() => setActiveSection('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSection === 'all'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 border border-slate-700/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Modules</span>
        </button>

        {(testMode === 'full' || testMode === 'core') && (
          <>
            <button
              onClick={() => setActiveSection('grammar')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeSection === 'grammar'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 border border-slate-700/60'
              }`}
            >
              <span>1. Grammar (25 Qs)</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                activeSection === 'grammar' ? 'bg-slate-950/40 text-slate-900 font-black' : 'bg-slate-900 text-emerald-400'
              }`}>
                {correctGrammarCount}/25
              </span>
            </button>

            <button
              onClick={() => setActiveSection('vocab')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeSection === 'vocab'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 border border-slate-700/60'
              }`}
            >
              <span>2. Vocabulary (25 Qs)</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                activeSection === 'vocab' ? 'bg-slate-950/40 text-slate-900 font-black' : 'bg-slate-900 text-teal-400'
              }`}>
                {correctVocabCount}/25
              </span>
            </button>
          </>
        )}

        {(testMode === 'full' || testMode === 'reading') && (
          <button
            onClick={() => setActiveSection('reading')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSection === 'reading'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 border border-slate-700/60'
            }`}
          >
            <span>3. Reading (4 Tasks)</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
              activeSection === 'reading' ? 'bg-slate-950/40 text-slate-900 font-black' : 'bg-slate-900 text-blue-400'
            }`}>
              {correctReadingCount}/{totalReading}
            </span>
          </button>
        )}

        {(testMode === 'full' || testMode === 'writing') && (
          <button
            onClick={() => setActiveSection('writing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSection === 'writing'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 border border-slate-700/60'
            }`}
          >
            <span>4. Writing Tasks & Model Answers</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
              activeSection === 'writing' ? 'bg-slate-950/40 text-slate-900 font-black' : 'bg-slate-900 text-amber-400'
            }`}>
              4 Parts
            </span>
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. GRAMMAR REVIEW SECTION                                                 */}
      {/* ========================================================================= */}
      {(activeSection === 'all' || activeSection === 'grammar') && (testMode === 'full' || testMode === 'core') && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between bg-slate-850 p-4 rounded-2xl border border-slate-750">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                1
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Part 1: Grammar (Questions 1 – 25)
                </h4>
                <p className="text-xs text-slate-400">
                  Sentence structure, tenses, conditionals, modals, and prepositions
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-400">
                Score: {correctGrammarCount} / {totalGrammar} ({Math.round((correctGrammarCount / totalGrammar) * 100)}%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {grammarQuestionsList
              .filter(q => {
                if (filterMode === 'incorrectOnly') {
                  return safeGrammarAnswers[q.id] !== q.correctIndex;
                }
                return true;
              })
              .map((q, idx) => {
                const studentSelection = safeGrammarAnswers[q.id];
                const isAnswered = studentSelection !== undefined;
                const isCorrect = isAnswered && studentSelection === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition ${
                      !isAnswered
                        ? 'bg-slate-850/60 border-slate-700/60'
                        : isCorrect
                        ? 'bg-emerald-950/15 border-emerald-500/30'
                        : 'bg-rose-950/15 border-rose-500/30'
                    }`}
                  >
                    {/* Top Row: Q Number, Category & Student Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-750">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                          Q{idx + 1}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                          Category: <span className="text-slate-300 font-semibold">{q.category}</span>
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div>
                        {!isAnswered ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                            <HelpCircle className="w-3 h-3 text-slate-400" />
                            <span>Not Attempted</span>
                          </span>
                        ) : isCorrect ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Correct (+1 mark)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                            <XCircle className="w-3 h-3 text-rose-400" />
                            <span>Incorrect</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question Prompt */}
                    <div className="py-3">
                      <p className="text-sm font-semibold text-white leading-relaxed">
                        {q.question}
                      </p>
                    </div>

                    {/* Options Grid with Visual Marking */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-3">
                      {q.options.map((opt, optIdx) => {
                        const isStudentChoice = studentSelection === optIdx;
                        const isTheCorrectOption = optIdx === q.correctIndex;

                        let optClasses = 'bg-slate-800/60 border-slate-700/60 text-slate-300';
                        if (isTheCorrectOption) {
                          optClasses = 'bg-emerald-900/30 border-emerald-500/60 text-emerald-200 font-bold';
                        } else if (isStudentChoice && !isTheCorrectOption) {
                          optClasses = 'bg-rose-900/30 border-rose-500/60 text-rose-200 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${optClasses}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-md bg-slate-900/80 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>

                            {/* Label for this option */}
                            <div className="shrink-0">
                              {isTheCorrectOption && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950">
                                  <Check className="w-3 h-3" /> Correct Answer
                                </span>
                              )}
                              {isStudentChoice && !isTheCorrectOption && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white">
                                  <X className="w-3 h-3" /> Your Selection
                                </span>
                              )}
                              {isStudentChoice && isTheCorrectOption && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-400 text-slate-950">
                                  <Check className="w-3 h-3" /> Your Choice (Correct)
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Answer Comparison Summary */}
                    <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-750 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-medium">Your Selected Answer:</span>
                        {isAnswered ? (
                          <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                            isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {q.options[studentSelection]} {isCorrect ? '✓' : '✗'}
                          </span>
                        ) : (
                          <span className="text-slate-500 italic">None (Skipped)</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-medium">Official Correct Answer:</span>
                        <span className="font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                          {q.options[q.correctIndex]}
                        </span>
                      </div>
                    </div>

                    {/* Solution & Detailed Explanation */}
                    <div className="mt-3 pt-3 border-t border-slate-750/70 space-y-2">
                      <div className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                        <span className="font-bold text-emerald-400 block mb-1">📖 Grammatical Solution & Rule:</span>
                        {q.englishExplanation}
                      </div>

                      {showUrdu && q.urduExplanation && (
                        <div className="text-xs text-amber-200/90 leading-relaxed bg-amber-950/20 p-3 rounded-xl border border-amber-500/20 font-medium">
                          <span className="font-bold text-amber-300 block mb-1">اردو وضاحتی نوٹ (Conceptual Urdu Guide):</span>
                          {q.urduExplanation}
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VOCABULARY REVIEW SECTION (TASKS 1 - 5)                                */}
      {/* ========================================================================= */}
      {(activeSection === 'all' || activeSection === 'vocab') && (testMode === 'full' || testMode === 'core') && (
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between bg-slate-850 p-4 rounded-2xl border border-slate-750">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-xs">
                2
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Part 2: Vocabulary (5 Tasks / Questions 26 – 50)
                </h4>
                <p className="text-xs text-slate-400">
                  Synonym matching, formal definitions, collocations, sentence completion, and context matching
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-teal-400">
                Score: {correctVocabCount} / {totalVocab} ({Math.round((correctVocabCount / totalVocab) * 100)}%)
              </span>
            </div>
          </div>

          {/* Task 1: Word Matching */}
          <div className="space-y-3 bg-slate-850/40 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                Task 1: Word Matching (Synonyms) — Questions 26 to 30
              </h5>
              <span className="text-xs font-mono text-slate-400 font-bold">{correctVocab1}/5 correct</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {testSet.core.vocabWordMatching.map((item, idx) => {
                const studentVal = (safeVocabMatchingAnswers[item.id] || '').trim();
                const isAnswered = studentVal !== '';
                const isCorrect = isAnswered && studentVal.toLowerCase() === item.correctMatch.toLowerCase();

                if (filterMode === 'incorrectOnly' && isCorrect) return null;

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                      !isAnswered
                        ? 'bg-slate-800/40 border-slate-700/50'
                        : isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-rose-950/20 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Q{26 + idx}. Target: <span className="text-teal-300 underline font-mono">{item.targetWord}</span></span>
                      {isCorrect ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">✓ Correct</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">✗ Incorrect</span>
                      )}
                    </div>

                    <div className="space-y-1 bg-slate-900/80 p-2.5 rounded-lg border border-slate-750">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Your Selection:</span>
                        <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {isAnswered ? studentVal : '(Not answered)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Correct Synonym:</span>
                        <span className="font-mono font-bold text-emerald-400">{item.correctMatch}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300">{item.explanation}</p>
                    {showUrdu && item.urduExplanation && (
                      <p className="text-[10px] text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-500/20">{item.urduExplanation}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Task 2: Definitions */}
          <div className="space-y-3 bg-slate-850/40 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                Task 2: Definitions Matching — Questions 31 to 35
              </h5>
              <span className="text-xs font-mono text-slate-400 font-bold">{correctVocab2}/5 correct</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {testSet.core.vocabDefinitions.map((item, idx) => {
                const studentVal = (safeVocabDefAnswers[item.id] || '').trim();
                const isAnswered = studentVal !== '';
                const isCorrect = isAnswered && studentVal.toLowerCase() === item.correctWord.toLowerCase();

                if (filterMode === 'incorrectOnly' && isCorrect) return null;

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                      !isAnswered
                        ? 'bg-slate-800/40 border-slate-700/50'
                        : isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-rose-950/20 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-white">Q{31 + idx}.</span>
                      <p className="text-slate-300 italic flex-1 text-[11px]">"{item.definition}"</p>
                      {isCorrect ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 shrink-0">✓ Correct</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 shrink-0">✗ Incorrect</span>
                      )}
                    </div>

                    <div className="space-y-1 bg-slate-900/80 p-2.5 rounded-lg border border-slate-750">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Your Selection:</span>
                        <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {isAnswered ? studentVal : '(Not answered)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Correct Term:</span>
                        <span className="font-mono font-bold text-emerald-400">{item.correctWord}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300">{item.explanation}</p>
                    {showUrdu && item.urduExplanation && (
                      <p className="text-[10px] text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-500/20">{item.urduExplanation}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Task 3: Collocations */}
          <div className="space-y-3 bg-slate-850/40 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                Task 3: Word Pairs & Preposition Collocations — Questions 36 to 40
              </h5>
              <span className="text-xs font-mono text-slate-400 font-bold">{correctVocab3}/5 correct</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {testSet.core.vocabCollocations.map((item, idx) => {
                const studentChoiceIdx = safeVocabCollocAnswers[item.id];
                const isAnswered = studentChoiceIdx !== undefined;
                const isCorrect = isAnswered && studentChoiceIdx === item.correctIndex;

                if (filterMode === 'incorrectOnly' && isCorrect) return null;

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                      !isAnswered
                        ? 'bg-slate-800/40 border-slate-700/50'
                        : isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-rose-950/20 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-white">Q{36 + idx}.</span>
                      <p className="text-slate-200 font-medium flex-1">{item.sentence}</p>
                      {isCorrect ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 shrink-0">✓ Correct</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 shrink-0">✗ Incorrect</span>
                      )}
                    </div>

                    <div className="space-y-1 bg-slate-900/80 p-2.5 rounded-lg border border-slate-750">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Your Selection:</span>
                        <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {isAnswered ? item.options[studentChoiceIdx] : '(Not answered)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Correct Collocation:</span>
                        <span className="font-mono font-bold text-emerald-400">{item.options[item.correctIndex]}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300">{item.explanation}</p>
                    {showUrdu && item.urduExplanation && (
                      <p className="text-[10px] text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-500/20">{item.urduExplanation}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Task 4: Sentence Completion */}
          <div className="space-y-3 bg-slate-850/40 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                Task 4: Sentence Completion — Questions 41 to 45
              </h5>
              <span className="text-xs font-mono text-slate-400 font-bold">{correctVocab4}/5 correct</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {testSet.core.vocabSentenceCompletion.map((item, idx) => {
                const studentChoiceIdx = safeVocabSentenceAnswers[item.id];
                const isAnswered = studentChoiceIdx !== undefined;
                const isCorrect = isAnswered && studentChoiceIdx === item.correctIndex;

                if (filterMode === 'incorrectOnly' && isCorrect) return null;

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                      !isAnswered
                        ? 'bg-slate-800/40 border-slate-700/50'
                        : isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-rose-950/20 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-white">Q{41 + idx}.</span>
                      <p className="text-slate-200 font-medium flex-1">{item.sentence}</p>
                      {isCorrect ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 shrink-0">✓ Correct</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 shrink-0">✗ Incorrect</span>
                      )}
                    </div>

                    <div className="space-y-1 bg-slate-900/80 p-2.5 rounded-lg border border-slate-750">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Your Selection:</span>
                        <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {isAnswered ? item.options[studentChoiceIdx] : '(Not answered)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Correct Answer:</span>
                        <span className="font-mono font-bold text-emerald-400">{item.options[item.correctIndex]}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300">{item.explanation}</p>
                    {showUrdu && item.urduExplanation && (
                      <p className="text-[10px] text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-500/20">{item.urduExplanation}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Task 5: Context Matching */}
          <div className="space-y-3 bg-slate-850/40 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                Task 5: Words in Context / Advanced Synonyms — Questions 46 to 50
              </h5>
              <span className="text-xs font-mono text-slate-400 font-bold">{correctVocab5}/5 correct</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {testSet.core.vocabContextMatching.map((item, idx) => {
                const studentVal = (safeVocabContextAnswers[item.id] || '').trim();
                const isAnswered = studentVal !== '';
                const isCorrect = isAnswered && studentVal.toLowerCase() === item.correctMatch.toLowerCase();

                if (filterMode === 'incorrectOnly' && isCorrect) return null;

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                      !isAnswered
                        ? 'bg-slate-800/40 border-slate-700/50'
                        : isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-rose-950/20 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Q{46 + idx}. Target: <span className="text-teal-300 underline font-mono">{item.targetWord}</span></span>
                      {isCorrect ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">✓ Correct</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">✗ Incorrect</span>
                      )}
                    </div>

                    <div className="space-y-1 bg-slate-900/80 p-2.5 rounded-lg border border-slate-750">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Your Selection:</span>
                        <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {isAnswered ? studentVal : '(Not answered)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Correct Match:</span>
                        <span className="font-mono font-bold text-emerald-400">{item.correctMatch}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300">{item.explanation}</p>
                    {showUrdu && item.urduExplanation && (
                      <p className="text-[10px] text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-500/20">{item.urduExplanation}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. READING REVIEW SECTION (SECTIONS 1 - 4)                                */}
      {/* ========================================================================= */}
      {(activeSection === 'all' || activeSection === 'reading') && (testMode === 'full' || testMode === 'reading') && (
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between bg-slate-850 p-4 rounded-2xl border border-slate-750">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                3
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Part 3: Reading Comprehension (4 Tasks)
                </h4>
                <p className="text-xs text-slate-400">
                  Gap filling, sentence sequencing, multi-person opinion matching, and heading identification
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-blue-400">
                Score: {correctReadingCount} / {totalReading} ({Math.round((correctReadingCount / totalReading) * 100)}%)
              </span>
            </div>
          </div>

          {/* Reading Section 1 */}
          <div className="space-y-3 bg-slate-850/40 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <h5 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              {testSet.reading.section1.title} (Gap Fill)
            </h5>
            <p className="text-xs text-slate-400">{testSet.reading.section1.introduction}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {testSet.reading.section1.paragraphs.map((p, idx) => {
                const studentVal = safeReadingSec1Answers[p.gapId];
                const isAnswered = studentVal !== undefined;
                const isCorrect = isAnswered && studentVal === p.correctIndex;

                if (filterMode === 'incorrectOnly' && isCorrect) return null;

                return (
                  <div
                    key={p.gapId}
                    className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                      !isAnswered
                        ? 'bg-slate-800/40 border-slate-700/50'
                        : isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-rose-950/20 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Gap {idx + 1}</span>
                      {isCorrect ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">✓ Correct</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">✗ Incorrect</span>
                      )}
                    </div>

                    <div className="space-y-1 bg-slate-900/80 p-2.5 rounded-lg border border-slate-750">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Your Selection:</span>
                        <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {isAnswered ? p.options[studentVal] : '(Not answered)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Correct Answer:</span>
                        <span className="font-mono font-bold text-emerald-400">{p.options[p.correctIndex]}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300">{testSet.reading.section1.explanations[p.gapId]?.english}</p>
                    {showUrdu && testSet.reading.section1.explanations[p.gapId]?.urdu && (
                      <p className="text-[10px] text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-500/20">
                        {testSet.reading.section1.explanations[p.gapId]?.urdu}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reading Section 2: Ordering */}
          <div className="space-y-4 bg-slate-850/40 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  {testSet.reading.section2.title} (Chronological Sequencing)
                </h5>
                <p className="text-xs text-slate-400">Topic: {testSet.reading.section2.topic}</p>
              </div>
              <span className="text-xs font-mono text-slate-400 font-bold">{correctReadingSec2}/6 positions correct</span>
            </div>

            {/* Side-by-Side Ordering Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Student's Arranged Order */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-750 space-y-2">
                <span className="text-xs font-bold text-slate-300 block mb-2">Your Arranged Sequence:</span>
                {safeReadingSec2Order.map((origIdx, pos) => {
                  const isCorrectPos = origIdx === testSet.reading.section2.correctOrder[pos];
                  return (
                    <div
                      key={pos}
                      className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                        isCorrectPos ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full font-mono text-[10px] font-black flex items-center justify-center shrink-0 bg-slate-800 text-white">
                        {pos + 1}
                      </span>
                      <p className="flex-1 text-[11px] leading-snug">{testSet.reading.section2.sentences[origIdx]}</p>
                      <span className="text-[10px] font-bold shrink-0">{isCorrectPos ? '✓' : '✗'}</span>
                    </div>
                  );
                })}
              </div>

              {/* Official Correct Sequence */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold text-emerald-300 block mb-2">Official Chronological Sequence:</span>
                {testSet.reading.section2.correctOrder.map((origIdx, pos) => (
                  <div
                    key={pos}
                    className="p-2.5 rounded-lg border border-emerald-500/20 bg-slate-900/60 text-xs flex items-start gap-2 text-slate-200"
                  >
                    <span className="w-5 h-5 rounded-full font-mono text-[10px] font-black flex items-center justify-center shrink-0 bg-emerald-500 text-slate-950">
                      {pos + 1}
                    </span>
                    <p className="flex-1 text-[11px] leading-snug">{testSet.reading.section2.sentences[origIdx]}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Explanation */}
            <div className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-750">
              <span className="font-bold text-emerald-400 block mb-1">Cohesion & Chronology Analysis:</span>
              {testSet.reading.section2.explanation}
            </div>

            {showUrdu && testSet.reading.section2.urduExplanation && (
              <p className="text-xs text-amber-300/90 bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">
                {testSet.reading.section2.urduExplanation}
              </p>
            )}
          </div>

          {/* Reading Section 3: Matching Opinions */}
          <div className="space-y-4 bg-slate-850/40 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  {testSet.reading.section3.title} (Match Opinions to 4 People)
                </h5>
                <p className="text-xs text-slate-400">Topic: {testSet.reading.section3.topic}</p>
              </div>
              <span className="text-xs font-mono text-slate-400 font-bold">{correctReadingSec3}/7 correct</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {testSet.reading.section3.questions.map((q, idx) => {
                const studentVal = (safeReadingSec3Answers[q.id] || '').trim().toUpperCase();
                const isAnswered = studentVal !== '';
                const isCorrect = isAnswered && studentVal === q.correctPersonId.toUpperCase();

                if (filterMode === 'incorrectOnly' && isCorrect) return null;

                const correctPersonObj = testSet.reading.section3.people.find(p => p.id === q.correctPersonId);

                return (
                  <div
                    key={q.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                      !isAnswered
                        ? 'bg-slate-800/40 border-slate-700/50'
                        : isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-rose-950/20 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-white">{idx + 1}.</span>
                      <p className="text-slate-200 font-medium flex-1">{q.statement}</p>
                      {isCorrect ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 shrink-0">✓ Correct</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 shrink-0">✗ Incorrect</span>
                      )}
                    </div>

                    <div className="space-y-1 bg-slate-900/80 p-2.5 rounded-lg border border-slate-750">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Your Choice:</span>
                        <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {isAnswered ? `Person ${studentVal}` : '(Not answered)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Correct Person:</span>
                        <span className="font-mono font-bold text-emerald-400">
                          Person {q.correctPersonId} ({correctPersonObj?.name})
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300">{q.explanation}</p>
                    {showUrdu && q.urduExplanation && (
                      <p className="text-[10px] text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-500/20">{q.urduExplanation}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reading Section 4: Paragraph Headings */}
          <div className="space-y-4 bg-slate-850/40 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  {testSet.reading.section4.title} (Match Headings to Paragraphs)
                </h5>
                <p className="text-xs text-slate-400">Topic: {testSet.reading.section4.topic}</p>
              </div>
              <span className="text-xs font-mono text-slate-400 font-bold">{correctReadingSec4}/7 correct</span>
            </div>

            <div className="space-y-3">
              {testSet.reading.section4.paragraphs.map((p) => {
                const studentVal = safeReadingSec4Answers[p.id];
                const isAnswered = studentVal !== undefined;
                const isCorrect = isAnswered && studentVal === p.correctHeadingIndex;

                if (filterMode === 'incorrectOnly' && isCorrect) return null;

                const correctHeadingText = testSet.reading.section4.headings[p.correctHeadingIndex];
                const studentHeadingText = isAnswered ? testSet.reading.section4.headings[studentVal] : '';

                return (
                  <div
                    key={p.id}
                    className={`p-4 rounded-xl border text-xs space-y-2.5 ${
                      !isAnswered
                        ? 'bg-slate-800/40 border-slate-700/50'
                        : isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-rose-950/20 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">Paragraph {p.paragraphNumber}</span>
                      {isCorrect ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">✓ Correct Heading</span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">✗ Incorrect Heading</span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
                      "{p.text}"
                    </p>

                    <div className="space-y-1.5 bg-slate-900/80 p-3 rounded-lg border border-slate-750">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Your Chosen Heading:</span>
                        <span className={`font-semibold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {isAnswered ? studentHeadingText : '(Not answered)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Correct Heading:</span>
                        <span className="font-semibold text-emerald-400">{correctHeadingText}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300">{p.explanation}</p>
                    {showUrdu && p.urduExplanation && (
                      <p className="text-[10px] text-amber-300/90 bg-amber-950/20 p-2.5 rounded-lg border border-amber-500/20">{p.urduExplanation}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. WRITING REVIEW SECTION (PARTS 1 - 4)                                    */}
      {/* ========================================================================= */}
      {(activeSection === 'all' || activeSection === 'writing') && (testMode === 'full' || testMode === 'writing') && (
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between bg-slate-850 p-4 rounded-2xl border border-slate-750">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                4
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Part 4: Aptis General Writing Evaluation & Examiner Analysis
                </h4>
                <p className="text-xs text-slate-400">
                  Theme: {testSet.writing.themeName} • Checked with Writing Lab rigor across grammar, spelling, word choice, structure, punctuation, clarity & tone
                </p>
              </div>
            </div>
          </div>

          {/* Diagnostic Writing Performance Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-750 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Aptis Writing Examiner Diagnostic</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                      Writing Lab Standard
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Comprehensive comparison of your submissions against ICAP ECS / Aptis Benchmark Answers
                  </p>
                </div>
              </div>

              {writingEvaluation && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Estimated Band:</span>
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {writingEvaluation.bandRating}
                  </span>
                </div>
              )}
            </div>

            {writingEvaluation && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Grammar & Syntax</span>
                  <span className="text-base font-bold text-amber-300">{writingEvaluation.grammarScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Vocabulary & Collocations</span>
                  <span className="text-base font-bold text-sky-300">{writingEvaluation.vocabularyScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Cohesion & Structure</span>
                  <span className="text-base font-bold text-purple-300">{writingEvaluation.cohesionScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Tone Register</span>
                  <span className="text-base font-bold text-emerald-300">{writingEvaluation.toneRegister}</span>
                </div>
              </div>
            )}

            {writingEvaluation?.summaryFeedback && (
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1 text-xs">
                <p className="text-slate-300 leading-relaxed font-sans">{writingEvaluation.summaryFeedback}</p>
                {showUrdu && writingEvaluation.urduSummary && (
                  <p className="text-emerald-400 font-urdu text-[11px] leading-relaxed pt-1 border-t border-slate-850">
                    {writingEvaluation.urduSummary}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Part 1: Short Word Answers */}
          <div className="space-y-3 bg-slate-850/40 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Writing Part 1: Short Word Answers (1 to 5 words each)
              </h5>
              <span className="text-[11px] text-slate-400 font-mono">Strict 1–5 word requirement</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {testSet.writing.part1.questions.map((q, idx) => {
                const userText = safeWritingPart1Answers[q.id] || '';
                const wordCount = userText.trim().split(/\s+/).filter(Boolean).length;
                const isOverLimit = wordCount > 5;
                const feedback = part1Feedbacks[q.id];
                const mistakes = feedback?.mistakes || [];

                return (
                  <div key={q.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-750 text-xs space-y-2.5">
                    <p className="text-slate-300 font-semibold">{idx + 1}. {q.prompt}</p>
                    
                    {/* User Response with Word Count Validation */}
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase text-slate-500 font-bold">Your Response:</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                          !userText ? 'text-slate-500' :
                          isOverLimit ? 'bg-rose-950/60 text-rose-300 border border-rose-800/60' : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                        }`}>
                          {wordCount} words {isOverLimit ? '(⚠ Exceeds 1-5 words)' : '(✓ OK)'}
                        </span>
                      </div>
                      <p className="font-mono text-slate-200">{userText ? `"${userText}"` : '(No response entered)'}</p>
                    </div>

                    {/* Detected Mistakes in Part 1 (if any) */}
                    {mistakes.length > 0 && (
                      <div className="space-y-1 p-2 rounded-lg bg-rose-950/20 border border-rose-500/25">
                        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                          Identified Issue:
                        </span>
                        {mistakes.map((m, mIdx) => (
                          <div key={mIdx} className="text-[11px] text-slate-300 flex items-center justify-between gap-2">
                            <span className="line-through text-rose-400 font-mono">"{m.original}"</span>
                            <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
                            <span className="text-emerald-400 font-mono font-bold">"{m.replacement}"</span>
                            <span className="text-[10px] text-slate-400 italic truncate" title={m.explanation}>({m.explanation})</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Benchmark Sample Answer */}
                    <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                      <span className="text-[10px] uppercase text-emerald-400 font-bold block">Benchmark Sample Answer:</span>
                      <p className="font-mono text-emerald-300">"{q.sampleAnswer}"</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Part 2: Form Response */}
          <div className="space-y-4 bg-slate-850/40 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Writing Part 2: Short Form Filling (20–30 words)
                </h5>
                <p className="text-xs text-slate-400 mt-0.5">{testSet.writing.part2.prompt}</p>
              </div>
            </div>

            {part2Feedback && safeWritingPart2Answer?.trim() ? (
              <WritingFeedbackDisplay
                originalText={safeWritingPart2Answer}
                feedback={part2Feedback}
                benchmarkModelAnswer={testSet.writing.part2.sampleAnswer}
                taskTitle="Part 2: Short Form Statement Evaluation"
                wordCount={safeWritingPart2Answer.trim().split(/\s+/).filter(Boolean).length}
                requiredWordRange="20–30 words"
              />
            ) : (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-750 space-y-2 text-xs">
                <span className="text-slate-400 italic block">(No response entered for Part 2)</span>
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 font-mono">
                  <span className="text-[10px] uppercase text-emerald-400 font-bold block mb-1">Examiner Model Solution:</span>
                  "{testSet.writing.part2.sampleAnswer}"
                </div>
              </div>
            )}
          </div>

          {/* Part 3: Social Forum Chats */}
          <div className="space-y-4 bg-slate-850/40 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Writing Part 3: Social Forum Community Responses (30–40 words each)
            </h5>

            <div className="space-y-4">
              {testSet.writing.part3.memberChats.map((chat) => {
                const userText = safeWritingPart3Answers[chat.id] || '';
                const wordCount = userText.trim().split(/\s+/).filter(Boolean).length;
                const feedback = part3Feedbacks[chat.id];

                return (
                  <div key={chat.id} className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-750 space-y-3 text-xs">
                    <div className="text-slate-300 border-b border-slate-800 pb-2">
                      <span className="font-bold text-white">{chat.memberName} asks:</span> "{chat.message}"
                    </div>

                    {feedback && userText.trim() ? (
                      <WritingFeedbackDisplay
                        originalText={userText}
                        feedback={feedback}
                        benchmarkModelAnswer={chat.sampleAnswer}
                        taskTitle={`Part 3: Response to ${chat.memberName}`}
                        wordCount={wordCount}
                        requiredWordRange="30–40 words"
                      />
                    ) : (
                      <div className="space-y-2">
                        <span className="text-slate-400 italic block">(No response entered for this chat)</span>
                        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 font-mono text-emerald-200">
                          <span className="text-[10px] uppercase text-emerald-400 font-bold block mb-1">Examiner Model Solution:</span>
                          "{chat.sampleAnswer}"
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Part 4: Informal & Formal Emails */}
          <div className="space-y-5 bg-slate-850/40 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div>
              <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Writing Part 4: Context Notice & Two-Register Email Responses
              </h5>
              <p className="text-xs text-slate-400 italic bg-slate-900/60 p-3 rounded-xl border border-slate-800 mt-2">
                Notice Context: {testSet.writing.part4.contextNotice}
              </p>
            </div>

            {/* Task 4A: Informal Email */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">Task 4A: Informal Email to Friend (~50 words)</span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {(safeWritingPart4AAnswer || '').trim().split(/\s+/).filter(Boolean).length} words (Target: 40–60)
                </span>
              </div>
              <p className="text-xs text-slate-400">{testSet.writing.part4.taskA.prompt}</p>

              {part4AFeedback && safeWritingPart4AAnswer?.trim() ? (
                <WritingFeedbackDisplay
                  originalText={safeWritingPart4AAnswer}
                  feedback={part4AFeedback}
                  benchmarkModelAnswer={testSet.writing.part4.taskA.sampleAnswer}
                  taskTitle="Task 4A: Informal Email to Friend Evaluation"
                  wordCount={safeWritingPart4AAnswer.trim().split(/\s+/).filter(Boolean).length}
                  requiredWordRange="40–60 words"
                />
              ) : (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-750 space-y-2 text-xs">
                  <span className="text-slate-400 italic block">(No response entered for Task 4A)</span>
                  <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-200 font-mono">
                    <span className="text-[10px] uppercase text-amber-400 font-bold block mb-1">Model Informal Response (Casual Tone):</span>
                    "{testSet.writing.part4.taskA.sampleAnswer}"
                  </div>
                </div>
              )}
            </div>

            {/* Task 4B: Formal Email */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">Task 4B: Formal Email to Leadership / President (120–150 words)</span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {(safeWritingPart4BAnswer || '').trim().split(/\s+/).filter(Boolean).length} words (Target: 120–150)
                </span>
              </div>
              <p className="text-xs text-slate-400">{testSet.writing.part4.taskB.prompt}</p>

              {part4BFeedback && safeWritingPart4BAnswer?.trim() ? (
                <WritingFeedbackDisplay
                  originalText={safeWritingPart4BAnswer}
                  feedback={part4BFeedback}
                  benchmarkModelAnswer={testSet.writing.part4.taskB.sampleAnswer}
                  taskTitle="Task 4B: Formal Email to President Evaluation"
                  wordCount={safeWritingPart4BAnswer.trim().split(/\s+/).filter(Boolean).length}
                  requiredWordRange="120–150 words"
                />
              ) : (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-750 space-y-2 text-xs">
                  <span className="text-slate-400 italic block">(No response entered for Task 4B)</span>
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 font-mono">
                    <span className="text-[10px] uppercase text-emerald-400 font-bold block mb-1">Model Formal Response (Professional CA Register):</span>
                    "{testSet.writing.part4.taskB.sampleAnswer}"
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
