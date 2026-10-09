import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Building2,
  RefreshCw,
  Plus,
  Info
} from 'lucide-react';
import { Appointment } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface AppointmentsListProps {
  onNewBookingClick: () => void;
}

export const AppointmentsList: React.FC<AppointmentsListProps> = ({ onNewBookingClick }) => {
  const { t, isTamil } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await api.getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm(isTamil ? 'இந்த மாதிரி முன்பதிவை ரத்து செய்ய வேண்டுமா?' : 'Cancel this demonstration appointment request?')) {
      return;
    }
    try {
      setCancellingId(id);
      await api.cancelAppointment(id);
      setAppointments(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      alert('Failed to cancel appointment');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-2">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>{isTamil ? 'சேமிக்கப்பட்ட மருத்துவ சந்திப்புகள்' : 'Saved CareNation Appointments'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.doctors.myAppointmentsTitle}
          </h2>
          <p className="mt-1 text-slate-600 text-xs sm:text-sm">
            {isTamil
              ? 'உங்கள் முன்பதிவு கோரிக்கைகள் சர்வர் தரவுத்தளத்தில் சேமிக்கப்பட்டு கண்காணிக்கப்படுகின்றன.'
              : 'Appointments recorded in the backend database store. Clear demonstration status maintained.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadAppointments}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
            title="Refresh appointments"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onNewBookingClick}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isTamil ? 'புதிய முன்பதிவு' : 'New Appointment'}</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">
          <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          {t.common.loading}
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-14 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-slate-800">{t.doctors.noAppointments}</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {isTamil
                ? 'மருத்துவர் வழிகாட்டி பக்கத்திற்குச் சென்று தேவையான மருத்துவரை தேர்வு செய்து முன்பதிவு செய்யவும்.'
                : 'Browse our Coimbatore doctor directory to submit your first demo appointment.'}
            </p>
          </div>
          <button
            onClick={onNewBookingClick}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs cursor-pointer shadow-xs inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{isTamil ? 'மருத்துவரை தேர்வு செய்க' : 'Browse Doctors'}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => {
            const docName = isTamil ? apt.doctorNameTa : apt.doctorNameEn;
            const spec = isTamil ? apt.specialtyTa : apt.specialtyEn;

            return (
              <div
                key={apt.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-teal-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                        apt.status === 'Cancelled'
                          ? 'bg-red-100 text-red-800'
                          : apt.status === 'Demonstration Confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {apt.status}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ID: <span className="font-mono text-slate-600">{apt.id}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{docName}</h3>
                  <div className="text-xs text-teal-700 font-semibold">{spec}</div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1.5 text-xs text-slate-600 pt-2">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{apt.patientName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>+91 {apt.patientPhone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>{apt.appointmentDate} at {apt.appointmentTime}</span>
                    </div>
                  </div>

                  {apt.reason && (
                    <div className="text-xs text-slate-500 italic pt-1">
                      Reason: "{apt.reason}"
                    </div>
                  )}

                  {/* Mandatory transparency tag */}
                  <div className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60 inline-flex items-center gap-1.5">
                    <Info className="w-3 h-3 text-amber-600 shrink-0" />
                    <span>{isTamil ? apt.disclaimerTa : apt.disclaimerEn}</span>
                  </div>
                </div>

                <div className="shrink-0 self-end md:self-center">
                  <button
                    onClick={() => handleCancel(apt.id)}
                    disabled={cancellingId === apt.id}
                    className="px-3.5 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.common.cancel}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
