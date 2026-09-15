import React, { useState, useMemo } from 'react';
import { 
  PenTool, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Gauge, 
  Sliders, 
  RefreshCw, 
  FileText, 
  Send, 
  Copy, 
  BookOpen, 
  ArrowRight,
  ShieldAlert,
  Loader2,
  Check,
  ArrowLeft
} from 'lucide-react';
import { WritingScenario, WritingEvaluation } from '../types';
import { MOCK_WRITING_SCENARIOS, MOCK_WRITING_EVALUATION } from '../data/mockData';
import { callGeminiAPI } from '../lib/api-handler';
import { analyzeWritingWithMistakes, WritingFeedbackResult } from '../lib/writingFeedback';
import { WritingFeedbackDisplay } from './WritingFeedbackDisplay';

interface WritingLabProps {
  onBackToMain?: () => void;
}

export const WritingLab: React.FC<WritingLabProps> = ({ onBackToMain }) => {
  const [currentScenario, setCurrentScenario] = useState<WritingScenario>(MOCK_WRITING_SCENARIOS[0]);
  const [studentText, setStudentText] = useState<string>('');
  const [isGeneratingScenario, setIsGeneratingScenario] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<WritingEvaluation | null>(null);
  const [feedbackResult, setFeedbackResult] = useState<WritingFeedbackResult | null>(null);
  const [copiedSample, setCopiedSample] = useState<boolean>(false);

  // Word & Character count computation
  const wordCount = useMemo(() => {
    return studentText.trim() ? studentText.trim().split(/\s+/).filter(Boolean).length : 0;
  }, [studentText]);

  const charCount = useMemo(() => {
    return studentText.length;
  }, [studentText]);

  // Target word count: 120 - 150 words
  const isWordCountValid = wordCount >= 120 && wordCount <= 150;
  const isTooShort = wordCount > 0 && wordCount < 120;
  const isTooLong = wordCount > 150;

  // Step 3 Requirement 1: Scenario Prompt Generator via Gemini
  const handleGenerateRandomScenario = async () => {
    setIsGeneratingScenario(true);

    const systemPrompt = `You are a Lead Examiner for ICAP (Institute of Chartered Accountants of Pakistan) Business Communication exams.
Generate a realistic, high-impact business communication or audit email scenario for zero-to-advanced CA students.
Topics can include:
- Unrecorded liability inquiry to client CFO
- Inventory count delay or physical verification safety issue
- Management letter point regarding lack of dual authorization in petty cash
- Statutory bank confirmation reminder under ISA 505
- Revenue recognition deferral dispute under IFRS 15

Return pure JSON matching this exact structure:
{
  "id": "sc-dynamic",
  "title": "Short title of scenario",
  "role": "Your role (e.g., Audit Senior / Tax Consultant)",
  "recipient": "Recipient name and title",
  "scenario": "Detailed 3-4 sentence scenario description with context...",
  "requiredWordCount": { "min": 120, "max": 150 },
  "keyPoints": [
    "Key requirement 1",
    "Key requirement 2",
    "Key requirement 3",
    "Key requirement 4"
  ],
  "sampleModelAnswer": "A pristine, 135-word ICAP model answer email demonstrating formal passive tone, correct vocabulary, and proper email framing."
}`;

    const userPrompt = `Generate a fresh random ICAP scenario now. Timestamp: ${Date.now()}`;

    // Pick a random fallback from mock scenarios
    const randomFallback = MOCK_WRITING_SCENARIOS[Math.floor(Math.random() * MOCK_WRITING_SCENARIOS.length)];

    try {
      const generated = await callGeminiAPI<WritingScenario>(systemPrompt, userPrompt, randomFallback);
      if (generated && generated.title && generated.scenario) {
        setCurrentScenario(generated);
        setEvaluation(null); // Clear previous analysis
        setFeedbackResult(null);
      }
    } catch (e) {
      console.warn('Scenario generation fallback used:', e);
      setCurrentScenario(randomFallback);
      setEvaluation(null);
      setFeedbackResult(null);
    } finally {
      setIsGeneratingScenario(false);
    }
  };

  // Step 3 Requirement 3 & 4: Diagnostic Feedback Dashboard with safe fallback
  const handleAnalyzeWriting = async () => {
    if (!studentText.trim()) return;
    setIsAnalyzing(true);

    try {
      const detailedFeedback = await analyzeWritingWithMistakes(
        studentText,
        { title: currentScenario.title, prompt: currentScenario.scenario, recipient: currentScenario.recipient },
        'formal'
      );
      setFeedbackResult(detailedFeedback);

      const evalResult: WritingEvaluation = {
        score: detailedFeedback.score,
        bandRating: (detailedFeedback.bandRating as any) || 'B2',
        toneRegister: (detailedFeedback.toneRegister as any) || 'Formal',
        grammarScore: detailedFeedback.grammarScore,
        vocabularyScore: detailedFeedback.vocabularyScore,
        cohesionScore: detailedFeedback.cohesionScore,
        summaryFeedback: detailedFeedback.summaryFeedback,
        urduSummary: detailedFeedback.urduSummary,
        sentences: detailedFeedback.mistakes.map(m => ({
          originalSentence: m.original,
          correctedSentence: m.replacement,
          errorType: m.type === 'spelling' ? 'Spelling Mistake' : m.type === 'grammar' ? 'Grammar Mistake' : m.type === 'tone' ? 'Tone / Register Error' : 'Word Choice / Mechanics',
          explanation: m.explanation,
          urduExplanation: m.urduExplanation
        }))
      };
      setEvaluation(evalResult);

      // Save to localStorage for Dashboard
      try {
        const prevStr = localStorage.getItem('icap_writing_results');
        const prev = prevStr ? JSON.parse(prevStr) : [];
        prev.unshift({
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          scenarioTitle: currentScenario.title,
          score: evalResult.score,
          bandRating: evalResult.bandRating,
          toneRegister: evalResult.toneRegister,
          wordCount
        });
        localStorage.setItem('icap_writing_results', JSON.stringify(prev.slice(0, 15)));
      } catch (e) {
        console.warn('Could not store writing result:', e);
      }
    } catch (e) {
      console.warn('Using fallback writing evaluation:', e);
      setEvaluation(MOCK_WRITING_EVALUATION);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyModelAnswer = () => {
    if (currentScenario.sampleModelAnswer) {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(currentScenario.sampleModelAnswer)
          .then(() => {
            setCopiedSample(true);
            setTimeout(() => setCopiedSample(false), 2000);
          })
          .catch((err) => {
            console.warn('Clipboard copy prevented or failed:', err);
          });
      }
    }
  };

  const handleUseSampleDraft = () => {
    setStudentText(
      `Dear Mr. Tariq,\n\nI am writing this email to telling you that audit is late. The warehouse guy said we cannot count goods due to safety issues. Also computer ERP system stopped working yesterday morning.\n\nWe have worked in night to finish fast with the workers. Please give us two more days to give report to the firm.\n\nThanks and regards,\nAudit Senior`
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Back to Main Page Navigation */}
      {onBackToMain && (
        <div className="flex items-center">
          <button
            onClick={onBackToMain}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all duration-75 shadow cursor-pointer touch-manipulation active:scale-[0.98]"
            title="Return to Main Practice Exam Page"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>← Back to Main Page</span>
          </button>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              AI Writing & Email Lab
            </span>
            <span className="text-xs text-slate-400">Target: 120–150 Words Formal Business Register</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-display font-extrabold text-white">
            ICAP CA Business Writing & Diagnostic Evaluator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Practice authentic audit emails, memos, and client reports. Receive sentence-by-sentence heatmap correction powered by Gemini 2.5 Flash.
          </p>
        </div>

        {/* Generate Random Scenario Button (Requirement 1) */}
        <button
          onClick={handleGenerateRandomScenario}
          disabled={isGeneratingScenario}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-75 cursor-pointer touch-manipulation active:scale-[0.98] disabled:opacity-50"
        >
          {isGeneratingScenario ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating Scenario...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Random ICAP Scenario</span>
            </>
          )}
        </button>
      </div>

      {/* SCENARIO CARD */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">{currentScenario.title}</h3>
              <p className="text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Role:</span> {currentScenario.role} | <span className="font-semibold text-slate-700">Recipient:</span> {currentScenario.recipient}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleUseSampleDraft}
              className="text-xs text-slate-500 hover:text-emerald-600 font-medium underline"
            >
              Insert Demo Error Draft
            </button>
            {currentScenario.sampleModelAnswer && (
              <button
                onClick={handleCopyModelAnswer}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                {copiedSample ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSample ? 'Copied Model!' : 'Model Answer'}</span>
              </button>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          {currentScenario.scenario}
        </p>

        {currentScenario.keyPoints && (
          <div className="text-xs text-slate-600 pt-1">
            <strong className="text-slate-800">Checklist Requirements:</strong>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1.5">
              {currentScenario.keyPoints.map((kp, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{kp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* WRITING WORKSPACE (Requirement 2) */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
            <PenTool className="w-4 h-4 text-emerald-600" />
            <span>Student Writing Workspace:</span>
          </label>

          {/* Real-time Word Counter and Warning Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-xs px-3 py-1 rounded-lg bg-slate-100 font-mono text-slate-700 font-semibold">
              {charCount} chars • {wordCount} words
            </div>

            {isWordCountValid && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5" /> Word Count Ideal (120–150)
              </span>
            )}

            {isTooShort && (
              <span className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-lg animate-pulse">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Too Short ({120 - wordCount} words remaining)
              </span>
            )}

            {isTooLong && (
              <span className="flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-lg">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> Over Limit ({wordCount - 150} words excess)
              </span>
            )}
          </div>
        </div>

        <textarea
          value={studentText}
          onChange={(e) => setStudentText(e.target.value)}
          placeholder="Dear Mr. Tariq,&#10;&#10;I am writing to formally apprise you of an unforeseen delay in concluding the inventory verification at Apex Chemicals Ltd...&#10;&#10;Yours sincerely,&#10;Audit Senior"
          rows={9}
          className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm font-sans leading-relaxed text-slate-800 transition"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-xs text-slate-500">
            Tip: Use formal salutations ("Dear Mr. Tariq"), non-accusatory passive verbs, and avoid casual contractions.
          </p>

          <button
            onClick={handleAnalyzeWriting}
            disabled={isAnalyzing || !studentText.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all duration-75 cursor-pointer touch-manipulation active:scale-[0.98] disabled:opacity-40"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Analyzing Sentences & Tone...</span>
              </>
            ) : (
              <>
                <Gauge className="w-4 h-4 text-emerald-400" />
                <span>Analyze Writing (AI Diagnostic)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* DIAGNOSTIC FEEDBACK DASHBOARD (Requirement 3) */}
      {evaluation && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 animate-in fade-in duration-300">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                  Diagnostic Report
                </span>
                <span className="text-xs text-slate-500 font-medium">Evaluation standard: ICAP PRC-01</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                Overall Writing Score: <span className="text-emerald-600">{evaluation.score} / 100</span>
              </h2>
            </div>

            {/* Badges & Scores */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Band Rating */}
              <div className="px-4 py-3 rounded-2xl bg-slate-900 text-white text-center min-w-[130px]">
                <div className="text-[10px] uppercase font-bold text-slate-400">Band Rating</div>
                <div className="text-sm font-bold text-emerald-400">{evaluation.bandRating}</div>
              </div>

              {/* Tone & Register Detector */}
              <div className="px-4 py-3 rounded-2xl bg-slate-100 text-slate-800 text-center min-w-[130px] border border-slate-200">
                <div className="text-[10px] uppercase font-bold text-slate-500">Tone & Register</div>
                <div className={`text-sm font-bold ${
                  evaluation.toneRegister === 'Formal' ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {evaluation.toneRegister}
                </div>
              </div>

              {/* Subscores */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-center text-xs">
                <div>
                  <div className="text-[9px] font-bold text-slate-500">Grammar</div>
                  <div className="font-bold text-slate-900">{evaluation.grammarScore}%</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-slate-500">Vocab</div>
                  <div className="font-bold text-slate-900">{evaluation.vocabularyScore}%</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-slate-500">Cohesion</div>
                  <div className="font-bold text-slate-900">{evaluation.cohesionScore}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Summaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="block text-slate-900 font-bold mb-1">Examiner Assessment:</strong>
              {evaluation.summaryFeedback}
            </div>
            {evaluation.urduSummary && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-800 leading-relaxed font-urdu">
                <strong className="block text-emerald-900 font-bold mb-1 font-sans not-italic">
                  اردو میں رہنمائی (Urdu Summary):
                </strong>
                {evaluation.urduSummary}
              </div>
            )}
          </div>

          {/* ENHANCED MISTAKE DETECTION & CORRECTIONS DISPLAY */}
          {feedbackResult && (
            <div className="pt-2">
              <WritingFeedbackDisplay
                originalText={studentText}
                feedback={feedbackResult}
                benchmarkModelAnswer={currentScenario.sampleModelAnswer}
                taskTitle={currentScenario.title}
                wordCount={wordCount}
                requiredWordRange="120–150 words"
              />
            </div>
          )}

          {/* SENTENCE-BY-SENTENCE HEATMAP TABLE */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>Sentence-by-Sentence Heatmap & Corrections</span>
              <span className="text-xs font-normal text-slate-500">({evaluation.sentences?.length || 0} sentences analyzed)</span>
            </h3>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900 text-slate-200 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3.5 border-r border-slate-800 w-1/4">Column 1: Student Sentence</th>
                    <th className="p-3.5 border-r border-slate-800 w-1/4">Column 2: Corrected CA Standard</th>
                    <th className="p-3.5 border-r border-slate-800 w-1/6">Column 3: Error Type</th>
                    <th className="p-3.5 w-1/3">Column 4: Simple Explanation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {evaluation.sentences && evaluation.sentences.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      
                      {/* Col 1 */}
                      <td className="p-3.5 text-rose-900 bg-rose-50/30 border-r border-slate-200 font-mono text-[11px] leading-relaxed">
                        "{item.originalSentence}"
                      </td>

                      {/* Col 2 */}
                      <td className="p-3.5 text-emerald-950 bg-emerald-50/40 border-r border-slate-200 font-semibold leading-relaxed">
                        "{item.correctedSentence}"
                      </td>

                      {/* Col 3 */}
                      <td className="p-3.5 border-r border-slate-200">
                        <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          {item.errorType}
                        </span>
                      </td>

                      {/* Col 4 */}
                      <td className="p-3.5 text-slate-700 leading-relaxed space-y-1">
                        <div>{item.explanation}</div>
                        {item.urduExplanation && (
                          <div className="text-emerald-800 font-urdu text-[11px] pt-1 border-t border-slate-100">
                            {item.urduExplanation}
                          </div>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
