import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, MessageSquare, Award, Clock, Users, Building2 } from 'lucide-react';
import { APP_CONFIG } from '../data/copy';

interface HeroSectionProps {
  onScrollToForm: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToForm }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Sales Copy & Primary Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              LAB LINIK SERVICES
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Reliable Locum Medical Laboratory Professionals —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                When You Need Them Most.
              </span>
            </h1>

            {/* The 4 Pain-Point Questions */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-sm">
              <p className="text-sm sm:text-base font-semibold text-cyan-200 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>Short-staffed?</span>
                <span className="text-slate-600">•</span>
                <span>Unexpected absence?</span>
                <span className="text-slate-600">•</span>
                <span>Extra workload?</span>
                <span className="text-slate-600">•</span>
                <span className="text-teal-300">Medical outreach coming up?</span>
              </p>
            </div>

            {/* Core Value Proposition Copy */}
            <div className="space-y-3 text-slate-300 text-base sm:text-lg leading-relaxed">
              <p className="font-medium text-slate-200">
                Don’t let a staffing gap slow down your laboratory operations or compromise the quality of service you provide to patients.
              </p>
              <p className="text-sm sm:text-base text-slate-400">
                <strong className="text-white">Lab Linik Services</strong> provides qualified <span className="text-cyan-300 font-semibold">Locum Medical Laboratory Scientists and Technicians</span> to healthcare organizations that need reliable temporary laboratory staff — exactly when they need them.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-book-locum-btn"
                onClick={onScrollToForm}
                className="flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>BOOK A LOCUM TODAY</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                id="hero-whatsapp-direct-btn"
                href={`https://wa.me/${APP_CONFIG.whatsappInternational}?text=${encodeURIComponent(
                  'Hello Lab Linik Services, I would like to inquire about booking a locum Medical Laboratory Scientist/Technician.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm sm:text-base font-semibold bg-emerald-700/80 hover:bg-emerald-600 text-white border border-emerald-500/40 shadow-lg shadow-emerald-900/30 transition-all"
              >
                <MessageSquare className="w-5 h-5 text-emerald-300" />
                <span>Chat on WhatsApp ({APP_CONFIG.whatsappNumber})</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Vetted & Qualified Staff</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Fast Standby Deployment</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero Permanent Payroll</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image & Diagnostic Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src={APP_CONFIG.heroImage}
                alt="Lab Linik Medical Laboratory Scientists at work"
                referrerPolicy="no-referrer"
                loading="eager"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/images/hero.jpg' && !target.src.includes('unsplash.com')) {
                    target.src = '/images/hero.jpg';
                  } else if (!target.src.includes('unsplash.com')) {
                    target.src = 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80';
                  }
                }}
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Floating Badge on Image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/70 text-white shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">
                        Laboratory Science Excellence
                      </h3>
                      <p className="text-xs text-slate-400">
                        MLS & MLT temporary staffing solutions
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                    Ready to Deploy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
