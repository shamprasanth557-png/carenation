import React from 'react';
import { HeartPulse, PhoneCall, ShieldCheck, BookOpen, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDocs }) => {
  const { t, isTamil } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-slate-950 font-bold">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {t.brandName}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t.tagline}
            </p>
            <p className="text-[11px] text-slate-500">
              {isTamil
                ? 'கோயம்புத்தூர் மற்றும் தமிழ்நாட்டிற்கான விரிவான சுகாதார வழிகாட்டி தளம்.'
                : 'Bilingual healthcare access & emergency guidance for Tamil Nadu and Coimbatore.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-slate-100 font-bold uppercase tracking-wider text-[11px]">
              {isTamil ? 'முக்கிய சேவைகள்' : 'Care Services'}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('hospitals')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.hospitals}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('first-aid')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.firstAid}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('doctors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.doctors}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('insurance')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.insurance}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('symptoms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.symptomChecker}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reminders')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.reminders}
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div className="space-y-2">
            <h4 className="text-slate-100 font-bold uppercase tracking-wider text-[11px]">
              {isTamil ? 'அவசர உதவி எண்கள்' : 'Emergency Numbers (TN)'}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">108</span>
                <span>— Ambulance / அவசர ஆம்புலன்ஸ்</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-teal-400 font-bold">104</span>
                <span>— State Health Helpline / மருத்துவ ஆலோசனை</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">112</span>
                <span>— Unified Emergency / தேசிய அவசர உதவி</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-rose-400 font-bold">102</span>
                <span>— Mother & Baby Free Transport</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-blue-400 font-bold">14416</span>
                <span>— Tele-MANAS Mental Health</span>
              </li>
            </ul>
          </div>

          {/* Project & Evaluation Guide */}
          <div className="space-y-3">
            <h4 className="text-slate-100 font-bold uppercase tracking-wider text-[11px]">
              Hackathon Evaluation
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              CareNation is built with full Tamil/English bilingualism, Web Speech voice integration, verified datasets, and database persistence.
            </p>
            <button
              onClick={onOpenDocs}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-400/30 font-semibold text-xs transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isTamil ? 'தொழில்நுட்ப ஆவணம் காண்க' : 'Open Architecture Guide'}</span>
            </button>
          </div>
        </div>

        {/* Disclaimer row */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong className="text-slate-400">Medical Transparency Disclaimer:</strong> CareNation provides educational information, first aid guidance, and appointment demonstration workflows. It does not replace emergency medical triage or clinical diagnosis by registered medical practitioners. In acute life-threatening emergencies, always dial 108 immediately.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4 text-slate-500">
            <div>© {new Date().getFullYear()} CareNation — Smart Healthcare. Anytime. Anywhere.</div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Grounded in Official Health Department & Hospital Records</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
