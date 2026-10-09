import React from 'react';
import {
  HeartPulse,
  Building2,
  Bandage,
  Stethoscope,
  FileCheck2,
  Activity,
  Bell,
  AlertTriangle,
  Volume2,
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  onOpenDocs: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenDocs }) => {
  const { t, isTamil } = useLanguage();

  const featureCards = [
    {
      id: 'hospitals',
      titleEn: 'Verified Hospital Directory',
      titleTa: 'சரிபார்க்கப்பட்ட மருத்துவமனைகள்',
      descEn: 'Coimbatore verified hospitals with 24x7 casualty lines, official source records, and transparent bed status note.',
      descTa: 'அவசர சிகிச்சை பிரிவு எண்கள், அதிகாரப்பூர்வ தகவல்கள் கொண்ட கோயம்புத்தூர் மருத்துவமனைகள்.',
      icon: Building2,
      badgeEn: '5 Verified Hospitals',
      badgeTa: '5 சரிபார்க்கப்பட்டவை',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'first-aid',
      titleEn: 'First Aid & Spoken Audio',
      titleTa: 'முதலுதவி & குரல் விளக்கம்',
      descEn: 'Priority life-saving steps for burns, choking, bleeding, and cardiac arrest with full Tamil & English voice playback.',
      descTa: 'தீக்காயம், நெஞ்சுவலி, ரத்தப்போக்கு முதலுதவி வழிகாட்டுதல் மற்றும் முழுமையான தமிழ் ஒலி விளக்கம்.',
      icon: Bandage,
      badgeEn: 'Full Spoken Audio',
      badgeTa: 'குரல் ஒலி வசதி',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200'
    },
    {
      id: 'doctors',
      titleEn: 'Find Doctors & Book OPD',
      titleTa: 'மருத்துவர் வழிகாட்டி & முன்பதிவு',
      descEn: 'Cardiology, Orthopaedics, and Pediatrics specialists across Coimbatore with persistent appointment requests.',
      descTa: 'கோவையின் முன்னணி சிறப்பு மருத்துவர்கள் விவரம் மற்றும் மாதிரி சந்திப்பு முன்பதிவு.',
      icon: Stethoscope,
      badgeEn: 'Specialist Directory',
      badgeTa: 'சிறப்பு மருத்துவர்கள்',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200'
    },
    {
      id: 'insurance',
      titleEn: 'TN CMCHIS & Health Insurance',
      titleTa: 'காப்பீடு & அரசு நலத்திட்டங்கள்',
      descEn: 'Compare Chief Minister\'s Comprehensive Health Scheme (CMCHIS), PM-JAY, and top private plans with application tracking.',
      descTa: 'முதலமைச்சரின் காப்பீட்டுத் திட்டம் (CMCHIS) மற்றும் ஆயுஷ்மான் பாரத் ஒப்பீடு மற்றும் உதவி கோரிக்கை.',
      icon: FileCheck2,
      badgeEn: 'TN CMCHIS Covered',
      badgeTa: 'அரசு திட்டம்',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200'
    },
    {
      id: 'symptoms',
      titleEn: 'Symptom Checker & Triage',
      titleTa: 'அறிகுறி வழிகாட்டி & எச்சரிக்கை',
      descEn: 'Safe educational guidance with automatic red-flag screening for cardiac and stroke warning signs.',
      descTa: 'மாரடைப்பு மற்றும் தீவிர அறிகுறிகளை கண்டறியும் எச்சரிக்கையுடன் கூடிய சுகாதார வழிகாட்டி.',
      icon: Activity,
      badgeEn: 'Safety Screening',
      badgeTa: 'பாதுகாப்பு சோதனை',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200'
    },
    {
      id: 'reminders',
      titleEn: 'Daily Medicine Reminders',
      titleTa: 'தினசரி மருந்து நினைவூட்டல்',
      descEn: 'Never miss a prescribed dose with daily schedules, food relation reminders, and spoken instructions.',
      descTa: 'மாத்திரைகளை நேரத்திற்கு உட்கொள்ள தினசரி நினைவூட்டல் மற்றும் தமிழ் ஒலி அறிவுரைகள்.',
      icon: Bell,
      badgeEn: 'Smart Schedule',
      badgeTa: 'நேர அட்டவணை',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-teal-900 via-slate-900 to-slate-950 text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-teal-800/40">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-3xl space-y-6">
          {/* Hero pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {t.brandName} —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-100">
              {t.tagline}
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
            {t.heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('first-aid')}
              className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t.hero.firstAidCta}</span>
            </button>

            <button
              onClick={() => onNavigate('hospitals')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-teal-300" />
              <span>{t.hero.findHospitalsCta}</span>
            </button>

            <button
              onClick={() => onNavigate('insurance')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-300" />
              <span>{t.hero.exploreInsuranceCta}</span>
            </button>
          </div>

          {/* Live Callout */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t.hero.verifiedCountBadge}</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 text-teal-400" />
              <span>{t.hero.bilingualAudioBadge}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Features Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {isTamil ? 'ஒருங்கிணைந்த சுகாதார சேவைகள்' : 'CareNation Healthcare Capabilities'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isTamil
                ? 'அனைத்து முக்கிய சுகாதார தேவைகளையும் ஒரே எளிய தளத்தில் அணுகுங்கள்.'
                : 'Explore verified hospital profiles, life-saving First Aid audio, insurance schemes, and personal health tools.'}
            </p>
          </div>

          <button
            onClick={onOpenDocs}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 underline underline-offset-2 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>{isTamil ? 'தொழில்நுட்ப கட்டமைப்பு & கையேடு' : 'View Architecture & Student Guide'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            const title = isTamil ? feat.titleTa : feat.titleEn;
            const desc = isTamil ? feat.descTa : feat.descEn;
            const badge = isTamil ? feat.badgeTa : feat.badgeEn;

            return (
              <div
                key={feat.id}
                onClick={() => onNavigate(feat.id)}
                className="group bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-teal-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 group-hover:bg-teal-600 text-teal-700 group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${feat.badgeColor}`}>
                      {badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover:text-teal-800">
                  <span>{t.common.learnMore}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Emergency Strip Reminder */}
      <section className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>{isTamil ? 'அவசர உயிர்காக்கும் அழைப்பு' : 'Emergency State Dispatch'}</span>
          </div>
          <h3 className="text-lg font-bold text-red-950">
            {isTamil ? 'மருத்துவ அவசரநிலைக்கு 108 ஆம்புலன்ஸை அழைக்கவும்' : 'In a Critical Medical Emergency, Dial 108'}
          </h3>
          <p className="text-xs text-red-900 leading-relaxed">
            {isTamil
              ? 'விபத்து, மாரடைப்பு, கடுமையான ரத்தப்போக்கு நேரங்களில் தங்களை பாதுகாத்துக்கொள்ள உடனடியாக 108 அவசர ஊர்தியை அழைக்கவும்.'
              : 'Never delay emergency treatment while using web applications. Certified Emergency Medical Technicians are dispatched directly to your location.'}
          </p>
        </div>

        <a
          href="tel:108"
          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <PhoneCall className="w-4 h-4 animate-bounce" />
          <span>{isTamil ? '108 உடனே அழைக்க' : 'Call 108 Ambulance'}</span>
        </a>
      </section>
    </div>
  );
};
