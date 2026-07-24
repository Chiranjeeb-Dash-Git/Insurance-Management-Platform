import React, { useState } from 'react';
import { useInsurance } from '../context/InsuranceContext';

import { downloadPDF } from '../utils/exportUtils';

const ClaimsApprovalPage = () => {
  const { claims, updateClaimStatus, setToastMsg, setActiveModal, setModalData, globalSearch } = useInsurance();
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const activeSearchTerm = searchTerm || globalSearch;

  // Filter claims
  const filteredClaims = claims.filter(c => {
    const matchSearch = c.id.toLowerCase().includes(activeSearchTerm.toLowerCase()) || 
                        c.incidentType.toLowerCase().includes(activeSearchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All Statuses' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
  const paginatedClaims = filteredClaims.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const currentClaim = selectedClaimId ? claims.find(c => c.id === selectedClaimId) : null;

  if (currentClaim) {
    return (
      <div className="p-10 max-w-[1440px] mx-auto space-y-6 animate-in fade-in">
        {/* Page Header (Breadcrumb & Actions) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-on-surface-variant mb-4">
              <span onClick={() => setSelectedClaimId(null)} className="hover:text-primary cursor-pointer font-semibold">Claims Dashboard</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-on-surface font-semibold">Claim {currentClaim.id.substring(0,8)}</span>
            </div>
            <h2 className="text-[32px] font-bold text-on-surface flex items-center gap-3">
              Claim {currentClaim.id.substring(0,8)}
              {currentClaim.status === 'In Review' && <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[12px] font-semibold border border-secondary/20 uppercase tracking-wider">{currentClaim.status}</span>}
              {currentClaim.status === 'Approved' && <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-[12px] font-semibold border border-tertiary/20 uppercase tracking-wider">{currentClaim.status}</span>}
              {currentClaim.status === 'Rejected' && <span className="px-3 py-1 bg-error-container text-on-error-container rounded-full text-[12px] font-semibold border border-error/20 uppercase tracking-wider">{currentClaim.status}</span>}
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
            <button onClick={() => downloadPDF(`Claim_${currentClaim.id}_Report`, `Claim_${currentClaim.id}_Report.pdf`)} className="px-4 py-2 border border-outline rounded-lg text-[12px] font-semibold text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">print</span>
              Export PDF
            </button>
            <button onClick={() => { setModalData(currentClaim); setActiveModal('REASSIGN_ADJUSTER'); }} className="px-4 py-2 border border-outline rounded-lg text-[12px] font-semibold text-on-surface hover:bg-surface-container transition-colors">
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
                <span className="text-on-surface-variant text-[13px]">{currentClaim.documents?.length || 0} Files Attached</span>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentClaim.documents && currentClaim.documents.length > 0 ? (
                  currentClaim.documents.map(doc => (
                    <div key={doc.id} onClick={() => window.open(doc.fileUrl, '_blank')} className="group border border-outline-variant rounded-lg p-4 flex items-center gap-4 hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-secondary-container rounded flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">description</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-semibold truncate">{doc.fileName}</p>
                        <p className="text-on-surface-variant text-[11px] font-medium">{doc.type}</p>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">visibility</span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full p-6 text-center border border-dashed border-outline-variant rounded-lg text-on-surface-variant">
                    <span className="material-symbols-outlined text-[32px] mb-2 text-outline-variant">folder_off</span>
                    <p className="text-[14px] font-semibold">No Documents Attached</p>
                    <p className="text-[12px]">The claimant did not upload any supporting documents.</p>
                  </div>
                )}
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
                  defaultValue={currentClaim.adjusterNotes || ''}
                  onChange={(e) => currentClaim.adjusterNotes = e.target.value}
                ></textarea>
              </div>
  
              {currentClaim.status === 'In Review' ? (
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      updateClaimStatus(currentClaim.id, 'Approved');
                      setToastMsg('Claim has been approved successfully.');
                      setSelectedClaimId(null);
                    }}
                    className="w-full bg-tertiary text-on-tertiary py-3 rounded-lg text-[12px] font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all flex justify-center items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">thumb_up</span>
                    Approve Claim
                  </button>
                  <button 
                    onClick={() => {
                      updateClaimStatus(currentClaim.id, 'Rejected');
                      setToastMsg('Claim has been denied.');
                      setSelectedClaimId(null);
                    }}
                    className="w-full bg-error-container text-on-error-container py-3 rounded-lg text-[12px] font-bold hover:bg-error hover:text-white transition-all flex justify-center items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">thumb_down</span>
                    Deny Claim
                  </button>
                </div>
              ) : (
                <div className={`p-4 rounded-lg flex items-center justify-center gap-3 font-bold ${currentClaim.status === 'Approved' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-error-container text-on-error-container'}`}>
                  <span className="material-symbols-outlined">{currentClaim.status === 'Approved' ? 'check_circle' : 'cancel'}</span>
                  Verdict Reached: {currentClaim.status}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-[1440px] mx-auto space-y-8 animate-in fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[32px] font-bold text-on-surface">Claims Management</h1>
          <p className="text-[14px] text-on-surface-variant">Review and process customer claims.</p>
        </div>
      </div>

      <section className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input 
            type="text" 
            placeholder="Search by ID or incident..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full bg-surface border border-outline-variant text-[14px] px-10 py-2.5 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="bg-surface border border-outline-variant rounded-lg px-4 py-2.5 text-[14px] text-on-surface-variant focus:border-primary outline-none"
          >
            <option>All Statuses</option>
            <option>In Review</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low text-on-surface-variant text-[12px] uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Claim ID</th>
                <th className="px-6 py-4 font-semibold">Incident</th>
                <th className="px-6 py-4 font-semibold">Date Filed</th>
                <th className="px-6 py-4 font-semibold">Estimated Loss</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-[14px]">
              {paginatedClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-surface-container transition-colors group cursor-pointer" onClick={() => setSelectedClaimId(claim.id)}>
                  <td className="px-6 py-4 font-mono text-[12px] text-on-surface-variant">{claim.id.substring(0,8)}</td>
                  <td className="px-6 py-4 font-semibold">{claim.incidentType}</td>
                  <td className="px-6 py-4">{claim.submittedDate}</td>
                  <td className="px-6 py-4 font-medium text-tertiary">${claim.estimatedLoss.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                      claim.status === 'Approved' ? 'bg-tertiary-container text-on-tertiary-container' : 
                      claim.status === 'Rejected' ? 'bg-error-container text-on-error-container' :
                      'bg-secondary-container text-on-secondary-container'
                    }`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary font-semibold hover:underline text-[13px]">Review</button>
                  </td>
                </tr>
              ))}
              {paginatedClaims.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-on-surface-variant">No claims found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-outline-variant flex justify-between items-center bg-surface-container-low">
            <span className="text-[13px] text-on-surface-variant">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-3 py-1 bg-surface border border-outline-variant rounded disabled:opacity-50 text-[13px] hover:bg-surface-container"
              >
                Previous
              </button>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-3 py-1 bg-surface border border-outline-variant rounded disabled:opacity-50 text-[13px] hover:bg-surface-container"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ClaimsApprovalPage;
