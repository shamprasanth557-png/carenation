import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Info,
  RotateCcw
} from 'lucide-react';
import { api } from '../services/api';
import { Language } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { AudioPlayerControl } from './AudioPlayerControl';
import { VoicePlaybackState } from '../hooks/useVoiceSpeech';

interface SymptomCheckerProps {
  playbackState: VoicePlaybackState;
  onSpeak: (text: string, lang: Language, topicId: string) => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReplay: () => void;
}

const COMMON_SYMPTOMS = [
  { id: 'fever', labelEn: 'Fever or chills', labelTa: 'காய்ச்சல் அல்லது குளிர் நடுக்கம்', isRedFlag: false },
  { id: 'cough', labelEn: 'Dry or productive cough', labelTa: 'இருமல் அல்லது சளி', isRedFlag: false },
  { id: 'chest_pain', labelEn: 'Crushing chest pain or pressure', labelTa: 'கடுமையான நெஞ்சு வலி / இறுக்கம்', isRedFlag: true },
  { id: 'shortness_of_breath', labelEn: 'Severe difficulty breathing', labelTa: 'கடுமையான மூச்சுத்திணறல்', isRedFlag: true },
  { id: 'headache', labelEn: 'Moderate headache', labelTa: 'மிதமான தலைவலி', isRedFlag: false },
  { id: 'facial_droop', labelEn: 'Sudden weakness on one side of face/body', labelTa: 'முகம் அல்லது கை காலில் திடீர் பலவீனம்', isRedFlag: true },
  { id: 'stomach_ache', labelEn: 'Mild abdominal discomfort', labelTa: 'லேசான வயிற்று வலி', isRedFlag: false },
  { id: 'fatigue', labelEn: 'Body tiredness & fatigue', labelTa: 'உடல் சோர்வு மற்றும் அசதி', isRedFlag: false },
  { id: 'bleeding', labelEn: 'Uncontrolled heavy bleeding', labelTa: 'நிற்காத கடுமையான ரத்தப்போக்கு', isRedFlag: true }
];

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({
  playbackState,
  onSpeak,
  onPause,
  onResume,
  onStop,
  onReplay
}) => {
  const { t, isTamil } = useLanguage();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [ageGroup, setAgeGroup] = useState<string>('adult');
  const [duration, setDuration] = useState<string>('1-2 days');
  const [customText, setCustomText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any | null>(null);

  const toggleSymptom = (label: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  };

  const handleCheck = async () => {
    const allSymptoms = [...selectedSymptoms];
    if (customText.trim()) {
      allSymptoms.push(customText.trim());
    }

    if (allSymptoms.length === 0) {
      alert(isTamil ? 'குறைந்தது ஒரு அறிகுறியையாவது தேர்வு செய்யவும்.' : 'Please select or describe at least one symptom.');
      return;
    }

    try {
      setLoading(true);
      const data = await api.checkSymptoms({
        symptoms: allSymptoms,
        ageGroup,
        duration
      });
      setResult(data);
    } catch (err) {
      console.error('Symptom check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setCustomText('');
    setResult(null);
    onStop();
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <Activity className="w-4 h-4 text-teal-600" />
            <span>{isTamil ? 'உடல்நல அறிகுறி வழிகாட்டி' : 'Educational Health Guidance Tool'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.symptoms.title}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.symptoms.subtitle}
          </p>
        </div>

        {/* Emergency Alert Banner */}
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-red-950 leading-relaxed">
            <span className="font-bold text-red-900 block mb-0.5">
              {isTamil ? 'உடனடி அவசர எச்சரிக்கை:' : 'Critical Emergency Warning:'}
            </span>
            {t.symptoms.redFlagWarning}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Selector Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              {t.symptoms.selectPrompt}
            </h3>
            <div className="space-y-2">
              {COMMON_SYMPTOMS.map((sym) => {
                const isSelected = selectedSymptoms.includes(sym.labelEn);
                const label = isTamil ? sym.labelTa : sym.labelEn;

                return (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => toggleSymptom(sym.labelEn)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold shadow-xs'
                        : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{label}</span>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {sym.isRedFlag && (
                        <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-sm font-bold">
                          Urgent
                        </span>
                      )}
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'bg-teal-600 border-teal-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <span className="text-[10px]">✓</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              {isTamil ? 'கூடுதல் விவரங்கள் (விருப்பத்திற்குரியது)' : 'Additional description (Optional)'}
            </label>
            <textarea
              rows={2}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={isTamil ? 'வேறு ஏதேனும் அறிகுறிகள் உள்ளதா?...' : 'Describe any other sensations or symptoms...'}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">{t.symptoms.ageGroup}</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
              >
                <option value="child">Child (&lt; 12 yrs)</option>
                <option value="adult">Adult (18-60 yrs)</option>
                <option value="elderly">Senior (60+ yrs)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">{t.symptoms.duration}</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
              >
                <option value="hours">A few hours</option>
                <option value="1-2 days">1 - 2 days</option>
                <option value="weeks">More than a week</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={handleCheck}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? t.common.loading : t.symptoms.checkButton}
            </button>
            {result && (
              <button
                onClick={handleReset}
                className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
                title="Reset symptoms"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Output Guidance View */}
        <div className="lg:col-span-7 space-y-4">
          {!result ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
              <Activity className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">
                {isTamil ? 'அறிகுறிகளைத் தேர்வு செய்யவும்' : 'Select Symptoms to View Guidance'}
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {isTamil
                  ? 'இடதுபுறம் உள்ள பட்டியலில் அறிகுறிகளைத் தேர்வு செய்து "வழிகாட்டுதல் தகவலைப் பெறுக" பொத்தானை அழுத்தவும்.'
                  : 'Check one or more symptoms on the left to receive immediate educational guidance, safety triage, and bilingual spoken explanations.'}
              </p>
            </div>
          ) : result.isEmergency ? (
            /* Red Flag Emergency Result */
            <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0">
                  <PhoneCall className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2.5 py-0.5 rounded-md">
                    Emergency Alert
                  </span>
                  <h3 className="text-xl font-black text-red-900 mt-1">
                    {isTamil ? 'உடனடி 108 ஆம்புலன்ஸ் அவசர எச்சரிக்கை' : 'Immediate Medical Emergency Triaged'}
                  </h3>
                </div>
              </div>

              <p className="text-sm font-semibold text-red-950 bg-white/80 p-4 rounded-xl border border-red-200 leading-relaxed">
                {isTamil ? result.emergencyNoticeTa : result.emergencyNoticeEn}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-800 mb-2">
                  {isTamil ? 'உடனடி நடவடிக்கைகள்:' : 'Immediate Emergency Steps:'}
                </h4>
                <div className="space-y-1.5">
                  {(isTamil ? result.recommendedActionsTa : result.recommendedActionsEn).map((action: string, i: number) => (
                    <div key={i} className="text-xs sm:text-sm text-red-900 flex items-start gap-2">
                      <span className="text-red-600 font-bold">!</span>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="tel:108"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-center block text-sm shadow-md transition-colors"
                >
                  {isTamil ? 'உடனடியாக 108 ஆம்புலன்ஸை அழைக்கவும்' : 'Tap Here to Call 108 Ambulance Directly'}
                </a>
              </div>
            </div>
          ) : (
            /* Educational Guidance Result */
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 uppercase tracking-wider">
                  {t.symptoms.guidanceTitle}
                </span>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed font-medium">
                  {isTamil ? result.summaryTa : result.summaryEn}
                </p>
              </div>

              {/* Voice explanation player for the generated guidance */}
              <AudioPlayerControl
                topicId="symptom-guidance"
                topicTitleEn="Educational Health Guidance"
                topicTitleTa="உடல்நல விழிப்புணர்வு வழிகாட்டுதல்"
                scriptEn={result.scriptEn}
                scriptTa={result.scriptTa}
                playbackState={playbackState}
                onSpeak={onSpeak}
                onPause={onPause}
                onResume={onResume}
                onStop={onStop}
                onReplay={onReplay}
              />

              {/* General considerations */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {t.symptoms.possibleCausesTitle}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {(isTamil ? result.possibleCausesTa : result.possibleCausesEn).map((cause: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Steps */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  {t.symptoms.recommendedStepsTitle}
                </h4>
                <div className="space-y-2">
                  {(isTamil ? result.recommendedActionsTa : result.recommendedActionsEn).map((step: string, i: number) => (
                    <div key={i} className="p-3 rounded-lg bg-teal-50/60 border border-teal-100 text-xs text-teal-950 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical uncertainty disclaimer */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>{t.symptoms.uncertaintyNote}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
