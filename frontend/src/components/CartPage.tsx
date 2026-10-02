import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Tag,
  Gift,
  HelpCircle,
  Smartphone,
  Banknote,
  MapPin,
  User,
  Phone,
  AlertCircle,
  Lock,
  Check,
  Building2,
  Home,
  ExternalLink,
} from 'lucide-react';
import { type Product, PRODUCTS_CATALOG } from '../data/products';
import { type Country } from '../data/countries';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'delivery' | 'mobile_money' | 'card';
export type MobileOperator = 'MTN' | 'MOOV' | 'WAVE' | 'ORANGE';

export interface CustomerOrderData {
  orderId: string;
  orderDate: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  city: string;
  commune: string;
  neighborhood: string;
  deliveryNotes?: string;
  country: Country;
  paymentMethod: PaymentMethod;
  mobileOperator?: MobileOperator;
  mobileNumber?: string;
  cardNumberMasked?: string;
  totalEur: number;
  totalLocal: number;
  shippingCostEur: number;
  shippingMethod: 'standard' | 'express';
  items: CartItem[];
}

interface CartPageProps {
  cartItems: CartItem[];
  favoriteIds: number[];
  selectedCountry: Country;
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  onBackToShopping: () => void;
  onSelectProduct: (product: Product) => void;
  onToggleFavorite: (id: number, title: string) => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, desc?: string) => void;
  isLoggedIn?: boolean;
  userEmail?: string;
  onTrackOrder?: (orderId?: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  favoriteIds,
  selectedCountry,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBackToShopping,
  onSelectProduct,
  onToggleFavorite,
  onToast,
  isLoggedIn = false,
  userEmail = '',
  onTrackOrder,
}) => {
  // Navigation entre les étapes du panier : 'cart' | 'checkout'
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout'>('cart');
  
  // Code Promo & Réduction
  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  
  // Option de livraison
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isOrdering, setIsOrdering] = useState(false);

  // Formulaire Client Invité (Livraison)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(userEmail || '');
  const [city, setCity] = useState('');
  const [commune, setCommune] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Mode de paiement & Champs spécifiques
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('delivery');
  const [mobileOperator, setMobileOperator] = useState<MobileOperator>('MTN');
  const [mobilePaymentNumber, setMobilePaymentNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Erreurs de validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Commande validée
  const [completedOrder, setCompletedOrder] = useState<CustomerOrderData | null>(null);

  // Calculs financiers
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalEur = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCostEur = subtotalEur > 60 || shippingMethod === 'standard' ? 0 : 9.9;
  const discountAmountEur = subtotalEur * discountRate;
  const totalEur = Math.max(0, subtotalEur - discountAmountEur + shippingCostEur);

  const subtotalLocal = Math.round(subtotalEur * selectedCountry.rateToEur);
  const totalLocal = Math.round(totalEur * selectedCountry.rateToEur);
  const discountAmountLocal = Math.round(discountAmountEur * selectedCountry.rateToEur);

  // Appliquer un code promotionnel
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'BIENVENUE15' || code === 'EMERAUDE15') {
      setDiscountRate(0.15);
      setAppliedPromo(code);
      onToast('success', 'Code promo appliqué !', '15% de réduction appliqués sur votre panier.');
    } else if (code === 'GOLD20' || code === 'IIT20') {
      setDiscountRate(0.20);
      setAppliedPromo(code);
      onToast('success', 'Code VIP appliqué !', '20% de remise exceptionnelle accordés.');
    } else {
      onToast('error', 'Code invalide', 'Essayez les codes BIENVENUE15 ou IIT20 pour tester.');
    }
  };

  // Formatage du numéro de carte bancaire (espaces tous les 4 chiffres)
  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted);
  };

  // Formatage de l'expiration MM/AA
  const handleExpiryChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      setCardExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    } else {
      setCardExpiry(cleaned);
    }
  };

  // Validation des champs obligatoires du mode invité et paiement
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!lastName.trim()) newErrors.lastName = 'Le nom de famille est obligatoire.';
    if (!firstName.trim()) newErrors.firstName = 'Le prénom est obligatoire.';
    
    // Téléphone
    const cleanedPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    if (!cleanedPhone) {
      newErrors.phone = 'Le numéro de téléphone est obligatoire pour la livraison.';
    } else if (cleanedPhone.length < 6) {
      newErrors.phone = 'Veuillez saisir un numéro de téléphone valide.';
    }

    if (!city.trim()) newErrors.city = 'La ville de livraison est obligatoire.';
    if (!commune.trim()) newErrors.commune = 'La commune ou arrondissement est obligatoire.';
    if (!neighborhood.trim()) newErrors.neighborhood = 'Le quartier est obligatoire.';

    // Validation spécifique selon le choix de paiement
    if (paymentMethod === 'mobile_money') {
      const mobNum = (mobilePaymentNumber || phone).replace(/[\s\-\(\)\.]/g, '');
      if (!mobNum) {
        newErrors.mobilePaymentNumber = 'Le numéro Mobile Money est requis pour recevoir le prompt de paiement.';
      }
    } else if (paymentMethod === 'card') {
      const cleanedCard = cardNumber.replace(/\s/g, '');
      if (cleanedCard.length < 16) {
        newErrors.cardNumber = 'Veuillez saisir les 16 chiffres de votre carte.';
      }
      if (!cardHolder.trim()) {
        newErrors.cardHolder = 'Le nom du titulaire est requis.';
      }
      if (!cardExpiry.includes('/') || cardExpiry.length < 5) {
        newErrors.cardExpiry = 'Date MM/AA requise.';
      }
      if (cardCvv.length < 3) {
        newErrors.cardCvv = 'Code CVC à 3 chiffres requis.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission et confirmation de la commande
  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      onToast('error', 'Formulaire incomplet', 'Veuillez renseigner tous les champs obligatoires marqués en rouge.');
      return;
    }

    setIsOrdering(true);

    const generatedId = `IIT-${Math.floor(100000 + Math.random() * 900000)}-${selectedCountry.code !== 'ALL' ? selectedCountry.code : 'BJ'}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    setTimeout(() => {
      setIsOrdering(false);

      const orderData: CustomerOrderData = {
        orderId: generatedId,
        orderDate: formattedDate,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        city: city.trim(),
        commune: commune.trim(),
        neighborhood: neighborhood.trim(),
        deliveryNotes: deliveryNotes.trim() || undefined,
        country: selectedCountry,
        paymentMethod,
        mobileOperator: paymentMethod === 'mobile_money' ? mobileOperator : undefined,
        mobileNumber: paymentMethod === 'mobile_money' ? (mobilePaymentNumber || phone) : undefined,
        cardNumberMasked: paymentMethod === 'card' ? `•••• •••• •••• ${cardNumber.replace(/\s/g, '').slice(-4)}` : undefined,
        totalEur,
        totalLocal,
        shippingCostEur,
        shippingMethod,
        items: [...cartItems],
      };

      setCompletedOrder(orderData);
      onToast(
        'success',
        'Commande confirmée avec succès !',
        `Votre commande ${generatedId} de ${totalEur.toFixed(2)} € a été validée.`
      );
    }, 1200);
  };

  // =========================================================================
  // ÉTAPE 3 : ÉCRAN DE CONFIRMATION DE COMMANDE COMPLÈTE
  // =========================================================================
  if (completedOrder) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in">
        <div className="bg-white rounded-3xl border border-[#00674F]/20 p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* En-tête de validation avec succès */}
          <div className="text-center space-y-3">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 border-2 border-[#00674F] text-[#00674F] flex items-center justify-center shadow-lg shadow-[#00674F]/15">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-[#00674F]/10 text-[#00674F] uppercase tracking-wider">
                <Check className="w-3.5 h-3.5" /> Commande Confirmée & Transmise
              </span>
              <h1 className="mt-2 text-2xl sm:text-3xl font-black text-[#1E2E29]">
                Merci, {completedOrder.firstName} !
              </h1>
              <p className="mt-1 text-sm text-[#2D423B]/80 max-w-lg mx-auto">
                Votre commande N° <strong className="text-[#00674F] font-black">{completedOrder.orderId}</strong> est prise en compte par nos équipes logistiques.
              </p>
            </div>
          </div>

          {/* Grille récapitulative : 1. Destinataire & Adresse | 2. Mode de paiement & Total */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-[#00674F]/15">
            
            {/* Boîte 1 : Coordonnées de livraison Client Invité */}
            <div className="bg-[#F4F7F5] rounded-2xl p-5 border border-[#00674F]/15 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-[#00674F] uppercase tracking-wider border-b border-[#00674F]/10 pb-2">
                <MapPin className="w-4 h-4 text-[#FF7518]" />
                <span>Adresse de livraison (Mode Invité)</span>
              </div>

              <div className="space-y-1.5 text-xs text-[#2D423B]">
                <p className="font-bold text-sm text-[#1E2E29]">
                  {completedOrder.firstName} {completedOrder.lastName}
                </p>
                <p className="flex items-center gap-1.5 font-semibold text-[#00674F]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{completedOrder.phone}</span>
                </p>
                {completedOrder.email && (
                  <p className="text-[11px] text-[#2D423B]/70">
                    Email : {completedOrder.email}
                  </p>
                )}
                <div className="pt-2 text-[11px] leading-relaxed border-t border-neutral-200/60">
                  <p><strong>Quartier :</strong> {completedOrder.neighborhood}</p>
                  <p><strong>Commune :</strong> {completedOrder.commune}</p>
                  <p><strong>Ville :</strong> {completedOrder.city} ({completedOrder.country.flag} {completedOrder.country.name})</p>
                  {completedOrder.deliveryNotes && (
                    <p className="mt-1 text-[#FF7518] italic">
                      Repère : « {completedOrder.deliveryNotes} »
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Boîte 2 : Mode de paiement & Statut */}
            <div className="bg-[#F4F7F5] rounded-2xl p-5 border border-[#00674F]/15 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-[#00674F] uppercase tracking-wider border-b border-[#00674F]/10 pb-2">
                <CreditCard className="w-4 h-4 text-[#00674F]" />
                <span>Mode de règlement choisi</span>
              </div>

              <div className="space-y-2 text-xs text-[#2D423B]">
                {completedOrder.paymentMethod === 'delivery' && (
                  <div className="p-3 bg-white rounded-xl border border-amber-300 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-amber-800">
                      <Banknote className="w-4 h-4 text-[#FF7518]" />
                      <span>Paiement à la livraison (À réception)</span>
                    </div>
                    <p className="text-[11px] text-[#2D423B]/80">
                      Montant à régler en espèces ou Mobile Money directement au coursier à l'arrivée.
                    </p>
                  </div>
                )}

                {completedOrder.paymentMethod === 'mobile_money' && (
                  <div className="p-3 bg-white rounded-xl border border-emerald-300 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-emerald-800">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span>Mobile Money ({completedOrder.mobileOperator})</span>
                    </div>
                    <p className="text-[11px] text-[#2D423B]/80">
                      Numéro de compte débité : <strong>{completedOrder.mobileNumber}</strong>
                    </p>
                  </div>
                )}

                {completedOrder.paymentMethod === 'card' && (
                  <div className="p-3 bg-white rounded-xl border border-emerald-300 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-emerald-800">
                      <CreditCard className="w-4 h-4 text-[#00674F]" />
                      <span>Carte bancaire chiffrée SSL</span>
                    </div>
                    <p className="text-[11px] text-[#2D423B]/80">
                      Carte : <strong>{completedOrder.cardNumberMasked}</strong>
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-neutral-200/60 flex items-baseline justify-between">
                  <span className="font-extrabold text-[#1E2E29]">Total de la commande :</span>
                  <div className="text-right">
                    <span className="text-lg font-black text-[#00674F] block">
                      {completedOrder.totalEur.toFixed(2)} €
                    </span>
                    <span className="text-xs font-extrabold text-[#FF7518]">
                      ≈ {completedOrder.totalLocal.toLocaleString('fr-FR')} {completedOrder.country.symbol}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5 pt-1">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Délai d'expédition : 24h - 48h ouvrées</span>
                </div>
              </div>
            </div>

          </div>

          {/* Liste récapitulative des articles */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#00674F] uppercase tracking-wider">
              Articles inclus dans ce colis ({completedOrder.items.reduce((s, i) => s + i.quantity, 0)} article(s))
            </h4>
            <div className="divide-y divide-[#00674F]/10 border border-[#00674F]/15 rounded-2xl overflow-hidden bg-white">
              {completedOrder.items.map((item) => (
                <div key={item.product.id} className="p-3 sm:p-4 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-12 h-12 rounded-xl object-cover border border-neutral-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <h5 className="font-bold text-[#1E2E29] truncate">{item.product.title}</h5>
                      <span className="text-[11px] text-[#2D423B]/60 block truncate">
                        {item.product.seller} • Qté: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-black text-[#00674F] block text-sm">
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Boutons d'action : Suivi de colis & Retour Boutique */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            {onTrackOrder && (
              <button
                type="button"
                onClick={() => {
                  onClearCart();
                  onTrackOrder(completedOrder.orderId);
                }}
                className="px-6 py-3.5 rounded-2xl bg-[#00674F] hover:bg-[#00513d] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00674F]/25 transition-all cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>Suivre l'acheminement de mon colis</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onClearCart();
                onBackToShopping();
              }}
              className="px-6 py-3.5 rounded-2xl bg-[#FF7518] hover:bg-[#E6630D] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF7518]/25 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retourner au catalogue</span>
            </button>
          </div>

        </div>
      </main>
    );
  }

  // =========================================================================
  // ÉTAPE 1 : LISTE DU PANIER INITIAL (MODIFIABLE)
  // =========================================================================
  if (checkoutStep === 'cart') {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
        {/* Barre de retour et titre principal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <button
              type="button"
              onClick={onBackToShopping}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#00674F] hover:text-[#FF7518] transition-colors mb-2 cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Continuer mes achats</span>
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-[#00674F]">Mon Panier</h1>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#00674F]/10 text-[#00674F] border border-[#00674F]/20">
                {totalItemsCount} article{totalItemsCount > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={onClearCart}
              className="self-start sm:self-auto text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Vider tout le panier</span>
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* État Panier Vide */
          <div className="bg-white rounded-3xl border border-[#00674F]/15 p-12 text-center shadow-sm max-w-2xl mx-auto my-12 space-y-6">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-[#F4F7F5] border-2 border-dashed border-[#00674F]/30 flex items-center justify-center text-[#00674F]">
              <ShoppingBag className="w-12 h-12 stroke-1" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#00674F]">Votre panier est encore vide</h2>
              <p className="mt-2 text-sm text-[#2D423B]/70 max-w-md mx-auto">
                Découvrez notre sélection de bijoux, wax, high-tech et décoration prêts à être livrés en {selectedCountry.name}.
              </p>
            </div>
            <button
              type="button"
              onClick={onBackToShopping}
              className="px-8 py-3.5 rounded-2xl bg-[#FF7518] hover:bg-[#E6630D] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#FF7518]/25 cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explorer les 80 articles par page</span>
            </button>
          </div>
        ) : (
          /* Grille Panier Plein : Articles à gauche + Résumé à droite */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne Gauche : Liste des articles du panier */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Bannière de livraison offerte */}
              <div className="bg-[#00674F]/10 border border-[#00674F]/20 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#00674F] text-white flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#00674F]">
                      Livraison offerte pour toute commande vers {selectedCountry.flag} {selectedCountry.name}
                    </p>
                    <p className="text-[11px] text-[#2D423B]/70">
                      Paiement à la livraison, Mobile Money ou Carte Bancaire disponible à l'étape suivante.
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-[11px] font-black text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-300">
                  OFFERT
                </span>
              </div>

              {/* Cartes des articles */}
              <div className="bg-white rounded-3xl border border-[#00674F]/15 shadow-sm divide-y divide-[#00674F]/10 overflow-hidden">
                {cartItems.map((item) => {
                  const itemTotalEur = item.product.price * item.quantity;
                  const itemTotalLocal = Math.round(itemTotalEur * selectedCountry.rateToEur);
                  const isFav = favoriteIds.includes(item.product.id);

                  return (
                    <div
                      key={item.product.id}
                      className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 hover:bg-[#F4F7F5]/40 transition-colors group"
                    >
                      {/* Image cliquable pour voir la fiche détaillée */}
                      <div
                        onClick={() => onSelectProduct(item.product)}
                        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-neutral-100 border border-[#00674F]/15 shrink-0 cursor-pointer"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.product.badge && (
                          <span className="absolute top-1.5 left-1.5 bg-[#00674F] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
                            {item.product.badge}
                          </span>
                        )}
                      </div>

                      {/* Informations du produit */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-[#00674F] uppercase tracking-wider mb-1">
                          <span>{item.product.category}</span>
                          <span>•</span>
                          <span className="text-[#2D423B]/60 font-semibold">{item.product.seller}</span>
                        </div>

                        <h3
                          onClick={() => onSelectProduct(item.product)}
                          className="text-sm sm:text-base font-extrabold text-[#00674F] hover:text-[#FF7518] transition-colors cursor-pointer line-clamp-2"
                        >
                          {item.product.title}
                        </h3>

                        <p className="mt-1 text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>En stock - Expédition immédiate</span>
                        </p>

                        {/* Actions sous le titre : Mettre de côté / Supprimer */}
                        <div className="mt-3 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onToggleFavorite(item.product.id, item.product.title)}
                            className={`text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                              isFav ? 'text-[#FF7518]' : 'text-[#2D423B]/70 hover:text-[#00674F]'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                            <span>{isFav ? 'Dans vos favoris' : 'Sauvegarder en favoris'}</span>
                          </button>

                          <span className="text-[#00674F]/20">|</span>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </div>

                      {/* Contrôle de quantité & Prix */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                        {/* Prix Total pour cet article */}
                        <div className="text-left sm:text-right">
                          <div className="text-base sm:text-lg font-black text-[#00674F]">
                            {itemTotalEur.toFixed(2)} €
                          </div>
                          <div className="text-xs font-bold text-[#FF7518]">
                            ≈ {itemTotalLocal.toLocaleString('fr-FR')} {selectedCountry.symbol}
                          </div>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-[#2D423B]/60">
                              ({item.product.price.toFixed(2)} € / unité)
                            </span>
                          )}
                        </div>

                        {/* Sélecteur de Quantité */}
                        <div className="flex items-center border border-[#00674F]/25 rounded-xl bg-[#F4F7F5] px-1 py-0.5 shadow-inner">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 text-[#2D423B] hover:text-[#00674F] rounded-lg transition-colors cursor-pointer"
                            aria-label="Diminuer quantité"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-[#2D423B] min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 text-[#2D423B] hover:text-[#00674F] rounded-lg transition-colors cursor-pointer"
                            aria-label="Augmenter quantité"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Réassurance au bas du panier */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <div className="p-4 rounded-2xl bg-white border border-[#00674F]/15 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-[#00674F] shrink-0" />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#00674F]">Paiements Sécurisés</h4>
                    <p className="text-[11px] text-[#2D423B]/70">À la livraison, MoMo, Carte</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#00674F]/15 flex items-center gap-3">
                  <RotateCcw className="w-6 h-6 text-[#00674F] shrink-0" />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#00674F]">Retours Garantis</h4>
                    <p className="text-[11px] text-[#2D423B]/70">14 jours pour changer d'avis</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#00674F]/15 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-[#00674F] shrink-0" />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#00674F]">Suivi de colis direct</h4>
                    <p className="text-[11px] text-[#2D423B]/70">SMS & WhatsApp disponible</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Colonne Droite : Récapitulatif de Commande */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl border border-[#00674F]/20 p-6 shadow-xl sticky top-24 space-y-5">
                
                <h2 className="text-lg font-black text-[#00674F] pb-3 border-b border-[#00674F]/15 flex items-center justify-between">
                  <span>Récapitulatif</span>
                  <span className="text-xs text-[#2D423B]/60 font-semibold">{totalItemsCount} article(s)</span>
                </h2>

                {/* Mode de livraison */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#00674F] uppercase tracking-wider">
                    Option de livraison :
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setShippingMethod('standard')}
                      className={`p-3 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                        shippingMethod === 'standard'
                          ? 'border-[#00674F] bg-[#00674F]/10 text-[#00674F] font-bold shadow-xs'
                          : 'border-[#00674F]/20 bg-white text-[#2D423B]'
                      }`}
                    >
                      <span className="block font-black">Standard</span>
                      <span className="text-[11px] text-emerald-700 font-extrabold">Gratuit (2-3j)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShippingMethod('express')}
                      className={`p-3 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                        shippingMethod === 'express'
                          ? 'border-[#FF7518] bg-[#FF7518]/10 text-[#00674F] font-bold shadow-xs'
                          : 'border-[#00674F]/20 bg-white text-[#2D423B]'
                      }`}
                    >
                      <span className="block font-black">Express 24h</span>
                      <span className="text-[11px] text-[#FF7518] font-extrabold">9.90 € (24h)</span>
                    </button>
                  </div>
                </div>

                {/* Code promo */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="block text-xs font-bold text-[#00674F] uppercase tracking-wider">
                    Code promotionnel :
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#2D423B]/50" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Ex: BIENVENUE15"
                        className="w-full pl-8 pr-3 py-2 bg-[#F4F7F5] border border-[#00674F]/20 rounded-xl text-xs font-bold text-[#2D423B] placeholder-[#2D423B]/40 focus:outline-none focus:border-[#FF7518]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#00674F] hover:bg-[#00523F] text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Appliquer
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Code {appliedPromo} actif (-{(discountRate * 100).toFixed(0)}%)</span>
                    </p>
                  )}
                </form>

                {/* Lignes de calcul */}
                <div className="space-y-2.5 pt-3 border-t border-[#00674F]/15 text-xs text-[#2D423B]">
                  <div className="flex justify-between">
                    <span>Sous-total articles</span>
                    <span className="font-bold text-[#00674F]">{subtotalEur.toFixed(2)} €</span>
                  </div>

                  {discountRate > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Remise appliquée</span>
                      <span>-{discountAmountEur.toFixed(2)} €</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <span>Frais d'envoi ({selectedCountry.name})</span>
                      <span>{selectedCountry.flag}</span>
                    </span>
                    <span className={shippingCostEur === 0 ? 'text-emerald-700 font-bold' : 'font-bold'}>
                      {shippingCostEur === 0 ? 'Offert' : `${shippingCostEur.toFixed(2)} €`}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#2D423B]/60 text-[11px]">
                    <span>TVA & Taxes incluses</span>
                    <span>Inclus</span>
                  </div>

                  {/* Total Final */}
                  <div className="pt-3 border-t-2 border-[#00674F]/20 flex items-baseline justify-between">
                    <div>
                      <span className="block text-sm font-black text-[#00674F]">Total TTC</span>
                      <span className="text-[10px] text-[#2D423B]/60">Monnaie locale garantie</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#00674F]">
                        {totalEur.toFixed(2)} €
                      </div>
                      <div className="text-xs font-black text-[#FF7518]">
                        ≈ {totalLocal.toLocaleString('fr-FR')} {selectedCountry.symbol}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bouton pour aller à l'étape Livraison & Paiement (Mode Invité) */}
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutStep('checkout');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-4 rounded-2xl bg-[#FF7518] hover:bg-[#E6630D] active:scale-95 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#FF7518]/30 transition-all cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Passer la commande (Mode Invité)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-[#2D423B]/60 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00674F]" />
                    <span>Transaction sécurisée par iit_store Pay</span>
                  </span>
                </div>

              </div>
            </div>

          </div>
        )}
      </main>
    );
  }

  // =========================================================================
  // ÉTAPE 2 : FORMULAIRE DE COMMANDE CLIENT INVITÉ & CHOIX DU PAIEMENT
  // =========================================================================
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
      {/* Fil d'Ariane & Bouton Retour Panier */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            type="button"
            onClick={() => setCheckoutStep('cart')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00674F] hover:text-[#FF7518] transition-colors mb-2 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Modifier les articles du panier</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-[#00674F]">Validation de Commande</h1>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#FF7518]/15 text-[#FF7518] border border-[#FF7518]/30">
              Mode Invité ou Compte
            </span>
          </div>
        </div>

        {/* Indicateur d'étapes */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#2D423B]/60">
          <span className="text-[#00674F] flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> 1. Panier
          </span>
          <span>›</span>
          <span className="text-[#FF7518] font-black underline underline-offset-4">
            2. Livraison & Paiement
          </span>
          <span>›</span>
          <span>3. Confirmation</span>
        </div>
      </div>

      <form onSubmit={handleConfirmOrder} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Colonne Gauche (8 col) : Coordonnées Livraison + Choix de Paiement */}
          <div className="lg:col-span-8 space-y-6">

            {/* BANNER MODE INVITÉ SANS INSCRIPTION REQUISE */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#00674F]/10 via-[#00674F]/5 to-transparent border border-[#00674F]/20 flex items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#00674F] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#00674F]">
                    {isLoggedIn ? `Connecté en tant que ${userEmail}` : 'Commande Rapide en Mode Invité'}
                  </h3>
                  <p className="text-xs text-[#2D423B]/70 mt-0.5">
                    {isLoggedIn
                      ? 'Vos coordonnées de compte sont appliquées ci-dessous.'
                      : 'Aucun mot de passe requis. Remplissez simplement vos informations pour être livré.'}
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-[11px] font-black bg-white text-[#00674F] border border-[#00674F]/20 shadow-xs">
                Accès Immédiat
              </span>
            </div>

            {/* 1. SECTION : INFORMATIONS DU CLIENT & ADRESSE DE LIVRAISON */}
            <div className="bg-white rounded-3xl border border-[#00674F]/15 p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#00674F]/15">
                <div className="w-7 h-7 rounded-lg bg-[#00674F] text-white flex items-center justify-center text-xs font-black">
                  1
                </div>
                <div>
                  <h2 className="text-base font-black text-[#1E2E29]">
                    Coordonnées & Adresse de livraison
                  </h2>
                  <p className="text-[11px] text-[#2D423B]/60">
                    Nécessaires pour l'acheminement de votre colis et le contact avec le coursier
                  </p>
                </div>
              </div>

              {/* Ligne 1 : Nom et Prénom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider mb-1.5">
                    Nom de famille <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: '' }));
                    }}
                    placeholder="Ex: Mensah, Dupont..."
                    className={`w-full px-3.5 py-3 rounded-2xl bg-[#F4F7F5] border text-xs sm:text-sm font-semibold text-[#2D423B] focus:bg-white focus:outline-none transition-all ${
                      errors.lastName
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-[#00674F]/20 focus:border-[#FF7518]'
                    }`}
                  />
                  {errors.lastName && (
                    <span className="text-[11px] font-bold text-red-500 mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.lastName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider mb-1.5">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: '' }));
                    }}
                    placeholder="Ex: Jean-Luc, Aïcha..."
                    className={`w-full px-3.5 py-3 rounded-2xl bg-[#F4F7F5] border text-xs sm:text-sm font-semibold text-[#2D423B] focus:bg-white focus:outline-none transition-all ${
                      errors.firstName
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-[#00674F]/20 focus:border-[#FF7518]'
                    }`}
                  />
                  {errors.firstName && (
                    <span className="text-[11px] font-bold text-red-500 mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.firstName}
                    </span>
                  )}
                </div>
              </div>

              {/* Ligne 2 : Numéro de téléphone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider mb-1.5">
                    Numéro de téléphone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#2D423B]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      placeholder={`Ex: +229 97 00 00 00`}
                      className={`w-full pl-10 pr-3.5 py-3 rounded-2xl bg-[#F4F7F5] border text-xs sm:text-sm font-semibold text-[#2D423B] focus:bg-white focus:outline-none transition-all ${
                        errors.phone
                          ? 'border-red-500 ring-2 ring-red-500/20'
                          : 'border-[#00674F]/20 focus:border-[#FF7518]'
                      }`}
                    />
                  </div>
                  {errors.phone ? (
                    <span className="text-[11px] font-bold text-red-500 mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#2D423B]/60 mt-1 block">
                      Le livreur vous contactera par appel ou WhatsApp avant de passer.
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider mb-1.5">
                    Email pour reçu de commande <span className="text-neutral-400 font-normal">(Optionnel)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@exemple.com"
                    className="w-full px-3.5 py-3 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/20 text-xs sm:text-sm font-semibold text-[#2D423B] focus:bg-white focus:outline-none focus:border-[#FF7518] transition-all"
                  />
                  <span className="text-[10px] text-[#2D423B]/60 mt-1 block">
                    Permet de recevoir le récapitulatif numérique et facture.
                  </span>
                </div>
              </div>

              {/* Ligne 3 : Ville, Commune, Quartier (Spécificités demandées par le client) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider mb-1.5">
                    Ville <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#2D423B]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                      }}
                      placeholder="Ex: Cotonou, Abidjan..."
                      className={`w-full pl-9 pr-3 py-3 rounded-2xl bg-[#F4F7F5] border text-xs sm:text-sm font-semibold text-[#2D423B] focus:bg-white focus:outline-none transition-all ${
                        errors.city
                          ? 'border-red-500 ring-2 ring-red-500/20'
                          : 'border-[#00674F]/20 focus:border-[#FF7518]'
                      }`}
                    />
                  </div>
                  {errors.city && (
                    <span className="text-[11px] font-bold text-red-500 mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.city}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider mb-1.5">
                    Commune / Arrond. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={commune}
                    onChange={(e) => {
                      setCommune(e.target.value);
                      if (errors.commune) setErrors((prev) => ({ ...prev, commune: '' }));
                    }}
                    placeholder="Ex: Cocody, 5ème Arr..."
                    className={`w-full px-3 py-3 rounded-2xl bg-[#F4F7F5] border text-xs sm:text-sm font-semibold text-[#2D423B] focus:bg-white focus:outline-none transition-all ${
                      errors.commune
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-[#00674F]/20 focus:border-[#FF7518]'
                    }`}
                  />
                  {errors.commune && (
                    <span className="text-[11px] font-bold text-red-500 mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.commune}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider mb-1.5">
                    Quartier <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Home className="w-4 h-4 text-[#2D423B]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={neighborhood}
                      onChange={(e) => {
                        setNeighborhood(e.target.value);
                        if (errors.neighborhood) setErrors((prev) => ({ ...prev, neighborhood: '' }));
                      }}
                      placeholder="Ex: Cadjèhoun, Riviera..."
                      className={`w-full pl-9 pr-3 py-3 rounded-2xl bg-[#F4F7F5] border text-xs sm:text-sm font-semibold text-[#2D423B] focus:bg-white focus:outline-none transition-all ${
                        errors.neighborhood
                          ? 'border-red-500 ring-2 ring-red-500/20'
                          : 'border-[#00674F]/20 focus:border-[#FF7518]'
                      }`}
                    />
                  </div>
                  {errors.neighborhood && (
                    <span className="text-[11px] font-bold text-red-500 mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.neighborhood}
                    </span>
                  )}
                </div>
              </div>

              {/* Ligne 4 : Repère / Détails d'adresse complémentaires */}
              <div>
                <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider mb-1.5">
                  Précision / Repère d'accès <span className="text-neutral-400 font-normal">(Optionnel)</span>
                </label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Ex: En face de la pharmacie, maison portail bleu, 2ème carrefour..."
                  className="w-full px-3.5 py-3 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/20 text-xs sm:text-sm font-semibold text-[#2D423B] focus:bg-white focus:outline-none focus:border-[#FF7518] transition-all"
                />
              </div>

            </div>

            {/* 2. SECTION : CHOIX OBLIGATOIRE DU MODE DE PAIEMENT */}
            <div className="bg-white rounded-3xl border border-[#00674F]/15 p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#00674F]/15">
                <div className="w-7 h-7 rounded-lg bg-[#00674F] text-white flex items-center justify-center text-xs font-black">
                  2
                </div>
                <div>
                  <h2 className="text-base font-black text-[#1E2E29]">
                    Choix du mode de paiement
                  </h2>
                  <p className="text-[11px] text-[#2D423B]/60">
                    Sélectionnez votre moyen de règlement préféré parmi nos 3 options certifiées
                  </p>
                </div>
              </div>

              {/* 3 Cartes de choix de paiement : Livraison, Mobile Money, Carte */}
              <div className="space-y-3.5">
                
                {/* OPTION 1 : PAIEMENT À LA LIVRAISON (CASH ON DELIVERY) */}
                <div
                  onClick={() => setPaymentMethod('delivery')}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'delivery'
                      ? 'border-[#00674F] bg-[#00674F]/5 shadow-sm'
                      : 'border-neutral-200 hover:border-[#00674F]/30 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[#00674F] flex items-center justify-center mt-0.5 shrink-0">
                        {paymentMethod === 'delivery' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00674F]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-sm text-[#1E2E29]">
                            Paiement à la livraison (À réception)
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                            Recommandé & Sans risque
                          </span>
                        </div>
                        <p className="text-xs text-[#2D423B]/70 mt-1 leading-relaxed">
                          Payez en <strong>espèces</strong> ou par <strong>Mobile Money</strong> directement à notre coursier lors de la remise en main propre de votre colis à votre porte.
                        </p>
                      </div>
                    </div>
                    <Banknote className="w-6 h-6 text-[#00674F] shrink-0" />
                  </div>
                </div>

                {/* OPTION 2 : PAIEMENT MOBILE MONEY (MTN, MOOV, WAVE, ORANGE) */}
                <div
                  onClick={() => setPaymentMethod('mobile_money')}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'mobile_money'
                      ? 'border-[#FF7518] bg-[#FF7518]/5 shadow-sm'
                      : 'border-neutral-200 hover:border-[#FF7518]/30 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[#FF7518] flex items-center justify-center mt-0.5 shrink-0">
                        {paymentMethod === 'mobile_money' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF7518]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-sm text-[#1E2E29]">
                            Mobile Money instantané
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#FF7518]/15 text-[#FF7518]">
                            MTN • Moov • Wave • Orange
                          </span>
                        </div>
                        <p className="text-xs text-[#2D423B]/70 mt-1 leading-relaxed">
                          Validation sécurisée par invite USSD ou notification push immédiate sur votre téléphone.
                        </p>
                      </div>
                    </div>
                    <Smartphone className="w-6 h-6 text-[#FF7518] shrink-0" />
                  </div>

                  {/* Sous-champs Mobile Money si sélectionné */}
                  {paymentMethod === 'mobile_money' && (
                    <div className="mt-4 pt-4 border-t border-[#FF7518]/20 space-y-4 animate-in fade-in">
                      <div>
                        <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider mb-2">
                          Sélectionnez votre opérateur Mobile Money :
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'MTN', name: 'MTN MoMo', color: 'bg-amber-400 text-black' },
                            { id: 'MOOV', name: 'Moov Money', color: 'bg-blue-600 text-white' },
                            { id: 'WAVE', name: 'Wave', color: 'bg-cyan-500 text-white' },
                            { id: 'ORANGE', name: 'Orange Money', color: 'bg-orange-500 text-white' },
                          ].map((op) => (
                            <button
                              key={op.id}
                              type="button"
                              onClick={() => setMobileOperator(op.id as MobileOperator)}
                              className={`py-2 px-3 rounded-xl text-xs font-black border transition-all cursor-pointer text-center ${
                                mobileOperator === op.id
                                  ? 'border-[#FF7518] ring-2 ring-[#FF7518]/30 bg-white font-extrabold text-[#1E2E29]'
                                  : 'border-neutral-200 bg-neutral-50 hover:bg-white text-[#2D423B]'
                              }`}
                            >
                              <span className={`inline-block w-2.5 h-2.5 rounded-full mr-1.5 ${op.color}`} />
                              <span>{op.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider">
                            Numéro de compte Mobile Money :
                          </label>
                          {phone && (
                            <button
                              type="button"
                              onClick={() => setMobilePaymentNumber(phone)}
                              className="text-[11px] font-bold text-[#FF7518] hover:underline cursor-pointer"
                            >
                              Utiliser mon numéro de livraison ({phone})
                            </button>
                          )}
                        </div>
                        <input
                          type="tel"
                          value={mobilePaymentNumber || phone}
                          onChange={(e) => {
                            setMobilePaymentNumber(e.target.value);
                            if (errors.mobilePaymentNumber) {
                              setErrors((prev) => ({ ...prev, mobilePaymentNumber: '' }));
                            }
                          }}
                          placeholder="Ex: +229 97 00 00 00"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#FF7518]/40 text-xs sm:text-sm font-semibold text-[#2D423B] focus:outline-none focus:ring-2 focus:ring-[#FF7518]/25"
                        />
                        {errors.mobilePaymentNumber && (
                          <span className="text-[11px] font-bold text-red-500 mt-1 block flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.mobilePaymentNumber}
                          </span>
                        )}
                        <span className="text-[10px] text-[#2D423B]/60 mt-1 block">
                          Un message automatique de confirmation vous sera envoyé dès validation.
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* OPTION 3 : PAIEMENT PAR CARTE BANCAIRE (VISA / MASTERCARD) */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#00674F] bg-[#00674F]/5 shadow-sm'
                      : 'border-neutral-200 hover:border-[#00674F]/30 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[#00674F] flex items-center justify-center mt-0.5 shrink-0">
                        {paymentMethod === 'card' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00674F]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-sm text-[#1E2E29]">
                            Carte bancaire (Visa / Mastercard)
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-[#00674F]">
                            Chiffrement SSL 256-bit
                          </span>
                        </div>
                        <p className="text-xs text-[#2D423B]/70 mt-1 leading-relaxed">
                          Règlement immédiat sécurisé par protocole 3D Secure (authentification bancaire).
                        </p>
                      </div>
                    </div>
                    <CreditCard className="w-6 h-6 text-[#00674F] shrink-0" />
                  </div>

                  {/* Sous-champs Carte Bancaire si sélectionné */}
                  {paymentMethod === 'card' && (
                    <div className="mt-4 pt-4 border-t border-[#00674F]/20 space-y-3.5 animate-in fade-in">
                      <div>
                        <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider mb-1.5">
                          Numéro de carte (16 chiffres)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => {
                              handleCardNumberChange(e.target.value);
                              if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: '' }));
                            }}
                            placeholder="4532 •••• •••• 8924"
                            className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs sm:text-sm font-mono font-bold tracking-wider ${
                              errors.cardNumber
                                ? 'border-red-500 ring-2 ring-red-500/20'
                                : 'border-[#00674F]/30 focus:border-[#00674F]'
                            }`}
                          />
                          <Lock className="w-4 h-4 text-[#00674F] absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                        {errors.cardNumber && (
                          <span className="text-[11px] font-bold text-red-500 mt-1 block">
                            {errors.cardNumber}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-1">
                          <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider mb-1.5">
                            Titulaire
                          </label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => {
                              setCardHolder(e.target.value);
                              if (errors.cardHolder) setErrors((prev) => ({ ...prev, cardHolder: '' }));
                            }}
                            placeholder={firstName && lastName ? `${firstName} ${lastName}` : 'NOM DU CLIENT'}
                            className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#00674F]/30 text-xs font-semibold focus:outline-none focus:border-[#00674F]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider mb-1.5">
                            Expiration (MM/AA)
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => {
                              handleExpiryChange(e.target.value);
                              if (errors.cardExpiry) setErrors((prev) => ({ ...prev, cardExpiry: '' }));
                            }}
                            placeholder="12/28"
                            className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#00674F]/30 text-xs font-mono font-bold text-center focus:outline-none focus:border-[#00674F]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider mb-1.5">
                            Code CVC / CVV
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => {
                              setCardCvv(e.target.value.replace(/\D/g, ''));
                              if (errors.cardCvv) setErrors((prev) => ({ ...prev, cardCvv: '' }));
                            }}
                            placeholder="•••"
                            className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#00674F]/30 text-xs font-mono font-bold text-center focus:outline-none focus:border-[#00674F]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* Colonne Droite (4 col) : Récapitulatif Final & Validation */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-[#00674F]/20 p-6 shadow-xl sticky top-24 space-y-5">
              
              <h2 className="text-base font-black text-[#00674F] pb-3 border-b border-[#00674F]/15 flex items-center justify-between">
                <span>Total de la commande</span>
                <span className="text-xs text-[#2D423B]/60 font-semibold">{totalItemsCount} article(s)</span>
              </h2>

              {/* Aperçu rapide des articles */}
              <div className="max-h-48 overflow-y-auto divide-y divide-neutral-100 pr-1 text-xs">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="py-2 flex items-center justify-between gap-2">
                    <span className="truncate pr-2 text-[#2D423B]">
                      {item.quantity}x {item.product.title}
                    </span>
                    <span className="font-bold text-[#00674F] shrink-0">
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>

              {/* Calcul des frais */}
              <div className="space-y-2 pt-3 border-t border-[#00674F]/15 text-xs text-[#2D423B]">
                <div className="flex justify-between">
                  <span>Sous-total :</span>
                  <span className="font-bold">{subtotalEur.toFixed(2)} €</span>
                </div>

                {discountRate > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Remise ({appliedPromo}) :</span>
                    <span>-{discountAmountEur.toFixed(2)} €</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Livraison ({selectedCountry.name}) :</span>
                  <span className={shippingCostEur === 0 ? 'text-emerald-700 font-bold' : 'font-bold'}>
                    {shippingCostEur === 0 ? 'Gratuite' : `${shippingCostEur.toFixed(2)} €`}
                  </span>
                </div>

                <div className="pt-3 border-t-2 border-[#00674F]/20 flex items-baseline justify-between">
                  <div>
                    <span className="block text-sm font-black text-[#00674F]">Montant Total</span>
                    <span className="text-[10px] text-[#2D423B]/60 font-medium">Toutes taxes comprises</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-[#00674F]">
                      {totalEur.toFixed(2)} €
                    </div>
                    <div className="text-xs font-black text-[#FF7518]">
                      ≈ {totalLocal.toLocaleString('fr-FR')} {selectedCountry.symbol}
                    </div>
                  </div>
                </div>
              </div>

              {/* Résumé du moyen sélectionné */}
              <div className="p-3 rounded-xl bg-[#F4F7F5] border border-[#00674F]/15 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D423B]/60 block mb-0.5">
                  Règlement sélectionné :
                </span>
                <span className="font-bold text-[#00674F] flex items-center gap-1.5">
                  {paymentMethod === 'delivery' && (
                    <>
                      <Banknote className="w-4 h-4 text-[#FF7518]" />
                      <span>Paiement à la livraison au coursier</span>
                    </>
                  )}
                  {paymentMethod === 'mobile_money' && (
                    <>
                      <Smartphone className="w-4 h-4 text-[#FF7518]" />
                      <span>Mobile Money ({mobileOperator})</span>
                    </>
                  )}
                  {paymentMethod === 'card' && (
                    <>
                      <CreditCard className="w-4 h-4 text-[#00674F]" />
                      <span>Carte bancaire chiffrée SSL</span>
                    </>
                  )}
                </span>
              </div>

              {/* Bouton de confirmation de commande */}
              <button
                type="submit"
                disabled={isOrdering}
                className="w-full py-4 rounded-2xl bg-[#FF7518] hover:bg-[#E6630D] active:scale-95 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#FF7518]/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {isOrdering ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enregistrement de la commande...</span>
                  </div>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Confirmer et Commander ({totalEur.toFixed(2)} €)</span>
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <span className="text-[10px] text-[#2D423B]/60 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3 text-[#00674F]" />
                  <span>Données confidentielles et chiffrées selon les normes RGPD & Afrique</span>
                </span>
              </div>

            </div>
          </div>

        </div>
      </form>
    </main>
  );
};
