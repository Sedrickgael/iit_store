import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  MessageCircle,
  ArrowLeft,
  ChevronRight,
  Phone,
  Mail,
} from 'lucide-react';

interface FaqPageProps {
  onBackToShopping: () => void;
  onExploreCatalog: () => void;
  onToast?: (type: 'success' | 'error' | 'info', title: string, desc?: string) => void;
}

interface FaqItem {
  id: string;
  category: 'commande' | 'livraison' | 'paiement' | 'retours' | 'vendeurs';
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  // Commandes
  {
    id: 'c1',
    category: 'commande',
    question: 'Comment passer une commande sur iit_store ?',
    answer: 'Parcourez le catalogue parmi les 80+ articles authentiques, ajoutez vos produits au panier, sélectionnez votre pays de livraison et cliquez sur « Passer la commande ». Vous pouvez payer par carte bancaire ou Mobile Money en toute sécurité.',
  },
  {
    id: 'c2',
    category: 'commande',
    question: 'Puis-je modifier ou annuler ma commande après validation ?',
    answer: 'Tant que votre commande n a pas été remise au transporteur (environ 2 heures après la validation), vous pouvez demander une modification ou annulation directement auprès de notre service client.',
  },
  {
    id: 'c3',
    category: 'commande',
    question: 'Faut-il créer un compte obligatoirement pour commander ?',
    answer: 'Non, vous pouvez commander en tant qu invité. Cependant, créer un compte vous permet de mémoriser vos adresses de livraison, de cumuler des points fidélité et de suivre vos colis en direct.',
  },

  // Paiement
  {
    id: 'p1',
    category: 'paiement',
    question: 'Quels moyens de paiement sont acceptés ?',
    answer: 'Nous acceptons les cartes Visa, Mastercard, American Express, ainsi que les principaux portefeuilles Mobile Money en Afrique : MTN MoMo, Moov Money, Orange Money et Wave.',
  },
  {
    id: 'p2',
    category: 'paiement',
    question: 'Les prix sont-ils en Franc CFA ou en Euros ?',
    answer: 'Les prix sont calculés en Euros (€) et convertis instantanément selon le cours officiel dans votre devise locale (Franc CFA XOF, XAF, Cedi GHS, Naira NGN) en sélectionnant votre pays dans la barre supérieure.',
  },
  {
    id: 'p3',
    category: 'paiement',
    question: 'Mes coordonnées bancaires sont-elles en sécurité ?',
    answer: 'Oui, à 100%. Toutes les transactions sont chiffrées selon la norme bancaire PCI-DSS et sécurisées par le protocole 3D Secure. Aucune information de carte n est conservée sur nos serveurs.',
  },

  // Livraison
  {
    id: 'l1',
    category: 'livraison',
    question: 'Quels sont les délais et zones de livraison ?',
    answer: 'Nous livrons dans toute l Afrique de l Ouest (Bénin, Côte d Ivoire, Sénégal, Togo, Burkina Faso, Mali, Niger, Guinée, Ghana, Nigeria) ainsi qu en Europe et à l international. Les délais varient de 24h à 48h ouvrées en express, et 3 à 5 jours en envoi standard.',
  },
  {
    id: 'l2',
    category: 'livraison',
    question: 'Combien coûte la livraison ?',
    answer: 'La livraison standard est offerte pour toute commande dès 50 € d achat dans votre zone nationale. Pour les livraisons express inter-pays, le tarif exact s affiche en toute transparence dans votre panier avant paiement.',
  },
  {
    id: 'l3',
    category: 'livraison',
    question: 'Comment suivre l acheminement de mon colis ?',
    answer: 'Dès expédition, vous recevez un code de suivi #IIT-... par email et SMS. Vous pouvez le saisir sur notre page dédiée « Suivi de colis » pour voir l historique étape par étape.',
  },

  // Retours & Remboursements
  {
    id: 'r1',
    category: 'retours',
    question: 'Quelle est la politique de retour et sous quel délai ?',
    answer: 'Vous disposez d un délai légal de 14 jours à compter de la réception de votre article pour nous signaler un retour si l article ne vous convient pas ou présente un défaut. Le retour est pris en charge.',
  },
  {
    id: 'r2',
    category: 'retours',
    question: 'Comment se passe le remboursement ?',
    answer: 'Après réception et contrôle de conformité du produit dans son emballage d origine, le remboursement est émis sous 48 heures ouvrées sur le même moyen de paiement (Carte ou Mobile Money).',
  },

  // Vendeurs
  {
    id: 'v1',
    category: 'vendeurs',
    question: 'Comment devenir vendeur sur iit_store ?',
    answer: 'Rendez-vous sur la page « Devenir vendeur », remplissez le formulaire avec le nom de votre marque, votre catalogue et vos coordonnées. Notre équipe marchande vous contacte sous 24h pour finaliser l ouverture de votre boutique.',
  },
  {
    id: 'v2',
    category: 'vendeurs',
    question: 'Quelles sont les commissions prélevées sur les ventes ?',
    answer: 'L inscription est 100% gratuite et sans abonnement mensuel obligatoire. Une commission compétitive de 8% à 12% n est prélevée qu en cas de vente effective, incluant la garantie de paiement et le support client.',
  },
];

export const FaqPage: React.FC<FaqPageProps> = ({
  onBackToShopping,
  onExploreCatalog,
  onToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    c1: true,
    l1: true,
    p1: true,
  });

  const categories = [
    { id: 'all', label: 'Toutes les questions', icon: HelpCircle },
    { id: 'commande', label: 'Commandes', icon: ShoppingBag },
    { id: 'paiement', label: 'Paiements & Devises', icon: CreditCard },
    { id: 'livraison', label: 'Livraison & Expédition', icon: Truck },
    { id: 'retours', label: 'Retours & Garanties', icon: RotateCcw },
    { id: 'vendeurs', label: 'Espace Vendeurs', icon: UserCheck },
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaq = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4F7F5]/40 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
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
            <span className="font-semibold text-[#00674F]">Foire Aux Questions</span>
          </div>
        </div>

        {/* Hero Banner FAQ */}
        <div className="bg-gradient-to-r from-[#00674F] to-[#00513d] text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>Centre d'Aide & Support Client</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Foire Aux Questions (FAQ)
            </h1>
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-6">
              Trouvez des réponses claires et immédiates à toutes vos questions concernant vos achats, les livraisons en Afrique et les retours.
            </p>

            {/* Champ de recherche dans la FAQ */}
            <div className="relative max-w-md mx-auto">
              <Search className="w-4 h-4 text-[#2D423B]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une question (ex: livraison, mobile money, retour)..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white text-sm text-[#2D423B] placeholder-[#2D423B]/40 focus:outline-none focus:ring-4 focus:ring-[#FF7518]/30 shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Filtres par Catégorie */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00674F] text-white shadow-md shadow-[#00674F]/20 scale-102'
                    : 'bg-white text-[#2D423B] hover:bg-[#F4F7F5] border border-[#00674F]/15'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#00674F]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Liste Accordéon des Questions / Réponses */}
        <div className="space-y-3.5 mb-12">
          {filteredFaq.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-[#00674F]/15 text-center">
              <HelpCircle className="w-12 h-12 text-[#2D423B]/40 mx-auto mb-3" />
              <h3 className="font-extrabold text-base text-[#2D423B]">Aucun résultat pour cette recherche</h3>
              <p className="text-xs text-[#2D423B]/60 mt-1 max-w-sm mx-auto">
                Essayez d'autres mots-clés ou réinitialisez les filtres pour voir toutes les questions.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#FF7518] text-white text-xs font-bold hover:bg-[#E6630D] cursor-pointer"
              >
                Réinitialiser la recherche
              </button>
            </div>
          ) : (
            filteredFaq.map((item) => {
              const isOpen = !!openItems[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#00674F]/15 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#F4F7F5]/50 transition-colors"
                  >
                    <span className="font-extrabold text-xs sm:text-sm text-[#2D423B] pr-4">
                      {item.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                        isOpen ? 'bg-[#FF7518] text-white rotate-180' : 'bg-[#F4F7F5] text-[#00674F]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#2D423B]/80 leading-relaxed border-t border-[#00674F]/10 bg-[#F4F7F5]/30 animate-in fade-in">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Encadré d'Assistance en direct */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#00674F]/15 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-[#FF7518] uppercase tracking-wider block mb-1">
                Besoin d'un accompagnement personnalisé ?
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#00674F] mb-2">
                Vous n'avez pas trouvé votre réponse ?
              </h3>
              <p className="text-xs text-[#2D423B]/75 leading-relaxed">
                Nos conseillers clientèle iit_store sont disponibles du lundi au samedi de 08h à 20h pour répondre à vos demandes par téléphone, email ou WhatsApp.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="tel:+22921000000"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#00674F] hover:bg-[#00513d] text-white font-extrabold text-xs transition-all shadow-md cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>+229 21 00 00 00</span>
              </a>

              <a
                href="mailto:contact@iit-store.com"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-[#00674F]/30 hover:border-[#FF7518] text-[#2D423B] hover:text-[#FF7518] font-extrabold text-xs transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>contact@iit-store.com</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
