import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Headphones,
  Zap,
  Play,
  Star,
  CheckCircle2,
} from 'lucide-react';

interface BillboardSlide {
  id: number;
  badgeGreen: string;
  badgeOrange: string;
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  ctaText: string;
  visitorsText: string;
  bgImage: string;
  categoryFilter?: string;
}

const BILLBOARD_SLIDES: BillboardSlide[] = [
  {
    id: 1,
    badgeGreen: 'TENDANCE ÉLECTRONIQUE',
    badgeOrange: 'PACK SETUP PRIVILÈGE',
    headlineLine1: 'ÉCOSYSTÈME GAMING &',
    headlineLine2: 'WORKSPACE PRO',
    subheadline:
      'Claviers mécaniques, écrans ultra-légers et supports en bois noble pour un setup parfait et productif.',
    ctaText: 'Voir le matériel pro',
    visitorsText: "Plus de 1 400 visiteurs aujourd'hui",
    bgImage:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=85',
    categoryFilter: 'High-Tech',
  },
  {
    id: 2,
    badgeGreen: 'DESIGN & ART DE VIVRE',
    badgeOrange: 'NOUVELLE COLLECTION 2026',
    headlineLine1: 'MOBILIER ÉPURÉ &',
    headlineLine2: 'ARTISANAT MODERNE',
    subheadline:
      'Luminaires minimalistes, céramiques d’art et pièces en bois précieux conçues par les meilleurs créateurs.',
    ctaText: 'Découvrir la sélection',
    visitorsText: "Plus de 2 150 visiteurs aujourd'hui",
    bgImage:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=85',
    categoryFilter: 'Maison & Décoration',
  },
  {
    id: 3,
    badgeGreen: 'VENTE FLASH DU MOMENT',
    badgeOrange: 'JUSQU’À -40% IMMÉDIAT',
    headlineLine1: 'AUDIO STUDIO PRO &',
    headlineLine2: 'CASQUES SANS FIL',
    subheadline:
      'Immersion sonore absolue, réduction de bruit intelligente et autonomie record pour passionnés et créateurs.',
    ctaText: 'Profiter des offres flash',
    visitorsText: "Plus de 3 800 visiteurs aujourd'hui",
    bgImage:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1920&q=85',
    categoryFilter: 'High-Tech',
  },
];

interface BillboardBannerProps {
  onExplore: (category?: string) => void;
}

export const BillboardBanner: React.FC<BillboardBannerProps> = ({ onExplore }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Rotation automatique douce toutes les 6 secondes
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BILLBOARD_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = BILLBOARD_SLIDES[currentSlide];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + BILLBOARD_SLIDES.length) % BILLBOARD_SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % BILLBOARD_SLIDES.length);
  };

  return (
    <div className="w-full bg-[#F4F7F5]/40 px-3 sm:px-6 lg:px-8 pt-3 pb-4">
      <div className="max-w-7xl mx-auto">
        {/* Bandeau publicitaire clair, lumineux et aéré */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-3xl overflow-hidden bg-white border border-[#00674F]/15 shadow-xl shadow-[#2D423B]/8 select-none group min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex items-center"
        >
          {/* Image de fond lumineuse haute définition */}
          <div className="absolute inset-0">
            <img
              src={slide.bgImage}
              alt={`${slide.headlineLine1} ${slide.headlineLine2}`}
              className="w-full h-full object-cover object-right sm:object-center filter brightness-[1.03] contrast-[1.02] transition-all duration-1000 scale-100 group-hover:scale-[1.02]"
            />

            {/* Dégradé doux ultra-lumineux pour garantir une lisibilité optimale sur fond clair */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 sm:via-white/85 via-50% to-white/10 sm:to-transparent" />
            <div className="absolute inset-y-0 left-0 w-full sm:w-2/3 bg-gradient-to-t from-white/60 via-transparent to-transparent sm:hidden" />

            {/* Trame géométrique et courbe d'accentuation en filigrane clair (inspirée de la référence) */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-[#00674F]/8 via-[#FF7518]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            <svg
              className="absolute top-2 left-4 w-64 h-32 text-[#00674F]/10 pointer-events-none hidden md:block"
              viewBox="0 0 200 100"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="20" cy="20" r="3" fill="currentColor" />
              <path d="M20 20 H80 L110 50 H180" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="110" cy="50" r="2.5" fill="currentColor" />
              <circle cx="180" cy="50" r="3" fill="currentColor" />
            </svg>
          </div>

          {/* Contenu textuel et visuel ultra-lisible (typographie foncée sur fond clair) */}
          <div className="relative z-10 p-5 sm:p-8 lg:p-12 max-w-2xl text-[#2D423B]">
            {/* Badges promo jumeaux (Vert Émeraude + Orange Mandarine avec étoiles) */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black bg-[#00674F] text-white shadow-md shadow-[#00674F]/20 uppercase tracking-wider">
                <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                <span>{slide.badgeGreen}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold bg-[#FF7518]/10 text-[#FF7518] border border-[#FF7518]/40 uppercase tracking-wider">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                <span>{slide.badgeOrange}</span>
              </span>
            </div>

            {/* Titre percutant & massif, noir/graphite élégant (non sombre, très clair et net) */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-[#1E2E29] leading-[1.1]">
              <span className="block">{slide.headlineLine1}</span>
              <span className="block text-[#00674F]">{slide.headlineLine2}</span>
            </h2>

            {/* Sous-titre aéré et naturel */}
            <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm md:text-base text-[#2D423B]/80 max-w-xl font-normal leading-relaxed line-clamp-3 sm:line-clamp-none">
              {slide.subheadline}
            </p>

            {/* Rangée de CTA : Bouton principal + Indicateur visiteurs interactif */}
            <div className="mt-5 sm:mt-8 flex items-center gap-2.5 sm:gap-4 flex-wrap">
              {/* Bouton d'action principal Vert Émeraude avec flèche */}
              <button
                type="button"
                onClick={() => onExplore(slide.categoryFilter)}
                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#00674F] hover:bg-[#00513d] text-white font-extrabold text-xs sm:text-sm md:text-base transition-all duration-200 shadow-lg shadow-[#00674F]/25 hover:shadow-xl hover:shadow-[#00674F]/35 flex items-center gap-2 cursor-pointer active:scale-95 group/btn"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>

              {/* Indicateur de visiteurs du jour (Pilule blanche épurée avec icône play) */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-full bg-white/90 backdrop-blur-md border border-[#00674F]/20 text-[11px] sm:text-sm font-semibold text-[#2D423B] shadow-xs">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#00674F] text-[#00674F] flex items-center justify-center shrink-0">
                  <Play className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-current ml-0.5" />
                </div>
                <span className="truncate">{slide.visitorsText}</span>
              </div>
            </div>

            {/* Bandeau de réassurance / Confiance (Livraison rapide, Produits certifiés, Support) */}
            <div className="mt-6 sm:mt-10 pt-4 sm:pt-5 border-t border-[#00674F]/15 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-[#2D423B]/85">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00674F]/10 text-[#00674F] flex items-center justify-center shrink-0">
                  <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <strong className="block text-[#1E2E29] font-bold text-[11px] sm:text-xs">Livraison rapide</strong>
                  <span className="text-[10px] sm:text-[11px] text-[#2D423B]/60">Partout en Afrique & Monde</span>
                </div>
              </div>

              <div className="h-5 sm:h-6 w-px bg-[#00674F]/15 hidden sm:block" />

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00674F]/10 text-[#00674F] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <strong className="block text-[#1E2E29] font-bold text-[11px] sm:text-xs">Produits certifiés</strong>
                  <span className="text-[10px] sm:text-[11px] text-[#2D423B]/60">100% vendeurs vérifiés</span>
                </div>
              </div>

              <div className="h-5 sm:h-6 w-px bg-[#00674F]/15 hidden md:block" />

              <div className="flex items-center gap-2 hidden md:flex">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00674F]/10 text-[#00674F] flex items-center justify-center shrink-0">
                  <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <strong className="block text-[#1E2E29] font-bold text-[11px] sm:text-xs">Assistance réactive</strong>
                  <span className="text-[10px] sm:text-[11px] text-[#2D423B]/60">Support client 7j/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons de navigation circulaires blancs et lumineux (Gauche / Droite) */}
          <div className="absolute inset-y-0 left-1.5 sm:left-4 flex items-center z-20">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Publicité précédente"
              className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-[#2D423B] hover:text-[#00674F] backdrop-blur-md border border-[#00674F]/15 transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl flex items-center justify-center hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-1.5 sm:right-4 flex items-center z-20">
            <button
              type="button"
              onClick={handleNext}
              aria-label="Publicité suivante"
              className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-[#2D423B] hover:text-[#00674F] backdrop-blur-md border border-[#00674F]/15 transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl flex items-center justify-center hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Pagination inférieure : points et pilule d'avancement élégante */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:left-14 sm:translate-x-0 z-20 flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#00674F]/15 shadow-xs">
            {BILLBOARD_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Aller au slide ${idx + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx
                    ? 'w-7 h-2 bg-[#00674F]'
                    : 'w-2 h-2 bg-[#00674F]/25 hover:bg-[#00674F]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
