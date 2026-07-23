import React from 'react';
import { useInsurance } from '../../context/InsuranceContext';

const Header = () => {
  const { currentRole, setCurrentRole, currentUser } = useInsurance();

  return (
    <header className="bg-surface dark:bg-surface-dim sticky top-0 z-40 shadow-sm border-b border-outline-variant">
      <div className="flex justify-between items-center px-10 h-16 w-full max-w-[1440px] mx-auto">
        <div className="flex items-center gap-6">
          <span className="text-[20px] font-bold text-primary dark:text-inverse-primary">ShieldLink</span>
          
          {/* Search */}
          <div className="relative hidden lg:block w-96 group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Search policies, claims or IDs..." 
              className="w-full bg-surface-container text-[13px] px-10 py-2 rounded-full border-none focus:ring-2 focus:ring-primary transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Role Switcher for Demo Purposes */}
          <div className="flex items-center gap-2 mr-4 bg-surface-container-low rounded-lg p-1">
            {['Administrator', 'Agent', 'Customer'].map(role => (
              <button
                key={role}
                onClick={() => setCurrentRole(role)}
                className={`px-3 py-1 text-[11px] font-medium rounded ${currentRole === role ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                {role}
              </button>
            ))}
          </div>

          <button className="bg-primary text-on-primary text-[12px] font-semibold px-4 py-2 rounded hover:opacity-90 active:scale-95 transition-all">
            File a Claim
          </button>
          
          <div className="flex items-center gap-4 border-l border-outline-variant pl-4">
            <button className="text-on-surface-variant hover:text-primary transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
            </button>
            
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center font-bold text-[12px]">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="hidden md:block">
                <p className="text-[12px] font-semibold text-on-surface group-hover:text-primary transition-colors">{currentUser.name}</p>
                <p className="text-[10px] text-on-surface-variant uppercase">{currentUser.level}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
