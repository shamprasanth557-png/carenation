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

export const api = {
  // Health
  async getHealth() {
    const res = await fetch('/api/health');
    return res.json();
  },

  // Hospitals
  async getHospitals(query?: string, type?: string): Promise<Hospital[]> {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (type) params.append('type', type);
    const res = await fetch(`/api/hospitals?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to load hospitals');
    return res.json();
  },

  // First Aid
  async getFirstAidTopics(): Promise<FirstAidTopic[]> {
    const res = await fetch('/api/first-aid');
    if (!res.ok) throw new Error('Failed to load first aid topics');
    return res.json();
  },

  // Doctors
  async getDoctors(query?: string, specialty?: string): Promise<Doctor[]> {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (specialty) params.append('specialty', specialty);
    const res = await fetch(`/api/doctors?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to load doctors');
    return res.json();
  },

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    const res = await fetch('/api/appointments');
    if (!res.ok) throw new Error('Failed to load appointments');
    return res.json();
  },

  async createAppointment(data: {
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
  }): Promise<{ message: string; appointment: Appointment }> {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to submit appointment request');
    return result;
  },

  async cancelAppointment(id: string): Promise<void> {
    const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to cancel appointment');
  },

  // Insurance
  async getInsurancePlans(): Promise<InsurancePlan[]> {
    const res = await fetch('/api/insurance/plans');
    if (!res.ok) throw new Error('Failed to load insurance plans');
    return res.json();
  },

  async getInsuranceApplications(): Promise<InsuranceApplication[]> {
    const res = await fetch('/api/insurance/applications');
    if (!res.ok) throw new Error('Failed to load insurance requests');
    return res.json();
  },

  async submitInsuranceApplication(data: {
    planId: string;
    planNameEn: string;
    planNameTa: string;
    applicantName: string;
    applicantPhone: string;
    applicantAadhaarOrId: string;
    district: string;
    familyMembersCount: number;
  }): Promise<{ message: string; application: InsuranceApplication }> {
    const res = await fetch('/api/insurance/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to submit insurance application');
    return result;
  },

  // Medicine Reminders
  async getReminders(): Promise<MedicineReminder[]> {
    const res = await fetch('/api/reminders');
    if (!res.ok) throw new Error('Failed to load medicine reminders');
    return res.json();
  },

  async createReminder(data: {
    medicineName: string;
    dosage: string;
    timeSlot: string;
    mealRelation: 'before_meal' | 'after_meal' | 'with_meal' | 'anytime';
    daysSchedule: string;
  }): Promise<MedicineReminder> {
    const res = await fetch('/api/reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create reminder');
    return result;
  },

  async updateReminderStatus(id: string, status: 'pending' | 'taken' | 'skipped'): Promise<MedicineReminder> {
    const res = await fetch(`/api/reminders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  async deleteReminder(id: string): Promise<void> {
    const res = await fetch(`/api/reminders/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete reminder');
  },

  // Emergency Contacts
  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    const res = await fetch('/api/emergency-contacts');
    if (!res.ok) throw new Error('Failed to load emergency contacts');
    return res.json();
  },

  // Symptom Check
  async checkSymptoms(payload: { symptoms: string[]; ageGroup: string; duration: string }) {
    const res = await fetch('/api/symptom-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to process symptom check');
    return res.json();
  }
};
