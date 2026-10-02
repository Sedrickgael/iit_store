import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Trash2,
  Star,
  Sparkles,
  ArrowRight,
  Share2,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { type Product, PRODUCTS_CATALOG } from '../data/products';
import { type Country } from '../data/countries';

interface FavoritesPageProps {
  favoriteIds: number[];
  selectedCountry: Country;
  onRemoveFavorite: (id: number, title: string) => void;
  onClearAllFavorites: () => void;
  onAddToCart: (product: Product) => void;
  onAddAllToCart: (products: Product[]) => void;
  onBackToShopping: () => void;
  onSelectProduct: (product: Product) => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, desc?: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favoriteIds,
  selectedCountry,
  onRemoveFavorite,
  onClearAllFavorites,
  onAddToCart,
  onAddAllToCart,
  onBackToShopping,
  onSelectProduct,
  onToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');

  // Récupérer les produits complets correspondant aux IDs favoris
  const favoriteProducts = PRODUCTS_CATALOG.filter((p) => favoriteIds.includes(p.id));

  // Catégories présentes dans les favoris
  const categories = ['Tous', ...Array.from(new Set(favoriteProducts.map((p) => p.category)))];

  // Filtrage et Tri
  const displayedProducts = favoriteProducts
    .filter((p) => selectedCategory === 'Tous' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const totalValueEur = favoriteProducts.reduce((sum, p) => sum + p.price, 0);
  const totalValueLocal = Math.round(totalValueEur * selectedCountry.rateToEur);

  const handleShareList = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Ma liste d\x27envies sur iit_store',
        text: `Découvrez mes ${favoriteProducts.length} articles préférés sur iit_store !`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      onToast('info', 'Lien copié', 'Le lien de votre liste d’envies a été copié dans le presse-papier.');
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
      {/* Barre supérieure avec navigation et actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            type="button"
            onClick={onBackToShopping}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00674F] hover:text-[#FF7518] transition-colors mb-2 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Retourner au catalogue complet</span>
          </button>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-[#00674F]">Mes Favoris & Liste d'Envies</h1>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#FF7518]/15 text-[#FF7518] border border-[#FF7518]/30">
              {favoriteProducts.length} coup{favoriteProducts.length > 1 ? 's' : ''} de cœur
            </span>
          </div>
        </div>

        {favoriteProducts.length > 0 && (
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={handleShareList}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#00674F]/20 hover:border-[#00674F] text-xs font-bold text-[#2D423B] hover:text-[#00674F] transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5 text-[#00674F]" />
              <span>Partager ma liste</span>
            </button>

            <button
              type="button"
              onClick={() => onAddAllToCart(favoriteProducts)}
              className="px-4 py-2 rounded-xl bg-[#FF7518] hover:bg-[#E6630D] text-white text-xs font-black transition-all shadow-md shadow-[#FF7518]/25 cursor-pointer flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Tout ajouter au panier</span>
            </button>

            <button
              type="button"
              onClick={onClearAllFavorites}
              className="p-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
              title="Vider tous les favoris"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {favoriteProducts.length === 0 ? (
        /* État Favoris Vide */
        <div className="bg-white rounded-3xl border border-[#00674F]/15 p-12 text-center shadow-sm max-w-2xl mx-auto my-12 space-y-6">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-[#F4F7F5] border-2 border-dashed border-[#FF7518]/30 flex items-center justify-center text-[#FF7518]">
            <Heart className="w-12 h-12 stroke-1" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#00674F]">Vous n'avez aucun favori pour le moment</h2>
            <p className="mt-2 text-sm text-[#2D423B]/70 max-w-md mx-auto">
              Cliquez sur le petit cœur présent sur les fiches produits pour sauvegarder vos articles favoris et les retrouver à tout moment.
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToShopping}
            className="px-8 py-3.5 rounded-2xl bg-[#00674F] hover:bg-[#00523F] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#00674F]/20 cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Découvrir les articles de la boutique</span>
          </button>
        </div>
      ) : (
        /* Liste des favoris */
        <div className="space-y-6">
          {/* Barre de filtres et d'ordre */}
          <div className="bg-[#F4F7F5] border border-[#00674F]/15 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Filtres par catégorie */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#00674F] text-white shadow-xs'
                      : 'bg-white text-[#2D423B] border border-[#00674F]/15 hover:border-[#00674F]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tri & Valeur Totale */}
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
              <div className="text-xs text-[#2D423B]/70 hidden md:block">
                Valeur cumulée : <strong className="text-[#00674F]">{totalValueEur.toFixed(2)} €</strong> ({totalValueLocal.toLocaleString('fr-FR')} {selectedCountry.symbol})
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF7518]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="py-1.5 px-3 bg-white border border-[#00674F]/25 rounded-xl text-xs font-bold text-[#2D423B] focus:outline-none focus:ring-2 focus:ring-[#FF7518]/20 cursor-pointer shadow-xs"
                >
                  <option value="default">Ordre d'ajout</option>
                  <option value="price-asc">Prix : croissant</option>
                  <option value="price-desc">Prix : décroissant</option>
                  <option value="rating">Meilleures notes</option>
                </select>
              </div>
            </div>

          </div>

          {/* Grille des cartes Favoris (4 colonnes) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => {
              const localPrice = Math.round(product.price * selectedCountry.rateToEur);

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="bg-white border border-[#00674F]/15 hover:border-[#FF7518] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Image avec badges et bouton supprimer */}
                  <div className="relative aspect-square overflow-hidden bg-neutral-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-[#00674F] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                        {product.badge}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFavorite(product.id, product.title);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-red-500 hover:text-red-700 shadow-md transition-all cursor-pointer"
                      title="Retirer des favoris"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Corps de la carte */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#00674F] uppercase tracking-wider mb-1">
                        <span>{product.category}</span>
                        <span className="text-[#2D423B]/60 font-semibold">{product.seller}</span>
                      </div>

                      <h3 className="text-sm font-extrabold text-[#00674F] group-hover:text-[#FF7518] transition-colors line-clamp-2 leading-snug">
                        {product.title}
                      </h3>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-[#FF7518]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-extrabold">{product.rating}</span>
                        <span className="text-[#2D423B]/60">({product.reviews} avis)</span>
                      </div>
                    </div>

                    {/* Prix et Bouton Ajouter au Panier */}
                    <div className="mt-4 pt-3 border-t border-[#00674F]/10 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-lg font-black text-[#00674F]">
                          {product.price.toFixed(2)} €
                        </span>
                        <span className="block text-[11px] font-bold text-[#FF7518]">
                          {localPrice.toLocaleString('fr-FR')} {selectedCountry.symbol}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="px-3.5 py-2.5 rounded-xl bg-[#FF7518] hover:bg-[#E6630D] text-white font-extrabold text-xs transition-all shadow-md shadow-[#FF7518]/25 cursor-pointer flex items-center gap-1.5 active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Ajouter</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
};
