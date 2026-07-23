import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCustomers, initialPolicies, initialClaims, initialPayments, systemMetrics } from '../data/mockData';

const InsuranceContext = createContext();

export const InsuranceProvider = ({ children }) => {
  // Roles: 'Administrator', 'Agent', 'Customer'
  const [currentRole, setCurrentRole] = useState('Administrator');
  const [currentUser, setCurrentUser] = useState({ name: 'Alexander Admin', id: 'ADM-01', level: 'Level 4 Admin' });
  
  const [customers, setCustomers] = useState(initialCustomers);
  const [policies, setPolicies] = useState(initialPolicies);
  const [claims, setClaims] = useState(initialClaims);
  const [payments, setPayments] = useState(initialPayments);
  const [metrics, setMetrics] = useState(systemMetrics);

  // Example functions to update state
  const addCustomer = (customer) => setCustomers([...customers, customer]);
  const addPolicy = (policy) => setPolicies([...policies, policy]);
  const addClaim = (claim) => setClaims([...claims, claim]);
  const updateClaimStatus = (id, status) => {
    setClaims(claims.map(c => c.id === id ? { ...c, status } : c));
  };
  const addPayment = (payment) => setPayments([...payments, payment]);

  useEffect(() => {
    if (currentRole === 'Customer') {
      setCurrentUser({ name: 'Jonathan Davis', id: 'JD-99281-X', level: 'Customer' });
    } else if (currentRole === 'Agent') {
      setCurrentUser({ name: 'Agent Smith', id: 'AGT-42', level: 'Level 2 Agent' });
    } else {
      setCurrentUser({ name: 'Alexander Admin', id: 'ADM-01', level: 'Level 4 Admin' });
    }
  }, [currentRole]);

  return (
    <InsuranceContext.Provider value={{
      currentRole, setCurrentRole,
      currentUser,
      customers, addCustomer,
      policies, addPolicy,
      claims, addClaim, updateClaimStatus,
      payments, addPayment,
      metrics
    }}>
      {children}
    </InsuranceContext.Provider>
  );
};

export const useInsurance = () => useContext(InsuranceContext);
