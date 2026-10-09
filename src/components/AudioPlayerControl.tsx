import React, { useState } from 'react';
import { Volume2, Pause, Play, Square, RotateCcw, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { VoicePlaybackState } from '../hooks/useVoiceSpeech';

interface AudioPlayerControlProps {
  topicId: string;
  topicTitleEn: string;
  topicTitleTa: string;
  scriptEn: string;
  scriptTa: string;
  playbackState: VoicePlaybackState;
  onSpeak: (text: string, lang: Language, topicId: string) => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReplay: () => void;
}

export const AudioPlayerControl: React.FC<AudioPlayerControlProps> = ({
  topicId,
  topicTitleEn,
  topicTitleTa,
  scriptEn,
  scriptTa,
  playbackState,
  onSpeak,
  onPause,
  onResume,
  onStop,
  onReplay
}) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcriptTab, setTranscriptTab] = useState<'ta' | 'en'>('ta');

  const isCurrentTopic = playbackState.activeTopicId === topicId;
  const isSpeakingThis = isCurrentTopic && playbackState.isSpeaking;
  const isPausedThis = isCurrentTopic && playbackState.isPaused;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 text-slate-800 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${isSpeakingThis ? 'bg-teal-500 text-white animate-pulse' : 'bg-teal-100 text-teal-800'}`}>
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Bilingual Voice Explanation / குரல் விளக்கம்
            </div>
            <div className="text-sm font-medium text-slate-700">
              {isSpeakingThis ? (
                <span className="text-teal-600 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                  Speaking in {playbackState.activeLanguage === 'ta' ? 'Tamil (தமிழ்)' : 'English'}
                </span>
              ) : isPausedThis ? (
                <span className="text-amber-600 font-semibold">Paused</span>
              ) : (
                <span>Listen to complete step-by-step guidance</span>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tamil audio button */}
          <button
            onClick={() => {
              if (isSpeakingThis && playbackState.activeLanguage === 'ta') {
                onStop();
              } else {
                onSpeak(scriptTa, 'ta', topicId);
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs ${
              isSpeakingThis && playbackState.activeLanguage === 'ta'
                ? 'bg-teal-600 text-white hover:bg-teal-700 ring-2 ring-teal-400'
                : 'bg-white border border-teal-300 text-teal-800 hover:bg-teal-50'
            }`}
            title="Listen in Tamil"
          >
            <Volume2 className="w-3.5 h-3.5 text-teal-600" />
            <span>🔊 தமிழில் கேட்க</span>
          </button>

          {/* English audio button */}
          <button
            onClick={() => {
              if (isSpeakingThis && playbackState.activeLanguage === 'en') {
                onStop();
              } else {
                onSpeak(scriptEn, 'en', topicId);
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs ${
              isSpeakingThis && playbackState.activeLanguage === 'en'
                ? 'bg-teal-600 text-white hover:bg-teal-700 ring-2 ring-teal-400'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
            title="Listen in English"
          >
            <Volume2 className="w-3.5 h-3.5 text-slate-600" />
            <span>🔊 Listen English</span>
          </button>

          {/* Playback Controls (visible when this item is active) */}
          {isCurrentTopic && (
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
              {isSpeakingThis && !isPausedThis ? (
                <button
                  onClick={onPause}
                  className="p-1 text-slate-700 hover:bg-slate-100 rounded-md"
                  title="Pause Audio"
                >
                  <Pause className="w-4 h-4" />
                </button>
              ) : isPausedThis ? (
                <button
                  onClick={onResume}
                  className="p-1 text-teal-600 hover:bg-teal-50 rounded-md"
                  title="Resume Audio"
                >
                  <Play className="w-4 h-4" />
                </button>
              ) : null}

              <button
                onClick={onStop}
                className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                title="Stop Audio"
              >
                <Square className="w-4 h-4" />
              </button>

              <button
                onClick={onReplay}
                className="p-1 text-slate-700 hover:bg-slate-100 rounded-md"
                title="Replay Audio"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Toggle Transcript */}
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>{showTranscript ? 'Hide Transcript' : 'Transcript'}</span>
          </button>
        </div>
      </div>

      {/* Voice notice / fallback message */}
      {isCurrentTopic && playbackState.voiceNotice && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">{playbackState.voiceNotice}</span>
            <div className="mt-1 text-amber-700">
              The full text transcript is available below and matches the complete instructional guidance.
            </div>
          </div>
        </div>
      )}

      {/* Full Transcript Area */}
      {showTranscript && (
        <div className="mt-3 pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600 uppercase">
              Full Spoken Transcript (முழு உரை)
            </span>
            <div className="inline-flex rounded-md shadow-xs" role="group">
              <button
                type="button"
                onClick={() => setTranscriptTab('ta')}
                className={`px-2.5 py-1 text-xs font-medium rounded-l-md border ${
                  transcriptTab === 'ta'
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                தமிழ் (Tamil)
              </button>
              <button
                type="button"
                onClick={() => setTranscriptTab('en')}
                className={`px-2.5 py-1 text-xs font-medium rounded-r-md border-t border-b border-r ${
                  transcriptTab === 'en'
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200 text-sm leading-relaxed text-slate-800">
            {transcriptTab === 'ta' ? (
              <div>
                <div className="font-bold text-teal-800 mb-1">{topicTitleTa}</div>
                <p className="font-tamil">{scriptTa}</p>
              </div>
            ) : (
              <div>
                <div className="font-bold text-teal-800 mb-1">{topicTitleEn}</div>
                <p>{scriptEn}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
