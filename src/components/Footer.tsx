import React from 'react';
import { Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { APP_CONFIG } from '../data/copy';

interface FooterProps {
  onScrollToForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToForm,
}) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Pre-Footer Callout Card */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 border border-cyan-500/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              DON'T LET STAFF SHORTAGES DISRUPT YOUR LAB
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Need a Locum Medical Laboratory Scientist or Technician?
            </h3>
            <p className="text-sm text-slate-300">
              Get in touch with Lab Linik Services and tell us your staffing requirement. Let us help you keep your laboratory running.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              id="footer-book-locum-cta"
              onClick={onScrollToForm}
              className="px-6 py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              BOOK A LOCUM TODAY
            </button>
            <a
              id="footer-whatsapp-link"
              href={`https://wa.me/${APP_CONFIG.whatsappInternational}?text=${encodeURIComponent(
                'Hello Lab Linik Services, I would like to book a locum scientist/technician.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Main Footer Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg border border-cyan-400/30">
                LL
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                LAB LINIK SERVICES
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Your trusted link to temporary laboratory staffing solutions. Deploying vetted Medical Laboratory Scientists (MLS) and Technicians (MLT) across hospitals, diagnostic centers, clinics, and outreach programs.
            </p>
            <div className="text-xs text-slate-500">
              Coverage: Nationwide emergency, shift, and outreach deployment.
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button
                  onClick={onScrollToForm}
                  className="hover:text-cyan-300 transition-colors text-left cursor-pointer"
                >
                  Book a Locum Scientist / Technician
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${APP_CONFIG.whatsappInternational}?text=${encodeURIComponent(
                    'Hello Lab Linik Services, I need assistance with laboratory locum staffing.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors inline-block"
                >
                  Urgent WhatsApp Hotline
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Contact & Hotline
            </h4>
            <div className="space-y-2 text-sm text-slate-300">
              <a
                href={`https://wa.me/${APP_CONFIG.whatsappInternational}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {APP_CONFIG.whatsappNumber}</span>
              </a>
              <a
                href={`tel:${APP_CONFIG.formattedPhone}`}
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{APP_CONFIG.formattedPhone}</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Available 24/7 for urgent staffing voids</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LAB LINIK SERVICES. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Empowering diagnostic continuity & healthcare excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};
