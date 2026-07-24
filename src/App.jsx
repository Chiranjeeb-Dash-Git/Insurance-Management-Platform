import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import AdminDashboard from './pages/AdminDashboard';
import PolicyManagementPage from './pages/PolicyManagementPage';
import ClaimsApprovalPage from './pages/ClaimsApprovalPage';
import CustomerPortalPage from './pages/CustomerPortalPage';
import CustomerManagementPage from './pages/CustomerManagementPage';
import GlobalModals from './components/ui/GlobalModals';
import Toast from './components/ui/Toast';
import LoginPage from './pages/LoginPage';
import { useInsurance } from './context/InsuranceContext';

function App() {
  const { currentRole, token } = useInsurance();
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
        case 'my-claims':
        case 'documents':
          return <CustomerPortalPage currentPath={currentPath} />;
        default:
          return <CustomerPortalPage currentPath={currentPath} />;
      }
    }

    if (currentRole === 'Agent') {
      switch (currentPath) {
        case 'dashboard':
          return <AdminDashboard />; // Simplified for demo, agent shares dashboard
        case 'customers':
          return <CustomerManagementPage />;
        case 'policies':
          return <PolicyManagementPage currentPath={currentPath} />;
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
        return <PolicyManagementPage currentPath={currentPath} />;
      case 'customers':
        return <CustomerManagementPage />;
      case 'claims':
        return <ClaimsApprovalPage />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-surface">
      {!currentRole ? (
        <div className="w-full h-full">
          <LoginPage />
        </div>
      ) : (
        <>
          <Sidebar currentPath={currentPath} setCurrentPath={setCurrentPath} />
          <div className="flex-1 flex flex-col ml-64 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto custom-scrollbar">
              {renderContent()}
            </main>
          </div>
          <GlobalModals />
          <Toast />
        </>
      )}
    </div>
  );
}

export default App;
