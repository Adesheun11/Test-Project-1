export interface BookingFormData {
  // 1. Organization Details
  organizationName: string;
  organizationType: string;
  organizationAddress: string;
  contactPersonName: string;
  jobTitle: string;
  phoneWhatsapp: string;
  emailAddress: string;

  // 2. Staffing Requirement
  professionalNeeded: 'Medical Laboratory Scientist' | 'Medical Laboratory Technician' | 'Either / No preference';
  numberOfProfessionals: string;
  supportTypes: string[];
  startDate: string;
  duration: string;
  preferredShifts: string[];

  // 3. Assignment Details
  expectedServices: string;
  majorTests: string;
  equipmentExperience: string;
  workStyle: 'Working independently' | 'Alongside existing laboratory team' | 'Both / Mixed' | string;
  additionalResponsibilities: string;

  // 4. Medical Outreach Details
  isMedicalOutreach: 'Yes' | 'No';
  outreachDates?: string;
  outreachLocation?: string;
  estimatedPatients?: string;
  outreachTests?: string;
  outreachProfessionalsCount?: string;
  accommodationTransport?: 'Yes' | 'No' | 'To be discussed';

  // 5. Urgency & Additional Information
  urgency: 'Emergency — need someone as soon as possible' | 'Within 24–48 hours' | 'Within 3–7 days' | 'More than 1 week in advance';
  additionalNotes: string;

  // 6. Confirmation
  confirmedAuthorized: boolean;
}

export interface SubmissionResult {
  id: string;
  timestamp: string;
  data: BookingFormData;
  whatsappUrl: string;
  formattedMessage: string;
  sheetStatus: 'synced' | 'pending' | 'local_only' | 'failed';
  sheetMessage?: string;
}
