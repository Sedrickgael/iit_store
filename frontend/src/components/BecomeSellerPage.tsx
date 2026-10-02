import React, { useState } from 'react';
import {
  Store,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Users,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Globe2,
  Package,
  Headphones,
  Award,
  Sparkles,
  Calculator,
} from 'lucide-react';
import { MerchantSimulator } from './MerchantSimulator';

interface BecomeSellerPageProps {
  onBackToShopping: () => void;
  onToast?: (type: 'success' | 'error' | 'info', title: string, desc?: string) => void;
  onGoToSellerDashboard?: (storeName?: string) => void;
}

export const BecomeSellerPage: React.FC<BecomeSellerPageProps> = ({
  onBackToShopping,
  onToast,
  onGoToSellerDashboard,
}) => {
  const [storeName, setStoreName] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Bénin');
  const [category, setCategory] = useState('Mode & Vêtements');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim() || !email.trim() || !sellerName.trim()) {
      onToast?.('error', 'Champs requis', 'Veuillez remplir les informations obligatoires de votre boutique.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onToast?.(
        'success',
        'Candidature transmise !',
        `Félicitations, la demande pour "${storeName}" a été reçue. Notre équipe vous contactera sous 24h.`
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5]/40 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Fil d'Ariane & Bouton Retour */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#00674F]/15">
          <button
            type="button"
            onClick={onBackToShopping}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#00674F] hover:text-[#FF7518] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Retourner au catalogue</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-[#2D423B]/60">
            <span>Accueil</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-[#00674F]">Devenir vendeur</span>
          </div>
        </div>

        {/* Hero Banner Vendeur */}
        <div className="relative bg-gradient-to-br from-[#00674F] via-[#005843] to-[#2D423B] text-white rounded-3xl p-8 sm:p-14 mb-12 shadow-xl overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF7518] text-white text-xs font-black uppercase tracking-wider mb-5 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Programme Partenaire Vendeurs d'Élite</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              Développez vos ventes à travers toute l’Afrique & le Monde
            </h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
              Rejoignez les artisans, créateurs de mode, marques high-tech et distributeurs qui vendent chaque jour sur <strong>iit_store</strong>. Bénéficiez de notre logistique intégrée et de paiements garantis.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15">
                <CheckCircle2 className="w-4 h-4 text-[#FF7518]" />
                <span>0 € de frais d'inscription</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15">
                <CheckCircle2 className="w-4 h-4 text-[#FF7518]" />
                <span>Paiements Mobile Money & Virement</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15">
                <CheckCircle2 className="w-4 h-4 text-[#FF7518]" />
                <span>Logistique et expéditions gérées</span>
              </div>
            </div>
          </div>
          <div className="absolute right-[-40px] -bottom-10 opacity-10 pointer-events-none">
            <Store className="w-96 h-96 text-white" />
          </div>
        </div>

        {/* 4 Avantages Clés pour le Vendeur */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          <div className="bg-white p-6 rounded-3xl border border-[#00674F]/15 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#00674F]/10 text-[#00674F] flex items-center justify-center mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-[#2D423B] mb-2">Visibilité Panafricaine</h3>
            <p className="text-xs text-[#2D423B]/75 leading-relaxed">
              Touchez des dizaines de milliers de clients qualifiés au Bénin, Côte d'Ivoire, Sénégal, Togo, Cameroun et en Europe.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#00674F]/15 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#FF7518]/15 text-[#FF7518] flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-[#2D423B] mb-2">Paiements Sécurisés</h3>
            <p className="text-xs text-[#2D423B]/75 leading-relaxed">
              Vos gains sont transférés automatiquement et sans retard sur votre compte bancaire ou Mobile Money (MTN, Moov, Orange, Wave).
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#00674F]/15 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#00674F]/10 text-[#00674F] flex items-center justify-center mb-4">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-[#2D423B] mb-2">Expédition Clé en Main</h3>
            <p className="text-xs text-[#2D423B]/75 leading-relaxed">
              Déposez vos colis dans nos points relais partenaires ou demandez un enlèvement directement dans votre atelier.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#00674F]/15 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#FF7518]/15 text-[#FF7518] flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-[#2D423B] mb-2">Accompagnement Dédié</h3>
            <p className="text-xs text-[#2D423B]/75 leading-relaxed">
              Un chargé de compte iit_store dédié vous aide à optimiser vos photos, vos fiches de prix et vos campagnes de promotion.
            </p>
          </div>
        </div>

        {/* Section Formulaire de Candidature */}
        <div className="bg-white rounded-3xl border border-[#00674F]/15 p-6 sm:p-12 shadow-sm max-w-4xl mx-auto mb-14">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[#00674F]">Boutique Créée & Candidature Reçue !</h3>
              <p className="text-sm text-[#2D423B]/80 max-w-md mx-auto">
                Félicitations <strong>{sellerName}</strong> ! Votre boutique <strong>« {storeName} »</strong> est prête à être configurée. Vous pouvez dès maintenant explorer votre tableau de bord vendeur.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                {onGoToSellerDashboard && (
                  <button
                    type="button"
                    onClick={() => onGoToSellerDashboard(storeName)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#00674F] hover:bg-[#00513d] text-white text-xs sm:text-sm font-black shadow-lg shadow-[#00674F]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Store className="w-4 h-4" />
                    <span>Ouvrir mon Tableau de Bord Vendeur</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={onBackToShopping}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#FF7518] hover:bg-[#E6630D] text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all"
                >
                  Retourner au catalogue
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Accès rapide si déjà vendeur */}
              {onGoToSellerDashboard && (
                <div className="mb-4 p-3.5 sm:p-4 rounded-2xl bg-[#00674F]/10 border border-[#00674F]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#00674F] text-white flex items-center justify-center shrink-0">
                      <Store className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-extrabold text-[#1E2E29] block">Vous avez déjà ouvert votre boutique ?</span>
                      <span className="text-[#2D423B]/70 text-[11px]">Accédez directement à vos commandes, stocks et retraits.</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onGoToSellerDashboard()}
                    className="px-4 py-2 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white font-black text-xs shrink-0 cursor-pointer shadow-sm transition-all"
                  >
                    Mon Espace Dashboard Vendeur ➔
                  </button>
                </div>
              )}

              {/* Accès au simulateur de compte marchand */}
              <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-[#FF7518]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FF7518] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#1E2E29] block">
                      Simulateur de Compte Marchand & Revenus
                    </span>
                    <span className="text-[#2D423B]/70 text-[11px]">
                      Calculez vos commissions, marges et gains nets selon votre volume de ventes.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSimulatorOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#FF7518] hover:bg-[#E6630D] text-white font-black text-xs shrink-0 cursor-pointer shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>Simuler mes gains</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-center max-w-xl mx-auto mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00674F]">
                  Formulaire d'ouverture de Boutique
                </h2>
                <p className="text-xs sm:text-sm text-[#2D423B]/70 mt-2">
                  Complétez ce formulaire rapide en 2 minutes. Notre équipe vous contactera pour valider votre compte vendeur certifié.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D423B] uppercase tracking-wider mb-1.5">
                      Nom de votre Boutique / Marque *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Atelier Baobab Création"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#00674F]/25 text-sm focus:border-[#FF7518] focus:ring-2 focus:ring-[#FF7518]/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D423B] uppercase tracking-wider mb-1.5">
                      Nom et Prénom du Gérant *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Awa Koné"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#00674F]/25 text-sm focus:border-[#FF7518] focus:ring-2 focus:ring-[#FF7518]/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D423B] uppercase tracking-wider mb-1.5">
                      Email professionnel *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vendeur@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#00674F]/25 text-sm focus:border-[#FF7518] focus:ring-2 focus:ring-[#FF7518]/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D423B] uppercase tracking-wider mb-1.5">
                      Numéro de téléphone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+229 97 00 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#00674F]/25 text-sm focus:border-[#FF7518] focus:ring-2 focus:ring-[#FF7518]/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D423B] uppercase tracking-wider mb-1.5">
                      Pays d'implantation
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#00674F]/25 text-sm focus:border-[#FF7518] focus:outline-none bg-white"
                    >
                      <option value="Bénin">🇧🇯 Bénin</option>
                      <option value="Côte d'Ivoire">🇨🇮 Côte d'Ivoire</option>
                      <option value="Sénégal">🇸🇳 Sénégal</option>
                      <option value="Togo">🇹🇬 Togo</option>
                      <option value="Burkina Faso">🇧🇫 Burkina Faso</option>
                      <option value="Ghana">🇬🇭 Ghana</option>
                      <option value="Nigeria">🇳🇬 Nigeria</option>
                      <option value="France & Europe">🇫🇷 France & Europe</option>
                      <option value="Autre pays">🌍 Autre pays</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D423B] uppercase tracking-wider mb-1.5">
                      Catégorie Principale
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#00674F]/25 text-sm focus:border-[#FF7518] focus:outline-none bg-white"
                    >
                      <option value="Mode & Vêtements">Mode, Wax & Prêt-à-porter</option>
                      <option value="Bijoux & Montres">Bijoux & Accessoires</option>
                      <option value="High-Tech">Smartphones, Audio & High-Tech</option>
                      <option value="Maison & Décoration">Maison, Déco & Artisanat d'Art</option>
                      <option value="Beauté & Soins">Beauté, Soins & Karité Bio</option>
                      <option value="Épicerie Fine & Terroir">Épicerie Fine & Produits du Terroir</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D423B] uppercase tracking-wider mb-1.5">
                    Présentation sommaire de vos produits & catalogue
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Décrivez en quelques mots vos créations ou articles, votre stock estimé et vos réseaux sociaux si existants..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#00674F]/25 text-sm focus:border-[#FF7518] focus:ring-2 focus:ring-[#FF7518]/20 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#FF7518] hover:bg-[#E6630D] text-white font-black text-sm shadow-lg shadow-[#FF7518]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Transmission en cours...</span>
                    ) : (
                      <>
                        <span>Soumettre ma candidature vendeur</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-[#2D423B]/60 mt-3">
                    En validant, vous acceptez la charte éthique et commerciale des vendeurs iit_store.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Chiffres clés Marketplace */}
        <div className="bg-[#00674F] text-white rounded-3xl p-8 sm:p-10 shadow-lg text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-black mb-6">
              La communauté iit_store en quelques chiffres
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <span className="block text-3xl sm:text-4xl font-black text-[#FF7518]">98.4%</span>
                <span className="text-xs text-white/80">Taux de satisfaction client</span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-black text-[#FF7518]">48h</span>
                <span className="text-xs text-white/80">Délai moyen de livraison</span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-black text-[#FF7518]">8+</span>
                <span className="text-xs text-white/80">Pays couverts en Afrique</span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-black text-[#FF7518]">0 F</span>
                <span className="text-xs text-white/80">Frais d'abonnement mensuel</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modale Simulateur de Compte Marchand */}
      <MerchantSimulator
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onStartRegistration={(cat) => {
          setIsSimulatorOpen(false);
          if (cat) {
            setCategory(cat);
          }
        }}
      />
    </div>
  );
};
