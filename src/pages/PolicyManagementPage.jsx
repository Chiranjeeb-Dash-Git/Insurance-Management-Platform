import React from 'react';
import { useInsurance } from '../context/InsuranceContext';

const PolicyManagementPage = () => {
  const { customers, policies } = useInsurance();

  return (
    <div className="p-10 max-w-[1440px] mx-auto space-y-8">
      {/* Search & Filter Header */}
      <section className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input 
            type="text" 
            placeholder="Search customers or policies..." 
            className="w-full bg-surface border border-outline-variant text-[14px] px-10 py-2 rounded-lg focus:ring-2 focus:ring-primary transition-all outline-none"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select className="bg-surface border border-outline-variant rounded-lg px-4 py-2 text-[14px] text-on-surface-variant focus:ring-primary outline-none">
            <option>All Types</option>
            <option>Auto Insurance</option>
            <option>Life Insurance</option>
            <option>Homeowners</option>
          </select>
          <select className="bg-surface border border-outline-variant rounded-lg px-4 py-2 text-[14px] text-on-surface-variant focus:ring-primary outline-none">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Expiring soon</option>
            <option>Cancelled</option>
          </select>
          <button className="bg-surface hover:bg-surface-container-high border border-outline-variant px-4 py-2 rounded-lg text-[12px] font-semibold flex items-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            More Filters
          </button>
        </div>
      </section>

      {/* Customer Directory Table */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm flex flex-col">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h3 className="text-[20px] font-semibold">Customer Directory</h3>
          <span className="text-[12px] font-semibold text-primary">{customers.length} Total Customers</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low/50">
                <th className="px-6 py-4 text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">Policy Type</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {policies.map((policy, idx) => {
                const customer = customers.find(c => c.id === policy.customerId);
                const bgColors = ['primary-fixed', 'secondary-fixed', 'surface-container-highest'];
                const textColors = ['primary', 'secondary', 'outline'];
                const colorIdx = idx % bgColors.length;

                return (
                  <tr key={policy.id} className="hover:bg-surface-container transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-${bgColors[colorIdx]} flex items-center justify-center text-${textColors[colorIdx]} font-bold`}>
                          {customer?.initials}
                        </div>
                        <div>
                          <p className="text-[14px] font-semibold">{customer?.name}</p>
                          <p className="text-[13px] text-on-surface-variant">{customer?.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px]">{policy.type}</td>
                    <td className="px-6 py-4">
                      {policy.status === 'Active' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tertiary/10 text-tertiary">Active</span>
                      )}
                      {policy.status === 'Expiring soon' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Expiring soon</span>
                      )}
                      {policy.status === 'Cancelled' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-container text-on-error-container">Cancelled</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors text-outline">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PolicyManagementPage;
