export type Language = 'en' | 'ta';

export interface Hospital {
  id: string;
  nameEn: string;
  nameTa: string;
  type: 'Government' | 'Trust / Non-Profit' | 'Private Multi-Specialty';
  city: string;
  addressEn: string;
  addressTa: string;
  phone: string;
  emergencyPhone: string;
  specialtiesEn: string[];
  specialtiesTa: string[];
  facilitiesEn: string[];
  facilitiesTa: string[];
  verifiedStatus: boolean;
  verifiedSource: string;
  verifiedDate: string;
  mapLink: string;
  liveBedStatusNoteEn: string;
  liveBedStatusNoteTa: string;
}

export interface FirstAidTopic {
  id: string;
  titleEn: string;
  titleTa: string;
  iconName: string;
  overviewEn: string;
  overviewTa: string;
  warningSignsEn: string[];
  warningSignsTa: string[];
  stepsEn: string[];
  stepsTa: string[];
  dontsEn: string[];
  dontsTa: string[];
  whenToCall108En: string;
  whenToCall108Ta: string;
  medicalSource: string;
  voiceScriptEn: string;
  voiceScriptTa: string;
}

export interface Doctor {
  id: string;
  nameEn: string;
  nameTa: string;
  specialtyEn: string;
  specialtyTa: string;
  hospitalNameEn: string;
  hospitalNameTa: string;
  qualification: string;
  experienceYears: number;
  availableDaysEn: string;
  availableDaysTa: string;
  availableSlots: string[];
  consultationFee: string;
  consultationType: 'In-Person Consultation' | 'Demonstration Teleconsultation';
  isDemoRecord: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorNameEn: string;
  doctorNameTa: string;
  specialtyEn: string;
  specialtyTa: string;
  patientName: string;
  patientPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  status: 'Submitted' | 'Demonstration Confirmed' | 'Cancelled';
  disclaimerEn: string;
  disclaimerTa: string;
  createdAt: string;
}

export interface InsurancePlan {
  id: string;
  nameEn: string;
  nameTa: string;
  providerEn: string;
  providerTa: string;
  category: 'Government Health Scheme' | 'Public Health Insurance' | 'Private Comprehensive';
  sumInsuredEn: string;
  sumInsuredTa: string;
  premiumEn: string;
  premiumTa: string;
  eligibilityEn: string;
  eligibilityTa: string;
  benefitsEn: string[];
  benefitsTa: string[];
  waitingPeriodEn: string;
  waitingPeriodTa: string;
  officialSourceUrl: string;
  verifiedSource: string;
}

export interface InsuranceApplication {
  id: string;
  planId: string;
  planNameEn: string;
  planNameTa: string;
  applicantName: string;
  applicantPhone: string;
  applicantAadhaarOrId: string;
  district: string;
  familyMembersCount: number;
  status: 'Submitted' | 'Under review by CareNation' | 'More information required' | 'Completed by CareNation' | 'Cancelled';
  submittedAt: string;
  internalNotes: string;
}

export interface MedicineReminder {
  id: string;
  medicineName: string;
  dosage: string;
  timeSlot: string; // e.g. "08:00 AM"
  mealRelation: 'before_meal' | 'after_meal' | 'with_meal' | 'anytime';
  daysSchedule: string; // e.g. "Daily"
  status: 'pending' | 'taken' | 'skipped';
  createdAt: string;
}

export interface EmergencyContact {
  id: string;
  titleEn: string;
  titleTa: string;
  number: string;
  descriptionEn: string;
  descriptionTa: string;
  isGovernmentService: boolean;
}
