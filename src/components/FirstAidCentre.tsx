import React, { useState, useEffect } from 'react';
import {
  Bandage,
  Flame,
  Droplet,
  ShieldAlert,
  UserX,
  Activity,
  HeartPulse,
  AlertOctagon,
  CheckCircle,
  PhoneCall,
  BookOpen,
  Info
} from 'lucide-react';
import { FirstAidTopic, Language } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { AudioPlayerControl } from './AudioPlayerControl';
import { VoicePlaybackState } from '../hooks/useVoiceSpeech';

interface FirstAidCentreProps {
  playbackState: VoicePlaybackState;
  onSpeak: (text: string, lang: Language, topicId: string) => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReplay: () => void;
}

export const FirstAidCentre: React.FC<FirstAidCentreProps> = ({
  playbackState,
  onSpeak,
  onPause,
  onResume,
  onStop,
  onReplay
}) => {
  const { t, isTamil, language } = useLanguage();
  const [topics, setTopics] = useState<FirstAidTopic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTopicId, setActiveTopicId] = useState<string>('burns');

  useEffect(() => {
    loadFirstAid();
  }, []);

  const loadFirstAid = async () => {
    try {
      setLoading(true);
      const data = await api.getFirstAidTopics();
      setTopics(data);
      if (data.length > 0 && !data.find(d => d.id === activeTopicId)) {
        setActiveTopicId(data[0].id);
      }
    } catch (err) {
      console.error('Failed to load first aid topics:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return Flame;
      case 'Droplet': return Droplet;
      case 'ShieldAlert': return ShieldAlert;
      case 'UserX': return UserX;
      case 'Activity': return Activity;
      case 'HeartPulse': return HeartPulse;
      default: return Bandage;
    }
  };

  const currentTopic = topics.find(tp => tp.id === activeTopicId) || topics[0];

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold mb-3">
            <HeartPulse className="w-4 h-4 text-red-600 animate-pulse" />
            <span>{isTamil ? 'அவசர உயிர்காக்கும் முதலுதவி நெறிமுறைகள்' : 'Immediate Life-Saving Emergency Protocols'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.firstAid.title}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.firstAid.subtitle}
          </p>
        </div>

        {/* Medical disclaimer alert banner */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800 block mb-0.5">
              {t.common.disclaimerTitle}:
            </span>
            {t.firstAid.medicalDisclaimer}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">
          <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          {t.common.loading}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Topic Navigation Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-3 border border-slate-200 shadow-xs space-y-1">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              {isTamil ? 'முதலுதவி தலைப்புகள் (6 முதன்மை வகைகள்)' : 'Priority First Aid Topics (6 Guidelines)'}
            </div>
            {topics.map((topic) => {
              const Icon = getTopicIcon(topic.iconName);
              const isSelected = activeTopicId === topic.id;
              const title = isTamil ? topic.titleTa : topic.titleEn;

              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setActiveTopicId(topic.id);
                    onStop(); // Stop any audio playing for previous topic
                  }}
                  className={`w-full text-left p-3.5 rounded-xl font-medium text-sm flex items-center gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 border border-teal-200 text-teal-900 font-bold shadow-xs'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isSelected
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{title}</div>
                    <div className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                      {isTamil ? topic.titleEn : topic.titleTa}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Topic Details View */}
          {currentTopic && (
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              {/* Active topic header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 uppercase tracking-wider">
                    {isTamil ? 'முதலுதவி நெறிமுறை' : 'First Aid Protocol'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {currentTopic.medicalSource}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {isTamil ? currentTopic.titleTa : currentTopic.titleEn}
                </h3>
                <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {isTamil ? currentTopic.overviewTa : currentTopic.overviewEn}
                </p>
              </div>

              {/* Dedicated Audio Player Control for this First Aid topic */}
              <AudioPlayerControl
                topicId={`firstaid-${currentTopic.id}`}
                topicTitleEn={currentTopic.titleEn}
                topicTitleTa={currentTopic.titleTa}
                scriptEn={currentTopic.voiceScriptEn}
                scriptTa={currentTopic.voiceScriptTa}
                playbackState={playbackState}
                onSpeak={onSpeak}
                onPause={onPause}
                onResume={onResume}
                onStop={onStop}
                onReplay={onReplay}
              />

              {/* Warning signs card */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-3">
                  <AlertOctagon className="w-4 h-4 text-amber-600" />
                  <span>{t.firstAid.warningSignsTitle}</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-amber-900">
                  {(isTamil ? currentTopic.warningSignsTa : currentTopic.warningSignsEn).map((sign, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2"></span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step by step instructions in order */}
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>{t.firstAid.stepsTitle}</span>
                </h4>
                <div className="space-y-3">
                  {(isTamil ? currentTopic.stepsTa : currentTopic.stepsEn).map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 hover:border-teal-200 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                        {idx + 1}
                      </div>
                      <div className="text-sm text-slate-800 leading-relaxed font-medium">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What NOT to do (DONTs) */}
              <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200/80">
                <div className="flex items-center gap-2 text-red-900 font-bold text-sm mb-3">
                  <AlertOctagon className="w-4 h-4 text-red-600" />
                  <span>{t.firstAid.dontsTitle}</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-red-900">
                  {(isTamil ? currentTopic.dontsTa : currentTopic.dontsEn).map((dont, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-600 font-bold shrink-0">✕</span>
                      <span>{dont}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* When to call 108 Emergency Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-red-100 font-bold text-xs uppercase tracking-wider mb-1">
                    <PhoneCall className="w-4 h-4" />
                    <span>{t.firstAid.whenToCallTitle}</span>
                  </div>
                  <p className="text-sm font-medium text-white max-w-xl">
                    {isTamil ? currentTopic.whenToCall108Ta : currentTopic.whenToCall108En}
                  </p>
                </div>
                <a
                  href="tel:108"
                  className="px-5 py-2.5 rounded-xl bg-white text-red-700 font-extrabold text-sm hover:bg-red-50 transition-colors shadow-xs shrink-0 flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  <span>{isTamil ? '108 அழைக்க' : 'Call 108 Now'}</span>
                </a>
              </div>

              {/* Authoritative source footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.firstAid.sourceLabel}: <strong className="text-slate-600">{currentTopic.medicalSource}</strong></span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
