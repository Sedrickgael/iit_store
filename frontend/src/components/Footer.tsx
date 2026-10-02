import React, { useState } from 'react';
import {
  Store,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  Send,
  X,
  FileText,
} from 'lucide-react';

interface FooterProps {
  onToast?: (type: 'success' | 'error' | 'info', title: string, desc?: string) => void;
  onExploreCatalog?: () => void;
  onNavigatePage?: (page: 'catalog' | 'cart' | 'favorites' | 'legal-security' | 'become-seller' | 'order-tracking' | 'faq' | 'seller-dashboard') => void;
  onGoToSellerLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onToast,
  onExploreCatalog,
  onNavigatePage,
  onGoToSellerLogin,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSocialClick = (platform: string, _url: string) => {
    onToast?.(
      'info',
      platform,
      `Ouverture du profil officiel ${platform} de iit_store.`
    );
  };

  const handleLegalModal = (_title: string, contentKey: string) => {
    setActiveModal(contentKey);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      onToast?.(
        'success',
        'Newsletter iit_store',
        `Merci ! L'adresse ${newsletterEmail} est bien inscrite à nos offres exclusives.`
      );
      setNewsletterEmail('');
    }
  };

  return (
    <>
      <footer className="border-t border-[#00674F]/20 bg-white text-[#2D423B] transition-colors">
        {/* Section Principale du Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Colonne 1 : Identité de la marque Vert Émeraude & Réseaux Sociaux */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00674F] text-white flex items-center justify-center shadow-md shadow-[#00674F]/25">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-2xl text-[#00674F] tracking-tight">
                    iit_store
                  </span>
                  <span className="block text-[10px] text-[#2D423B]/60 font-bold uppercase tracking-wider">
                    Marketplace Afrique & International
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#2D423B]/85 leading-relaxed max-w-sm">
                Votre destination e-commerce d'exception connectant les meilleurs vendeurs et acheteurs en Afrique de l'Ouest et à l'international. Qualité certifiée, paiement sécurisé et livraison soignée.
              </p>

              {/* Réseaux Sociaux avec boutons Orange Mandarine */}
              <div className="pt-2">
                <p className="text-[11px] font-bold text-[#00674F] uppercase tracking-wider mb-2.5">
                  Suivez-nous sur les réseaux
                </p>
                <div className="flex items-center gap-2">
                  {/* Facebook */}
                  <button
                    type="button"
                    onClick={() => handleSocialClick('Facebook', 'https://facebook.com')}
                    aria-label="Page Facebook de iit_store"
                    title="Suivez-nous sur Facebook"
                    className="w-9 h-9 rounded-xl bg-white border border-[#00674F]/25 hover:border-[#FF7518] text-[#2D423B] hover:bg-[#FF7518] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs group"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>

                  {/* Instagram */}
                  <button
                    type="button"
                    onClick={() => handleSocialClick('Instagram', 'https://instagram.com')}
                    aria-label="Compte Instagram de iit_store"
                    title="Suivez-nous sur Instagram"
                    className="w-9 h-9 rounded-xl bg-white border border-[#00674F]/25 hover:border-[#FF7518] text-[#2D423B] hover:bg-[#FF7518] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs group"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </button>

                  {/* X (ancien Twitter) */}
                  <button
                    type="button"
                    onClick={() => handleSocialClick('X (Twitter)', 'https://x.com')}
                    aria-label="Profil X de iit_store"
                    title="Suivez-nous sur X"
                    className="w-9 h-9 rounded-xl bg-white border border-[#00674F]/25 hover:border-[#FF7518] text-[#2D423B] hover:bg-[#FF7518] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs group"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>

                  {/* LinkedIn */}
                  <button
                    type="button"
                    onClick={() => handleSocialClick('LinkedIn', 'https://linkedin.com')}
                    aria-label="Page LinkedIn de iit_store"
                    title="Suivez-nous sur LinkedIn"
                    className="w-9 h-9 rounded-xl bg-white border border-[#00674F]/25 hover:border-[#FF7518] text-[#2D423B] hover:bg-[#FF7518] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs group"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.768-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </button>

                  {/* TikTok */}
                  <button
                    type="button"
                    onClick={() => handleSocialClick('TikTok', 'https://tiktok.com')}
                    aria-label="Compte TikTok de iit_store"
                    title="Suivez-nous sur TikTok"
                    className="w-9 h-9 rounded-xl bg-white border border-[#00674F]/25 hover:border-[#FF7518] text-[#2D423B] hover:bg-[#FF7518] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs group"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Colonne 2 : Informations de Contact Gris-Vert Minéral */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="font-extrabold text-sm text-[#00674F] uppercase tracking-wider">
                Contact & Support
              </h4>
              <p className="text-xs text-[#2D423B]/75">
                Notre service client est à votre écoute pour vous accompagner dans tous vos achats.
              </p>

              <ul className="space-y-2.5 text-xs text-[#2D423B]/90">
                <li className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#00674F]/10 text-[#00674F] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#2D423B]/60 font-semibold uppercase">Email</span>
                    <a
                      href="mailto:contact@iit-store.com"
                      className="font-medium hover:text-[#00674F] transition-colors"
                    >
                      contact@iit-store.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#00674F]/10 text-[#00674F] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#2D423B]/60 font-semibold uppercase">Téléphone</span>
                    <a
                      href="tel:+22921000000"
                      className="font-medium hover:text-[#00674F] transition-colors"
                    >
                      +229 21 00 00 00 / +225 27 20 00 00
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#00674F]/10 text-[#00674F] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#2D423B]/60 font-semibold uppercase">Bureaux</span>
                    <span className="font-medium text-[#2D423B]">
                      Cotonou (Bénin) & Abidjan (Côte d'Ivoire)
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#00674F]/10 text-[#00674F] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#2D423B]/60 font-semibold uppercase">Disponibilité</span>
                    <span className="font-medium text-[#2D423B]">
                      Lundi - Samedi : 08h00 - 20h00 (GMT)
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Colonne 3 : Navigation Marketplace */}
            <div className="lg:col-span-2 space-y-3.5">
              <h4 className="font-extrabold text-sm text-[#00674F] uppercase tracking-wider">
                Marketplace
              </h4>
              <ul className="space-y-2 text-xs text-[#2D423B]/80">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigatePage) onNavigatePage('catalog');
                      else onExploreCatalog?.();
                    }}
                    className="hover:text-[#00674F] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00674F]" />
                    <span>Explorer le catalogue</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigatePage) onNavigatePage('become-seller');
                      else onToast?.('info', 'Devenir vendeur', 'Accès à l espace candidature vendeur.');
                    }}
                    className="hover:text-[#00674F] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00674F]" />
                    <span>Devenir vendeur</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onGoToSellerLogin) onGoToSellerLogin();
                      else if (onNavigatePage) onNavigatePage('seller-login' as any);
                    }}
                    className="hover:text-[#00674F] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00674F]" />
                    <span>Accéder à votre espace boutique</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigatePage) onNavigatePage('order-tracking');
                      else onToast?.('info', 'Suivi de colis', 'Accès au suivi en direct de commande.');
                    }}
                    className="hover:text-[#00674F] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00674F]" />
                    <span>Suivi de colis</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigatePage) onNavigatePage('faq');
                      else onToast?.('info', 'FAQ', 'Accès à la foire aux questions.');
                    }}
                    className="hover:text-[#00674F] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00674F]" />
                    <span>Foire Aux Questions</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Colonne 4 : Mentions Légales & Newsletter */}
            <div className="lg:col-span-3 space-y-3.5">
              <button
                type="button"
                onClick={() => {
                  if (onNavigatePage) onNavigatePage('legal-security');
                  else handleLegalModal('Mentions Légales', 'legal');
                }}
                className="font-extrabold text-sm text-[#00674F] uppercase tracking-wider text-left hover:text-[#FF7518] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Mentions Légales & Sécurité</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#FF7518]" />
              </button>
              <p className="text-xs text-[#2D423B]/75">
                Transactions chiffrées SSL et respect des normes de protection des données personnelles.
              </p>

              <ul className="space-y-2 text-xs text-[#2D423B]/80">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigatePage) onNavigatePage('legal-security');
                      else handleLegalModal('Mentions Légales', 'legal');
                    }}
                    className="hover:text-[#00674F] transition-colors cursor-pointer flex items-center gap-1.5 group text-left"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#2D423B]/50 group-hover:text-[#00674F]" />
                    <span className="underline-offset-2 hover:underline">Mentions Légales</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigatePage) onNavigatePage('legal-security');
                      else handleLegalModal('Conditions Générales de Vente', 'cgv');
                    }}
                    className="hover:text-[#00674F] transition-colors cursor-pointer flex items-center gap-1.5 group text-left"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#2D423B]/50 group-hover:text-[#00674F]" />
                    <span className="underline-offset-2 hover:underline">Conditions Générales de Vente (CGV)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigatePage) onNavigatePage('legal-security');
                      else handleLegalModal('Politique de Confidentialité', 'privacy');
                    }}
                    className="hover:text-[#00674F] transition-colors cursor-pointer flex items-center gap-1.5 group text-left"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#2D423B]/50 group-hover:text-[#00674F]" />
                    <span className="underline-offset-2 hover:underline">Politique de Confidentialité & Cookies</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigatePage) onNavigatePage('legal-security');
                      else handleLegalModal('Garantie & Retours', 'returns');
                    }}
                    className="hover:text-[#00674F] transition-colors cursor-pointer flex items-center gap-1.5 group text-left"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2D423B]/50 group-hover:text-[#00674F]" />
                    <span className="underline-offset-2 hover:underline">Garantie & Retours 14j</span>
                  </button>
                </li>
              </ul>

              {/* Newsletter avec bouton Orange Mandarine (#FF7518) */}
              <div className="pt-2">
                <span className="block text-[11px] font-bold text-[#00674F] uppercase tracking-wider mb-1.5">
                  Restez informé
                </span>
                <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-1.5">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Votre email..."
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-[#00674F]/20 focus:border-[#FF7518] focus:outline-none text-[#2D423B] placeholder-[#2D423B]/40"
                  />
                  <button
                    type="submit"
                    aria-label="S'inscrire à la newsletter"
                    className="p-2 rounded-xl bg-[#FF7518] hover:bg-[#E6630D] text-white transition-colors shrink-0 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* Barre Inférieure Légale & Copyright */}
        <div className="border-t border-[#00674F]/15 bg-white py-5 px-4 text-xs text-[#2D423B]/80">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#00674F]">iit_store</span>
              <span>•</span>
              <p>© 2026 iit_store Marketplace. Tous droits réservés.</p>
            </div>

            {/* Liens légaux rapides */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-[#2D423B]/70 font-medium">
              <button
                type="button"
                onClick={() => handleLegalModal('Mentions Légales', 'legal')}
                className="hover:text-[#00674F] transition-colors cursor-pointer"
              >
                Mentions Légales
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleLegalModal('Conditions Générales de Vente', 'cgv')}
                className="hover:text-[#00674F] transition-colors cursor-pointer"
              >
                CGV & CGU
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleLegalModal('Politique de Confidentialité', 'privacy')}
                className="hover:text-[#00674F] transition-colors cursor-pointer"
              >
                Protection des Données
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleLegalModal('Garantie & Retours', 'returns')}
                className="hover:text-[#00674F] transition-colors cursor-pointer"
              >
                Retours & Remboursements
              </button>
            </div>

            {/* Moyens de paiement */}
            <div className="flex items-center gap-2 text-[10px] text-[#2D423B]/60 font-semibold uppercase">
              <span className="px-2 py-0.5 rounded bg-white border border-[#00674F]/20 text-[#2D423B]">Visa / Mastercard</span>
              <span className="px-2 py-0.5 rounded bg-white border border-[#00674F]/20 text-[#2D423B]">Mobile Money</span>
              <span className="px-2 py-0.5 rounded bg-white border border-[#00674F]/20 text-[#2D423B]">SSL 256-bit</span>
            </div>

          </div>
        </div>
      </footer>

      {/* MODALE POUR LES MENTIONS LÉGALES ET CGV */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-[#2D423B]/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#00674F]/20 max-h-[85vh] flex flex-col justify-between animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[#00674F]/15">
              <div className="flex items-center gap-2 text-[#00674F]">
                <FileText className="w-5 h-5" />
                <h3 className="font-extrabold text-lg text-[#00674F]">
                  {activeModal === 'legal' && 'Mentions Légales'}
                  {activeModal === 'cgv' && 'Conditions Générales de Vente (CGV)'}
                  {activeModal === 'privacy' && 'Politique de Confidentialité & Cookies'}
                  {activeModal === 'returns' && 'Garantie et Droit de Rétractation'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full text-[#2D423B]/60 hover:text-[#2D423B] hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Fermer la modale"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 overflow-y-auto text-xs sm:text-sm text-[#2D423B] space-y-3 leading-relaxed">
              {activeModal === 'legal' && (
                <>
                  <p>
                    <strong>Éditeur du site :</strong> iit_store Marketplace SAS, société par actions simplifiée au capital de 10 000 000 FCFA.
                  </p>
                  <p>
                    <strong>Siège social :</strong> Boulevard de la Marina, Cotonou, Bénin / Plateau, Abidjan, Côte d'Ivoire.
                  </p>
                  <p>
                    <strong>Directeur de la publication :</strong> Direction Générale iit_store.
                  </p>
                  <p>
                    <strong>Hébergement :</strong> Serveurs sécurisés Cloud certifiés ISO 27001 avec redondance haute disponibilité.
                  </p>
                  <p>
                    <strong>Propriété intellectuelle :</strong> L'ensemble des logos, marques, textes et visuels présents sur la marketplace sont la propriété exclusive de iit_store ou de ses marchands agréés.
                  </p>
                </>
              )}

              {activeModal === 'cgv' && (
                <>
                  <p>
                    <strong>1. Objet :</strong> Les présentes Conditions Générales de Vente définissent les droits et obligations des acheteurs et des vendeurs sur la plateforme iit_store.
                  </p>
                  <p>
                    <strong>2. Commandes et Tarifs :</strong> Les prix sont affichés toutes taxes comprises (TTC). Les conversions de devises en Francs CFA (XOF) ou autres devises ouest-africaines sont calculées selon les cours officiels en vigueur.
                  </p>
                  <p>
                    <strong>3. Modalités de Paiement :</strong> Cartes bancaires (Visa, Mastercard) et Mobile Money (Wave, Orange Money, MTN MoMo, Moov). Les fonds sont sécurisés via séquestre jusqu'à validation de la réception par l'acheteur.
                  </p>
                  <p>
                    <strong>4. Expédition :</strong> Les délais de livraison moyens sont de 24h à 72h selon la région et le pays de destination.
                  </p>
                </>
              )}

              {activeModal === 'privacy' && (
                <>
                  <p>
                    <strong>Protection des données :</strong> iit_store applique rigoureusement les normes de protection des données personnelles. Vos informations de contact et d'adresse ne sont utilisées que pour le traitement et l'acheminement de vos commandes.
                  </p>
                  <p>
                    <strong>Sécurité bancaire :</strong> Aucune coordonnée bancaire n'est stockée sur nos serveurs. Toutes les transactions transitent via des passerelles bancaires chiffrées SSL 256 bits.
                  </p>
                  <p>
                    <strong>Droit d'accès et de rectification :</strong> Conformément à la réglementation, vous disposez d'un droit d'accès, de modification et de suppression de vos données personnelles via votre profil ou sur simple demande à <em>privacy@iit-store.com</em>.
                  </p>
                </>
              )}

              {activeModal === 'returns' && (
                <>
                  <p>
                    <strong>Droit de retour 14 jours :</strong> Vous disposez de 14 jours ouvrés à compter de la réception de votre colis pour demander un retour et un remboursement intégral si l'article ne vous convient pas.
                  </p>
                  <p>
                    <strong>État des articles :</strong> Le produit doit être retourné dans son emballage d'origine, complet avec ses accessoires et sans trace d'usure anormale.
                  </p>
                  <p>
                    <strong>Garantie légale :</strong> Tous nos produits électroniques et de mode bénéficient de la garantie constructeur ou de la garantie marketplace contre tout vice caché.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-[#00674F]/15 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#FF7518] hover:bg-[#E6630D] text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
