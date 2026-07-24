import React, { createContext, useContext, useState, useEffect } from 'react';

const InsuranceContext = createContext();

export const InsuranceProvider = ({ children }) => {
  // UI Roles: 'Administrator', 'Agent', 'Customer'
  const [currentRole, setCurrentRole] = useState(() => localStorage.getItem('role') || null);
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('user')) || { name: 'Loading...', id: '', level: '' });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  
  const [activeModal, setActiveModal] = useState(null); // 'NEW_POLICY', 'FILE_CLAIM', 'PAY_PREMIUM', 'REASSIGN_ADJUSTER', 'EDIT_CUSTOMER', null
  const [modalData, setModalData] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [payments, setPayments] = useState([]);
  const [globalSearch, setGlobalSearch] = useState('');
  // Compute metrics dynamically so they auto-update when data changes
  const metrics = React.useMemo(() => {
    return {
      activePolicies: { 
        value: policies.filter(p => p.status === 'Active').length, 
        trend: 12 
      },
      pendingClaims: { 
        value: claims.filter(c => c.status === 'In Review').length, 
        trend: -5 
      },
      premiumCollection: { 
        value: payments.reduce((sum, p) => sum + Number(p.amount), 0), 
        trend: 8 
      },
      customerGrowth: { 
        value: customers.length, 
        trend: 15 
      }
    };
  }, [policies, claims, payments, customers]);

  const [notifications, setNotifications] = useState([
    { id: '1', text: 'Welcome to ShieldLink Insurance Platform!', date: new Date().toISOString() }
  ]);

  // Map UI roles to backend roles
  const getBackendRole = (uiRole) => {
    if (uiRole === 'Administrator') return 'ADMIN';
    if (uiRole === 'Agent') return 'AGENT';
    return 'CUSTOMER';
  };

  // Perform login when UI role changes
  // Auto login is handled by localStorage initialization
  useEffect(() => {
  }, []);

  const handleLogout = () => {
    setToken(null);
    setCurrentUser({ name: 'Loading...', id: '', level: '' });
    setCurrentRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        const role = data.user.role === 'ADMIN' ? 'Administrator' : data.user.role === 'AGENT' ? 'Agent' : 'Customer';
        setToken(data.token);
        setCurrentUser(data.user);
        setCurrentRole(role);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', role);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleRegister = async (payload) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (res.ok) {
        setToken(data.token);
        setCurrentUser(data.user);
        setCurrentRole('Customer');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', 'Customer');
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Fetch data when token is available
  useEffect(() => {
    if (!token) return;

    const headers = { 'Authorization': `Bearer ${token}` };

    const fetchData = async () => {
      try {
        if (currentRole === 'Administrator') {
          // Dashboard is computed dynamically now
        }

        const [custRes, polRes, claimRes, payRes] = await Promise.all([
          fetch('/api/customers', { headers }),
          fetch('/api/policies', { headers }),
          fetch('/api/claims', { headers }),
          fetch('/api/payments', { headers })
        ]);

        if (custRes.ok) setCustomers(await custRes.json());
        if (polRes.ok) setPolicies(await polRes.json());
        if (claimRes.ok) setClaims(await claimRes.json());
        if (payRes.ok) setPayments(await payRes.json());

      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    
    fetchData();
  }, [token, currentRole]);

  // Actions
  const updateClaimStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/claims/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setClaims(claims.map(c => c.id === id ? { ...c, status } : c));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addCustomer = async (data) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const result = await res.json();
        const newCustomer = {
          id: result.user.customerProfileId,
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          address: data.location || '',
          status: 'Active',
          initials: data.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()
        };
        setCustomers([...customers, newCustomer]);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  const updateCustomer = async (id, data) => {
    try {
      const res = await fetch(`/api/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const updatedCustomer = await res.json();
        setCustomers(customers.map(c => c.id === id ? updatedCustomer : c));
      } else {
        throw new Error('Failed to update customer');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addNotification = (text) => {
    setNotifications(prev => [{ id: Date.now().toString(), text, date: new Date().toISOString() }, ...prev]);
  };

  const addPolicy = (p) => {
    setPolicies([...policies, p]);
    addNotification(`New policy created: ${p.type}`);
  };
  
  const revokePolicy = async (id) => {
    try {
      const res = await fetch(`/api/policies/${id}/revoke`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setPolicies(policies.map(p => p.id === id ? { ...p, status: 'Cancelled' } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renewPolicy = async (id) => {
    try {
      const res = await fetch(`/api/policies/${id}/renew`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const updatedPolicy = await res.json();
        setPolicies(policies.map(p => p.id === id ? updatedPolicy : p));
        setToastMsg('Policy renewed successfully for 1 year.');
      } else {
        setToastMsg('Failed to renew policy.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addClaim = (claim) => {
    setClaims([claim, ...claims]);
    addNotification(`New claim filed: ${claim.incidentType}`);
  };

  const addPayment = (payment) => {
    setPayments([payment, ...payments]);
    addNotification(`Payment received: $${payment.amount}`);
  };

  return (
    <InsuranceContext.Provider value={{
      currentRole, setCurrentRole,
      currentUser, token,
      handleLogin, handleRegister, handleLogout,
      globalSearch, setGlobalSearch,
      customers, addCustomer, updateCustomer,
      policies, addPolicy, revokePolicy, renewPolicy,
      claims, addClaim, updateClaimStatus,
      payments, addPayment,
      metrics,
      notifications, setNotifications, addNotification,
      activeModal, setActiveModal,
      modalData, setModalData,
      toastMsg, setToastMsg,
      handleLogout
    }}>
      {children}
    </InsuranceContext.Provider>
  );
};

export const useInsurance = () => useContext(InsuranceContext);
