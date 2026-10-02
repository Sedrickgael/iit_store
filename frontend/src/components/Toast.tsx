import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${
              isSuccess
                ? 'bg-white border-[#00674F]/40 text-[#2D423B] shadow-[#00674F]/15'
                : isError
                ? 'bg-white border-rose-500/40 text-rose-700 shadow-rose-500/10'
                : 'bg-white border-[#FF7518]/40 text-[#2D423B] shadow-[#FF7518]/15'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#00674F]" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-500" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-[#FF7518]" />}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-sm font-bold tracking-tight text-[#00674F]">{toast.title}</h4>
              {toast.description && (
                <p className="mt-0.5 text-xs text-[#2D423B]/80 leading-relaxed">{toast.description}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 p-1 text-[#2D423B]/60 hover:text-[#2D423B] rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Fermer la notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
