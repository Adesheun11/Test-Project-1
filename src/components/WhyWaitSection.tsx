import React from 'react';
import { AlertCircle, CheckCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { CONSEQUENCES_OF_SHORT_STAFFING } from '../data/copy';

interface WhyWaitSectionProps {
  onScrollToForm: () => void;
}

export const WhyWaitSection: React.FC<WhyWaitSectionProps> = ({ onScrollToForm }) => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            Operational Risk Prevention
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            WHY WAIT UNTIL YOUR LAB IS SHORT-STAFFED?
          </h2>
          <p className="text-base text-slate-300">
            A single staffing deficit quickly cascades into operational paralysis and patient dissatisfaction.
          </p>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: The Cost of Waiting (5 Pain Points) */}
          <div className="lg:col-span-7 bg-slate-950/90 border border-rose-900/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold text-lg">
                ⚠️
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  A Missing Staff Member Can Mean:
                </h3>
                <p className="text-xs text-rose-300/80">
                  Direct operational vulnerabilities for your facility
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {CONSEQUENCES_OF_SHORT_STAFFING.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-rose-500/30 transition-colors"
                >
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: The Lab Linik Advantage */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-cyan-950/60 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    The Lab Linik Solution
                  </h3>
                  <p className="text-xs text-cyan-300">
                    Seamless continuity for medical laboratories
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-slate-200 text-sm sm:text-base leading-relaxed">
                With <strong className="text-cyan-300 font-bold">Lab Linik Services</strong>, you have access to temporary laboratory professionals who can step in and help keep your operations moving.
              </div>

              <div className="space-y-3">
                {[
                  'Rapid Locum Scientist & Technician dispatch',
                  'Familiar with automated analysers & standard SOPs',
                  'Preserve turn-around times (TAT) and diagnostic accuracy',
                  'Protect your permanent staff from burnout & error',
                  'Ensure flawless patient and clinician satisfaction',
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button
                id="why-wait-book-btn"
                onClick={onScrollToForm}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <span>Protect Your Lab Workflow Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
