import React from 'react';
import { useInsurance } from '../context/InsuranceContext';

const CustomerPortalPage = () => {
  const { policies, payments, claims } = useInsurance();
  
  // Filter for the current user's data (simplified for demo)
  const myPolicies = policies.filter(p => p.customerId === 'JD-99281-X');
  const myPayments = payments.filter(p => p.customerId === 'JD-99281-X');
  const myClaims = claims.filter(c => c.customerId === 'JD-99281-X');

  return (
    <div className="p-10 max-w-[1440px] mx-auto space-y-8">
      {/* Top Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[32px] font-bold text-on-surface">Active Policies</h1>
          <p className="text-[14px] text-on-surface-variant">Manage your coverage and payments</p>
        </div>
        <button className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg text-[12px] font-semibold hover:bg-surface-container-highest transition-colors active:scale-95 duration-100">
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
                  <button className="flex-1 py-2 bg-primary text-on-primary rounded-lg text-[12px] font-semibold active:scale-95 duration-100">Pay Premium</button>
                  <button className="flex items-center justify-center w-12 h-10 border border-outline-variant text-on-surface-variant rounded-lg hover:bg-surface-container transition-colors">
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
              <button className="text-primary text-[12px] font-semibold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[12px] font-semibold text-outline bg-surface-container-low/50">
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3 text-right">Amount</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] divide-y divide-outline-variant">
                  {myPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-surface-container transition-colors">
                      <td className="px-6 py-4">{payment.date}</td>
                      <td className="px-6 py-4">{payment.description}</td>
                      <td className="px-6 py-4 text-right font-semibold">${payment.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-tertiary/10 text-tertiary rounded text-[11px] font-medium">{payment.status}</span>
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
              <button className="w-full mt-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-surface-bright transition-colors active:scale-95 duration-100">
                Pay Now
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
                  <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${myClaims[0].status === 'In Review' ? 'bg-secondary-container text-on-secondary-container' : 'bg-tertiary/10 text-tertiary'}`}>
                    {myClaims[0].status}
                  </span>
                </div>
                
                {/* Progress Stepper */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
                  <div className={`h-1.5 flex-1 rounded-full ${myClaims[0].status === 'Approved' ? 'bg-primary' : 'bg-primary'}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${myClaims[0].status === 'Approved' ? 'bg-primary' : 'bg-surface-container-highest'}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${myClaims[0].status === 'Approved' ? 'bg-primary' : 'bg-surface-container-highest'}`}></div>
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
