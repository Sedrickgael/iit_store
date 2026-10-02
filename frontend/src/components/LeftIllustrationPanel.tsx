import React, { useState } from 'react';
import { Store, ChevronLeft, ChevronRight, ShoppingBag, TrendingUp } from 'lucide-react';
import brightMarketplaceBg from '../assets/images/bright_marketplace_store_1790767363397.jpg';
import sellerStoreBg from '../assets/images/seller_store_workspace_1790767998482.jpg';

export interface LeftIllustrationPanelProps {
  variant?: 'customer' | 'seller';
}

const CUSTOMER_QUOTES = [
  {
    title: 'Marketplace d’Excellence',
    quote: '« La marketplace de référence pour acheter, vendre et dénicher des produits uniques sélectionnés avec exigence. »',
    author: 'Équipe iit_store',
    tag: 'Catalogue certifié',
  },
  {
    title: 'Écosystème Créateurs & Acheteurs',
    quote: '« Une expérience marketplace pensée pour connecter directement créateurs passionnés et acheteurs exigeants en toute confiance. »',
    author: 'Communauté iit_store',
    tag: 'Transactions sécurisées',
  },
  {
    title: 'Innovation & Lifestyle',
    quote: '« Découvrez chaque jour de nouvelles boutiques partenaires et accédez aux meilleures collections exclusives. »',
    author: 'Curateurs iit_store',
    tag: 'Nouvelles arrivées',
  },
];

const SELLER_QUOTES = [
  {
    title: 'Croissance & Ventes',
    quote: '« Développez votre boutique auprès de milliers de clients en Afrique et pilotez vos stocks, commandes et revenus en direct. »',
    author: 'Espace Vendeurs iit_store',
    tag: 'Boutique certifiée',
  },
  {
    title: 'Paiements & Trésorerie',
    quote: '« Encaissez vos ventes en toute tranquillité via Wave, Orange Money et carte avec des versements garantis. »',
    author: 'Finances & Règlements',
    tag: 'Paiements sécurisés',
  },
  {
    title: 'Logistique & Confiance',
    quote: '« De la mise en rayon à la remise en main propre sécurisée par code OTP, votre commerce prend une autre dimension. »',
    author: 'Réseau Partenaires',
    tag: 'Livraison express',
  },
];

export const LeftIllustrationPanel: React.FC<LeftIllustrationPanelProps> = ({
  variant = 'customer',
}) => {
  const isSeller = variant === 'seller';
  const quotes = isSeller ? SELLER_QUOTES : CUSTOMER_QUOTES;
  const currentBg = isSeller ? sellerStoreBg : brightMarketplaceBg;

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const current = quotes[currentQuoteIndex];

  return (
    <div className="relative hidden lg:flex flex-col justify-between w-1/2 min-h-screen overflow-hidden bg-neutral-900 border-r border-neutral-200/20 select-none">
      {/* Concept Store Image (Lumineuse et chaleureuse) */}
      {!imageError ? (
        <img
          src={currentBg}
          alt={isSeller ? "Espace atelier et boutique du marchand iit_store" : "Illustration lumineuse et inspirante de la marketplace iit_store"}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 scale-100 hover:scale-[1.02]"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#00674F] to-[#00382B] flex items-center justify-center">
          <div className="text-center p-8 max-w-sm text-white">
            <Store className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <p className="text-sm font-bold">iit_store Marketplace</p>
          </div>
        </div>
      )}

      {/* Scrim subtil et naturel pour sublimer la clarté de l'image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 pointer-events-none" />

      {/* Top Header - Marque Vert Émeraude & Badge */}
      <div className="relative z-10 p-8 xl:p-12 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-[#0B3B2C]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-500/20 shadow-xl shadow-black/30">
          <div className="w-10 h-10 rounded-xl bg-[#00674F] flex items-center justify-center text-white shadow-md shadow-[#00674F]/40">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white block leading-tight">
              iit_store
            </span>
            <span className="block text-[10px] text-emerald-300 font-bold tracking-widest uppercase mt-0.5">
              {isSeller ? 'Espace Vendeurs' : 'Marketplace'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B3B2C]/90 border border-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-bold shadow-xl shadow-black/20">
          {isSeller ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          ) : (
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          )}
          <span>{isSeller ? 'Boutiques certifiées' : 'Vendeurs vérifiés'}</span>
        </div>
      </div>

      {/* Bottom Inspirational Marketplace Zone (Carte vert émeraude translucide) */}
      <div className="relative z-10 p-8 xl:p-12 max-w-xl">
        <div className="backdrop-blur-xl bg-[#0B3B2C]/90 border border-emerald-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/40 text-white space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-block text-[10px] font-extrabold text-emerald-300 uppercase tracking-widest bg-[#004736] border border-emerald-400/30 px-3 py-1 rounded-full shadow-xs">
              {current.tag}
            </span>
            <div className="flex items-center gap-1.5">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentQuoteIndex(idx)}
                  aria-label={`Aller au message ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentQuoteIndex === idx
                      ? 'w-6 bg-[#FF7518]'
                      : 'w-1.5 bg-white/30 hover:bg-[#FF7518]/70'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-base xl:text-lg font-medium text-white/95 leading-relaxed">
            {current.quote}
          </p>

          <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-between">
            <p className="text-xs font-extrabold text-emerald-300 tracking-wide">
              {current.author}
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevQuote}
                aria-label="Citation précédente"
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white border border-white/10 transition-all cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextQuote}
                aria-label="Citation suivante"
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white border border-white/10 transition-all cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
