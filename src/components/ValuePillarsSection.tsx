import React from 'react';
import { Layers, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';

export const ValuePillarsSection: React.FC = () => {
  const pillars = [
    {
      title: 'FLEXIBLE',
      tagline: 'Zero Permanent Commitment',
      icon: Layers,
      description:
        'Engage high-caliber laboratory scientists and technicians exactly for the duration you need — from a single emergency shift to several months or seasonal coverage.',
    },
    {
      title: 'RELIABLE',
      tagline: 'Vetted Medical Professionals',
      icon: ShieldCheck,
      description:
        'All locums are credentialed, laboratory-experienced professionals trained in standard operating procedures, quality controls, and modern automated analyzers.',
    },
    {
      title: 'READY WHEN YOU NEED US',
      tagline: 'Rapid Response Network',
      icon: Zap,
      description:
        'Whether preparing for a planned leave or responding to an unforeseen crisis, our agile roster is primed to deploy and hit the ground running.',
    },
  ];

  return (
    <section className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            Our Core Promise
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            FLEXIBLE. RELIABLE. READY WHEN YOU NEED US.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Whether it's an emergency cover for tomorrow's shift or planned staffing for an upcoming medical outreach, we make it easier to get the laboratory support you need without the commitment of permanent employment.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">
                    {pillar.tagline}
                  </div>
                  <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <HeartHandshake className="w-4 h-4 text-cyan-400" />
                  <span>Lab Linik Quality Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/20 text-center max-w-4xl mx-auto space-y-3">
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm sm:text-base font-extrabold text-cyan-200">
            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30">One shift</span>
            <span className="text-slate-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30">Several shifts</span>
            <span className="text-slate-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30">Short-term coverage</span>
            <span className="text-slate-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-300">Medical outreach</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 font-medium pt-1">
            Tell us what you need, and we'll help you find the right locum laboratory professional.
          </p>
        </div>
      </div>
    </section>
  );
};
