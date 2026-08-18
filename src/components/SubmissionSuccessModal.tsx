import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  X, 
  Building2, 
  Calendar, 
  UserCheck,
  ExternalLink
} from 'lucide-react';
import { SubmissionResult } from '../types';
import { APP_CONFIG } from '../data/copy';

interface SubmissionSuccessModalProps {
  submission: SubmissionResult | null;
  onClose: () => void;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  submission,
  onClose,
}) => {
  useEffect(() => {
    if (submission) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#14b8a6', '#10b981', '#38bdf8'],
        });
      } catch {
        // ignore
      }
    }
  }, [submission]);

  if (!submission) return null;

  const handleOpenWhatsApp = () => {
    window.open(submission.whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Close window"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Requisition Received!
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Ref ID: <span className="font-mono font-bold text-cyan-400">#{submission.id}</span>
            </p>
          </div>
        </div>

        {/* Concise Requisition Summary Box */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-cyan-400" /> Organization
            </span>
            <span className="font-semibold text-slate-100 text-right truncate max-w-[200px]">
              {submission.data.organizationName}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
            <span className="text-slate-400 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-400" /> Role Requested
            </span>
            <span className="font-semibold text-slate-100">
              {submission.data.numberOfProfessionals}x {submission.data.professionalNeeded}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" /> Start Date
            </span>
            <span className="font-semibold text-slate-100">
              {submission.data.startDate} ({submission.data.duration})
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            id="modal-open-whatsapp-btn"
            onClick={handleOpenWhatsApp}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open WhatsApp Chat ({APP_CONFIG.formattedPhone})</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </button>

          <div className="flex items-center gap-3">
            <a
              id="modal-call-phone-btn"
              href={`tel:${APP_CONFIG.phone}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call Us Direct</span>
            </a>

            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
            >
              Done / Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
