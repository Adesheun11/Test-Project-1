/**
 * Google Apps Script for Lab Linik Services
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Rename Sheet or leave as "Sheet1"
 * 3. In the top menu, go to: Extensions -> Apps Script
 * 4. Delete any code in Code.gs and PASTE this entire script
 * 5. Click "Save" (disk icon)
 * 6. Click "Deploy" -> "New deployment"
 * 7. Click the gear icon (Select type) -> Choose "Web app"
 * 8. Description: "Lab Linik Booking Webhook"
 * 9. Execute as: "Me (your email)"
 * 10. Who has access: "Anyone" (Critical so the form can POST data)
 * 11. Click "Deploy", Authorize access if prompted, and COPY the "Web App URL"
 * 12. Paste your Web App URL into the Lab Linik Settings modal!
 */

export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * Lab Linik Services - Google Sheet Auto-Sync Script
 * Automatically receives and records all locum booking requests into your Google Sheet.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();
    
    // Parse the incoming JSON data
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    
    // Check if headers exist; if not, create them
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Booking Ref",
        "Organization Name",
        "Organization Type",
        "Location / Address",
        "Contact Person",
        "Job Title",
        "Phone / WhatsApp",
        "Email Address",
        "Professional Needed",
        "No. of Staff",
        "Support Types",
        "Required Start Date",
        "Duration",
        "Preferred Shifts",
        "Expected Services",
        "Major Tests",
        "Equipment / Analysers",
        "Work Style",
        "Additional Responsibilities",
        "Is Medical Outreach?",
        "Outreach Dates",
        "Outreach Location",
        "Outreach Patients Est.",
        "Outreach Tests",
        "Outreach Staff Needed",
        "Accommodation / Transport",
        "Urgency Level",
        "Additional Notes",
        "Authorization Confirmed"
      ];
      
      sheet.appendRow(headers);
      
      // Format header row (Deep Navy background, white bold text)
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0A2540");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    var timestamp = new Date();
    var refId = data.refId || "LL-" + Math.floor(100000 + Math.random() * 900000);
    
    // Build row values
    var row = [
      timestamp,
      refId,
      data.organizationName || "",
      data.organizationType || "",
      data.organizationAddress || "",
      data.contactPersonName || "",
      data.jobTitle || "",
      data.phoneWhatsapp || "",
      data.emailAddress || "",
      data.professionalNeeded || "",
      data.numberOfProfessionals || "1",
      Array.isArray(data.supportTypes) ? data.supportTypes.join(", ") : (data.supportTypes || ""),
      data.startDate || "",
      data.duration || "",
      Array.isArray(data.preferredShifts) ? data.preferredShifts.join(", ") : (data.preferredShifts || ""),
      data.expectedServices || "",
      data.majorTests || "",
      data.equipmentExperience || "",
      data.workStyle || "",
      data.additionalResponsibilities || "",
      data.isMedicalOutreach || "No",
      data.outreachDates || "",
      data.outreachLocation || "",
      data.estimatedPatients || "",
      data.outreachTests || "",
      data.outreachProfessionalsCount || "",
      data.accommodationTransport || "",
      data.urgency || "",
      data.additionalNotes || "",
      data.confirmedAuthorized ? "YES" : "NO"
    ];
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "Locum request successfully recorded to Google Sheet",
      "refId": refId
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    "status": "ready",
    "message": "Lab Linik Google Apps Script endpoint is live and accepting POST requests."
  })).setMimeType(ContentService.MimeType.JSON);
}
`;
