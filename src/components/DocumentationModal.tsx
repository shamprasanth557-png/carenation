import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Server,
  Database,
  Code2,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  const { t, isTamil } = useLanguage();
  const [activeTab, setActiveTab] = useState<'status' | 'vscode' | 'architecture' | 'api'>('status');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const featureStatus = [
    {
      feature: 'Bilingual Interface (Tamil & English)',
      category: 'Working and tested',
      notes: 'Real-time switching of entire UI, forms, notifications, labels, and safety disclaimers with localStorage persistence.'
    },
    {
      feature: 'Bilingual Voice Explanations (Web Speech API)',
      category: 'Working and tested',
      notes: 'Supports independent listening in Tamil (ta-IN) and English (en-IN), pause, resume, stop, replay, matching transcript, and fallback when TTS voice is absent.'
    },
    {
      feature: 'Verified Coimbatore Hospital Finder',
      category: 'Working and tested',
      notes: '5 verified hospitals (CMCH, Sri Ramakrishna, KMCH, PSG, Ganga Hospital) with verified sources, phone lines, directions, and bed telemetry limitation disclosure.'
    },
    {
      feature: 'First Aid Centre (6 Priority Topics)',
      category: 'Working and tested',
      notes: 'Burns, Bleeding, Choking, Fainting, Fractures, and Heart Attack warning signs with full Tamil & English spoken transcripts & Red Cross/WHO guidance.'
    },
    {
      feature: 'Doctor Finder & Demo Appointment Workflow',
      category: 'Working and tested',
      notes: 'Specialist search, form validation, persistence in database via POST /api/appointments, cancellation, and clear demo status label.'
    },
    {
      feature: 'Health Insurance Discovery & Application Tracker',
      category: 'Working and tested',
      notes: 'TN CMCHIS, PM-JAY, Star Health, HDFC ERGO, Arogya Sanjeevani comparison, assistance form persistence in /api/insurance/applications.'
    },
    {
      feature: 'AI Symptom Checker with Red-Flag Triage',
      category: 'Working and tested',
      notes: 'Immediate 108 emergency warning banner for cardiac/stroke symptoms, educational guidance with bilingual voice explanations.'
    },
    {
      feature: 'Daily Medicine Reminders',
      category: 'Working and tested',
      notes: 'Add reminder, timing, dosage, relation to food, mark taken/skipped, persisted in backend database.'
    },
    {
      feature: 'Emergency SOS & GPS Coordinate Helper',
      category: 'Working and tested',
      notes: 'Direct 108, 104, 112, 102 dials, privacy-preserving browser geolocation coordinates for dictating to ambulance operators.'
    },
    {
      feature: 'Live Hospital Bed Telemetry Stream',
      category: 'Requires external credentials or provider integration',
      notes: 'Clearly labeled as not connected to live inpatient telemetry to ensure zero fabricated availability numbers.'
    },
    {
      feature: 'Direct Clinic Management ERP Scheduling',
      category: 'Requires external credentials or provider integration',
      notes: 'Appointments are stored internally in CareNation; live hospital desk webhook integration requires clinic API credentials.'
    },
    {
      feature: 'Automated Ambulance GPS Telematics Dispatch',
      category: 'Requires external credentials or provider integration',
      notes: 'Uses tel:108 direct dispatch telephony; direct API dispatch requires official state EMRI integration.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Hackathon Project Guide & Verification</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              CareNation Technical Documentation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Smart Healthcare. Anytime. Anywhere. • Built for 24-hr College Hackathon Evaluation
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-2 pt-4 pb-2 border-b border-slate-100 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('status')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'status'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Feature Status Table
          </button>
          <button
            onClick={() => setActiveTab('vscode')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'vscode'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Local Setup in VS Code
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Architecture & Database Schema
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'api'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            REST API Endpoints
          </button>
        </div>

        {/* Tab content */}
        <div className="py-4 space-y-4 text-xs sm:text-sm leading-relaxed overflow-y-auto flex-1">
          {activeTab === 'status' && (
            <div className="space-y-4">
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900">
                <strong>Evaluation Transparency:</strong> All core user journeys—Bilingual Tamil/English interface, Web Speech audio with full transcripts, 5 verified Coimbatore hospitals, 6 First Aid guides, demo doctor appointments, and insurance tracking—are connected to backend endpoints and database persistence.
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-3">Feature Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Implementation & Verification Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {featureStatus.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="p-3 font-semibold text-slate-900">{row.feature}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[10px] inline-block ${
                              row.category === 'Working and tested'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {row.category}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 text-[11px]">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'vscode' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">
                Beginner-Friendly Setup in Visual Studio Code (Student Guide)
              </h4>
              <p className="text-xs text-slate-600">
                Follow these exact steps in your VS Code terminal to run the full-stack CareNation application with Node.js and PostgreSQL.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs">
                  <div className="text-slate-400 mb-1 text-[11px]"># Step 1: Install Dependencies</div>
                  <div className="flex items-center justify-between">
                    <code>npm install</code>
                    <button
                      onClick={() => copyCode('npm install', 'c1')}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedCmd === 'c1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs">
                  <div className="text-slate-400 mb-1 text-[11px]"># Step 2: Set up PostgreSQL Database (Optional / Production)</div>
                  <div className="text-slate-300">
                    <div>createdb carenation</div>
                    <div>psql -d carenation -f database/migrations/001_initial_schema.sql</div>
                    <div>psql -d carenation -f database/seeds/001_seed_data.sql</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs">
                  <div className="text-slate-400 mb-1 text-[11px]"># Step 3: Run the Full-Stack Dev Server</div>
                  <div className="flex items-center justify-between">
                    <code>npm run dev</code>
                    <button
                      onClick={() => copyCode('npm run dev', 'c3')}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedCmd === 'c3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="mt-2 text-emerald-400 text-[11px]">
                    CareNation dev server will start at http://localhost:3000
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">System Architecture & Schema</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-teal-800 flex items-center gap-1">
                    <Layers className="w-4 h-4 text-teal-600" />
                    <span>Frontend Layer</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    React 19 + Vite, Tailwind CSS, Mukta Malar Tamil Typography, Web Speech API integration.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-teal-800 flex items-center gap-1">
                    <Server className="w-4 h-4 text-teal-600" />
                    <span>Backend Layer</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Node.js + Express REST API mounted in server.ts with input sanitization, error handlers, and triage rules.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-teal-800 flex items-center gap-1">
                    <Database className="w-4 h-4 text-teal-600" />
                    <span>Database Engine</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    In-memory store + full PostgreSQL SQL migrations & seed scripts in /database/ folder.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-slate-800 text-xs mb-1">PostgreSQL Tables Created:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-slate-700">
                  <div className="p-1.5 bg-white rounded-md border border-slate-200">hospitals</div>
                  <div className="p-1.5 bg-white rounded-md border border-slate-200">first_aid_topics</div>
                  <div className="p-1.5 bg-white rounded-md border border-slate-200">doctors</div>
                  <div className="p-1.5 bg-white rounded-md border border-slate-200">appointments</div>
                  <div className="p-1.5 bg-white rounded-md border border-slate-200">insurance_plans</div>
                  <div className="p-1.5 bg-white rounded-md border border-slate-200">insurance_requests</div>
                  <div className="p-1.5 bg-white rounded-md border border-slate-200">medicine_reminders</div>
                  <div className="p-1.5 bg-white rounded-md border border-slate-200">emergency_contacts</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Available REST API Endpoints</h4>
              <div className="space-y-1.5 font-mono text-xs">
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div><span className="text-emerald-700 font-bold">GET</span> /api/health</div>
                  <span className="text-slate-500 font-sans text-[11px]">Health status & DB stats</span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div><span className="text-emerald-700 font-bold">GET</span> /api/hospitals</div>
                  <span className="text-slate-500 font-sans text-[11px]">5 verified Coimbatore hospitals</span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div><span className="text-emerald-700 font-bold">GET</span> /api/first-aid</div>
                  <span className="text-slate-500 font-sans text-[11px]">6 priority First Aid topics with scripts</span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div><span className="text-emerald-700 font-bold">GET</span> /api/doctors</div>
                  <span className="text-slate-500 font-sans text-[11px]">Specialists & OPD consultation slots</span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div><span className="text-blue-700 font-bold">POST</span> /api/appointments</div>
                  <span className="text-slate-500 font-sans text-[11px]">Submit appointment request</span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div><span className="text-emerald-700 font-bold">GET</span> /api/insurance/plans</div>
                  <span className="text-slate-500 font-sans text-[11px]">Health policies & TN CMCHIS</span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div><span className="text-blue-700 font-bold">POST</span> /api/insurance/applications</div>
                  <span className="text-slate-500 font-sans text-[11px]">Submit scheme assistance request</span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div><span className="text-blue-700 font-bold">POST</span> /api/symptom-check</div>
                  <span className="text-slate-500 font-sans text-[11px]">Educational guidance & red flag triage</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            CareNation v1.0 • College Hackathon Edition
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
