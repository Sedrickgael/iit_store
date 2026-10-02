import React, { useState, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  Store,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Percent,
  Wallet,
  Building,
  RefreshCw,
  Zap,
  Award,
  Layers,
  ChevronRight,
  X,
} from 'lucide-react';

interface MerchantSimulatorProps {
  isOpen?: boolean;
  onClose?: () => void;
  onStartRegistration?: (category?: string, plan?: string) => void;
}

interface PlanOption {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  monthlyFee: number; // in FCFA
  commissionRate: number; // in percent (e.g. 8 for 8%)
  tag: string;
  badgeColor: string;
  features: string[];
}

const PLANS: PlanOption[] = [
  {
    id: 'starter',
    name: 'Formule Débutant',
    monthlyFee: 0,
    commissionRate: 8,
    tag: 'Sans engagement',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    features: [
      '0 FCFA d’abonnement mensuel',
      'Commission de 8% par vente',
      'Paiements sécurisés Mobile Money',
      'Support standard 6j/7',
    ],
  },
  {
    id: 'pro',
    name: 'Formule Pro Marchand',
    monthlyFee: 9900,
    commissionRate: 5,
    tag: 'Recommandé',
    badgeColor: 'bg-[#FF7518]/15 text-[#FF7518] border-[#FF7518]/30',
    features: [
      'Abonnement fixe de 9 900 FCFA/mois',
      'Commission réduite à 5% par vente',
      'Badge Boutique Certifiée Pro',
      'Mise en avant prioritaire dans les recherches',
      'Conseiller e-commerce dédié',
    ],
  },
  {
    id: 'enterprise',
    name: 'Formule Entreprise',
    monthlyFee: 24900,
    commissionRate: 3,
    tag: 'Gros volumes',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    features: [
      'Abonnement de 24 900 FCFA/mois',
      'Commission ultra-faible de 3%',
      'Exports comptables & API stocks',
      'Campagnes sponsorisées incluses',
      'Gestionnaire de compte VIP',
    ],
  },
];

const CATEGORIES = [
  { id: 'mode', name: 'Mode, Wax & Vêtements', avgMargin: 55, defaultBasket: 18500 },
  { id: 'artisanat', name: 'Artisanat d’Art & Déco', avgMargin: 65, defaultBasket: 24000 },
  { id: 'cosmetique', name: 'Cosmétiques & Karité Bio', avgMargin: 50, defaultBasket: 12000 },
  { id: 'tech', name: 'Électronique & High-Tech', avgMargin: 25, defaultBasket: 45000 },
  { id: 'terroir', name: 'Épicerie Fine & Terroir', avgMargin: 40, defaultBasket: 14000 },
  { id: 'bijoux', name: 'Bijoux & Accessoires', avgMargin: 60, defaultBasket: 16000 },
];

const PAYOUT_METHODS = [
  { id: 'wave', name: 'Wave Mobile Money', feePercent: 1.0, logoText: 'Wave' },
  { id: 'momo', name: 'MTN Mobile Money', feePercent: 1.0, logoText: 'MTN MoMo' },
  { id: 'orange', name: 'Orange Money', feePercent: 1.0, logoText: 'Orange Money' },
  { id: 'moov', name: 'Moov Money', feePercent: 1.0, logoText: 'Moov' },
  { id: 'bank', name: 'Virement Bancaire (UEMOA)', feePercent: 0.2, logoText: 'Banque' },
];

export const MerchantSimulator: React.FC<MerchantSimulatorProps> = ({
  isOpen = true,
  onClose,
  onStartRegistration,
}) => {
  // Simulator State
  const [selectedPlanId, setSelectedPlanId] = useState<'starter' | 'pro' | 'enterprise'>('pro');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('mode');
  const [monthlyOrders, setMonthlyOrders] = useState<number>(65);
  const [averageBasket, setAverageBasket] = useState<number>(18500);
  const [payoutMethodId, setPayoutMethodId] = useState<string>('wave');
  const [includeEstimatedProductCost, setIncludeEstimatedProductCost] = useState<boolean>(true);

  // Selected entities
  const selectedPlan = useMemo(
    () => PLANS.find((p) => p.id === selectedPlanId) || PLANS[1],
    [selectedPlanId]
  );
  const selectedCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === selectedCategoryId) || CATEGORIES[0],
    [selectedCategoryId]
  );
  const selectedPayout = useMemo(
    () => PAYOUT_METHODS.find((p) => p.id === payoutMethodId) || PAYOUT_METHODS[0],
    [payoutMethodId]
  );

  // Quick Preset Handlers
  const handleApplyPreset = (orders: number, basket: number, plan: 'starter' | 'pro' | 'enterprise') => {
    setMonthlyOrders(orders);
    setAverageBasket(basket);
    setSelectedPlanId(plan);
  };

  // Calculations
  const grossMonthlyRevenue = useMemo(() => {
    return monthlyOrders * averageBasket;
  }, [monthlyOrders, averageBasket]);

  // Marketplace commission
  const marketplaceCommission = useMemo(() => {
    return Math.round((grossMonthlyRevenue * selectedPlan.commissionRate) / 100);
  }, [grossMonthlyRevenue, selectedPlan]);

  // Payout fee
  const payoutFee = useMemo(() => {
    return Math.round((grossMonthlyRevenue * selectedPayout.feePercent) / 100);
  }, [grossMonthlyRevenue, selectedPayout]);

  // Total Platform & Transaction Costs
  const totalPlatformCosts = useMemo(() => {
    return marketplaceCommission + payoutFee + selectedPlan.monthlyFee;
  }, [marketplaceCommission, payoutFee, selectedPlan]);

  // Net revenue deposited to seller account (CA brut - commission - abonnement - frais de retrait)
  const netSellerDeposit = useMemo(() => {
    return Math.max(0, grossMonthlyRevenue - totalPlatformCosts);
  }, [grossMonthlyRevenue, totalPlatformCosts]);

  // Estimated Estimated Cost of Goods Sold (COGS) based on category average margin
  const estimatedProductCost = useMemo(() => {
    if (!includeEstimatedProductCost) return 0;
    const marginRate = selectedCategory.avgMargin / 100;
    // Product cost is (1 - marginRate) * gross revenue
    return Math.round(grossMonthlyRevenue * (1 - marginRate));
  }, [includeEstimatedProductCost, selectedCategory, grossMonthlyRevenue]);

  // Estimated Net Profit (Bénéfice Réel Net dans la poche)
  const netSellerProfit = useMemo(() => {
    return Math.max(0, netSellerDeposit - estimatedProductCost);
  }, [netSellerDeposit, estimatedProductCost]);

  // Annualized Metrics
  const annualGrossRevenue = grossMonthlyRevenue * 12;
  const annualNetSellerDeposit = netSellerDeposit * 12;
  const annualNetSellerProfit = netSellerProfit * 12;

  // Percentage of Revenue retained by seller
  const percentageRetained = useMemo(() => {
    if (grossMonthlyRevenue === 0) return 0;
    return Math.min(100, Math.round((netSellerDeposit / grossMonthlyRevenue) * 1000) / 10);
  }, [grossMonthlyRevenue, netSellerDeposit]);

  // Physical Shop Savings comparison (average rent in Dakar/Abidjan/Cotonou + electricity/charges)
  const estimatedPhysicalShopMonthlyExpense = 150000; // 150,000 FCFA/month (local, caution, électricité, charges)
  const monthlySavingsVsBoutique = Math.max(0, estimatedPhysicalShopMonthlyExpense - selectedPlan.monthlyFee);

  const formatFCFA = (val: number) => {
    return new Intl.NumberFormat('fr-FR').format(Math.round(val)) + ' FCFA';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-[#00674F]/20 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-[#2D423B]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#00674F]/15 bg-gradient-to-r from-[#00674F] to-[#004D3B] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <Calculator className="w-5 h-5 text-[#FF7518]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  Simulateur de Compte Marchand
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#FF7518] text-white text-[10px] font-black uppercase tracking-wider">
                  Projections 2026
                </span>
              </div>
              <p className="text-xs text-white/80">
                Estimez en temps réel votre chiffre d'affaires, commissions et gains nets encaissés sur iit_store.
              </p>
            </div>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fermer le simulateur"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {/* Presets rapides en 1 clic */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-[#00674F] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF7518]" />
                <span>Profils types (1 clic pour tester)</span>
              </label>
              <span className="text-[11px] text-[#2D423B]/60 font-medium">Scénarios préconfigurés</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleApplyPreset(20, 12000, 'starter')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  monthlyOrders === 20 && selectedPlanId === 'starter'
                    ? 'border-[#00674F] bg-[#00674F]/5 ring-2 ring-[#00674F]/20'
                    : 'border-[#00674F]/15 bg-white hover:border-[#00674F]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-[#00674F]">Créateur Débutant</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 font-bold">20 ventes</span>
                </div>
                <p className="text-[11px] text-[#2D423B]/70 leading-snug">
                  Idéal pour tester ses créations sans frais fixes.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset(65, 18500, 'pro')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  monthlyOrders === 65 && selectedPlanId === 'pro'
                    ? 'border-[#FF7518] bg-[#FF7518]/5 ring-2 ring-[#FF7518]/20'
                    : 'border-[#00674F]/15 bg-white hover:border-[#FF7518]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-[#FF7518]">Boutique Active Pro</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF7518]/15 text-[#FF7518] font-bold">65 ventes</span>
                </div>
                <p className="text-[11px] text-[#2D423B]/70 leading-snug">
                  Artisan ou marque établie avec flux régulier.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset(220, 26000, 'enterprise')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  monthlyOrders === 220 && selectedPlanId === 'enterprise'
                    ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-600/20'
                    : 'border-[#00674F]/15 bg-white hover:border-purple-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-purple-800">Grossiste / Top Seller</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 font-bold">220+ ventes</span>
                </div>
                <p className="text-[11px] text-[#2D423B]/70 leading-snug">
                  Volume important bénéficiant du taux à 3%.
                </p>
              </button>
            </div>
          </div>

          {/* Grille principale : Paramètres à gauche, Résultats à droite */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Colonne Gauche : Paramètres de simulation */}
            <div className="lg:col-span-6 space-y-4">
              {/* Catégorie de produits */}
              <div className="bg-[#F4F7F5] p-4 rounded-2xl border border-[#00674F]/15">
                <label className="text-xs font-extrabold text-[#00674F] uppercase tracking-wider block mb-2">
                  1. Votre catégorie d'articles
                </label>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => {
                    const catId = e.target.value;
                    setSelectedCategoryId(catId);
                    const found = CATEGORIES.find((c) => c.id === catId);
                    if (found) setAverageBasket(found.defaultBasket);
                  }}
                  className="w-full py-2.5 px-3 bg-white border border-[#00674F]/25 rounded-xl text-xs sm:text-sm font-semibold text-[#2D423B] focus:outline-none focus:ring-2 focus:ring-[#00674F]/20 cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} (Marge brute est. ~{cat.avgMargin}%)
                    </option>
                  ))}
                </select>
              </div>

              {/* Slider 1 : Ventes mensuelles estimées */}
              <div className="bg-[#F4F7F5] p-4 rounded-2xl border border-[#00674F]/15 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-[#00674F] uppercase tracking-wider">
                    2. Volume de ventes mensuel
                  </label>
                  <span className="px-3 py-1 bg-white border border-[#00674F]/25 rounded-lg text-sm font-black text-[#00674F]">
                    {monthlyOrders} commandes / mois
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="400"
                  step="5"
                  value={monthlyOrders}
                  onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                  className="w-full accent-[#00674F] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#2D423B]/60 font-bold">
                  <span>5 commandes</span>
                  <span>100</span>
                  <span>250</span>
                  <span>400+ commandes</span>
                </div>
              </div>

              {/* Slider 2 : Panier moyen */}
              <div className="bg-[#F4F7F5] p-4 rounded-2xl border border-[#00674F]/15 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-[#00674F] uppercase tracking-wider">
                    3. Panier moyen par commande
                  </label>
                  <span className="px-3 py-1 bg-white border border-[#00674F]/25 rounded-lg text-sm font-black text-[#FF7518]">
                    {formatFCFA(averageBasket)}
                  </span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="120000"
                  step="1000"
                  value={averageBasket}
                  onChange={(e) => setAverageBasket(Number(e.target.value))}
                  className="w-full accent-[#FF7518] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#2D423B]/60 font-bold">
                  <span>3 000 F</span>
                  <span>30 000 F</span>
                  <span>60 000 F</span>
                  <span>120 000 F</span>
                </div>
              </div>

              {/* Formule de compte marchand iit_store */}
              <div>
                <label className="text-xs font-extrabold text-[#00674F] uppercase tracking-wider block mb-2">
                  4. Formule de compte marchand
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedPlanId === plan.id
                          ? 'border-[#00674F] bg-white ring-2 ring-[#00674F] shadow-sm'
                          : 'border-[#00674F]/20 bg-[#F4F7F5] hover:bg-white text-[#2D423B]/70'
                      }`}
                    >
                      <div className="text-[11px] font-black text-[#2D423B] leading-tight mb-0.5">
                        {plan.name.replace('Formule ', '')}
                      </div>
                      <div className="text-xs font-black text-[#00674F]">
                        {plan.commissionRate}%
                      </div>
                      <div className="text-[9px] text-[#2D423B]/60">
                        {plan.monthlyFee === 0 ? '0 F/mois' : `${plan.monthlyFee.toLocaleString('fr-FR')} F/m`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode de retrait */}
              <div>
                <label className="text-xs font-extrabold text-[#00674F] uppercase tracking-wider block mb-2">
                  5. Moyen de reversement favori
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {PAYOUT_METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPayoutMethodId(m.id)}
                      className={`p-2 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        payoutMethodId === m.id
                          ? 'border-[#00674F] bg-[#00674F]/10 text-[#00674F]'
                          : 'border-[#00674F]/20 bg-white text-[#2D423B]/70 hover:bg-[#F4F7F5]'
                      }`}
                    >
                      <span>{m.logoText}</span>
                      <span className="text-[10px] font-mono text-[#2D423B]/50">{m.feePercent}%</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne Droite : Résultats Clés & Décomposition Financière */}
            <div className="lg:col-span-6 space-y-4">
              {/* Carte Principale : Gains Net Encaissés */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#00674F] to-[#004433] text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF7518]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black tracking-wider uppercase text-white/80">
                      Chiffre d'Affaires Brut Estimé
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-white text-[11px] font-bold border border-white/20">
                      {monthlyOrders} commandes
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                    {formatFCFA(grossMonthlyRevenue)}
                    <span className="text-xs font-medium text-white/70 block mt-0.5">
                      par mois ({formatFCFA(annualGrossRevenue)} / an)
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/15">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF7518] flex items-center gap-1.5">
                        <Wallet className="w-4 h-4" />
                        <span>Gain Net Encaissé sur votre compte</span>
                      </span>
                      <span className="text-xs font-black text-emerald-300">
                        {percentageRetained}% du CA
                      </span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {formatFCFA(netSellerDeposit)}
                      <span className="text-xs font-normal text-white/85 block mt-1">
                        Viré directement sur votre compte {selectedPayout.logoText}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Décomposition détaillée des frais (Transparence Totale) */}
              <div className="bg-[#F4F7F5] p-4 sm:p-5 rounded-2xl border border-[#00674F]/15 space-y-2.5 text-xs">
                <h4 className="font-extrabold text-[#00674F] uppercase tracking-wider text-[11px] flex items-center justify-between">
                  <span>Détail des commissions & frais</span>
                  <span className="text-[10px] text-[#2D423B]/60 font-medium">100% transparent</span>
                </h4>

                <div className="flex items-center justify-between py-1.5 border-b border-[#00674F]/10">
                  <span className="text-[#2D423B]/80">Commission marketplace iit_store ({selectedPlan.commissionRate}%) :</span>
                  <span className="font-bold text-[#2D423B]">{formatFCFA(marketplaceCommission)}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#00674F]/10">
                  <span className="text-[#2D423B]/80">Frais de retrait sécurisé ({selectedPayout.logoText} {selectedPayout.feePercent}%) :</span>
                  <span className="font-bold text-[#2D423B]">{formatFCFA(payoutFee)}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[#00674F]/10">
                  <span className="text-[#2D423B]/80">Abonnement formule {selectedPlan.name} :</span>
                  <span className="font-bold text-[#2D423B]">{formatFCFA(selectedPlan.monthlyFee)}</span>
                </div>

                <div className="flex items-center justify-between pt-1 font-black text-sm text-[#00674F]">
                  <span>Total des frais plateforme :</span>
                  <span>{formatFCFA(totalPlatformCosts)}</span>
                </div>
              </div>

              {/* Comparatif avec une boutique physique */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <Building className="w-4 h-4 text-amber-700" />
                  <span>Comparatif boutique physique locale</span>
                </div>
                <p className="text-[#2D423B]/80 text-[11px] leading-relaxed">
                  Loyer moyen + charges d'une boutique en ville : ~150 000 FCFA/mois.
                  Sur iit_store, vous économisez environ{' '}
                  <strong className="text-[#00674F] font-black">{formatFCFA(monthlySavingsVsBoutique)}/mois</strong>{' '}
                  tout en touchant des acheteurs dans tous les pays d'Afrique de l'Ouest !
                </p>
              </div>

              {/* Estimation du Bénéfice Net après coût produit */}
              <div className="p-4 rounded-2xl bg-white border border-[#00674F]/20 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs font-bold text-[#2D423B] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeEstimatedProductCost}
                      onChange={(e) => setIncludeEstimatedProductCost(e.target.checked)}
                      className="rounded border-[#00674F]/30 text-[#00674F] focus:ring-[#00674F]"
                    />
                    <span>Déduire le coût estimé des marchandises (~{selectedCategory.avgMargin}% marge)</span>
                  </label>
                </div>

                {includeEstimatedProductCost && (
                  <div className="pt-2 border-t border-[#00674F]/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#2D423B]/70 block uppercase font-bold">
                        Bénéfice Net Réel Vendeur estimé :
                      </span>
                      <span className="text-xl font-black text-[#00674F]">
                        {formatFCFA(netSellerProfit)}
                        <span className="text-xs font-normal text-[#2D423B]/60"> / mois</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#2D423B]/70 block uppercase font-bold">
                        Projection sur 1 an :
                      </span>
                      <span className="text-sm font-black text-[#FF7518]">
                        {formatFCFA(annualNetSellerProfit)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer avec CTA d'Action Directe */}
        <div className="px-6 py-4 border-t border-[#00674F]/15 bg-[#F4F7F5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#2D423B]/70">
            <ShieldCheck className="w-4 h-4 text-[#00674F] shrink-0" />
            <span>Aucun engagement. Vous pouvez changer de formule ou suspendre à tout moment.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl border border-[#00674F]/25 bg-white hover:bg-neutral-50 text-xs font-extrabold text-[#2D423B] transition-colors cursor-pointer w-full sm:w-auto"
              >
                Fermer
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (onStartRegistration) {
                  onStartRegistration(selectedCategory.name, selectedPlan.name);
                } else if (onClose) {
                  onClose();
                }
              }}
              className="py-2.5 px-5 rounded-xl bg-[#FF7518] hover:bg-[#E6630D] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md shadow-[#FF7518]/25 transition-all cursor-pointer w-full sm:w-auto group"
            >
              <Store className="w-4 h-4" />
              <span>Ouvrir ma boutique avec cette simulation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
