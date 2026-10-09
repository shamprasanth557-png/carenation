import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Check,
  X,
  Trash2,
  Clock,
  Pill,
  Utensils,
  AlertCircle,
  Volume2
} from 'lucide-react';
import { MedicineReminder, Language } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { AudioPlayerControl } from './AudioPlayerControl';
import { VoicePlaybackState } from '../hooks/useVoiceSpeech';

interface MedicineRemindersProps {
  playbackState: VoicePlaybackState;
  onSpeak: (text: string, lang: Language, topicId: string) => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReplay: () => void;
}

export const MedicineReminders: React.FC<MedicineRemindersProps> = ({
  playbackState,
  onSpeak,
  onPause,
  onResume,
  onStop,
  onReplay
}) => {
  const { t, isTamil } = useLanguage();
  const [reminders, setReminders] = useState<MedicineReminder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Form modal
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [medicineName, setMedicineName] = useState<string>('');
  const [dosage, setDosage] = useState<string>('1 Tablet');
  const [timeSlot, setTimeSlot] = useState<string>('08:00 AM');
  const [mealRelation, setMealRelation] = useState<'before_meal' | 'after_meal' | 'with_meal' | 'anytime'>('after_meal');
  const [daysSchedule, setDaysSchedule] = useState<string>('Daily');
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      setLoading(true);
      const data = await api.getReminders();
      setReminders(data);
    } catch (err) {
      console.error('Failed to load reminders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName.trim()) return;

    try {
      setSubmitting(true);
      const created = await api.createReminder({
        medicineName: medicineName.trim(),
        dosage: dosage.trim() || '1 dose',
        timeSlot,
        mealRelation,
        daysSchedule
      });
      setReminders(prev => [...prev, created]);
      setShowAddModal(false);
      setMedicineName('');
      setDosage('1 Tablet');
    } catch (err) {
      alert('Failed to save reminder');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'pending' | 'taken' | 'skipped') => {
    try {
      const updated = await api.updateReminderStatus(id, status);
      setReminders(prev => prev.map(r => (r.id === id ? updated : r)));
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteReminder(id);
      setReminders(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('Failed to delete reminder', err);
    }
  };

  const reminderAudioScriptEn =
    "Medicine Safety Instructions. Always take your prescribed medicines at the exact time advised by your physician. Pay close attention to whether the medication should be taken on an empty stomach or following a meal. Never double up on missed doses. If you experience adverse reactions, consult your prescribing physician immediately.";
  const reminderAudioScriptTa =
    "மருந்து உட்கொள்ளும் முறை பற்றிய விழிப்புணர்வு. மருத்துவர் பரிந்துரைத்த நேரத்தில் மாத்திரைகளை தவறாமல் உட்கொள்ளுங்கள். வெறும் வயிற்றில் சாப்பிட வேண்டுமா அல்லது உணவுக்கு பின் சாப்பிட வேண்டுமா என்பதை சரியாக கவனிக்கவும். தவறிய மாத்திரைக்கு பதிலாக அடுத்த முறை இரண்டு மாத்திரைகளை ஒன்றாக உட்கொள்ள வேண்டாம்.";

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
              <Bell className="w-4 h-4 text-teal-600" />
              <span>{isTamil ? 'மருந்து அட்டவணை மேலாண்மை' : 'Medication Compliance Assistant'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.reminders.title}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
              {t.reminders.subtitle}
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.reminders.addMedicine}</span>
          </button>
        </div>

        {/* Audio Player for Medication Safety */}
        <AudioPlayerControl
          topicId="medicine-safety"
          topicTitleEn="Safe Medication Administration Guidelines"
          topicTitleTa="மருந்து உட்கொள்ளும் முறை வழிகாட்டுதல்"
          scriptEn={reminderAudioScriptEn}
          scriptTa={reminderAudioScriptTa}
          playbackState={playbackState}
          onSpeak={onSpeak}
          onPause={onPause}
          onResume={onResume}
          onStop={onStop}
          onReplay={onReplay}
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">
          <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          {t.common.loading}
        </div>
      ) : reminders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <Pill className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">No Reminders Scheduled</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">{t.reminders.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reminders.map((rem) => {
            const isTaken = rem.status === 'taken';
            const isSkipped = rem.status === 'skipped';

            return (
              <div
                key={rem.id}
                className={`bg-white rounded-2xl border p-5 transition-all shadow-xs flex flex-col justify-between ${
                  isTaken
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : isSkipped
                    ? 'border-slate-300 bg-slate-50/50 opacity-75'
                    : 'border-slate-200 hover:border-teal-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        isTaken
                          ? 'bg-emerald-100 text-emerald-800'
                          : isSkipped
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      {isTaken
                        ? t.reminders.statusTaken
                        : isSkipped
                        ? t.reminders.statusSkipped
                        : t.reminders.statusPending}
                    </span>

                    <button
                      onClick={() => handleDelete(rem.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded-md"
                      title={t.reminders.delete}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-2 flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{rem.medicineName}</span>
                  </h3>

                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {rem.dosage} • {rem.daysSchedule}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">
                        {t.reminders.timeSlot}
                      </span>
                      <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {rem.timeSlot}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">
                        Food Relation
                      </span>
                      <span className="font-semibold text-slate-800 block mt-0.5 text-[11px]">
                        {rem.mealRelation === 'before_meal'
                          ? t.reminders.beforeMeal
                          : rem.mealRelation === 'after_meal'
                          ? t.reminders.afterMeal
                          : rem.mealRelation === 'with_meal'
                          ? t.reminders.withMeal
                          : t.reminders.anytime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus(rem.id, isTaken ? 'pending' : 'taken')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                      isTaken
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isTaken ? 'Taken ✓' : t.reminders.markTaken}</span>
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(rem.id, isSkipped ? 'pending' : 'skipped')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isSkipped
                        ? 'bg-slate-300 text-slate-800'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isSkipped ? 'Skipped' : t.reminders.markSkipped}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">{t.reminders.addMedicine}</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReminder} className="mt-4 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {t.reminders.medicineName} *
                </label>
                <input
                  type="text"
                  required
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="e.g. Paracetamol 500mg, Metformin"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {t.reminders.dosage}
                </label>
                <input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g. 1 Tablet, 5ml, 2 Drops"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {t.reminders.timeSlot} *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  >
                    <option value="07:00 AM">07:00 AM (Morning)</option>
                    <option value="08:00 AM">08:00 AM (Breakfast)</option>
                    <option value="01:00 PM">01:00 PM (Lunch)</option>
                    <option value="06:00 PM">06:00 PM (Evening)</option>
                    <option value="08:30 PM">08:30 PM (Dinner)</option>
                    <option value="10:00 PM">10:00 PM (Bedtime)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {t.reminders.mealRelation}
                  </label>
                  <select
                    value={mealRelation}
                    onChange={(e: any) => setMealRelation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  >
                    <option value="before_meal">Before Meal (வெறும் வயிறு)</option>
                    <option value="after_meal">After Meal (உணவுக்குப் பின்)</option>
                    <option value="with_meal">With Meal (உணவுடன்)</option>
                    <option value="anytime">Anytime / As Directed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 cursor-pointer"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {submitting ? t.common.submitting : t.common.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
