import React from 'react';
import { Calendar, Clock, AlertTriangle, TrendingUp, Tent, UserCheck, CheckCircle } from 'lucide-react';

export const StaffingGapSection: React.FC = () => {
  const coverageScenarios = [
    {
      icon: Clock,
      title: 'Single Duty Shift',
      desc: 'Instant emergency cover for an uncovered night, weekend, or call duty shift.',
      badge: 'Immediate',
    },
    {
      icon: Calendar,
      title: 'Several Days / Weeks',
      desc: 'Seamless interim staffing during peak test volume, equipment rollouts, or audits.',
      badge: 'Short Term',
    },
    {
      icon: UserCheck,
      title: 'Staff Leave / Absence',
      desc: 'Planned replacement for annual leave, maternity leave, sick days, or bereavement.',
      badge: 'Planned',
    },
    {
      icon: AlertTriangle,
      title: 'Unexpected Absence',
      desc: 'Rapid backup when staff fall ill or resign abruptly without prior handover notice.',
      badge: 'Urgent',
    },
    {
      icon: TrendingUp,
      title: 'Increased Workload',
      desc: 'Reinforce your lab benches during seasonal surges, corporate health check drives, or clinical trials.',
      badge: 'Capacity',
    },
    {
      icon: Tent,
      title: 'Medical Outreach',
      desc: 'Experienced field laboratory professionals equipped for mobile mass screening campaigns.',
      badge: 'Field Ready',
    },
  ];

  return (
    <section className="py-16 bg-slate-900 text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            Flexible Staffing On-Demand
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            WE COVER YOUR STAFFING GAPS.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Whether you need someone to cover a single duty shift, several days, staff leave, an unexpected absence, increased workload, or a medical outreach, Lab Linik helps you keep your laboratory services running smoothly.
          </p>
        </div>

        {/* 6 Scenario Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coverageScenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-950 transition-all duration-300 group flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {scenario.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {scenario.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {scenario.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-medium text-cyan-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Lab Linik Qualified Cover</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
