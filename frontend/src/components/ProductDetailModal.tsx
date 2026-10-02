import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
  ArrowRight,
} from 'lucide-react';
import { type Product, PRODUCTS_CATALOG } from '../data/products';
import { type Country } from '../data/countries';

interface ProductDetailModalProps {
  product: Product | null;
  selectedCountry: Country;
  isFavorite: boolean;
  onToggleFavorite: (id: number, title: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  selectedCountry,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onBuyNow,
  onClose,
  onSelectProduct,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);

  if (!product) return null;

  // Multi-angle thumbnails generated from product image or styled variations
  const thumbnails = [
    product.image,
    `${product.image}&fit=crop&w=800&q=80`,
    'https://images.unsplash.com/photo-1611591475879-11440d9b4b08?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
  ];

  // Variations (Couleurs / Modèles)
  const variants = [
    { name: 'Modèle Prestige - Or Classique', priceOffset: 0, tag: 'Ensemble 5 chaînes' },
    { name: 'Modèle Corde & Figaro', priceOffset: 2, tag: 'Chaîne double' },
    { name: 'Modèle Maillons Cubains', priceOffset: 4, tag: 'Triple empilage' },
    { name: 'Modèle Épuré Minimaliste', priceOffset: -3, tag: 'Duo délicat' },
  ];

  // Price calculations in EUR and XOF/local currency
  const basePrice = product.price + variants[selectedVariant].priceOffset;
  const originalPrice = Math.round(basePrice * 1.3);
  const discountPercent = 23;
  
  const localPrice = Math.round(basePrice * selectedCountry.rateToEur);
  const originalLocalPrice = Math.round(originalPrice * selectedCountry.rateToEur);

  // Related products from same category
  const relatedProducts = PRODUCTS_CATALOG
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  // Bullets for "À propos de cet article"
  const bulletPoints = [
    {
      title: 'Matériaux certifiés & finitions nobles :',
      desc: 'Conçu avec un placage or 14 carats inaltérable et acier chirurgical résistant à l’eau, aux parfums et à la transpiration.',
    },
    {
      title: 'Design empilable et ajustable :',
      desc: 'Comprend 5 styles intemporels (corde torsadée, cubaine, maille serpent, maillons Figaro et trombones) avec chaînette d’extension pour s’adapter à tous les poignets.',
    },
    {
      title: 'Hypoallergénique & sans nickel :',
      desc: 'Garanti 100% sans plomb, sans nickel ni cadmium pour convenir aux peaux les plus sensibles sans risque d’irritation ou de décoloration verte.',
    },
    {
      title: 'Coffret cadeau prêt à offrir :',
      desc: 'Chaque pièce est méticuleusement vérifiée et emballée dans une élégante pochette en velours siglée iit_store avec carte d’authenticité.',
    },
    {
      title: 'Garantie satisfaction 30 jours :',
      desc: 'Remboursement intégral sans poser de question sous 30 jours si vous n’êtes pas pleinement comblé par votre commande.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#2D423B]/60 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="min-h-screen px-2 sm:px-4 py-6 sm:py-10 flex items-center justify-center">
        <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-[#00674F]/15 overflow-hidden animate-in zoom-in-95">
          {/* Close Button Floating */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/90 hover:bg-[#F4F7F5] border border-[#00674F]/20 text-[#2D423B] hover:text-[#00674F] shadow-md transition-colors cursor-pointer"
            aria-label="Fermer la vue détaillée"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Breadcrumb Header */}
          <div className="px-6 py-3.5 bg-[#F4F7F5] border-b border-[#00674F]/15 text-xs text-[#2D423B]/70 flex items-center gap-1.5 flex-wrap">
            <span className="hover:text-[#00674F] cursor-pointer" onClick={onClose}>Accueil</span>
            <span>›</span>
            <span className="font-semibold text-[#00674F]">{product.category}</span>
            <span>›</span>
            <span className="truncate max-w-xs">{product.seller}</span>
            <span>›</span>
            <span className="font-medium text-[#2D423B] truncate max-w-xs">{product.title}</span>
          </div>

          {/* Main 3-Column Layout: Left Gallery / Middle Info / Right Buy Box */}
          <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne 1 : Galerie Photos (Miniatures verticales + Grande photo) */}
            <div className="lg:col-span-5 flex flex-col-reverse sm:flex-row gap-3.5">
              {/* Miniatures verticales */}
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible shrink-0 pb-1 sm:pb-0">
                {thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#00674F] ring-2 ring-[#00674F]/20'
                        : 'border-[#00674F]/15 hover:border-[#00674F]/50 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumb}
                      alt={`Aperçu ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                    {idx === 4 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                        <Play className="w-4 h-4 fill-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Grande Photo Produit */}
              <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden bg-neutral-50 border border-[#00674F]/15 shadow-inner group">
                <img
                  src={thumbnails[selectedImageIndex] || product.image}
                  alt={product.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge Promotion / Exclusif */}
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#00674F] text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}

                {/* Actions Flottantes Partager & Favoris */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(product.id, product.title)}
                    className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                      isFavorite
                        ? 'bg-[#FF7518] text-white'
                        : 'bg-white/90 text-[#2D423B] hover:text-[#FF7518] hover:bg-white'
                    }`}
                    title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: product.title, url: window.location.href });
                      }
                    }}
                    className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#2D423B] hover:text-[#00674F] shadow-md transition-all cursor-pointer"
                    title="Partager cet article"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Colonne 2 : Description Centrale & "À propos de cet article" */}
            <div className="lg:col-span-4 space-y-4">
              <div>
                <a
                  href="#store"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs font-bold text-[#00674F] hover:underline uppercase tracking-wider"
                >
                  Visitez la boutique officielle {product.seller}
                </a>
                <h1 className="mt-1 text-xl sm:text-2xl font-extrabold text-[#00674F] leading-snug">
                  {product.title}
                </h1>
              </div>

              {/* Note et avis */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center text-[#FF7518]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#FF7518] text-[#FF7518]'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-[#00674F]">{product.rating}</span>
                <span className="text-[#2D423B]/60">({product.reviews} avis vérifiés)</span>
              </div>

              {/* Social Proof */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#00674F]/10 border border-[#00674F]/20 text-xs font-semibold text-[#00674F]">
                <Sparkles className="w-3.5 h-3.5 text-[#00674F]" />
                <span>Plus de <strong>300 unités commandées</strong> le mois dernier</span>
              </div>

              <div className="pt-2 border-t border-[#00674F]/15">
                {/* Prix & Réduction percutante */}
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-xl sm:text-2xl font-black text-[#FF7518]">
                    -{discountPercent}%
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-[#2D423B]/70">{selectedCountry.symbol}</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#00674F]">
                      {localPrice.toLocaleString('fr-FR')}
                    </span>
                  </div>
                  <span className="text-xs text-[#2D423B]/60 font-medium">
                    ({basePrice.toFixed(2)} €)
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#2D423B]/60">
                  Prix d'origine :{' '}
                  <span className="line-through">{originalLocalPrice.toLocaleString('fr-FR')} {selectedCountry.symbol}</span>
                </p>
                <p className="mt-1 text-[11px] text-[#2D423B]/80 font-medium flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#00674F]" />
                  <span>Expédition & dédouanement vers {selectedCountry.name} : Inclus</span>
                </p>
              </div>

              {/* Sélecteur de variations / Couleurs */}
              <div className="pt-2">
                <p className="text-xs font-bold text-[#00674F] uppercase tracking-wider mb-2">
                  Variation : <span className="text-[#2D423B] normal-case">{variants[selectedVariant].name}</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {variants.map((v, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedVariant(idx)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        selectedVariant === idx
                          ? 'border-[#FF7518] bg-[#FF7518]/10 text-[#00674F] font-bold shadow-xs'
                          : 'border-[#00674F]/20 hover:border-[#00674F]/40 bg-white text-[#2D423B]'
                      }`}
                    >
                      <span className="block font-semibold truncate">{v.tag}</span>
                      <span className="block text-[11px] text-[#00674F] mt-0.5">
                        {Math.round((product.price + v.priceOffset) * selectedCountry.rateToEur).toLocaleString('fr-FR')} {selectedCountry.symbol}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION EXACTE DEMANDÉE PAR L'UTILISATEUR : "À PROPOS DE CET ARTICLE" */}
              <div className="pt-4 border-t border-[#00674F]/15">
                <h3 className="text-sm font-extrabold text-[#00674F] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <span>À propos de cet article</span>
                </h3>
                <ul className="space-y-2 text-xs text-[#2D423B] leading-relaxed">
                  {bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#00674F] font-black text-sm leading-none mt-1">•</span>
                      <p>
                        <strong className="text-[#00674F]">{point.title}</strong> {point.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Colonne 3 : Panneau d'Achat (Buy Box Amazon-style) */}
            <div className="lg:col-span-3 bg-[#F4F7F5] border border-[#00674F]/20 rounded-2xl p-5 space-y-4 shadow-sm">
              <div>
                <span className="text-2xl font-black text-[#00674F]">
                  {localPrice.toLocaleString('fr-FR')} {selectedCountry.symbol}
                </span>
                <span className="block text-xs text-[#2D423B]/60 mt-0.5">
                  Soit {(basePrice * quantity).toFixed(2)} € TTC
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#2D423B]">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>En stock immédiat</span>
                </div>

                <div className="flex items-start gap-2 text-xs text-[#2D423B]/80">
                  <MapPin className="w-4 h-4 text-[#00674F] shrink-0 mt-0.5" />
                  <span>
                    Livraison en <strong>{selectedCountry.name}</strong> avec suivi direct
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#2D423B]/80">
                  <Truck className="w-4 h-4 text-[#00674F] shrink-0" />
                  <span>Livraison estimée : <strong>24h à 72h ouvrées</strong></span>
                </div>
              </div>

              {/* Sélecteur de quantité */}
              <div>
                <label className="block text-xs font-bold text-[#00674F] uppercase tracking-wider mb-1.5">
                  Quantité :
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full py-2 px-3 bg-white border border-[#00674F]/25 rounded-xl text-xs font-bold text-[#2D423B] focus:outline-none focus:ring-2 focus:ring-[#FF7518]/30 cursor-pointer shadow-xs"
                >
                  {[1, 2, 3, 4, 5, 10].map((q) => (
                    <option key={q} value={q}>
                      {q} {q === 1 ? 'exemplaire' : 'exemplaires'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Boutons CTA Orange Mandarine (#FF7518) */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => onAddToCart(product, quantity)}
                  className="w-full py-3 px-4 rounded-xl bg-[#FF7518] hover:bg-[#E6630D] active:bg-[#CC540B] text-white font-extrabold text-sm transition-all shadow-md shadow-[#FF7518]/25 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au panier</span>
                </button>

                <button
                  type="button"
                  onClick={() => onBuyNow(product, quantity)}
                  className="w-full py-3 px-4 rounded-xl bg-[#00674F] hover:bg-[#00523F] active:bg-[#003d2e] text-white font-extrabold text-sm transition-all shadow-md shadow-[#00674F]/20 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Acheter maintenant</span>
                </button>
              </div>

              {/* Réassurance boutique */}
              <div className="pt-3 border-t border-[#00674F]/15 space-y-2 text-[11px] text-[#2D423B]/80">
                <div className="flex items-center justify-between">
                  <span className="text-[#2D423B]/60">Expédition depuis :</span>
                  <span className="font-bold text-[#00674F]">iit_store Logistique</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#2D423B]/60">Vendu par :</span>
                  <span className="font-bold text-[#00674F]">{product.seller}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#2D423B]/60">Retours :</span>
                  <span className="font-semibold text-emerald-700">Remboursement sous 30 jours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#2D423B]/60">Paiement :</span>
                  <span className="font-semibold text-[#00674F]">Chiffrement SSL sécurisé</span>
                </div>
              </div>
            </div>

          </div>

          {/* Section Inférieure : "Deals on related products" (Offres associées) */}
          {relatedProducts.length > 0 && (
            <div className="p-6 lg:p-8 border-t border-[#00674F]/15 bg-[#F4F7F5]/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#00674F]">
                    Offres sur les produits associés (Deals on related products)
                  </h3>
                  <p className="text-xs text-[#2D423B]/70">
                    Sélectionnés pour compléter votre commande dans la catégorie <strong>{product.category}</strong>
                  </p>
                </div>
                <span className="text-xs text-[#2D423B]/50 font-mono hidden sm:inline">Sponsorisé</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {relatedProducts.map((rel) => {
                  const relLocalPrice = Math.round(rel.price * selectedCountry.rateToEur);
                  return (
                    <div
                      key={rel.id}
                      onClick={() => {
                        onSelectProduct(rel);
                        setSelectedImageIndex(0);
                        setQuantity(1);
                      }}
                      className="bg-white border border-[#00674F]/15 hover:border-[#FF7518] rounded-xl p-2.5 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100 mb-2">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div>
                        <span className="inline-block text-[9px] font-bold text-white bg-[#FF7518] px-1.5 py-0.5 rounded uppercase">
                          Offre éclair
                        </span>
                        <h4 className="mt-1 text-xs font-bold text-[#2D423B] group-hover:text-[#00674F] line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] text-[#FF7518] font-bold mt-1">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span>{rel.rating}</span>
                        </div>
                      </div>

                      <div className="mt-2 pt-1 border-t border-[#00674F]/10">
                        <span className="font-extrabold text-xs text-[#00674F]">
                          {relLocalPrice.toLocaleString('fr-FR')} {selectedCountry.symbol}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
