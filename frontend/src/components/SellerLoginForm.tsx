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
  ShieldCheck,
  Building2,
  Phone,
  Tag,
  CheckCircle2,
  BadgeCheck,
} from 'lucide-react';

interface SellerLoginFormProps {
  onLoginSuccess: (sellerEmail: string, storeName?: string) => void;
  onForgotPasswordClick: () => void;
  onBackToHome: () => void;
  onGoToCustomerLogin?: () => void;
}

export const SellerLoginForm: React.FC<SellerLoginFormProps> = ({
  onLoginSuccess,
  onForgotPasswordClick,
  onBackToHome,
  onGoToCustomerLogin,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Fields
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Mode & Wax Africain');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation errors
  const [storeNameError, setStoreNameError] = useState<string | null>(null);
  const [ownerNameError, setOwnerNameError] = useState<string | null>(null);
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
    setStoreNameError(null);
    setOwnerNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setTermsError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (mode === 'register') {
      if (!storeName.trim()) {
        setStoreNameError('Veuillez renseigner le nom de votre boutique.');
        hasError = true;
      } else {
        setStoreNameError(null);
      }

      if (!ownerName.trim()) {
        setOwnerNameError('Veuillez renseigner le nom du gérant ou artisan.');
        hasError = true;
      } else {
        setOwnerNameError(null);
      }
    }

    if (!email.trim()) {
      setEmailError('Veuillez renseigner votre email professionnel.');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Format d’adresse email invalide.');
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError('Veuillez saisir votre mot de passe.');
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
        setTermsError('Veuillez accepter les Conditions Générales Vendeurs.');
        hasError = true;
      } else {
        setTermsError(null);
      }
    }

    if (hasError) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email.trim(), mode === 'register' ? storeName.trim() : undefined);
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
          <div className="w-12 h-12 rounded-2xl bg-[#00674F] text-white flex items-center justify-center shadow-lg shadow-[#00674F]/25 border border-[#00674F]/30">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl text-[#00674F] tracking-tight">
                iit_store
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#FF7518]/15 text-[#FF7518] text-[10px] font-black uppercase tracking-wider border border-[#FF7518]/30">
                Espace Vendeur
              </span>
            </div>
            <span className="block text-[11px] text-[#2D423B]/70 font-bold tracking-wider uppercase">
              Portail Marchands & Créateurs
            </span>
          </div>
        </div>

        {/* Onglets Connexion / Inscription Vendeur */}
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
            Créer ma boutique
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00674F]">
          {mode === 'login' ? 'Espace Boutique Marchand' : 'Ouvrir votre Boutique Pro'}
        </h1>
        <p className="text-xs sm:text-sm text-[#2D423B]/75 mt-1.5 leading-relaxed">
          {mode === 'login'
            ? 'Connectez-vous pour piloter vos commandes, stocks et retraits Mobile Money.'
            : 'Vendez vos créations et produits à des milliers de clients en Afrique et dans le monde.'}
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
        {mode === 'register' && (
          <>
            {/* Nom de la boutique */}
            <div>
              <label
                htmlFor="seller-store-name"
                className="block text-xs font-bold text-[#00674F] uppercase tracking-wider mb-1.5"
              >
                Nom de votre boutique / marque *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D423B]/50" />
                <input
                  id="seller-store-name"
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Ex : Atelier Kente & Wax, TechStore Cotonou"
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-[#2D423B] placeholder-[#2D423B]/40 focus:outline-none focus:ring-2 focus:ring-[#00674F]/20 transition-all ${
                    storeNameError ? 'border-red-500' : 'border-[#00674F]/25 focus:border-[#00674F]'
                  }`}
                />
              </div>
              {storeNameError && (
                <p className="text-[11px] text-red-600 font-semibold mt-1">{storeNameError}</p>
              )}
            </div>

            {/* Nom du responsable */}
            <div>
              <label
                htmlFor="seller-owner-name"
                className="block text-xs font-bold text-[#00674F] uppercase tracking-wider mb-1.5"
              >
                Nom complet du gérant / artisan *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D423B]/50" />
                <input
                  id="seller-owner-name"
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Prénom et Nom"
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-[#2D423B] placeholder-[#2D423B]/40 focus:outline-none focus:ring-2 focus:ring-[#00674F]/20 transition-all ${
                    ownerNameError ? 'border-red-500' : 'border-[#00674F]/25 focus:border-[#00674F]'
                  }`}
                />
              </div>
              {ownerNameError && (
                <p className="text-[11px] text-red-600 font-semibold mt-1">{ownerNameError}</p>
              )}
            </div>

            {/* Catégorie principale */}
            <div>
              <label
                htmlFor="seller-category"
                className="block text-xs font-bold text-[#00674F] uppercase tracking-wider mb-1.5"
              >
                Catégorie principale de vos articles
              </label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D423B]/50" />
                <select
                  id="seller-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#00674F]/25 focus:border-[#00674F] rounded-xl text-xs sm:text-sm text-[#2D423B] focus:outline-none focus:ring-2 focus:ring-[#00674F]/20 transition-all cursor-pointer"
                >
                  <option value="Mode & Wax Africain">Mode, Wax & Prêt-à-porter</option>
                  <option value="Artisanat & Décoration">Artisanat & Décoration d'Art</option>
                  <option value="Électronique & High-Tech">High-Tech & Téléphones</option>
                  <option value="Beauté & Cosmétiques Naturels">Cosmétiques Naturels & Karité</option>
                  <option value="Épicerie Fine & Terroir">Épicerie Fine & Produits du Terroir</option>
                  <option value="Bijouterie & Accessoires">Bijouterie & Maroquinerie</option>
                </select>
              </div>
            </div>

            {/* Numéro de téléphone WhatsApp */}
            <div>
              <label
                htmlFor="seller-phone"
                className="block text-xs font-bold text-[#00674F] uppercase tracking-wider mb-1.5"
              >
                Numéro WhatsApp professionnel
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D423B]/50" />
                <input
                  id="seller-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+229 97 00 00 00 / +225 07 00 00 00"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#00674F]/25 focus:border-[#00674F] rounded-xl text-xs sm:text-sm text-[#2D423B] placeholder-[#2D423B]/40 focus:outline-none focus:ring-2 focus:ring-[#00674F]/20 transition-all"
                />
              </div>
            </div>
          </>
        )}

        {/* Email Professionnel */}
        <div>
          <label
            htmlFor="seller-email"
            className="block text-xs font-bold text-[#00674F] uppercase tracking-wider mb-1.5"
          >
            {mode === 'login' ? 'Email professionnel de la boutique *' : 'Email professionnel *'}
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D423B]/50" />
            <input
              id="seller-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vendeur@votre-boutique.com"
              className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-[#2D423B] placeholder-[#2D423B]/40 focus:outline-none focus:ring-2 focus:ring-[#00674F]/20 transition-all ${
                emailError ? 'border-red-500' : 'border-[#00674F]/25 focus:border-[#00674F]'
              }`}
            />
          </div>
          {emailError && (
            <p className="text-[11px] text-red-600 font-semibold mt-1">{emailError}</p>
          )}
        </div>

        {/* Mot de Passe */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="seller-password"
              className="text-xs font-bold text-[#00674F] uppercase tracking-wider"
            >
              Mot de passe *
            </label>
            {mode === 'login' && (
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-xs font-bold text-[#FF7518] hover:text-[#E6630D] hover:underline transition-colors cursor-pointer"
              >
                Mot de passe oublié ?
              </button>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D423B]/50" />
            <input
              id="seller-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full pl-10 pr-10 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-[#2D423B] placeholder-[#2D423B]/40 focus:outline-none focus:ring-2 focus:ring-[#00674F]/20 transition-all ${
                passwordError ? 'border-red-500' : 'border-[#00674F]/25 focus:border-[#00674F]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#2D423B]/50 hover:text-[#2D423B] cursor-pointer"
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {passwordError && (
            <p className="text-[11px] text-red-600 font-semibold mt-1">{passwordError}</p>
          )}
        </div>

        {/* Confirmer le Mot de Passe (Mode Register) */}
        {mode === 'register' && (
          <div>
            <label
              htmlFor="seller-confirm-password"
              className="block text-xs font-bold text-[#00674F] uppercase tracking-wider mb-1.5"
            >
              Confirmer le mot de passe *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D423B]/50" />
              <input
                id="seller-confirm-password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-[#2D423B] placeholder-[#2D423B]/40 focus:outline-none focus:ring-2 focus:ring-[#00674F]/20 transition-all ${
                  confirmPasswordError
                    ? 'border-red-500'
                    : 'border-[#00674F]/25 focus:border-[#00674F]'
                }`}
              />
            </div>
            {confirmPasswordError && (
              <p className="text-[11px] text-red-600 font-semibold mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>
        )}

        {/* Se souvenir de moi (Mode Login) */}
        {mode === 'login' && (
          <div className="flex items-center gap-2 pt-1">
            <input
              id="seller-remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[#00674F]/30 text-[#00674F] focus:ring-[#00674F] cursor-pointer"
            />
            <label htmlFor="seller-remember-me" className="text-xs text-[#2D423B]/80 font-medium cursor-pointer">
              Garder ma session active sur cet appareil
            </label>
          </div>
        )}

        {/* Conditions Vendeur (Mode Register) */}
        {mode === 'register' && (
          <div className="pt-1">
            <div className="flex items-start gap-2">
              <input
                id="seller-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-[#00674F]/30 text-[#00674F] focus:ring-[#00674F] cursor-pointer shrink-0"
              />
              <label htmlFor="seller-terms" className="text-xs text-[#2D423B]/80 font-medium leading-relaxed cursor-pointer">
                J’accepte les{' '}
                <span className="text-[#00674F] font-bold underline">
                  Conditions Générales Vendeurs
                </span>{' '}
                et la charte de qualité marchande iit_store.
              </label>
            </div>
            {termsError && (
              <p className="text-[11px] text-red-600 font-semibold mt-1">{termsError}</p>
            )}
          </div>
        )}

        {/* Bouton de Soumission */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00674F] to-[#00523E] hover:from-[#005a45] hover:to-[#004433] text-white font-extrabold text-sm transition-all shadow-md shadow-[#00674F]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Chargement de votre espace...</span>
              </>
            ) : mode === 'login' ? (
              <>
                <Store className="w-4 h-4" />
                <span>Se connecter à mon espace boutique</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            ) : (
              <>
                <BadgeCheck className="w-4 h-4" />
                <span>Créer et ouvrir ma boutique</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        {/* Garanties Vendeur */}
        <div className="pt-6 border-t border-[#00674F]/15 flex items-center justify-center gap-4 text-[10px] text-[#2D423B]/60 font-semibold">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00674F]" />
            <span>Paiements séquestrés</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00674F]" />
            <span>Retraits Mobile Money & Visa</span>
          </div>
        </div>
      </form>
    </div>
  );
};
