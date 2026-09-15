import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen, 
  FileText, 
  ArrowRight,
  SpellCheck,
  Scale
} from 'lucide-react';
import { WritingFeedbackResult, WritingMistakeType } from '../lib/writingFeedback';

interface WritingFeedbackDisplayProps {
  originalText: string;
  feedback: WritingFeedbackResult;
  benchmarkModelAnswer?: string;
  taskTitle?: string;
  wordCount?: number;
  requiredWordRange?: string;
  isDark?: boolean;
}

export const WritingFeedbackDisplay: React.FC<WritingFeedbackDisplayProps> = ({
  originalText,
  feedback,
  benchmarkModelAnswer,
  taskTitle,
  wordCount,
  requiredWordRange,
  isDark = true
}) => {
  const [copiedImproved, setCopiedImproved] = useState<boolean>(false);
  const [copiedModel, setCopiedModel] = useState<boolean>(false);
  const [showBenchmark, setShowBenchmark] = useState<boolean>(true);
  const [activeMistakeFilter, setActiveMistakeFilter] = useState<'all' | WritingMistakeType>('all');

  const { mistakes, improvedFullAnswer, benchmarkComparisonNotes } = feedback;
  const effectiveBenchmark = benchmarkModelAnswer || feedback.benchmarkModelAnswer;

  const handleCopyImproved = () => {
    if (improvedFullAnswer && navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(improvedFullAnswer)
        .then(() => {
          setCopiedImproved(true);
          setTimeout(() => setCopiedImproved(false), 2000);
        })
        .catch((err) => {
          console.warn('Clipboard write failed:', err);
        });
    }
  };

  const handleCopyModel = () => {
    if (effectiveBenchmark && navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(effectiveBenchmark)
        .then(() => {
          setCopiedModel(true);
          setTimeout(() => setCopiedModel(false), 2000);
        })
        .catch((err) => {
          console.warn('Clipboard write failed:', err);
        });
    }
  };

  // Categorize counts
  const grammarCount = mistakes.filter(m => m.type === 'grammar').length;
  const spellingCount = mistakes.filter(m => m.type === 'spelling').length;
  const wordChoiceCount = mistakes.filter(m => m.type === 'word_choice').length;
  const sentenceStructureCount = mistakes.filter(m => m.type === 'sentence_structure').length;
  const punctuationCount = mistakes.filter(m => m.type === 'punctuation').length;
  const clarityCount = mistakes.filter(m => m.type === 'clarity').length;
  const toneCount = mistakes.filter(m => m.type === 'tone').length;

  const filteredMistakes = activeMistakeFilter === 'all' 
    ? mistakes 
    : mistakes.filter(m => m.type === activeMistakeFilter);

  // Highlight mistakes inside the original answer text safely
  const renderHighlightedOriginalText = () => {
    if (!originalText || !originalText.trim()) {
      return <span className="italic text-slate-500">(No text entered)</span>;
    }

    if (mistakes.length === 0) {
      return (
        <p className="whitespace-pre-line leading-relaxed font-sans text-sm text-slate-200">
          {originalText}
        </p>
      );
    }

    // Sort mistakes by occurrence position
    const sorted = [...mistakes]
      .filter(m => m.original && originalText.includes(m.original))
      .sort((a, b) => {
        const posA = originalText.indexOf(a.original, a.startIndex || 0);
        const posB = originalText.indexOf(b.original, b.startIndex || 0);
        return posA - posB;
      });

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    sorted.forEach((m, idx) => {
      const matchIndex = originalText.indexOf(m.original, lastIndex);
      if (matchIndex === -1) return;

      // Text before mistake
      if (matchIndex > lastIndex) {
        elements.push(
          <span key={`text-${idx}-${lastIndex}`}>
            {originalText.slice(lastIndex, matchIndex)}
          </span>
        );
      }

      // Badge style based on mistake type
      let badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/50 underline decoration-rose-400 decoration-wavy';
      let typeLabel = 'Mistake';

      if (m.type === 'spelling') {
        badgeColor = 'bg-rose-500/25 text-rose-200 border-rose-400/60 underline decoration-rose-400 decoration-wavy';
        typeLabel = 'Spelling';
      } else if (m.type === 'grammar') {
        badgeColor = 'bg-amber-500/25 text-amber-200 border-amber-400/60 underline decoration-amber-400 decoration-dashed';
        typeLabel = 'Grammar';
      } else if (m.type === 'word_choice') {
        badgeColor = 'bg-sky-500/25 text-sky-200 border-sky-400/60 underline decoration-sky-400';
        typeLabel = 'Word Choice';
      } else if (m.type === 'sentence_structure') {
        badgeColor = 'bg-purple-500/25 text-purple-200 border-purple-400/60 underline decoration-purple-400';
        typeLabel = 'Sentence Structure';
      } else if (m.type === 'punctuation') {
        badgeColor = 'bg-yellow-500/25 text-yellow-200 border-yellow-400/60';
        typeLabel = 'Punctuation';
      } else if (m.type === 'clarity') {
        badgeColor = 'bg-teal-500/25 text-teal-200 border-teal-400/60';
        typeLabel = 'Clarity';
      } else if (m.type === 'tone') {
        badgeColor = 'bg-indigo-500/25 text-indigo-200 border-indigo-400/60 underline decoration-indigo-400';
        typeLabel = 'Tone & Register';
      }

      elements.push(
        <mark
          key={`mistake-${m.id || idx}`}
          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-xs font-semibold mx-0.5 transition-all ${badgeColor}`}
          title={`${typeLabel}: '${m.original}' ➜ '${m.replacement}' (${m.explanation})`}
        >
          <span>{m.original}</span>
          <span className="text-[9px] uppercase px-1 py-0.2 rounded font-black tracking-wider opacity-90 bg-slate-900/60">
            {typeLabel}
          </span>
        </mark>
      );

      lastIndex = matchIndex + m.original.length;
    });

    // Remainder of text
    if (lastIndex < originalText.length) {
      elements.push(
        <span key={`text-end-${lastIndex}`}>
          {originalText.slice(lastIndex)}
        </span>
      );
    }

    return (
      <div className="whitespace-pre-line leading-relaxed font-sans text-xs sm:text-sm">
        {elements}
      </div>
    );
  };

  return (
    <div className="space-y-4 w-full">

      {/* Task & Mistake Summary Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-750">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <SpellCheck className="w-4 h-4 text-emerald-400" />
            <span>{taskTitle || 'Writing Submission Detailed Feedback'}</span>
          </span>

          {wordCount !== undefined && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              {wordCount} words {requiredWordRange ? `(Target: ${requiredWordRange})` : ''}
            </span>
          )}
        </div>

        {/* Mistake Count Categories Filter */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <button
            type="button"
            onClick={() => setActiveMistakeFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${
              activeMistakeFilter === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Issues ({mistakes.length})
          </button>

          {grammarCount > 0 && (
            <button
              type="button"
              onClick={() => setActiveMistakeFilter('grammar')}
              className={`px-2 py-1 rounded-lg font-bold text-[11px] transition ${
                activeMistakeFilter === 'grammar'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-amber-950/40 text-amber-300 border border-amber-800/40 hover:bg-amber-900/40'
              }`}
            >
              Grammar ({grammarCount})
            </button>
          )}

          {spellingCount > 0 && (
            <button
              type="button"
              onClick={() => setActiveMistakeFilter('spelling')}
              className={`px-2 py-1 rounded-lg font-bold text-[11px] transition ${
                activeMistakeFilter === 'spelling'
                  ? 'bg-rose-500 text-white'
                  : 'bg-rose-950/40 text-rose-300 border border-rose-800/40 hover:bg-rose-900/40'
              }`}
            >
              Spelling ({spellingCount})
            </button>
          )}

          {wordChoiceCount > 0 && (
            <button
              type="button"
              onClick={() => setActiveMistakeFilter('word_choice')}
              className={`px-2 py-1 rounded-lg font-bold text-[11px] transition ${
                activeMistakeFilter === 'word_choice'
                  ? 'bg-sky-500 text-slate-950'
                  : 'bg-sky-950/40 text-sky-300 border border-sky-800/40 hover:bg-sky-900/40'
              }`}
            >
              Word Choice ({wordChoiceCount})
            </button>
          )}

          {sentenceStructureCount > 0 && (
            <button
              type="button"
              onClick={() => setActiveMistakeFilter('sentence_structure')}
              className={`px-2 py-1 rounded-lg font-bold text-[11px] transition ${
                activeMistakeFilter === 'sentence_structure'
                  ? 'bg-purple-500 text-white'
                  : 'bg-purple-950/40 text-purple-300 border border-purple-800/40 hover:bg-purple-900/40'
              }`}
            >
              Structure ({sentenceStructureCount})
            </button>
          )}

          {punctuationCount > 0 && (
            <button
              type="button"
              onClick={() => setActiveMistakeFilter('punctuation')}
              className={`px-2 py-1 rounded-lg font-bold text-[11px] transition ${
                activeMistakeFilter === 'punctuation'
                  ? 'bg-yellow-500 text-slate-950'
                  : 'bg-yellow-950/40 text-yellow-300 border border-yellow-800/40 hover:bg-yellow-900/40'
              }`}
            >
              Punctuation ({punctuationCount})
            </button>
          )}

          {clarityCount > 0 && (
            <button
              type="button"
              onClick={() => setActiveMistakeFilter('clarity')}
              className={`px-2 py-1 rounded-lg font-bold text-[11px] transition ${
                activeMistakeFilter === 'clarity'
                  ? 'bg-teal-500 text-slate-950'
                  : 'bg-teal-950/40 text-teal-300 border border-teal-800/40 hover:bg-teal-900/40'
              }`}
            >
              Clarity ({clarityCount})
            </button>
          )}

          {toneCount > 0 && (
            <button
              type="button"
              onClick={() => setActiveMistakeFilter('tone')}
              className={`px-2 py-1 rounded-lg font-bold text-[11px] transition ${
                activeMistakeFilter === 'tone'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-indigo-950/40 text-indigo-300 border border-indigo-800/40 hover:bg-indigo-900/40'
              }`}
            >
              Tone ({toneCount})
            </button>
          )}
        </div>
      </div>

      {/* Comparative View: Original Answer (Highlighted) & Improved Full Answer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* 1. ORIGINAL ANSWER (MISTAKES CLEARLY HIGHLIGHTED) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-750 flex flex-col justify-between space-y-3 shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-rose-400" />
                <span>Your Submitted Answer (Mistakes Highlighted)</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {mistakes.length === 0 ? (
                  <span className="text-emerald-400 font-bold">✓ 0 Errors</span>
                ) : (
                  <span className="text-rose-400 font-bold">{mistakes.length} issues detected</span>
                )}
              </span>
            </div>

            <div className="p-3.5 mt-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
              {renderHighlightedOriginalText()}
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-850">
            <span>Original wording preserved for direct line-by-line comparison.</span>
            {mistakes.length > 0 && (
              <span className="text-rose-400 font-medium">See detailed corrections below ↓</span>
            )}
          </div>
        </div>

        {/* 2. IMPROVED VERSION OF FULL ANSWER */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between space-y-3 shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Improved Full Answer (Corrected & Refined)</span>
              </span>
              
              <button
                type="button"
                onClick={handleCopyImproved}
                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-emerald-300 bg-emerald-900/40 hover:bg-emerald-800/40 rounded-lg transition border border-emerald-500/30"
              >
                {copiedImproved ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedImproved ? 'Copied!' : 'Copy Improved'}</span>
              </button>
            </div>

            <div className="p-3.5 mt-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-emerald-100 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {improvedFullAnswer || originalText || '(No answer generated)'}
            </div>
          </div>

          <div className="pt-2 text-[11px] text-emerald-400/90 flex items-center justify-between border-t border-emerald-500/20">
            <span>Refined with proper grammar, spelling, structure, and professional register.</span>
            {effectiveBenchmark && (
              <button
                type="button"
                onClick={() => setShowBenchmark(!showBenchmark)}
                className="text-emerald-300 hover:underline font-semibold"
              >
                {showBenchmark ? 'Hide Suggested Benchmark' : 'Compare Suggested Model'}
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 3. SUGGESTED BENCHMARK MODEL ANSWER & COMPARATIVE ANALYSIS */}
      {showBenchmark && effectiveBenchmark && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-3 text-xs shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Suggested Benchmark Answer (Aptis / ICAP Examiner Model)</span>
            </span>
            <button
              type="button"
              onClick={handleCopyModel}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-amber-300 bg-amber-950/40 hover:bg-amber-900/40 rounded-lg border border-amber-500/30 transition"
            >
              {copiedModel ? <Check className="w-3 h-3 text-amber-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedModel ? 'Copied' : 'Copy Model'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {effectiveBenchmark}
          </div>

          {/* Benchmark Comparison Notes */}
          {benchmarkComparisonNotes && (
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/25 flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11px] text-amber-200/90 leading-relaxed">
                <span className="font-bold text-amber-300 mr-1">Benchmark Comparison Analysis:</span>
                {benchmarkComparisonNotes}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. ITEM-BY-ITEM DETECTED MISTAKES WITH WHAT IS WRONG, CORRECTED VERSION & REASON */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-750 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
            <span>Itemized Mistakes, Corrections & Explanations</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-400 font-mono">
              {filteredMistakes.length} {filteredMistakes.length === 1 ? 'issue' : 'issues'}
            </span>
          </h5>
          <span className="text-[11px] text-slate-400">Detailed line-by-line review</span>
        </div>

        {mistakes.length === 0 ? (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Excellent work! No grammar, spelling, word choice, structure, or tone errors were detected in this answer.</span>
          </div>
        ) : filteredMistakes.length === 0 ? (
          <div className="p-3 rounded-xl bg-slate-850 text-xs text-slate-400">
            No mistakes found for the selected category filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {filteredMistakes.map((m, idx) => {
              let typeBadgeClass = 'bg-rose-950/50 text-rose-300 border-rose-800/60';
              let typeName = 'Spelling Mistake';

              if (m.type === 'grammar') {
                typeBadgeClass = 'bg-amber-950/50 text-amber-300 border-amber-800/60';
                typeName = 'Grammar Mistake';
              } else if (m.type === 'word_choice') {
                typeBadgeClass = 'bg-sky-950/50 text-sky-300 border-sky-800/60';
                typeName = 'Word Choice';
              } else if (m.type === 'sentence_structure') {
                typeBadgeClass = 'bg-purple-950/50 text-purple-300 border-purple-800/60';
                typeName = 'Sentence Structure';
              } else if (m.type === 'punctuation') {
                typeBadgeClass = 'bg-yellow-950/50 text-yellow-300 border-yellow-800/60';
                typeName = 'Punctuation';
              } else if (m.type === 'clarity') {
                typeBadgeClass = 'bg-teal-950/50 text-teal-300 border-teal-800/60';
                typeName = 'Clarity & Conciseness';
              } else if (m.type === 'tone') {
                typeBadgeClass = 'bg-indigo-950/50 text-indigo-300 border-indigo-800/60';
                typeName = 'Tone & Register';
              }

              return (
                <div 
                  key={m.id || idx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-750 transition space-y-2.5 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${typeBadgeClass}`}>
                      {typeName}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">#{idx + 1}</span>
                  </div>

                  {/* What is wrong vs Corrected version */}
                  <div className="space-y-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-rose-400 shrink-0">Issue:</span>
                      <span className="line-through text-rose-300 font-semibold truncate" title={m.original}>
                        "{m.original}"
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-400 shrink-0">Correction:</span>
                      <span className="text-emerald-300 font-bold truncate" title={m.replacement}>
                        "{m.replacement}"
                      </span>
                    </div>
                  </div>

                  {/* Brief Explanation */}
                  <div className="text-slate-300 text-[11px] leading-relaxed space-y-1">
                    <p className="text-slate-300">
                      <span className="font-semibold text-slate-400 mr-1">Reason:</span>
                      {m.explanation}
                    </p>
                    {m.urduExplanation && (
                      <p className="text-emerald-400/90 text-[10px] font-urdu leading-normal">
                        {m.urduExplanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
