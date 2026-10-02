import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Store,
  Search,
  Heart,
  ShoppingBag,
  User,
  X,
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  SlidersHorizontal,
  RotateCcw,
  Globe,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  CreditCard,
  Menu,
  Phone,
  LogOut,
  LayoutDashboard,
  Package,
} from 'lucide-react';
import { BillboardBanner } from './BillboardBanner';
import { ProductDetailModal } from './ProductDetailModal';
import { CartPage } from './CartPage';
import { FavoritesPage } from './FavoritesPage';
import { LegalSecurityPage } from './LegalSecurityPage';
import { BecomeSellerPage } from './BecomeSellerPage';
import { SellerDashboard } from './SellerDashboard';
import { OrderTrackingPage } from './OrderTrackingPage';
import { FaqPage } from './FaqPage';
import { Footer } from './Footer';
import { PRODUCTS_CATALOG, CATEGORIES, type Product } from '../data/products';
import { WEST_AFRICAN_COUNTRIES, type Country } from '../data/countries';

interface HomePageProps {
  onGoToLogin: () => void;
  onGoToSellerLogin?: () => void;
  onGoToSellerDashboard?: () => void;
  onGoToCustomerDashboard?: (tab?: 'dashboard' | 'orders' | 'deliveries' | 'wallet' | 'profile') => void;
  isLoggedIn: boolean;
  userEmail?: string;
  onLogout?: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, desc?: string) => void;
  initialTab?: 'catalog' | 'cart' | 'favorites' | 'legal-security' | 'become-seller' | 'order-tracking' | 'faq' | 'seller-dashboard';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Nombre d'articles par page par défaut (80 articles par page)
const DEFAULT_ITEMS_PER_PAGE = 80;

export const HomePage: React.FC<HomePageProps> = ({
  onGoToLogin,
  onGoToSellerLogin,
  onGoToSellerDashboard,
  onGoToCustomerDashboard,
  isLoggedIn,
  userEmail,
  onLogout,
  onToast,
  initialTab,
}) => {
  const [currentTab, setCurrentTab] = useState<'catalog' | 'cart' | 'favorites' | 'legal-security' | 'become-seller' | 'order-tracking' | 'faq' | 'seller-dashboard'>(initialTab || 'catalog');

  useEffect(() => {
    if (initialTab) {
      setCurrentTab(initialTab);
    }
  }, [initialTab]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(DEFAULT_ITEMS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Catégories');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Sélecteur de pays (Tous les pays + Afrique de l'Ouest)
  const [selectedCountry, setSelectedCountry] = useState<Country>(WEST_AFRICAN_COUNTRIES[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  // Menu Hamburger Mobile & Recherche Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Panier interactif avec Dropdown
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS_CATALOG[0], quantity: 1 },
    { product: PRODUCTS_CATALOG[2], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Critères de recherche (Volet latéral déclenché par le bouton rond noir avec chevron >)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<'all' | 'under50' | '50-150' | '150-300' | 'over300'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([1, 3, 8]);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const dropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  const cartHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const favoritesDropdownRef = useRef<HTMLDivElement>(null);
  const favoritesHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsCategoryOpen(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(target)) {
        setIsCountryOpen(false);
      }
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(target)) {
        setIsCartOpen(false);
      }
      if (favoritesDropdownRef.current && !favoritesDropdownRef.current.contains(target)) {
        setIsFavoritesOpen(false);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Bloquer le défilement de l'arrière-plan quand le menu hamburger mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Total items in cart
  // Favoris complets pour dropdown et page
  const favoriteProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((p) => favoriteIds.includes(p.id));
  }, [favoriteIds]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Total amount in cart
  const totalCartAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  // Nombre d'articles par catégorie
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    counts['Catégories'] = PRODUCTS_CATALOG.length;
    PRODUCTS_CATALOG.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Y a-t-il des critères actifs ?
  const hasActiveCustomFilters = useMemo(() => {
    return (
      selectedCategory !== 'Catégories' ||
      searchQuery.trim() !== '' ||
      priceRange !== 'all' ||
      minRating > 0 ||
      selectedBadge !== null
    );
  }, [selectedCategory, searchQuery, priceRange, minRating, selectedBadge]);

  // Réinitialiser tous les critères
  const handleResetAllCriteria = () => {
    setSelectedCategory('Catégories');
    setSearchQuery('');
    setPriceRange('all');
    setMinRating(0);
    setSelectedBadge(null);
    setCurrentPage(1);
    onToast('info', 'Critères réinitialisés', 'Tous les filtres ont été réinitialisés.');
  };

  // Filter and sort products en fonction de l'article et sa catégorie
  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((product) => {
      const matchCategory =
        selectedCategory === 'Catégories' ||
        product.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        product.title.toLowerCase().includes(q) ||
        product.seller.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);

      let matchPrice = true;
      if (priceRange === 'under50') matchPrice = product.price < 50;
      else if (priceRange === '50-150') matchPrice = product.price >= 50 && product.price <= 150;
      else if (priceRange === '150-300') matchPrice = product.price > 150 && product.price <= 300;
      else if (priceRange === 'over300') matchPrice = product.price > 300;

      const matchRating = minRating === 0 || product.rating >= minRating;
      const matchBadge = !selectedBadge || product.badge === selectedBadge;

      return matchCategory && matchSearch && matchPrice && matchRating && matchBadge;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id;
    });
  }, [selectedCategory, searchQuery, sortBy, priceRange, minRating, selectedBadge]);

  // Total pages avec le nombre d'articles configuré (80 articles par page)
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  // Reset to page 1 whenever search, category, sort or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy, priceRange, minRating, selectedBadge, itemsPerPage]);

  // Current page items (80 articles par page)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onToast(
        'info',
        'Recherche effectuée',
        `${filteredProducts.length} produit(s) trouvé(s) pour "${searchQuery}"`
      );
      catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFavorite = (productId: number, productTitle: string) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        onToast('info', 'Favoris', `"${productTitle}" a été retiré de vos favoris.`);
        return prev.filter((id) => id !== productId);
      } else {
        onToast('success', 'Favoris', `"${productTitle}" a été ajouté à vos favoris.`);
        return [...prev, productId];
      }
    });
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.product.id === product.id);
      if (index > -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantity: updated[index].quantity + 1 };
        return updated;
      }
      return [...prev, { product, quantity: 1 }];
    });

    onToast(
      'success',
      'Ajout au panier',
      `"${product.title}" (${product.price.toFixed(2)} €) a été ajouté.`
    );
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: number, productTitle: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    onToast('info', 'Article retiré', `"${productTitle}" a été retiré du panier.`);
  };

  const handleClearCart = () => {
    setCartItems([]);
    onToast('info', 'Panier vidé', 'Tous les articles ont été retirés.');
  };

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryOpen(false);
    onToast(
      'success',
      'Zone de livraison',
      country.code === 'ALL'
        ? 'Affichage de tous les pays et devises.'
        : `Livraison configurée pour ${country.name} (${country.flag} ${country.currency} / ${country.symbol}).`
    );
  };

  const scrollToCatalog = () => {
    if (catalogRef.current) {
      const headerOffset = 95;
      const elementPosition = catalogRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    scrollToCatalog();
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#2D423B] flex flex-col justify-between">
      {/* Barre de navigation Marketplace FIXE */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#00674F]/15 shadow-xs transform-gpu will-change-transform">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Gauche : Logo Terracotta Doux (#00674F) */}
          <div onClick={() => { setCurrentTab("catalog"); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 sm:gap-3 shrink-0 cursor-pointer group" title="Retour à l'accueil">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00674F] text-white flex items-center justify-center shadow-md shadow-[#00674F]/20">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl sm:text-2xl text-[#00674F] tracking-tight">
                iit_store
              </span>
              <span className="block text-[9px] sm:text-[10px] text-[#2D423B]/70 font-bold uppercase tracking-wider">
                Marketplace
              </span>
            </div>
          </div>

            {/* LIEN TOUS LES PAYS avec DROPDOWN au fond Terracotta (#00674F) - DESKTOP SEULEMENT */}
            <div className="hidden lg:block relative shrink-0" ref={countryDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsCountryOpen((prev) => !prev);
                  setIsCategoryOpen(false);
                  setIsCartOpen(false);
                }}
                className="flex items-center gap-1.5 py-1 text-xs sm:text-sm font-medium text-[#2D423B] hover:text-[#00674F] transition-colors cursor-pointer select-none hover:underline underline-offset-4"
                aria-expanded={isCountryOpen}
                aria-haspopup="listbox"
                title="Sélectionner le pays"
              >
                <span>{selectedCountry.code === 'ALL' ? 'Tous les pays' : selectedCountry.name}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#2D423B]/60 transition-transform duration-200 shrink-0 ${
                    isCountryOpen ? 'rotate-180 text-[#00674F]' : ''
                  }`}
                />
              </button>

              {/* Menu déroulant simple au fond Terracotta Doux */}
              {isCountryOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-52 bg-[#00674F] text-white rounded-xl shadow-xl py-1 z-50 animate-in fade-in"
                  role="listbox"
                >
                  <div className="max-h-64 overflow-y-auto">
                    {WEST_AFRICAN_COUNTRIES.map((c) => {
                      const isSelected = selectedCountry.code === c.code;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectCountry(c)}
                          className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-black/20 font-bold text-white'
                              : 'text-white/90 hover:bg-white/15 hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span>{c.flag}</span>
                            <span className="truncate">{c.name}</span>
                          </span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          {/* Centre : Barre de recherche avec Dropdown Catégories (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-xl lg:max-w-2xl mx-1 sm:mx-2">
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full flex items-center bg-[#F4F7F5] hover:bg-white border border-[#00674F]/25 focus-within:border-[#FF7518] focus-within:bg-white rounded-full transition-all shadow-inner focus-within:ring-2 focus-within:ring-[#FF7518]/20"
            >
              {/* Dropdown Catégories */}
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsCategoryOpen((prev) => !prev);
                    setIsCountryOpen(false);
                    setIsCartOpen(false);
                  }}
                  className="flex items-center gap-1.5 pl-3.5 sm:pl-4 pr-2.5 sm:pr-3 py-2.5 text-xs font-bold text-[#2D423B] hover:text-[#00674F] hover:bg-[#00674F]/10 rounded-l-full transition-colors cursor-pointer border-r border-[#00674F]/20 select-none"
                  aria-expanded={isCategoryOpen}
                  aria-haspopup="listbox"
                  title="Sélectionner une catégorie"
                >
                  <span className="max-w-[70px] sm:max-w-[120px] truncate">
                    {selectedCategory}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#2D423B]/60 transition-transform duration-200 shrink-0 ${
                      isCategoryOpen ? 'rotate-180 text-[#00674F]' : ''
                    }`}
                  />
                </button>

                {/* Menu déroulant des catégories */}
                {isCategoryOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-60 bg-white border border-[#00674F]/20 rounded-2xl shadow-xl shadow-[#2D423B]/10 py-1.5 z-50 animate-in fade-in zoom-in-95"
                    role="listbox"
                  >
                    <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#2D423B]/50 border-b border-neutral-100">
                      Catégories marketplace
                    </div>
                    <div className="max-h-64 overflow-y-auto py-1">
                      {CATEGORIES.map((cat) => {
                        const isSelected = selectedCategory === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsCategoryOpen(false);
                              scrollToCatalog();
                            }}
                            className={`w-full text-left px-3.5 py-2 text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-[#00674F]/15 text-[#00674F] font-bold'
                                : 'text-[#2D423B] hover:bg-[#F4F7F5] hover:text-[#00674F]'
                            }`}
                          >
                            <span className="truncate pr-2">{cat}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-[#00674F] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Champ texte de recherche */}
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    selectedCategory === 'Catégories'
                      ? 'Rechercher un produit, une marque, un vendeur...'
                      : `Rechercher dans ${selectedCategory}...`
                  }
                  className="w-full pl-3 pr-8 py-2.5 bg-transparent text-sm text-[#2D423B] placeholder-[#2D423B]/50 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 p-1 text-[#2D423B]/50 hover:text-[#00674F] rounded-full"
                    aria-label="Effacer la recherche"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Bouton Loupe de recherche Ocre Lumineux (#FF7518) */}
              <button
                type="submit"
                aria-label="Lancer la recherche"
                className="shrink-0 mr-1.5 p-2 rounded-full bg-[#FF7518] hover:bg-[#E6630D] text-white transition-colors cursor-pointer shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Droite Desktop : Favoris, Panier avec Dropdown, Login */}
          <div className="hidden lg:flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* FAVORIS AVEC DROPDOWN AU SURVOL (HOVER) ET CLIC REDIRIGEANT VERS LA PAGE FAVORIS */}
            <div
              className="relative shrink-0"
              ref={favoritesDropdownRef}
              onMouseEnter={() => {
                if (favoritesHoverTimeoutRef.current) {
                  clearTimeout(favoritesHoverTimeoutRef.current);
                  favoritesHoverTimeoutRef.current = null;
                }
                setIsFavoritesOpen(true);
              }}
              onMouseLeave={() => {
                favoritesHoverTimeoutRef.current = setTimeout(() => {
                  setIsFavoritesOpen(false);
                }, 250);
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsFavoritesOpen(false);
                  setIsCartOpen(false);
                  setCurrentTab("favorites");
                }}
                aria-label="Accéder à mes favoris"
                title="Accéder à la page favoris"
                className={`relative p-2.5 rounded-full transition-all cursor-pointer group ${
                  currentTab === "favorites"
                    ? "bg-[#FF7518] text-white shadow-sm"
                    : isFavoritesOpen
                    ? "bg-[#FF7518]/15 text-[#FF7518]"
                    : "hover:bg-[#00674F]/10 text-[#2D423B] hover:text-[#00674F]"
                }`}
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {favoriteIds.length > 0 && (
                  <span
                    className={`absolute top-1 right-1 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs transition-colors ${
                      currentTab === "favorites" ? "bg-white text-[#FF7518]" : "bg-[#FF7518] text-white"
                    }`}
                  >
                    {favoriteIds.length}
                  </span>
                )}
              </button>

              {/* DROPDOWN DES FAVORIS AU HOVER */}
              {isFavoritesOpen && (
                <div
                  onMouseEnter={() => {
                    if (favoritesHoverTimeoutRef.current) {
                      clearTimeout(favoritesHoverTimeoutRef.current);
                      favoritesHoverTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={() => {
                    favoritesHoverTimeoutRef.current = setTimeout(() => {
                      setIsFavoritesOpen(false);
                    }, 250);
                  }}
                  className="absolute top-full right-0 mt-1 w-80 sm:w-96 bg-white border border-[#00674F]/20 rounded-3xl shadow-2xl shadow-[#2D423B]/15 overflow-hidden z-50 animate-in fade-in zoom-in-95"
                >
                  {/* Entête du dropdown favoris */}
                  <div className="px-4 py-3 bg-[#F4F7F5] border-b border-[#00674F]/15 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#FF7518] text-white flex items-center justify-center shadow-xs">
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-[#2D423B]">Mes Favoris</h4>
                        <span className="text-[11px] text-[#2D423B]/60 font-medium">
                          {favoriteProducts.length} article{favoriteProducts.length > 1 ? "s" : ""} enregistré{favoriteProducts.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFavoritesOpen(false)}
                      className="p-1 rounded-lg text-[#2D423B]/50 hover:text-[#00674F] hover:bg-[#00674F]/10 transition-colors"
                      aria-label="Fermer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Corps du dropdown : liste des favoris */}
                  <div className="max-h-72 overflow-y-auto p-3 divide-y divide-neutral-100">
                    {favoriteProducts.length === 0 ? (
                      <div className="py-8 px-4 text-center">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F4F7F5] flex items-center justify-center text-[#2D423B]/40 mb-2.5">
                          <Heart className="w-6 h-6 stroke-1" />
                        </div>
                        <p className="text-sm font-bold text-[#2D423B]">Aucun favori pour le moment</p>
                        <p className="text-xs text-[#2D423B]/60 mt-0.5">
                          Cliquez sur le cœur d'un article pour le sauvegarder ici.
                        </p>
                      </div>
                    ) : (
                      favoriteProducts.slice(0, 5).map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            setSelectedDetailProduct(product);
                            setIsFavoritesOpen(false);
                          }}
                          className="py-2.5 flex items-center gap-3 first:pt-0 last:pb-0 hover:bg-[#F4F7F5]/50 px-2 rounded-xl transition-colors cursor-pointer group"
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-13 h-13 rounded-xl object-cover border border-neutral-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-[#2D423B] group-hover:text-[#FF7518] truncate transition-colors">
                              {product.title}
                            </h5>
                            <span className="text-[11px] text-[#2D423B]/60 block truncate">
                              {product.seller} • {product.category}
                            </span>
                            <span className="text-xs font-black text-[#00674F]">
                              {product.price.toFixed(2)} €
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className="p-2 rounded-xl bg-[#FF7518]/15 hover:bg-[#FF7518] text-[#FF7518] hover:text-white transition-all cursor-pointer"
                            title="Ajouter au panier"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Pied du dropdown favoris avec redirection vers la page solitaire */}
                  <div className="p-3 bg-[#F4F7F5] border-t border-[#00674F]/15">
                    <button
                      type="button"
                      onClick={() => {
                        setIsFavoritesOpen(false);
                        setCurrentTab("favorites");
                      }}
                      className="w-full py-2.5 rounded-2xl bg-[#FF7518] hover:bg-[#E6630D] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#FF7518]/25 transition-all cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>Accéder à ma page favoris complète</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* PANIER AVEC DROPDOWN AU SURVOL (HOVER) ET CLIC REDIRIGEANT VERS LA PAGE PANIER */}
            <div
              className="relative shrink-0"
              ref={cartDropdownRef}
              onMouseEnter={() => {
                if (cartHoverTimeoutRef.current) {
                  clearTimeout(cartHoverTimeoutRef.current);
                  cartHoverTimeoutRef.current = null;
                }
                setIsCartOpen(true);
              }}
              onMouseLeave={() => {
                cartHoverTimeoutRef.current = setTimeout(() => {
                  setIsCartOpen(false);
                }, 250);
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentTab('cart');
                }}
                aria-label="Accéder à mon panier"
                title="Accéder à la page panier"
                className={`relative p-2.5 rounded-full transition-all cursor-pointer group ${
                  currentTab === 'cart'
                    ? 'bg-[#00674F] text-white shadow-sm'
                    : isCartOpen
                    ? 'bg-[#00674F]/10 text-[#00674F]'
                    : 'hover:bg-[#00674F]/10 text-[#2D423B] hover:text-[#00674F]'
                }`}
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalCartCount > 0 && (
                  <span
                    className={`absolute top-1 right-1 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs transition-colors ${
                      currentTab === 'cart' ? 'bg-white text-[#00674F]' : 'bg-[#FF7518] text-white'
                    }`}
                  >
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* DROPDOWN DU PANIER AU HOVER */}
              {isCartOpen && (
                <div
                  onMouseEnter={() => {
                    if (cartHoverTimeoutRef.current) {
                      clearTimeout(cartHoverTimeoutRef.current);
                      cartHoverTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={() => {
                    cartHoverTimeoutRef.current = setTimeout(() => {
                      setIsCartOpen(false);
                    }, 250);
                  }}
                  className="absolute top-full right-0 mt-1 w-80 sm:w-96 bg-white border border-[#00674F]/20 rounded-3xl shadow-2xl shadow-[#2D423B]/15 overflow-hidden z-50 animate-in fade-in zoom-in-95"
                >
                  {/* Entête du dropdown panier */}
                  <div className="px-4 py-3 bg-[#F4F7F5] border-b border-[#00674F]/15 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#00674F] text-white flex items-center justify-center shadow-xs">
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-[#2D423B]">Mon Panier</h4>
                        <span className="text-[11px] text-[#2D423B]/60 font-medium">
                          {totalCartCount} article{totalCartCount > 1 ? 's' : ''} sélectionné{totalCartCount > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {cartItems.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearCart}
                          className="text-[11px] text-[#00674F] hover:underline px-2 py-1 rounded hover:bg-[#00674F]/10 font-semibold cursor-pointer"
                        >
                          Vider
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="p-1 rounded-lg text-[#2D423B]/50 hover:text-[#00674F] hover:bg-[#00674F]/10 transition-colors"
                        aria-label="Fermer le panier"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Corps du dropdown : liste des articles */}
                  <div className="max-h-72 overflow-y-auto p-3 divide-y divide-neutral-100">
                    {cartItems.length === 0 ? (
                      <div className="py-8 px-4 text-center">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F4F7F5] flex items-center justify-center text-[#2D423B]/40 mb-2.5">
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-[#2D423B]">Votre panier est vide</p>
                        <p className="text-xs text-[#2D423B]/60 mt-0.5">
                          Ajoutez des produits pour commencer vos achats.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setIsCartOpen(false);
                            scrollToCatalog();
                          }}
                          className="mt-3.5 px-4 py-2 rounded-xl bg-[#FF7518] text-white text-xs font-bold hover:bg-[#E6630D] transition-all cursor-pointer shadow-sm"
                        >
                          Voir le catalogue
                        </button>
                      </div>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item.product.id} className="py-2.5 flex items-center gap-3 first:pt-0 last:pb-0">
                          {/* Miniature de l'article */}
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-14 h-14 rounded-xl object-cover object-center border border-neutral-100 shrink-0"
                          />

                          {/* Infos produit */}
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-[#2D423B] truncate">
                              {item.product.title}
                            </h5>
                            <span className="text-[11px] text-[#2D423B]/60 block truncate">
                              {item.product.category}
                            </span>
                            <span className="text-xs font-extrabold text-[#00674F] mt-0.5 block">
                              {(item.product.price * item.quantity).toFixed(2)} €
                            </span>
                          </div>

                          {/* Contrôle de quantité */}
                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleRemoveFromCart(item.product.id, item.product.title)}
                              className="text-[#2D423B]/40 hover:text-rose-500 p-0.5 transition-colors cursor-pointer"
                              title="Supprimer du panier"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="flex items-center border border-[#00674F]/20 rounded-lg bg-[#F4F7F5] px-1 py-0.5">
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(item.product.id, -1)}
                                className="p-0.5 text-[#2D423B] hover:text-[#00674F] cursor-pointer"
                                aria-label="Diminuer quantité"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-[#2D423B]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(item.product.id, 1)}
                                className="p-0.5 text-[#2D423B] hover:text-[#00674F] cursor-pointer"
                                aria-label="Augmenter quantité"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Pied du panier avec Total et Bouton de commande Ocre Lumineux (#FF7518) */}
                  {cartItems.length > 0 && (
                    <div className="p-4 bg-[#F4F7F5] border-t border-[#00674F]/15">
                      <div className="flex items-center justify-between text-xs text-[#2D423B]/70 mb-1">
                        <span>Sous-total</span>
                        <span>{totalCartAmount.toFixed(2)} €</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#2D423B]/70 mb-2">
                        <span className="flex items-center gap-1">
                          <span>Livraison ({selectedCountry.name})</span>
                          <span>{selectedCountry.flag}</span>
                        </span>
                        <span className="text-emerald-600 font-bold">Gratuite</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#00674F]/15 mb-3">
                        <span className="text-sm font-extrabold text-[#2D423B]">Total TTC</span>
                        <div className="text-right">
                          <span className="text-base font-black text-[#00674F]">
                            {totalCartAmount.toFixed(2)} €
                          </span>
                          {selectedCountry.code !== 'ALL' && (
                            <span className="block text-[10px] text-[#2D423B]/60 font-medium">
                              ≈ {(totalCartAmount * selectedCountry.rateToEur).toLocaleString('fr-FR', {
                                maximumFractionDigits: 0,
                              })}{' '}
                              {selectedCountry.symbol}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsCartOpen(false);
                          setCurrentTab("cart");
                        }}
                        className="w-full py-3 rounded-2xl bg-[#FF7518] hover:bg-[#E6630D] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF7518]/30 transition-all duration-200 cursor-pointer active:scale-95"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Passer la commande</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-[#00674F]/20 mx-1 hidden sm:block" />

            {/* Bouton Connexion / Mon Compte avec Dropdown quand connecté */}
            {!isLoggedIn ? (
              <button
                type="button"
                onClick={onGoToLogin}
                aria-label="Se connecter"
                title="Accéder à la connexion"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FF7518]/15 hover:bg-[#FF7518] text-[#2D423B] hover:text-white border border-[#FF7518]/30 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-xs group"
              >
                <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Connexion</span>
              </button>
            ) : (
              <div className="relative shrink-0" ref={accountDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsAccountOpen((prev) => !prev);
                    setIsCartOpen(false);
                    setIsFavoritesOpen(false);
                    setIsCountryOpen(false);
                    setIsCategoryOpen(false);
                  }}
                  aria-expanded={isAccountOpen}
                  aria-haspopup="menu"
                  title={`Mon Compte (${userEmail})`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-xs select-none ${
                    isAccountOpen
                      ? 'bg-[#00674F] text-white border border-[#00674F]'
                      : 'bg-[#00674F]/10 hover:bg-[#00674F] text-[#00674F] hover:text-white border border-[#00674F]/25'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Mon Compte</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isAccountOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu : Dashboard, Commandes, Déconnexion */}
                {isAccountOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-64 bg-white border border-[#00674F]/20 rounded-2xl shadow-xl shadow-[#2D423B]/15 overflow-hidden z-50 animate-in fade-in zoom-in-95"
                    role="menu"
                  >
                    {/* En-tête statut utilisateur */}
                    <div className="px-4 py-3 bg-[#F4F7F5] border-b border-[#00674F]/15">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#00674F] uppercase tracking-wider">
                          Espace Membre
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs font-black text-[#2D423B] truncate mt-0.5">
                        {userEmail || 'Client iit_store'}
                      </p>
                    </div>

                    {/* Liste des actions : Dashboard, Commandes, Déconnexion */}
                    <div className="p-1.5 space-y-1">
                      {/* 1. Dashboard */}
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setIsAccountOpen(false);
                          if (onGoToCustomerDashboard) {
                            onGoToCustomerDashboard('dashboard');
                          } else if (onGoToSellerDashboard) {
                            onGoToSellerDashboard();
                          } else {
                            setCurrentTab('seller-dashboard');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#00674F]/10 text-left transition-colors cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#00674F]/10 text-[#00674F] group-hover:bg-[#00674F] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                          <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-extrabold text-[#2D423B] group-hover:text-[#00674F] block">
                            Dashboard
                          </span>
                          <span className="text-[10px] text-[#2D423B]/60 block truncate">
                            Accéder à votre espace
                          </span>
                        </div>
                      </button>

                      {/* 2. Commandes */}
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setIsAccountOpen(false);
                          if (onGoToCustomerDashboard) {
                            onGoToCustomerDashboard('orders');
                          } else {
                            setCurrentTab('order-tracking');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FF7518]/10 text-left transition-colors cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#FF7518]/10 text-[#FF7518] group-hover:bg-[#FF7518] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                          <Package className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-extrabold text-[#2D423B] group-hover:text-[#FF7518] block">
                            Commandes
                          </span>
                          <span className="text-[10px] text-[#2D423B]/60 block truncate">
                            Suivi des colis et achats
                          </span>
                        </div>
                      </button>

                      <div className="h-px bg-neutral-100 my-1" />

                      {/* 3. Déconnexion */}
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setIsAccountOpen(false);
                          onLogout?.();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-rose-50 text-left transition-colors cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                          <LogOut className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-extrabold text-rose-600 block">
                            Déconnexion
                          </span>
                          <span className="text-[10px] text-rose-400 block">
                            Fermer votre session
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions Droite Mobile (< lg) avec Loupe, Favoris, Panier et Hamburger */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-2 shrink-0">
            {/* Loupe recherche mobile */}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen((prev) => !prev)}
              aria-label="Recherche"
              title="Rechercher un produit"
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isMobileSearchOpen
                  ? 'bg-[#FF7518] text-white shadow-xs'
                  : 'hover:bg-[#00674F]/10 text-[#2D423B] hover:text-[#00674F]'
              }`}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favoris Mobile */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setCurrentTab("favorites");
              }}
              aria-label="Mes favoris"
              title="Mes favoris"
              className={`relative p-2 rounded-xl transition-all cursor-pointer ${
                currentTab === 'favorites'
                  ? 'bg-[#FF7518] text-white shadow-xs'
                  : 'hover:bg-[#00674F]/10 text-[#2D423B] hover:text-[#00674F]'
              }`}
            >
              <Heart className="w-5 h-5" />
              {favoriteIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-[#FF7518] text-white rounded-full flex items-center justify-center shadow-xs">
                  {favoriteIds.length}
                </span>
              )}
            </button>

            {/* Panier Mobile */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setCurrentTab("cart");
              }}
              aria-label="Mon panier"
              title="Mon panier"
              className={`relative p-2 rounded-xl transition-all cursor-pointer ${
                currentTab === 'cart'
                  ? 'bg-[#00674F] text-white shadow-xs'
                  : 'hover:bg-[#00674F]/10 text-[#2D423B] hover:text-[#00674F]'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-[#00674F] text-white rounded-full flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* BOUTON HAMBURGER MOBILE */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu de navigation"}
              aria-expanded={isMobileMenuOpen}
              className={`p-2 sm:p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                isMobileMenuOpen
                  ? 'bg-[#00674F] text-white shadow-md'
                  : 'bg-[#00674F]/10 hover:bg-[#00674F] text-[#00674F] hover:text-white'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[2.5]" />
              )}
            </button>
          </div>

        </div>

        {/* Barre de recherche mobile rétractable (< lg) */}
        {isMobileSearchOpen && (
          <div className="lg:hidden px-3 sm:px-4 pb-3 pt-1 border-t border-[#00674F]/10 bg-white/95 animate-in slide-in-from-top-2">
            <form
              onSubmit={(e) => {
                handleSearchSubmit(e);
                setIsMobileSearchOpen(false);
              }}
              className="relative w-full flex items-center bg-[#F4F7F5] rounded-full border border-[#00674F]/25 focus-within:border-[#FF7518] focus-within:ring-2 focus-within:ring-[#FF7518]/20 px-3 py-1.5 shadow-inner"
            >
              <Search className="w-4 h-4 text-[#2D423B]/50 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit, marque, catégorie..."
                className="w-full text-xs sm:text-sm bg-transparent text-[#2D423B] focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-[#2D423B]/50 hover:text-[#00674F]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="ml-1 p-1.5 rounded-full bg-[#FF7518] hover:bg-[#E6630D] text-white shrink-0 shadow-xs cursor-pointer"
                aria-label="Lancer la recherche"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* VOLET MOBILE HAMBURGER PLEINE HAUTEUR (< lg) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu de navigation mobile">
          {/* Fond semi-transparent sombre cliquable */}
          <div
            className="absolute inset-0 bg-[#2D423B]/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Panneau coulissant depuis la droite */}
          <aside className="absolute top-0 bottom-0 right-0 w-80 sm:w-96 max-w-[88vw] bg-white shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out animate-in slide-in-from-right">
            
            {/* En-tête du volet mobile */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#00674F] via-[#005c46] to-[#004736] text-white flex items-center justify-between shrink-0 shadow-sm border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white text-[#00674F] flex items-center justify-center shadow-md">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-lg tracking-tight leading-tight">iit_store</span>
                    <span className="text-[9px] bg-white/20 text-white font-extrabold uppercase px-1.5 py-0.5 rounded-md tracking-wider">
                      Marketplace
                    </span>
                  </div>
                  <span className="text-[10px] text-white/75 font-semibold block mt-0.5">
                    Shopping certifié & sécurisé
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="Fermer le menu mobile"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Corps scrollable du menu mobile */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin">
              
              {/* Profil / Connexion Mobile */}
              {isLoggedIn ? (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F4F7F5] to-white border border-[#00674F]/15 shadow-2xs space-y-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-[#00674F] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                      {userEmail?.charAt(0).toUpperCase() || 'C'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-[#00674F] uppercase tracking-wider">
                          Client Connecté
                        </span>
                      </div>
                      <p className="text-xs font-black text-[#2D423B] truncate mt-0.5">
                        {userEmail || 'Client iit_store'}
                      </p>
                    </div>
                  </div>

                  {/* Actions rapides mobile : Dashboard, Commandes, Déconnexion */}
                  <div className="space-y-1.5 pt-2 border-t border-[#00674F]/10">
                    {/* Dashboard */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        if (onGoToCustomerDashboard) {
                          onGoToCustomerDashboard('dashboard');
                        } else if (onGoToSellerDashboard) {
                          onGoToSellerDashboard();
                        } else {
                          setCurrentTab('seller-dashboard');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#00674F]/10 border border-[#00674F]/15 text-xs font-bold text-[#2D423B] transition-all shadow-2xs"
                    >
                      <span className="flex items-center gap-2.5">
                        <LayoutDashboard className="w-4 h-4 text-[#00674F]" />
                        <span>Mon Dashboard</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    </button>

                    {/* Commandes */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        if (onGoToCustomerDashboard) {
                          onGoToCustomerDashboard('orders');
                        } else {
                          setCurrentTab('order-tracking');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#FF7518]/10 border border-[#FF7518]/20 text-xs font-bold text-[#2D423B] transition-all shadow-2xs"
                    >
                      <span className="flex items-center gap-2.5">
                        <Package className="w-4 h-4 text-[#FF7518]" />
                        <span>Mes Commandes</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    </button>

                    {/* Déconnexion */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onLogout?.();
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-rose-50/70 hover:bg-rose-100 border border-rose-200/80 text-xs font-bold text-rose-600 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Déconnexion</span>
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F4F7F5] to-white border border-[#00674F]/15 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-[#00674F]/10 border border-[#00674F]/20 text-[#00674F] flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-extrabold text-[#2D423B]">Bienvenue sur iit_store</span>
                      <span className="text-[11px] text-[#2D423B]/60 block mt-0.5">Accédez à votre espace</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onGoToLogin();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white text-xs font-bold shadow-xs shrink-0 cursor-pointer transition-all"
                  >
                    Se connecter
                  </button>
                </div>
              )}

              {/* Liens de navigation principale (Cartes tactiles épurées) */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-[11px] font-black text-[#00674F] uppercase tracking-wider block">
                  Navigation Marketplace
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentTab('catalog');
                    setIsMobileMenuOpen(false);
                    scrollToCatalog();
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    currentTab === 'catalog'
                      ? 'bg-[#00674F] text-white border-[#00674F] shadow-xs'
                      : 'bg-white text-[#2D423B] border-gray-200/80 hover:bg-[#F4F7F5] shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      currentTab === 'catalog' ? 'bg-white/20 text-white' : 'bg-[#00674F]/10 text-[#00674F]'
                    }`}>
                      <Store className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="font-extrabold text-xs block leading-tight">Catalogue Principal</span>
                      <span className={`text-[10px] block mt-0.5 ${currentTab === 'catalog' ? 'text-white/80' : 'text-[#2D423B]/60'}`}>
                        80 articles disponibles
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentTab('cart');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    currentTab === 'cart'
                      ? 'bg-[#00674F] text-white border-[#00674F] shadow-xs'
                      : 'bg-white text-[#2D423B] border-gray-200/80 hover:bg-[#F4F7F5] shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      currentTab === 'cart' ? 'bg-white/20 text-white' : 'bg-[#00674F]/10 text-[#00674F]'
                    }`}>
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="font-extrabold text-xs block leading-tight">Mon Panier</span>
                      <span className={`text-[10px] block mt-0.5 ${currentTab === 'cart' ? 'text-white/80' : 'text-[#2D423B]/60'}`}>
                        Total : {totalCartAmount.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                    currentTab === 'cart' ? 'bg-white text-[#00674F]' : 'bg-[#00674F] text-white'
                  }`}>
                    {totalCartCount}
                  </span>
                </button>
              </div>

              {/* Support client direct */}
              <div className="p-4 rounded-2xl bg-[#00674F]/10 border border-[#00674F]/15 space-y-2 mt-4">
                <div className="flex items-center gap-2 text-xs font-black text-[#00674F]">
                  <Phone className="w-4 h-4" />
                  <span>Assistance Téléphonique 7j/7</span>
                </div>
                <p className="text-[11px] text-[#2D423B]/70">Une question sur vos commandes ? Notre service client vous répond.</p>
                <a
                  href="tel:+22921000000"
                  className="block text-center py-2 px-3 bg-[#00674F] hover:bg-[#00513d] text-white text-xs font-extrabold rounded-xl transition-colors shadow-xs"
                >
                  Appeler le +229 21 00 00 00
                </a>
              </div>

            </div>

            {/* Pied du volet mobile avec copyright */}
            <div className="p-3.5 bg-gray-50 border-t border-gray-100 text-center text-[10px] text-gray-500 font-medium shrink-0">
              © 2026 iit_store Marketplace • Version Mobile
            </div>

          </aside>
        </div>
      )}

      {/* Espacement réservé pour la barre de navigation fixe (hauteur 64px à 80px / h-16 sm:h-20) */}
      <div className="h-16 sm:h-20 shrink-0" aria-hidden="true" />

      {/* Navigation Onglets : Panier Pleine Page */}
      {currentTab === 'cart' && (
        <CartPage
          cartItems={cartItems}
          favoriteIds={favoriteIds}
          selectedCountry={selectedCountry}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={(id) => {
            const item = cartItems.find((i) => i.product.id === id);
            handleRemoveFromCart(id, item ? item.product.title : 'Article');
          }}
          onClearCart={handleClearCart}
          onBackToShopping={() => setCurrentTab('catalog')}
          onSelectProduct={(p) => setSelectedDetailProduct(p)}
          onToggleFavorite={toggleFavorite}
          onToast={onToast}
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          onTrackOrder={() => {
            setCurrentTab('order-tracking');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Navigation Onglets : Favoris Pleine Page */}
      {currentTab === 'favorites' && (
        <FavoritesPage
          favoriteIds={favoriteIds}
          selectedCountry={selectedCountry}
          onRemoveFavorite={(id, title) => toggleFavorite(id, title)}
          onClearAllFavorites={() => {
            setFavoriteIds([]);
            onToast('info', 'Favoris vidés', 'Tous vos favoris ont été retirés.');
          }}
          onAddToCart={(p) => handleAddToCart(p)}
          onAddAllToCart={(products) => {
            products.forEach((p) => handleAddToCart(p));
            onToast(
              'success',
              'Articles ajoutés',
              `${products.length} article(s) ont été ajoutés à votre panier.`
            );
          }}
          onBackToShopping={() => setCurrentTab('catalog')}
          onSelectProduct={(p) => setSelectedDetailProduct(p)}
          onToast={onToast}
        />
      )}

      {/* Page Mentions Légales & Sécurité */}
      {currentTab === 'legal-security' && (
        <LegalSecurityPage
          onBackToShopping={() => setCurrentTab('catalog')}
          onExploreCatalog={() => {
            setCurrentTab('catalog');
            setTimeout(scrollToCatalog, 100);
          }}
        />
      )}

      {/* Page Devenir Vendeur */}
      {currentTab === 'become-seller' && (
        <BecomeSellerPage
          onBackToShopping={() => setCurrentTab('catalog')}
          onToast={onToast}
          onGoToSellerDashboard={() => {
            if (onGoToSellerDashboard) {
              onGoToSellerDashboard();
            } else {
              setCurrentTab('seller-dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />
      )}

      {/* Page Espace Boutique / Dashboard Vendeur */}
      {currentTab === 'seller-dashboard' && (
        <SellerDashboard
          initialCountry={selectedCountry}
          onBackToShopping={() => {
            setCurrentTab('catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onToast={onToast}
        />
      )}

      {/* Page Suivi de Colis */}
      {currentTab === 'order-tracking' && (
        <OrderTrackingPage
          onBackToShopping={() => setCurrentTab('catalog')}
          onToast={onToast}
        />
      )}

      {/* Page Foire Aux Questions (FAQ) */}
      {currentTab === 'faq' && (
        <FaqPage
          onBackToShopping={() => setCurrentTab('catalog')}
          onExploreCatalog={() => {
            setCurrentTab('catalog');
            setTimeout(scrollToCatalog, 100);
          }}
          onToast={onToast}
        />
      )}

      {/* Vue Catalogue Principal (80 articles par page) */}
      {currentTab === 'catalog' && (
        <>
          <BillboardBanner
            onExplore={(cat) => {
              if (cat && cat !== 'Catégories') {
                setSelectedCategory(cat);
              }
              scrollToCatalog();
            }}
          />
      <main ref={catalogRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full">
        
        {/* BOUTON FLOTTANT FIXÉ AU CENTRE DU MAIN RANGÉ À GAUCHE */}
        <div className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40">
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen((prev) => !prev)}
            className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2D423B] hover:bg-[#524c46] text-white shadow-2xl shadow-[#2D423B]/40 border border-[#2D423B]/80 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group focus:outline-none focus:ring-4 focus:ring-[#FF7518]/30"
            aria-label="Ouvrir les critères de recherche"
            title="Critères de recherche (selon l'article et sa catégorie)"
          >
            <ChevronRight
              className={`w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5] transition-transform duration-300 ${
                isFilterDrawerOpen ? 'rotate-180' : 'group-hover:translate-x-0.5'
              }`}
            />
            {hasActiveCustomFilters && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#00674F] border-2 border-white animate-pulse" />
            )}
          </button>
        </div>

        {/* VOLET LATÉRAL (DRAWER) DES CRITÈRES DE RECHERCHE EN FONCTION DE L'ARTICLE ET SA CATÉGORIE */}
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${
            isFilterDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Backdrop sombre */}
          <div
            className="absolute inset-0 bg-[#2D423B]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsFilterDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Panneau coulissant depuis la gauche - Design aéré, fluide et moderne */}
          <aside
            className={`absolute top-0 bottom-0 left-0 w-84 sm:w-[420px] max-w-[92vw] bg-white/95 backdrop-blur-md shadow-2xl shadow-[#2D423B]/20 border-r border-[#00674F]/10 flex flex-col transition-all duration-300 ease-out z-10 ${
              isFilterDrawerOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            role="dialog"
            aria-label="Critères de recherche"
          >
            {/* En-tête du volet (CSS selector 1) */}
            <div className="px-6 py-5 bg-gradient-to-r from-[#2D423B] to-[#1E2E29] text-white flex items-center justify-between border-b border-white/10 shadow-sm shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#FF7518] shadow-inner">
                  <SlidersHorizontal className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base tracking-tight leading-tight text-white">
                    Critères de recherche
                  </h3>
                  <p className="text-xs text-white/70 font-medium mt-0.5">
                    Affinez selon vos envies
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:rotate-90 duration-200"
                aria-label="Fermer les critères"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Corps défilable avec tous les critères (CSS selector 2) */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7 scrollbar-thin scrollbar-thumb-[#00674F]/15">
              
              {/* 1. CRITÈRE : RECHERCHE PAR ARTICLE */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-[#00674F] uppercase tracking-wider">
                    Recherche par mot-clé
                  </label>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs font-semibold text-[#FF7518] hover:underline cursor-pointer"
                    >
                      Effacer
                    </button>
                  )}
                </div>
                {/* Champ input (CSS selector 3) */}
                <div className="relative">
                  <Search className="w-4 h-4 text-[#2D423B]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Casque, sac, montre, robe..."
                    className="w-full pl-10 pr-9 py-3 text-xs sm:text-sm bg-[#F4F7F5]/70 hover:bg-[#F4F7F5] focus:bg-white border border-[#00674F]/15 focus:border-[#FF7518] rounded-2xl focus:outline-none text-[#2D423B] placeholder-[#2D423B]/40 transition-all shadow-xs focus:ring-3 focus:ring-[#FF7518]/15"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2D423B]/50 hover:text-[#2D423B] p-1 rounded-full hover:bg-neutral-200/60 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* 2. CRITÈRE : CATÉGORIE DE L'ARTICLE */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider">
                    Catégories
                  </label>
                  <span className="text-[11px] font-semibold text-[#2D423B]/50">
                    {CATEGORIES.length} univers
                  </span>
                </div>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1.5 scrollbar-thin">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    const count = categoryCounts[cat] || 0;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#FF7518] text-white shadow-sm shadow-[#FF7518]/30 scale-[1.01]'
                            : 'bg-neutral-50/80 hover:bg-[#F4F7F5] text-[#2D423B] border border-neutral-200/50'
                        }`}
                      >
                        <span className="truncate pr-2">{cat}</span>
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-white/25 text-white'
                              : 'bg-white text-[#2D423B]/70 shadow-2xs border border-neutral-200/60'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. CRITÈRE : FOURCHETTE DE PRIX */}
              <div className="space-y-2.5">
                <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider">
                  Fourchette de prix
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'all', label: 'Tous les prix' },
                    { id: 'under50', label: '< 50 €' },
                    { id: '50-150', label: '50 € - 150 €' },
                    { id: '150-300', label: '150 € - 300 €' },
                    { id: 'over300', label: '> 300 €' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPriceRange(item.id as any)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer ${
                        priceRange === item.id
                          ? 'bg-[#00674F] text-white shadow-sm shadow-[#00674F]/25 font-bold scale-[1.01]'
                          : 'bg-neutral-50/80 hover:bg-[#F4F7F5] text-[#2D423B] border border-neutral-200/60'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. CRITÈRE : NOTE MINIMALE */}
              <div className="space-y-2.5">
                <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider">
                  Avis et Note minimale
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { val: 0, label: 'Toutes les notes' },
                    { val: 4.0, label: '★ 4.0 et +' },
                    { val: 4.5, label: '★ 4.5 et +' },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setMinRating(item.val)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        minRating === item.val
                          ? 'bg-[#00674F] text-white shadow-sm shadow-[#00674F]/25 font-bold'
                          : 'bg-neutral-50/80 hover:bg-[#F4F7F5] text-[#2D423B] border border-neutral-200/60'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. CRITÈRE : BADGES ET STATUT */}
              <div className="space-y-2.5">
                <label className="block text-xs font-black text-[#00674F] uppercase tracking-wider">
                  Statut & Badges
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {['Tous', 'Nouveau', 'Best-seller', 'Populaire', 'Promo'].map((badge) => {
                    const isSelected =
                      (badge === 'Tous' && selectedBadge === null) ||
                      selectedBadge === badge;
                    return (
                      <button
                        key={badge}
                        type="button"
                        onClick={() => setSelectedBadge(badge === 'Tous' ? null : badge)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FF7518] text-white shadow-sm shadow-[#FF7518]/25 font-bold'
                            : 'bg-neutral-50/80 hover:bg-[#F4F7F5] text-[#2D423B] border border-neutral-200/60'
                        }`}
                      >
                        {badge}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Pied du volet de critères (CSS selector 4) */}
            <div className="p-5 sm:p-6 bg-white border-t border-[#00674F]/10 space-y-3.5 shadow-lg shadow-black/5 shrink-0">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#2D423B]/70 font-semibold">Articles correspondants</span>
                <span className="font-black text-[#00674F] bg-[#00674F]/10 px-3 py-1 rounded-full text-xs sm:text-sm">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleResetAllCriteria}
                  className="flex-1 py-3 px-3 rounded-xl border border-neutral-200 hover:border-[#00674F]/30 bg-neutral-50 hover:bg-neutral-100/70 text-[#2D423B] text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#2D423B]/60" />
                  <span>Réinitialiser</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsFilterDrawerOpen(false);
                    scrollToCatalog();
                  }}
                  className="flex-1 py-3 px-3 rounded-xl bg-[#FF7518] hover:bg-[#E6630D] active:scale-98 text-white text-xs sm:text-sm font-black transition-all shadow-md shadow-[#FF7518]/25 hover:shadow-lg hover:shadow-[#FF7518]/35 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Appliquer</span>
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Barre de contrôle du catalogue (Filtre info, tri et résultat) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#00674F]/15">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#00674F]/10 text-[#00674F] border border-[#00674F]/25">
                {itemsPerPage} articles par page
              </span>
              <span className="text-xs text-[#2D423B]/70 font-semibold">
                {filteredProducts.length} articles disponibles
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2D423B] mt-1.5">
              Explorez tous les Produits
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#2D423B]/75 font-normal">
              {filteredProducts.length === 0
                ? 'Aucun produit ne correspond à vos critères.'
                : `Affichage de ${
                    (currentPage - 1) * itemsPerPage + 1
                  } à ${Math.min(
                    currentPage * itemsPerPage,
                    filteredProducts.length
                  )} sur ${filteredProducts.length} articles au total`}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
            {/* Sélecteur du nombre d'articles par page */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="per-page-select" className="text-xs font-bold text-[#2D423B]">
                Articles/page :
              </label>
              <select
                id="per-page-select"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="py-1.5 px-3 bg-white border border-[#00674F]/25 rounded-xl text-xs font-bold text-[#00674F] focus:outline-none focus:ring-2 focus:ring-[#FF7518]/20 cursor-pointer shadow-xs"
              >
                <option value={80}>80 articles</option>
                <option value={40}>40 articles</option>
                <option value={20}>20 articles</option>
                <option value={120}>120 articles</option>
              </select>
            </div>

            {/* Sélecteur de tri */}
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF7518]" />
              <label htmlFor="sort-select" className="text-xs font-bold text-[#2D423B]">
                Trier par :
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1.5 px-3 bg-white border border-[#00674F]/25 rounded-xl text-xs font-semibold text-[#2D423B] focus:outline-none focus:ring-2 focus:ring-[#FF7518]/20 cursor-pointer shadow-xs"
              >
                <option value="featured">En vedette</option>
                <option value="price-asc">Prix : croissant</option>
                <option value="price-desc">Prix : décroissant</option>
                <option value="rating">Meilleures notes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grille des Articles par Page */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4 bg-[#F4F7F5] border border-dashed border-[#00674F]/25 rounded-3xl">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#00674F]/10 border border-[#00674F]/20 flex items-center justify-center text-[#00674F] mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-[#2D423B]">
              Aucun résultat pour cette recherche
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#2D423B]/70 max-w-md mx-auto">
              Essayez de modifier votre mot-clé ou sélectionnez une autre catégorie dans le menu déroulant.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Catégories');
              }}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF7518] hover:bg-[#E6630D] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser les filtres</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {paginatedProducts.map((product) => {
              const isFav = favoriteIds.includes(product.id);
              const hasError = imageErrors[product.id];

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedDetailProduct(product)}
                  className="bg-white border border-[#00674F]/15 hover:border-[#FF7518] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Partie Haute : Image avec Badge et Favoris */}
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      {!hasError ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setImageErrors((prev) => ({ ...prev, [product.id]: true }))
                          }
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F4F7F5] to-amber-50 text-[#00674F]/60">
                          <ShoppingBag className="w-8 h-8 mb-1 opacity-60" />
                          <span className="text-[11px] font-bold">{product.category}</span>
                        </div>
                      )}

                      {/* Badge Terracotta Doux (#00674F) */}
                      {product.badge && (
                        <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md text-[9px] font-extrabold text-[#00674F] px-2 py-0.5 rounded-full border border-[#00674F]/20 shadow-sm uppercase tracking-wider">
                          {product.badge}
                        </span>
                      )}

                      {/* Bouton Favoris flottant sur l'image */}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id, product.title); }}
                        aria-label={
                          isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'
                        }
                        className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-sm ${
                          isFav
                            ? 'bg-[#00674F] text-white shadow-md shadow-[#00674F]/30'
                            : 'bg-white/90 text-[#00674F] hover:bg-white hover:scale-110'
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Informations du Produit (Textes Taupe Foncé #2D423B) */}
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-1 mb-1.5 text-xs">
                        <span className="font-semibold text-[#2D423B]/60 uppercase tracking-wider text-[10px] truncate">
                          {product.seller}
                        </span>
                        <div className="flex items-center gap-1 text-[#00674F] shrink-0 font-bold text-[11px]">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{product.rating}</span>
                          <span className="text-[#2D423B]/50 font-normal text-[10px]">
                            ({product.reviews})
                          </span>
                        </div>
                      </div>

                      <h3 className="font-bold text-[#2D423B] text-sm leading-snug group-hover:text-[#00674F] transition-colors line-clamp-2 min-h-[2.5rem]">
                        {product.title}
                      </h3>

                      <p className="mt-1 text-[11px] text-[#2D423B]/65 truncate">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  {/* Bas de la carte : Prix Terracotta (#00674F) et Bouton d'ajout Ocre Lumineux (#FF7518) */}
                  <div className="px-4 pb-4 pt-2 border-t border-[#00674F]/10 flex items-center justify-between gap-2">
                    <div>
                      <span className="block text-[9px] text-[#2D423B]/50 uppercase font-semibold">
                        Prix
                      </span>
                      <span className="font-extrabold text-[#00674F] text-base sm:text-lg tracking-tight">
                        {product.price.toFixed(2)} €
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                      className="px-3 py-1.5 rounded-xl bg-[#FF7518] hover:bg-[#E6630D] text-white font-bold text-xs transition-all duration-200 cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Ajouter</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Stylisée avec Boutons Ocre Lumineux (#FF7518) */}
        {filteredProducts.length > 0 && totalPages > 1 && (
          <div className="mt-12 pt-8 border-t border-[#00674F]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Compteur d'affichage précis */}
            <div className="text-xs text-[#2D423B]/75 font-medium order-2 sm:order-1">
              Affichage de la page <span className="font-bold text-[#00674F]">{currentPage}</span> sur{' '}
              <span className="font-bold text-[#00674F]">{totalPages}</span> ({itemsPerPage} articles par page)
            </div>

            {/* Contrôles de pagination stylisés avec 1 2 3 4 etc */}
            <nav
              className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2 flex-wrap justify-center"
              aria-label="Pagination des produits"
            >
              {/* Bouton Précédent */}
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-[#00674F]/25 text-xs font-bold text-[#2D423B] hover:bg-[#FF7518]/15 hover:border-[#FF7518] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
                aria-label="Page précédente"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Précédent</span>
              </button>

              {/* Boutons numériques explicites : 1, 2, 3, 4, etc. */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={`Page ${pageNum}`}
                    className={`min-w-9 h-9 sm:min-w-10 sm:h-10 px-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
                      isActive
                        ? 'bg-[#FF7518] text-white shadow-md shadow-[#FF7518]/30 scale-105 ring-2 ring-[#FF7518]/30'
                        : 'bg-white border border-[#00674F]/25 text-[#2D423B] hover:bg-[#F4F7F5] hover:border-[#FF7518]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Bouton Suivant */}
              <button
                type="button"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-[#00674F]/25 text-xs font-bold text-[#2D423B] hover:bg-[#FF7518]/15 hover:border-[#FF7518] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
                aria-label="Page suivante"
              >
                <span className="hidden sm:inline">Suivant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        )}
      </main>
        </>
      )}

      
      {/* Modale Vue Détaillée Inspirée Amazon avec "À propos de cet article" */}
      {selectedDetailProduct && (
        <ProductDetailModal
          product={selectedDetailProduct}
          selectedCountry={selectedCountry}
          isFavorite={favoriteIds.includes(selectedDetailProduct.id)}
          onToggleFavorite={toggleFavorite}
          onAddToCart={(p, qty) => {
            for (let i = 0; i < qty; i++) {
              handleAddToCart(p);
            }
          }}
          onBuyNow={(p, qty) => {
            for (let i = 0; i < qty; i++) {
              handleAddToCart(p);
            }
            setSelectedDetailProduct(null);
            setIsCartOpen(true);
            onToast('success', 'Achat immédiat', `Votre commande pour "${p.title}" est prête.`);
          }}
          onClose={() => setSelectedDetailProduct(null)}
          onSelectProduct={(p) => setSelectedDetailProduct(p)}
        />
      )}

      {/* Footer épuré avec réseaux sociaux, informations de contact et mentions légales */}
      <Footer
        onToast={onToast}
        onExploreCatalog={() => {
          setCurrentTab('catalog');
          setTimeout(scrollToCatalog, 100);
        }}
        onNavigatePage={(page) => {
          setCurrentTab(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToSellerLogin={onGoToSellerLogin}
      />
    </div>
  );
};
