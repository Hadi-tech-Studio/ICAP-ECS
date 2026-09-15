import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, BookOpen, Languages, Sparkles, Check, HelpCircle } from 'lucide-react';
import { AptisTestSet, StudentExamAnswers } from '../types';

interface AptisAnswerKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  testSet: AptisTestSet;
  initialTab?: 'core' | 'reading' | 'writing';
  studentAnswers?: StudentExamAnswers;
}

export const AptisAnswerKeyModal: React.FC<AptisAnswerKeyModalProps> = ({
  isOpen,
  onClose,
  testSet,
  initialTab = 'core',
  studentAnswers
}) => {
  const [activeTab, setActiveTab] = useState<'core' | 'reading' | 'writing'>(initialTab);
  const [showUrdu, setShowUrdu] = useState<boolean>(true);

  // Safe normalized answer objects to prevent any undefined access
  const safeGrammarAnswers = studentAnswers?.grammarAnswers || {};
  const safeVocabMatchingAnswers = studentAnswers?.vocabMatchingAnswers || {};
  const safeVocabDefAnswers = studentAnswers?.vocabDefAnswers || {};
  const safeVocabCollocAnswers = studentAnswers?.vocabCollocAnswers || {};
  const safeVocabSentenceAnswers = studentAnswers?.vocabSentenceAnswers || {};
  const safeVocabContextAnswers = studentAnswers?.vocabContextAnswers || {};
  const safeReadingSec1Answers = studentAnswers?.readingSec1Answers || {};
  const safeReadingSec2Order = studentAnswers?.readingSec2Order;
  const safeReadingSec3Answers = studentAnswers?.readingSec3Answers || {};
  const safeReadingSec4Answers = studentAnswers?.readingSec4Answers || {};
  const safeWritingPart1Answers = studentAnswers?.writingPart1Answers || studentAnswers?.writingPart1 || {};
  const safeWritingPart2Answer = studentAnswers?.writingPart2Answer || studentAnswers?.writingPart2 || '';
  const safeWritingPart3Answers = studentAnswers?.writingPart3Answers || studentAnswers?.writingPart3 || {};
  const safeWritingPart4AAnswer = studentAnswers?.writingPart4AAnswer || studentAnswers?.writingPart4A || '';
  const safeWritingPart4BAnswer = studentAnswers?.writingPart4BAnswer || studentAnswers?.writingPart4B || '';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-6 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Official Answer Key & Explanations</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {testSet.title}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Aptis General standard marking criteria with English & Urdu conceptual notes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUrdu(!showUrdu)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                showUrdu
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{showUrdu ? 'Urdu Notes: ON' : 'Urdu Notes: OFF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/90 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('core')}
            className={`pb-3 px-4 font-semibold text-xs border-b-2 transition flex items-center gap-2 ${
              activeTab === 'core'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>1. Core Test (Grammar & Vocab)</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">50 Items</span>
          </button>
          <button
            onClick={() => setActiveTab('reading')}
            className={`pb-3 px-4 font-semibold text-xs border-b-2 transition flex items-center gap-2 ${
              activeTab === 'reading'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>2. Reading Test</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">4 Sections</span>
          </button>
          <button
            onClick={() => setActiveTab('writing')}
            className={`pb-3 px-4 font-semibold text-xs border-b-2 transition flex items-center gap-2 ${
              activeTab === 'writing'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>3. Writing Sample Model Answers</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">4 Parts</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* TAB 1: CORE ANSWER KEY */}
          {activeTab === 'core' && (
            <div className="space-y-6">
              
              {/* Part 1: Grammar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700">
                  <h4 className="font-bold text-sm text-emerald-300">Part 1: Grammar (25 Questions)</h4>
                  <span className="text-xs text-slate-400">Time: 12.5 mins approx</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {testSet.core.grammarQuestions.map((q, idx) => {
                    const studentChoice = safeGrammarAnswers[q.id];
                    const hasAnswered = studentChoice !== undefined;
                    const isCorrect = hasAnswered && studentChoice === q.correctIndex;

                    return (
                      <div key={q.id} className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-mono font-bold text-emerald-400">Q{idx + 1}.</span>
                          <span className="text-[11px] font-semibold text-slate-400 truncate max-w-[200px]">{q.category}</span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium">{q.question}</p>
                        
                        {studentAnswers && (
                          <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-750 text-xs flex items-center justify-between">
                            <span className="text-slate-400">Your Selection:</span>
                            {hasAnswered ? (
                              <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {q.options[studentChoice]} {isCorrect ? '✓' : '✗'}
                              </span>
                            ) : (
                              <span className="text-slate-500 italic">Not Attempted</span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-1 border-t border-slate-700/40">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-xs font-bold text-white">
                            Correct: <span className="text-emerald-300 font-mono underline">{q.options[q.correctIndex]}</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{q.englishExplanation}</p>
                        {showUrdu && (
                          <p className="text-[11px] text-amber-300/90 leading-relaxed font-medium bg-amber-950/20 p-2 rounded-lg border border-amber-500/20">
                            {q.urduExplanation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Part 2: Vocabulary */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700">
                  <h4 className="font-bold text-sm text-emerald-300">Part 2: Vocabulary (25 Questions / 5 Tasks)</h4>
                  <span className="text-xs text-slate-400">Time: 12.5 mins approx</span>
                </div>

                {/* Task 1 */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Task 1: Word Matching (Synonyms)</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {testSet.core.vocabWordMatching.map((item, idx) => {
                      const studentVal = (safeVocabMatchingAnswers[item.id] || '').trim();
                      const isCorrect = studentVal.toLowerCase() === item.correctMatch.toLowerCase();
                      return (
                        <div key={item.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-300">Q{26 + idx}. {item.targetWord}</span>
                            <span className="text-emerald-300 font-bold font-mono">➜ {item.correctMatch}</span>
                          </div>
                          {studentAnswers && (
                            <div className="text-[11px] flex items-center justify-between pt-1">
                              <span className="text-slate-400">You chose:</span>
                              <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {studentVal || '(None)'} {isCorrect ? '✓' : '✗'}
                              </span>
                            </div>
                          )}
                          {showUrdu && <p className="text-[10px] text-amber-300/80 mt-1">{item.urduExplanation}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Task 2 */}
                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Task 2: Definitions</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {testSet.core.vocabDefinitions.map((item, idx) => {
                      const studentVal = (safeVocabDefAnswers[item.id] || '').trim();
                      const isCorrect = studentVal.toLowerCase() === item.correctWord.toLowerCase();
                      return (
                        <div key={item.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs space-y-1">
                          <p className="text-slate-400 italic font-medium text-[11px]">"{item.definition}"</p>
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-slate-300">Q{31 + idx}</span>
                            <span className="text-emerald-300 font-mono">Answer: {item.correctWord}</span>
                          </div>
                          {studentAnswers && (
                            <div className="text-[11px] flex items-center justify-between pt-1">
                              <span className="text-slate-400">You chose:</span>
                              <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {studentVal || '(None)'} {isCorrect ? '✓' : '✗'}
                              </span>
                            </div>
                          )}
                          {showUrdu && <p className="text-[10px] text-amber-300/80">{item.urduExplanation}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Task 3 */}
                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Task 3: Word Pairs & Collocations</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {testSet.core.vocabCollocations.map((item, idx) => {
                      const studentIdx = safeVocabCollocAnswers[item.id];
                      const isCorrect = studentIdx === item.correctIndex;
                      return (
                        <div key={item.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs space-y-1">
                          <p className="text-slate-300 text-[11px]">{item.sentence}</p>
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-slate-400">Q{36 + idx}</span>
                            <span className="text-emerald-300 font-mono">Correct: {item.options[item.correctIndex]}</span>
                          </div>
                          {studentAnswers && (
                            <div className="text-[11px] flex items-center justify-between pt-1">
                              <span className="text-slate-400">You chose:</span>
                              <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {studentIdx !== undefined ? item.options[studentIdx] : '(None)'} {isCorrect ? '✓' : '✗'}
                              </span>
                            </div>
                          )}
                          {showUrdu && <p className="text-[10px] text-amber-300/80">{item.urduExplanation}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Task 4 */}
                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Task 4: Sentence Completion</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {testSet.core.vocabSentenceCompletion.map((item, idx) => {
                      const studentIdx = safeVocabSentenceAnswers[item.id];
                      const isCorrect = studentIdx === item.correctIndex;
                      return (
                        <div key={item.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs space-y-1">
                          <p className="text-slate-300 text-[11px]">{item.sentence}</p>
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-slate-400">Q{41 + idx}</span>
                            <span className="text-emerald-300 font-mono">Correct: {item.options[item.correctIndex]}</span>
                          </div>
                          {studentAnswers && (
                            <div className="text-[11px] flex items-center justify-between pt-1">
                              <span className="text-slate-400">You chose:</span>
                              <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {studentIdx !== undefined ? item.options[studentIdx] : '(None)'} {isCorrect ? '✓' : '✗'}
                              </span>
                            </div>
                          )}
                          {showUrdu && <p className="text-[10px] text-amber-300/80">{item.urduExplanation}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Task 5 */}
                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Task 5: Word in Context / Advanced Synonyms</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {testSet.core.vocabContextMatching.map((item, idx) => {
                      const studentVal = (safeVocabContextAnswers[item.id] || '').trim();
                      const isCorrect = studentVal.toLowerCase() === item.correctMatch.toLowerCase();
                      return (
                        <div key={item.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-300">Q{46 + idx}. {item.targetWord}</span>
                            <span className="text-emerald-300 font-bold font-mono">➜ {item.correctMatch}</span>
                          </div>
                          {studentAnswers && (
                            <div className="text-[11px] flex items-center justify-between pt-1">
                              <span className="text-slate-400">You chose:</span>
                              <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {studentVal || '(None)'} {isCorrect ? '✓' : '✗'}
                              </span>
                            </div>
                          )}
                          {showUrdu && <p className="text-[10px] text-amber-300/80 mt-1">{item.urduExplanation}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: READING ANSWER KEY */}
          {activeTab === 'reading' && (
            <div className="space-y-6">
              
              {/* Section 1 */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3">
                <h4 className="font-bold text-sm text-emerald-300">{testSet.reading.section1.title}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                  {testSet.reading.section1.paragraphs.map((p, idx) => {
                    const studentChoice = safeReadingSec1Answers[p.gapId];
                    const isCorrect = studentChoice === p.correctIndex;
                    return (
                      <div key={p.gapId} className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-300">Gap {idx + 1}:</span>
                          <span className="text-emerald-400 font-mono font-bold">{p.options[p.correctIndex]}</span>
                        </div>
                        {studentAnswers && (
                          <div className="text-[11px] flex items-center justify-between pt-1">
                            <span className="text-slate-400">You chose:</span>
                            <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {studentChoice !== undefined ? p.options[studentChoice] : '(None)'} {isCorrect ? '✓' : '✗'}
                            </span>
                          </div>
                        )}
                        <p className="text-[11px] text-slate-400">{testSet.reading.section1.explanations[p.gapId]?.english}</p>
                        {showUrdu && (
                          <p className="text-[10px] text-amber-300/90">{testSet.reading.section1.explanations[p.gapId]?.urdu}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 2 */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3">
                <h4 className="font-bold text-sm text-emerald-300">{testSet.reading.section2.title}</h4>
                <p className="text-xs text-slate-400">Topic: {testSet.reading.section2.topic}</p>
                
                {safeReadingSec2Order && (
                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-900 border border-slate-750">
                    <span className="text-xs font-bold text-slate-300 block">Your Arranged Order:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {safeReadingSec2Order.map((origIdx, pos) => {
                        const isCorrectPos = origIdx === testSet.reading.section2.correctOrder[pos];
                        return (
                          <span
                            key={pos}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${
                              isCorrectPos ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                            }`}
                          >
                            Step {pos + 1}: Sent #{origIdx + 1} {isCorrectPos ? '✓' : '✗'}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-white mb-1">Correct Chronological Order:</div>
                  {testSet.reading.section2.correctOrder.map((origIdx, orderNum) => (
                    <div key={orderNum} className="flex items-start gap-2.5 text-xs p-2.5 rounded-xl bg-slate-800 border border-slate-700/60">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                        {orderNum + 1}
                      </span>
                      <p className="text-slate-200">{testSet.reading.section2.sentences[origIdx]}</p>
                    </div>
                  ))}
                </div>
                {showUrdu && (
                  <p className="text-xs text-amber-300/90 bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20 mt-2">
                    {testSet.reading.section2.urduExplanation}
                  </p>
                )}
              </div>

              {/* Section 3 */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3">
                <h4 className="font-bold text-sm text-emerald-300">{testSet.reading.section3.title}</h4>
                <p className="text-xs text-slate-400">{testSet.reading.section3.topic}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {testSet.reading.section3.questions.map((q, idx) => {
                    const studentVal = (safeReadingSec3Answers[q.id] || '').trim().toUpperCase();
                    const isCorrect = studentVal === q.correctPersonId.toUpperCase();
                    return (
                      <div key={q.id} className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs space-y-1.5">
                        <p className="text-slate-200 font-medium">{idx + 1}. {q.statement}</p>
                        {studentAnswers && (
                          <div className="text-[11px] flex items-center justify-between pt-1">
                            <span className="text-slate-400">You chose:</span>
                            <span className={`font-mono font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {studentVal ? `Person ${studentVal}` : '(None)'} {isCorrect ? '✓' : '✗'}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-700/40">
                          <span className="text-emerald-400 font-bold font-mono">Matched Person: {q.correctPersonId}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{q.explanation}</p>
                        {showUrdu && <p className="text-[10px] text-amber-300/90">{q.urduExplanation}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 4 */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3">
                <h4 className="font-bold text-sm text-emerald-300">{testSet.reading.section4.title}</h4>
                <p className="text-xs text-slate-400">{testSet.reading.section4.topic}</p>
                <div className="space-y-3 pt-2">
                  {testSet.reading.section4.paragraphs.map((p) => {
                    const studentVal = safeReadingSec4Answers[p.id];
                    const isCorrect = studentVal === p.correctHeadingIndex;
                    return (
                      <div key={p.id} className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs space-y-2">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-white">Paragraph {p.paragraphNumber}</span>
                          <span className="text-emerald-400 font-mono">{testSet.reading.section4.headings[p.correctHeadingIndex]}</span>
                        </div>
                        {studentAnswers && (
                          <div className="text-[11px] flex items-center justify-between pt-1">
                            <span className="text-slate-400">You chose:</span>
                            <span className={`font-semibold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {studentVal !== undefined ? testSet.reading.section4.headings[studentVal] : '(None)'} {isCorrect ? '✓' : '✗'}
                            </span>
                          </div>
                        )}
                        <p className="text-[11px] text-slate-400 leading-relaxed italic line-clamp-2">{p.text}</p>
                        <p className="text-[11px] text-slate-300">{p.explanation}</p>
                        {showUrdu && <p className="text-[10px] text-amber-300/90">{p.urduExplanation}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: WRITING MODEL ANSWERS */}
          {activeTab === 'writing' && (
            <div className="space-y-6">
              <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-2xl">
                <h4 className="font-bold text-sm text-emerald-300">Writing Theme: {testSet.writing.themeName}</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Examiner Benchmark Model Responses demonstrating CEFR Band B2 / C1 vocabulary, coherence, and correct tone register.
                </p>
              </div>

              {/* Part 1 */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3">
                <h4 className="font-bold text-sm text-white">Part 1: Short Word Answers (1–5 words each)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {testSet.writing.part1.questions.map((q, idx) => {
                    const studentVal = safeWritingPart1Answers[q.id];
                    return (
                      <div key={q.id} className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs space-y-1.5">
                        <p className="text-slate-400">{idx + 1}. {q.prompt}</p>
                        {studentAnswers && (
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-750 text-slate-300">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Your Response:</span>
                            <span className="font-mono text-cyan-300">{studentVal || '(Blank / Not answered)'}</span>
                          </div>
                        )}
                        <p className="font-bold text-emerald-300 font-mono">Benchmark Model: "{q.sampleAnswer}"</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Part 2 */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
                <h4 className="font-bold text-sm text-white">Part 2: Form Response (20–30 words)</h4>
                <p className="text-xs text-slate-400">{testSet.writing.part2.prompt}</p>
                {studentAnswers && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-750 text-xs text-slate-300">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold mb-1">Your Submission:</span>
                    <span className="font-mono text-cyan-300">{safeWritingPart2Answer || '(Blank / Not answered)'}</span>
                  </div>
                )}
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-emerald-300 font-mono leading-relaxed">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold mb-1">Benchmark Model:</span>
                  "{testSet.writing.part2.sampleAnswer}"
                </div>
              </div>

              {/* Part 3 */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3">
                <h4 className="font-bold text-sm text-white">Part 3: Social Forum Chats (30–40 words each)</h4>
                <div className="space-y-3">
                  {testSet.writing.part3.memberChats.map((chat) => {
                    const studentVal = safeWritingPart3Answers[chat.id];
                    return (
                      <div key={chat.id} className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-xs space-y-2">
                        <div className="text-slate-300 font-medium">
                          <span className="font-bold text-white">{chat.memberName}:</span> "{chat.message}"
                        </div>
                        {studentAnswers && (
                          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-750 text-slate-300">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide block mb-1 font-bold">Your Response:</span>
                            <span className="font-mono text-cyan-300">{studentVal || '(Blank / Not answered)'}</span>
                          </div>
                        )}
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/60 text-emerald-300 font-mono">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wide block mb-1">Model Response:</span>
                          "{chat.sampleAnswer}"
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Part 4 */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-4">
                <h4 className="font-bold text-sm text-white">Part 4: Emails (Informal vs Formal Register)</h4>
                <p className="text-xs text-slate-400 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  {testSet.writing.part4.contextNotice}
                </p>

                {/* 4A */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">Task 4A: Informal Email to Friend (~50 words)</span>
                  {studentAnswers && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-750 text-xs text-slate-300">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold mb-1">Your Email to Friend:</span>
                      <span className="font-mono text-cyan-300 whitespace-pre-line">{safeWritingPart4AAnswer || '(Blank / Not answered)'}</span>
                    </div>
                  )}
                  <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-amber-200 font-mono whitespace-pre-line leading-relaxed">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold mb-1">Benchmark Model:</span>
                    {testSet.writing.part4.taskA.sampleAnswer}
                  </div>
                </div>

                {/* 4B */}
                <div className="space-y-2 pt-2 border-t border-slate-700/40">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">Task 4B: Formal Email to President (120–150 words)</span>
                  {studentAnswers && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-750 text-xs text-slate-300">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold mb-1">Your Formal Email:</span>
                      <span className="font-mono text-cyan-300 whitespace-pre-line">{safeWritingPart4BAnswer || '(Blank / Not answered)'}</span>
                    </div>
                  )}
                  <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-emerald-200 font-mono whitespace-pre-line leading-relaxed">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold mb-1">Benchmark Model:</span>
                    {testSet.writing.part4.taskB.sampleAnswer}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>ICAP ECS • CA Journey Aptis Preparation Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition shadow"
          >
            Close Answer Key
          </button>
        </div>

      </div>
    </div>
  );
};
