import React, { useState } from 'react';
import { useInsurance } from '../context/InsuranceContext';
import { downloadPDF } from '../utils/exportUtils';

const CustomerPortalPage = ({ currentPath }) => {
  const { policies, payments, claims, currentUser, token, setActiveModal, setModalData } = useInsurance();
  const [showAllPayments, setShowAllPayments] = useState(false);
  
  // Filter for the current user's data using customerProfileId
  const myPolicies = policies.filter(p => p.customerId === currentUser?.customerProfileId);
  const myPayments = payments.filter(p => p.customerId === currentUser?.customerProfileId);
  const myClaims = claims.filter(c => c.customerId === currentUser?.customerProfileId);

  if (currentPath === 'my-claims') {
    return (
      <div className="p-10 max-w-[1440px] mx-auto space-y-8 animate-in fade-in">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-[32px] font-bold text-on-surface">My Claims</h1>
            <p className="text-[14px] text-on-surface-variant">Track the status of your recent claims</p>
          </div>
          <button onClick={() => setActiveModal('FILE_CLAIM')} className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg text-[12px] font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95 duration-100">
            <span className="material-symbols-outlined">add</span>
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
        <h1 className="text-[32px] font-bold text-on-surface">Documents</h1>
        <p className="text-[14px] text-on-surface-variant">Your policy documents and receipts</p>
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
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[32px] font-bold text-on-surface">Active Policies</h1>
          <p className="text-[14px] text-on-surface-variant">Manage your coverage and payments</p>
        </div>
        <button onClick={() => setActiveModal('NEW_POLICY')} className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg text-[12px] font-semibold hover:bg-surface-container-highest transition-colors active:scale-95 duration-100">
          <span className="material-symbols-outlined">add</span>
          New Policy
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Policies & History */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* Policy Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myPolicies.map((policy) => (
              <div key={policy.id} className="glass-card bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between border border-outline-variant hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={`p-2 rounded-lg ${policy.type.includes('Auto') ? 'bg-primary-fixed-dim/20 text-primary' : 'bg-secondary-container text-secondary'}`}>
                      <span className="material-symbols-outlined">{policy.type.includes('Auto') ? 'directions_car' : 'home'}</span>
                    </div>
                    <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-[11px] font-medium">{policy.status}</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold">{policy.type}</h3>
                    <p className="text-[13px] text-on-surface-variant">Policy: #{policy.id}</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-[11px] font-medium uppercase text-outline">Coverage Limit</p>
                    <p className="text-[20px] font-semibold">${policy.coverageLimit.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-8 flex gap-3">
                  <button onClick={() => { setModalData({ policyId: policy.id, amount: policy.premium }); setActiveModal('PAY_PREMIUM'); }} className="flex-1 py-2 bg-primary text-on-primary rounded-lg text-[12px] font-semibold active:scale-95 duration-100">Pay Premium</button>
                  <button onClick={() => downloadPDF(`Policy_${policy.id}_Document.pdf`, `/api/policies/${policy.id}/pdf`, token)} className="flex items-center justify-center w-12 h-10 border border-outline-variant text-on-surface-variant rounded-lg hover:bg-surface-container transition-colors">
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
