import { verifiedHospitals } from '../data/hospitalsData';
import { firstAidTopics } from '../data/firstAidData';
import { verifiedDoctors } from '../data/doctorsData';
import { verifiedInsurancePlans } from '../data/insuranceData';
import { emergencyContacts } from '../data/emergencyData';
import {
  Hospital,
  FirstAidTopic,
  Doctor,
  Appointment,
  InsurancePlan,
  InsuranceApplication,
  MedicineReminder,
  EmergencyContact
} from '../types';

// In-memory data store with verified seed data
class CareNationDatabase {
  private hospitals: Hospital[] = [...verifiedHospitals];
  private firstAid: FirstAidTopic[] = [...firstAidTopics];
  private doctors: Doctor[] = [...verifiedDoctors];
  private insurancePlans: InsurancePlan[] = [...verifiedInsurancePlans];
  private emergencyContactsList: EmergencyContact[] = [...emergencyContacts];

  private appointments: Appointment[] = [
    {
      id: 'apt-sample-1',
      doctorId: 'doc-1',
      doctorNameEn: 'Dr. R. Senthil Nathan, MD, DM',
      doctorNameTa: 'டாக்டர் ஆர். செந்தில் நாதன், MD, DM',
      specialtyEn: 'Cardiology (Heart Care)',
      specialtyTa: 'இதயவியல் (இதய சிகிச்சை)',
      patientName: 'Kavitha R',
      patientPhone: '9842100000',
      appointmentDate: '2026-10-14',
      appointmentTime: '10:30 AM',
      reason: 'Routine cardiac wellness check and ECG review',
      status: 'Demonstration Confirmed',
      disclaimerEn: 'Demonstration appointment record. Not confirmed by private clinic ERP.',
      disclaimerTa: 'மாதிரி முன்பதிவு பதிவு. மருத்துவமனை நேரடி கணினியுடன் இணைக்கப்படவில்லை.',
      createdAt: new Date().toISOString()
    }
  ];

  private insuranceApplications: InsuranceApplication[] = [
    {
      id: 'app-sample-1',
      planId: 'plan-cmchis',
      planNameEn: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS)",
      planNameTa: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம் (CMCHIS)',
      applicantName: 'Muthusamy K',
      applicantPhone: '9443200000',
      applicantAadhaarOrId: '3301XXXXXXXX',
      district: 'Coimbatore',
      familyMembersCount: 4,
      status: 'Under review by CareNation',
      submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      internalNotes: 'Verification of VAO income certificate pending.'
    }
  ];

  private reminders: MedicineReminder[] = [
    {
      id: 'rem-1',
      medicineName: 'Paracetamol 500mg',
      dosage: '1 Tablet',
      timeSlot: '08:30 AM',
      mealRelation: 'after_meal',
      daysSchedule: 'Daily',
      status: 'taken',
      createdAt: new Date().toISOString()
    },
    {
      id: 'rem-2',
      medicineName: 'Metformin 500mg',
      dosage: '1 Tablet',
      timeSlot: '08:00 PM',
      mealRelation: 'with_meal',
      daysSchedule: 'Daily',
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  ];

  // Hospitals
  getHospitals(): Hospital[] {
    return this.hospitals;
  }

  getHospitalById(id: string): Hospital | undefined {
    return this.hospitals.find(h => h.id === id);
  }

  // First Aid
  getFirstAidTopics(): FirstAidTopic[] {
    return this.firstAid;
  }

  getFirstAidById(id: string): FirstAidTopic | undefined {
    return this.firstAid.find(f => f.id === id);
  }

  // Doctors
  getDoctors(): Doctor[] {
    return this.doctors;
  }

  getDoctorById(id: string): Doctor | undefined {
    return this.doctors.find(d => d.id === id);
  }

  // Appointments
  getAppointments(): Appointment[] {
    return this.appointments;
  }

  createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'disclaimerEn' | 'disclaimerTa'>): Appointment {
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...data,
      status: 'Submitted',
      disclaimerEn: 'Demonstration appointment request — not confirmed by a healthcare provider.',
      disclaimerTa: 'மாதிரி முன்பதிவு கோரிக்கை — மருத்துவமனை அங்கீகாரத்துடன் இன்னும் இணைக்கப்படவில்லை.',
      createdAt: new Date().toISOString()
    };
    this.appointments.unshift(newAppointment);
    return newAppointment;
  }

  deleteAppointment(id: string): boolean {
    const initialLen = this.appointments.length;
    this.appointments = this.appointments.filter(a => a.id !== id);
    return this.appointments.length < initialLen;
  }

  // Insurance
  getInsurancePlans(): InsurancePlan[] {
    return this.insurancePlans;
  }

  getInsurancePlanById(id: string): InsurancePlan | undefined {
    return this.insurancePlans.find(p => p.id === id);
  }

  getInsuranceApplications(): InsuranceApplication[] {
    return this.insuranceApplications;
  }

  createInsuranceApplication(data: Omit<InsuranceApplication, 'id' | 'submittedAt' | 'status' | 'internalNotes'>): InsuranceApplication {
    const newApp: InsuranceApplication = {
      id: `ins-app-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...data,
      status: 'Submitted',
      submittedAt: new Date().toISOString(),
      internalNotes: 'Initial application submitted via CareNation student portal. Awaiting internal check.'
    };
    this.insuranceApplications.unshift(newApp);
    return newApp;
  }

  // Medicine Reminders
  getReminders(): MedicineReminder[] {
    return this.reminders;
  }

  createReminder(data: Omit<MedicineReminder, 'id' | 'createdAt' | 'status'>): MedicineReminder {
    const newRem: MedicineReminder = {
      id: `rem-${Date.now()}`,
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.reminders.push(newRem);
    return newRem;
  }

  updateReminderStatus(id: string, status: 'pending' | 'taken' | 'skipped'): MedicineReminder | null {
    const rem = this.reminders.find(r => r.id === id);
    if (!rem) return null;
    rem.status = status;
    return rem;
  }

  deleteReminder(id: string): boolean {
    const initLen = this.reminders.length;
    this.reminders = this.reminders.filter(r => r.id !== id);
    return this.reminders.length < initLen;
  }

  // Emergency Contacts
  getEmergencyContacts(): EmergencyContact[] {
    return this.emergencyContactsList;
  }
}

export const db = new CareNationDatabase();
