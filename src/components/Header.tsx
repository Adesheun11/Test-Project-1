import React from 'react';
import { Phone, ShieldCheck, MessageSquare } from 'lucide-react';
import { APP_CONFIG } from '../data/copy';

interface HeaderProps {
  onScrollToForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToForm,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Emergency Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="font-medium">
              Need emergency locum cover for upcoming shifts or medical outreach?
            </span>
          </div>
          <a
            id="header-urgent-whatsapp-link"
            href={`https://wa.me/${APP_CONFIG.whatsappInternational}?text=${encodeURIComponent(
              'Hello Lab Linik Services, I need urgent information about locum laboratory staffing coverage.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-emerald-100 hover:text-white underline underline-offset-2 transition-colors ml-auto sm:ml-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp: {APP_CONFIG.formattedPhone}</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black text-xl tracking-tight border border-cyan-400/30">
            LL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg sm:text-xl text-white">
                LAB LINIK
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                SERVICES
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Locum Medical Laboratory Staffing
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Call */}
          <a
            id="header-call-btn"
            href={`tel:${APP_CONFIG.formattedPhone}`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 bg-slate-800/60 hover:bg-slate-800 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{APP_CONFIG.formattedPhone}</span>
          </a>

          {/* Primary CTA */}
          <button
            id="header-book-locum-cta"
            onClick={onScrollToForm}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>BOOK A LOCUM</span>
          </button>
        </div>
      </div>
    </header>
  );
};
