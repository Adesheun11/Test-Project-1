import React from 'react';
import { 
  Building2, 
  FlaskConical, 
  Stethoscope, 
  HeartHandshake, 
  GraduationCap, 
  Globe2, 
  Tent, 
  Activity, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { TARGET_FACILITIES } from '../data/copy';

export const IdealForSection: React.FC = () => {
  const facilityIcons = [
    Building2,       // Hospitals
    FlaskConical,    // Diagnostic Laboratories & Centres
    Stethoscope,     // Medical Centres & Clinics
    HeartHandshake,  // Private Healthcare Facilities
    GraduationCap,   // Research & Medical Institutions
    Globe2,          // NGOs & Healthcare Organizations
    Tent,            // Medical Outreach Programmes
    Activity,        // Health Screening & Community Health Events
    ShieldCheck,     // Any healthcare org
  ];

  return (
    <section className="py-16 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
            Target Healthcare Partners
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Our Locum Services Are Ideal For:
          </h2>
          <p className="text-base text-slate-300">
            Tailored temporary laboratory staffing solutions matching the precise workflow and equipment of your healthcare setting.
          </p>
        </div>

        {/* 9 Facilities Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {TARGET_FACILITIES.map((facility, index) => {
            const Icon = facilityIcons[index] || ShieldCheck;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                      {facility}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    Locum MLS & MLT coverage on demand
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
