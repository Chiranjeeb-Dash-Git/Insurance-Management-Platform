import React, { useState } from 'react';
import { useInsurance } from '../../context/InsuranceContext';

const Header = () => {
  const { currentRole, handleLogout, currentUser, setActiveModal, globalSearch, setGlobalSearch, notifications } = useInsurance();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#0b1329] via-[#0e1935] to-[#0a152d] text-white sticky top-0 z-40 shadow-xl border-b border-blue-500/20 select-none">
      <div className="flex justify-between items-center px-8 h-16 w-full max-w-[1600px] mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400"></span>
            <span className="text-[22px] font-extrabold bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent tracking-tight">ShieldLink</span>
          </div>
          
          {/* Search */}
          <div className="relative hidden lg:block w-96 group">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300 text-[20px] group-focus-within:text-cyan-300 transition-colors">search</span>
            <input 
              type="text" 
              placeholder="Search policies, claims or IDs..." 
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-slate-400 text-[13px] px-11 py-2 rounded-full border border-blue-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all outline-none shadow-inner"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleLogout()} 
            className="flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-bold text-rose-300 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 rounded-xl transition-all mr-2 shadow-sm active:scale-95"
            title="Logout"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Logout
          </button>

          <button onClick={() => setActiveModal('FILE_CLAIM')} className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-[12px] font-extrabold px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/20 border border-cyan-300/30 active:scale-95 transition-all">
            File a Claim
          </button>
          
          <div className="flex items-center gap-4 border-l border-blue-500/20 pl-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)} 
                className={`transition-all relative p-2.5 rounded-xl border ${showNotifications ? 'bg-blue-500/30 text-cyan-300 border-cyan-400/50 shadow-md' : 'bg-white/10 text-blue-200 border-white/10 hover:bg-white/20 hover:text-white'}`}
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0b1329] animate-ping"></span>
                )}
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0b1329]"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0f172a] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 text-white">
                  <div className="px-4 py-3 border-b border-blue-500/20 bg-[#0b1329] flex justify-between items-center">
                    <h3 className="font-bold text-white text-[14px] flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-400 text-[18px]">notifications_active</span>
                      Notifications
                    </h3>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 bg-blue-500/20 border border-blue-400/30 text-cyan-300 rounded-full">
                      {notifications.length} New
                    </span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map(notif => (
                        <div key={notif.id} className="px-4 py-3.5 border-b border-blue-500/10 hover:bg-white/5 transition-colors flex gap-3 items-start">
                          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center shrink-0 shadow-inner">
                            <span className="material-symbols-outlined text-[16px]">notifications</span>
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-white">{notif.text}</p>
                            <p className="text-[11px] text-slate-400 mt-1">
                              {new Date(notif.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-slate-400 text-[13px] font-medium">
                        No new notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/15 px-3 py-1.5 rounded-full transition-all cursor-pointer group shadow-sm">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white flex items-center justify-center font-extrabold text-[12px] shadow-sm">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="hidden md:block pr-2">
                <p className="text-[12px] font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">{currentUser.name}</p>
                <p className="text-[10px] text-cyan-300 font-extrabold uppercase tracking-widest leading-tight mt-0.5">{currentUser.level}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
