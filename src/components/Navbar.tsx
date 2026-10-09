import React, { useState } from 'react';
import {
  HeartPulse,
  PhoneCall,
  Globe2,
  Menu,
  X,
  ShieldCheck,
  Building2,
  Bandage,
  Stethoscope,
  FileCheck2,
  Activity,
  Bell,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDocs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenDocs }) => {
  const { language, setLanguage, t, isTamil } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home, icon: HeartPulse },
    { id: 'hospitals', label: t.nav.hospitals, icon: Building2 },
    { id: 'first-aid', label: t.nav.firstAid, icon: Bandage },
    { id: 'doctors', label: t.nav.doctors, icon: Stethoscope },
    { id: 'insurance', label: t.nav.insurance, icon: FileCheck2 },
    { id: 'symptoms', label: t.nav.symptomChecker, icon: Activity },
    { id: 'reminders', label: t.nav.reminders, icon: Bell },
    { id: 'emergency', label: t.nav.emergencySos, icon: AlertTriangle }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top emergency strip for rapid access */}
      <div className="bg-slate-900 text-slate-100 px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-300 hidden sm:inline">
            {isTamil ? 'தமிழ்நாடு அவசர மருத்துவ உதவி சேவை:' : 'Tamil Nadu 24x7 Emergency Helplines:'}
          </span>
          <span className="text-emerald-400 font-bold">108 (Ambulance)</span>
          <span className="text-slate-500">•</span>
          <span className="text-teal-400 font-semibold">104 (Health Info)</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDocs}
            className="text-teal-300 hover:text-white flex items-center gap-1 font-medium underline underline-offset-2 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isTamil ? 'தொழில்நுட்ப கட்டமைப்பு (Guide)' : 'Architecture & Guide'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                  {t.brandName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                  TN
                </span>
              </div>
              <p className="text-[11px] text-slate-700 font-medium leading-none mt-0.5">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 text-teal-700 font-bold shadow-xs border border-teal-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600' : 'text-slate-600'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right actions: Language switcher and emergency button */}
          <div className="flex items-center gap-2.5">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setLanguage('ta')}
                className={`px-2.5 py-1.5 rounded-md transition-all cursor-pointer ${
                  language === 'ta'
                    ? 'bg-teal-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="தமிழ் மொழியைத் தேர்வு செய்க"
              >
                தமிழ்
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1.5 rounded-md transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-teal-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Select English Language"
              >
                English
              </button>
            </div>

            {/* Direct 108 Call CTA */}
            <a
              href="tel:108"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors"
              title="Emergency: Call 108 Ambulance directly"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>{t.nav.emergency108}</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg">
          <div className="py-2 mb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {isTamil ? 'பயண விருப்பங்கள்' : 'Navigation Menu'}
            </span>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500">Language:</span>
              <button
                onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
                className="font-bold text-teal-700 underline"
              >
                {language === 'ta' ? 'Switch to English' : 'தமிழுக்கு மாறுக'}
              </button>
            </div>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 border border-teal-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:108"
              className="w-full py-2.5 rounded-lg bg-red-600 text-white font-bold text-center text-sm flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isTamil ? '108 அவசர ஆம்புலன்ஸ் அழைப்பு' : 'Emergency Dial 108 Ambulance'}</span>
            </a>
            <button
              onClick={() => {
                onOpenDocs();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium text-center flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isTamil ? 'தொழில்நுட்ப கட்டமைப்பு கையேடு' : 'View Architecture & Student Guide'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
