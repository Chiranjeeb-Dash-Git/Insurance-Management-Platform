import React, { useEffect } from 'react';
import { useInsurance } from '../../context/InsuranceContext';

const Toast = () => {
  const { toastMsg, setToastMsg } = useInsurance();

  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => {
        setToastMsg(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg, setToastMsg]);

  if (!toastMsg) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 text-[14px] font-semibold">
        <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
        {toastMsg}
      </div>
    </div>
  );
};

export default Toast;
