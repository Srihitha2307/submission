import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ToastOptions {
  message: string;
  type?: 'info' | 'success' | 'warning';
  duration?: number;
}

interface ToastContextType {
  showToast: (options: ToastOptions | string) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const showToast = useCallback((options: ToastOptions | string) => {
    const toastObj: ToastOptions = typeof options === 'string' ? { message: options, type: 'info' } : options;
    setToast(toastObj);
    const timer = setTimeout(() => {
      setToast(null);
    }, toastObj.duration || 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm"
          >
            <div
              id="field-toast"
              className={`px-4 py-3 rounded-lg shadow-lg border flex items-center gap-3 text-sm font-medium ${
                toast.type === 'success'
                  ? 'bg-emerald-900 text-emerald-50 border-emerald-700'
                  : toast.type === 'warning'
                  ? 'bg-amber-900 text-amber-50 border-amber-700'
                  : 'bg-zinc-900 text-zinc-100 border-zinc-700'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              ) : toast.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
              ) : (
                <Info className="w-5 h-5 text-emerald-300 shrink-0" />
              )}
              <span className="flex-1 leading-snug">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};
