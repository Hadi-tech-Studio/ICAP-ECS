import React from 'react';
import { 
  BookOpen, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Bookmark, 
  Languages, 
  Check, 
  HelpCircle,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { BookChapter } from '../types';

interface PDFRendererProps {
  chapter: BookChapter;
  theme: 'slate' | 'sepia' | 'light' | 'midnight';
}

export const PDFDocumentView: React.FC<PDFRendererProps> = ({ chapter, theme }) => {
  // Theme styling helpers
  const isLight = theme === 'light' || theme === 'sepia';
  const isSepia = theme === 'sepia';

  const cardBg = isSepia 
    ? 'bg-[#f7ebd0] border-[#dec596]' 
    : theme === 'light' 
    ? 'bg-white border-slate-200' 
    : theme === 'midnight' 
    ? 'bg-zinc-900/90 border-zinc-800' 
    : 'bg-slate-900/90 border-slate-800';

  const tableHeaderBg = isSepia
    ? 'bg-[#2b4c6f] text-white'
    : 'bg-[#1e3a5f] text-white';

  const tableAltRowBg = isSepia
    ? 'bg-[#f0dfba]/50'
    : isLight
    ? 'bg-slate-50'
    : 'bg-slate-950/40';

  const solvedBoxBg = isSepia
    ? 'bg-[#eef2f7] border-[#2b4c6f]/30 text-[#1e293b]'
    : isLight
    ? 'bg-[#f0f6ff] border-blue-200 text-slate-800'
    : 'bg-blue-950/30 border-blue-500/40 text-blue-100';

  const solvedInnerBg = isSepia
    ? 'bg-white border-[#2b4c6f]/20'
    : isLight
    ? 'bg-white border-blue-200/80'
    : 'bg-slate-900/90 border-blue-500/30';

  const tipBoxBg = isSepia
    ? 'bg-[#fdf3d8] border-amber-400/50 text-amber-950'
    : isLight
    ? 'bg-amber-50/90 border-amber-300 text-amber-900'
    : 'bg-amber-950/25 border-amber-500/40 text-amber-200';

  const greenBoxBg = isSepia
    ? 'bg-[#eaf5ee] border-emerald-500/40 text-emerald-950'
    : isLight
    ? 'bg-emerald-50/90 border-emerald-300 text-emerald-900'
    : 'bg-emerald-950/25 border-emerald-500/40 text-emerald-200';

  // Render Page Header
  const renderPageHeader = (pageNumber: number, customSub?: string) => (
    <div className="flex items-center justify-between pb-3 mb-6 border-b border-inherit text-xs opacity-70 font-semibold select-none">
      <span className="flex items-center gap-1.5">
        <span className="font-bold uppercase tracking-wider text-emerald-500">ICAP ECS Master</span>
        <span>•</span>
        <span>{customSub || 'Core Theoretical Notes & Solved Examples'}</span>
      </span>
      <span className="font-mono bg-black/10 px-2.5 py-0.5 rounded text-[11px] font-bold">
        Page {pageNumber} of 14
      </span>
    </div>
  );

  // Render Solved Example Box (Blue bordered card exactly like PDF)
  const renderSolvedBox = (
    title: string,
    question: string,
    options?: { label: string; text: string }[],
    solution?: string,
    reason?: string
  ) => (
    <div className={`p-5 rounded-2xl border-l-4 border-l-blue-600 border ${solvedBoxBg} space-y-3 shadow-md`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5 font-mono">
          <CheckCircle2 className="w-4 h-4" /> {title}
        </span>
      </div>

      <div className="text-sm font-semibold leading-relaxed">
        <span className="text-blue-600 font-bold mr-1.5">Question:</span>
        {question}
      </div>

      {options && options.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-1 text-xs">
          {options.map((opt) => (
            <span key={opt.label} className="px-3 py-1 rounded-lg bg-black/10 font-medium">
              <strong className="text-blue-500 mr-1">{opt.label})</strong> {opt.text}
            </span>
          ))}
        </div>
      )}

      {(solution || reason) && (
        <div className={`p-3.5 rounded-xl border ${solvedInnerBg} text-xs space-y-1 mt-2`}>
          {solution && (
            <div className="font-bold text-emerald-600 flex items-center gap-1">
              <span>Solution:</span>
              <span className="text-inherit">{solution}</span>
            </div>
          )}
          {reason && (
            <div className="opacity-90 leading-relaxed">
              <strong className="text-blue-500 mr-1">Reason / Explanation:</strong>
              {reason}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Render Teacher / Tip Box (Yellow/Amber or Green exactly like PDF)
  const renderTipBox = (title: string, content: string, color: 'amber' | 'green' = 'amber') => (
    <div className={`p-4 rounded-xl border-l-4 ${color === 'amber' ? 'border-l-amber-500 ' + tipBoxBg : 'border-l-emerald-500 ' + greenBoxBg} text-xs space-y-1 shadow-xs`}>
      <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
        <Lightbulb className="w-3.5 h-3.5 shrink-0" /> {title}
      </span>
      <p className="leading-relaxed font-medium pt-0.5">{content}</p>
    </div>
  );

  // Switch between Chapter Layouts
  return (
    <div className="space-y-12 select-text font-sans">

      {/* =========================================================
          CHAPTER 1: GRAMMAR FOUNDATION
          ========================================================= */}
      {chapter.number === 1 && (
        <div className="space-y-10">
          
          {/* Document Overview Section Box (Page 1 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-5`}>
            {renderPageHeader(1, 'CA Journey • Comprehensive English Communication')}
            
            <div className="p-6 rounded-2xl bg-[#0e2746] text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  CA JOURNEY
                </span>
                <span className="text-xs text-slate-300">Official Study Notes</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display text-white">
                Comprehensive English Communication & Aptis General Core Study Notes
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                Core Theoretical Reference • Solved Examples • Topic Mastery
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-950/15 border border-blue-500/30 space-y-3 text-xs sm:text-sm">
              <h3 className="font-bold text-blue-500 text-sm flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Document Overview & Structure
              </h3>
              <p className="opacity-90 leading-relaxed">
                This master note document provides concise, high-yield theoretical foundations, grammatical frameworks, key vocabulary repositories, reading strategy breakdowns, and formal/informal writing models. All practice material and extraneous MCQs have been filtered out to ensure maximum focus on core principles and solved examples.
              </p>
              <ul className="space-y-2 pt-2 border-t border-inherit">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>Chapter 1: Grammar Foundation</strong> – Detailed coverage of parts of speech, 12 verb tenses, modal verbs, conditionals, passive voice, reported speech, relative clauses, articles, gerunds/infinitives, comparatives, subjunctive, and inversion.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                  <span><strong>Chapter 2: Vocabulary Mastery</strong> – Word formation rules, prefix/suffix mechanics, 700+ thematic terms across 8 key sectors, high-yield collocations, and exact synonym/antonym mappings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>Chapter 3: Reading Skills</strong> – Strategic frameworks and fully annotated solved models for all four core reading task formats.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span><strong>Chapter 4: Writing Skills</strong> – Categorized discourse markers, complete formal/informal email structural templates, and authentic band-9 model writing responses.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Chapter 1 Overview & Roadmap Table (Page 2 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(2)}

            <div className="p-4 rounded-2xl bg-[#14284b] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  CHAPTER 1: GRAMMAR FOUNDATION
                </span>
                <h3 className="text-lg font-bold text-white font-display">Core Theoretical Notes & Solved Examples</h3>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold opacity-90">Chapter 1 Overview & Roadmap</h4>
              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className={tableHeaderBg}>
                      <th className="p-3 font-bold w-1/4">Topic</th>
                      <th className="p-3 font-bold">Core Description & Focus</th>
                      <th className="p-3 font-bold text-center w-20">Section</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    <tr className="hover:bg-black/5">
                      <td className="p-3 font-semibold">1.1 Parts of Speech</td>
                      <td className="p-3">Functions and examples of nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions, articles, interjections.</td>
                      <td className="p-3 text-center font-mono">Sec 1.1</td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-semibold">1.2 Verb Tenses</td>
                      <td className="p-3">Complete guide to all 12 tenses with formulas, signal words, specific usage, and solved contextual examples.</td>
                      <td className="p-3 text-center font-mono">Sec 1.2</td>
                    </tr>
                    <tr className="hover:bg-black/5">
                      <td className="p-3 font-semibold">1.3 Modal Verbs</td>
                      <td className="p-3">Present/future modals and modal perfect forms (must have, might have, could have, should have).</td>
                      <td className="p-3 text-center font-mono">Sec 1.3</td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-semibold">1.4 Conditionals</td>
                      <td className="p-3">Zero, First, Second, Third, and Mixed Conditionals plus wish / if only / unless structures.</td>
                      <td className="p-3 text-center font-mono">Sec 1.4</td>
                    </tr>
                    <tr className="hover:bg-black/5">
                      <td className="p-3 font-semibold">1.5 Passive Voice</td>
                      <td className="p-3">Tense-by-tense active to passive transformation rules and agent inclusion/omission guidelines.</td>
                      <td className="p-3 text-center font-mono">Sec 1.5</td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-semibold">1.6 Reported Speech</td>
                      <td className="p-3">Backshifting tense rules, time/place adverbial changes, and reported questions/commands.</td>
                      <td className="p-3 text-center font-mono">Sec 1.6</td>
                    </tr>
                    <tr className="hover:bg-black/5">
                      <td className="p-3 font-semibold">1.7 Relative Clauses</td>
                      <td className="p-3">Defining vs Non-defining clauses, relative pronouns (who, which, that, whose, where, when).</td>
                      <td className="p-3 text-center font-mono">Sec 1.7</td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-semibold">1.8 Articles</td>
                      <td className="p-3">Definite (the), Indefinite (a/an), and Zero article rules with geographical and abstract noun exceptions.</td>
                      <td className="p-3 text-center font-mono">Sec 1.8</td>
                    </tr>
                    <tr className="hover:bg-black/5">
                      <td className="p-3 font-semibold">1.9 Gerunds & Infinitives</td>
                      <td className="p-3">Verb classification taking gerunds (-ing) or infinitives (to+V), plus verbs changing meaning.</td>
                      <td className="p-3 text-center font-mono">Sec 1.9</td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-semibold">1.10 Comparatives</td>
                      <td className="p-3">Comparative/superlative rules, irregular forms, as...as, and double comparative constructions.</td>
                      <td className="p-3 text-center font-mono">Sec 1.10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Solved Example 1 (Past Perfect) */}
            {renderSolvedBox(
              'CHAPTER 1 MAIN TOPIC SOLVED EXAMPLE',
              'Identify the correct tense form to complete the sentence: "By the time the ambulance arrived, the patient ________ consciousness."',
              [
                { label: 'A', text: 'loses' },
                { label: 'B', text: 'had lost' },
                { label: 'C', text: 'has lost' }
              ],
              'B (had lost)',
              'When two actions occurred in the past, the earlier action that was completed before another past event requires the Past Perfect tense (had + V3).'
            )}
          </section>

          {/* Standard Practice Question & 1.1 Parts of Speech (Page 3 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(3)}

            {renderSolvedBox(
              'CHAPTER 1 STANDARD PRACTICE QUESTION',
              'Choose the correct conditional form: "If I had known about the meeting earlier, I ________ present."',
              [
                { label: 'A', text: 'would be' },
                { label: 'B', text: 'will have been' },
                { label: 'C', text: 'would have been' }
              ],
              'C (would have been)',
              'This is a Third Conditional sentence (If + past perfect, would have + past participle), expressing an unreal condition in the past and its past result.'
            )}

            <div className="space-y-4 pt-2">
              <h3 className="text-base sm:text-lg font-bold border-b border-inherit pb-2">
                1.1 Parts of Speech – The Building Blocks of English
              </h3>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                English words are categorized into nine primary parts of speech based on their function within a sentence:
              </p>

              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className={tableHeaderBg}>
                      <th className="p-3 font-bold w-1/4">Part of Speech</th>
                      <th className="p-3 font-bold">Function / Role</th>
                      <th className="p-3 font-bold">Key Examples</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    <tr><td className="p-3 font-semibold">Noun</td><td className="p-3">Names a person, place, thing, concept, or idea</td><td className="p-3 font-mono text-[11px]">auditor, office, contract, liquidity, asset</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-semibold">Pronoun</td><td className="p-3">Replaces a noun to prevent repetition</td><td className="p-3 font-mono text-[11px]">he, she, it, they, which, whom, this</td></tr>
                    <tr><td className="p-3 font-semibold">Verb</td><td className="p-3">Expresses action, occurrence, or state of being</td><td className="p-3 font-mono text-[11px]">verify, generate, perform, is, become</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-semibold">Adjective</td><td className="p-3">Modifies or describes a noun/pronoun</td><td className="p-3 font-mono text-[11px]">substantial, fiscal, reliable, comprehensive</td></tr>
                    <tr><td className="p-3 font-semibold">Adverb</td><td className="p-3">Modifies a verb, adjective, or another adverb</td><td className="p-3 font-mono text-[11px]">accurately, significantly, highly, already</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-semibold">Preposition</td><td className="p-3">Shows spatial, temporal, or logical relationships</td><td className="p-3 font-mono text-[11px]">in, on, at, by, under, despite, through</td></tr>
                    <tr><td className="p-3 font-semibold">Conjunction</td><td className="p-3">Connects words, phrases, or clauses</td><td className="p-3 font-mono text-[11px]">and, but, although, because, provided that</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-semibold">Article</td><td className="p-3">Specifies or defines a noun</td><td className="p-3 font-mono text-[11px]">a, an, the</td></tr>
                    <tr><td className="p-3 font-semibold">Interjection</td><td className="p-3">Expresses immediate emotion (informal)</td><td className="p-3 font-mono text-[11px]">Oh! Wow! Well (Note: avoid in formal writing)</td></tr>
                  </tbody>
                </table>
              </div>

              {renderSolvedBox(
                'SOLVED EXAMPLE – PARTS OF SPEECH',
                'Identify the correct adverbial modifier in: "She worked ________ to finish the audit before sunrise."',
                [
                  { label: 'A', text: 'tireless' },
                  { label: 'B', text: 'tirelessly' },
                  { label: 'C', text: 'tiresomeness' }
                ],
                'B (tirelessly)',
                'An adverb (-ly) is required to modify the main verb worked.'
              )}
            </div>
          </section>

          {/* 1.2 Verb Tenses Reference (Page 4 & 5 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(4)}

            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold border-b border-inherit pb-2">
                1.2 Verb Tenses – Complete Reference
              </h3>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                Mastering verb tenses requires understanding the exact time frame, formula, and key signal words.
              </p>

              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className={tableHeaderBg}>
                      <th className="p-3 font-bold w-1/5">Tense Name</th>
                      <th className="p-3 font-bold w-1/4">Grammatical Formula</th>
                      <th className="p-3 font-bold w-1/4">Key Signal Words</th>
                      <th className="p-3 font-bold">Core Use & Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    <tr>
                      <td className="p-3 font-bold text-emerald-500">Simple Present</td>
                      <td className="p-3 font-mono text-[11px]">V (base) / V+s (he/she/it)</td>
                      <td className="p-3 italic text-slate-400">always, usually, every day, often, generally</td>
                      <td className="p-3">Habits, general truths, routines.<br/><span className="text-[11px] opacity-80 font-medium">"The company operates globally."</span></td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-bold text-emerald-500">Present Continuous</td>
                      <td className="p-3 font-mono text-[11px]">am/is/are + V-ing</td>
                      <td className="p-3 italic text-slate-400">now, currently, at present, right now</td>
                      <td className="p-3">Actions happening right now or temporary situations.<br/><span className="text-[11px] opacity-80 font-medium">"They are conducting an audit."</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-cyan-500">Simple Past</td>
                      <td className="p-3 font-mono text-[11px]">V-ed (regular) / V2 (irregular)</td>
                      <td className="p-3 italic text-slate-400">yesterday, last year, ago, in 2021, then</td>
                      <td className="p-3">Completed past events at a specific time.<br/><span className="text-[11px] opacity-80 font-medium">"She finished her degree in 2018."</span></td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-bold text-cyan-500">Past Continuous</td>
                      <td className="p-3 font-mono text-[11px]">was/were + V-ing</td>
                      <td className="p-3 italic text-slate-400">while, when, at that time, all evening</td>
                      <td className="p-3">Interrupted past actions or simultaneous background events.<br/><span className="text-[11px] opacity-80 font-medium">"I was reading when the phone rang."</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-amber-500">Present Perfect</td>
                      <td className="p-3 font-mono text-[11px]">have/has + V3 (past participle)</td>
                      <td className="p-3 italic text-slate-400">just, already, yet, ever, never, since, for</td>
                      <td className="p-3">Past action with present relevance or duration from past to now.<br/><span className="text-[11px] opacity-80 font-medium">"He has worked here since 2015."</span></td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-bold text-amber-500">Present Perfect Continuous</td>
                      <td className="p-3 font-mono text-[11px]">have/has + been + V-ing</td>
                      <td className="p-3 italic text-slate-400">for, since, all day, lately, recently</td>
                      <td className="p-3">Action started in past, continuing up to present with focus on duration.<br/><span className="text-[11px] opacity-80 font-medium">"She has been studying for 3 hours."</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-purple-500">Past Perfect</td>
                      <td className="p-3 font-mono text-[11px]">had + V3</td>
                      <td className="p-3 italic text-slate-400">before, after, by the time, already, when</td>
                      <td className="p-3">Action completed before another past event.<br/><span className="text-[11px] opacity-80 font-medium">"The train had left by the time I arrived."</span></td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-bold text-purple-500">Past Perfect Continuous</td>
                      <td className="p-3 font-mono text-[11px]">had + been + V-ing</td>
                      <td className="p-3 italic text-slate-400">for, since (past reference), before</td>
                      <td className="p-3">Ongoing past action preceding another past event.<br/><span className="text-[11px] opacity-80 font-medium">"He had been working for 10 hours."</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-blue-500">Simple Future</td>
                      <td className="p-3 font-mono text-[11px]">will + V (base)</td>
                      <td className="p-3 italic text-slate-400">tomorrow, next week, soon, in future</td>
                      <td className="p-3">Spontaneous decisions, predictions, promises.<br/><span className="text-[11px] opacity-80 font-medium">"I will assist you with the report."</span></td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-bold text-blue-500">Be Going To</td>
                      <td className="p-3 font-mono text-[11px]">am/is/are + going to + V</td>
                      <td className="p-3 italic text-slate-400">tonight, this weekend, planned soon</td>
                      <td className="p-3">Prior plans, intentions, predictions with evidence.<br/><span className="text-[11px] opacity-80 font-medium">"Look at those clouds; it is going to rain."</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-rose-500">Future Continuous</td>
                      <td className="p-3 font-mono text-[11px]">will + be + V-ing</td>
                      <td className="p-3 italic text-slate-400">this time tomorrow, in two hours</td>
                      <td className="p-3">Action in progress at a specific future time.<br/><span className="text-[11px] opacity-80 font-medium">"This time next week, I will be taking my exam."</span></td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-bold text-rose-500">Future Perfect</td>
                      <td className="p-3 font-mono text-[11px]">will + have + V3</td>
                      <td className="p-3 italic text-slate-400">by tomorrow, by the end of the month</td>
                      <td className="p-3">Action that will be completed before a future time point.<br/><span className="text-[11px] opacity-80 font-medium">"By Friday, she will have completed the project."</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {renderSolvedBox(
                'SOLVED EXAMPLE – VERB TENSES',
                'Choose the correct tense: "He ________ for this organization since 2015."',
                [
                  { label: 'A', text: 'worked' },
                  { label: 'B', text: 'has worked' },
                  { label: 'C', text: 'had worked' }
                ],
                'B (has worked)',
                'Present Perfect is mandatory when an action started in the past continues to the present with since + starting point.'
              )}
            </div>
          </section>

          {/* 1.3 Modal Verbs & Modal Perfect (Page 5 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(5)}

            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold border-b border-inherit pb-2">
                1.3 Modal Verbs & Modal Perfect Forms
              </h3>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                Modal auxiliary verbs express nuance such as ability, permission, obligation, possibility, and advice.
              </p>

              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className={tableHeaderBg}>
                      <th className="p-3 font-bold w-1/4">Modal Verb</th>
                      <th className="p-3 font-bold w-1/3">Primary Functions</th>
                      <th className="p-3 font-bold">Illustrative Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    <tr><td className="p-3 font-bold text-blue-500">can</td><td className="p-3">Present ability, informal permission, general possibility</td><td className="p-3 italic">"She can speak four languages fluently."</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-bold text-blue-500">could</td><td className="p-3">Past ability, polite request, tentative possibility</td><td className="p-3 italic">"Could you please forward the financial statement?"</td></tr>
                    <tr><td className="p-3 font-bold text-rose-500">must</td><td className="p-3">Strong internal obligation, logical certainty / deduction</td><td className="p-3 italic">"You must wear protective gear." / "He must be at work; his car is outside."</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-bold text-rose-500">have to / need to</td><td className="p-3">External obligation (rules/laws), necessity</td><td className="p-3 italic">"We have to submit the tax returns by midnight."</td></tr>
                    <tr><td className="p-3 font-bold text-emerald-500">should / ought to</td><td className="p-3">Advice, recommendation, expectation</td><td className="p-3 italic">"You should review the contract terms carefully."</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-bold text-amber-500">may / might</td><td className="p-3">Formal permission (may), possibility (may=50%, might=30%)</td><td className="p-3 italic">"The proposal may be approved next week."</td></tr>
                    <tr><td className="p-3 font-bold text-slate-400">used to</td><td className="p-3">Past habit or state that is no longer true</td><td className="p-3 italic">"The firm used to operate from a smaller office."</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-3 space-y-3">
                <h4 className="text-sm font-bold text-emerald-500">Modal Perfect Structure (Modal + have + V3)</h4>
                <div className="overflow-x-auto rounded-xl border border-inherit">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className={tableHeaderBg}>
                        <th className="p-3 font-bold w-1/4">Modal Perfect Form</th>
                        <th className="p-3 font-bold w-1/3">Meaning / Usage</th>
                        <th className="p-3 font-bold">Example</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-inherit">
                      <tr><td className="p-3 font-mono font-bold text-emerald-500">must have + V3</td><td className="p-3">Certain logical deduction about a past event</td><td className="p-3 italic">"She must have left early; her desk is clear."</td></tr>
                      <tr className={tableAltRowBg}><td className="p-3 font-mono font-bold text-rose-500">can't have + V3</td><td className="p-3">Logical impossibility about a past event</td><td className="p-3 italic">"He can't have failed; he scored 98%."</td></tr>
                      <tr><td className="p-3 font-mono font-bold text-amber-500">might / may have + V3</td><td className="p-3">Uncertain past possibility</td><td className="p-3 italic">"They might have missed the flight connection."</td></tr>
                      <tr className={tableAltRowBg}><td className="p-3 font-mono font-bold text-cyan-500">should have + V3</td><td className="p-3">Past regret or unfulfilled obligation / advice</td><td className="p-3 italic">"You should have informed the team earlier."</td></tr>
                      <tr><td className="p-3 font-mono font-bold text-blue-500">could have + V3</td><td className="p-3">Past ability or unrealized possibility</td><td className="p-3 italic">"He could have won the award if he had applied."</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {renderSolvedBox(
                'SOLVED EXAMPLE – MODAL PERFECT',
                'Complete the sentence: "She ________ been at the party yesterday because she was abroad."',
                [
                  { label: 'A', text: "can't have" },
                  { label: 'B', text: "shouldn't have" },
                  { label: 'C', text: 'might have' }
                ],
                "A (can't have)",
                "Can't have + V3 expresses logical impossibility regarding a past situation."
              )}
            </div>
          </section>

          {/* 1.4 Conditionals & 1.5 Passive Voice (Page 6 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(6)}

            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold border-b border-inherit pb-2">
                1.4 Conditionals & Wish Structures
              </h3>

              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className={tableHeaderBg}>
                      <th className="p-3 font-bold w-1/4">Type</th>
                      <th className="p-3 font-bold w-1/3">Grammatical Structure</th>
                      <th className="p-3 font-bold">Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    <tr><td className="p-3 font-bold">Zero Conditional</td><td className="p-3 font-mono text-[11px]">If + present simple, present simple</td><td className="p-3 italic">"If you heat ice, it melts." (Scientific fact/truth)</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-bold">First Conditional</td><td className="p-3 font-mono text-[11px]">If + present simple, will + base verb</td><td className="p-3 italic">"If you study diligently, you will pass the exam."</td></tr>
                    <tr><td className="p-3 font-bold">Second Conditional</td><td className="p-3 font-mono text-[11px]">If + past simple, would + base verb</td><td className="p-3 italic">"If I had more time, I would learn Spanish." (Unreal present)</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-bold">Third Conditional</td><td className="p-3 font-mono text-[11px]">If + past perfect, would have + V3</td><td className="p-3 italic">"If they had left earlier, they wouldn't have missed the flight."</td></tr>
                    <tr><td className="p-3 font-bold">Mixed Conditional (Past-Present)</td><td className="p-3 font-mono text-[11px]">If + past perfect, would + base verb</td><td className="p-3 italic">"If I had taken that job, I would be living in London now."</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-bold">Unless / Provided that</td><td className="p-3 font-mono text-[11px]">Unless = If not; Provided that = On condition that</td><td className="p-3 italic">"Unless you register now, you won't get a seat."</td></tr>
                    <tr><td className="p-3 font-bold">Wish / If Only</td><td className="p-3 font-mono text-[11px]">Wish + Past Simple (Present regret)<br/>Wish + Past Perfect (Past regret)</td><td className="p-3 italic">"I wish I knew the answer." (Present)<br/>"I wish I had studied harder." (Past)</td></tr>
                  </tbody>
                </table>
              </div>

              {renderSolvedBox(
                'SOLVED EXAMPLE – CONDITIONALS',
                'Choose the correct option: "If water ________ to 0°C, it freezes."',
                [
                  { label: 'A', text: 'cools' },
                  { label: 'B', text: 'cooled' },
                  { label: 'C', text: 'has cooled' }
                ],
                'A (cools)',
                'Zero conditional for universal scientific facts requires Present Simple in both clauses.'
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-inherit">
              <h3 className="text-base sm:text-lg font-bold border-b border-inherit pb-2">
                1.5 Passive Voice Formations
              </h3>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                The passive voice is used when the focus is on the action or receiver, rather than the agent. Formula: <code className="font-mono bg-black/10 px-1.5 py-0.5 rounded text-emerald-500 font-bold">be (in target tense) + past participle (V3)</code>.
              </p>

              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className={tableHeaderBg}>
                      <th className="p-3 font-bold w-1/4">Tense</th>
                      <th className="p-3 font-bold">Active Voice</th>
                      <th className="p-3 font-bold">Passive Voice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    <tr><td className="p-3 font-semibold">Simple Present</td><td className="p-3 italic">"They update the records daily."</td><td className="p-3 font-bold text-emerald-500">"The records are updated daily."</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-semibold">Present Continuous</td><td className="p-3 italic">"The firm is preparing the report."</td><td className="p-3 font-bold text-emerald-500">"The report is being prepared."</td></tr>
                    <tr><td className="p-3 font-semibold">Simple Past</td><td className="p-3 italic">"The auditor found an error."</td><td className="p-3 font-bold text-cyan-500">"An error was found by the auditor."</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-semibold">Present Perfect</td><td className="p-3 italic">"They have cancelled the meeting."</td><td className="p-3 font-bold text-amber-500">"The meeting has been cancelled."</td></tr>
                    <tr><td className="p-3 font-semibold">Future Simple</td><td className="p-3 italic">"They will announce the decision."</td><td className="p-3 font-bold text-blue-500">"The decision will be announced."</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-semibold">Modal Verb</td><td className="p-3 italic">"You must complete the form."</td><td className="p-3 font-bold text-rose-500">"The form must be completed."</td></tr>
                  </tbody>
                </table>
              </div>

              {renderSolvedBox(
                'SOLVED EXAMPLE – PASSIVE VOICE',
                'Convert to passive: "The board will announce the final decision tomorrow."',
                undefined,
                '"The final decision will be announced by the board tomorrow."'
              )}
            </div>
          </section>

          {/* 1.6 Reported Speech, 1.7 Relative Clauses, 1.8 Articles, 1.9 Gerunds, 1.10 Comparatives (Pages 7 & 8) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(7)}

            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold border-b border-inherit pb-2">
                1.6 Reported Speech – Direct to Indirect Rules
              </h3>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                When reporting direct statements, tenses typically shift one step back into the past (backshifting), and time/place adverbs adjust accordingly.
              </p>

              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className={tableHeaderBg}>
                      <th className="p-3 font-bold w-1/3">Direct Speech Tense</th>
                      <th className="p-3 font-bold w-1/3">Reported Speech Tense</th>
                      <th className="p-3 font-bold">Time / Place Shifts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    <tr><td className="p-3">Present Simple ("I work")</td><td className="p-3 font-bold text-emerald-500">Past Simple ("She said she worked")</td><td className="p-3 font-mono text-[11px]">now → then / at that moment</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3">Present Continuous ("I am working")</td><td className="p-3 font-bold text-emerald-500">Past Continuous ("He said he was working")</td><td className="p-3 font-mono text-[11px]">today → that day</td></tr>
                    <tr><td className="p-3">Simple Past / Present Perfect</td><td className="p-3 font-bold text-cyan-500">Past Perfect ("They said they had finished")</td><td className="p-3 font-mono text-[11px]">tomorrow → the following day</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3">Will → Would</td><td className="p-3 font-bold text-amber-500">Can → Could</td><td className="p-3 font-mono text-[11px]">yesterday → the previous day</td></tr>
                    <tr><td className="p-3">May → Might</td><td className="p-3 font-bold text-rose-500">Must → Had to</td><td className="p-3 font-mono text-[11px]">here/this → there/that</td></tr>
                  </tbody>
                </table>
              </div>

              {renderSolvedBox(
                'SOLVED EXAMPLE – REPORTED SPEECH',
                'Convert to reported speech: "Where did you submit the report?" he asked me.',
                undefined,
                'He asked me where I had submitted the report.',
                'Wh-question maintains normal subject-verb order, and Simple Past backshifts to Past Perfect.'
              )}
            </div>

            {/* Relative Clauses, Articles, Gerunds */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-inherit">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-emerald-500 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4" /> 1.7 Relative Clauses
                </h4>
                <ul className="text-xs space-y-2 leading-relaxed">
                  <li><strong>• Defining Relative Clauses:</strong> Provide essential information (no commas). <em>"The candidate who scored highest was selected."</em></li>
                  <li><strong>• Non-Defining Relative Clauses:</strong> Provide extra information (separated by commas; cannot use 'that'). <em>"London, which is the capital of the UK, is a major financial hub."</em></li>
                  <li><strong>• Relative Pronouns:</strong> <code className="font-mono bg-black/10 px-1 py-0.5 rounded">who</code> (people), <code className="font-mono bg-black/10 px-1 py-0.5 rounded">which</code> (things), <code className="font-mono bg-black/10 px-1 py-0.5 rounded">that</code> (people/things - defining only), <code className="font-mono bg-black/10 px-1 py-0.5 rounded">whose</code> (possession), <code className="font-mono bg-black/10 px-1 py-0.5 rounded">where</code> (places), <code className="font-mono bg-black/10 px-1 py-0.5 rounded">when</code> (time).</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-cyan-500 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4" /> 1.8 Articles (a / an / the / zero)
                </h4>
                <ul className="text-xs space-y-2 leading-relaxed">
                  <li><strong>• A / An (Indefinite):</strong> Singular countable nouns mentioned for first time. Use <em>a</em> before consonant sounds (<em>a European, a university</em>), <em>an</em> before vowel sounds (<em>an hour, an MBA</em>).</li>
                  <li><strong>• The (Definite):</strong> Specific nouns, superlatives, unique items (<em>the sun</em>), ordinal numbers, mountain ranges (<em>the Alps</em>), rivers (<em>the Nile</em>), and plural country names (<em>the UK, the USA</em>).</li>
                  <li><strong>• Zero Article:</strong> Plural/uncountable nouns in general sense (<em>"Coffee is popular"</em>), single mountains (<em>Mount Everest</em>), languages, and sports.</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-inherit">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-500 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4" /> 1.9 Gerunds and Infinitives
                </h4>
                <ul className="text-xs space-y-2 leading-relaxed">
                  <li><strong>• Verbs + Gerund (-ing):</strong> enjoy, finish, avoid, suggest, consider, postpone, admit, risk, mind, deny.</li>
                  <li><strong>• Verbs + Infinitive (to+V):</strong> decide, hope, plan, manage, afford, offer, refuse, agree, fail, tend.</li>
                  <li><strong>• Verbs changing meaning:</strong>
                    <div className="pl-2 pt-1 italic opacity-90">
                      ◦ <em>stop smoking</em> (cease action) vs <em>stop to smoke</em> (pause in order to smoke)<br/>
                      ◦ <em>remember posting</em> (past memory) vs <em>remember to post</em> (future duty)
                    </div>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-rose-500 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4" /> 1.10 Comparatives and Superlatives
                </h4>
                <ul className="text-xs space-y-2 leading-relaxed">
                  <li><strong>• Short adjectives:</strong> add -er/-est (<em>fast → faster → fastest</em>).</li>
                  <li><strong>• Long adjectives (2+ syllables):</strong> more / most (<em>efficient → more efficient → most efficient</em>).</li>
                  <li><strong>• Irregulars:</strong> good → better → best | bad → worse → worst | far → further → furthest.</li>
                  <li><strong>• Special structures:</strong> <em>As...as</em> (equality); <em>The more... the more</em> (parallel increase: <em>"The more you practice, the better you become"</em>).</li>
                </ul>
              </div>
            </div>
          </section>

          {/* C1 Specialized Rules: Subjunctive & Inversion (Pages 27-31 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(8, 'Aptis Advanced & C1 Tested Grammar Rules')}

            <div className="p-4 rounded-2xl bg-[#14284b] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  C1 ADVANCED GRAMMAR
                </span>
                <h3 className="text-lg font-bold text-white font-display">1. Subjunctive & 2. Inversion Rules</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subjunctive */}
              <div className="p-5 rounded-2xl border border-inherit space-y-3">
                <h4 className="text-sm font-bold text-emerald-500">1. Subjunctive (Very Common at C1)</h4>
                <p className="text-xs opacity-90 leading-relaxed">
                  Refers to a verb form or mood used to express doubt, possibility, necessity, importance, wishes, or hypothetical situations.
                </p>
                <div className={`p-3 rounded-xl ${greenBoxBg} text-xs font-semibold`}>
                  💡 Rule: After expressions like <em>It is essential/important/vital/necessary that...</em> or <em>The manager requested/suggested that...</em>, use the <strong>BASE FORM of the verb</strong> (without to, -s, -ed, am/is/are).
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded-lg bg-black/10 font-mono text-[11px]">
                    ✔ It is essential that every applicant <strong>submit</strong> the form on time. (NOT submits)
                  </div>
                  <div className="p-2 rounded-lg bg-black/10 font-mono text-[11px]">
                    ✔ It is necessary that the report <strong>be</strong> completed by Friday.
                  </div>
                  <div className="p-2 rounded-lg bg-black/10 font-mono text-[11px]">
                    ✔ The committee suggested that more funds <strong>be allocated</strong> to the project.
                  </div>
                </div>
              </div>

              {/* Inversion */}
              <div className="p-5 rounded-2xl border border-inherit space-y-3">
                <h4 className="text-sm font-bold text-cyan-500">2. Inversion (Negative Expressions)</h4>
                <p className="text-xs opacity-90 leading-relaxed">
                  After negative or restrictive expressions, the auxiliary (helping verb) comes <strong>before the subject</strong>.
                </p>
                <div className={`p-3 rounded-xl ${solvedBoxBg} text-xs font-semibold`}>
                  💡 Common Triggers: <em>Rarely, Hardly, Not only, No sooner, Seldom</em><br/>
                  Formula: <strong>No sooner + had + S + V3 + than</strong> | <strong>Hardly + had + S + V3 + when</strong>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded-lg bg-black/10 font-mono text-[11px]">
                    ✔ <strong>Rarely has he seen</strong> such a case. (NOT Rarely he has seen)
                  </div>
                  <div className="p-2 rounded-lg bg-black/10 font-mono text-[11px]">
                    ✔ <strong>Not only did he arrive</strong> late, but he also forgot his notes.
                  </div>
                  <div className="p-2 rounded-lg bg-black/10 font-mono text-[11px]">
                    ✔ <strong>No sooner had she arrived than</strong> the meeting started.
                  </div>
                </div>
              </div>
            </div>

            {/* It's High Time & Wish */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-inherit">
              <div className="p-4 rounded-xl border border-inherit text-xs space-y-2">
                <span className="font-bold text-amber-500">It's High Time + Past Simple</span>
                <p className="opacity-90">Use the past simple after "It's high time" (NOT present tense).</p>
                <div className="font-mono text-[11px] p-2 bg-black/10 rounded">
                  ✔ <em>It's high time you <strong>took</strong> responsibility.</em><br/>
                  ✔ <em>It's high time we <strong>addressed</strong> this issue.</em>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-inherit text-xs space-y-2">
                <span className="font-bold text-purple-500">Subject-Verb Agreement Pitfalls</span>
                <p className="opacity-90">Always singular: <em>each, every, either, neither, anyone, everyone, the number of</em>.</p>
                <div className="font-mono text-[11px] p-2 bg-black/10 rounded">
                  ✔ <em>Each of the students <strong>has</strong> submitted their work.</em><br/>
                  ✔ <em>Neither of the students <strong>is</strong> absent.</em>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* =========================================================
          CHAPTER 2: VOCABULARY MASTERY
          ========================================================= */}
      {chapter.number === 2 && (
        <div className="space-y-10">
          
          {/* Chapter 2 Overview & Roadmap Table (Page 8 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(8)}

            <div className="p-4 rounded-2xl bg-[#14284b] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  CHAPTER 2: VOCABULARY MASTERY
                </span>
                <h3 className="text-lg font-bold text-white font-display">Core Theoretical Notes & Solved Examples</h3>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold opacity-90">Chapter 2 Overview & Roadmap</h4>
              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className={tableHeaderBg}>
                      <th className="p-3 font-bold w-1/4">Topic</th>
                      <th className="p-3 font-bold">Core Description & Focus</th>
                      <th className="p-3 font-bold text-center w-20">Section</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    <tr className="hover:bg-black/5">
                      <td className="p-3 font-semibold">2.1 Word Formation</td>
                      <td className="p-3">Prefixes, suffixes, root transformation rules, and structured word family derivation charts.</td>
                      <td className="p-3 text-center font-mono">Sec 2.1</td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-semibold">2.2 Topic Vocabulary</td>
                      <td className="p-3">700+ curated high-yield vocabulary terms across 8 major professional and global domains.</td>
                      <td className="p-3 text-center font-mono">Sec 2.2</td>
                    </tr>
                    <tr className="hover:bg-black/5">
                      <td className="p-3 font-semibold">2.3 Collocations</td>
                      <td className="p-3">Natural verb-noun pairings (Make vs Do, Take vs Get, Have vs Give) and key Adjective-Noun collocations.</td>
                      <td className="p-3 text-center font-mono">Sec 2.3</td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-semibold">2.4 Synonyms & Antonyms</td>
                      <td className="p-3">High-yield academic and professional word equivalence and contrast pairs.</td>
                      <td className="p-3 text-center font-mono">Sec 2.4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Solved Examples */}
            {renderSolvedBox(
              'CHAPTER 2 MAIN TOPIC SOLVED EXAMPLE',
              'Form the correct adjective form of the noun \'economy\' to fit the context: "Driving a hybrid vehicle is more ________ than driving a petrol truck."',
              undefined,
              'economical',
              '\'Economic\' relates to the economy as a whole, whereas \'economical\' means cost-effective or saving money.'
            )}

            {renderSolvedBox(
              'CHAPTER 2 STANDARD PRACTICE QUESTION',
              'Select the correct collocation verb: "The research team ________ a thorough investigation into the market trends."',
              [
                { label: 'A', text: 'made' },
                { label: 'B', text: 'did' },
                { label: 'C', text: 'took' }
              ],
              'B (did)',
              'In natural English collocations, one does research/investigation (not makes research).'
            )}
          </section>

          {/* 2.1 Word Formation & Word Family Matrix (Page 9 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(9)}

            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold border-b border-inherit pb-2">
                2.1 Word Formation – Prefixes, Suffixes & Word Families
              </h3>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                Word formation involves modifying base roots using prefixes (which alter meaning) and suffixes (which alter word class).
              </p>

              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className={tableHeaderBg}>
                      <th className="p-3 font-bold w-1/4">Prefix / Suffix</th>
                      <th className="p-3 font-bold w-1/3">Meaning / Function</th>
                      <th className="p-3 font-bold">Examples</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    <tr><td className="p-3 font-bold text-emerald-500">un- / dis- / in-</td><td className="p-3">Not, opposite of</td><td className="p-3 font-mono text-[11px]">unclear, disagree, incomplete, irresponsible, illegal</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-bold text-emerald-500">re- / pre-</td><td className="p-3">Again / Before</td><td className="p-3 font-mono text-[11px]">rebuild, review, preview, precaution, predict</td></tr>
                    <tr><td className="p-3 font-bold text-amber-500">over- / under-</td><td className="p-3">Too much / Too little</td><td className="p-3 font-mono text-[11px]">overestimate, overcrowded, underestimate, underpaid</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-bold text-cyan-500">-tion / -ment (Noun)</td><td className="p-3">Action, state, or result</td><td className="p-3 font-mono text-[11px]">education, decision, development, achievement</td></tr>
                    <tr><td className="p-3 font-bold text-blue-500">-ful / -less (Adj)</td><td className="p-3">With / Without</td><td className="p-3 font-mono text-[11px]">careful, powerful, careless, hopeless, harmless</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-bold text-rose-500">-ify / -ize (Verb)</td><td className="p-3">To make or become</td><td className="p-3 font-mono text-[11px]">simplify, modernize, organize, clarify</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-3 space-y-3">
                <h4 className="text-sm font-bold text-emerald-500">Selected Word Family Matrix</h4>
                <div className="overflow-x-auto rounded-xl border border-inherit">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className={tableHeaderBg}>
                        <th className="p-3 font-bold w-1/4">Noun</th>
                        <th className="p-3 font-bold w-1/4">Verb</th>
                        <th className="p-3 font-bold w-1/4">Adjective</th>
                        <th className="p-3 font-bold">Adverb</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-inherit">
                      <tr><td className="p-3 font-semibold">Success</td><td className="p-3">Succeed</td><td className="p-3">Successful</td><td className="p-3 font-mono text-[11px]">Successfully</td></tr>
                      <tr className={tableAltRowBg}><td className="p-3 font-semibold">Economy</td><td className="p-3">Economize</td><td className="p-3">Economic / Economical</td><td className="p-3 font-mono text-[11px]">Economically</td></tr>
                      <tr><td className="p-3 font-semibold">Decision</td><td className="p-3">Decide</td><td className="p-3">Decisive</td><td className="p-3 font-mono text-[11px]">Decisively</td></tr>
                      <tr className={tableAltRowBg}><td className="p-3 font-semibold">Responsibility</td><td className="p-3 text-slate-500">—</td><td className="p-3">Responsible</td><td className="p-3 font-mono text-[11px]">Responsibly</td></tr>
                      <tr><td className="p-3 font-semibold">Significance</td><td className="p-3">Signify</td><td className="p-3">Significant</td><td className="p-3 font-mono text-[11px]">Significantly</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 2.2 Topic Vocabulary & 2.3 Collocations (Page 10 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(10)}

            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold border-b border-inherit pb-2">
                2.2 Topic Vocabulary – Key Professional Domains
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Work & Careers */}
                <div className="p-4 rounded-xl border border-inherit space-y-2">
                  <span className="font-bold text-emerald-500 text-xs uppercase tracking-wider block">1. Work & Careers</span>
                  <div className="space-y-1.5 text-xs">
                    <div><strong>Redundant:</strong> No longer needed; job role eliminated. <em className="opacity-80 block text-[11px]">"He was made redundant after the merger."</em></div>
                    <div><strong>Appraisal:</strong> Formal evaluation of employee performance. <em className="opacity-80 block text-[11px]">"Annual performance appraisals start next month."</em></div>
                    <div><strong>Initiative:</strong> Ability to assess and take action independently. <em className="opacity-80 block text-[11px]">"She showed great initiative in solving the issue."</em></div>
                    <div><strong>Resign / Dismiss:</strong> Voluntarily quit / Officially terminate. <em className="opacity-80 block text-[11px]">"He resigned to pursue further studies."</em></div>
                  </div>
                </div>

                {/* 2. Environment & Ecology */}
                <div className="p-4 rounded-xl border border-inherit space-y-2">
                  <span className="font-bold text-cyan-500 text-xs uppercase tracking-wider block">2. Environment & Ecology</span>
                  <div className="space-y-1.5 text-xs">
                    <div><strong>Biodiversity:</strong> Variety of plant and animal life in a habitat. <em className="opacity-80 block text-[11px]">"Deforestation threatens global biodiversity."</em></div>
                    <div><strong>Sustainable:</strong> Meeting present needs without depleting future resources. <em className="opacity-80 block text-[11px]">"The firm adopted sustainable energy practices."</em></div>
                    <div><strong>Afforestation:</strong> Planting trees on land previously not forested. <em className="opacity-80 block text-[11px]">"Government campaigns focus on afforestation."</em></div>
                  </div>
                </div>

                {/* 3. Technology & Innovation */}
                <div className="p-4 rounded-xl border border-inherit space-y-2">
                  <span className="font-bold text-purple-500 text-xs uppercase tracking-wider block">3. Technology & Innovation</span>
                  <div className="space-y-1.5 text-xs">
                    <div><strong>Automation:</strong> Use of machinery/software to perform tasks automatically. <em className="opacity-80 block text-[11px]">"Automation has increased manufacturing speed."</em></div>
                    <div><strong>Obsolete:</strong> Outdated; no longer in use or useful. <em className="opacity-80 block text-[11px]">"Legacy software becomes obsolete rapidly."</em></div>
                    <div><strong>Encryption:</strong> Encoding data to prevent unauthorized access. <em className="opacity-80 block text-[11px]">"End-to-end encryption protects user privacy."</em></div>
                  </div>
                </div>

                {/* 4. Economy & Finance */}
                <div className="p-4 rounded-xl border border-inherit space-y-2">
                  <span className="font-bold text-amber-500 text-xs uppercase tracking-wider block">4. Economy & Finance</span>
                  <div className="space-y-1.5 text-xs">
                    <div><strong>Inflation / Deficit:</strong> Rise in price levels / Excess of expenditure over income. <em className="opacity-80 block text-[11px]">"High inflation reduces consumer purchasing power."</em></div>
                    <div><strong>Subsidy:</strong> Government financial aid to support an industry. <em className="opacity-80 block text-[11px]">"Agricultural subsidies keep food prices stable."</em></div>
                    <div><strong>Bankruptcy:</strong> Legal status of inability to repay debts. <em className="opacity-80 block text-[11px]">"The firm filed for bankruptcy protection."</em></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.3 High-Yield Collocations */}
            <div className="space-y-4 pt-4 border-t border-inherit">
              <h3 className="text-base sm:text-lg font-bold border-b border-inherit pb-2">
                2.3 High-Yield Collocations
              </h3>

              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className={tableHeaderBg}>
                      <th className="p-3 font-bold w-1/4">Base Verb</th>
                      <th className="p-3 font-bold">Correct Fixed Collocations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    <tr><td className="p-3 font-mono font-bold text-emerald-500">MAKE</td><td className="p-3">a decision, a mistake, progress, an effort, a profit, a complaint, an exception, a phone call</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-mono font-bold text-blue-500">DO</td><td className="p-3">research, homework, business, a favour, damage, exercise, your best, harm</td></tr>
                    <tr><td className="p-3 font-mono font-bold text-amber-500">TAKE</td><td className="p-3">action, responsibility, part in, a risk, notes, advantage of, into account, place</td></tr>
                    <tr className={tableAltRowBg}><td className="p-3 font-mono font-bold text-purple-500">GET</td><td className="p-3">permission, promoted, fired, lost, in touch with, rid of, used to</td></tr>
                    <tr><td className="p-3 font-mono font-bold text-rose-500">GIVE</td><td className="p-3">advice, a presentation, feedback, permission, a speech, priority to</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Confused Word Pairs & Smart Memory Tricks */}
            <div className="p-5 rounded-2xl border border-inherit space-y-4">
              <h4 className="text-sm font-bold text-emerald-500">Frequently Tested Word Pairs & Smart Tricks</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-black/10 rounded-xl"><strong>1. Affect vs Effect:</strong> Affect (verb - to influence) | Effect (noun - result).</div>
                <div className="p-3 bg-black/10 rounded-xl"><strong>2. Advice vs Advise:</strong> Advice (noun - suggestion) | Advise (verb - to suggest).</div>
                <div className="p-3 bg-black/10 rounded-xl"><strong>3. Economic vs Economical:</strong> Economic (related to economy) | Economical (cost-saving).</div>
                <div className="p-3 bg-black/10 rounded-xl"><strong>4. Stationary vs Stationery:</strong> Stationary (not moving) | Stationery (paper/pens).</div>
                <div className="p-3 bg-black/10 rounded-xl"><strong>5. Lose vs Loose:</strong> Lose (misplace) | Loose (not tight).</div>
                <div className="p-3 bg-black/10 rounded-xl"><strong>6. Later vs Latter:</strong> Later (time) | Latter (second of two).</div>
              </div>

              {renderTipBox(
                'SMART TRICKS FOR EXAM MEMORY',
                '✔ Advice = Ice (noun) | ✔ Affect = Action (verb) | ✔ Stationery = Contains "er" like "paper" | ✔ Lose = Lost (one \'o\')',
                'green'
              )}
            </div>
          </section>

        </div>
      )}

      {/* =========================================================
          CHAPTER 3: READING SKILLS & STRATEGIES
          ========================================================= */}
      {chapter.number === 3 && (
        <div className="space-y-10">
          
          {/* Chapter 3 Overview & Roadmap Table (Page 11 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(11)}

            <div className="p-4 rounded-2xl bg-[#14284b] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  CHAPTER 3: READING SKILLS & STRATEGIES
                </span>
                <h3 className="text-lg font-bold text-white font-display">Core Theoretical Notes & Solved Examples</h3>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold opacity-90">Chapter 3 Overview & Roadmap</h4>
              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className={tableHeaderBg}>
                      <th className="p-3 font-bold w-1/4">Topic</th>
                      <th className="p-3 font-bold">Core Description & Focus</th>
                      <th className="p-3 font-bold text-center w-20">Section</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    <tr className="hover:bg-black/5">
                      <td className="p-3 font-semibold">3.1 Part 1: Sentence Comp.</td>
                      <td className="p-3">5-step decoding strategy for independent sentence completion with lexical precision.</td>
                      <td className="p-3 text-center font-mono">Sec 3.1</td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-semibold">3.2 Part 2: Text Cohesion</td>
                      <td className="p-3">Cohesion marker analysis (pronouns, sequence, contrast, cause) for paragraph ordering.</td>
                      <td className="p-3 text-center font-mono">Sec 3.2</td>
                    </tr>
                    <tr className="hover:bg-black/5">
                      <td className="p-3 font-semibold">3.3 Part 3: Opinion Matching</td>
                      <td className="p-3">Paraphrase identification and multi-text viewpoint alignment across distinct perspectives.</td>
                      <td className="p-3 text-center font-mono">Sec 3.3</td>
                    </tr>
                    <tr className={tableAltRowBg}>
                      <td className="p-3 font-semibold">3.4 Part 4: Long Text & Headings</td>
                      <td className="p-3">6-step skimming/scanning strategy for main idea paragraph heading attribution.</td>
                      <td className="p-3 text-center font-mono">Sec 3.4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Solved Examples */}
            {renderSolvedBox(
              'CHAPTER 3 MAIN TOPIC SOLVED EXAMPLE',
              'Complete the sentence using cohesion clues: "The flight was ________ by two hours due to severe weather conditions."',
              [
                { label: 'A', text: 'cancelled' },
                { label: 'B', text: 'delayed' },
                { label: 'C', text: 'missed' }
              ],
              'B (delayed)',
              '\'By two hours\' indicates a postponed timeframe, which fits \'delayed\'. \'Cancelled\' implies total termination.'
            )}

            {renderSolvedBox(
              'CHAPTER 3 STANDARD PRACTICE QUESTION (Text Cohesion)',
              'Order the sentences logically:\n[1] Smart city technology transforms urban living.\n[A] However, implementation raises data privacy concerns.\n[B] These include automated traffic and energy grids.\n[C] At its core, smart cities use sensors to optimize services.',
              undefined,
              '1 → C → B → A',
              '1 gives high-level topic → C defines \'core\' operation → B elaborates on \'These\' technologies → A introduces contrast (\'However\').'
            )}
          </section>

          {/* 3.2 Part 2 – Text Cohesion Detailed Notes & Ordering Tasks (Pages 12-13 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(12, 'APTIS GENERAL | Complete Self-Study Booklet')}

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0f766e] text-white">
                <span className="text-xs font-mono font-bold uppercase">3.2 PART 2 – TEXT COHESION (2 ordering tasks, 6 sentences each)</span>
                <p className="text-xs text-teal-100 mt-1">You receive 6 mixed-up sentences. The first sentence is given. You must put the other 5 sentences in the correct logical order.</p>
              </div>

              {/* Cohesion Clues Box */}
              <div className={`p-5 rounded-2xl border-l-4 border-l-blue-600 border ${solvedBoxBg} space-y-2 text-xs`}>
                <span className="font-bold uppercase tracking-wider text-blue-600 block">■ Cohesion Clues to Look For</span>
                <ul className="space-y-1.5">
                  <li><strong>• PRONOUNS:</strong> 'he', 'she', 'it', 'they', 'this', 'these', 'the + noun' refer to something mentioned BEFORE.</li>
                  <li><strong>• SEQUENCE MARKERS:</strong> first / then / next / after that / subsequently / finally / in the end</li>
                  <li><strong>• CONTRAST MARKERS:</strong> however / but / nevertheless / on the other hand / despite this</li>
                  <li><strong>• RESULT MARKERS:</strong> therefore / as a result / consequently / because of this / so</li>
                  <li><strong>• ADDITION MARKERS:</strong> moreover / furthermore / in addition / also / what is more</li>
                  <li><strong>• TIME MARKERS:</strong> at first / in the beginning / over time / eventually / nowadays</li>
                  <li><strong>• GENERAL → SPECIFIC:</strong> texts often move from a broad statement to specific examples.</li>
                  <li><strong>• PROBLEM → SOLUTION:</strong> look for a problem sentence followed by a solution sentence.</li>
                </ul>
              </div>

              {/* Practice Task 1: Social Media */}
              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-[#0f766e] text-white text-xs font-bold uppercase">
                  PRACTICE TASK 1 – Ordering (Social Media)
                </div>
                <div className="overflow-x-auto rounded-xl border border-inherit">
                  <table className="w-full text-xs text-left border-collapse">
                    <tbody className="divide-y divide-inherit">
                      <tr className={tableHeaderBg}><td className="p-2.5 font-bold w-10 text-center">1</td><td className="p-2.5">The role of social media in modern communication cannot be underestimated.</td></tr>
                      <tr><td className="p-2.5 font-bold text-center">A</td><td className="p-2.5">However, not everyone views this change positively.</td></tr>
                      <tr className={tableAltRowBg}><td className="p-2.5 font-bold text-center">B</td><td className="p-2.5">Over time, platforms such as Facebook, Twitter, and Instagram attracted billions of users worldwide.</td></tr>
                      <tr><td className="p-2.5 font-bold text-center">C</td><td className="p-2.5">Despite these concerns, social media remains an integral part of daily life for most people.</td></tr>
                      <tr className={tableAltRowBg}><td className="p-2.5 font-bold text-center">D</td><td className="p-2.5">What began as simple websites for sharing updates among friends quickly evolved into powerful tools for news, marketing, and political debate.</td></tr>
                      <tr><td className="p-2.5 font-bold text-center">E</td><td className="p-2.5">Critics argue that it has shortened attention spans, promoted misinformation, and contributed to rising levels of anxiety.</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className={`p-4 rounded-xl border-l-4 border-l-emerald-500 ${greenBoxBg} text-xs space-y-1`}>
                  <span className="font-bold uppercase text-emerald-600 block">■ Answer & Explanation</span>
                  <p className="font-bold">Correct order: 1 → D → B → A → E → C</p>
                  <p className="opacity-90">Logic: 1 (general claim) → D (what social media started as / how it grew) → B (global growth) → A (transition: not everyone agrees) → E (specific criticisms) → C (conclusion: despite issues, still important)</p>
                </div>
              </div>

              {/* Practice Task 2: Volunteering */}
              <div className="space-y-3 pt-4 border-t border-inherit">
                <div className="p-3 rounded-xl bg-[#0f766e] text-white text-xs font-bold uppercase">
                  PRACTICE TASK 2 – Ordering (Volunteering)
                </div>
                <div className="overflow-x-auto rounded-xl border border-inherit">
                  <table className="w-full text-xs text-left border-collapse">
                    <tbody className="divide-y divide-inherit">
                      <tr className={tableHeaderBg}><td className="p-2.5 font-bold w-10 text-center">1</td><td className="p-2.5">Volunteering can be one of the most rewarding experiences a person can have.</td></tr>
                      <tr><td className="p-2.5 font-bold text-center">A</td><td className="p-2.5">In addition to the personal benefits, volunteers also contribute to addressing important social issues.</td></tr>
                      <tr className={tableAltRowBg}><td className="p-2.5 font-bold text-center">B</td><td className="p-2.5">As a result, many volunteers report feeling more confident, skilled, and connected to their communities after their experiences.</td></tr>
                      <tr><td className="p-2.5 font-bold text-center">C</td><td className="p-2.5">By giving their time and energy, volunteers help fill gaps in services that governments and businesses cannot always provide.</td></tr>
                      <tr className={tableAltRowBg}><td className="p-2.5 font-bold text-center">D</td><td className="p-2.5">Furthermore, the sense of purpose and satisfaction that comes from helping others is difficult to find elsewhere.</td></tr>
                      <tr><td className="p-2.5 font-bold text-center">E</td><td className="p-2.5">Through volunteering, individuals gain practical experience, develop new skills, and form meaningful relationships with others.</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className={`p-4 rounded-xl border-l-4 border-l-emerald-500 ${greenBoxBg} text-xs space-y-1`}>
                  <span className="font-bold uppercase text-emerald-600 block">■ Answer & Explanation</span>
                  <p className="font-bold">Correct order: 1 → E → B → D → A → C</p>
                  <p className="opacity-90">Logic: 1 (general intro) → E (benefits for the individual) → B (result for the individual) → D (further personal benefit: sense of purpose) → A (transition to wider benefits) → C (benefits for society)</p>
                </div>
              </div>

            </div>
          </section>

          {/* 3.3 Part 3 – Opinion Matching: Fast Food (Pages 14-15 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(14, 'APTIS GENERAL | Part 3 Opinion Matching')}

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0f766e] text-white">
                <span className="text-xs font-mono font-bold uppercase">3.3 PART 3 – OPINION MATCHING (4 opinions, 7 statements)</span>
                <p className="text-xs text-teal-100 mt-1">Read four short texts in which different people express their opinions on the same topic. Match each statement to the correct person.</p>
              </div>

              {/* 4 Opinions Table */}
              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <tbody className="divide-y divide-inherit">
                    <tr className="bg-blue-500/10">
                      <td className="p-3 font-bold text-blue-500 w-24 text-center">KAREN</td>
                      <td className="p-3 leading-relaxed">I understand why fast food is popular — it's quick, cheap, and convenient for people with busy lives. However, I strongly believe that consuming it regularly is a serious health risk. The high levels of fat, salt, and sugar in most fast food products contribute directly to obesity, heart disease, and diabetes. Society needs to be better educated about these risks.</td>
                    </tr>
                    <tr className="bg-amber-500/10">
                      <td className="p-3 font-bold text-amber-500 w-24 text-center">MARCUS</td>
                      <td className="p-3 leading-relaxed">Fast food has become a scapegoat for all of society's health problems. The real issue is portion control and individual responsibility. If someone chooses to eat a burger every day, that is their choice. Governments should not interfere with personal dietary decisions. Education is useful, but ultimately, people are responsible for their own health.</td>
                    </tr>
                    <tr className="bg-emerald-500/10">
                      <td className="p-3 font-bold text-emerald-500 w-24 text-center">PRIYA</td>
                      <td className="p-3 leading-relaxed">What concerns me most about fast food is not the food itself but the industry behind it. The marketing of unhealthy products directly to children is deeply unethical. Children cannot make informed decisions about nutrition, yet they are bombarded with advertisements designed to create lifelong customers. This should be regulated far more strictly.</td>
                    </tr>
                    <tr className="bg-purple-500/10">
                      <td className="p-3 font-bold text-purple-500 w-24 text-center">LEON</td>
                      <td className="p-3 leading-relaxed">I work in the food industry and I've seen real changes in recent years. Many fast food chains are now offering healthier options — salads, grilled items, and lower-calorie meals. I think critics are too negative. The industry is responding to consumer demand and health concerns. It would be unfair to dismiss all fast food companies as irresponsible.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 7 Statements Table */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider block opacity-80">Statements (Match to Karen (K), Marcus (M), Priya (P), or Leon (L)):</span>
                <div className="overflow-x-auto rounded-xl border border-inherit">
                  <table className="w-full text-xs text-left border-collapse">
                    <tbody className="divide-y divide-inherit">
                      <tr><td className="p-2.5 font-bold w-8 text-center">1.</td><td className="p-2.5">The fast food sector is making genuine efforts to offer healthier products.</td><td className="p-2.5 text-right font-mono font-bold text-emerald-500">Leon (L)</td></tr>
                      <tr className={tableAltRowBg}><td className="p-2.5 font-bold w-8 text-center">2.</td><td className="p-2.5">Repeated consumption of fast food poses a serious threat to people's health.</td><td className="p-2.5 text-right font-mono font-bold text-blue-500">Karen (K)</td></tr>
                      <tr><td className="p-2.5 font-bold w-8 text-center">3.</td><td className="p-2.5">It is wrong that fast food companies target young consumers with advertising.</td><td className="p-2.5 text-right font-mono font-bold text-emerald-500">Priya (P)</td></tr>
                      <tr className={tableAltRowBg}><td className="p-2.5 font-bold w-8 text-center">4.</td><td className="p-2.5">People should take personal responsibility for what they eat rather than blaming the industry.</td><td className="p-2.5 text-right font-mono font-bold text-amber-500">Marcus (M)</td></tr>
                      <tr><td className="p-2.5 font-bold w-8 text-center">5.</td><td className="p-2.5">Better public awareness of nutritional risks is needed.</td><td className="p-2.5 text-right font-mono font-bold text-blue-500">Karen (K)</td></tr>
                      <tr className={tableAltRowBg}><td className="p-2.5 font-bold w-8 text-center">6.</td><td className="p-2.5">The government should introduce tighter rules on how fast food is marketed to children.</td><td className="p-2.5 text-right font-mono font-bold text-emerald-500">Priya (P)</td></tr>
                      <tr><td className="p-2.5 font-bold w-8 text-center">7.</td><td className="p-2.5">The fast food sector is unfairly blamed for broader health issues in society.</td><td className="p-2.5 text-right font-mono font-bold text-amber-500">Marcus (M)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 3.4 Part 4 – Long Text & Headings: Artificial Intelligence in Education & Urban Beekeeping (Pages 16-17, 74-78) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(16, 'APTIS GENERAL | Part 4 Long Text & Headings')}

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0f766e] text-white">
                <span className="text-xs font-mono font-bold uppercase">3.4 PART 4 – LONG TEXT AND HEADINGS (~750 words, 8 headings, match 7)</span>
                <p className="text-xs text-teal-100 mt-1">Read the long article divided into 7 paragraphs. Match 7 of the headings to the paragraphs. One heading is a distractor.</p>
              </div>

              {/* 6-Step Strategy Box */}
              {renderTipBox(
                '6-STEP HEADING MATCHING STRATEGY',
                '1. Skim text quickly for general topic. • 2. Underline key nouns/verbs in all 8 headings. • 3. Find main idea for each paragraph (1st or last sentence). • 4. Match main idea to heading (look for PARAPHRASES). • 5. Distractor heading sounds relevant but doesn\'t fit. • 6. Check whole paragraph, don\'t match single isolated words.',
                'green'
              )}

              {/* Full Article 1: Artificial Intelligence in Education */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-emerald-500">Practice Text 1: Artificial Intelligence in Education</h4>
                <div className="overflow-x-auto rounded-xl border border-inherit">
                  <table className="w-full text-xs text-left border-collapse">
                    <tbody className="divide-y divide-inherit">
                      <tr><td className="p-3 font-bold w-28 align-top">Paragraph 1</td><td className="p-3">Artificial intelligence is gradually making its presence felt in schools and universities across the world. From automated marking systems and intelligent tutoring programmes to virtual assistants and adaptive learning platforms, AI technologies are increasingly being integrated into the everyday experience of both students and educators. What was once the subject of science fiction is now a practical reality in many classrooms.<br/><span className="text-emerald-500 font-bold mt-1 block">→ Matched Heading: iii. How AI is already being used in classrooms</span></td></tr>
                      <tr className={tableAltRowBg}><td className="p-3 font-bold w-28 align-top">Paragraph 2</td><td className="p-3">One of the most promising applications of AI in education is its ability to adapt to the individual needs of each learner. Unlike a single teacher managing thirty students, an AI system can simultaneously track the progress of every student, identify areas of weakness, and adjust the difficulty and content of exercises accordingly. This means that a student who struggles with fractions can receive additional support while a more advanced student is challenged with higher-level problems, all without disrupting the rest of the class.<br/><span className="text-emerald-500 font-bold mt-1 block">→ Matched Heading: ii. Personalised learning for individual students</span></td></tr>
                      <tr><td className="p-3 font-bold w-28 align-top">Paragraph 3</td><td className="p-3">Assessment is another area where AI is proving its value. Traditionally, teachers spend enormous amounts of time marking assignments, writing feedback, and recording results. AI tools can now perform these tasks in a fraction of the time, providing students with immediate, detailed feedback on their work. This not only reduces the administrative burden on teachers but also allows students to correct their mistakes quickly, which research suggests significantly improves retention and understanding.<br/><span className="text-emerald-500 font-bold mt-1 block">→ Matched Heading: vii. Improving assessment and feedback</span></td></tr>
                      <tr className={tableAltRowBg}><td className="p-3 font-bold w-28 align-top">Paragraph 4</td><td className="p-3">Despite the excitement surrounding AI in education, some educators are cautious. They argue that teaching is fundamentally a human activity that depends on empathy, emotional intelligence, and the ability to read a room. A machine, however sophisticated, cannot replace the bond that forms between a teacher and a student, nor the motivational power of genuine human encouragement. If schools over-rely on AI, they risk producing students who are technically proficient but emotionally disconnected from learning.<br/><span className="text-emerald-500 font-bold mt-1 block">→ Matched Heading: vi. The risk of reducing human connection in teaching</span></td></tr>
                      <tr><td className="p-3 font-bold w-28 align-top">Paragraph 5</td><td className="p-3">There are also important questions to be asked about equity. Not all schools have equal access to technology, and not all students have reliable internet access at home. If wealthier schools can afford cutting-edge AI tools while underfunded schools cannot, the gap in educational outcomes between privileged and disadvantaged students may actually widen. Policymakers must ensure that the introduction of AI in education does not deepen existing inequalities.<br/><span className="text-emerald-500 font-bold mt-1 block">→ Matched Heading: i. Concerns about fairness and access</span></td></tr>
                      <tr className={tableAltRowBg}><td className="p-3 font-bold w-28 align-top">Paragraph 6</td><td className="p-3">Many proponents of AI in education are keen to emphasise that the goal is not to replace teachers but to empower them. By taking over time-consuming administrative tasks, AI can free teachers to focus on what they do best: inspiring students, facilitating discussion, and providing mentorship. In this view, AI serves as a powerful assistant rather than a competitor, allowing educators to dedicate more time and energy to the interpersonal aspects of their work.<br/><span className="text-emerald-500 font-bold mt-1 block">→ Matched Heading: viii. Support for teachers, not replacement</span></td></tr>
                      <tr><td className="p-3 font-bold w-28 align-top">Paragraph 7</td><td className="p-3">Perhaps most importantly, AI literacy is fast becoming an essential skill for the modern workforce. Students who leave school without a basic understanding of how artificial intelligence works will be at a significant disadvantage in an increasingly automated job market. Schools therefore have a responsibility not only to use AI as a teaching tool but to teach about AI itself, ensuring that graduates are prepared to navigate and contribute to a world shaped by these technologies.<br/><span className="text-emerald-500 font-bold mt-1 block">→ Matched Heading: v. Preparing students for an AI-driven world</span></td></tr>
                    </tbody>
                  </table>
                </div>

                <div className={`p-4 rounded-xl border-l-4 border-l-rose-500 bg-rose-950/20 text-xs text-rose-200`}>
                  <strong>Distractor Heading (NOT used):</strong> iv — <em>'The history of technology in education'</em> is not discussed in any paragraph.
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* =========================================================
          CHAPTER 4: WRITING SKILLS & MODELS
          ========================================================= */}
      {chapter.number === 4 && (
        <div className="space-y-10">
          
          {/* Chapter 4 Overview & Roadmap Table (Page 12 & 18 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(18, 'APTIS GENERAL | Complete Self-Study Booklet')}

            <div className="p-6 rounded-2xl bg-[#c2410c] text-white flex items-center justify-between shadow-md">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-black/40 text-white border border-white/20">
                  4 PARTS | MODELS | PHRASES
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display">WRITING SKILLS</h3>
                <p className="text-xs text-orange-100">
                  The Writing test lasts 50 minutes and is marked by a human examiner. You are assessed on task completion, grammar, vocabulary range, spelling, punctuation, register, and coherence.
                </p>
              </div>
            </div>

            {/* 4.1 Linking Words and Discourse Markers Table */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-orange-600 uppercase tracking-wider">4.1 LINKING WORDS AND DISCOURSE MARKERS</h4>
              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <tbody className="divide-y divide-inherit">
                    <tr className="bg-orange-500/10"><td className="p-2.5 font-bold w-1/3">Adding information</td><td className="p-2.5">moreover, furthermore, in addition, also, what is more, besides, not only...but also</td></tr>
                    <tr className={tableAltRowBg}><td className="p-2.5 font-bold">Contrasting</td><td className="p-2.5">however, nevertheless, despite this, on the other hand, although, even though, while, whereas, yet, in spite of this</td></tr>
                    <tr><td className="p-2.5 font-bold">Cause and reason</td><td className="p-2.5">because, since, as, due to, owing to, on account of</td></tr>
                    <tr className={tableAltRowBg}><td className="p-2.5 font-bold">Effect/result</td><td className="p-2.5">therefore, as a result, consequently, thus, hence, for this reason, so</td></tr>
                    <tr><td className="p-2.5 font-bold">Giving examples</td><td className="p-2.5">for example, for instance, such as, to illustrate, namely, in particular</td></tr>
                    <tr className={tableAltRowBg}><td className="p-2.5 font-bold">Concession</td><td className="p-2.5">although, though, even though, while, despite + noun/gerund, in spite of</td></tr>
                    <tr><td className="p-2.5 font-bold">Condition</td><td className="p-2.5">if, unless, provided that, as long as, on condition that, given that</td></tr>
                    <tr className={tableAltRowBg}><td className="p-2.5 font-bold">Sequence/Order</td><td className="p-2.5">first(ly), second(ly), then, next, after that, subsequently, finally, eventually, lastly</td></tr>
                    <tr><td className="p-2.5 font-bold">Emphasising</td><td className="p-2.5">indeed, in fact, certainly, clearly, obviously, undoubtedly, above all</td></tr>
                    <tr className={tableAltRowBg}><td className="p-2.5 font-bold">Summarising/Concluding</td><td className="p-2.5">in conclusion, to sum up, overall, in summary, on balance, to conclude, all in all</td></tr>
                    <tr><td className="p-2.5 font-bold">Time</td><td className="p-2.5">when, while, as, before, after, since, until, as soon as, once, during, by the time</td></tr>
                    <tr className={tableAltRowBg}><td className="p-2.5 font-bold">Purpose</td><td className="p-2.5">in order to, so as to, so that, with the aim of</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 4.2 & 4.3 Formal vs Informal Phrasebook (Pages 18-22 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(20, 'Formal & Informal Phrasebook Reference')}

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#c2410c] text-white text-xs font-bold uppercase">
                4.2 FORMAL EMAIL PHRASES – Complete Reference
              </div>

              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <tbody className="divide-y divide-inherit">
                    <tr className="bg-orange-500/10"><td className="p-2.5 font-bold text-orange-600 w-1/4">SALUTATION</td><td className="p-2.5">Dear Mr/Mrs/Ms [surname], | Dear Sir/Madam, | To Whom It May Concern,</td></tr>
                    <tr className={tableAltRowBg}><td className="p-2.5 font-bold text-orange-600">OPENING / PURPOSE</td><td className="p-2.5">I am writing to enquire about... | I am writing with reference to... | I am writing in response to your advertisement/letter/email regarding... | I am writing on behalf of [name/organisation]... | I am contacting you to request/express/complain/inform...</td></tr>
                    <tr><td className="p-2.5 font-bold text-orange-600">GIVING BACKGROUND</td><td className="p-2.5">As you may be aware,... | I would like to draw your attention to... | With reference to our recent conversation,... | I have recently become aware that...</td></tr>
                    <tr className={tableAltRowBg}><td className="p-2.5 font-bold text-orange-600">MAKING REQUESTS</td><td className="p-2.5">I would be grateful if you could... | Could you please provide... | I would appreciate it if you could... | I would like to request... | Would it be possible to...?</td></tr>
                    <tr><td className="p-2.5 font-bold text-orange-600">EXPRESSING CONCERN</td><td className="p-2.5">I am concerned/worried that... | I am disappointed to hear that... | I wish to express my dissatisfaction with... | I feel that this situation is unacceptable.</td></tr>
                    <tr className={tableAltRowBg}><td className="p-2.5 font-bold text-orange-600">MAKING SUGGESTIONS</td><td className="p-2.5">I would like to suggest that... | It may be worth considering... | I strongly recommend that... | Perhaps it would be beneficial to...</td></tr>
                    <tr><td className="p-2.5 font-bold text-orange-600">CLOSING STATEMENTS</td><td className="p-2.5">I look forward to hearing from you. | I await your response at your earliest convenience. | Please do not hesitate to contact me if you require further information.</td></tr>
                    <tr className={tableAltRowBg}><td className="p-2.5 font-bold text-orange-600">SIGN-OFF</td><td className="p-2.5"><strong>Yours faithfully, [full name]</strong> (when you used 'Dear Sir/Madam') | <strong>Yours sincerely, [full name]</strong> (when you used their name)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-inherit">
              <div className="p-3.5 rounded-xl bg-[#c2410c] text-white text-xs font-bold uppercase">
                4.3 INFORMAL EMAIL PHRASES
              </div>

              <div className="overflow-x-auto rounded-xl border border-inherit">
                <table className="w-full text-xs text-left border-collapse">
                  <tbody className="divide-y divide-inherit">
                    <tr className="bg-emerald-500/10"><td className="p-2.5 font-bold text-emerald-600 w-1/4">SALUTATION</td><td className="p-2.5">Hi [name], | Hey [name]! | Dear [name],</td></tr>
                    <tr className={tableAltRowBg}><td className="p-2.5 font-bold text-emerald-600">OPENING</td><td className="p-2.5">How are you? | I hope you're well! | It was great to hear from you! | Guess what! | You won't believe this, but...</td></tr>
                    <tr><td className="p-2.5 font-bold text-emerald-600">BODY PHRASES</td><td className="p-2.5">I just wanted to let you know that... | I thought you'd like to hear... | I can't believe that... | What do you think about...? | Have you heard that...?</td></tr>
                    <tr className={tableAltRowBg}><td className="p-2.5 font-bold text-emerald-600">MAKING SUGGESTIONS</td><td className="p-2.5">Why don't we...? | How about...? | We should definitely... | Let's...! | Maybe we could...?</td></tr>
                    <tr><td className="p-2.5 font-bold text-emerald-600">EXPRESSING FEELINGS</td><td className="p-2.5">I'm so excited about... | I was really surprised/shocked/disappointed that... | I can't wait to... | I'm not sure about...</td></tr>
                    <tr className={tableAltRowBg}><td className="p-2.5 font-bold text-emerald-600">CLOSING & SIGN-OFF</td><td className="p-2.5">Let me know what you think! | Write back soon! | Talk soon! | Best wishes, | Cheers, | See you soon,</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Part 3 DAR Strategy & Solved Forum (Pages 50-55 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(22, 'British Council Writing — Part 3 | Sir Mazhar Ali')}

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#14284b] text-white">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400">PART 3: THREE WRITTEN RESPONSES TO QUESTIONS (30-40 words each)</span>
                <p className="text-xs text-slate-300 mt-1">Simulates an online club or group forum. Three members ask you questions one after another.</p>
              </div>

              {/* DAR Formula Box */}
              <div className={`p-5 rounded-2xl border-l-4 border-l-emerald-500 ${greenBoxBg} space-y-2 text-xs`}>
                <span className="font-bold uppercase tracking-wider text-emerald-600 block">■ The Perfect Answer Formula — DAR</span>
                <ul className="space-y-1">
                  <li><strong>• D — Direct response:</strong> Answer the question in the first sentence.</li>
                  <li><strong>• A — Add detail:</strong> Give a reason, an example, or a personal touch.</li>
                  <li><strong>• R — Round off:</strong> Close politely or ask a question back.</li>
                </ul>
              </div>

              {/* Cooking Club Worked Set */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider block opacity-80">Full Model Set — Online Cooking Club:</span>
                
                <div className="p-4 rounded-xl border border-inherit space-y-2">
                  <div className="text-xs font-bold text-blue-500">Q1: Hi! I'm new to the group. What dishes do you cook most often at home?</div>
                  <div className="p-3 bg-black/10 rounded-lg text-xs leading-relaxed italic">
                    "Welcome to the club! I usually cook traditional Pakistani food at home, like daal, chicken karahi and chapati. On weekends I sometimes prepare biryani because my whole family loves it. Hope you enjoy this group!" (38 words)
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-inherit space-y-2">
                  <div className="text-xs font-bold text-blue-500">Q2: Do you prefer cooking alone or with someone else? Why?</div>
                  <div className="p-3 bg-black/10 rounded-lg text-xs leading-relaxed italic">
                    "I prefer cooking with my wife because we can talk and share ideas. However, when I try a new recipe, I cook alone so that I can fully concentrate and follow each step carefully." (36 words)
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-inherit space-y-2">
                  <div className="text-xs font-bold text-blue-500">Q3: What is one cooking tip you would give to a beginner?</div>
                  <div className="p-3 bg-black/10 rounded-lg text-xs leading-relaxed italic">
                    "My best tip is to read the whole recipe before starting. Also, prepare and measure all ingredients first. This saves time and stress, and your dish will turn out much tastier in the end." (34 words)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part 4 Full Band-9 Practice Models (Pages 23-26, 58-66 in PDF) */}
          <section className={`p-7 rounded-3xl border ${cardBg} shadow-lg space-y-6`}>
            {renderPageHeader(24, 'Full Model Writing Sets — Formal & Informal Emails')}

            <div className="space-y-6">
              
              {/* SET 1: Public Park Closure */}
              <div className="p-5 rounded-2xl border border-inherit space-y-4">
                <div className="p-3 rounded-xl bg-[#c2410c] text-white text-xs font-bold uppercase">
                  WRITING PRACTICE SET 1 – Public Park Closure (6 Months)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Informal */}
                  <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs space-y-2">
                    <span className="font-bold text-blue-400 block uppercase">Informal Email to Friend Fatima (46 words)</span>
                    <p className="leading-relaxed italic">
                      "Hi Fatima,<br/><br/>
                      Have you heard the news? Our local park is closing for six whole months for renovation! The kids are going to be so disappointed about losing the playground. I've written to the council about it — maybe you should too? Let me know what you think!<br/><br/>
                      Take care,<br/>
                      [Name]"
                    </p>
                  </div>

                  {/* Formal */}
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-2">
                    <span className="font-bold text-emerald-400 block uppercase">Formal Email to Council Manager (141 words)</span>
                    <p className="leading-relaxed italic">
                      "Dear Council Manager,<br/><br/>
                      I am writing with reference to the recent announcement that the public park in our neighbourhood will be closed for a period of six months for renovation purposes. While I appreciate that updating the park's facilities is a worthwhile investment in our community, I am concerned about the significant impact this closure will have on local families, particularly those with young children.<br/><br/>
                      The park is the primary outdoor recreational space for many residents in this area. During the summer months especially, the loss of the playground and sports facilities will be keenly felt. I would therefore strongly request that the council consider keeping at least a portion of the park accessible throughout the renovation period, if safety regulations permit.<br/><br/>
                      In addition, I would encourage the council to consult with residents before finalising the renovation plans, to ensure that the new facilities reflect the actual needs and preferences of the community.<br/><br/>
                      I look forward to your response.<br/><br/>
                      Yours faithfully,<br/>
                      [Full Name]"
                    </p>
                  </div>
                </div>
              </div>

              {/* SET 2: Company Canteen Closure */}
              <div className="p-5 rounded-2xl border border-inherit space-y-4">
                <div className="p-3 rounded-xl bg-[#c2410c] text-white text-xs font-bold uppercase">
                  WRITING PRACTICE SET 2 – Company Canteen Closure & Vending Machine
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Informal */}
                  <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs space-y-2">
                    <span className="font-bold text-blue-400 block uppercase">Informal Email to Colleague Hassan (44 words)</span>
                    <p className="leading-relaxed italic">
                      "Hi Hassan,<br/><br/>
                      Have you seen the email about the canteen? I can't believe they're replacing it with a vending machine — that's such a downgrade! I really valued having a proper lunch break with colleagues. Are you going to say anything to management about it? Let me know!<br/><br/>
                      Cheers,<br/>
                      [Name]"
                    </p>
                  </div>

                  {/* Formal */}
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-2">
                    <span className="font-bold text-emerald-400 block uppercase">Formal Email to HR Director (136 words)</span>
                    <p className="leading-relaxed italic">
                      "Dear HR Director,<br/><br/>
                      I am writing with reference to the recent announcement regarding the permanent closure of the company canteen and its replacement with a vending machine service. While I understand that cost pressures may have made this decision necessary, I am concerned about the effect this change will have on staff wellbeing and morale.<br/><br/>
                      The canteen currently serves as an important space for employees to take proper breaks, eat nutritious meals, and interact informally with colleagues from different departments. Research consistently shows that access to healthy food and regular breaks improves concentration, productivity, and job satisfaction. Removing this facility risks undermining these benefits.<br/><br/>
                      I would therefore like to suggest that the company explore alternative solutions, such as negotiating with a local food provider to offer a subsidised daily menu, or introducing a rotating food van service.<br/><br/>
                      I would welcome the opportunity to discuss this matter further.<br/><br/>
                      Yours sincerely,<br/>
                      [Full Name]"
                    </p>
                  </div>
                </div>
              </div>

              {/* SET 3: Sky Airlines 24-Hour Flight Delay */}
              <div className="p-5 rounded-2xl border border-inherit space-y-4">
                <div className="p-3 rounded-xl bg-[#c2410c] text-white text-xs font-bold uppercase">
                  WRITING PRACTICE SET 3 – Sky Airlines 24-Hour Flight Delay
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Informal */}
                  <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs space-y-2">
                    <span className="font-bold text-blue-400 block uppercase">Informal Email to Friend Bilal (45 words)</span>
                    <p className="leading-relaxed italic">
                      "Hi Bilal,<br/><br/>
                      Hope you're doing great! Quick update — Sky Airlines has delayed my flight by a whole day, so I'll now arrive on Saturday, not Friday. Sorry for the change of plan! Could you pick me up on Saturday evening instead? Thanks a lot!<br/><br/>
                      Take care,<br/>
                      Mazhar"
                    </p>
                  </div>

                  {/* Formal */}
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-2">
                    <span className="font-bold text-emerald-400 block uppercase">Formal Email to Sky Airlines Customer Service (146 words)</span>
                    <p className="leading-relaxed italic">
                      "Dear Sir/Madam,<br/><br/>
                      I am writing with regard to flight SK-204 from Lahore to Istanbul, scheduled for next Friday (Booking Reference: SKY/9821). I have just been informed by email that this flight has been delayed by twenty-four hours.<br/><br/>
                      Unfortunately, this delay will cause me considerable difficulty, as I am due to attend an important business conference in Istanbul which begins on Friday morning. As a result of the new arrival time, I will miss the entire opening day, including a presentation I am scheduled to deliver.<br/><br/>
                      I would therefore be grateful if you could either rebook me on an alternative flight that arrives before Friday morning or, if that is not possible, provide a full refund so that I can make arrangements with another airline.<br/><br/>
                      I look forward to your prompt response.<br/><br/>
                      Yours faithfully,<br/>
                      Mazhar Ali"
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>

        </div>
      )}

    </div>
  );
};
