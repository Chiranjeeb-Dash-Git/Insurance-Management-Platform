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
    <aside className="bg-gradient-to-b from-[#0b1329] via-[#0e1935] to-[#0a152d] text-white h-screen w-64 fixed left-0 top-0 border-r border-blue-500/20 flex flex-col z-50 shadow-2xl overflow-hidden select-none">
      {/* Glowing Background Orbs */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col h-full p-4 overflow-y-auto custom-scrollbar relative z-10">
        {/* Brand Identity */}
        <div className="mb-8 px-2 pt-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/30 shrink-0">
            <span className="material-symbols-outlined text-[24px] text-white">admin_panel_settings</span>
          </div>
          <div>
            <h1 className="font-extrabold text-[20px] text-white tracking-tight drop-shadow-sm">ShieldAdmin</h1>
            <p className="text-blue-400 text-[10px] font-extrabold mt-0.5 uppercase tracking-widest">{currentRole} Portal</p>
          </div>
        </div>

        {/* CTA */}
        {currentRole !== 'Customer' && (
          <button onClick={() => setActiveModal('NEW_POLICY')} className="mb-8 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 px-4 rounded-xl text-[13px] font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 border border-blue-400/30 active:scale-95 transition-all duration-200 group">
            <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform duration-300">add_circle</span>
            New Policy
          </button>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">Main Menu</p>
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.path}
                href={`#${item.path}`}
                onClick={(e) => { e.preventDefault(); setCurrentPath(item.path); }}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-[13px] font-bold transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-blue-600/90 to-indigo-600/90 shadow-md shadow-blue-600/30 border border-blue-400/30 pl-5'
                    : 'text-slate-300 hover:text-white hover:bg-white/10 hover:pl-5'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-blue-300 animate-pulse' : 'text-slate-400'}`}>{item.icon}</span>
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-blue-500/20 mt-4 space-y-1.5">
          <a href="#" onClick={(e) => { e.preventDefault(); alert('Redirecting to Help Center'); }} className="flex items-center gap-3.5 px-4 py-3 text-slate-300 hover:text-white text-[13px] font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 hover:pl-5">
            <span className="material-symbols-outlined text-[20px] text-slate-400">help</span>
            Help Center
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="flex items-center gap-3.5 px-4 py-3 text-rose-400 hover:text-rose-300 text-[13px] font-bold rounded-xl hover:bg-rose-500/15 transition-all duration-200 hover:pl-5">
            <span className="material-symbols-outlined text-[20px] text-rose-400">logout</span>
            Logout
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
