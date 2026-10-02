import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Store,
  ArrowLeft,
  User,
} from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess: (email: string) => void;
  onForgotPasswordClick: () => void;
  onBackToHome: () => void;
  onGoToBecomeSeller?: () => void;
  onGoToSellerLogin?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onForgotPasswordClick,
  onBackToHome,
  onGoToBecomeSeller,
  onGoToSellerLogin,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation errors
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);

  const validateEmail = (val: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val.trim());
  };

  const handleSwitchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setEmailError(null);
    setPasswordError(null);
    setFullNameError(null);
    setConfirmPasswordError(null);
    setTermsError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (mode === 'register' && !fullName.trim()) {
      setFullNameError('Veuillez renseigner votre nom complet.');
      hasError = true;
    } else {
      setFullNameError(null);
    }

    if (!email.trim()) {
      setEmailError('Veuillez renseigner votre adresse e-mail.');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Veuillez saisir un format d’e-mail valide.');
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError('Veuillez saisir un mot de passe.');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Le mot de passe doit comporter au moins 6 caractères.');
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setConfirmPasswordError('Les mots de passe ne correspondent pas.');
        hasError = true;
      } else {
        setConfirmPasswordError(null);
      }

      if (!acceptTerms) {
        setTermsError('Veuillez accepter les conditions générales.');
        hasError = true;
      } else {
        setTermsError(null);
      }
    }

    if (hasError) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email.trim());
    }, 850);
  };

  return (
    <div className="flex-1 flex flex-col justify-center min-h-screen p-6 sm:p-10 lg:p-14 bg-white text-[#2D423B] max-w-xl mx-auto w-full">
      {/* Brand Header & Link Retour à l'accueil */}
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="mb-5">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#2D423B] hover:text-[#00674F] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Retour à l’accueil marketplace</span>
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-[#00674F] text-white flex items-center justify-center shadow-md shadow-[#00674F]/20">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-2xl text-[#00674F] tracking-tight">
              iit_store
            </span>
            <span className="block text-[11px] text-[#2D423B]/70 font-bold tracking-wider uppercase">
              Marketplace
            </span>
          </div>
        </div>

        {/* Onglets Connexion / Inscription */}
        <div className="flex bg-[#F4F7F5] p-1 rounded-2xl border border-[#00674F]/15 mb-6">
          <button
            type="button"
            onClick={() => handleSwitchMode('login')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#00674F] shadow-sm'
                : 'text-[#2D423B]/70 hover:text-[#00674F]'
            }`}
          >
            Connexion
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode('register')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-[#00674F] shadow-sm'
                : 'text-[#2D423B]/70 hover:text-[#00674F]'
            }`}
          >
            Créer un compte
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00674F]">
          {mode === 'login' ? 'Bienvenue à nouveau' : 'Rejoignez iit_store'}
        </h1>
        <p className="mt-2 text-sm text-[#2D423B]/75 leading-relaxed font-normal">
          {mode === 'login'
            ? 'Accédez à votre espace client, gérez vos commandes et retrouvez vos coups de cœur.'
            : 'Créez votre compte en quelques instants pour commander et sauvegarder vos favoris.'}
        </p>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          
          {/* Nom complet (uniquement si mode register) */}
          {mode === 'register' && (
            <div className="animate-in fade-in">
              <label
                htmlFor="fullName"
                className="block text-xs font-bold text-[#2D423B] uppercase tracking-wider mb-2"
              >
                Nom complet
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2D423B]/60">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (fullNameError) setFullNameError(null);
                  }}
                  placeholder="Jean Dupont"
                  className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm text-[#2D423B] placeholder-[#2D423B]/40 focus:outline-none focus:ring-2 transition-all shadow-sm ${
                    fullNameError
                      ? 'border-rose-500 focus:ring-rose-500/30'
                      : 'border-[#00674F]/30 focus:border-[#FF7518] focus:ring-[#FF7518]/20'
                  }`}
                />
              </div>
              {fullNameError && (
                <p className="mt-1.5 text-xs text-rose-600 font-medium">{fullNameError}</p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold text-[#2D423B] uppercase tracking-wider mb-2"
            >
              Adresse e-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2D423B]/60">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                placeholder="nom@exemple.com"
                className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm text-[#2D423B] placeholder-[#2D423B]/40 focus:outline-none focus:ring-2 transition-all shadow-sm ${
                  emailError
                    ? 'border-rose-500 focus:ring-rose-500/30'
                    : 'border-[#00674F]/30 focus:border-[#FF7518] focus:ring-[#FF7518]/20'
                }`}
              />
            </div>
            {emailError && (
              <p className="mt-1.5 text-xs text-rose-600 font-medium">
                {emailError}
              </p>
            )}
          </div>

          {/* Password Field + Mot de passe oublié */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-xs font-bold text-[#2D423B] uppercase tracking-wider"
              >
                Mot de passe
              </label>

              {mode === 'login' && (
                <button
                  type="button"
                  onClick={onForgotPasswordClick}
                  className="text-xs font-semibold text-[#2D423B] hover:text-[#00674F] hover:underline transition-colors cursor-pointer"
                >
                  Mot de passe oublié ?
                </button>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2D423B]/60">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError(null);
                }}
                placeholder="••••••••••••"
                className={`w-full pl-10 pr-11 py-3 bg-white border rounded-xl text-sm text-[#2D423B] placeholder-[#2D423B]/40 focus:outline-none focus:ring-2 transition-all shadow-sm ${
                  passwordError
                    ? 'border-rose-500 focus:ring-rose-500/30'
                    : 'border-[#00674F]/30 focus:border-[#FF7518] focus:ring-[#FF7518]/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#2D423B]/60 hover:text-[#2D423B] transition-colors cursor-pointer"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {passwordError && (
              <p className="mt-1.5 text-xs text-rose-600 font-medium">{passwordError}</p>
            )}
          </div>

          {/* Confirmation du mot de passe (mode Inscription) */}
          {mode === 'register' && (
            <div className="animate-in fade-in">
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-bold text-[#2D423B] uppercase tracking-wider mb-2"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2D423B]/60">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (confirmPasswordError) setConfirmPasswordError(null);
                  }}
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm text-[#2D423B] placeholder-[#2D423B]/40 focus:outline-none focus:ring-2 transition-all shadow-sm ${
                    confirmPasswordError
                      ? 'border-rose-500 focus:ring-rose-500/30'
                      : 'border-[#00674F]/30 focus:border-[#FF7518] focus:ring-[#FF7518]/20'
                  }`}
                />
              </div>
              {confirmPasswordError && (
                <p className="mt-1.5 text-xs text-rose-600 font-medium">{confirmPasswordError}</p>
              )}
            </div>
          )}

          {/* Conditions d'utilisation pour inscription */}
          {mode === 'register' && (
            <div className="space-y-1.5 pt-1 animate-in fade-in">
              <label className="flex items-start gap-2.5 text-xs text-[#2D423B]/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    if (termsError) setTermsError(null);
                  }}
                  className="mt-0.5 w-4 h-4 text-[#00674F] rounded border-[#00674F]/30 focus:ring-[#FF7518]"
                />
                <span>
                  J'accepte les <strong className="text-[#00674F]">Conditions Générales</strong> et la politique de confidentialité de iit_store.
                </span>
              </label>
              {termsError && (
                <p className="text-xs text-rose-600 font-medium">{termsError}</p>
              )}
            </div>
          )}

          {/* Bouton CTA Principal */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#FF7518] hover:bg-[#E6630D] active:bg-[#CC540B] text-white font-black text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#FF7518]/25 hover:shadow-lg hover:shadow-[#FF7518]/35 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>{mode === 'login' ? 'Connexion en cours...' : 'Création du compte...'}</span>
              </>
            ) : (
              <>
                <span>{mode === 'login' ? 'Se connecter' : 'Créer mon compte'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Lien bascule sous le formulaire */}
          <div className="pt-4 text-center border-t border-[#00674F]/10">
            {mode === 'login' ? (
              <p className="text-xs text-[#2D423B]/70">
                Vous n'avez pas encore de compte ?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('register')}
                  className="font-extrabold text-[#00674F] hover:text-[#FF7518] underline underline-offset-2 transition-colors cursor-pointer"
                >
                  S'inscrire gratuitement
                </button>
              </p>
            ) : (
              <p className="text-xs text-[#2D423B]/70">
                Vous avez déjà un compte ?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('login')}
                  className="font-extrabold text-[#00674F] hover:text-[#FF7518] underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Se connecter
                </button>
              </p>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};
