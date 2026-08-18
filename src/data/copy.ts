export const APP_CONFIG = {
  name: 'LAB LINIK SERVICES',
  tagline: 'Reliable Locum Medical Laboratory Professionals — When You Need Them Most.',
  phone: '08165686093',
  whatsappNumber: '08165686093',
  whatsappInternational: '2348165686093',
  formattedPhone: '+234 816 568 6093',
  email: 'contact@lablinik.com',
  heroImage: '/src/assets/images/lab_hero_banner_1787044826436.jpg',
  outreachImage: '/src/assets/images/sleek_lab_outreach_1787045851694.jpg',
  googleSheetWebhookUrl: 'https://script.google.com/macros/s/AKfycbzXiEFDhdIzuj0z8WNON_cgwFrPbc1G5wQt3e_yUbRPAzrjsWAzPYiu6Z1Vw5datz7U/exec',
};

export const ORGANIZATION_TYPES = [
  'Hospital',
  'Diagnostic Centre/Laboratory',
  'Clinic/Medical Centre',
  'Research Institution',
  'NGO',
  'Medical Outreach Organization',
  'Other',
];

export const SUPPORT_TYPES = [
  'Duty shift coverage',
  'Staff leave/absence coverage',
  'Temporary additional staff',
  'Emergency/urgent coverage',
  'Medical outreach',
  'Health screening',
  'Other',
];

export const DURATION_OPTIONS = [
  '1 day',
  '2–3 days',
  '4–7 days',
  '1–2 weeks',
  '1 month',
  '2–3 months',
  '3–6 months',
  '6+ months',
  'Other',
];

export const SHIFT_OPTIONS = [
  'Morning',
  'Afternoon',
  'Night',
  '24-hour/Full day',
  'Flexible',
  'Other',
];

export const URGENCY_OPTIONS = [
  {
    label: 'Emergency — need someone as soon as possible',
    tag: 'Urgent Dispatch',
    desc: 'Immediate standby activation for critical staffing voids',
  },
  {
    label: 'Within 24–48 hours',
    tag: 'Fast Track',
    desc: 'Next-day locum deployment and shift handover',
  },
  {
    label: 'Within 3–7 days',
    tag: 'Planned Cover',
    desc: 'Scheduled leave or upcoming routine coverage',
  },
  {
    label: 'More than 1 week in advance',
    tag: 'Advance Booking',
    desc: 'Outreach campaigns and seasonal project staffing',
  },
];

export const TARGET_FACILITIES = [
  'Hospitals',
  'Diagnostic Laboratories & Centres',
  'Medical Centres & Clinics',
  'Private Healthcare Facilities',
  'Research & Medical Institutions',
  'NGOs & Healthcare Organizations',
  'Medical Outreach Programmes',
  'Health Screening & Community Health Events',
  'Any healthcare organization requiring temporary laboratory personnel',
];

export const CONSEQUENCES_OF_SHORT_STAFFING = [
  {
    title: 'Longer waiting times',
    desc: 'Bottlenecks in specimen reception and sample accessioning frustrate patients and clinicians.',
  },
  {
    title: 'Overworked laboratory personnel',
    desc: 'Staff fatigue multiplies human error rates and burns out your core medical team.',
  },
  {
    title: 'Delayed testing and reporting',
    desc: 'Critical TAT (Turnaround Time) targets slip, stalling clinical diagnoses and inpatient decisions.',
  },
  {
    title: 'Disrupted workflow',
    desc: 'Uncovered shifts cause bench backlog and calibration/maintenance schedule lapses.',
  },
  {
    title: 'Reduced patient satisfaction',
    desc: 'Reputation damage and revenue loss as patients seek faster diagnostic alternatives.',
  },
];
