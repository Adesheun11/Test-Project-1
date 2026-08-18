import React, { useState } from 'react';
import { 
  Building, 
  UserCheck, 
  FlaskConical, 
  Tent, 
  AlertCircle, 
  CheckSquare, 
  Send, 
  Sparkles, 
  Clock, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Check,
  ChevronDown
} from 'lucide-react';
import { BookingFormData, SubmissionResult } from '../types';
import { 
  ORGANIZATION_TYPES, 
  SUPPORT_TYPES, 
  DURATION_OPTIONS, 
  SHIFT_OPTIONS, 
  URGENCY_OPTIONS, 
  APP_CONFIG 
} from '../data/copy';
import { formatWhatsAppMessage, generateWhatsAppLink } from '../utils/whatsapp';

interface BookingFormProps {
  onSubmissionSuccess: (result: SubmissionResult) => void;
  googleSheetWebhookUrl?: string;
}

const INITIAL_FORM_STATE: BookingFormData = {
  // 1. Org
  organizationName: '',
  organizationType: 'Hospital',
  organizationAddress: '',
  contactPersonName: '',
  jobTitle: '',
  phoneWhatsapp: '',
  emailAddress: '',

  // 2. Staffing
  professionalNeeded: 'Medical Laboratory Scientist',
  numberOfProfessionals: '1',
  supportTypes: ['Duty shift coverage'],
  startDate: '',
  duration: '1–2 weeks',
  preferredShifts: ['Morning', 'Afternoon'],

  // 3. Assignment
  expectedServices: '',
  majorTests: '',
  equipmentExperience: '',
  workStyle: 'Alongside existing laboratory team',
  additionalResponsibilities: '',

  // 4. Outreach
  isMedicalOutreach: 'No',
  outreachDates: '',
  outreachLocation: '',
  estimatedPatients: '',
  outreachTests: '',
  outreachProfessionalsCount: '',
  accommodationTransport: 'To be discussed',

  // 5. Urgency
  urgency: 'Within 24–48 hours',
  additionalNotes: '',

  // 6. Confirmation
  confirmedAuthorized: false,
};

export const BookingForm: React.FC<BookingFormProps> = ({
  onSubmissionSuccess,
  googleSheetWebhookUrl,
  onOpenGoogleSheetModal,
}) => {
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCheckboxArrayToggle = (
    field: 'supportTypes' | 'preferredShifts',
    value: string
  ) => {
    setFormData((prev) => {
      const current = prev[field];
      const exists = current.includes(value);
      const updated = exists
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const fillDemoData = () => {
    setFormData({
      organizationName: 'St. Jude Specialist Diagnostic Hospital',
      organizationType: 'Hospital',
      organizationAddress: 'Plot 14 Victoria Island Medical Boulevard, Lagos',
      contactPersonName: 'Dr. Kelechi Nwosu',
      jobTitle: 'Chief Medical Laboratory Officer / Lab Manager',
      phoneWhatsapp: '08031234567',
      emailAddress: 'k.nwosu@stjudemedical.org',
      professionalNeeded: 'Medical Laboratory Scientist',
      numberOfProfessionals: '2',
      supportTypes: ['Duty shift coverage', 'Staff leave/absence coverage'],
      startDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      duration: '1–2 weeks',
      preferredShifts: ['Morning', 'Afternoon', 'Night'],
      expectedServices: 'Routine haematology, clinical chemistry sample processing, and blood bank cross-matching for emergency surgical admissions.',
      majorTests: 'FBC with 5-part differential, Electrolytes/Urea/Creatinine, LFT, Lipid Profile, Genotype, Crossmatch, CD4 count.',
      equipmentExperience: 'Mindray BC-5000 5-part hematology analyzer, Cobas c311 chemistry analyzer, and automated coagulation machine.',
      workStyle: 'Alongside existing laboratory team',
      additionalResponsibilities: 'Perform internal QC logging and supervise bench specimens during night call shifts.',
      isMedicalOutreach: 'No',
      urgency: 'Within 24–48 hours',
      additionalNotes: 'Please ensure candidates are familiar with standard LIMS (Laboratory Information Management System) logging.',
      confirmedAuthorized: true,
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }
    if (!formData.organizationAddress.trim()) {
      newErrors.organizationAddress = 'Organization address/location is required';
    }
    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = "Contact person's name is required";
    }
    if (!formData.phoneWhatsapp.trim()) {
      newErrors.phoneWhatsapp = 'Phone/WhatsApp number is required';
    }
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }
    if (!formData.numberOfProfessionals.trim()) {
      newErrors.numberOfProfessionals = 'Number of professionals is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Required start date is required';
    }
    if (!formData.confirmedAuthorized) {
      newErrors.confirmedAuthorized = 'You must confirm that you are authorized to submit this request';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector('.form-error-marker');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    const bookingId = 'LL-' + Math.floor(100000 + Math.random() * 900000);
    const whatsappUrl = generateWhatsAppLink(formData, bookingId);
    const formattedMessage = formatWhatsAppMessage(formData, bookingId);

    let sheetStatus: 'synced' | 'pending' | 'local_only' | 'failed' = 'local_only';
    let sheetMessage = '';

    // If Google Sheet Webhook is configured, POST to it
    if (googleSheetWebhookUrl) {
      try {
        const payload = {
          refId: bookingId,
          ...formData,
        };

        // Try direct fetch with no-cors fallback or server proxy
        await fetch(googleSheetWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        sheetStatus = 'synced';
        sheetMessage = 'Successfully dispatched to your Google Sheet.';
      } catch (err) {
        console.warn('Google Sheet webhook post note:', err);
        sheetStatus = 'pending';
        sheetMessage = 'Request saved. If using Google Sheets, verify Web App permissions.';
      }
    } else {
      sheetStatus = 'local_only';
      sheetMessage = 'Requisition registered and ready for WhatsApp dispatch.';
    }

    // Save to localStorage audit log
    try {
      const existing = JSON.parse(localStorage.getItem('lab_linik_bookings') || '[]');
      existing.unshift({
        id: bookingId,
        timestamp: new Date().toISOString(),
        formData,
        sheetStatus,
      });
      localStorage.setItem('lab_linik_bookings', JSON.stringify(existing.slice(0, 50)));
    } catch {
      // ignore
    }

    setIsSubmitting(false);

    // Automatically open WhatsApp in new tab with pre-filled requisition message
    try {
      window.open(whatsappUrl, '_blank');
    } catch {
      // fallback if popup blocker intercepts
    }

    onSubmissionSuccess({
      id: bookingId,
      timestamp: new Date().toISOString(),
      data: formData,
      whatsappUrl,
      formattedMessage,
      sheetStatus,
      sheetMessage,
    });
  };

  return (
    <section id="booking-form-section" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Title & Top Banner */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Official Locum Requisition
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            BOOK A LOCUM SCIENTIST / TECHNICIAN TODAY
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto">
            Tell us your staffing requirement. Submitting this form creates your structured requisition for immediate WhatsApp dispatch and coordinator assignment.
          </p>

          {/* Quick Demo Requisition Button */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              id="fill-demo-data-btn"
              type="button"
              onClick={fillDemoData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-slate-600 transition-colors shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Sample Requisition (Demo)</span>
            </button>
          </div>
        </div>

        {/* Main Booking Form Card */}
        <form
          id="locum-requisition-form"
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-12"
        >
          {/* SECTION 1: Organization Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-cyan-400" />
                  <span>Organization Details</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Your medical facility and primary contact coordinates
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Organization Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Organization Name <span className="text-rose-400">*</span>
                </label>
                <input
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  required
                  placeholder="e.g. Crestview Diagnostic & Hospital"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                    errors.organizationName ? 'border-rose-500 form-error-marker' : 'border-slate-800'
                  } focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all placeholder:text-slate-600`}
                />
                {errors.organizationName && (
                  <p className="text-xs text-rose-400 mt-1">{errors.organizationName}</p>
                )}
              </div>

              {/* Organization Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Type of Organization <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <select
                    id="organizationType"
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleInputChange}
                    className="w-full appearance-none px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all cursor-pointer"
                  >
                    {ORGANIZATION_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-slate-900 text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Organization Address / Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Organization Address / Location <span className="text-rose-400">*</span>
                </label>
                <input
                  id="organizationAddress"
                  name="organizationAddress"
                  type="text"
                  required
                  placeholder="e.g. Ikeja, Lagos / Garki, Abuja"
                  value={formData.organizationAddress}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                    errors.organizationAddress ? 'border-rose-500 form-error-marker' : 'border-slate-800'
                  } focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all placeholder:text-slate-600`}
                />
                {errors.organizationAddress && (
                  <p className="text-xs text-rose-400 mt-1">{errors.organizationAddress}</p>
                )}
              </div>

              {/* Contact Person Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Contact Person's Name <span className="text-rose-400">*</span>
                </label>
                <input
                  id="contactPersonName"
                  name="contactPersonName"
                  type="text"
                  required
                  placeholder="e.g. Dr. / Mr. / Mrs. Adeniyi"
                  value={formData.contactPersonName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                    errors.contactPersonName ? 'border-rose-500 form-error-marker' : 'border-slate-800'
                  } focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all placeholder:text-slate-600`}
                />
                {errors.contactPersonName && (
                  <p className="text-xs text-rose-400 mt-1">{errors.contactPersonName}</p>
                )}
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Position / Job Title
                </label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  placeholder="e.g. Medical Director / Lab Manager / HR Officer"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Phone / WhatsApp Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Phone / WhatsApp Number <span className="text-rose-400">*</span>
                </label>
                <input
                  id="phoneWhatsapp"
                  name="phoneWhatsapp"
                  type="tel"
                  required
                  placeholder="e.g. 08012345678"
                  value={formData.phoneWhatsapp}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                    errors.phoneWhatsapp ? 'border-rose-500 form-error-marker' : 'border-slate-800'
                  } focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all placeholder:text-slate-600`}
                />
                {errors.phoneWhatsapp && (
                  <p className="text-xs text-rose-400 mt-1">{errors.phoneWhatsapp}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  required
                  placeholder="e.g. lab@crestviewhospital.com"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                    errors.emailAddress ? 'border-rose-500 form-error-marker' : 'border-slate-800'
                  } focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all placeholder:text-slate-600`}
                />
                {errors.emailAddress && (
                  <p className="text-xs text-rose-400 mt-1">{errors.emailAddress}</p>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 2: Staffing Requirement */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-teal-400" />
                  <span>Staffing Requirement</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Role, headcount, duration, dates, and shift preferences
                </p>
              </div>
            </div>

            {/* Professional Needed */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                What professional do you need? <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  'Medical Laboratory Scientist',
                  'Medical Laboratory Technician',
                  'Either / No preference',
                ].map((role) => (
                  <label
                    key={role}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.professionalNeeded === role
                        ? 'bg-cyan-500/15 border-cyan-500 text-white font-semibold shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="professionalNeeded"
                      value={role}
                      checked={formData.professionalNeeded === role}
                      onChange={handleInputChange}
                      className="text-cyan-500 focus:ring-cyan-500 h-4 w-4 bg-slate-900 border-slate-700"
                    />
                    <span className="text-xs sm:text-sm">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* How many professionals */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  How many professionals do you need? <span className="text-rose-400">*</span>
                </label>
                <input
                  id="numberOfProfessionals"
                  name="numberOfProfessionals"
                  type="text"
                  required
                  placeholder="e.g. 1, 2, or 4"
                  value={formData.numberOfProfessionals}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                    errors.numberOfProfessionals ? 'border-rose-500 form-error-marker' : 'border-slate-800'
                  } focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all`}
                />
                {errors.numberOfProfessionals && (
                  <p className="text-xs text-rose-400 mt-1">{errors.numberOfProfessionals}</p>
                )}
              </div>

              {/* When do you need the professional */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  When do you need the professional(s)? <span className="text-rose-400">*</span>
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                    errors.startDate ? 'border-rose-500 form-error-marker' : 'border-slate-800'
                  } focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all text-slate-200`}
                />
                {errors.startDate && (
                  <p className="text-xs text-rose-400 mt-1">{errors.startDate}</p>
                )}
              </div>
            </div>

            {/* What type of support do you need (Checkboxes) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                What type of support do you need? (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {SUPPORT_TYPES.map((type) => {
                  const checked = formData.supportTypes.includes(type);
                  return (
                    <label
                      key={type}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                        checked
                          ? 'bg-teal-500/15 border-teal-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleCheckboxArrayToggle('supportTypes', type)}
                        className="rounded text-teal-500 focus:ring-teal-500 h-4 w-4 bg-slate-900 border-slate-700"
                      />
                      <span className="text-xs">{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* How long will you need the professional (Duration) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                How long will you need the professional(s)?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {DURATION_OPTIONS.map((dur) => (
                  <label
                    key={dur}
                    className={`flex items-center justify-center p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                      formData.duration === dur
                        ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 text-xs'
                    }`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={dur}
                      checked={formData.duration === dur}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="text-xs">{dur}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred shift/work hours */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Preferred Shift / Work Hours
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {SHIFT_OPTIONS.map((shift) => {
                  const checked = formData.preferredShifts.includes(shift);
                  return (
                    <label
                      key={shift}
                      className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        checked
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleCheckboxArrayToggle('preferredShifts', shift)}
                        className="sr-only"
                      />
                      <span className="text-xs">{shift}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 3: Assignment Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-blue-400" />
                  <span>Assignment Details</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Helps Lab Linik match the right specialist with your analyzers and bench workflow
                </p>
              </div>
            </div>

            {/* Lab Services Expected */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                What laboratory services will the professional be expected to perform?
              </label>
              <textarea
                id="expectedServices"
                name="expectedServices"
                rows={2}
                placeholder="e.g. Bench hematology, clinical biochemistry, microbiology culturing, blood transfusion cross-matching..."
                value={formData.expectedServices}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            {/* Major Tests / Services Involved */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                What are the major tests / services involved?
              </label>
              <textarea
                id="majorTests"
                name="majorTests"
                rows={2}
                placeholder="e.g. Full Blood Count, EUCr, Lipid Profile, LFT, Viral screening, Malaria RDT / microscopy, semen analysis..."
                value={formData.majorTests}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            {/* Equipment / Analyser required */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Is experience with any particular equipment, analyser, or laboratory system required?
              </label>
              <textarea
                id="equipmentExperience"
                name="equipmentExperience"
                rows={2}
                placeholder="e.g. Sysmex, Mindray 5-part, Roche Cobas, Chemwell, automated ELISA reader, specific LIMS software..."
                value={formData.equipmentExperience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            {/* Work style: Independent vs Team */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Will the professional be working independently or alongside your existing laboratory team?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  'Working independently',
                  'Alongside existing laboratory team',
                  'Both / Mixed',
                ].map((style) => (
                  <label
                    key={style}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.workStyle === style
                        ? 'bg-blue-500/15 border-blue-500 text-white font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="workStyle"
                      value={style}
                      checked={formData.workStyle === style}
                      onChange={handleInputChange}
                      className="text-blue-500 focus:ring-blue-500 h-4 w-4 bg-slate-900 border-slate-700"
                    />
                    <span className="text-xs">{style}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional responsibilities */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Any additional responsibilities or expectations?
              </label>
              <textarea
                id="additionalResponsibilities"
                name="additionalResponsibilities"
                rows={2}
                placeholder="e.g. Daily QC logging, phlebotomy support during rush hour, handover reporting..."
                value={formData.additionalResponsibilities}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* SECTION 4: Medical Outreach Details (Conditional / Expandable) */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                4
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <Tent className="w-5 h-5 text-emerald-400" />
                    <span>Medical Outreach Details</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    Optional / Outreach Specific
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Complete this section if your staffing request is for field screenings or outreach missions
                </p>
              </div>
            </div>

            {/* Is this for medical outreach? */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Is this request for a medical outreach?
              </label>
              <div className="flex items-center gap-4">
                {['No', 'Yes'].map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border cursor-pointer transition-all ${
                      formData.isMedicalOutreach === opt
                        ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="isMedicalOutreach"
                      value={opt}
                      checked={formData.isMedicalOutreach === opt}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="text-xs font-semibold">{opt === 'Yes' ? 'Yes, Medical Outreach' : 'No (Standard Facility)'}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Expandable Outreach Fields */}
            {formData.isMedicalOutreach === 'Yes' && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Outreach Date(s)
                    </label>
                    <input
                      type="text"
                      name="outreachDates"
                      placeholder="e.g. October 12–14, 2026"
                      value={formData.outreachDates || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Outreach Location
                    </label>
                    <input
                      type="text"
                      name="outreachLocation"
                      placeholder="e.g. Community Centre, Ikorodu / Epe Town Hall"
                      value={formData.outreachLocation || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Estimated Number of Patients / Participants
                    </label>
                    <input
                      type="text"
                      name="estimatedPatients"
                      placeholder="e.g. 300–500 patients"
                      value={formData.estimatedPatients || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Number of Laboratory Professionals Required
                    </label>
                    <input
                      type="text"
                      name="outreachProfessionalsCount"
                      placeholder="e.g. 3 Scientists, 2 Technicians"
                      value={formData.outreachProfessionalsCount || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Tests / Services To Be Provided in Field
                  </label>
                  <textarea
                    name="outreachTests"
                    rows={2}
                    placeholder="e.g. Rapid Malaria, Random Blood Sugar, Hepatitis B/C screening, Blood Pressure, Urinalysis..."
                    value={formData.outreachTests || ''}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Will accommodation / transportation be provided if required?
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {['Yes', 'No', 'To be discussed'].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border cursor-pointer text-xs ${
                          formData.accommodationTransport === opt
                            ? 'bg-emerald-500/20 border-emerald-400 text-white font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="accommodationTransport"
                          value={opt}
                          checked={formData.accommodationTransport === opt}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 5: Urgency & Additional Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold">
                5
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-400" />
                  <span>Urgency & Additional Information</span>
                </h3>
                <p className="text-xs text-slate-400">
                  How swiftly do you need our locum staff deployed?
                </p>
              </div>
            </div>

            {/* Urgency Level Options */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                How urgent is your request?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {URGENCY_OPTIONS.map((opt) => {
                  const isSelected = formData.urgency === opt.label;
                  return (
                    <label
                      key={opt.label}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-rose-500/15 border-rose-400 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={opt.label}
                        checked={isSelected}
                        onChange={handleInputChange}
                        className="text-rose-500 focus:ring-rose-500 h-4 w-4 bg-slate-900 border-slate-700 mt-0.5"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {opt.label}
                          </span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-rose-300">
                            {opt.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {opt.desc}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Anything else we should know */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Is there anything else we should know about your requirement?
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows={3}
                placeholder="Any special dress codes, specific shift handover guidelines, or lab policy preferences..."
                value={formData.additionalNotes}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm outline-none transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* SECTION 6: Confirmation & Final Action */}
          <div className="space-y-6 pt-4 border-t border-slate-800">
            {/* Required Authorization Checkbox */}
            <div className={`p-4 rounded-xl border ${
              errors.confirmedAuthorized ? 'border-rose-500 bg-rose-950/20 form-error-marker' : 'border-slate-800 bg-slate-950/60'
            }`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  id="confirmedAuthorized"
                  name="confirmedAuthorized"
                  type="checkbox"
                  checked={formData.confirmedAuthorized}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, confirmedAuthorized: e.target.checked }));
                    if (errors.confirmedAuthorized) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.confirmedAuthorized;
                        return next;
                      });
                    }
                  }}
                  className="rounded text-cyan-500 focus:ring-cyan-500 h-5 w-5 bg-slate-900 border-slate-700 mt-0.5 shrink-0"
                />
                <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  I confirm that the information provided is accurate and that I am authorized to make this staffing request on behalf of the organization.
                </span>
              </label>
              {errors.confirmedAuthorized && (
                <p className="text-xs text-rose-400 mt-2 font-medium">
                  {errors.confirmedAuthorized}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="space-y-3">
              <button
                id="submit-locum-request-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg tracking-wide uppercase bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>RECORDING & PREPARING DISPATCH...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>SUBMIT LOCUM REQUEST</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400">
                After submission, your request will be prepared for instant WhatsApp dispatch to <strong>{APP_CONFIG.whatsappNumber}</strong> and recorded to Google Sheets.
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
