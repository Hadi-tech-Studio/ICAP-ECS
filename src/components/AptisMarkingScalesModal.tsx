import React from 'react';
import { X, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { APTIS_MARKING_SCALES } from '../data/aptisMockData';

interface AptisMarkingScalesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AptisMarkingScalesModal: React.FC<AptisMarkingScalesModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-6 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Official Aptis General & ICAP ECS Marking Scales</h3>
              <p className="text-xs text-slate-400">
                CEFR (Common European Framework of Reference) Bands A0 to C (C1/C2) Assessment Criteria
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Assessment & Scoring Overview</span>
            </div>
            <p className="leading-relaxed">
              The Aptis General test awards a scaled score from 0 to 50 for each of the test components (Core, Reading, Writing). The overall proficiency is mapped directly to the Common European Framework of Reference (CEFR) levels. In the ICAP ECS Course (CA Journey), achieving a minimum of CEFR B1/B2 level demonstrates solid professional business communication competence.
            </p>
          </div>

          {/* Table of Scales */}
          <div className="space-y-4">
            {APTIS_MARKING_SCALES.map((scale) => (
              <div
                key={scale.band}
                className={`p-5 rounded-2xl border transition ${
                  scale.band.startsWith('C')
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : scale.band === 'B2'
                    ? 'bg-blue-950/20 border-blue-500/40'
                    : scale.band === 'B1'
                    ? 'bg-amber-950/20 border-amber-500/30'
                    : 'bg-slate-800/40 border-slate-700/50'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-xl text-xs font-extrabold uppercase font-mono tracking-wider ${
                      scale.band.startsWith('C')
                        ? 'bg-emerald-500 text-slate-950'
                        : scale.band === 'B2'
                        ? 'bg-blue-500 text-white'
                        : scale.band === 'B1'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-700 text-slate-200'
                    }`}>
                      CEFR Band {scale.band}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">
                      Standard Score: <span className="font-mono text-emerald-400">{scale.numericScore} / 50</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {scale.band.startsWith('C') ? 'Expert Professional Fluency' : scale.band === 'B2' ? 'Independent Working Fluency' : scale.band === 'B1' ? 'Threshold Competence' : 'Elementary'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Grammar Proficiency
                    </span>
                    <p className="text-slate-400 leading-relaxed pl-5">{scale.grammarDescription}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                      Vocabulary Command
                    </span>
                    <p className="text-slate-400 leading-relaxed pl-5">{scale.vocabularyDescription}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      Reading Comprehension
                    </span>
                    <p className="text-slate-400 leading-relaxed pl-5">{scale.readingDescription}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      Written Production & Register
                    </span>
                    <p className="text-slate-400 leading-relaxed pl-5">{scale.writingDescription}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>ICAP ECS Course • Aptis Marking Scales</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition shadow"
          >
            Close Scales
          </button>
        </div>

      </div>
    </div>
  );
};
