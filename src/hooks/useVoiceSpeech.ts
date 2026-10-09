import { useState, useEffect, useRef, useCallback } from 'react';
import { Language } from '../types';

export interface VoicePlaybackState {
  isSpeaking: boolean;
  isPaused: boolean;
  activeLanguage: Language | null;
  activeTopicId: string | null;
  hasSpeechSupport: boolean;
  hasTamilVoice: boolean;
  hasEnglishVoice: boolean;
  availableVoicesCount: number;
  voiceNotice: string | null;
}

export function useVoiceSpeech() {
  const [playbackState, setPlaybackState] = useState<VoicePlaybackState>({
    isSpeaking: false,
    isPaused: false,
    activeLanguage: null,
    activeTopicId: null,
    hasSpeechSupport: typeof window !== 'undefined' && 'speechSynthesis' in window,
    hasTamilVoice: false,
    hasEnglishVoice: false,
    availableVoicesCount: 0,
    voiceNotice: null
  });

  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentParamsRef = useRef<{ text: string; lang: Language; topicId: string } | null>(null);

  // Scan voices
  const scanVoices = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setPlaybackState(prev => ({
        ...prev,
        hasSpeechSupport: false,
        voiceNotice: 'Web Speech API is not supported in this browser environment.'
      }));
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    const tamilVoice = voices.find(v => v.lang.toLowerCase().startsWith('ta') || v.name.toLowerCase().includes('tamil'));
    const englishVoice = voices.find(v => v.lang.toLowerCase().startsWith('en'));

    setPlaybackState(prev => ({
      ...prev,
      hasSpeechSupport: true,
      hasTamilVoice: !!tamilVoice,
      hasEnglishVoice: !!englishVoice,
      availableVoicesCount: voices.length
    }));
  }, []);

  useEffect(() => {
    scanVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = scanVoices;
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [scanVoices]);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    currentUtteranceRef.current = null;
    setPlaybackState(prev => ({
      ...prev,
      isSpeaking: false,
      isPaused: false,
      activeLanguage: null,
      activeTopicId: null,
      voiceNotice: null
    }));
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setPlaybackState(prev => ({ ...prev, isPaused: true }));
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setPlaybackState(prev => ({ ...prev, isPaused: false }));
    }
  }, []);

  const speak = useCallback((text: string, lang: Language, topicId: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setPlaybackState(prev => ({
        ...prev,
        voiceNotice: 'Speech synthesis is not supported on this device. Please read the full transcript below.'
      }));
      return;
    }

    // Always stop any current audio before starting a new one
    window.speechSynthesis.cancel();

    currentParamsRef.current = { text, lang, topicId };

    const voices = window.speechSynthesis.getVoices();
    let selectedVoice: SpeechSynthesisVoice | null = null;

    if (lang === 'ta') {
      // Look for Tamil voice
      selectedVoice = voices.find(v => v.lang === 'ta-IN' || v.lang.startsWith('ta') || v.name.toLowerCase().includes('tamil')) || null;
      if (!selectedVoice) {
        setPlaybackState(prev => ({
          ...prev,
          isSpeaking: false,
          isPaused: false,
          activeLanguage: null,
          activeTopicId: topicId,
          voiceNotice: 'Tamil TTS voice (ta-IN) is not installed on this device or operating system. You can read the complete Tamil text transcript below.'
        }));
        return;
      }
    } else {
      // Look for Indian English (en-IN) or any English voice
      selectedVoice = voices.find(v => v.lang === 'en-IN') ||
                      voices.find(v => v.lang.startsWith('en')) ||
                      null;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = lang === 'ta' ? 0.85 : 0.95; // Slightly calmer pace for medical educational clarity
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setPlaybackState(prev => ({
        ...prev,
        isSpeaking: true,
        isPaused: false,
        activeLanguage: lang,
        activeTopicId: topicId,
        voiceNotice: null
      }));
    };

    utterance.onend = () => {
      setPlaybackState(prev => ({
        ...prev,
        isSpeaking: false,
        isPaused: false,
        activeLanguage: null,
        activeTopicId: null
      }));
      currentUtteranceRef.current = null;
    };

    utterance.onerror = (e) => {
      // Ignore user-initiated cancellation
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      setPlaybackState(prev => ({
        ...prev,
        isSpeaking: false,
        isPaused: false,
        activeLanguage: null,
        activeTopicId: null,
        voiceNotice: `Playback stopped: ${e.error || 'Audio output failed'}. You can read the complete transcript below.`
      }));
      currentUtteranceRef.current = null;
    };

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const replay = useCallback(() => {
    if (currentParamsRef.current) {
      const { text, lang, topicId } = currentParamsRef.current;
      speak(text, lang, topicId);
    }
  }, [speak]);

  return {
    playbackState,
    speak,
    stop,
    pause,
    resume,
    replay
  };
}
