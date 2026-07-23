import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import AdminDashboard from './pages/AdminDashboard';
import PolicyManagementPage from './pages/PolicyManagementPage';
import ClaimsApprovalPage from './pages/ClaimsApprovalPage';
import CustomerPortalPage from './pages/CustomerPortalPage';
import { useInsurance } from './context/InsuranceContext';

function App() {
  const { currentRole } = useInsurance();
  const [currentPath, setCurrentPath] = useState('dashboard');

  // Reset path when role changes
  useEffect(() => {
    if (currentRole === 'Customer') {
      setCurrentPath('my-policies');
    } else {
      setCurrentPath('dashboard');
    }
  }, [currentRole]);

  const renderContent = () => {
    if (currentRole === 'Customer') {
      switch (currentPath) {
        case 'my-policies':
          return <CustomerPortalPage />;
        default:
          return <CustomerPortalPage />;
      }
    }

    if (currentRole === 'Agent') {
      switch (currentPath) {
        case 'dashboard':
          return <AdminDashboard />; // Simplified for demo, agent shares dashboard
        case 'customers':
        case 'policies':
          return <PolicyManagementPage />;
        case 'claims-review':
          return <ClaimsApprovalPage />;
        default:
          return <AdminDashboard />;
      }
    }

    // Administrator
    switch (currentPath) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'policies':
      case 'customers':
        return <PolicyManagementPage />;
      case 'claims':
        return <ClaimsApprovalPage />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-surface">
      <Sidebar currentPath={currentPath} setCurrentPath={setCurrentPath} />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
