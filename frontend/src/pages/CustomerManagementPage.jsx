import React, { useState, useEffect } from 'react';
import { useInsurance } from '../context/InsuranceContext';

const CustomerManagementPage = () => {
  const { customers, token, setActiveModal, setModalData } = useInsurance();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomerHistory, setSelectedCustomerHistory] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [currentPage, selectedCustomerHistory]);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const fetchCustomerHistory = async (id) => {
    try {
      const res = await fetch(`/api/customers/${id}/history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSelectedCustomerHistory(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in">
      {/* Cyber Gradient Header Banner */}
      <div className="bg-gradient-to-br from-[#0b1329] via-[#101c38] to-[#0a1931] text-white border border-blue-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-blue-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>
        <span className="material-symbols-outlined absolute right-6 bottom-6 text-[110px] text-white/[0.04] pointer-events-none">groups</span>
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/30 shrink-0">
            <span className="material-symbols-outlined text-[32px] text-white">groups</span>
          </div>
          <div>
            <h1 className="text-[28px] font-extrabold text-white tracking-tight">Customer Management</h1>
            <p className="text-[14px] text-slate-300 mt-1">Manage customer accounts, policy portfolios, and real-time interaction history</p>
          </div>
        </div>
        <button onClick={() => setActiveModal('NEW_CUSTOMER')} className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-xl text-[13px] font-extrabold uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-blue-600/30 border border-blue-400/30 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Add Customer
        </button>
      </div>

      <div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-4 py-2.5 text-[14px] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant text-[12px] text-on-surface-variant bg-surface-container-low">
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Contact Info</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {paginatedCustomers.map(customer => (
                  <tr key={customer.id} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors group cursor-pointer" onClick={() => fetchCustomerHistory(customer.id)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary-container text-secondary font-bold flex items-center justify-center text-[12px]">
                          {customer.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-on-surface">{customer.name}</p>
                          <p className="text-[11px] text-on-surface-variant">ID: {customer.id.substring(0,8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p>{customer.email}</p>
                      <p className="text-[12px] text-on-surface-variant">{customer.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px]">{customer.location}</span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={(e) => { e.stopPropagation(); setModalData(customer); setActiveModal('EDIT_CUSTOMER'); }} className="text-primary hover:bg-primary-container p-2 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedCustomers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-on-surface-variant">No customers found.</td>
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
        </div>

        {/* Customer History Sidebar */}
        <div className="lg:col-span-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
          {selectedCustomerHistory ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container text-secondary font-bold flex items-center justify-center text-[16px]">
                  {selectedCustomerHistory.user.name.split(' ').map(n=>n[0]).join('').substring(0,2)}
                </div>
                <div>
                  <h2 className="text-[20px] font-bold">{selectedCustomerHistory.user.name}</h2>
                  <p className="text-[13px] text-on-surface-variant">{selectedCustomerHistory.user.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-surface-container-low p-4 rounded-lg">
                  <h3 className="text-[14px] font-semibold mb-2">Policies</h3>
                  {selectedCustomerHistory.policies.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedCustomerHistory.policies.map(p => (
                        <li key={p.id} className="flex justify-between items-center text-[13px]">
                          <span>{p.type}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] ${p.status === 'Active' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-error-container text-on-error-container'}`}>{p.status}</span>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-[12px] text-on-surface-variant">No policies found.</p>}
                </div>

                <div className="bg-surface-container-low p-4 rounded-lg">
                  <h3 className="text-[14px] font-semibold mb-2">Recent Claims</h3>
                  {selectedCustomerHistory.claims.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedCustomerHistory.claims.slice(0,3).map(c => (
                        <li key={c.id} className="flex justify-between items-center text-[13px]">
                          <span>{c.incidentType}</span>
                          <span className="font-semibold">${c.estimatedLoss}</span>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-[12px] text-on-surface-variant">No claims filed.</p>}
                </div>

                <div className="bg-surface-container-low p-4 rounded-lg">
                  <h3 className="text-[14px] font-semibold mb-2">Recent Payments</h3>
                  {selectedCustomerHistory.payments.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedCustomerHistory.payments.slice(0,3).map(p => (
                        <li key={p.id} className="flex justify-between items-center text-[13px]">
                          <span>{p.date}</span>
                          <span className="font-semibold text-tertiary">${p.amount}</span>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-[12px] text-on-surface-variant">No payments made.</p>}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-on-surface-variant opacity-60 min-h-[300px]">
              <span className="material-symbols-outlined text-[48px] mb-4">person_search</span>
              <p>Select a customer to view their history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerManagementPage;
