import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Wallet,
  Bell,
  User,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  Store,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Settings,
  Eye,
  X,
  CreditCard,
  Building2,
  Smartphone,
  Check,
  Percent,
  SlidersHorizontal,
  FileText,
  Mail,
  Phone,
  MapPin,
  Globe,
  ShoppingBag,
  Star,
  RotateCw,
  ArrowUpToLine,
  TrendingUp,
  ArrowUp,
  Upload,
  Printer,
  MessageCircle,
  Download,
  AlertCircle,
  Navigation,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { WEST_AFRICAN_COUNTRIES, type Country } from '../data/countries';
import { MerchantSimulator } from './MerchantSimulator';

export interface SellerProduct {
  id: number;
  title: string;
  category: string;
  priceEur: number;
  stock: number;
  image: string;
  status: 'active' | 'draft' | 'out_of_stock';
  salesCount: number;
  badge?: string;
}

export interface SellerOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  city: string;
  neighborhood: string;
  items: { title: string; quantity: number; priceEur: number }[];
  totalEur: number;
  paymentMethod: 'delivery' | 'mobile_money' | 'card';
  paymentOperator?: string;
  date: string;
  status: 'to_ship' | 'shipping' | 'delivered' | 'cancelled';
}

export interface PayoutTransaction {
  id: string;
  date: string;
  amountEur: number;
  amountLocal: number;
  method: string;
  recipient: string;
  status: 'completed' | 'processing';
}

interface SellerDashboardProps {
  storeName?: string;
  onBackToShopping?: () => void;
  onLogout?: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, desc?: string) => void;
  initialCountry?: Country;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  storeName = 'AVG',
  onBackToShopping,
  onLogout,
  onToast,
  initialCountry = WEST_AFRICAN_COUNTRIES[1], // Côte d'Ivoire
}) => {
  // Navigation active tab matching the capture:
  // 'dashboard' | 'products' | 'orders' | 'deliveries' | 'wallet' | 'notifications' | 'profile'
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'orders' | 'deliveries' | 'wallet' | 'notifications' | 'profile'
  >('dashboard');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentCountry, setCurrentCountry] = useState<Country>(initialCountry);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  // Store information
  const [storeInfo, setStoreInfo] = useState({
    name: storeName || 'AVG',
    slug: (storeName || 'AVG').toLowerCase().replace(/\s+/g, '-'),
    status: 'Active',
    rating: 0.0,
    reviewCount: 0,
    phone: '+225 07 48 92 10',
    description: 'Boutique certifiée sur la marketplace iit_store',
  });

  // Profile sub-tabs: 'general' | 'legal' | 'contact' | 'hours'
  const [profileTab, setProfileTab] = useState<'general' | 'legal' | 'contact' | 'hours'>('contact');

  // Contact info matching the screenshot
  const [contactInfo, setContactInfo] = useState({
    email: 'contact@maboutique.ci',
    phone: '+2250768359282',
    address: 'Rue F28',
    city: 'Abidjan',
    country: "Côte d'Ivoire",
  });

  // General info
  const [generalInfo, setGeneralInfo] = useState({
    name: storeName || 'AVG',
    description: 'Boutique certifiée sur la marketplace iit_store',
    category: 'Mode & Vêtements',
    slogan: 'Vente d’articles de qualité supérieure et créations locales',
    bio: 'Artisanat, prêt-à-porter authentique et accessoires confectionnés avec passion.',
  });

  // Legal info
  const [legalInfo, setLegalInfo] = useState({
    businessType: 'Entreprise Individuelle',
    rccm: 'CI-ABJ-2026-B-14890',
    taxNumber: 'CC-9481028-A',
    isApproved: true,
  });

  // Hours info
  const [hoursInfo, setHoursInfo] = useState({
    workingDays: 'Du Lundi au Samedi',
    workingHours: '08:30 - 18:30',
    preparationTime: '24h',
  });

  // Metrics for Dashboard
  const [metrics, setMetrics] = useState({
    todayOrders: 0,
    pendingOrders: 0,
    todayRevenueFcfa: 0,
    monthRevenueFcfa: 0,
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Bienvenue sur votre espace marchand !',
      description: 'Votre boutique iit_store est active et prête à recevoir des commandes.',
      time: 'Il y a 5 min',
      read: false,
    },
  ]);

  // Products (vide par défaut pour correspondre exactement à la capture)
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [productStatusFilter, setProductStatusFilter] = useState<'all' | 'active' | 'draft' | 'out_of_stock'>('all');

  // Orders State & Filters
  const [orders, setOrders] = useState<SellerOrder[]>([
    {
      id: 'CMD-84920',
      customerName: 'Awa Koné',
      customerPhone: '+225 05 12 34 56',
      city: 'Abidjan',
      neighborhood: 'Cocody Riviera 3',
      items: [
        { title: 'Robe Brodée Wax Woodin Prestige', quantity: 1, priceEur: 49.9 },
        { title: 'Pochette Cuir Bogolan', quantity: 1, priceEur: 18.0 },
      ],
      totalEur: 67.9,
      paymentMethod: 'mobile_money',
      paymentOperator: 'Wave Mobile Money',
      date: "Aujourd'hui à 11:42",
      status: 'to_ship',
    },
    {
      id: 'CMD-84915',
      customerName: 'Moussa Traoré',
      customerPhone: '+225 07 89 45 12',
      city: 'Abidjan',
      neighborhood: 'Plateau Dokui',
      items: [{ title: 'Chemise Col Mao Wax Royal', quantity: 2, priceEur: 35.0 }],
      totalEur: 70.0,
      paymentMethod: 'mobile_money',
      paymentOperator: 'Orange Money',
      date: 'Hier à 16:15',
      status: 'shipping',
    },
    {
      id: 'CMD-84902',
      customerName: 'Fatou Diallo',
      customerPhone: '+225 01 22 33 44',
      city: 'Bouaké',
      neighborhood: 'Quartier Commerce',
      items: [{ title: 'Sandales Cuir Touareg Fait-Main', quantity: 1, priceEur: 42.0 }],
      totalEur: 42.0,
      paymentMethod: 'delivery',
      paymentOperator: 'Paiement à la livraison',
      date: '27 Sept à 14:05',
      status: 'delivered',
    },
  ]);

  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'to_ship' | 'shipping' | 'delivered' | 'cancelled'>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderPaymentFilter, setOrderPaymentFilter] = useState<string>('all');
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<SellerOrder | null>(null);
  const [isRefreshingOrders, setIsRefreshingOrders] = useState(false);

  // Delivery State & Shipments
  const [deliverySubTab, setDeliverySubTab] = useState<'active' | 'history' | 'hubs' | 'rates'>('active');
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [pickupSlot, setPickupSlot] = useState<'morning' | 'afternoon'>('afternoon');
  const [pickupPackageCount, setPickupPackageCount] = useState('2');
  const [pickupNotes, setPickupNotes] = useState('');
  const [isRefreshingDeliveries, setIsRefreshingDeliveries] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any | null>(null);

  const [shipments, setShipments] = useState([
    {
      id: 'TRK-CI-84915',
      orderId: 'CMD-84915',
      recipientName: 'Moussa Traoré',
      recipientPhone: '+225 07 89 45 12',
      destination: 'Plateau Dokui, Abidjan',
      courierName: 'Amara Bamba',
      courierPhone: '+225 07 22 44 88',
      courierVehicle: 'Moto Express #14',
      status: 'in_transit', // 'pickup_scheduled' | 'in_transit' | 'delivered'
      currentStep: 3, // 1: Préparé, 2: Collecté, 3: En livraison, 4: Livré
      stepText: 'En cours d’acheminement vers le domicile client',
      eta: 'Aujourd’hui avant 16:30',
      itemsSummary: '2x Chemise Col Mao Wax Royal',
      packageCount: 1,
      costFcfa: 1500,
    },
    {
      id: 'TRK-CI-84920',
      orderId: 'CMD-84920',
      recipientName: 'Awa Koné',
      recipientPhone: '+225 05 12 34 56',
      destination: 'Cocody Riviera 3, Abidjan',
      courierName: 'Kader Ouattara',
      courierPhone: '+225 01 44 77 99',
      courierVehicle: 'Fourgon Relais Express #04',
      status: 'pickup_scheduled',
      currentStep: 1,
      stepText: 'Colis étiqueté et prêt au comptoir vendeur',
      eta: 'Collecte prévue à 14:30',
      itemsSummary: '1x Robe Brodée Wax Woodin + 1x Pochette Bogolan',
      packageCount: 1,
      costFcfa: 1500,
    },
    {
      id: 'TRK-CI-84902',
      orderId: 'CMD-84902',
      recipientName: 'Fatou Diallo',
      recipientPhone: '+225 01 22 33 44',
      destination: 'Quartier Commerce, Bouaké',
      courierName: 'Ligne Interurbaine Nord #02',
      courierPhone: '+225 05 88 11 00',
      courierVehicle: 'Car Sécurisé Relais #08',
      status: 'delivered',
      currentStep: 4,
      stepText: 'Colis remis en main propre - Code OTP validé',
      eta: 'Livré le 27/09/2026 à 15:20',
      itemsSummary: '1x Sandales Cuir Touareg Fait-Main',
      packageCount: 1,
      costFcfa: 3000,
    },
  ]);

  // Wallet (Exactement conforme à la capture Mon Portefeuille)
  const [availableBalanceFcfa, setAvailableBalanceFcfa] = useState(0);
  const [pendingBalanceFcfa, setPendingBalanceFcfa] = useState(0);
  const [totalEarnedFcfa, setTotalEarnedFcfa] = useState(0);
  const [totalWithdrawnFcfa, setTotalWithdrawnFcfa] = useState(0);
  const [walletSubTab, setWalletSubTab] = useState<'transactions' | 'payouts' | 'numbers'>('transactions');
  const [isRefreshingWallet, setIsRefreshingWallet] = useState(false);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('25000');
  const [rechargeMethod, setRechargeMethod] = useState<'WAVE' | 'ORANGE' | 'MTN' | 'CARD'>('WAVE');
  const [savedPhoneNumbers, setSavedPhoneNumbers] = useState([
    { id: 1, operator: 'Wave', number: '+225 07 48 92 10', isDefault: true },
    { id: 2, operator: 'Orange Money', number: '+225 07 68 35 92', isDefault: false },
  ]);

  const [payouts, setPayouts] = useState<PayoutTransaction[]>([]);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('50000');
  const [payoutMethod, setPayoutMethod] = useState<'WAVE' | 'MTN' | 'ORANGE' | 'MOOV' | 'BANK'>('WAVE');
  const [payoutRecipient, setPayoutRecipient] = useState('+225 07 48 92 10');

  // New Product Modal
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Mode & Vêtements');
  const [newPriceEur, setNewPriceEur] = useState('35');
  const [newStock, setNewStock] = useState('10');
  const [newImage, setNewImage] = useState('');

  // Searches and filters
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  const toLocal = (eurAmount: number) => {
    const val = Math.round(eurAmount * currentCountry.rateToEur);
    return `${val.toLocaleString('fr-FR')} ${currentCountry.symbol}`;
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPriceEur) {
      onToast('error', 'Champs requis', 'Veuillez saisir au moins le titre et le prix.');
      return;
    }

    const price = parseFloat(newPriceEur) || 20;
    const newProd: SellerProduct = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      priceEur: price,
      stock: parseInt(newStock, 10) || 5,
      image:
        newImage.trim() ||
        'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
      status: 'active',
      salesCount: 0,
    };

    setProducts([newProd, ...products]);
    setIsAddProductOpen(false);
    setNewTitle('');
    setNewPriceEur('35');
    setNewStock('10');
    setNewImage('');
    onToast('success', 'Produit publié !', `"${newProd.title}" est maintenant disponible à la vente.`);
  };

  const handlePayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(payoutAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      onToast('error', 'Montant invalide', 'Veuillez saisir un montant de retrait supérieur à 0.');
      return;
    }
    if (amountNum > availableBalanceFcfa) {
      onToast(
        'error',
        'Solde insuffisant',
        `Votre solde disponible est de ${availableBalanceFcfa.toLocaleString('fr-FR')} FCFA.`
      );
      return;
    }

    setAvailableBalanceFcfa((prev) => Math.max(0, prev - amountNum));
    const newTransaction: PayoutTransaction = {
      id: `RET-${Math.floor(1000 + Math.random() * 9000)}`,
      date: "Aujourd'hui",
      amountEur: amountNum / currentCountry.rateToEur,
      amountLocal: amountNum,
      method: payoutMethod === 'BANK' ? 'Virement Bancaire' : `${payoutMethod} Mobile Money`,
      recipient: payoutRecipient,
      status: 'completed',
    };

    setPayouts([newTransaction, ...payouts]);
    setIsPayoutModalOpen(false);
    onToast(
      'success',
      'Retrait validé !',
      `Votre virement de ${amountNum.toLocaleString('fr-FR')} FCFA a été envoyé sur ${payoutRecipient}.`
    );
  };

  const userInitials = (storeInfo.name || 'AVG')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1E2E29] flex font-sans antialiased selection:bg-[#00674F] selection:text-white">
      {/* 1. SIDEBAR GAUCHE (REPRODUISANT EXACTEMENT LA CAPTURE) */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
        } lg:translate-x-0 transition-all duration-300 ease-in-out bg-white border-r border-gray-100 flex flex-col justify-between shrink-0 fixed lg:static top-0 bottom-0 z-50 overflow-y-auto overflow-x-hidden`}
      >
        {/* Haut de la sidebar */}
        <div className="p-5">
          {/* Logo & Branding - Le logo reste iit_store ("ne change pas le logo") avec sous-titre Espace Marchand */}
          <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-[#00674F] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#00674F]/20">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <span className="font-black text-xl text-[#00674F] tracking-tight block leading-tight">
                iit_store
              </span>
              <span className="text-[11px] text-gray-500 font-medium block">
                Espace Marchand
              </span>
            </div>
          </div>

          {/* Section Menu Principal */}
          <div className="mt-6">
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Menu Principal
            </div>

            <nav className="space-y-1">
              {/* 1. Tableau de bord */}
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-gray-100 text-gray-900 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Tableau de bord</span>
              </button>

              {/* 2. Produits */}
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-gray-100 text-gray-900 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Package className="w-4 h-4 shrink-0" />
                <span>Produits</span>
              </button>

              {/* 3. Commandes */}
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-gray-100 text-gray-900 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <ShoppingCart className="w-4 h-4 shrink-0" />
                <span>Commandes</span>
              </button>

              {/* 4. Livraisons */}
              <button
                type="button"
                onClick={() => setActiveTab('deliveries')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'deliveries'
                    ? 'bg-gray-100 text-gray-900 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Truck className="w-4 h-4 shrink-0" />
                <span>Livraisons</span>
              </button>

              {/* 5. Portefeuille */}
              <button
                type="button"
                onClick={() => setActiveTab('wallet')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'wallet'
                    ? 'bg-gray-100 text-gray-900 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Wallet className="w-4 h-4 shrink-0" />
                <span>Portefeuille</span>
              </button>

              {/* 6. Notifications */}
              <button
                type="button"
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'bg-gray-100 text-gray-900 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 shrink-0" />
                  <span>Notifications</span>
                </div>
                {unreadNotificationsCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white text-[10px] font-black flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* 7. Profil */}
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-gray-100 text-gray-900 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <User className="w-4 h-4 shrink-0" />
                <span>Profil</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Bas de la sidebar : Utilisateur & Déconnexion (Comme sur la capture) */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          {/* Avatar & Nom */}
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0">
              {userInitials}
            </div>
            <div className="min-w-0">
              <span className="text-sm font-bold text-gray-900 truncate block">
                {storeInfo.name}
              </span>
              <span className="text-[10px] text-gray-400 block font-medium">
                Vendeur Certifié
              </span>
            </div>
          </div>

          {/* Bouton Déconnexion */}
          <button
            type="button"
            onClick={onLogout || onBackToShopping}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Backdrop sombre mobile quand la sidebar est ouverte */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* 2. ZONE PRINCIPALE DE CONTENU */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
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
            {/* Lien rapide vers la vitrine publique */}
            {onBackToShopping && (
              <button
                type="button"
                onClick={onBackToShopping}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-all cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-gray-500" />
                <span className="hidden sm:inline">Voir la vitrine</span>
              </button>
            )}
          </div>
        </header>

        {/* CONTENU DE LA PAGE : Selon l'onglet actif */}
        <main className="p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-8">
          {/* ======================================================== */}
          {/* ONGLET 1 : TABLEAU DE BORD (EXACTEMENT COMME LA CAPTURE) */}
          {/* ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Titre & Message de Bienvenue */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Tableau de bord
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Bienvenue {storeInfo.name} ! Voici un aperçu de votre activité.
                </p>
              </div>

              {/* Ligne des 4 Cartes Métriques (Exactement comme la capture fournie) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* 1. COMMANDES DU JOUR (Bordure violette) */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-2xs relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#8B5CF6]" />
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                      COMMANDES DU JOUR
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#8B5CF6] mt-2 tracking-tight">
                      {metrics.todayOrders}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-4">
                    Nouvelles commandes aujourd'hui
                  </div>
                </div>

                {/* 2. EN ATTENTE (Bordure orange / ambre) */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-2xs relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F59E0B]" />
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                      EN ATTENTE
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#F59E0B] mt-2 tracking-tight">
                      {metrics.pendingOrders}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-4">
                    Commandes à traiter
                  </div>
                </div>

                {/* 3. REVENUS DU JOUR (Bordure verte / émeraude) */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-2xs relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#10B981]" />
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                      REVENUS DU JOUR
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#059669] mt-2 tracking-tight">
                      {metrics.todayRevenueFcfa} FCFA
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-4">
                    Chiffre d'affaires aujourd'hui
                  </div>
                </div>

                {/* 4. REVENUS DU MOIS (Bordure verte / émeraude) */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-2xs relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#10B981]" />
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                      REVENUS DU MOIS
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#059669] mt-2 tracking-tight">
                      {metrics.monthRevenueFcfa} FCFA
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-4">
                    Chiffre d'affaires ce mois
                  </div>
                </div>
              </div>

              {/* Ligne des 3 Cartes Résumées (Exactement comme la capture) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* 1. Produits */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Produits
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Vue d'ensemble de votre catalogue
                    </p>
                  </div>

                  <div className="pt-8 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      Total produits
                    </span>
                    <span className="text-base font-bold text-gray-900">
                      {products.length}
                    </span>
                  </div>
                </div>

                {/* 2. Réputation */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Réputation
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Votre note et avis clients
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        Note moyenne
                      </span>
                      <span className="text-base font-bold text-gray-900">
                        {storeInfo.rating.toFixed(1)} / 5
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        Nombre d'avis
                      </span>
                      <span className="text-base font-bold text-gray-900">
                        {storeInfo.reviewCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Boutique */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Boutique
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Informations générales
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        Statut
                      </span>
                      <span className="text-xs font-bold text-[#16a34a] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                        {storeInfo.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        Slug
                      </span>
                      <span className="text-xs font-mono font-bold text-gray-800">
                        {storeInfo.slug}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ONGLET 2 : MES PRODUITS (EXACTEMENT SELON LA CAPTURE 2) */}
          {/* ======================================================== */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* En-tête : Titre & Boutons Importer / Nouveau Produit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Mes Produits
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Gérez votre catalogue de produits
                  </p>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  {/* Bouton Importer CSV/Excel */}
                  <button
                    type="button"
                    onClick={() => {
                      onToast('info', 'Import de catalogue', 'Format CSV et Excel (.xlsx) supporté. Modèle disponible.');
                    }}
                    className="flex-1 sm:flex-none px-3.5 sm:px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-gray-600" />
                    <span>Importer (CSV/Excel)</span>
                  </button>

                  {/* Bouton Nouveau Produit (Violet comme sur la capture) */}
                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(true)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#582be8] hover:bg-[#4b23cf] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-98"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Nouveau Produit</span>
                  </button>
                </div>
              </div>

              {/* Barre de Recherche et Filtre Statut (Exactement comme la capture) */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                {/* Champ de recherche */}
                <div className="relative w-full flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 shadow-2xs"
                  />
                </div>

                {/* Dropdown Tous les statuts */}
                <select
                  value={productStatusFilter}
                  onChange={(e) => setProductStatusFilter(e.target.value as any)}
                  className="w-full sm:w-52 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium shadow-2xs"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">En ligne</option>
                  <option value="draft">Brouillon</option>
                  <option value="out_of_stock">Rupture de stock</option>
                </select>
              </div>

              {/* Contenu / État Vide (Exactement identique à la capture 2) */}
              {products.length === 0 ||
              products.filter(
                (p) =>
                  (productStatusFilter === 'all' || p.status === productStatusFilter) &&
                  (p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
                    p.category.toLowerCase().includes(productSearch.toLowerCase()))
              ).length === 0 ? (
                <div className="py-24 sm:py-28 flex flex-col items-center justify-center text-center">
                  <p className="text-sm font-medium text-gray-500 mb-4">
                    Aucun produit trouvé
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-[#582be8] hover:bg-[#4b23cf] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-98"
                  >
                    Créer mon premier produit
                  </button>
                </div>
              ) : (
                /* Tableau si des produits sont ajoutés */
                <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50/70 border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Article</th>
                        <th className="py-3.5 px-4">Catégorie</th>
                        <th className="py-3.5 px-4">Prix</th>
                        <th className="py-3.5 px-4">Stock</th>
                        <th className="py-3.5 px-4">Statut</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {products
                        .filter(
                          (p) =>
                            (productStatusFilter === 'all' || p.status === productStatusFilter) &&
                            (p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
                              p.category.toLowerCase().includes(productSearch.toLowerCase()))
                        )
                        .map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="py-3.5 px-4 flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.title}
                                className="w-10 h-10 rounded-xl object-cover border border-gray-100 shrink-0"
                              />
                              <div>
                                <span className="font-bold text-gray-900 block">{product.title}</span>
                                <span className="text-[10px] text-gray-400 font-mono">ID: #{product.id}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-gray-600">{product.category}</td>
                            <td className="py-3.5 px-4 font-black text-gray-900">{toLocal(product.priceEur)}</td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                                  product.stock > 5
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-amber-50 text-amber-700'
                                }`}
                              >
                                {product.stock} en stock
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                En ligne
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => {
                                  setProducts(products.filter((p) => p.id !== product.id));
                                  onToast('info', 'Produit retiré', `"${product.title}" a été supprimé.`);
                                }}
                                className="text-red-600 hover:text-red-700 font-bold text-[11px] cursor-pointer"
                              >
                                Supprimer
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* ONGLET 3 : MES COMMANDES (DESIGN ENRICHI & ULTRA PROFESSIONNEL) */}
          {/* ======================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* En-tête : Titre & Boutons d'action */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 shrink-0">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                      Mes Commandes
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      Gérez, préparez et expédiez les commandes de vos clients
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                  {/* Bouton Actualiser */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRefreshingOrders(true);
                      setTimeout(() => {
                        setIsRefreshingOrders(false);
                        onToast('info', 'Commandes synchronisées', 'Le statut des commandes a été mis à jour.');
                      }, 400);
                    }}
                    className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-98"
                  >
                    <RotateCw className={`w-3.5 h-3.5 text-gray-500 ${isRefreshingOrders ? 'animate-spin' : ''}`} />
                    <span>Actualiser</span>
                  </button>

                  {/* Bouton Exporter */}
                  <button
                    type="button"
                    onClick={() => {
                      onToast('info', 'Exportation des commandes', 'Le fichier CSV des commandes a été généré.');
                    }}
                    className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-98"
                  >
                    <Upload className="w-3.5 h-3.5 text-gray-600" />
                    <span>Exporter (CSV)</span>
                  </button>

                  {/* Bouton Commande Test */}
                  <button
                    type="button"
                    onClick={() => {
                      const newId = `CMD-${Math.floor(10000 + Math.random() * 90000)}`;
                      const newOrder: SellerOrder = {
                        id: newId,
                        customerName: 'Kouamé N’Guessan',
                        customerPhone: '+225 07 11 22 33',
                        city: 'Abidjan',
                        neighborhood: 'Marcory Zone 4',
                        items: [{ title: 'Pochette Cuir Bogolan Fait-Main', quantity: 1, priceEur: 25.0 }],
                        totalEur: 25.0,
                        paymentMethod: 'mobile_money',
                        paymentOperator: 'Wave Mobile Money',
                        date: "À l'instant",
                        status: 'to_ship',
                      };
                      setOrders([newOrder, ...orders]);
                      onToast('success', 'Nouvelle commande test reçue !', `Commande ${newId} ajoutée pour Kouamé N’Guessan.`);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#582be8] hover:bg-[#4b23cf] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-98"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Simuler commande</span>
                  </button>
                </div>
              </div>

              {/* Les 4 Cartes Métriques Commandes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* 1. Total Commandes */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Total Commandes</span>
                    <ShoppingCart className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 my-2 tracking-tight">
                    {orders.length}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    Depuis la création
                  </div>
                </div>

                {/* 2. À expédier */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">À expédier</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#D97706] my-2 tracking-tight">
                    {orders.filter((o) => o.status === 'to_ship').length}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    À préparer & remettre
                  </div>
                </div>

                {/* 3. En livraison */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">En livraison</span>
                    <Truck className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#8B5CF6] my-2 tracking-tight">
                    {orders.filter((o) => o.status === 'shipping').length}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    En cours de transit
                  </div>
                </div>

                {/* 4. Livrées */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Livrées & Payées</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#059669] my-2 tracking-tight">
                    {orders.filter((o) => o.status === 'delivered').length}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    Revenus sécurisés
                  </div>
                </div>
              </div>

              {/* Barre d'Onglets Capsules de Statut */}
              <div className="bg-gray-100/90 p-1 rounded-xl flex items-center justify-start gap-1 overflow-x-auto scrollbar-none">
                {[
                  { id: 'all', label: 'Toutes', count: orders.length },
                  { id: 'to_ship', label: 'À expédier', count: orders.filter((o) => o.status === 'to_ship').length },
                  { id: 'shipping', label: 'En livraison', count: orders.filter((o) => o.status === 'shipping').length },
                  { id: 'delivered', label: 'Livrées', count: orders.filter((o) => o.status === 'delivered').length },
                ].map((tab) => {
                  const isActive = orderStatusFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setOrderStatusFilter(tab.id as any)}
                      className={`py-2 px-4 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-white text-gray-900 shadow-2xs'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                          isActive ? 'bg-gray-100 text-gray-800' : 'bg-gray-200/80 text-gray-600'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Barre de Recherche et Filtre Moyen de Paiement */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par n° commande, nom client, téléphone, quartier..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 shadow-2xs"
                  />
                </div>

                <select
                  value={orderPaymentFilter}
                  onChange={(e) => setOrderPaymentFilter(e.target.value)}
                  className="w-full sm:w-56 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium shadow-2xs"
                >
                  <option value="all">Tous les paiements</option>
                  <option value="Wave">Wave Mobile Money</option>
                  <option value="Orange">Orange Money</option>
                  <option value="MTN">MTN MoMo</option>
                  <option value="livraison">Paiement à la livraison</option>
                </select>
              </div>

              {/* LISTE DES COMMANDES */}
              {(() => {
                const filtered = orders.filter((ord) => {
                  const matchStatus = orderStatusFilter === 'all' || ord.status === orderStatusFilter;
                  const matchSearch =
                    ord.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                    ord.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                    ord.customerPhone.includes(orderSearchQuery) ||
                    ord.city.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                    ord.neighborhood.toLowerCase().includes(orderSearchQuery.toLowerCase());
                  const matchPayment =
                    orderPaymentFilter === 'all' ||
                    (ord.paymentOperator && ord.paymentOperator.toLowerCase().includes(orderPaymentFilter.toLowerCase())) ||
                    (ord.paymentMethod && ord.paymentMethod.toLowerCase().includes(orderPaymentFilter.toLowerCase()));
                  return matchStatus && matchSearch && matchPayment;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-gray-100 shadow-2xs">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-3">
                        <ShoppingCart className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm">Aucune commande trouvée</h3>
                      <p className="text-xs text-gray-400 mt-1 max-w-sm">
                        {orderSearchQuery || orderStatusFilter !== 'all' || orderPaymentFilter !== 'all'
                          ? 'Modifiez vos critères de recherche pour afficher les commandes correspondantes.'
                          : 'Vos futures commandes clients apparaîtront ici dès leur validation.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setOrderStatusFilter('all');
                          setOrderSearchQuery('');
                          setOrderPaymentFilter('all');
                        }}
                        className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-[#582be8] bg-[#582be8]/10 hover:bg-[#582be8]/20 transition-all cursor-pointer"
                      >
                        Réinitialiser les filtres
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {filtered.map((ord) => {
                      const isToShip = ord.status === 'to_ship';
                      const isShipping = ord.status === 'shipping';
                      const isDelivered = ord.status === 'delivered';

                      return (
                        <div
                          key={ord.id}
                          className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-2xs space-y-4 hover:border-gray-200 transition-all"
                        >
                          {/* Ligne 1 : N° de commande, Statut, Date, Paiement & Montant */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className="font-mono font-extrabold text-sm text-gray-900 bg-gray-100 px-2.5 py-1 rounded-lg">
                                {ord.id}
                              </span>

                              {/* Badge de statut */}
                              {isToShip && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                  <span>À expédier</span>
                                </span>
                              )}
                              {isShipping && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                                  <Truck className="w-3.5 h-3.5 text-purple-600" />
                                  <span>En livraison</span>
                                </span>
                              )}
                              {isDelivered && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Livrée & Clôturée</span>
                                </span>
                              )}

                              {/* Moyen de paiement */}
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                                <CreditCard className="w-3 h-3 text-gray-500" />
                                <span>{ord.paymentOperator || ord.paymentMethod}</span>
                              </span>

                              {/* Horodatage */}
                              <span className="text-xs text-gray-400 font-medium">
                                • {ord.date}
                              </span>
                            </div>

                            {/* Montant total en FCFA */}
                            <div className="text-right">
                              <span className="text-lg font-black text-gray-900">
                                {toLocal(ord.totalEur)}
                              </span>
                            </div>
                          </div>

                          {/* Ligne 2 : Informations Client & Destination */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1.5">
                              <span className="text-gray-400 uppercase text-[10px] font-bold tracking-wider block">
                                Destinataire
                              </span>
                              <div className="font-bold text-gray-900 text-sm">
                                {ord.customerName}
                              </div>
                              <div className="flex items-center gap-3 text-gray-600">
                                <a
                                  href={`tel:${ord.customerPhone.replace(/\s+/g, '')}`}
                                  className="inline-flex items-center gap-1 hover:text-[#582be8] transition-colors"
                                >
                                  <Phone className="w-3.5 h-3.5 text-gray-500" />
                                  <span className="font-mono">{ord.customerPhone}</span>
                                </a>
                                <a
                                  href={`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <span className="text-gray-400 uppercase text-[10px] font-bold tracking-wider block">
                                Adresse de livraison
                              </span>
                              <div className="flex items-start gap-1.5 text-gray-700 font-medium">
                                <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                                <span>
                                  {ord.neighborhood}, {ord.city} (Côte d'Ivoire)
                                </span>
                              </div>
                              <span className="text-[11px] text-gray-400 block">
                                Transporteur partenaire : iit_store Relais Express
                              </span>
                            </div>
                          </div>

                          {/* Ligne 3 : Articles commandés */}
                          <div className="p-3 bg-gray-50/80 rounded-xl space-y-1.5">
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                              Articles commandés ({ord.items.length})
                            </span>
                            <div className="divide-y divide-gray-100">
                              {ord.items.map((item, idx) => (
                                <div key={idx} className="py-1 flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-md bg-white border border-gray-200 text-gray-700 font-bold text-[10px] flex items-center justify-center">
                                      {item.quantity}x
                                    </span>
                                    <span className="font-semibold text-gray-800">{item.title}</span>
                                  </div>
                                  <span className="font-bold text-gray-700">
                                    {toLocal(item.priceEur * item.quantity)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Ligne 4 : Barre d'actions & statuts */}
                          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              {/* Bouton Bordereau de livraison / Détails */}
                              <button
                                type="button"
                                onClick={() => setSelectedOrderDetail(ord)}
                                className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              >
                                <FileText className="w-3.5 h-3.5 text-gray-500" />
                                <span>Bordereau & Facture</span>
                              </button>

                              {/* Contacter Client */}
                              <a
                                href={`tel:${ord.customerPhone.replace(/\s+/g, '')}`}
                                className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              >
                                <Phone className="w-3.5 h-3.5 text-gray-500" />
                                <span>Appeler</span>
                              </a>
                            </div>

                            {/* Boutons d'avancement de statut */}
                            <div className="flex items-center gap-2">
                              {isToShip && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOrders(
                                      orders.map((o) =>
                                        o.id === ord.id ? { ...o, status: 'shipping' } : o
                                      )
                                    );
                                    onToast(
                                      'success',
                                      'Colis remis au transporteur',
                                      `La commande ${ord.id} est maintenant en cours d'acheminement.`
                                    );
                                  }}
                                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#582be8] hover:bg-[#4b23cf] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98"
                                >
                                  <Truck className="w-3.5 h-3.5" />
                                  <span>Expédier le colis</span>
                                </button>
                              )}

                              {isShipping && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const amountFcfa = Math.round(ord.totalEur * currentCountry.rateToEur);
                                    setOrders(
                                      orders.map((o) =>
                                        o.id === ord.id ? { ...o, status: 'delivered' } : o
                                      )
                                    );
                                    setAvailableBalanceFcfa((prev) => prev + amountFcfa);
                                    setTotalEarnedFcfa((prev) => prev + amountFcfa);
                                    onToast(
                                      'success',
                                      'Livraison confirmée !',
                                      `Fonds de ${amountFcfa.toLocaleString('fr-FR')} FCFA crédités sur votre portefeuille.`
                                    );
                                  }}
                                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Confirmer la livraison client</span>
                                </button>
                              )}

                              {isDelivered && (
                                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 py-1">
                                  <Check className="w-4 h-4 stroke-[3]" />
                                  <span>Commande clôturée avec succès</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* MODALE : BORDEREAU DE LIVRAISON & FACTURE CLIENT */}
              {selectedOrderDetail && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto space-y-6">
                    {/* En-tête bordereau */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <Store className="w-4 h-4 text-[#00674F]" />
                          <span className="font-black text-sm text-[#00674F]">iit_store Express</span>
                        </div>
                        <h3 className="font-extrabold text-base text-gray-900 mt-0.5">
                          Bordereau de Livraison & Facture
                        </h3>
                        <span className="font-mono text-xs text-gray-400">{selectedOrderDetail.id}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedOrderDetail(null)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Expéditeur & Destinataire */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold uppercase text-gray-400 block">Expéditeur</span>
                        <div className="font-bold text-gray-900">{generalInfo.name || storeInfo.name}</div>
                        <div className="text-gray-600">{contactInfo.address}, {contactInfo.city}</div>
                        <div className="text-gray-600 font-mono">{contactInfo.phone}</div>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold uppercase text-gray-400 block">Client Destinataire</span>
                        <div className="font-bold text-gray-900">{selectedOrderDetail.customerName}</div>
                        <div className="text-gray-600">{selectedOrderDetail.neighborhood}, {selectedOrderDetail.city}</div>
                        <div className="text-gray-600 font-mono">{selectedOrderDetail.customerPhone}</div>
                      </div>
                    </div>

                    {/* Tableau des articles */}
                    <div className="border border-gray-100 rounded-xl overflow-hidden text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold">
                          <tr>
                            <th className="p-3">Désignation</th>
                            <th className="p-3 text-center">Qté</th>
                            <th className="p-3 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                          {selectedOrderDetail.items.map((i, idx) => (
                            <tr key={idx}>
                              <td className="p-3 font-semibold text-gray-800">{i.title}</td>
                              <td className="p-3 text-center font-bold text-gray-600">{i.quantity}</td>
                              <td className="p-3 text-right font-black text-gray-900">
                                {toLocal(i.priceEur * i.quantity)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Récapitulatif financier */}
                    <div className="p-4 bg-gray-50 rounded-2xl space-y-2 text-xs">
                      <div className="flex justify-between text-gray-600">
                        <span>Sous-total articles :</span>
                        <span className="font-semibold">{toLocal(selectedOrderDetail.totalEur)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Frais de livraison Relais :</span>
                        <span className="font-semibold text-emerald-600">Inclus (0 FCFA)</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Moyen de paiement :</span>
                        <span className="font-bold text-gray-900">
                          {selectedOrderDetail.paymentOperator || selectedOrderDetail.paymentMethod}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-extrabold text-gray-900">
                        <span>Total payé :</span>
                        <span className="text-[#059669]">{toLocal(selectedOrderDetail.totalEur)}</span>
                      </div>
                    </div>

                    {/* Signature du client */}
                    <div className="p-3 border border-dashed border-gray-200 rounded-xl text-center text-xs text-gray-400">
                      Signature du client à la réception du colis :
                      <div className="h-10" />
                    </div>

                    {/* Boutons d'action de la modale */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedOrderDetail(null)}
                        className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-xs text-gray-600 hover:bg-gray-50 cursor-pointer"
                      >
                        Fermer
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          window.print();
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-[#582be8] hover:bg-[#4b23cf] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Imprimer le bordereau</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* ONGLET 4 : SUIVI DES LIVRAISONS & LOGISTIQUE ENRICHI */}
          {/* ======================================================== */}
          {activeTab === 'deliveries' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* En-tête : Titre & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                      Suivi des Livraisons
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      Réseau iit_store Relais Express, coursiers partenaires et gestion des expéditions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  {/* Bouton Actualiser */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRefreshingDeliveries(true);
                      setTimeout(() => {
                        setIsRefreshingDeliveries(false);
                        onToast('info', 'Données actualisées', 'Les positions des coursiers et les statuts des colis sont à jour.');
                      }, 400);
                    }}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-98"
                  >
                    <RotateCw className={`w-3.5 h-3.5 text-gray-500 ${isRefreshingDeliveries ? 'animate-spin' : ''}`} />
                    <span>Actualiser</span>
                  </button>

                  {/* Bouton Demande de ramassage / collecte coursier */}
                  <button
                    type="button"
                    onClick={() => setIsPickupModalOpen(true)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#582be8] hover:bg-[#4b23cf] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-98"
                  >
                    <Package className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Demander un ramassage</span>
                  </button>
                </div>
              </div>

              {/* Les 4 Cartes Métriques Logistiques */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* 1. En transit */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">En acheminement</span>
                    <Truck className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#8B5CF6] my-2 tracking-tight">
                    {shipments.filter((s) => s.status === 'in_transit').length} colis
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    Délai estimé : 24h - 48h
                  </div>
                </div>

                {/* 2. Prêts au comptoir vendeur */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Prêts pour collecte</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#D97706] my-2 tracking-tight">
                    {shipments.filter((s) => s.status === 'pickup_scheduled').length} colis
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    Coursier attendu aujourd'hui
                  </div>
                </div>

                {/* 3. Livrées avec succès */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Livrées ce mois</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#059669] my-2 tracking-tight">
                    {12 + shipments.filter((s) => s.status === 'delivered').length} colis
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    100% de succès client
                  </div>
                </div>

                {/* 4. Réseau partenaire */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Transporteur assigné</span>
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-base sm:text-lg font-bold text-gray-900 my-2 tracking-tight">
                    iit_store Relais Express
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    Flotte 2 roues & fourgons certifiés
                  </div>
                </div>
              </div>

              {/* Onglets secondaires de navigation logistique */}
              <div className="bg-gray-100/90 p-1 rounded-xl flex items-center justify-start gap-1 overflow-x-auto scrollbar-none">
                {[
                  { id: 'active', label: 'Colis en cours', count: shipments.filter((s) => s.status !== 'delivered').length },
                  { id: 'history', label: 'Historique des livraisons', count: shipments.filter((s) => s.status === 'delivered').length },
                  { id: 'hubs', label: 'Points Relais & Hubs' },
                  { id: 'rates', label: 'Grille tarifaire & Délais' },
                ].map((tab) => {
                  const isActive = deliverySubTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setDeliverySubTab(tab.id as any)}
                      className={`py-2 px-4 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-white text-gray-900 shadow-2xs'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {typeof (tab as any).count === 'number' && (
                        <span
                          className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                            isActive ? 'bg-gray-100 text-gray-800' : 'bg-gray-200/80 text-gray-600'
                          }`}
                        >
                          {(tab as any).count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* CONTENU SOUS-ONGLET 1 : COLIS EN COURS */}
              {deliverySubTab === 'active' && (
                <div className="space-y-4">
                  {shipments.filter((s) => s.status !== 'delivered').length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-2xs">
                      <Truck className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                      <h4 className="font-bold text-gray-800 text-sm">Aucun colis en cours de livraison</h4>
                      <p className="text-xs text-gray-400 mt-1">
                        Dès que vous préparez une commande, demandez un coursier pour démarrer le suivi.
                      </p>
                    </div>
                  ) : (
                    shipments
                      .filter((s) => s.status !== 'delivered')
                      .map((shipment) => {
                        const isInTransit = shipment.status === 'in_transit';
                        const isScheduled = shipment.status === 'pickup_scheduled';

                        return (
                          <div
                            key={shipment.id}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs space-y-5"
                          >
                            {/* Ligne 1 : En-tête suivi */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                              <div className="flex items-center gap-2.5 flex-wrap">
                                <span className="font-mono font-extrabold text-sm text-gray-900 bg-gray-100 px-2.5 py-1 rounded-lg">
                                  {shipment.id}
                                </span>
                                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
                                  {shipment.orderId}
                                </span>
                                {isInTransit && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                    <span>En acheminement</span>
                                  </span>
                                )}
                                {isScheduled && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                    <Clock className="w-3 h-3 text-amber-600" />
                                    <span>Prêt au ramassage</span>
                                  </span>
                                )}
                              </div>

                              <div className="text-xs font-semibold text-gray-600 bg-gray-50 px-3 py-1 rounded-xl border border-gray-100">
                                Arrivée estimée : <strong className="text-gray-900">{shipment.eta}</strong>
                              </div>
                            </div>

                            {/* Ligne 2 : Traceur Visuel 4 Étapes */}
                            <div className="py-2">
                              <div className="relative flex items-center justify-between">
                                {/* Ligne de fond */}
                                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-gray-100 -z-0" />
                                <div
                                  className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-[#582be8] transition-all -z-0"
                                  style={{
                                    width:
                                      shipment.currentStep === 1
                                        ? '10%'
                                        : shipment.currentStep === 2
                                        ? '40%'
                                        : shipment.currentStep === 3
                                        ? '75%'
                                        : '100%',
                                  }}
                                />

                                {[
                                  { step: 1, label: 'Préparé', desc: 'En boutique' },
                                  { step: 2, label: 'Collecté', desc: 'Pris en charge' },
                                  { step: 3, label: 'En transit', desc: 'Dernier kilomètre' },
                                  { step: 4, label: 'Livré', desc: 'Code OTP validé' },
                                ].map((st) => {
                                  const isDone = shipment.currentStep >= st.step;
                                  const isCurrent = shipment.currentStep === st.step;
                                  return (
                                    <div key={st.step} className="flex flex-col items-center text-center z-10">
                                      <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                          isDone
                                            ? 'bg-[#582be8] text-white shadow-xs'
                                            : 'bg-white border-2 border-gray-200 text-gray-400'
                                        } ${isCurrent ? 'ring-4 ring-[#582be8]/20 scale-110' : ''}`}
                                      >
                                        {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : st.step}
                                      </div>
                                      <span className={`text-[11px] font-bold mt-2 ${isCurrent ? 'text-gray-900' : 'text-gray-600'}`}>
                                        {st.label}
                                      </span>
                                      <span className="text-[10px] text-gray-400 hidden sm:block">
                                        {st.desc}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Ligne 3 : Informations Coursier & Destinataire */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                              {/* Carte Coursier Assigné */}
                              <div className="p-3.5 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                                    Coursier iit_store Express
                                  </span>
                                  <span className="text-[10px] font-mono text-purple-700 font-semibold">
                                    {shipment.courierVehicle}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="font-bold text-gray-900 text-sm">
                                    {shipment.courierName}
                                  </div>
                                  <a
                                    href={`tel:${shipment.courierPhone.replace(/\s+/g, '')}`}
                                    className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 font-bold text-gray-700 flex items-center gap-1 shadow-2xs"
                                  >
                                    <Phone className="w-3 h-3 text-purple-600" />
                                    <span>Appeler</span>
                                  </a>
                                </div>
                                <p className="text-[11px] text-gray-500">
                                  Statut : <strong>{shipment.stepText}</strong>
                                </p>
                              </div>

                              {/* Carte Destinataire & Adresse */}
                              <div className="p-3.5 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                                    Client & Destination
                                  </span>
                                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                    {shipment.packageCount} colis
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="font-bold text-gray-900 text-sm">
                                    {shipment.recipientName}
                                  </div>
                                  <a
                                    href={`tel:${shipment.recipientPhone.replace(/\s+/g, '')}`}
                                    className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 font-bold text-gray-700 flex items-center gap-1 shadow-2xs"
                                  >
                                    <Phone className="w-3 h-3 text-gray-500" />
                                    <span>Client</span>
                                  </a>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-600">
                                  <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                                  <span>{shipment.destination}</span>
                                </div>
                              </div>
                            </div>

                            {/* Ligne 4 : Barre d'actions */}
                            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-gray-100">
                              <button
                                type="button"
                                onClick={() => setSelectedShipment(shipment)}
                                className="px-3.5 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                              >
                                <Navigation className="w-3.5 h-3.5 text-gray-500" />
                                <span>Voir le traceur complet</span>
                              </button>

                              <div className="flex items-center gap-2">
                                {isScheduled && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setShipments(
                                        shipments.map((s) =>
                                          s.id === shipment.id
                                            ? {
                                                ...s,
                                                status: 'in_transit',
                                                currentStep: 3,
                                                stepText: 'Colis remis au coursier - Acheminement en cours',
                                              }
                                            : s
                                        )
                                      );
                                      onToast(
                                        'success',
                                        'Colis remis au coursier',
                                        `Le coursier ${shipment.courierName} a pris en charge le colis ${shipment.id}.`
                                      );
                                    }}
                                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#582be8] hover:bg-[#4b23cf] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
                                  >
                                    <Truck className="w-3.5 h-3.5" />
                                    <span>Remettre le colis au coursier</span>
                                  </button>
                                )}

                                {isInTransit && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setShipments(
                                        shipments.map((s) =>
                                          s.id === shipment.id
                                            ? {
                                                ...s,
                                                status: 'delivered',
                                                currentStep: 4,
                                                stepText: 'Livré au domicile - Code OTP validé',
                                                eta: "Livré à l'instant",
                                              }
                                            : s
                                        )
                                      );
                                      onToast(
                                        'success',
                                        'Livraison confirmée !',
                                        `Le colis ${shipment.id} a été remis à ${shipment.recipientName}.`
                                      );
                                    }}
                                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Confirmer la livraison</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              )}

              {/* CONTENU SOUS-ONGLET 2 : HISTORIQUE DES LIVRAISONS */}
              {deliverySubTab === 'history' && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Historique des expéditions terminées
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Archive complète des colis réceptionnés avec accusé de réception
                    </p>
                  </div>

                  <div className="divide-y divide-gray-100 text-xs">
                    {shipments
                      .filter((s) => s.status === 'delivered')
                      .map((s) => (
                        <div key={s.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-gray-900">{s.id}</span>
                              <span className="font-mono text-gray-500">({s.orderId})</span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Livré avec succès
                              </span>
                            </div>
                            <div className="text-gray-600">
                              Destinataire : <strong>{s.recipientName}</strong> • {s.destination}
                            </div>
                            <div className="text-gray-400 text-[11px]">
                              Transporteur : {s.courierName} ({s.courierVehicle}) • {s.eta}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-black text-gray-900">{s.costFcfa.toLocaleString('fr-FR')} FCFA</span>
                            <button
                              type="button"
                              onClick={() => setSelectedShipment(s)}
                              className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-semibold text-gray-700 shadow-2xs cursor-pointer"
                            >
                              Preuve & Détails
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* CONTENU SOUS-ONGLET 3 : POINTS RELAIS & HUBS */}
              {deliverySubTab === 'hubs' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-2xs">
                    <h3 className="text-base font-bold text-gray-900">
                      Réseau de Points Relais Partenaires iit_store
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Déposez vos colis dans un hub de proximité ou laissez vos clients récupérer leurs commandes sans attendre.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      {[
                        {
                          name: 'Hub Cocody Angré',
                          address: 'Carrefour Duncan, Face Pharmacie des Grâces',
                          city: 'Abidjan',
                          phone: '+225 27 22 40 10',
                          hours: '08h00 - 19h30',
                          status: 'Ouvert',
                        },
                        {
                          name: 'Hub Marcory Zone 4',
                          address: 'Boulevard VGE, près de Prima Center',
                          city: 'Abidjan',
                          phone: '+225 27 21 35 80',
                          hours: '08h30 - 20h00',
                          status: 'Ouvert',
                        },
                        {
                          name: 'Hub Yopougon Siporex',
                          address: 'Carrefour Siporex, Immeuble le Relais',
                          city: 'Abidjan',
                          phone: '+225 27 23 45 90',
                          hours: '08h00 - 19h00',
                          status: 'Ouvert',
                        },
                        {
                          name: 'Hub Plateau Commerce',
                          address: 'Avenue Chardy, près Banque Centrale',
                          city: 'Abidjan',
                          phone: '+225 27 20 22 15',
                          hours: '08h00 - 18h30',
                          status: 'Ouvert',
                        },
                        {
                          name: 'Hub Bouaké Centre',
                          address: 'Quartier Commerce, Centre Commercial Koko',
                          city: 'Bouaké',
                          phone: '+225 27 31 63 40',
                          hours: '08h30 - 18h00',
                          status: 'Ouvert',
                        },
                        {
                          name: 'Hub Dakar Plateau',
                          address: 'Avenue Pompidou x Raffenel',
                          city: 'Dakar (Sénégal)',
                          phone: '+221 33 821 44 20',
                          hours: '09h00 - 19h00',
                          status: 'Hub International',
                        },
                      ].map((hub, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-900">{hub.name}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {hub.status}
                            </span>
                          </div>
                          <div className="text-gray-600 flex items-start gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                            <span>{hub.address}, {hub.city}</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-400 text-[11px] pt-1 border-t border-gray-200/60">
                            <span>🕒 {hub.hours}</span>
                            <span className="font-mono">{hub.phone}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CONTENU SOUS-ONGLET 4 : GRILLE TARIFAIRE & DÉLAIS */}
              {deliverySubTab === 'rates' && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Grille Tarifaire Officielle & Délais d'Acheminement
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Tarifs négociés pour les marchands vérifiés iit_store en Côte d'Ivoire et zone UEMOA.
                    </p>
                  </div>

                  <div className="border border-gray-100 rounded-2xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="p-3.5">Zone de livraison</th>
                          <th className="p-3.5">Délai indicatif</th>
                          <th className="p-3.5">Tarif standard marchand</th>
                          <th className="p-3.5">Assurance colis</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        <tr>
                          <td className="p-3.5 font-bold text-gray-900">
                            Abidjan Intra-Muros (Cocody, Marcory, Yopougon, Plateau...)
                          </td>
                          <td className="p-3.5 text-emerald-700 font-semibold">Le jour même ou 24h</td>
                          <td className="p-3.5 font-black text-gray-900">1 500 FCFA</td>
                          <td className="p-3.5 text-gray-500">Incluse jusqu'à 250 000 FCFA</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-bold text-gray-900">
                            Grand Abidjan (Bingerville, Grand-Bassam, Songon, Anyama)
                          </td>
                          <td className="p-3.5 text-gray-700 font-semibold">24h - 48h</td>
                          <td className="p-3.5 font-black text-gray-900">2 500 FCFA</td>
                          <td className="p-3.5 text-gray-500">Incluse jusqu'à 250 000 FCFA</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-bold text-gray-900">
                            Villes Intérieur CI (Bouaké, Yamoussoukro, San Pedro, Korhogo)
                          </td>
                          <td className="p-3.5 text-gray-700 font-semibold">48h - 72h</td>
                          <td className="p-3.5 font-black text-gray-900">3 000 FCFA</td>
                          <td className="p-3.5 text-gray-500">Incluse jusqu'à 500 000 FCFA</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-bold text-gray-900">
                            Sous-Région UEMOA (Dakar, Bamako, Ouaga, Cotonou, Lomé)
                          </td>
                          <td className="p-3.5 text-gray-700 font-semibold">3 à 5 jours ouvrés</td>
                          <td className="p-3.5 font-black text-gray-900">9 500 FCFA</td>
                          <td className="p-3.5 text-gray-500">Incluse avec suivi aérien</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 flex items-start gap-3 text-xs text-purple-900">
                    <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Garantie Protection Marchand iit_store Express :</strong> En cas de perte ou d'avarie lors du transport, votre marchandise est remboursée sous 48h sur présentation du bordereau.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* ONGLET 5 : MON PORTEFEUILLE (EXACTEMENT SELON LA CAPTURE 1) */}
          {/* ======================================================== */}
          {activeTab === 'wallet' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* En-tête : Titre & Bouton Actualiser */}
              <div className="flex items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 shrink-0">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                      Mon Portefeuille
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      Gérez vos revenus et vos retraits
                    </p>
                  </div>
                </div>

                {/* Bouton Actualiser */}
                <button
                  type="button"
                  onClick={() => {
                    setIsRefreshingWallet(true);
                    setTimeout(() => {
                      setIsRefreshingWallet(false);
                      onToast('info', 'Portefeuille actualisé', 'Vos soldes et relevés sont à jour.');
                    }, 500);
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-98"
                >
                  <RotateCw className={`w-3.5 h-3.5 text-gray-500 ${isRefreshingWallet ? 'animate-spin' : ''}`} />
                  <span>Actualiser</span>
                </button>
              </div>

              {/* Les 4 Cartes de Solde (Exactement conformes à la capture 1) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* 1. Solde disponible */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Solde disponible</span>
                    <Wallet className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#059669] my-2 tracking-tight">
                    {availableBalanceFcfa} FCFA
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    Prêt pour retrait
                  </div>
                </div>

                {/* 2. En attente */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">En attente</span>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#D97706] my-2 tracking-tight">
                    {pendingBalanceFcfa} FCFA
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    Retraits en cours
                  </div>
                </div>

                {/* 3. Total gagné */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Total gagné</span>
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 my-2 tracking-tight">
                    {totalEarnedFcfa} FCFA
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    Depuis le début
                  </div>
                </div>

                {/* 4. Total retiré */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Total retiré</span>
                    <ArrowUpToLine className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 my-2 tracking-tight">
                    {totalWithdrawnFcfa} FCFA
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    Depuis le début
                  </div>
                </div>
              </div>

              {/* Boutons d'Action : Retirer des fonds & Recharger */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer transition-all active:scale-98"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Retirer des fonds</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsRechargeModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold flex items-center gap-2 shadow-2xs cursor-pointer transition-all active:scale-98"
                >
                  <CreditCard className="w-3.5 h-3.5 text-gray-700" />
                  <span>Recharger</span>
                </button>
              </div>

              {/* Onglets : Transactions, Retraits, Numéros enregistrés */}
              <div className="bg-gray-100/90 p-1 rounded-xl inline-flex items-center gap-1">
                {[
                  { id: 'transactions', label: 'Transactions' },
                  { id: 'payouts', label: 'Retraits' },
                  { id: 'numbers', label: 'Numéros enregistrés' },
                ].map((tab) => {
                  const isActive = walletSubTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setWalletSubTab(tab.id as any)}
                      className={`py-1.5 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white text-gray-900 shadow-2xs'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Contenu de l'onglet Portefeuille (Exactement conforme à la capture 1) */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-2xs">
                {walletSubTab === 'transactions' && (
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Historique des transactions
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Vos dernières entrées et sorties de fonds
                    </p>

                    {payouts.length === 0 ? (
                      <div className="py-20 text-center text-xs text-gray-400 font-medium">
                        Aucune transaction pour le moment
                      </div>
                    ) : (
                      <div className="mt-6 divide-y divide-gray-100">
                        {payouts.map((tx) => (
                          <div key={tx.id} className="py-3 flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-gray-900">{tx.method}</span>
                              <span className="text-[11px] text-gray-400 block">{tx.date} • {tx.recipient}</span>
                            </div>
                            <span className="font-black text-gray-900">
                              -{tx.amountLocal.toLocaleString('fr-FR')} FCFA
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {walletSubTab === 'payouts' && (
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Historique des retraits
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Suivi de vos virements vers vos comptes Mobile Money ou bancaires
                    </p>

                    {payouts.length === 0 ? (
                      <div className="py-20 text-center text-xs text-gray-400 font-medium">
                        Aucun retrait pour le moment
                      </div>
                    ) : (
                      <div className="mt-6 divide-y divide-gray-100">
                        {payouts.map((p) => (
                          <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-gray-900">{p.id} • {p.method}</span>
                              <span className="text-[11px] text-gray-400 block">{p.date} vers {p.recipient}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Effectué
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {walletSubTab === 'numbers' && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        Numéros enregistrés
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Vos coordonnées de paiement Mobile Money pour des reversements instantanés
                      </p>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {savedPhoneNumbers.map((num) => (
                        <div key={num.id} className="py-3.5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                              <Smartphone className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-gray-900 block">{num.operator}</span>
                              <span className="text-[11px] font-mono text-gray-500">{num.number}</span>
                            </div>
                          </div>
                          {num.isDefault && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Par défaut
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ONGLET 6 : NOTIFICATIONS */}
          {/* ======================================================== */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900">
                    Notifications
                  </h1>
                  <p className="text-xs text-gray-500 mt-1">
                    Alertes de commandes, paiements et messages de la plateforme.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setNotifications(notifications.map((n) => ({ ...n, read: true })));
                    onToast('info', 'Notifications lues', 'Toutes les alertes ont été marquées comme lues.');
                  }}
                  className="text-xs font-bold text-[#00674F] hover:underline cursor-pointer"
                >
                  Tout marquer comme lu
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs divide-y divide-gray-100">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-4 sm:p-5 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center shrink-0 mt-0.5">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900">{notif.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{notif.description}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">{notif.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ONGLET 7 : PROFIL BOUTIQUE (EXACTEMENT SELON LA CAPTURE) */}
          {/* ======================================================== */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* En-tête de la page Profil */}
              <div className="flex items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                      Profil Boutique
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      Gérez les informations de votre boutique
                    </p>
                  </div>
                </div>

                {/* Badge statut Approuvé (En haut à droite comme sur la capture) */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Approuvé</span>
                </span>
              </div>

              {/* Disposition en 2 colonnes */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* COLONNE GAUCHE (Carte résumé boutique) */}
                <div className="lg:col-span-4 bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-2xs flex flex-col justify-between">
                  <div className="text-center">
                    {/* Grand Avatar Rond */}
                    <div className="w-24 h-24 rounded-full bg-[#F3F4F6] border border-gray-200/80 mx-auto flex items-center justify-center text-gray-500 font-bold text-2xl shadow-2xs">
                      {userInitials}
                    </div>

                    {/* Nom & handle boutique */}
                    <h2 className="text-lg font-bold text-gray-900 mt-4 tracking-tight">
                      {generalInfo.name || storeInfo.name}
                    </h2>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">
                      @{storeInfo.slug}
                    </p>

                    {/* Étoile et note */}
                    <div className="mt-2.5 flex items-center justify-center gap-1 text-xs text-gray-500 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-700">0.0</span>
                      <span className="text-gray-400">(0 avis)</span>
                    </div>
                  </div>

                  {/* Ligne de séparation */}
                  <div className="my-6 border-t border-gray-100" />

                  {/* Lignes d'informations avec icônes */}
                  <div className="space-y-4 text-xs font-medium">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-gray-500">
                        <ShoppingBag className="w-4 h-4 text-gray-400" />
                        <span>Total ventes</span>
                      </div>
                      <span className="font-bold text-gray-900 text-sm">0</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-gray-500">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span>Commission iit_store</span>
                      </div>
                      <span className="font-bold text-gray-900 text-sm">10%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-gray-500">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Membre depuis</span>
                      </div>
                      <span className="font-bold text-gray-900 text-sm">23/09/2026</span>
                    </div>
                  </div>

                  {/* Bouton Désactiver la boutique */}
                  <button
                    type="button"
                    onClick={() => {
                      onToast('info', 'Boutique active', 'Votre boutique reste active pour honorer vos commandes.');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-medium text-xs transition-colors mt-8 border border-red-100/80 text-center cursor-pointer active:scale-98"
                  >
                    Désactiver la boutique
                  </button>
                </div>

                {/* COLONNE DROITE (Onglets & Formulaires) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Barre d'onglets (Général, Légal, Contact, Horaires) */}
                  <div className="bg-[#F3F4F6] p-1 rounded-xl flex items-center justify-between sm:justify-start gap-1">
                    {[
                      { id: 'general', label: 'Général' },
                      { id: 'legal', label: 'Légal' },
                      { id: 'contact', label: 'Contact' },
                      { id: 'hours', label: 'Horaires' },
                    ].map((tab) => {
                      const isActive = profileTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setProfileTab(tab.id as any)}
                          className={`flex-1 sm:flex-none py-2 px-5 sm:px-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-white text-gray-900 shadow-2xs'
                              : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* FORMULAIRE ONGLET : CONTACT (Exactement comme la capture fournie) */}
                  {profileTab === 'contact' && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-6 animate-in fade-in duration-150">
                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          Coordonnées
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5 font-medium">
                          Comment vos clients peuvent vous contacter et vous trouver
                        </p>
                      </div>

                      {/* Ligne 1 : Email & Téléphone boutique */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 mb-1.5">
                            <Mail className="w-3.5 h-3.5 text-gray-700" />
                            <span>Email boutique</span>
                          </label>
                          <input
                            type="email"
                            value={contactInfo.email}
                            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300"
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 mb-1.5">
                            <Phone className="w-3.5 h-3.5 text-gray-700" />
                            <span>Téléphone boutique</span>
                          </label>
                          <input
                            type="tel"
                            value={contactInfo.phone}
                            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300"
                          />
                        </div>
                      </div>

                      {/* Séparateur pour l'adresse */}
                      <div className="border-t border-gray-100 pt-6 space-y-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                          <MapPin className="w-3.5 h-3.5 text-gray-700" />
                          <span>Adresse</span>
                        </div>

                        {/* Adresse complète */}
                        <div>
                          <label className="text-xs text-gray-600 mb-1.5 block font-medium">
                            Adresse complète
                          </label>
                          <textarea
                            rows={3}
                            value={contactInfo.address}
                            onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none font-medium"
                          />
                        </div>

                        {/* Ville & Pays */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-gray-600 mb-1.5 block font-medium">
                              Ville
                            </label>
                            <input
                              type="text"
                              value={contactInfo.city}
                              onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium"
                            />
                          </div>

                          <div>
                            <label className="flex items-center gap-1.5 text-xs text-gray-600 mb-1.5 font-medium">
                              <Globe className="w-3.5 h-3.5 text-gray-700" />
                              <span>Pays</span>
                            </label>
                            <select
                              value={contactInfo.country}
                              onChange={(e) => setContactInfo({ ...contactInfo, country: e.target.value })}
                              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium cursor-pointer"
                            >
                              <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                              <option value="Sénégal">Sénégal</option>
                              <option value="Mali">Mali</option>
                              <option value="Burkina Faso">Burkina Faso</option>
                              <option value="Bénin">Bénin</option>
                              <option value="Togo">Togo</option>
                              <option value="Guinée">Guinée</option>
                              <option value="Niger">Niger</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Bouton d'enregistrement */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            onToast('success', 'Coordonnées enregistrées', 'Vos informations de contact ont été mises à jour avec succès.');
                          }}
                          className="px-5 py-2.5 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white text-xs font-black cursor-pointer shadow-xs transition-all active:scale-98"
                        >
                          Enregistrer les coordonnées
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FORMULAIRE ONGLET : GÉNÉRAL */}
                  {profileTab === 'general' && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4 animate-in fade-in duration-150">
                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          Informations générales
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5 font-medium">
                          Identité et visibilité publique de votre boutique
                        </p>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">Nom de la boutique</label>
                        <input
                          type="text"
                          value={generalInfo.name}
                          onChange={(e) => setGeneralInfo({ ...generalInfo, name: e.target.value })}
                          className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">Slogan public</label>
                        <input
                          type="text"
                          value={generalInfo.slogan}
                          onChange={(e) => setGeneralInfo({ ...generalInfo, slogan: e.target.value })}
                          className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">Description / Bio</label>
                        <textarea
                          rows={3}
                          value={generalInfo.bio}
                          onChange={(e) => setGeneralInfo({ ...generalInfo, bio: e.target.value })}
                          className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 resize-none font-medium"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setStoreInfo({ ...storeInfo, name: generalInfo.name });
                            onToast('success', 'Informations mises à jour', 'Les informations générales ont été enregistrées.');
                          }}
                          className="px-5 py-2.5 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white text-xs font-black cursor-pointer shadow-xs transition-all"
                        >
                          Enregistrer les modifications
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FORMULAIRE ONGLET : LÉGAL */}
                  {profileTab === 'legal' && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4 animate-in fade-in duration-150">
                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          Informations légales & Conformité
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5 font-medium">
                          Données d'enregistrement commercial vérifiées par iit_store
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-gray-700 block mb-1">Forme juridique</label>
                          <input
                            type="text"
                            value={legalInfo.businessType}
                            onChange={(e) => setLegalInfo({ ...legalInfo, businessType: e.target.value })}
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 block mb-1">Numéro RCCM / SIREN</label>
                          <input
                            type="text"
                            value={legalInfo.rccm}
                            onChange={(e) => setLegalInfo({ ...legalInfo, rccm: e.target.value })}
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs font-mono text-gray-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">Numéro Compte Contribuable (NIF)</label>
                        <input
                          type="text"
                          value={legalInfo.taxNumber}
                          onChange={(e) => setLegalInfo({ ...legalInfo, taxNumber: e.target.value })}
                          className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs font-mono text-gray-800"
                        />
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Documents d'identité et de domiciliation validés par notre équipe juridique.</span>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            onToast('success', 'Données légales enregistrées', 'Vos documents de conformité sont enregistrés.');
                          }}
                          className="px-5 py-2.5 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white text-xs font-black cursor-pointer shadow-xs transition-all"
                        >
                          Enregistrer les données légales
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FORMULAIRE ONGLET : HORAIRES */}
                  {profileTab === 'hours' && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4 animate-in fade-in duration-150">
                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          Horaires & Expéditions
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5 font-medium">
                          Indiquez vos jours ouvrés et vos délais de préparation de colis
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-gray-700 block mb-1">Jours d'activité</label>
                          <input
                            type="text"
                            value={hoursInfo.workingDays}
                            onChange={(e) => setHoursInfo({ ...hoursInfo, workingDays: e.target.value })}
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 block mb-1">Créneaux horaires</label>
                          <input
                            type="text"
                            value={hoursInfo.workingHours}
                            onChange={(e) => setHoursInfo({ ...hoursInfo, workingHours: e.target.value })}
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">Délai moyen de préparation</label>
                        <select
                          value={hoursInfo.preparationTime}
                          onChange={(e) => setHoursInfo({ ...hoursInfo, preparationTime: e.target.value })}
                          className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 cursor-pointer font-medium"
                        >
                          <option value="12h">12 heures (Expédition express)</option>
                          <option value="24h">24 heures (Standard)</option>
                          <option value="48h">48 heures</option>
                          <option value="72h">72 heures (Création sur mesure)</option>
                        </select>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            onToast('success', 'Horaires enregistrés', 'Vos disponibilités et délais de préparation ont été mis à jour.');
                          }}
                          className="px-5 py-2.5 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white text-xs font-black cursor-pointer shadow-xs transition-all"
                        >
                          Enregistrer les horaires
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALE : NOUVEAU PRODUIT */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="font-extrabold text-base text-gray-900">Ajouter un nouveau produit</h3>
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Titre de l'article *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Chemise Wax Imprimé Kente"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Prix (€) *</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={newPriceEur}
                    onChange={(e) => setNewPriceEur(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Quantité stock</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Catégorie</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-800"
                >
                  <option value="Mode & Vêtements">Mode & Vêtements</option>
                  <option value="Accessoires">Accessoires</option>
                  <option value="Chaussures">Chaussures</option>
                  <option value="Artisanat">Artisanat</option>
                  <option value="Électronique">Électronique</option>
                  <option value="Cosmétiques">Cosmétiques</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">URL Image (optionnel)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-[11px] text-gray-800"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white font-black cursor-pointer shadow-xs"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE : RETRAIT MOBILE MONEY */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="font-extrabold text-base text-gray-900">Retrait de fonds Mobile Money</h3>
              <button
                type="button"
                onClick={() => setIsPayoutModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePayoutSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Montant à retirer (FCFA)</label>
                <input
                  type="number"
                  step="1000"
                  required
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-black text-sm text-[#00674F]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Moyen de paiement</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['WAVE', 'MTN', 'ORANGE', 'MOOV', 'BANK'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPayoutMethod(m)}
                      className={`p-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                        payoutMethod === m
                          ? 'border-[#00674F] bg-[#00674F]/10 text-[#00674F]'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {m === 'BANK' ? 'Banque' : m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Numéro de téléphone / IBAN</label>
                <input
                  type="text"
                  required
                  value={payoutRecipient}
                  onChange={(e) => setPayoutRecipient(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white font-black cursor-pointer shadow-xs"
                >
                  Confirmer le retrait
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE : RECHARGER PORTEFEUILLE */}
      {isRechargeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="font-extrabold text-base text-gray-900">Recharger mon portefeuille</h3>
              <button
                type="button"
                onClick={() => setIsRechargeModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const amt = parseFloat(rechargeAmount);
                if (isNaN(amt) || amt <= 0) {
                  onToast('error', 'Montant invalide', 'Veuillez saisir un montant supérieur à 0.');
                  return;
                }
                setAvailableBalanceFcfa((prev) => prev + amt);
                setTotalEarnedFcfa((prev) => prev + amt);
                setIsRechargeModalOpen(false);
                onToast('success', 'Portefeuille rechargé', `Votre compte a été crédité de ${amt.toLocaleString('fr-FR')} FCFA.`);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-gray-700 block mb-1">Montant à recharger (FCFA)</label>
                <input
                  type="number"
                  step="1000"
                  required
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-black text-sm text-[#059669]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Moyen de paiement</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['WAVE', 'ORANGE', 'MTN', 'CARD'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setRechargeMethod(m)}
                      className={`p-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                        rechargeMethod === m
                          ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#8B5CF6]'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {m === 'CARD' ? 'Carte Bancaire' : `${m} Money`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsRechargeModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-black cursor-pointer shadow-xs"
                >
                  Confirmer le rechargement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE : DEMANDE DE RAMASSAGE COURSIER */}
      {isPickupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#582be8]" />
                <h3 className="font-extrabold text-base text-gray-900">Demander un coursier</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPickupModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newTrackingId = `TRK-CI-${Math.floor(10000 + Math.random() * 90000)}`;
                const newShipment = {
                  id: newTrackingId,
                  orderId: `CMD-${Math.floor(10000 + Math.random() * 90000)}`,
                  recipientName: 'Client Réseau Express',
                  recipientPhone: '+225 07 00 11 22',
                  destination: `${contactInfo.city} (Livraison Programmée)`,
                  courierName: 'Kader Ouattara (Assigné)',
                  courierPhone: '+225 01 44 77 99',
                  courierVehicle: 'Moto Express #09',
                  status: 'pickup_scheduled',
                  currentStep: 1,
                  stepText: 'Collecte enregistrée - Coursier en route vers votre boutique',
                  eta: pickupSlot === 'morning' ? 'Ce matin (09h - 12h)' : 'Cet après-midi (14h - 17h)',
                  itemsSummary: `${pickupPackageCount} colis prêt(s) au comptoir`,
                  packageCount: parseInt(pickupPackageCount, 10) || 1,
                  costFcfa: 1500,
                };
                setShipments([newShipment, ...shipments]);
                setIsPickupModalOpen(false);
                onToast(
                  'success',
                  'Passage coursier programmé !',
                  `Un livreur passera à votre adresse (${contactInfo.address}) pour récupérer vos colis.`
                );
              }}
              className="space-y-4 text-xs"
            >
              {/* Adresse de collecte */}
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Lieu de collecte</span>
                <div className="font-bold text-gray-900">{generalInfo.name || storeInfo.name}</div>
                <div className="text-gray-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{contactInfo.address}, {contactInfo.city}</span>
                </div>
              </div>

              {/* Nombre de colis */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">Nombre de colis à expédier</label>
                <select
                  value={pickupPackageCount}
                  onChange={(e) => setPickupPackageCount(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800 cursor-pointer"
                >
                  <option value="1">1 colis</option>
                  <option value="2">2 colis</option>
                  <option value="3">3 colis</option>
                  <option value="5">5 colis ou plus (Grand volume)</option>
                </select>
              </div>

              {/* Créneau de passage */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">Créneau horaire souhaité</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPickupSlot('morning')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      pickupSlot === 'morning'
                        ? 'border-[#582be8] bg-[#582be8]/10 text-[#582be8]'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>Matinée</span>
                    <span className="block text-[10px] text-gray-400 font-normal mt-0.5">09h00 - 12h00</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickupSlot('afternoon')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      pickupSlot === 'afternoon'
                        ? 'border-[#582be8] bg-[#582be8]/10 text-[#582be8]'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>Après-midi</span>
                    <span className="block text-[10px] text-gray-400 font-normal mt-0.5">14h00 - 17h00</span>
                  </button>
                </div>
              </div>

              {/* Remarques coursier */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">Instructions pour le livreur (Optionnel)</label>
                <input
                  type="text"
                  placeholder="Ex : Fragile, sonner au portail gris..."
                  value={pickupNotes}
                  onChange={(e) => setPickupNotes(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPickupModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#582be8] hover:bg-[#4b23cf] text-white font-bold cursor-pointer shadow-xs"
                >
                  Valider la demande
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE : TRACEUR DÉTAILLÉ DU COLIS */}
      {selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-gray-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-gray-400 block">Fiche Traceur iit_store Express</span>
                <h3 className="font-extrabold text-base text-gray-900">{selectedShipment.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedShipment(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Informations destinataire */}
            <div className="p-3 bg-gray-50 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Destinataire :</span>
                <strong className="text-gray-900">{selectedShipment.recipientName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Destination :</span>
                <span className="text-gray-800">{selectedShipment.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Livreur assigné :</span>
                <span className="font-semibold text-purple-700">{selectedShipment.courierName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Véhicule :</span>
                <span className="font-mono text-gray-700">{selectedShipment.courierVehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Arrivée estimée :</span>
                <span className="font-bold text-gray-900">{selectedShipment.eta}</span>
              </div>
            </div>

            {/* Timeline des étapes */}
            <div className="space-y-3 text-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                Journal de traçabilité
              </span>
              <div className="space-y-2 border-l-2 border-[#582be8]/30 ml-2 pl-3">
                <div className="relative">
                  <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#582be8]" />
                  <span className="font-bold text-gray-900 block">Colis étiqueté & scellé</span>
                  <span className="text-[11px] text-gray-400">Boutique {generalInfo.name || storeInfo.name}</span>
                </div>
                {selectedShipment.currentStep >= 2 && (
                  <div className="relative">
                    <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#582be8]" />
                    <span className="font-bold text-gray-900 block">Prise en charge par le coursier</span>
                    <span className="text-[11px] text-gray-400">{selectedShipment.courierName} ({selectedShipment.courierVehicle})</span>
                  </div>
                )}
                {selectedShipment.currentStep >= 3 && (
                  <div className="relative">
                    <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#582be8] animate-ping" />
                    <span className="font-bold text-purple-700 block">En cours de livraison finale</span>
                    <span className="text-[11px] text-gray-500">Destination : {selectedShipment.destination}</span>
                  </div>
                )}
                {selectedShipment.currentStep >= 4 && (
                  <div className="relative">
                    <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="font-bold text-emerald-700 block">Remis en main propre au client</span>
                    <span className="text-[11px] text-gray-400">Authentification OTP conforme</span>
                  </div>
                )}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="pt-2 flex gap-2">
              <a
                href={`tel:${selectedShipment.courierPhone.replace(/\s+/g, '')}`}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-purple-600" />
                <span>Joindre le coursier</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedShipment(null)}
                className="flex-1 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE SIMULATEUR */}
      <MerchantSimulator
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />
    </div>
  );
};
