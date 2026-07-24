import React, { useState } from 'react';
import { useInsurance } from '../../context/InsuranceContext';

const Header = () => {
  const { currentRole, handleLogout, currentUser, setActiveModal, globalSearch, setGlobalSearch, notifications } = useInsurance();
  const [showNotifications, setShowNotifications] = useState(false);

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
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full bg-surface-container text-[13px] px-10 py-2 rounded-full border-none focus:ring-2 focus:ring-primary transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleLogout()} 
            className="flex items-center gap-1 px-3 py-2 text-[11px] font-semibold text-error hover:bg-error-container hover:text-on-error-container rounded-lg transition-colors mr-2"
            title="Logout"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Logout
          </button>

          <button onClick={() => setActiveModal('FILE_CLAIM')} className="bg-primary text-on-primary text-[12px] font-semibold px-4 py-2 rounded hover:opacity-90 active:scale-95 transition-all">
            File a Claim
          </button>
          
          <div className="flex items-center gap-4 border-l border-outline-variant pl-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)} 
                className={`transition-colors relative p-2 rounded-full ${showNotifications ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
              >
                <span className="material-symbols-outlined">notifications</span>
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-surface border border-outline-variant rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center">
                    <h3 className="font-semibold text-on-surface text-[14px]">Notifications</h3>
                    <span className="text-[11px] font-medium px-2 py-0.5 bg-primary-container text-on-primary-container rounded-full">
                      {notifications.length} New
                    </span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map(notif => (
                        <div key={notif.id} className="px-4 py-3 border-b border-outline-variant hover:bg-surface-container-lowest transition-colors flex gap-3 items-start">
                          <div className="w-8 h-8 rounded-full bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[16px]">notifications_active</span>
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-on-surface">{notif.text}</p>
                            <p className="text-[11px] text-on-surface-variant mt-1">
                              {new Date(notif.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-on-surface-variant text-[13px]">
                        No new notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
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
