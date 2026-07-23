import React from 'react';
import { useInsurance } from '../context/InsuranceContext';

const ClaimsApprovalPage = () => {
  const { claims, updateClaimStatus } = useInsurance();
  const currentClaim = claims[0]; // Just showing the first one as a detailed view for the demo

  return (
    <div className="p-10 max-w-[1440px] mx-auto space-y-6">
      {/* Page Header (Breadcrumb & Actions) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-[13px] text-on-surface-variant mb-2">
            <span className="hover:text-primary cursor-pointer">Claims Dashboard</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-on-surface font-semibold">{currentClaim.id}</span>
          </div>
          <h2 className="text-[32px] font-bold text-on-surface flex items-center gap-3">
            Claim {currentClaim.id}
            {currentClaim.status === 'In Review' && <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[12px] font-semibold border border-secondary/20 uppercase tracking-wider">{currentClaim.status}</span>}
            {currentClaim.status === 'Approved' && <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-[12px] font-semibold border border-tertiary/20 uppercase tracking-wider">{currentClaim.status}</span>}
          </h2>
          <div className="flex items-center gap-4 mt-2 text-on-surface-variant text-[13px]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">person</span>
              Assigned to: Agent Smith
            </span>
            <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span>
              Submitted {currentClaim.submittedDate}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-outline rounded-lg text-[12px] font-semibold text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">print</span>
            Export PDF
          </button>
          <button className="px-4 py-2 border border-outline rounded-lg text-[12px] font-semibold text-on-surface hover:bg-surface-container transition-colors">
            Reassign Adjuster
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Details & Documents */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Claim Details Card */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[20px] font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Claim Overview
              </h3>
              <button className="text-primary text-[12px] font-semibold hover:underline">Edit Info</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div className="space-y-1">
                <p className="text-on-surface-variant text-[12px] font-semibold uppercase tracking-wider">Policy Number</p>
                <p className="text-[16px] font-bold text-primary">{currentClaim.policyId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-on-surface-variant text-[12px] font-semibold uppercase tracking-wider">Claimant ID</p>
                <p className="text-[16px] font-medium">{currentClaim.customerId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-on-surface-variant text-[12px] font-semibold uppercase tracking-wider">Incident Date</p>
                <p className="text-[16px] font-medium">{currentClaim.submittedDate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-on-surface-variant text-[12px] font-semibold uppercase tracking-wider">Estimated Loss</p>
                <p className="text-[16px] font-medium text-tertiary">${currentClaim.estimatedLoss.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
              </div>
              
              <div className="col-span-full space-y-1 pt-4 border-t border-outline-variant">
                <p className="text-on-surface-variant text-[12px] font-semibold uppercase tracking-wider">Incident Description</p>
                <p className="text-[14px] leading-relaxed">
                  {currentClaim.description}
                </p>
              </div>
            </div>
          </section>

          {/* Supporting Documents Section */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[20px] font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">folder_open</span>
                Supporting Documents
              </h3>
              <span className="text-on-surface-variant text-[13px]">4 Files Attached</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group border border-outline-variant rounded-lg p-4 flex items-center gap-4 hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer">
                <div className="w-12 h-12 bg-secondary-container rounded flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">badge</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold truncate">Drivers_License_Wright.jpg</p>
                  <p className="text-on-surface-variant text-[11px] font-medium">Identification • 1.2 MB</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">visibility</span>
              </div>
              <div className="group border border-outline-variant rounded-lg p-4 flex items-center gap-4 hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer">
                <div className="w-12 h-12 bg-secondary-container rounded flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">image</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold truncate">Damage_Rear_Bumper_01.jpg</p>
                  <p className="text-on-surface-variant text-[11px] font-medium">Incident Photos • 4.5 MB</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">visibility</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Adjuster Workspace */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm sticky top-24">
            <h3 className="text-[20px] font-semibold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">gavel</span>
              Adjuster Verdict
            </h3>
            
            <div className="space-y-4 mb-8">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary border-outline-variant" defaultChecked />
                <span className="text-[14px] text-on-surface group-hover:text-primary transition-colors">Identity & Policy Verified</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary border-outline-variant" defaultChecked />
                <span className="text-[14px] text-on-surface group-hover:text-primary transition-colors">Damage Assessment Matches Police Report</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary border-outline-variant" />
                <span className="text-[14px] text-on-surface group-hover:text-primary transition-colors">Fraud Check Passed (Third-party validation)</span>
              </label>
            </div>

            <div className="space-y-2 mb-6">
              <label className="text-[12px] font-semibold text-on-surface uppercase tracking-wider">Internal Notes (Not visible to customer)</label>
              <textarea 
                className="w-full bg-surface border border-outline-variant rounded-lg p-3 text-[14px] focus:ring-2 focus:ring-primary outline-none transition-all resize-none h-24"
                placeholder="Add notes for final approval..."
              ></textarea>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => updateClaimStatus(currentClaim.id, 'Approved')}
                className="w-full bg-tertiary text-on-tertiary py-3 rounded-lg text-[12px] font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">thumb_up</span>
                Approve Claim
              </button>
              <button 
                onClick={() => updateClaimStatus(currentClaim.id, 'Rejected')}
                className="w-full bg-error-container text-on-error-container py-3 rounded-lg text-[12px] font-bold hover:bg-error hover:text-white transition-all flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">thumb_down</span>
                Deny Claim
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClaimsApprovalPage;
