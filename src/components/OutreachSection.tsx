import React from 'react';
import { Tent, CheckCircle2, ArrowRight, Sparkles, MapPin, Users2, Stethoscope } from 'lucide-react';
import { APP_CONFIG } from '../data/copy';

interface OutreachSectionProps {
  onScrollToForm: () => void;
}

export const OutreachSection: React.FC<OutreachSectionProps> = ({ onScrollToForm }) => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Outreach Image & Live Badge */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 group">
              <img
                src={APP_CONFIG.outreachImage}
                alt="Medical Outreach Laboratory Team at Community Screening"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/70 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0">
                    <Tent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">
                      Field Outreach & Rapid Screening
                    </h3>
                    <p className="text-xs text-slate-400">
                      Mobile POC testing, specimen logistics & reporting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Outreach Copy & Capabilities */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Specialized Community Services
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Medical Outreach & Community Health Screening Staffing
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Planning a rural, church, corporate, or NGO community medical outreach? Lab Linik equips your mission with skilled laboratory scientists and technicians capable of managing high-volume field testing.
            </p>

            {/* Outreach Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
                  <Stethoscope className="w-4 h-4" />
                  <span>Rapid Diagnostic Tests (RDTs)</span>
                </div>
                <p className="text-xs text-slate-400">
                  Malaria, Hepatitis B/C, HIV, Urinalysis, Blood Glucose & Vitals screening.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
                  <Users2 className="w-4 h-4" />
                  <span>High-Throughput Crowd Workflow</span>
                </div>
                <p className="text-xs text-slate-400">
                  Disciplined triage, precise sample labeling, and immediate result dispatch.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="outreach-book-btn"
                onClick={onScrollToForm}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white shadow-lg shadow-teal-500/25 transition-all cursor-pointer"
              >
                <span>Request Outreach Laboratory Staff</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
