import React, { useState } from 'react';
import {
  PhoneCall,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  HeartPulse,
  Navigation,
  CheckCircle2,
  Phone,
  Copy,
  Info
} from 'lucide-react';
import { emergencyContacts } from '../data/emergencyData';
import { useLanguage } from '../context/LanguageContext';

interface EmergencySOSProps {
  onNavigateToFirstAid: () => void;
}

export const EmergencySOS: React.FC<EmergencySOSProps> = ({ onNavigateToFirstAid }) => {
  const { t, isTamil } = useLanguage();
  const [coords, setCoords] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [locLoading, setLocLoading] = useState<boolean>(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      return;
    }

    setLocLoading(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: Math.round(position.coords.accuracy)
        });
        setLocLoading(false);
      },
      (err) => {
        setLocLoading(false);
        setLocError(`Location permission denied or unavailable: ${err.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const copyCoordinates = () => {
    if (coords) {
      navigator.clipboard.writeText(`${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Urgent Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/60 border border-red-400 text-white text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>{isTamil ? 'உடனடி அவசர உதவி பிரிவு' : 'State Emergency Response'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            {isTamil ? 'அவசர மருத்துவ உதவி — 108 ஆம்புலன்ஸ்' : 'Emergency Ambulance Dispatch — Dial 108'}
          </h2>
          <p className="text-red-100 text-xs sm:text-sm leading-relaxed">
            {isTamil
              ? 'தமிழ்நாடு முழுவதும் 24 மணி நேரமும் செயல்படும் அரசு கட்டணமில்லா அவசர ஊர்தி சேவை. மருத்துவப் பணியாளர்களுடன் கூடிய ஆம்புலன்ஸ் உடனடி வருகை.'
              : 'Direct hotline to the Tamil Nadu 108 Emergency Management and Research Institute (EMRI). Trained EMTs dispatched with oxygen and defibrillator support.'}
          </p>
        </div>

        <a
          href="tel:108"
          className="px-6 py-4 rounded-xl bg-white text-red-600 hover:bg-red-50 font-black text-lg shadow-md transition-all flex items-center gap-3 shrink-0"
        >
          <PhoneCall className="w-6 h-6 animate-bounce" />
          <span>{isTamil ? 'உடனே 108 அழைக்க' : 'DIAL 108 NOW'}</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* GPS Coordinates Tool & 108 Protocol */}
        <div className="lg:col-span-6 space-y-6">
          {/* GPS Coordinates Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <Navigation className="w-5 h-5 text-teal-600" />
              <span>{t.emergency.locationHelperTitle}</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {t.emergency.locationPrompt}
            </p>

            {coords ? (
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-900">{t.emergency.locationGranted}</span>
                  <button
                    onClick={copyCoordinates}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="font-mono text-base font-bold text-slate-900">
                  {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
                </div>
                <div className="text-[11px] text-teal-800">
                  {t.emergency.accuracy} ±{coords.accuracy} meters
                </div>
              </div>
            ) : (
              <button
                onClick={fetchLocation}
                disabled={locLoading}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>{locLoading ? 'Fetching GPS satellites...' : t.emergency.fetchLocation}</span>
              </button>
            )}

            {locError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {locError}
              </div>
            )}

            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.emergency.locationPrivacy}</span>
            </div>
          </div>

          {/* How to talk to 108 Operator */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {t.emergency.sosStepsTitle}
            </h3>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                {t.emergency.sosStep1}
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                {t.emergency.sosStep2}
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                {t.emergency.sosStep3}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onNavigateToFirstAid}
                className="w-full py-2.5 rounded-xl border border-teal-200 text-teal-700 hover:bg-teal-50 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <HeartPulse className="w-4 h-4" />
                <span>{isTamil ? 'முதலுதவி நெறிமுறைகளைப் பார்க்கவும்' : 'Review Immediate First Aid Protocols'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Verified Helpline Numbers Grid */}
        <div className="lg:col-span-6 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            {isTamil ? 'அங்கீகரிக்கப்பட்ட அவசர உதவி எண்கள் (தமிழ்நாடு)' : 'State Government Helplines & Assistance Lines'}
          </div>

          {emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between gap-4 hover:border-teal-200 transition-colors"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 uppercase tracking-wider">
                  Government Service
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  {isTamil ? contact.titleTa : contact.titleEn}
                </h4>
                <p className="text-xs text-slate-600 max-w-md">
                  {isTamil ? contact.descriptionTa : contact.descriptionEn}
                </p>
              </div>

              <a
                href={`tel:${contact.number}`}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm flex items-center gap-2 shrink-0 shadow-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{contact.number}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
