import React, { useState } from 'react';
import { useInsurance } from '../../context/InsuranceContext';

const GlobalModals = () => {
  const { 
    activeModal, setActiveModal, 
    modalData, 
    token, currentUser, customers, policies,
    addPolicy, addClaim, addPayment, setToastMsg,
    updateCustomer, updateClaimStatus, addCustomer
  } = useInsurance();

  const [loading, setLoading] = useState(false);

  if (!activeModal) return null;

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleNewPolicy = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch('/api/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        addPolicy(await res.json());
        closeModal();
      } else {
        alert('Failed to create policy');
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleFileClaim = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    
    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }, // Note: Do not set Content-Type, browser will set it to multipart/form-data with boundary
        body: formData
      });
      if (res.ok) {
        addClaim(await res.json());
        setToastMsg('Claim submitted with attachments!');
        closeModal();
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Failed to file claim: ${errData.error || res.statusText}`);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handlePayPremium = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          policyId: modalData?.policyId,
          amount: modalData?.amount || 312.50,
          description: `Premium Payment - ${modalData?.policyId || 'Auto'}`
        })
      });
      if (res.ok) {
        addPayment(await res.json());
        closeModal();
      } else {
        alert('Payment failed');
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleReassign = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating reassignment by updating adjusterNotes to reflect the new agent
    const formData = new FormData(e.target);
    const agentId = formData.get('agentId');
    
    // We reuse updateClaimStatus but pass adjusterNotes instead of status, wait, the API accepts both
    try {
      const res = await fetch(`/api/claims/${modalData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ adjusterNotes: `Reassigned to Agent ${agentId}` })
      });
      if (res.ok) {
        setToastMsg(`Claim #${modalData?.id} reassigned successfully.`);
        closeModal();
      } else {
        alert('Failed to reassign');
      }
    } catch (err) {
      console.error(err);
    }
    
    setLoading(false);
  };

  const handleEditCustomer = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    
    await updateCustomer(modalData.id, payload);
    
    setToastMsg('Customer details updated successfully.');
    closeModal();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-scrim/50 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* NEW CUSTOMER MODAL */}
        {activeModal === 'NEW_CUSTOMER' && (
          <form onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const formData = new FormData(e.target);
            const payload = Object.fromEntries(formData.entries());
            // Need to generate a password for them
            payload.password = "password123";
            const success = await addCustomer(payload);
            if (success) {
              setToastMsg('Customer registered successfully.');
              closeModal();
            } else {
              alert('Failed to add customer. Email might already exist.');
            }
            setLoading(false);
          }}>
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h2 className="text-[20px] font-bold text-on-surface">Register New Customer</h2>
              <button type="button" onClick={closeModal} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] font-semibold mb-1">Full Name</label>
                <input type="text" name="name" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold mb-1">Email Address</label>
                <input type="email" name="email" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold mb-1">Phone Number</label>
                <input type="tel" name="phone" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold mb-1">Address / Location</label>
                <input type="text" name="location" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-outline-variant flex justify-end gap-3 bg-surface-container-low">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-on-surface-variant font-semibold text-[13px] hover:bg-surface-container rounded-lg transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary font-bold text-[13px] rounded-lg transition-colors disabled:opacity-50">
                {loading ? 'Registering...' : 'Register Customer'}
              </button>
            </div>
          </form>
        )}

        {/* NEW POLICY MODAL */}
        {activeModal === 'NEW_POLICY' && (
          <form onSubmit={handleNewPolicy}>
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h2 className="text-[20px] font-bold text-on-surface">New Policy Application</h2>
              <button type="button" onClick={closeModal} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] font-semibold mb-1">Customer</label>
                <select name="customerId" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]">
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold mb-1">Policy Type</label>
                  <select name="type" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]">
                    <option value="Auto Comprehensive">Auto Comprehensive</option>
                    <option value="Homeowners Plus">Homeowners Plus</option>
                    <option value="Life Insurance">Life Insurance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold mb-1">Coverage Limit ($)</label>
                  <input type="number" name="coverageLimit" defaultValue="500000" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold mb-1">Monthly Premium ($)</label>
                  <input type="number" name="premium" defaultValue="150" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold mb-1">Deductible ($)</label>
                  <input type="number" name="deductible" defaultValue="1000" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold mb-1">Expiry Date</label>
                  <input type="date" name="expiryDate" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-surface-container transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-on-primary rounded-lg text-[13px] font-semibold active:scale-95 transition-transform disabled:opacity-50">
                {loading ? 'Saving...' : 'Create Policy'}
              </button>
            </div>
          </form>
        )}

        {/* FILE CLAIM MODAL */}
        {activeModal === 'FILE_CLAIM' && (
          <form onSubmit={handleFileClaim}>
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h2 className="text-[20px] font-bold text-on-surface">File a Claim</h2>
              <button type="button" onClick={closeModal} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] font-semibold mb-1">Select Policy</label>
                <select name="policyId" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]">
                  {policies.length === 0 && <option value="">No policies available</option>}
                  {policies.map(p => (
                    <option key={p.id} value={p.id}>{p.type} (Limit: ${p.coverageLimit}) - {p.id.slice(0, 8)}...</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold mb-1">Incident Type</label>
                  <select name="incidentType" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]">
                    <option value="Collision">Collision</option>
                    <option value="Theft">Theft</option>
                    <option value="Property Damage">Property Damage</option>
                    <option value="Weather/Act of God">Weather</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold mb-1">Estimated Loss ($)</label>
                  <input type="number" name="estimatedLoss" placeholder="0.00" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold mb-1">Description of Incident</label>
                <textarea name="description" rows="3" required placeholder="Provide full details..." className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px] resize-none"></textarea>
              </div>
              <div>
                <label className="block text-[12px] font-semibold mb-1">Supporting Documents</label>
                <input type="file" name="document" className="w-full bg-surface border border-outline-variant rounded-lg p-2 text-[13px] text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[12px] file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer" />
              </div>
            </div>
            <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-surface-container transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-on-primary rounded-lg text-[13px] font-semibold active:scale-95 transition-transform disabled:opacity-50">
                {loading ? 'Submitting...' : 'Submit Claim'}
              </button>
            </div>
          </form>
        )}

        {/* PAY PREMIUM MODAL */}
        {activeModal === 'PAY_PREMIUM' && (
          <form onSubmit={handlePayPremium}>
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h2 className="text-[20px] font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">lock</span> Secure Checkout
              </h2>
              <button type="button" onClick={closeModal} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="bg-primary-container text-on-primary-container p-4 rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wider opacity-80">Total Due</p>
                  <p className="text-[24px] font-bold">${modalData?.amount || '312.50'}</p>
                </div>
                <span className="material-symbols-outlined text-[40px] opacity-20">account_balance_wallet</span>
              </div>
              
              <div className="space-y-3">
                <label className="block text-[12px] font-semibold mb-1">Card Details</label>
                <input type="text" placeholder="Card Number (XXXX XXXX XXXX XXXX)" required className="w-full bg-surface border border-outline-variant rounded-lg p-3 text-[14px] tracking-widest" />
                <div className="flex gap-4">
                  <input type="text" placeholder="MM/YY" required className="w-1/2 bg-surface border border-outline-variant rounded-lg p-3 text-[14px]" />
                  <input type="text" placeholder="CVC" required className="w-1/2 bg-surface border border-outline-variant rounded-lg p-3 text-[14px]" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-surface-container transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-tertiary text-on-tertiary rounded-lg text-[13px] font-semibold active:scale-95 transition-transform disabled:opacity-50 flex items-center gap-2">
                {loading ? 'Processing...' : 'Pay Now'}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </form>
        )}

        {/* REASSIGN ADJUSTER MODAL */}
        {activeModal === 'REASSIGN_ADJUSTER' && (
          <form onSubmit={handleReassign}>
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h2 className="text-[20px] font-bold text-on-surface">Reassign Adjuster</h2>
              <button type="button" onClick={closeModal} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-[14px] text-on-surface-variant">
                Select a new agent for Claim <strong>#{modalData?.id}</strong>.
              </p>
              <div>
                <label className="block text-[12px] font-semibold mb-1">Select Agent</label>
                <select name="agentId" required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]">
                  <option value="AGENT_1">Sarah Jenkins (Senior Adjuster)</option>
                  <option value="AGENT_2">Michael Ross (Auto Specialist)</option>
                  <option value="AGENT_3">David Chen (Property Specialist)</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-surface-container transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-on-primary rounded-lg text-[13px] font-semibold active:scale-95 transition-transform disabled:opacity-50">
                {loading ? 'Saving...' : 'Reassign'}
              </button>
            </div>
          </form>
        )}

        {/* EDIT CUSTOMER MODAL */}
        {activeModal === 'EDIT_CUSTOMER' && (
          <form onSubmit={handleEditCustomer}>
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h2 className="text-[20px] font-bold text-on-surface">Edit Customer Profile</h2>
              <button type="button" onClick={closeModal} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold mb-1">Full Name</label>
                  <input type="text" name="name" defaultValue={modalData?.name} required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold mb-1">Email Address</label>
                  <input type="email" name="email" defaultValue={modalData?.email} required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold mb-1">Phone Number</label>
                  <input type="text" name="phone" defaultValue={modalData?.phone} required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold mb-1">Location</label>
                  <input type="text" name="location" defaultValue={modalData?.location || "123 Main St"} required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 text-[14px]" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-surface-container transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-on-primary rounded-lg text-[13px] font-semibold active:scale-95 transition-transform disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default GlobalModals;
