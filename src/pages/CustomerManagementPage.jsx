import React, { useState, useEffect } from 'react';
import { useInsurance } from '../context/InsuranceContext';

const CustomerManagementPage = () => {
  const { customers, token, setActiveModal, setModalData } = useInsurance();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomerHistory, setSelectedCustomerHistory] = useState(null);
  const itemsPerPage = 10;

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
    <div className="p-10 max-w-[1440px] mx-auto space-y-8 animate-in fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[32px] font-bold text-on-surface">Customer Management</h1>
          <p className="text-[14px] text-on-surface-variant">Manage customer profiles and view their history.</p>
        </div>
        <button onClick={() => setActiveModal('NEW_CUSTOMER')} className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg text-[12px] font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95 duration-100">
          <span className="material-symbols-outlined">person_add</span>
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
