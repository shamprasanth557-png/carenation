import React, { useState, useEffect } from 'react';
import {
  Stethoscope,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Building2,
  Info,
  ChevronRight,
  ListOrdered
} from 'lucide-react';
import { Doctor, Appointment } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface DoctorFinderProps {
  onViewAppointments: () => void;
}

export const DoctorFinder: React.FC<DoctorFinderProps> = ({ onViewAppointments }) => {
  const { t, isTamil } = useLanguage();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');

  // Booking Modal State
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [appointmentTime, setAppointmentTime] = useState<string>('10:00 AM');
  const [reason, setReason] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadDoctors();
  }, [searchQuery, specialtyFilter]);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const data = await api.getDoctors(searchQuery, specialtyFilter);
      setDoctors(data);
    } catch (err) {
      console.error('Failed to load doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenBooking = (doc: Doctor) => {
    setBookingDoctor(doc);
    setAppointmentTime(doc.availableSlots[0] || '10:00 AM');
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDoctor) return;

    if (!patientName.trim()) {
      setSubmitError(isTamil ? 'நோயாளி பெயரை உள்ளிடவும்' : 'Please enter patient name');
      return;
    }

    const cleanPhone = patientPhone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setSubmitError(
        isTamil
          ? 'சரியான 10 இலக்க இந்திய தொலைபேசி எண்ணை உள்ளிடவும் (6, 7, 8, அல்லது 9-ல் தொடங்க வேண்டும்)'
          : 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9'
      );
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      await api.createAppointment({
        doctorId: bookingDoctor.id,
        doctorNameEn: bookingDoctor.nameEn,
        doctorNameTa: bookingDoctor.nameTa,
        specialtyEn: bookingDoctor.specialtyEn,
        specialtyTa: bookingDoctor.specialtyTa,
        patientName: patientName.trim(),
        patientPhone: cleanPhone,
        appointmentDate,
        appointmentTime,
        reason: reason.trim() || 'General health consultation'
      });

      setSubmitSuccess(t.doctors.bookingSuccess);
      setTimeout(() => {
        setBookingDoctor(null);
        setPatientName('');
        setPatientPhone('');
        setReason('');
        setSubmitSuccess(null);
        onViewAppointments();
      }, 1800);
    } catch (err: any) {
      setSubmitError(err.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>{isTamil ? 'கோயம்புத்தூர் சிறப்பு மருத்துவர்கள் பட்டியல்' : 'Coimbatore Specialists Directory'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.doctors.title}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
              {t.doctors.subtitle}
            </p>
          </div>

          <button
            onClick={onViewAppointments}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ListOrdered className="w-4 h-4 text-teal-600" />
            <span>{t.doctors.viewAppointments}</span>
          </button>
        </div>

        {/* Demo Notice Banner */}
        <div className="mt-4 p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-900 leading-relaxed">
            <span className="font-bold text-blue-950 block mb-0.5">
              {isTamil ? 'மாதிரி முன்பதிவு நெறிமுறை அறிவிப்பு: ' : 'Demonstration Workflow Notice: '}
            </span>
            {t.doctors.demoNotice}
          </div>
        </div>

        {/* Search & Specialty Filter */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.doctors.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50"
            />
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50 appearance-none text-slate-700 font-medium"
            >
              <option value="all">{t.doctors.allSpecialties}</option>
              <option value="Cardiology">Cardiology (இதயவியல்)</option>
              <option value="Orthopaedics">Orthopaedics (எலும்பியல்)</option>
              <option value="Pediatrics">Pediatrics (குழந்தைகள் நலம்)</option>
              <option value="Neurology">Neurology (நரம்பியல்)</option>
              <option value="Obstetrics">Obstetrics & Gynaecology (மகப்பேறு)</option>
              <option value="Surgery">General Surgery (அறுவை சிகிச்சை)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-500">
          <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          {t.common.loading}
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <Stethoscope className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-slate-600 text-sm font-medium">{t.common.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {doctors.map((doc) => {
            const docName = isTamil ? doc.nameTa : doc.nameEn;
            const specialty = isTamil ? doc.specialtyTa : doc.specialtyEn;
            const hospital = isTamil ? doc.hospitalNameTa : doc.hospitalNameEn;
            const days = isTamil ? doc.availableDaysTa : doc.availableDaysEn;

            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                      {specialty}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {t.common.demoRecord}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-2">
                    {docName}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {doc.qualification}
                  </div>

                  <div className="mt-3 flex items-start gap-1.5 text-xs text-slate-600">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{hospital}</span>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t.doctors.experience}:</span>
                      <span className="font-semibold text-slate-800">{doc.experienceYears} Years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t.doctors.fee}:</span>
                      <span className="font-bold text-teal-700">{doc.consultationFee}</span>
                    </div>
                    <div className="pt-1 border-t border-slate-200/60 text-[11px] text-slate-600">
                      <Clock className="w-3 h-3 inline mr-1 text-slate-400" />
                      {days}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenBooking(doc)}
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.doctors.bookButton}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Appointment Booking Modal */}
      {bookingDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  {t.doctors.formTitle}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {isTamil ? bookingDoctor.nameTa : bookingDoctor.nameEn}
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  {isTamil ? bookingDoctor.specialtyTa : bookingDoctor.specialtyEn} • {bookingDoctor.hospitalNameEn}
                </div>
              </div>
              <button
                onClick={() => setBookingDoctor(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
              >
                ✕
              </button>
            </div>

            {submitSuccess ? (
              <div className="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">{t.common.success}!</h4>
                <p className="text-xs text-emerald-800">{submitSuccess}</p>
                <div className="text-[11px] text-emerald-700 italic">Redirecting to your appointments list...</div>
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking} className="mt-5 space-y-4 text-xs sm:text-sm">
                {submitError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {t.doctors.patientName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {t.doctors.patientPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {t.doctors.date} *
                    </label>
                    <input
                      type="date"
                      required
                      value={appointmentDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {t.doctors.timeSlot} *
                    </label>
                    <select
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                    >
                      {bookingDoctor.availableSlots.map((slot, i) => (
                        <option key={i} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {t.doctors.reason}
                  </label>
                  <textarea
                    rows={2}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Describe any symptoms or reasons for consultation..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  ></textarea>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                  <span className="font-bold block mb-0.5">
                    {isTamil ? 'முக்கிய அறிவிப்பு:' : 'Important Notice:'}
                  </span>
                  {isTamil
                    ? 'இது கேர்நேஷன் செயல்முறை மாதிரி முன்பதிவு கோரிக்கையாகும். இது மருத்துவமனையின் அதிகாரப்பூர்வ நோயாளி சேர்க்கை கணினியில் நேரடியாக பதிவு செய்யப்படவில்லை.'
                    : 'This records a demonstration appointment request in the CareNation database. It is not confirmed by a live private hospital ERP.'}
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setBookingDoctor(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 cursor-pointer"
                  >
                    {t.common.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                  >
                    {submitting ? t.common.submitting : t.common.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
