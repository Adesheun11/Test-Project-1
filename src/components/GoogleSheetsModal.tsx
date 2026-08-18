import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Play
} from 'lucide-react';
import { GOOGLE_APPS_SCRIPT_CODE } from '../utils/googleSheetsScript';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl: string;
  onSaveWebhookUrl: (url: string) => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  webhookUrl,
  onSaveWebhookUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [inputUrl, setInputUrl] = useState(webhookUrl);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    onSaveWebhookUrl(inputUrl.trim());
    setTestResult({ success: true, message: 'Google Sheet Webhook URL saved successfully!' });
  };

  const handleTestWebhook = async () => {
    if (!inputUrl.trim()) {
      setTestResult({ success: false, message: 'Please enter a Google Apps Script Web App URL first.' });
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const testPayload = {
        refId: 'LL-TEST-' + Math.floor(1000 + Math.random() * 9000),
        organizationName: 'Lab Linik Connection Test Facility',
        organizationType: 'Hospital',
        organizationAddress: 'Lagos Medical District',
        contactPersonName: 'Lab Administrator',
        jobTitle: 'Quality Assurance',
        phoneWhatsapp: '08165686093',
        emailAddress: 'test@lablinik.com',
        professionalNeeded: 'Medical Laboratory Scientist',
        numberOfProfessionals: '1',
        supportTypes: ['Emergency/urgent coverage', 'Duty shift coverage'],
        startDate: new Date().toISOString().split('T')[0],
        duration: '1–2 weeks',
        preferredShifts: ['Morning', 'Night'],
        expectedServices: 'Testing connection from Lab Linik portal to Google Sheets',
        majorTests: 'FBC, Chemistry, Crossmatch',
        equipmentExperience: 'Automated 5-part analyzer',
        workStyle: 'Working independently',
        additionalResponsibilities: 'System diagnostic test row',
        isMedicalOutreach: 'No',
        urgency: 'Emergency — need someone as soon as possible',
        additionalNotes: 'Verification entry generated from Lab Linik web portal.',
        confirmedAuthorized: true,
      };

      await fetch(inputUrl.trim(), {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPayload),
      });

      onSaveWebhookUrl(inputUrl.trim());
      setTestResult({
        success: true,
        message: 'Test row dispatched to your Google Sheet! Check your sheet for the new row with headers.',
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Connection attempt note: ${err.message || 'Check your Apps Script Web App permissions (Who has access: Anyone)'}`,
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <FileSpreadsheet className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Google Sheets Auto-Sync Setup
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Automatically record all locum booking submissions directly into your Google Sheet.
            </p>
          </div>
        </div>

        {/* 4-Step Instructions */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Step-by-Step Setup Guide (2 Minutes)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">1</span>
                <span>Create New Sheet</span>
              </div>
              <p className="text-slate-400">
                Go to <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-cyan-400 underline">sheets.new</a> in your browser to open a blank Google Sheet.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">2</span>
                <span>Open Apps Script</span>
              </div>
              <p className="text-slate-400">
                In Google Sheets top menu, click <strong>Extensions</strong> → <strong>Apps Script</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">3</span>
                <span>Paste Script & Save</span>
              </div>
              <p className="text-slate-400">
                Replace everything in <code className="text-cyan-300">Code.gs</code> with the script below, then click Save (💾).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">4</span>
                <span>Deploy as Web App</span>
              </div>
              <p className="text-slate-400">
                Click <strong>Deploy</strong> → <strong>New deployment</strong> → Type: <strong>Web app</strong> → Who has access: <strong>Anyone</strong> → Copy Web App URL.
              </p>
            </div>
          </div>
        </div>

        {/* Copyable Script Code Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Google Apps Script (<code className="text-cyan-300">Code.gs</code>)
            </span>
            <button
              id="copy-google-apps-script-btn"
              onClick={handleCopyScript}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Script Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Complete Script</span>
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-200 max-h-48 overflow-y-auto leading-relaxed whitespace-pre-wrap select-all">
              {GOOGLE_APPS_SCRIPT_CODE}
            </pre>
          </div>
        </div>

        {/* Webhook URL Input & Test */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Paste Your Google Apps Script Web App URL:
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              id="googleSheetWebhookUrlInput"
              type="url"
              placeholder="https://script.google.com/macros/s/.../exec"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm outline-none focus:border-emerald-400 placeholder:text-slate-600"
            />
            <div className="flex items-center gap-2">
              <button
                id="save-webhook-url-btn"
                onClick={handleSave}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 transition-colors"
              >
                Save
              </button>
              <button
                id="test-webhook-btn"
                onClick={handleTestWebhook}
                disabled={testing}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors disabled:opacity-50 cursor-pointer"
              >
                {testing ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                <span>Test Sync</span>
              </button>
            </div>
          </div>

          {testResult && (
            <div
              className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                testResult.success
                  ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300'
                  : 'bg-rose-950/60 border border-rose-500/50 text-rose-300'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};
