import React, { useState, useEffect } from 'react';
import { useInsurance } from '../context/InsuranceContext';

const PolicyManagementPage = () => {
  const { customers, policies, setActiveModal, setModalData, revokePolicy, renewPolicy, globalSearch } = useInsurance();
  const [showFilters, setShowFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [currentPage]);

  const activeSearchTerm = searchTerm || globalSearch;

  // Filter policies
  const filteredPolicies = policies.filter(p => {
    const customer = customers.find(c => c.id === p.customerId);
    const customerName = customer?.name || '';
    const matchSearch = customerName.toLowerCase().includes(activeSearchTerm.toLowerCase()) || 
                        p.id.toLowerCase().includes(activeSearchTerm.toLowerCase());
    const matchType = typeFilter === 'All Types' || p.type.includes(typeFilter);
    const matchStatus = statusFilter === 'All Statuses' || p.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const totalPages = Math.ceil(filteredPolicies.length / itemsPerPage);
  const paginatedPolicies = filteredPolicies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const isExpiringSoon = (dateString) => {
    if (!dateString) return false;
    const expiry = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(expiry - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && expiry > today;
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in">
      {/* Cyber Gradient Header Banner */}
      <div className="bg-gradient-to-br from-[#0b1329] via-[#101c38] to-[#0a1931] text-white border border-blue-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-blue-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>
        <span className="material-symbols-outlined absolute right-6 bottom-6 text-[110px] text-white/[0.04] pointer-events-none">policy</span>
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/30 shrink-0">
            <span className="material-symbols-outlined text-[32px] text-white">policy</span>
          </div>
          <div>
            <h1 className="text-[28px] font-extrabold text-white tracking-tight">Policy Management</h1>
            <p className="text-[14px] text-slate-300 mt-1">View, create, and manage active policies across all customer tiers</p>
          </div>
        </div>
        <button onClick={() => { setActiveModal('NEW_POLICY'); }} className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-xl text-[13px] font-extrabold uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-blue-600/30 border border-blue-400/30 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[20px]">add_moderator</span>
          New Policy
        </button>
      </div>

      {/* Search & Filter Header */}
      <section className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input 
            type="text" 
            placeholder="Search by ID or customer..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full bg-surface border border-outline-variant text-[14px] px-10 py-2.5 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
            className="bg-surface border border-outline-variant rounded-lg px-4 py-2.5 text-[14px] text-on-surface-variant focus:border-primary outline-none"
          >
            <option>All Types</option>
            <option>Auto</option>
            <option>Life</option>
            <option>Home</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="bg-surface border border-outline-variant rounded-lg px-4 py-2.5 text-[14px] text-on-surface-variant focus:border-primary outline-none"
          >
            <option>All Statuses</option>
            <option>Active</option>
            <option>Cancelled</option>
          </select>
        </div>
      </section>

      {/* Policies Table */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low text-on-surface-variant text-[12px] uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Policy Details</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Coverage / Premium</th>
                <th className="px-6 py-4 font-semibold">Status / Expiry</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-[14px]">
              {paginatedPolicies.map((policy, idx) => {
                const customer = customers.find(c => c.id === policy.customerId);
                const expiringSoon = isExpiringSoon(policy.expiryDate);

                return (
                  <tr key={policy.id} className="hover:bg-surface-container transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-on-surface">{policy.type}</p>
                      <p className="text-[12px] text-on-surface-variant font-mono">ID: {policy.id.substring(0,8)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold">{customer?.name}</p>
                      <p className="text-[12px] text-on-surface-variant">{customer?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold">${policy.coverageLimit?.toLocaleString()}</p>
                      <p className="text-[12px] text-on-surface-variant">${policy.premium}/mo</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 items-start">
                        {policy.status === 'Active' && !expiringSoon && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-tertiary-container text-on-tertiary-container">Active</span>
                        )}
                        {policy.status === 'Active' && expiringSoon && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-error-container text-on-error-container">Expiring Soon</span>
                        )}
                        {policy.status === 'Cancelled' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-surface-container-highest text-on-surface-variant">Cancelled</span>
                        )}
                        <span className="text-[11px] text-on-surface-variant">Exp: {policy.expiryDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button onClick={() => setOpenDropdown(openDropdown === policy.id ? null : policy.id)} className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors text-outline">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                      {openDropdown === policy.id && (
                        <div className="absolute right-8 top-10 bg-surface border border-outline-variant rounded-lg shadow-lg w-40 z-10 overflow-hidden text-left animate-in fade-in zoom-in-95">
                          {policy.status === 'Active' && (
                            <button onClick={() => { renewPolicy(policy.id); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-[12px] font-semibold hover:bg-surface-container-high transition-colors text-primary">
                              Renew Policy (1 yr)
                            </button>
                          )}
                          <button onClick={() => { revokePolicy(policy.id); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-error-container hover:text-error text-[12px] font-semibold text-error transition-colors">
                            Revoke Policy
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {paginatedPolicies.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-on-surface-variant">No policies found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
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

export default PolicyManagementPage;
