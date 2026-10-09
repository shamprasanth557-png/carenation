import React, { useState, useEffect } from 'react';
import {
  Building2,
  Search,
  Filter,
  Phone,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Info
} from 'lucide-react';
import { Hospital, Language } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { AudioPlayerControl } from './AudioPlayerControl';
import { VoicePlaybackState } from '../hooks/useVoiceSpeech';

interface HospitalFinderProps {
  playbackState: VoicePlaybackState;
  onSpeak: (text: string, lang: Language, topicId: string) => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReplay: () => void;
}

export const HospitalFinder: React.FC<HospitalFinderProps> = ({
  playbackState,
  onSpeak,
  onPause,
  onResume,
  onStop,
  onReplay
}) => {
  const { t, isTamil, language } = useLanguage();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  useEffect(() => {
    loadHospitals();
  }, [searchQuery, typeFilter]);

  const loadHospitals = async () => {
    try {
      setLoading(true);
      const data = await api.getHospitals(searchQuery, typeFilter);
      setHospitals(data);
    } catch (err) {
      console.error('Error fetching hospitals:', err);
    } finally {
      setLoading(false);
    }
  };

  const hospitalAudioScriptEn =
    "Verified Hospital Directory for Coimbatore, Tamil Nadu. Five major hospitals are indexed with verified contact information, casualty phone numbers, and department details. Please note that real-time bed telemetry is not linked with internal hospital inpatient systems. For immediate emergency admissions, please call the emergency casualty number listed or visit casualty directly.";
  const hospitalAudioScriptTa =
    "கோயம்புத்தூர் சரிபார்க்கப்பட்ட மருத்துவமனை வழிகாட்டி. அரசு மற்றும் முன்னணி தனியார் மருத்துவமனைகளின் முகவரி மற்றும் அவசர சிகிச்சை எண்கள் அதிகாரப்பூர்வமாக சரிபார்க்கப்பட்டுள்ளன. நிகழ்நேர படுக்கை இருப்பு விவரங்கள் கணினி அமைப்புகளுடன் நேரடியாக இணைக்கப்படவில்லை. அவசர சிகிச்சைக்கு மருத்துவமனை அவசர எண்ணை அல்லது 108-ஐ நேரடியாக தொடர்பு கொள்ளவும்.";

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>{isTamil ? 'அரசு மற்றும் மருத்துவமனை பதிவேடுகளில் சரிபார்க்கப்பட்டது' : 'Verified by Official Records • Coimbatore, Tamil Nadu'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.hospitals.title}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.hospitals.subtitle}
          </p>
        </div>

        {/* Audio Player for Hospital Guidance */}
        <AudioPlayerControl
          topicId="hospital-guidance"
          topicTitleEn="Coimbatore Verified Hospital Access Protocol"
          topicTitleTa="கோயம்புத்தூர் மருத்துவமனை அவசர வழிகாட்டுதல்"
          scriptEn={hospitalAudioScriptEn}
          scriptTa={hospitalAudioScriptTa}
          playbackState={playbackState}
          onSpeak={onSpeak}
          onPause={onPause}
          onResume={onResume}
          onStop={onStop}
          onReplay={onReplay}
        />

        {/* Mandatory Bed Telemetry Transparency Banner */}
        <div className="mt-4 p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <span className="font-bold text-amber-950 block mb-0.5">
              {t.common.bedNotice}:
            </span>
            {isTamil
              ? 'கேர்நேஷன் தளத்தில் கற்பனையான அல்லது போலி நிகழ்நேர படுக்கை விவரங்கள் காட்டப்படுவதில்லை. மருத்துவமனைகளின் உள்நோயாளி படுக்கை ஒதுக்கீடு அமைப்புகளுடன் நேரடி இணைப்பு இன்னும் தொடங்கப்படவில்லை. உடனடி படுக்கை நிலைக்கு கீழே கொடுக்கப்பட்டுள்ள அவசர சிகிச்சை எண்ணைத் தொடர்பு கொள்ளவும்.'
              : 'CareNation does not invent simulated or fake live bed counts. Real-time hospital bed telematics requires official hospital ERP integration which is not currently linked. Contact casualty desks directly for bed admission confirmation.'}
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.hospitals.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-slate-50/50"
            />
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50 appearance-none text-slate-700 font-medium"
            >
              <option value="all">{t.hospitals.filterAll}</option>
              <option value="Government">{t.hospitals.filterGovt}</option>
              <option value="Trust / Non-Profit">{t.hospitals.filterTrust}</option>
              <option value="Private Multi-Specialty">{t.hospitals.filterPrivate}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hospital Cards Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 font-medium">
          <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          {t.common.loading}
        </div>
      ) : hospitals.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-slate-600 text-sm font-medium">{t.common.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {hospitals.map((hospital) => {
            const name = isTamil ? hospital.nameTa : hospital.nameEn;
            const address = isTamil ? hospital.addressTa : hospital.addressEn;
            const specialties = isTamil ? hospital.specialtiesTa : hospital.specialtiesEn;
            const facilities = isTamil ? hospital.facilitiesTa : hospital.facilitiesEn;
            const bedNote = isTamil ? hospital.liveBedStatusNoteTa : hospital.liveBedStatusNoteEn;

            return (
              <div
                key={hospital.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top badges */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        hospital.type === 'Government'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : hospital.type === 'Trust / Non-Profit'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {hospital.type}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t.common.verified}
                    </span>
                  </div>

                  {/* Hospital Name */}
                  <h3 className="text-lg font-bold text-slate-900 hover:text-teal-700 transition-colors">
                    {name}
                  </h3>

                  {/* Address */}
                  <div className="mt-2 flex items-start gap-2 text-xs text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{address}</span>
                  </div>

                  {/* Contact Numbers */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 font-medium block text-[10px] uppercase">
                        {t.hospitals.phone}
                      </span>
                      <a
                        href={`tel:${hospital.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-slate-900 font-bold hover:text-teal-600 flex items-center gap-1 mt-0.5"
                      >
                        <Phone className="w-3 h-3 text-teal-600" />
                        <span>{hospital.phone}</span>
                      </a>
                    </div>

                    <div className="p-2.5 rounded-lg bg-red-50/70 border border-red-100">
                      <span className="text-red-700 font-bold block text-[10px] uppercase">
                        {t.hospitals.emergency247}
                      </span>
                      <a
                        href={`tel:${hospital.emergencyPhone.replace(/[^0-9+]/g, '')}`}
                        className="text-red-700 font-extrabold hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Phone className="w-3 h-3 text-red-600" />
                        <span>{hospital.emergencyPhone}</span>
                      </a>
                    </div>
                  </div>

                  {/* Specialties Pills */}
                  <div className="mt-4">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1.5">
                      {t.hospitals.specialties}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {specialties.slice(0, 4).map((spec, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                      {specialties.length > 4 && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                          +{specialties.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bed Notice in Card */}
                  <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                    <span className="font-semibold text-slate-700">{isTamil ? 'படுக்கை ஒதுக்கீடு தகவல்: ' : 'Bed Status Note: '}</span>
                    {bedNote}
                  </div>
                </div>

                {/* Footer metadata & actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-[11px] text-slate-400">
                    {t.hospitals.verifiedOn}: <span className="text-slate-600 font-medium">{hospital.verifiedDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={hospital.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t.common.getDirections}</span>
                    </a>

                    <button
                      onClick={() => setSelectedHospital(hospital)}
                      className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>{t.common.viewDetails}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Hospital Details Modal */}
      {selectedHospital && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  {selectedHospital.type}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                  {isTamil ? selectedHospital.nameTa : selectedHospital.nameEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedHospital(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                  {t.hospitals.address}
                </span>
                <p className="font-medium text-slate-800">
                  {isTamil ? selectedHospital.addressTa : selectedHospital.addressEn}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                    {t.hospitals.phone}
                  </span>
                  <p className="font-bold text-slate-900">{selectedHospital.phone}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                  <span className="text-xs font-semibold text-red-700 uppercase block mb-1">
                    {t.hospitals.emergencyPhone}
                  </span>
                  <p className="font-bold text-red-700">{selectedHospital.emergencyPhone}</p>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  {t.hospitals.specialties}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(isTamil ? selectedHospital.specialtiesTa : selectedHospital.specialtiesEn).map((spec, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 font-medium text-xs border border-teal-100"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  {t.hospitals.facilities}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(isTamil ? selectedHospital.facilitiesTa : selectedHospital.facilitiesEn).map((fac, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-xs"
                    >
                      ✓ {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* Source Verification box */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>{t.hospitals.sourceNotice}:</span>
                </div>
                <p>{selectedHospital.verifiedSource}</p>
                <div className="mt-1 text-[11px] text-emerald-700">
                  {t.hospitals.verifiedOn}: {selectedHospital.verifiedDate}
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block mb-1">{t.common.bedNotice}:</span>
                <p>{isTamil ? selectedHospital.liveBedStatusNoteTa : selectedHospital.liveBedStatusNoteEn}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedHospital(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 cursor-pointer"
              >
                {t.common.close}
              </button>
              <a
                href={selectedHospital.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm flex items-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.common.getDirections}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
