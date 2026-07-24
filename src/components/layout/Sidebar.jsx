import React from 'react';
import { useInsurance } from '../../context/InsuranceContext';

const Sidebar = ({ currentPath, setCurrentPath }) => {
  const { currentRole, setActiveModal, handleLogout } = useInsurance();

  const getNavItems = () => {
    if (currentRole === 'Administrator') {
      return [
        { path: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: 'policies', icon: 'description', label: 'Policies' },
        { path: 'claims', icon: 'assignment_late', label: 'Claims' },
        { path: 'customers', icon: 'group', label: 'Customers' },
        { path: 'analytics', icon: 'monitoring', label: 'Analytics' },
      ];
    } else if (currentRole === 'Agent') {
      return [
        { path: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: 'customers', icon: 'group', label: 'Customers' },
        { path: 'policies', icon: 'description', label: 'Policies' },
        { path: 'claims-review', icon: 'assignment_late', label: 'Review Claims' },
      ];
    } else {
      return [
        { path: 'my-policies', icon: 'shield', label: 'My Policies' },
        { path: 'my-claims', icon: 'assignment', label: 'My Claims' },
        { path: 'documents', icon: 'folder', label: 'Documents' },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="bg-surface-container-lowest dark:bg-inverse-surface h-screen w-64 fixed left-0 top-0 border-r border-outline-variant dark:border-outline flex flex-col z-50">
      <div className="flex flex-col h-full p-4 overflow-y-auto custom-scrollbar">
        {/* Brand Identity */}
        <div className="mb-8 px-2">
          <h1 className="font-headline-sm text-[20px] font-bold text-primary dark:text-inverse-primary">ShieldAdmin</h1>
          <p className="text-on-surface-variant text-[11px] font-medium mt-1 uppercase tracking-wider">{currentRole} Portal</p>
        </div>

        {/* CTA */}
        {currentRole !== 'Customer' && (
          <button onClick={() => setActiveModal('NEW_POLICY')} className="mb-8 w-full bg-primary text-on-primary py-3 px-4 rounded-lg text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-primary-container active:scale-95 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Policy
          </button>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={`#${item.path}`}
              onClick={(e) => { e.preventDefault(); setCurrentPath(item.path); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[12px] font-semibold transition-colors active:scale-95 duration-100 ${
                currentPath === item.path
                  ? 'text-primary dark:text-inverse-primary bg-secondary-container dark:bg-secondary-container/20'
                  : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-outline-variant mt-4 space-y-1">
          <a href="#" onClick={(e) => { e.preventDefault(); alert('Redirecting to Help Center'); }} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-outline-variant text-[12px] font-semibold hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors active:scale-95 duration-100">
            <span className="material-symbols-outlined">help</span>
            Help Center
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-outline-variant text-[12px] font-semibold hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors active:scale-95 duration-100">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
