import React, { useState, useEffect } from 'react';
import { useInsurance } from '../context/InsuranceContext';
import { downloadPDF } from '../utils/exportUtils';

const CustomerPortalPage = ({ currentPath }) => {
  const { policies, payments, claims, currentUser, token, setActiveModal, setModalData } = useInsurance();
  const [showAllPayments, setShowAllPayments] = useState(false);
  
  useEffect(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [currentPath, showAllPayments]);

  // Filter for the current user's data using customerProfileId
  const myPolicies = policies.filter(p => p.customerId === currentUser?.customerProfileId);
  const myPayments = payments.filter(p => p.customerId === currentUser?.customerProfileId);
  const myClaims = claims.filter(c => c.customerId === currentUser?.customerProfileId);

  if (currentPath === 'my-claims') {
    return (
      <div className="p-10 max-w-[1440px] mx-auto space-y-8 animate-in fade-in">
        {/* Cyber Gradient Header Banner */}
        <div className="bg-gradient-to-br from-[#0b1329] via-[#101c38] to-[#0a1931] text-white border border-blue-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-blue-500/15 blur-3xl pointer-events-none"></div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>
          <span className="material-symbols-outlined absolute right-6 bottom-6 text-[110px] text-white/[0.04] pointer-events-none">assignment</span>
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-indigo-400/30 shrink-0">
              <span className="material-symbols-outlined text-[32px] text-white">assignment</span>
            </div>
            <div>
              <h1 className="text-[28px] font-extrabold text-white tracking-tight">My Claims</h1>
              <p className="text-[14px] text-slate-300 mt-1">Track the status, adjuster reviews, and settlement payouts of your recent claims</p>
            </div>
          </div>
          <button onClick={() => setActiveModal('FILE_CLAIM')} className="relative z-10 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white px-6 py-3.5 rounded-xl text-[13px] font-extrabold uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-cyan-500/30 border border-cyan-400/30 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            File a Claim
          </button>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant text-[12px] text-on-surface-variant">
                <th className="px-6 py-4 font-semibold">Claim ID</th>
                <th className="px-6 py-4 font-semibold">Date Filed</th>
                <th className="px-6 py-4 font-semibold">Incident</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {myClaims.map((claim) => (
                <tr key={claim.id} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-semibold">#{claim.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-6 py-4">{claim.submittedDate}</td>
                  <td className="px-6 py-4">{claim.incidentType}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${
                      claim.status === 'Approved' ? 'bg-tertiary-container text-on-tertiary-container' : 
                      claim.status === 'Rejected' ? 'bg-error-container text-on-error-container' :
                      'bg-secondary-container text-on-secondary-container'
                    }`}>
                      {claim.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (currentPath === 'documents') {
    return (
      <div className="p-10 max-w-[1440px] mx-auto space-y-8 animate-in fade-in">
        {/* Cyber Gradient Header Banner */}
        <div className="bg-gradient-to-br from-[#0b1329] via-[#101c38] to-[#0a1931] text-white border border-blue-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-blue-500/15 blur-3xl pointer-events-none"></div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>
          <span className="material-symbols-outlined absolute right-6 bottom-6 text-[110px] text-white/[0.04] pointer-events-none">folder</span>
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/30 shrink-0">
              <span className="material-symbols-outlined text-[32px] text-white">folder</span>
            </div>
            <div>
              <h1 className="text-[28px] font-extrabold text-white tracking-tight">Documents</h1>
              <p className="text-[14px] text-slate-300 mt-1">Access, download, and review all your policy agreements, terms, and billing receipts</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPolicies.map(policy => (
            <div key={policy.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
              <div className="w-12 h-12 bg-secondary-container rounded flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div>
                <h3 className="font-bold">Policy Document - {policy.type}</h3>
                <p className="text-[12px] text-on-surface-variant">Updated {policy.createdAt ? new Date(policy.createdAt).toLocaleDateString() : 'Recently'}</p>
              </div>
              <button onClick={() => downloadPDF(`Policy_${policy.id}`, `/api/policies/${policy.id}/pdf`, token)} className="mt-2 w-full py-2 border border-outline-variant rounded-lg text-[12px] font-semibold hover:bg-surface-container transition-colors flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">download</span>
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-[1440px] mx-auto space-y-8 animate-in fade-in">
      {/* Top Section */}
      {/* Cyber Gradient Header Banner */}
      <div className="bg-gradient-to-br from-[#0b1329] via-[#101c38] to-[#0a1931] text-white border border-blue-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-blue-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>
        <span className="material-symbols-outlined absolute right-6 bottom-6 text-[110px] text-white/[0.04] pointer-events-none">shield</span>
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/30 shrink-0">
            <span className="material-symbols-outlined text-[32px] text-white">shield</span>
          </div>
          <div>
            <h1 className="text-[28px] font-extrabold text-white tracking-tight">Active Policies</h1>
            <p className="text-[14px] text-slate-300 mt-1">Manage your coverage plans, premium schedules, and instant policy benefits</p>
          </div>
        </div>
        <button onClick={() => setActiveModal('NEW_POLICY')} className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-xl text-[13px] font-extrabold uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-blue-600/30 border border-blue-400/30 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          New Policy
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Policies & History */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* Policy Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myPolicies.map((policy) => (
              <div key={policy.id} className={`relative overflow-hidden bg-gradient-to-br ${policy.type.includes('Auto') ? 'from-[#0058be] via-[#004395] to-[#00285a] border-blue-400/30 shadow-blue-600/20 hover:shadow-blue-500/30' : 'from-[#0284c7] via-[#0369a1] to-[#0c4a6e] border-sky-400/30 shadow-sky-600/20 hover:shadow-sky-500/30'} p-6 rounded-2xl flex flex-col justify-between border shadow-xl transition-all duration-300 hover:scale-[1.02] group`}>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:bg-white/20 transition-all duration-500"></div>
                <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-[100px] text-white/[0.07] pointer-events-none group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">{policy.type.includes('Auto') ? 'directions_car' : 'home'}</span>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-white/15 backdrop-blur-md text-white rounded-xl shadow-inner border border-white/20 transition-transform duration-300 group-hover:scale-110">
                      <span className="material-symbols-outlined text-[24px]">{policy.type.includes('Auto') ? 'directions_car' : 'home'}</span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">{policy.status}</span>
                  </div>
                  <div>
                    <h3 className="text-[22px] font-extrabold text-white tracking-tight">{policy.type}</h3>
                    <p className="text-[13px] text-white/80 font-medium">Policy: #{policy.id}</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Coverage Limit</p>
                    <p className="text-[24px] font-extrabold text-white drop-shadow-sm">${policy.coverageLimit.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-8 flex gap-3 relative z-10">
                  <button onClick={() => { setModalData({ policyId: policy.id, amount: policy.premium }); setActiveModal('PAY_PREMIUM'); }} className="flex-1 py-2.5 bg-white text-primary rounded-xl text-[13px] font-bold hover:bg-white/90 shadow-md active:scale-95 transition-all duration-150">Pay Premium</button>
                  <button onClick={() => downloadPDF(`Policy_${policy.id}_Document.pdf`, `/api/policies/${policy.id}/pdf`, token)} className="flex items-center justify-center w-12 h-11 bg-white/15 border border-white/20 text-white rounded-xl hover:bg-white/25 transition-colors backdrop-blur-md">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Payment History */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h2 className="text-[20px] font-semibold">Payment History</h2>
              <button onClick={() => setShowAllPayments(!showAllPayments)} className="text-primary text-[12px] font-semibold hover:underline">
                {showAllPayments ? 'View Less' : 'View All'}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant text-[12px] text-on-surface-variant">
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Description</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Receipt</th>
                  </tr>
                </thead>
                <tbody className="text-[14px]">
                  {(showAllPayments ? myPayments : myPayments.slice(0, 3)).map((payment, index) => (
                    <tr key={payment.id || index} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4">{payment.date}</td>
                      <td className="px-6 py-4">{payment.description}</td>
                      <td className="px-6 py-4 font-semibold">${payment.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${
                          payment.status === 'Successful' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-error-container text-on-error-container'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => downloadPDF(`Receipt_${payment.id}.pdf`, `/api/payments/${payment.id}/receipt`, token)} className="text-primary text-[12px] font-semibold hover:underline flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">download</span>
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Payment Due Widget */}
          <div className="bg-primary-container p-6 rounded-xl text-on-primary-container shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[12px] font-semibold opacity-80 uppercase tracking-wider">Next Payment Due</p>
              <h2 className="text-[32px] font-bold mt-1">Oct 28, 2023</h2>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-[20px] font-semibold">$312.50</span>
                <span className="text-[13px] bg-white/20 px-2 py-1 rounded">2 policies</span>
              </div>
              <button onClick={() => { 
                if (myPolicies.length === 0) {
                  alert('You do not have any active policies to pay for.');
                  return;
                }
                setModalData({ policyId: myPolicies[0].id, amount: 312.50 }); 
                setActiveModal('PAY_PREMIUM'); 
              }} className="w-full mt-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-surface-bright transition-colors active:scale-95 duration-100">
                Proceed to Payment
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-[120px]">account_balance_wallet</span>
            </div>
          </div>

          {/* Recent Claim Widget */}
          {myClaims.length > 0 && (
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-secondary">assignment_late</span>
                <h2 className="text-[20px] font-semibold">Recent Claim</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[12px] font-semibold">Claim #{myClaims[0].id}</p>
                    <p className="text-[13px] text-on-surface-variant">{myClaims[0].incidentType}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${myClaims[0]?.status === 'In Review' ? 'bg-secondary-container text-on-secondary-container' : 'bg-tertiary/10 text-tertiary'}`}>
                    {myClaims[0]?.status}
                  </span>
                </div>
                
                {/* Progress Stepper */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
                  <div className={`h-1.5 flex-1 rounded-full ${myClaims[0]?.status === 'Approved' ? 'bg-primary' : 'bg-primary'}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${myClaims[0]?.status === 'Approved' ? 'bg-primary' : 'bg-surface-container-highest'}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${myClaims[0]?.status === 'Approved' ? 'bg-primary' : 'bg-surface-container-highest'}`}></div>
                </div>
                <div className="flex justify-between text-[11px] font-medium text-on-surface-variant">
                  <span>Submitted</span>
                  <span>Review</span>
                  <span>Estimate</span>
                  <span>Paid</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPortalPage;
