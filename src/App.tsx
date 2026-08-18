import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StaffingGapSection } from './components/StaffingGapSection';
import { IdealForSection } from './components/IdealForSection';
import { WhyWaitSection } from './components/WhyWaitSection';
import { ValuePillarsSection } from './components/ValuePillarsSection';
import { OutreachSection } from './components/OutreachSection';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import { SubmissionResult } from './types';
import { APP_CONFIG } from './data/copy';

export default function App() {
  const [googleSheetWebhookUrl, setGoogleSheetWebhookUrl] = useState<string>(
    APP_CONFIG.googleSheetWebhookUrl || ''
  );
  const [isGoogleSheetModalOpen, setIsGoogleSheetModalOpen] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  // Load saved Google Sheet webhook from localStorage on initial render (if custom overridden)
  useEffect(() => {
    try {
      const savedUrl = localStorage.getItem('lab_linik_sheet_webhook');
      if (savedUrl) {
        setGoogleSheetWebhookUrl(savedUrl);
      } else if (APP_CONFIG.googleSheetWebhookUrl) {
        setGoogleSheetWebhookUrl(APP_CONFIG.googleSheetWebhookUrl);
      }
      // Check if admin wants to open sheet setup via URL param (?admin=sheets or ?setup=sheets)
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'sheets' || params.get('setup') === 'sheets') {
        setIsGoogleSheetModalOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSaveGoogleSheetWebhook = (url: string) => {
    setGoogleSheetWebhookUrl(url);
    try {
      localStorage.setItem('lab_linik_sheet_webhook', url);
    } catch {
      // ignore
    }
  };

  const scrollToBookingForm = () => {
    const el = document.getElementById('booking-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white flex flex-col antialiased">
      {/* Fixed Sticky Header */}
      <Header
        onScrollToForm={scrollToBookingForm}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onScrollToForm={scrollToBookingForm} />

        {/* We Cover Your Staffing Gaps */}
        <StaffingGapSection />

        {/* Our Locum Services Are Ideal For */}
        <IdealForSection />

        {/* Why Wait Until Your Lab Is Short-Staffed? */}
        <WhyWaitSection onScrollToForm={scrollToBookingForm} />

        {/* Flexible. Reliable. Ready When You Need Us. */}
        <ValuePillarsSection />

        {/* Medical Outreach Spotlight */}
        <OutreachSection onScrollToForm={scrollToBookingForm} />

        {/* Interactive Booking & Requisition Form */}
        <BookingForm
          onSubmissionSuccess={(res) => setSubmissionResult(res)}
          googleSheetWebhookUrl={googleSheetWebhookUrl}
        />
      </main>

      {/* Footer */}
      <Footer
        onScrollToForm={scrollToBookingForm}
      />

      {/* Submission Success Modal with WhatsApp Action & Copy */}
      <SubmissionSuccessModal
        submission={submissionResult}
        onClose={() => setSubmissionResult(null)}
      />

      {/* Google Sheets Script & Webhook Integration Modal (accessible secretly via ?admin=sheets) */}
      <GoogleSheetsModal
        isOpen={isGoogleSheetModalOpen}
        onClose={() => setIsGoogleSheetModalOpen(false)}
        webhookUrl={googleSheetWebhookUrl}
        onSaveWebhookUrl={handleSaveGoogleSheetWebhook}
      />
    </div>
  );
}
