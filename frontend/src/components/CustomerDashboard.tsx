import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  Truck,
  Wallet,
  User,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  Store,
  Eye,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Search,
  Check,
  CreditCard,
  Plus,
  X,
  FileText,
  RotateCw,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Download,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Package,
} from 'lucide-react';

export interface CustomerOrder {
  id: string;
  date: string;
  status: 'processing' | 'in_delivery' | 'delivered' | 'cancelled';
  items: {
    title: string;
    quantity: number;
    priceFcfa: number;
    image?: string;
    sellerName: string;
  }[];
  totalFcfa: number;
  paymentMethod: string;
  paymentOperator: 'WAVE' | 'ORANGE' | 'MTN' | 'CARD' | 'CASH';
  courierName?: string;
  courierPhone?: string;
  courierVehicle?: string;
  deliveryAddress: string;
  city: string;
  otpCode?: string;
  eta?: string;
}

interface CustomerDashboardProps {
  userEmail: string;
  onBackToShopping: () => void;
  onLogout: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, desc?: string) => void;
  initialTab?: 'dashboard' | 'orders' | 'deliveries' | 'wallet' | 'profile';
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  userEmail,
  onBackToShopping,
  onLogout,
  onToast,
  initialTab = 'dashboard',
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'deliveries' | 'wallet' | 'profile'>(initialTab);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Profil client
  const [customerProfile, setCustomerProfile] = useState({
    fullName: userEmail.split('@')[0].replace(/[._]/g, ' ').toUpperCase() || 'CLIENT IIT_STORE',
    email: userEmail,
    phone: '+225 07 89 45 12',
    preferredCountry: 'Côte d’Ivoire',
    city: 'Abidjan',
    primaryAddress: 'Plateau Dokui, Rue F28, Villa 14',
  });

  // Adresses enregistrées
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: 'Domicile (Principal)',
      street: 'Plateau Dokui, Rue F28, Villa 14',
      city: 'Abidjan',
      notes: 'Portail gris, sonner à l’interphone',
      isDefault: true,
    },
    {
      id: 2,
      label: 'Bureau / Lieu de travail',
      street: 'Immeuble Postel 2001, 4ème étage, Plateau',
      city: 'Abidjan',
      notes: 'Remettre à l’accueil au nom de M. Vincent',
      isDefault: false,
    },
    {
      id: 3,
      label: 'Résidence secondaire',
      street: 'Quartier Commerce, Face Grand Marché',
      city: 'Bouaké',
      notes: 'Livraison le week-end uniquement',
      isDefault: false,
    },
  ]);

  // Commandes client
  const [orders, setOrders] = useState<CustomerOrder[]>([
    {
      id: 'CMD-CI-94821',
      date: '29 Septembre 2026 à 14:15',
      status: 'in_delivery',
      items: [
        {
          title: 'Chemise Col Mao Wax Royal Africain',
          quantity: 2,
          priceFcfa: 45000,
          sellerName: 'AVG Couture Wax',
        },
        {
          title: 'Sandales Cuir Touareg Fait-Main',
          quantity: 1,
          priceFcfa: 27500,
          sellerName: 'Artisans du Sahel',
        },
      ],
      totalFcfa: 72500,
      paymentMethod: 'Wave Mobile Money',
      paymentOperator: 'WAVE',
      courierName: 'Amara Bamba',
      courierPhone: '+225 07 22 44 88',
      courierVehicle: 'Moto Express #14',
      deliveryAddress: 'Plateau Dokui, Rue F28, Villa 14',
      city: 'Abidjan',
      otpCode: '5829',
      eta: 'Aujourd’hui avant 16:30',
    },
    {
      id: 'CMD-CI-94750',
      date: '22 Septembre 2026 à 10:30',
      status: 'delivered',
      items: [
        {
          title: 'Robe Brodée Wax Woodin Prestige',
          quantity: 1,
          priceFcfa: 38000,
          sellerName: 'Atelier Woodin Cocody',
        },
      ],
      totalFcfa: 38000,
      paymentMethod: 'Orange Money',
      paymentOperator: 'ORANGE',
      courierName: 'Moussa Diop',
      courierPhone: '+225 01 44 77 99',
      courierVehicle: 'Moto Express #07',
      deliveryAddress: 'Cocody Angré 8ème Tranche',
      city: 'Abidjan',
      otpCode: '8492',
      eta: 'Livré le 22/09 à 15:10',
    },
    {
      id: 'CMD-CI-93110',
      date: '14 Septembre 2026 à 18:40',
      status: 'delivered',
      items: [
        {
          title: 'Pochette Bogolan Tissé Artisanal',
          quantity: 1,
          priceFcfa: 15000,
          sellerName: 'Artisans du Sahel',
        },
        {
          title: 'Café Bio de Man Sélection Or',
          quantity: 2,
          priceFcfa: 12000,
          sellerName: 'Terroirs de Côte d’Ivoire',
        },
      ],
      totalFcfa: 27000,
      paymentMethod: 'Paiement à la livraison (Cash)',
      paymentOperator: 'CASH',
      courierName: 'Kader Ouattara',
      courierPhone: '+225 05 33 66 99',
      courierVehicle: 'Fourgon Relais #02',
      deliveryAddress: 'Marcory Zone 4',
      city: 'Abidjan',
      otpCode: '3190',
      eta: 'Livré le 15/09 à 11:20',
    },
  ]);

  // Filtres commandes
  const [orderFilter, setOrderFilter] = useState<'all' | 'in_delivery' | 'delivered' | 'cancelled'>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

  // Portefeuille client / Avoirs / Cashback
  const [cashbackBalanceFcfa, setCashbackBalanceFcfa] = useState(18500);
  const [paymentSubTab, setPaymentSubTab] = useState<'history' | 'methods'>('history');

  // Transactions portefeuille
  const [walletTransactions, setWalletTransactions] = useState([
    {
      id: 'TXN-9941',
      date: '29 Sept 2026 à 14:16',
      description: 'Paiement commande #CMD-CI-94821',
      operator: 'Wave Mobile Money',
      amountFcfa: -72500,
      status: 'success',
    },
    {
      id: 'TXN-9942',
      date: '29 Sept 2026 à 14:16',
      description: 'Cashback 5% fidélité iit_store crédité',
      operator: 'Portefeuille iit_store',
      amountFcfa: 3625,
      status: 'success',
    },
    {
      id: 'TXN-8812',
      date: '22 Sept 2026 à 10:31',
      description: 'Paiement commande #CMD-CI-94750',
      operator: 'Orange Money',
      amountFcfa: -38000,
      status: 'success',
    },
    {
      id: 'TXN-7410',
      date: '15 Sept 2026 à 09:00',
      description: 'Rechargement compte iit_store',
      operator: 'Wave Mobile Money',
      amountFcfa: 25000,
      status: 'success',
    },
  ]);

  // Moyens de paiement enregistrés
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([
    { id: 1, type: 'WAVE', label: 'Wave Mobile Money', detail: '+225 07 89 45 12', isDefault: true },
    { id: 2, type: 'ORANGE', label: 'Orange Money Côte d’Ivoire', detail: '+225 07 11 22 33', isDefault: false },
    { id: 3, type: 'CARD', label: 'Carte Bancaire Visa', detail: '•••• 4242 (Expire 12/28)', isDefault: false },
  ]);

  // Modales
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: '', street: '', city: 'Abidjan', notes: '' });

  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'WAVE',
    detail: '',
  });

  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<CustomerOrder | null>(null);

  // Filtrage commandes
  const filteredOrders = orders.filter((o) => {
    if (orderFilter !== 'all' && o.status !== orderFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchItem = o.items.some((it) => it.title.toLowerCase().includes(q));
      if (!matchId && !matchItem) return false;
    }
    return true;
  });

  // Calcul totaux
  const totalSpentFcfa = orders.reduce((sum, o) => sum + o.totalFcfa, 0);
  const activeDeliveriesCount = orders.filter((o) => o.status === 'in_delivery').length;

  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col lg:flex-row antialiased text-gray-800">
      {/* 1. BARRE LATÉRALE (SIDEBAR) EXACTEMENT COMME LE DASHBOARD MARCHAND */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between bg-white border-r border-gray-100 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        <div className="p-4 sm:p-5">
          {/* Logo et Nom Marketplace */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00674F] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#00674F]/20">
              <Store className="w-5 h-5" />
            </div>

            {isSidebarOpen && (
              <div className="min-w-0">
                <span className="font-extrabold text-xl text-[#00674F] tracking-tight block truncate">
                  iit_store
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Espace Client
                </span>
              </div>
            )}
          </div>

          {/* Fiche Client Connecté */}
          <div className="mt-5 p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF7518]/15 text-[#FF7518] flex items-center justify-center font-black text-sm shrink-0">
              {customerProfile.fullName.charAt(0) || 'C'}
            </div>
            {isSidebarOpen && (
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-gray-900 truncate">
                  {customerProfile.fullName}
                </div>
                <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Client Vérifié</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Menu Principal */}
          <div className="mt-6">
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              {isSidebarOpen ? 'Mon Espace' : '•••'}
            </div>

            <nav className="space-y-1">
              {/* 1. Tableau de bord */}
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                title="Tableau de bord"
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-gray-100 text-gray-900 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0 text-[#00674F]" />
                {isSidebarOpen && <span>Tableau de bord</span>}
              </button>

              {/* 2. Commandes */}
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                title="Mes Commandes"
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-gray-100 text-gray-900 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-4 h-4 shrink-0 text-[#FF7518]" />
                  {isSidebarOpen && <span>Commandes</span>}
                </div>
                {isSidebarOpen && orders.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-200/80 text-gray-700">
                    {orders.length}
                  </span>
                )}
              </button>

              {/* 3. Livraisons & Suivi */}
              <button
                type="button"
                onClick={() => setActiveTab('deliveries')}
                title="Suivi des Livraisons"
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'deliveries'
                    ? 'bg-gray-100 text-gray-900 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 shrink-0 text-[#8B5CF6]" />
                  {isSidebarOpen && <span>Livraisons</span>}
                </div>
                {isSidebarOpen && activeDeliveriesCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 animate-pulse">
                    {activeDeliveriesCount}
                  </span>
                )}
              </button>

              {/* 4. Paiements & Portefeuille */}
              <button
                type="button"
                onClick={() => setActiveTab('wallet')}
                title="Paiements & Portefeuille"
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'wallet'
                    ? 'bg-gray-100 text-gray-900 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Wallet className="w-4 h-4 shrink-0 text-emerald-600" />
                {isSidebarOpen && <span>Paiements</span>}
              </button>

              {/* 5. Profil & Adresses */}
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                title="Mon Profil"
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-gray-100 text-gray-900 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <User className="w-4 h-4 shrink-0 text-blue-600" />
                {isSidebarOpen && <span>Profil</span>}
              </button>
            </nav>
          </div>
        </div>

        {/* Pied de la barre latérale avec Déconnexion */}
        <div className="p-4 sm:p-5 border-t border-gray-100 space-y-2">
          {/* Bouton Déconnexion */}
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Se déconnecter"
          >
            <LogOut className="w-4 h-4 shrink-0 text-red-500" />
            {isSidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Backdrop sombre mobile quand la barre latérale est ouverte */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* 2. ZONE PRINCIPALE DE CONTENU */}
      <div className={`flex-1 flex flex-col min-w-0 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
      }`}>
        {/* Barre supérieure minimale avec bouton toggle sidebar */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
              title={isSidebarOpen ? 'Réduire la barre latérale' : 'Agrandir la barre latérale'}
              aria-label="Basculer la barre latérale"
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-5 h-5 stroke-[2.2]" />
              ) : (
                <PanelLeft className="w-5 h-5 stroke-[2.2]" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Lien rapide vers le catalogue */}
            <button
              type="button"
              onClick={onBackToShopping}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-all cursor-pointer shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">Explorer le catalogue</span>
            </button>

            {/* Déconnexion rapide */}
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-all cursor-pointer"
              title="Se déconnecter"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </header>

        {/* CONTENU PRINCIPAL SELON L'ONGLET ACTIF */}
        <main className="p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-8">
          
          {/* ======================================================== */}
          {/* ONGLET 1 : TABLEAU DE BORD CLIENT */}
          {/* ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* En-tête de bienvenue */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Bonjour, {customerProfile.fullName.split(' ')[0]} 👋
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Bienvenue sur votre espace personnel iit_store. Suivez vos achats et livraisons en toute simplicité.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onBackToShopping}
                  className="px-4 py-2.5 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Faire du shopping</span>
                </button>
              </div>

              {/* 4 Cartes Métriques Client */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* 1. Dépenses totales */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Total Dépensé</span>
                    <CreditCard className="w-4 h-4 text-[#00674F]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#00674F] my-2 tracking-tight">
                    {totalSpentFcfa.toLocaleString('fr-FR')} FCFA
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    Sur l’ensemble de vos commandes
                  </div>
                </div>

                {/* 2. Commandes passées */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Commandes</span>
                    <ShoppingCart className="w-4 h-4 text-[#FF7518]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-900 my-2 tracking-tight">
                    {orders.length} commande{orders.length > 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-emerald-600 font-bold">
                    100% traitées avec succès
                  </div>
                </div>

                {/* 3. Colis en transit */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">En cours de livraison</span>
                    <Truck className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#8B5CF6] my-2 tracking-tight">
                    {activeDeliveriesCount} colis
                  </div>
                  <div className="text-xs text-purple-600 font-medium">
                    {activeDeliveriesCount > 0 ? 'Livraison aujourd’hui' : 'Aucun colis en route'}
                  </div>
                </div>

                {/* 4. Solde Fidélité / Cashback */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Portefeuille Fidélité</span>
                    <Wallet className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 my-2 tracking-tight">
                    {cashbackBalanceFcfa.toLocaleString('fr-FR')} FCFA
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    Disponible pour vos prochains achats
                  </div>
                </div>
              </div>

              {/* Alerte Colis en route si présent */}
              {activeDeliveriesCount > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/80 border border-purple-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Truck className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-purple-950">
                        Votre colis #{orders[0].id} est actuellement en route !
                      </div>
                      <div className="text-xs text-purple-800/80 mt-0.5">
                        Coursier : <strong>{orders[0].courierName}</strong> ({orders[0].courierVehicle}) • Code OTP à fournir au livreur : <strong className="font-mono text-purple-900 bg-purple-200/60 px-1.5 py-0.5 rounded">{orders[0].otpCode}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTrackingOrder(orders[0]);
                      setIsTrackingModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs"
                  >
                    Suivre en direct
                  </button>
                </div>
              )}

              {/* Dernières Commandes Récents */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-gray-900">
                    Mes Dernières Commandes
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-[#00674F] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Voir toutes mes commandes</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {orders.slice(0, 3).map((o) => (
                    <div key={o.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-extrabold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                            {o.id}
                          </span>
                          <span className="text-gray-400">• {o.date}</span>
                          {o.status === 'in_delivery' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
                              En cours d’acheminement
                            </span>
                          )}
                          {o.status === 'delivered' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                              Livrée
                            </span>
                          )}
                        </div>

                        <div className="text-gray-700 font-semibold">
                          {o.items.map((it) => `${it.quantity}x ${it.title}`).join(', ')}
                        </div>

                        <div className="text-gray-400 text-[11px]">
                          Paiement : {o.paymentMethod} • Destination : {o.deliveryAddress}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-black text-gray-900 text-sm">
                          {o.totalFcfa.toLocaleString('fr-FR')} FCFA
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(o);
                            setActiveTab('orders');
                          }}
                          className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-bold text-gray-700 shadow-2xs cursor-pointer"
                        >
                          Détails
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ONGLET 2 : MES COMMANDES */}
          {/* ======================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Mes Commandes
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Historique complet de vos achats, factures et statuts d’expédition
                  </p>
                </div>

                {/* Recherche de commande */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Rechercher une commande..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00674F]"
                  />
                </div>
              </div>

              {/* Filtres par statut */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'Toutes les commandes' },
                  { id: 'in_delivery', label: 'En cours d’acheminement' },
                  { id: 'delivered', label: 'Livrées' },
                  { id: 'cancelled', label: 'Annulées' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setOrderFilter(f.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      orderFilter === f.id
                        ? 'bg-[#00674F] text-white shadow-2xs'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Liste des commandes */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-2xs">
                    <ShoppingCart className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-800 text-sm">Aucune commande trouvée</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {orderSearch ? 'Aucun résultat pour cette recherche.' : 'Vous n’avez pas encore passé de commande.'}
                    </p>
                  </div>
                ) : (
                  filteredOrders.map((o) => (
                    <div
                      key={o.id}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono font-extrabold text-sm text-gray-900 bg-gray-100 px-2.5 py-1 rounded-lg">
                            {o.id}
                          </span>
                          <span className="text-xs text-gray-500">{o.date}</span>
                          {o.status === 'in_delivery' && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                              🚚 En cours de livraison
                            </span>
                          )}
                          {o.status === 'delivered' && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                              ✔ Livrée avec succès
                            </span>
                          )}
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-black text-[#00674F]">
                            {o.totalFcfa.toLocaleString('fr-FR')} FCFA
                          </span>
                          <span className="block text-[10px] text-gray-400">
                            Payé par {o.paymentMethod}
                          </span>
                        </div>
                      </div>

                      {/* Articles de la commande */}
                      <div className="space-y-3">
                        {o.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs py-1">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-700">
                                {it.quantity}x
                              </span>
                              <div>
                                <span className="font-bold text-gray-900">{it.title}</span>
                                <span className="block text-[11px] text-gray-400">Vendu par {it.sellerName}</span>
                              </div>
                            </div>
                            <span className="font-bold text-gray-700">
                              {it.priceFcfa.toLocaleString('fr-FR')} FCFA
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Pied de commande avec actions */}
                      <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div className="text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>Adresse de livraison : <strong>{o.deliveryAddress}</strong></span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          {o.status === 'in_delivery' && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveTrackingOrder(o);
                                setIsTrackingModalOpen(true);
                              }}
                              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold cursor-pointer shadow-xs"
                            >
                              Suivre mon colis
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              onToast('success', 'Bordereau téléchargé', `Le reçu de la commande ${o.id} a été généré.`);
                            }}
                            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Facture</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ONGLET 3 : MES LIVRAISONS & TRACEUR EN DIRECT */}
          {/* ======================================================== */}
          {activeTab === 'deliveries' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Suivi des Livraisons
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Acheminement en direct par iit_store Relais Express et coursiers géo-localisés
                </p>
              </div>

              {/* Colis actif en route */}
              {orders
                .filter((o) => o.status === 'in_delivery')
                .map((o) => (
                  <div
                    key={o.id}
                    className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-2xs space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-purple-600 tracking-wider block">
                          Colis en cours d’acheminement
                        </span>
                        <h3 className="text-base font-extrabold text-gray-900 mt-0.5">
                          Commande #{o.id}
                        </h3>
                      </div>
                      <div className="text-xs font-semibold text-gray-600 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
                        Arrivée estimée : <strong className="text-purple-900">{o.eta}</strong>
                      </div>
                    </div>

                    {/* Timeline 4 Étapes */}
                    <div className="py-2">
                      <div className="relative flex items-center justify-between">
                        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-gray-100 -z-0" />
                        <div
                          className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-[#8B5CF6] transition-all -z-0"
                          style={{ width: '75%' }}
                        />

                        {[
                          { step: 1, label: 'Confirmée', desc: 'Paiement validé', done: true },
                          { step: 2, label: 'Préparée', desc: 'Emballée par vendeur', done: true },
                          { step: 3, label: 'En route', desc: 'Dernier kilomètre', done: true, current: true },
                          { step: 4, label: 'Livrée', desc: 'Validation code OTP', done: false },
                        ].map((st) => (
                          <div key={st.step} className="flex flex-col items-center text-center z-10">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                st.done
                                  ? 'bg-[#8B5CF6] text-white shadow-xs'
                                  : 'bg-white border-2 border-gray-200 text-gray-400'
                              } ${st.current ? 'ring-4 ring-purple-200 scale-110' : ''}`}
                            >
                              {st.done ? <Check className="w-4 h-4 stroke-[3]" /> : st.step}
                            </div>
                            <span className={`text-[11px] font-bold mt-2 ${st.current ? 'text-purple-950 font-black' : 'text-gray-600'}`}>
                              {st.label}
                            </span>
                            <span className="text-[10px] text-gray-400 hidden sm:block">
                              {st.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fiche Coursier & Code OTP */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                      <div className="p-3.5 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">
                          Coursier assigné
                        </span>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-gray-900 text-sm">{o.courierName}</div>
                            <div className="text-gray-500 font-mono text-[11px]">{o.courierVehicle}</div>
                          </div>
                          {o.courierPhone && (
                            <a
                              href={`tel:${o.courierPhone.replace(/\s+/g, '')}`}
                              className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 font-bold text-gray-700 flex items-center gap-1 shadow-2xs"
                            >
                              <Phone className="w-3 h-3 text-purple-600" />
                              <span>Appeler</span>
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="p-3.5 bg-purple-50/60 rounded-xl space-y-1.5 border border-purple-100">
                        <span className="text-[10px] font-bold uppercase text-purple-700 tracking-wider block">
                          Code de sécurité OTP
                        </span>
                        <div className="text-xs text-gray-600">
                          Communiquez ce code au coursier à la réception du colis :
                        </div>
                        <div className="font-mono font-black text-xl text-purple-900 tracking-widest">
                          {o.otpCode}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {/* Historique des réceptions */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-2xs space-y-4">
                <h3 className="text-base font-extrabold text-gray-900">
                  Historique des Réceptions
                </h3>

                <div className="divide-y divide-gray-100 text-xs">
                  {orders
                    .filter((o) => o.status === 'delivered')
                    .map((o) => (
                      <div key={o.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-gray-900">{o.id}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Colis réceptionné
                            </span>
                          </div>
                          <div className="text-gray-600">
                            Articles : {o.items.map((i) => i.title).join(', ')}
                          </div>
                          <div className="text-gray-400 text-[11px]">
                            Livreur : {o.courierName} ({o.courierVehicle}) • {o.eta}
                          </div>
                        </div>

                        <span className="font-black text-gray-900">
                          {o.totalFcfa.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ONGLET 4 : MES PAIEMENTS & PORTEFEUILLE */}
          {/* ======================================================== */}
          {activeTab === 'wallet' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Paiements & Portefeuille
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Gérez vos transactions, moyens de paiement enregistrés et solde fidélité
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddCardModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter un moyen de paiement</span>
                </button>
              </div>

              {/* Cartes d'aperçu financier */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-semibold uppercase tracking-wider text-[11px]">Solde Cashback & Avoirs</span>
                    <Wallet className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-black text-emerald-600 tracking-tight">
                    {cashbackBalanceFcfa.toLocaleString('fr-FR')} FCFA
                  </div>
                  <p className="text-xs text-gray-500">
                    Déduit automatiquement de votre prochaine commande si activé.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-semibold uppercase tracking-wider text-[11px]">Dépenses totales 2026</span>
                    <CreditCard className="w-4 h-4 text-[#00674F]" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 tracking-tight">
                    {totalSpentFcfa.toLocaleString('fr-FR')} FCFA
                  </div>
                  <p className="text-xs text-gray-500">
                    Toutes commandes réglées avec succès.
                  </p>
                </div>
              </div>

              {/* Sous-onglets Paiements */}
              <div className="bg-gray-100/90 p-1 rounded-xl flex items-center justify-start gap-1">
                <button
                  type="button"
                  onClick={() => setPaymentSubTab('history')}
                  className={`py-2 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    paymentSubTab === 'history'
                      ? 'bg-white text-gray-900 shadow-2xs'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Historique des transactions
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentSubTab('methods')}
                  className={`py-2 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    paymentSubTab === 'methods'
                      ? 'bg-white text-gray-900 shadow-2xs'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Moyens de paiement enregistrés ({savedPaymentMethods.length})
                </button>
              </div>

              {/* Contenu Sous-onglet 1 : Historique des transactions */}
              {paymentSubTab === 'history' && (
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-2xs">
                  <div className="divide-y divide-gray-100 text-xs">
                    {walletTransactions.map((tx) => (
                      <div key={tx.id} className="py-3.5 flex items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="font-bold text-gray-900">{tx.description}</div>
                          <div className="text-gray-400 text-[11px]">
                            {tx.date} • {tx.operator}
                          </div>
                        </div>
                        <div
                          className={`font-mono font-black text-sm ${
                            tx.amountFcfa < 0 ? 'text-gray-900' : 'text-emerald-600'
                          }`}
                        >
                          {tx.amountFcfa > 0 ? `+${tx.amountFcfa.toLocaleString('fr-FR')}` : tx.amountFcfa.toLocaleString('fr-FR')} FCFA
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contenu Sous-onglet 2 : Moyens de paiement */}
              {paymentSubTab === 'methods' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {savedPaymentMethods.map((m) => (
                    <div
                      key={m.id}
                      className="p-5 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-3 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-gray-900">{m.label}</span>
                        {m.isDefault && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00674F]/10 text-[#00674F]">
                            Défaut
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-xs text-gray-600">
                        {m.detail}
                      </div>
                      <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                        <span className="text-[11px] text-emerald-600 font-bold">Sécurisé SSL</span>
                        <button
                          type="button"
                          onClick={() => {
                            onToast('info', 'Moyen de paiement', 'Ce moyen de paiement reste actif.');
                          }}
                          className="text-gray-400 hover:text-gray-700 font-semibold cursor-pointer"
                        >
                          Modifier
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* ONGLET 5 : PROFIL & ADRESSES DE LIVRAISON */}
          {/* ======================================================== */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Mon Profil & Adresses
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Informations de contact et carnets d’adresses pour vos futures commandes
                </p>
              </div>

              {/* Formulaire Informations Personnelles */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-5">
                <h3 className="text-base font-extrabold text-gray-900">
                  Coordonnées Personnelles
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onToast('success', 'Profil mis à jour', 'Vos coordonnées ont été enregistrées avec succès.');
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs"
                >
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Nom complet</label>
                    <input
                      type="text"
                      value={customerProfile.fullName}
                      onChange={(e) => setCustomerProfile({ ...customerProfile, fullName: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Adresse Email</label>
                    <input
                      type="email"
                      value={customerProfile.email}
                      disabled
                      className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl font-mono text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Numéro de téléphone portable</label>
                    <input
                      type="tel"
                      value={customerProfile.phone}
                      onChange={(e) => setCustomerProfile({ ...customerProfile, phone: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Ville principale</label>
                    <input
                      type="text"
                      value={customerProfile.city}
                      onChange={(e) => setCustomerProfile({ ...customerProfile, city: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white font-bold text-xs shadow-xs cursor-pointer"
                    >
                      Enregistrer les modifications
                    </button>
                  </div>
                </form>
              </div>

              {/* Carnet d’adresses */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900">
                      Carnet d’Adresses de Livraison
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Sélectionnez ou ajoutez des adresses pour recevoir vos colis plus vite
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddAddressModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nouvelle adresse</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 space-y-2 text-xs flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-gray-900">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00674F]/10 text-[#00674F]">
                              Défaut
                            </span>
                          )}
                        </div>
                        <div className="text-gray-700 flex items-start gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                          <span>{addr.street}, {addr.city}</span>
                        </div>
                        {addr.notes && (
                          <div className="text-[11px] text-gray-400 italic">
                            « {addr.notes} »
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-gray-200/50 flex justify-between items-center text-[11px]">
                        {!addr.isDefault ? (
                          <button
                            type="button"
                            onClick={() => {
                              setAddresses(
                                addresses.map((a) => ({ ...a, isDefault: a.id === addr.id }))
                              );
                              onToast('success', 'Adresse principale', `L'adresse ${addr.label} est désormais votre adresse par défaut.`);
                            }}
                            className="text-[#00674F] font-bold hover:underline cursor-pointer"
                          >
                            Définir par défaut
                          </button>
                        ) : (
                          <span className="text-emerald-700 font-bold">Adresse active</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODALE : NOUVELLE ADRESSE */}
      {isAddAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="font-extrabold text-base text-gray-900">Ajouter une adresse</h3>
              <button
                type="button"
                onClick={() => setIsAddAddressModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newAddress.street.trim()) {
                  onToast('error', 'Champs requis', 'Veuillez saisir votre rue ou quartier.');
                  return;
                }
                const newId = Date.now();
                setAddresses([
                  ...addresses,
                  {
                    id: newId,
                    label: newAddress.label || 'Autre adresse',
                    street: newAddress.street,
                    city: newAddress.city,
                    notes: newAddress.notes,
                    isDefault: false,
                  },
                ]);
                setIsAddAddressModalOpen(false);
                setNewAddress({ label: '', street: '', city: 'Abidjan', notes: '' });
                onToast('success', 'Adresse ajoutée', 'Nouvelle adresse de livraison enregistrée.');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-gray-700 block mb-1">Intitulé (ex: Bureau, Maison des parents...)</label>
                <input
                  type="text"
                  placeholder="Maison, Bureau..."
                  value={newAddress.label}
                  onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Rue / Quartier / Repères</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Cocody Angré 7ème tranche, Carrefour Duncan..."
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Ville</label>
                <select
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 cursor-pointer"
                >
                  <option value="Abidjan">Abidjan (Côte d’Ivoire)</option>
                  <option value="Bouaké">Bouaké (Côte d’Ivoire)</option>
                  <option value="Yamoussoukro">Yamoussoukro (Côte d’Ivoire)</option>
                  <option value="San Pedro">San Pedro (Côte d’Ivoire)</option>
                  <option value="Dakar">Dakar (Sénégal)</option>
                  <option value="Cotonou">Cotonou (Bénin)</option>
                  <option value="Lomé">Lomé (Togo)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Instructions pour le livreur (Optionnel)</label>
                <input
                  type="text"
                  placeholder="Portail blanc, sonner au 2ème..."
                  value={newAddress.notes}
                  onChange={(e) => setNewAddress({ ...newAddress, notes: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddAddressModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white font-bold cursor-pointer shadow-xs"
                >
                  Ajouter l'adresse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE : AJOUT MOYEN DE PAIEMENT */}
      {isAddCardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="font-extrabold text-base text-gray-900">Nouveau moyen de paiement</h3>
              <button
                type="button"
                onClick={() => setIsAddCardModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newPaymentMethod.detail.trim()) {
                  onToast('error', 'Champs requis', 'Veuillez saisir votre numéro ou carte.');
                  return;
                }
                const newMethod = {
                  id: Date.now(),
                  type: newPaymentMethod.type,
                  label: newPaymentMethod.type === 'WAVE' ? 'Wave Mobile Money' : newPaymentMethod.type === 'ORANGE' ? 'Orange Money' : 'Carte Bancaire',
                  detail: newPaymentMethod.detail,
                  isDefault: false,
                };
                setSavedPaymentMethods([...savedPaymentMethods, newMethod]);
                setIsAddCardModalOpen(false);
                setNewPaymentMethod({ type: 'WAVE', detail: '' });
                onToast('success', 'Moyen de paiement ajouté', 'Votre moyen de paiement a été enregistré.');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-gray-700 block mb-1">Opérateur</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'WAVE', label: 'Wave' },
                    { id: 'ORANGE', label: 'Orange' },
                    { id: 'CARD', label: 'Carte' },
                  ].map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => setNewPaymentMethod({ ...newPaymentMethod, type: op.id })}
                      className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                        newPaymentMethod.type === op.id
                          ? 'border-[#00674F] bg-[#00674F]/10 text-[#00674F]'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  {newPaymentMethod.type === 'CARD' ? 'Numéro de carte (16 chiffres)' : 'Numéro de téléphone Mobile Money'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={newPaymentMethod.type === 'CARD' ? '4111 2222 3333 4444' : '+225 07 00 00 00'}
                  value={newPaymentMethod.detail}
                  onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, detail: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCardModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white font-bold cursor-pointer shadow-xs"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE : TRACEUR DÉTAILLÉ EN DIRECT */}
      {isTrackingModalOpen && activeTrackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-gray-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-purple-600 block">Traceur iit_store Relais Express</span>
                <h3 className="font-extrabold text-base text-gray-900">{activeTrackingOrder.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTrackingModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-purple-50/70 rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Livreur :</span>
                <strong className="text-purple-900">{activeTrackingOrder.courierName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Véhicule :</span>
                <span className="font-mono text-gray-700">{activeTrackingOrder.courierVehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Arrivée estimée :</span>
                <strong className="text-purple-900">{activeTrackingOrder.eta}</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-purple-200/60">
                <span className="text-purple-800 font-bold">Code OTP de sécurité :</span>
                <strong className="font-mono text-purple-950 font-black text-sm">{activeTrackingOrder.otpCode}</strong>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                Journal de suivi
              </span>
              <div className="space-y-2 border-l-2 border-purple-300 ml-2 pl-3">
                <div>
                  <span className="font-bold text-gray-900 block">Paiement validé par {activeTrackingOrder.paymentMethod}</span>
                  <span className="text-[11px] text-gray-400">{activeTrackingOrder.date}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900 block">Colis préparé et scellé par le vendeur</span>
                  <span className="text-[11px] text-gray-400">Prêt en boutique</span>
                </div>
                <div>
                  <span className="font-bold text-purple-700 block">Pris en charge par {activeTrackingOrder.courierName}</span>
                  <span className="text-[11px] text-gray-500">En route vers {activeTrackingOrder.deliveryAddress}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              {activeTrackingOrder.courierPhone && (
                <a
                  href={`tel:${activeTrackingOrder.courierPhone.replace(/\s+/g, '')}`}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-600" />
                  <span>Appeler le livreur</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => setIsTrackingModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
