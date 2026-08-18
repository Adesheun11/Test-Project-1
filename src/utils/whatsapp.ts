import { BookingFormData } from '../types';
import { APP_CONFIG } from '../data/copy';

export function formatWhatsAppMessage(data: BookingFormData, bookingId: string): string {
  const lines: string[] = [
    `🔬 *NEW LOCUM STAFFING REQUEST — LAB LINIK*`,
    `Ref ID: *#${bookingId}*`,
    `────────────────────────`,
    `🏢 *ORGANIZATION DETAILS*`,
    `• *Organization:* ${data.organizationName || 'N/A'}`,
    `• *Type:* ${data.organizationType || 'N/A'}`,
    `• *Location/Address:* ${data.organizationAddress || 'N/A'}`,
    `• *Contact Person:* ${data.contactPersonName || 'N/A'}${data.jobTitle ? ` (${data.jobTitle})` : ''}`,
    `• *Phone/WhatsApp:* ${data.phoneWhatsapp || 'N/A'}`,
    `• *Email:* ${data.emailAddress || 'N/A'}`,
    ``,
    `👨‍🔬 *STAFFING REQUIREMENT*`,
    `• *Role Needed:* ${data.professionalNeeded}`,
    `• *Number of Staff:* ${data.numberOfProfessionals}`,
    `• *Support Type:* ${data.supportTypes.length > 0 ? data.supportTypes.join(', ') : 'Not specified'}`,
    `• *Required Start Date:* ${data.startDate || 'Immediate / Flexible'}`,
    `• *Duration:* ${data.duration || 'Not specified'}`,
    `• *Shift/Hours:* ${data.preferredShifts.length > 0 ? data.preferredShifts.join(', ') : 'Not specified'}`,
    ``,
    `⚙️ *ASSIGNMENT DETAILS*`,
    `• *Lab Services Expected:* ${data.expectedServices || 'General laboratory duties'}`,
    `• *Major Tests Involved:* ${data.majorTests || 'Routine & specialized diagnostics'}`,
    `• *Required Equipment/Analyser:* ${data.equipmentExperience || 'Standard bench analyzers'}`,
    `• *Work Style:* ${data.workStyle || 'Standard'}`,
    data.additionalResponsibilities ? `• *Additional Tasks:* ${data.additionalResponsibilities}` : '',
  ].filter(Boolean);

  if (data.isMedicalOutreach === 'Yes') {
    lines.push(
      ``,
      `🏕️ *MEDICAL OUTREACH DETAILS*`,
      `• *Outreach Dates:* ${data.outreachDates || 'TBD'}`,
      `• *Outreach Location:* ${data.outreachLocation || 'TBD'}`,
      `• *Estimated Patients:* ${data.estimatedPatients || 'N/A'}`,
      `• *Tests To Provide:* ${data.outreachTests || 'N/A'}`,
      `• *Outreach Staff Count:* ${data.outreachProfessionalsCount || 'N/A'}`,
      `• *Logistics/Accommodation:* ${data.accommodationTransport || 'To be discussed'}`
    );
  }

  lines.push(
    ``,
    `🚨 *URGENCY & NOTES*`,
    `• *Urgency Level:* ${data.urgency}`,
    data.additionalNotes ? `• *Special Notes:* ${data.additionalNotes}` : '',
    ``,
    `✅ *Authorization:* Confirmed by organization representative`,
    `────────────────────────`,
    `_Sent via Lab Linik Services Online Booking Portal_`
  );

  return lines.filter(line => line !== '').join('\n');
}

export function generateWhatsAppLink(data: BookingFormData, bookingId: string): string {
  const text = formatWhatsAppMessage(data, bookingId);
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${APP_CONFIG.whatsappInternational}?text=${encoded}`;
}
