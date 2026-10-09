import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { useVoiceSpeech } from './hooks/useVoiceSpeech';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HospitalFinder } from './components/HospitalFinder';
import { FirstAidCentre } from './components/FirstAidCentre';
import { DoctorFinder } from './components/DoctorFinder';
import { AppointmentsList } from './components/AppointmentsList';
import { InsuranceHub } from './components/InsuranceHub';
import { SymptomChecker } from './components/SymptomChecker';
import { MedicineReminders } from './components/MedicineReminders';
import { EmergencySOS } from './components/EmergencySOS';
import { DocumentationModal } from './components/DocumentationModal';
import { Footer } from './components/Footer';

function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [docsModalOpen, setDocsModalOpen] = useState<boolean>(false);
  const { language } = useLanguage();

  // Unified voice synthesis hook so overlapping speech is strictly avoided
  const {
    playbackState,
    speak,
    stop,
    pause,
    resume,
    replay
  } = useVoiceSpeech();

  // Stop audio whenever user switches navigation tabs
  const handleTabChange = (tab: string) => {
    stop();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 font-sans ${language === 'ta' ? 'font-tamil' : ''}`}>
      {/* Navbar with responsive language switcher and 108 direct dial */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenDocs={() => setDocsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'home' && (
          <HeroSection
            onNavigate={handleTabChange}
            onOpenDocs={() => setDocsModalOpen(true)}
          />
        )}

        {activeTab === 'hospitals' && (
          <HospitalFinder
            playbackState={playbackState}
            onSpeak={speak}
            onPause={pause}
            onResume={resume}
            onStop={stop}
            onReplay={replay}
          />
        )}

        {activeTab === 'first-aid' && (
          <FirstAidCentre
            playbackState={playbackState}
            onSpeak={speak}
            onPause={pause}
            onResume={resume}
            onStop={stop}
            onReplay={replay}
          />
        )}

        {activeTab === 'doctors' && (
          <DoctorFinder
            onViewAppointments={() => handleTabChange('appointments')}
          />
        )}

        {activeTab === 'appointments' && (
          <AppointmentsList
            onNewBookingClick={() => handleTabChange('doctors')}
          />
        )}

        {activeTab === 'insurance' && <InsuranceHub />}

        {activeTab === 'symptoms' && (
          <SymptomChecker
            playbackState={playbackState}
            onSpeak={speak}
            onPause={pause}
            onResume={resume}
            onStop={stop}
            onReplay={replay}
          />
        )}

        {activeTab === 'reminders' && (
          <MedicineReminders
            playbackState={playbackState}
            onSpeak={speak}
            onPause={pause}
            onResume={resume}
            onStop={stop}
            onReplay={replay}
          />
        )}

        {activeTab === 'emergency' && (
          <EmergencySOS
            onNavigateToFirstAid={() => handleTabChange('first-aid')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleTabChange}
        onOpenDocs={() => setDocsModalOpen(true)}
      />

      {/* Technical Architecture & Student Setup Guide Modal */}
      <DocumentationModal
        isOpen={docsModalOpen}
        onClose={() => setDocsModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
