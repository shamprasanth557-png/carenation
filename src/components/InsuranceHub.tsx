import React, { useState, useEffect } from 'react';
import {
  FileCheck2,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Info,
  Clock,
  Send,
  Building,
  ChevronRight,
  ListOrdered
} from 'lucide-react';
import { InsurancePlan, InsuranceApplication } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export const InsuranceHub: React.FC = () => {
  const { t, isTamil } = useLanguage();
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [applications, setApplications] = useState<InsuranceApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'plans' | 'tracker'>('plans');

  // Application Modal state
  const [applyingPlan, setApplyingPlan] = useState<InsurancePlan | null>(null);
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantPhone, setApplicantPhone] = useState<string>('');
  const [applicantAadhaarOrId, setApplicantAadhaarOrId] = useState<string>('');
  const [district, setDistrict] = useState<string>('Coimbatore');
  const [familyMembersCount, setFamilyMembersCount] = useState<number>(4);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [plansData, appsData] = await Promise.all([
        api.getInsurancePlans(),
        api.getInsuranceApplications()
      ]);
      setPlans(plansData);
      setApplications(appsData);
    } catch (err) {
      console.error('Failed to load insurance data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenApplication = (plan: InsurancePlan) => {
    setApplyingPlan(plan);
    setSubmitSuccess(null);
    setSubmitError(null);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingPlan) return;

    if (!applicantName.trim()) {
      setSubmitError(isTamil ? 'விண்ணப்பதாரர் பெயரை உள்ளிடவும்' : 'Please enter applicant name');
      return;
    }

    const cleanPhone = applicantPhone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setSubmitError(
        isTamil
          ? 'சரியான 10 இலக்க இந்திய மொபைல் எண்ணை உள்ளிடவும்'
          : 'Please enter a valid 10-digit Indian mobile number'
      );
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      const res = await api.submitInsuranceApplication({
        planId: applyingPlan.id,
        planNameEn: applyingPlan.nameEn,
        planNameTa: applyingPlan.nameTa,
        applicantName: applicantName.trim(),
        applicantPhone: cleanPhone,
        applicantAadhaarOrId: applicantAadhaarOrId.trim() || 'Smart Card Verified',
        district,
        familyMembersCount
      });

      setSubmitSuccess(t.insurance.submitSuccess);
      setApplications(prev => [res.application, ...prev]);

      setTimeout(() => {
        setApplyingPlan(null);
        setApplicantName('');
        setApplicantPhone('');
        setApplicantAadhaarOrId('');
        setSubmitSuccess(null);
        setActiveTab('tracker');
      }, 1800);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit application request');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPlans = plans.filter(p => {
    const matchesSearch =
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameTa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.providerEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.providerTa.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' ||
      (categoryFilter === 'Government' && p.category === 'Government Health Scheme') ||
      (categoryFilter === 'Comprehensive' && (p.category === 'Private Comprehensive' || p.category === 'Public Health Insurance'));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
              <FileCheck2 className="w-4 h-4 text-teal-600" />
              <span>{isTamil ? 'அரசு மற்றும் பொது சுகாதாரக் காப்பீடு வழிகாட்டி' : 'Health Insurance & Government Welfare Schemes'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.insurance.title}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
              {t.insurance.subtitle}
            </p>
          </div>

          <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'plans'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isTamil ? 'திட்டங்கள் & ஒப்பீடு' : 'Compare Plans'}
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'tracker'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5 text-teal-600" />
              <span>{isTamil ? 'என் விண்ணப்பங்கள்' : 'My Requests'} ({applications.length})</span>
            </button>
          </div>
        </div>

        {/* Disclaimer alert */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800 block mb-0.5">{t.common.disclaimerTitle}:</span>
            {t.insurance.disclaimer}
          </div>
        </div>

        {/* Search & Category Filter */}
        {activeTab === 'plans' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes (e.g. CMCHIS, Ayushman Bharat, Star Health)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50"
              />
            </div>

            <div className="relative">
              <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/50 appearance-none text-slate-700 font-medium"
              >
                <option value="all">{t.insurance.categoryAll}</option>
                <option value="Government">{t.insurance.categoryGovt}</option>
                <option value="Comprehensive">{t.insurance.categoryPrivate}</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">
          <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          {t.common.loading}
        </div>
      ) : activeTab === 'plans' ? (
        /* Plans Comparison Cards */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPlans.map((plan) => {
            const planName = isTamil ? plan.nameTa : plan.nameEn;
            const provider = isTamil ? plan.providerTa : plan.providerEn;
            const sumInsured = isTamil ? plan.sumInsuredTa : plan.sumInsuredEn;
            const premium = isTamil ? plan.premiumTa : plan.premiumEn;
            const eligibility = isTamil ? plan.eligibilityTa : plan.eligibilityEn;
            const benefits = isTamil ? plan.benefitsTa : plan.benefitsEn;
            const waitingPeriod = isTamil ? plan.waitingPeriodTa : plan.waitingPeriodEn;

            return (
              <div
                key={plan.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        plan.category === 'Government Health Scheme'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {plan.category}
                    </span>

                    <span className="text-[11px] font-semibold text-slate-500">
                      {plan.verifiedSource.split('(')[0].trim()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {planName}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    {provider}
                  </div>

                  {/* Coverage & Premium highlights */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-100">
                      <span className="text-teal-800 font-bold block text-[10px] uppercase">
                        {t.insurance.sumInsured}
                      </span>
                      <span className="text-teal-950 font-extrabold text-sm block mt-0.5">
                        {sumInsured}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">
                        {t.insurance.premium}
                      </span>
                      <span className="text-slate-800 font-semibold block mt-0.5">
                        {premium}
                      </span>
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-bold text-slate-700 block mb-1 uppercase text-[10px]">
                      {t.insurance.eligibility}:
                    </span>
                    <p className="text-slate-600 leading-relaxed">{eligibility}</p>
                  </div>

                  {/* Covered Benefits */}
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                      {t.insurance.benefits}:
                    </span>
                    {benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Waiting Period */}
                  <div className="mt-4 text-xs text-slate-500 border-t border-slate-100 pt-3">
                    <span className="font-semibold text-slate-700">{t.insurance.waitingPeriod}:</span>{' '}
                    <span>{waitingPeriod}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <a
                    href={plan.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 underline underline-offset-2"
                  >
                    <span>{t.insurance.officialPortal}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleOpenApplication(plan)}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{t.insurance.applyButton}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Applications Tracker Tab */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              {t.insurance.internalTrackerTitle}
            </h3>
            <span className="text-xs text-slate-500">
              Total Recorded Requests: <strong className="text-slate-800">{applications.length}</strong>
            </span>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
              <FileCheck2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 text-xs">No scheme requests submitted yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800">
                        {app.status}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">ID: {app.id}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">
                      {isTamil ? app.planNameTa : app.planNameEn}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
                      <div>
                        Applicant: <strong className="text-slate-800">{app.applicantName}</strong>
                      </div>
                      <div>
                        Phone: <strong className="text-slate-800">+91 {app.applicantPhone}</strong>
                      </div>
                      <div>
                        District: <strong className="text-slate-800">{app.district}</strong>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 pt-1">
                      Internal CareNation Status: <em>{app.internalNotes}</em>
                    </div>
                  </div>

                  <div className="text-right text-xs text-slate-400 self-end md:self-center">
                    Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Assistance Request Modal */}
      {applyingPlan && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  {t.insurance.applyModalTitle}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {isTamil ? applyingPlan.nameTa : applyingPlan.nameEn}
                </h3>
              </div>
              <button
                onClick={() => setApplyingPlan(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
              >
                ✕
              </button>
            </div>

            {submitSuccess ? (
              <div className="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">{t.common.success}!</h4>
                <p className="text-xs text-emerald-800">{submitSuccess}</p>
                <div className="text-[11px] text-emerald-700 italic">Redirecting to status tracker...</div>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="mt-5 space-y-4 text-xs sm:text-sm">
                {submitError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                    {submitError}
                  </div>
                )}

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {t.insurance.applicantName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Shanmugam P"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {t.insurance.applicantPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="9842000000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {t.insurance.applicantId}
                  </label>
                  <input
                    type="text"
                    value={applicantAadhaarOrId}
                    onChange={(e) => setApplicantAadhaarOrId(e.target.value)}
                    placeholder="e.g. TN Smart Card 3301XXXX or Aadhaar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {t.insurance.district}
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                    >
                      <option value="Coimbatore">Coimbatore (கோயம்புத்தூர்)</option>
                      <option value="Tiruppur">Tiruppur (திருப்பூர்)</option>
                      <option value="Erode">Erode (ஈரோடு)</option>
                      <option value="Salem">Salem (சேலம்)</option>
                      <option value="Chennai">Chennai (சென்னை)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {t.insurance.familyCount}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={familyMembersCount}
                      onChange={(e) => setFamilyMembersCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-700 block mb-0.5">Disclaimer Notice:</span>
                  This logs an assistance and pre-qualification check in the CareNation system. It is not an approval letter issued by United India Insurance or the Government of Tamil Nadu.
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setApplyingPlan(null)}
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};
