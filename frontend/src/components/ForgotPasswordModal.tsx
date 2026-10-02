import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, CheckCircle2, Loader2, X, Send } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  initialEmail?: string;
  onClose: () => void;
  onSuccessToast: (email: string) => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  initialEmail = '',
  onClose,
  onSuccessToast,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialEmail) {
        setEmail(initialEmail);
      }
      setError(null);
      setIsSubmitted(false);
    }
  }, [isOpen, initialEmail]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const validateEmail = (val: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Veuillez renseigner votre adresse e-mail.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Veuillez saisir une adresse e-mail valide.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSuccessToast(email.trim());
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2D423B]/50 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-password-title"
    >
      <div
        className="relative w-full max-w-md bg-white border border-[#00674F]/20 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#2D423B]/15 text-[#2D423B]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-5 right-5 p-2 text-[#2D423B]/60 hover:text-[#00674F] rounded-lg hover:bg-[#00674F]/10 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#00674F]/10 border border-[#00674F]/20 flex items-center justify-center text-[#00674F] mb-5">
              <Mail className="w-6 h-6" />
            </div>

            <h3 id="forgot-password-title" className="text-xl font-bold text-[#00674F] tracking-tight">
              Mot de passe oublié ?
            </h3>
            <p className="mt-2 text-sm text-[#2D423B]/80 leading-relaxed">
              Indiquez l’adresse e-mail associée à votre compte iit_store pour recevoir les instructions de réinitialisation.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="reset-email" className="block text-xs font-bold text-[#2D423B] uppercase tracking-wider mb-2">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2D423B]/60">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="nom@exemple.com"
                    autoFocus
                    required
                    className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm text-[#2D423B] placeholder-[#2D423B]/40 focus:outline-none focus:ring-2 transition-all shadow-sm ${
                      error
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-[#00674F]/30 focus:border-[#FF7518] focus:ring-[#FF7518]/20'
                    }`}
                  />
                </div>
                {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#FF7518] hover:bg-[#E6630D] text-white font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#FF7518]/25 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Envoyer le lien</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#00674F]/15 text-center">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#2D423B] hover:text-[#00674F] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Retour à la connexion
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-[#00674F] tracking-tight">
              E-mail envoyé !
            </h3>
            <p className="mt-2 text-sm text-[#2D423B]/80 leading-relaxed">
              Un e-mail de réinitialisation a été envoyé à :
            </p>
            <div className="mt-2 px-3 py-1.5 bg-[#F4F7F5] rounded-lg border border-[#00674F]/20 inline-block font-mono text-xs text-[#00674F] font-bold">
              {email}
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-[#FF7518] hover:bg-[#E6630D] text-white font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-md shadow-[#FF7518]/25"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
