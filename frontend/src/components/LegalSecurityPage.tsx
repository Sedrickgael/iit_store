import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  FileText,
  AlertCircle,
  CheckCircle2,
  Scale,
  CreditCard,
  Truck,
  RotateCcw,
  ArrowLeft,
  Store,
  ChevronRight,
} from 'lucide-react';

interface LegalSecurityPageProps {
  onBackToShopping: () => void;
  onExploreCatalog: () => void;
}

export const LegalSecurityPage: React.FC<LegalSecurityPageProps> = ({
  onBackToShopping,
  onExploreCatalog,
}) => {
  const [activeSection, setActiveSection] = useState<'legal' | 'security' | 'cgv' | 'privacy' | 'returns'>('security');

  const navigationItems = [
    { id: 'security', label: 'Sécurité & Paiements Chiffrés', icon: Lock },
    { id: 'legal', label: 'Mentions Légales', icon: FileText },
    { id: 'cgv', label: 'Conditions Générales de Vente (CGV)', icon: Scale },
    { id: 'privacy', label: 'Politique de Confidentialité (RGPD)', icon: ShieldCheck },
    { id: 'returns', label: 'Garanties, Retours & Droit de Rétractation', icon: RotateCcw },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F5]/40 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
            <span className="font-semibold text-[#00674F]">Mentions Légales & Sécurité</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-[#00674F] to-[#00513d] text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Transparence & Protection Consommateur</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Mentions Légales & Sécurité Marketplace
            </h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Chez <strong>iit_store</strong>, la sécurité de vos transactions, la protection de vos données personnelles et la clarté juridique de vos achats en Afrique et à l’international sont nos priorités absolues.
            </p>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
            <Store className="w-80 h-80 text-white" />
          </div>
        </div>

        {/* Disposition 2 Colonnes : Navigation latérale + Contenu détaillé */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sommaire Gauche */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-5 border border-[#00674F]/15 shadow-sm sticky top-28">
            <h3 className="font-extrabold text-sm text-[#00674F] uppercase tracking-wider mb-3 px-2">
              Sommaire Juridique
            </h3>
            <div className="space-y-1.5">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id as any)}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#00674F] text-white shadow-md shadow-[#00674F]/20'
                        : 'text-[#2D423B] hover:bg-[#F4F7F5] hover:text-[#00674F]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#00674F]'}`} />
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'opacity-40'}`} />
                  </button>
                );
              })}
            </div>

            {/* Encadré d'assistance juridique */}
            <div className="mt-6 p-4 rounded-xl bg-[#F4F7F5] border border-[#00674F]/10 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#00674F] mb-1">
                <AlertCircle className="w-4 h-4" />
                <span>Une question juridique ?</span>
              </div>
              <p className="text-[#2D423B]/75 mb-2.5">
                Notre service conformité et médiation est joignable à tout moment.
              </p>
              <a
                href="mailto:legal@iit-store.com"
                className="font-bold text-[#FF7518] hover:underline"
              >
                legal@iit-store.com
              </a>
            </div>
          </div>

          {/* Contenu Droite */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Section Sécurité & Paiements */}
            {activeSection === 'security' && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#00674F]/15 shadow-sm space-y-8 animate-in fade-in">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF7518] uppercase tracking-wider mb-2">
                    <Lock className="w-4 h-4" />
                    <span>Protocole Bancaire 256-bit</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00674F]">
                    Sécurité des Paiements & Protection des Transactions
                  </h2>
                  <p className="text-sm text-[#2D423B]/80 mt-2 leading-relaxed">
                    Toutes les transactions effectuées sur <strong>iit_store</strong> sont protégées par les plus hauts standards de cryptographie de l’industrie bancaire.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/15">
                    <CreditCard className="w-6 h-6 text-[#FF7518] mb-2.5" />
                    <h4 className="font-extrabold text-sm text-[#2D423B] mb-1">Paiements Chiffrés SSL / TLS</h4>
                    <p className="text-xs text-[#2D423B]/75 leading-relaxed">
                      Aucune coordonnée bancaire n'est stockée en clair sur nos serveurs. Vos informations transitent directement via des passerelles certifiées PCI-DSS Niveau 1.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/15">
                    <ShieldCheck className="w-6 h-6 text-[#00674F] mb-2.5" />
                    <h4 className="font-extrabold text-sm text-[#2D423B] mb-1">Authentification Forte 3D Secure</h4>
                    <p className="text-xs text-[#2D423B]/75 leading-relaxed">
                      Chaque paiement par carte est vérifié avec validation biométrique ou code SMS sécurisé envoyé directement par votre banque émettrice.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/15">
                    <CheckCircle2 className="w-6 h-6 text-[#00674F] mb-2.5" />
                    <h4 className="font-extrabold text-sm text-[#2D423B] mb-1">Paiement Mobile Money Sécurisé</h4>
                    <p className="text-xs text-[#2D423B]/75 leading-relaxed">
                      Intégration directe avec MTN Mobile Money, Moov Money, Orange Money et Wave pour des transactions instantanées et sans frais cachés en Francs CFA (XOF/XAF).
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/15">
                    <Truck className="w-6 h-6 text-[#FF7518] mb-2.5" />
                    <h4 className="font-extrabold text-sm text-[#2D423B] mb-1">Garantie Fonds Protégés</h4>
                    <p className="text-xs text-[#2D423B]/75 leading-relaxed">
                      Le montant de votre achat est conservé sous séquestre sécurisé jusqu'à ce que vous ayez réceptionné et validé l'état de votre colis.
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#00674F]/15 pt-6">
                  <h4 className="font-bold text-sm text-[#00674F] mb-2">Politique Anti-Fraude & Contrôle des Vendeurs</h4>
                  <p className="text-xs sm:text-sm text-[#2D423B]/80 leading-relaxed">
                    Chaque vendeur tiers présent sur iit_store subit une vérification d’identité KYC (Know Your Customer) obligatoire : registre de commerce (RCCM), pièce d’identité du dirigeant et compte bancaire certifié. Tout produit contrefait est immédiatement banni et remboursé intégralement à l’acheteur.
                  </p>
                </div>
              </div>
            )}

            {/* Section Mentions Légales */}
            {activeSection === 'legal' && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#00674F]/15 shadow-sm space-y-6 animate-in fade-in">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00674F] uppercase tracking-wider mb-2">
                    <FileText className="w-4 h-4" />
                    <span>Identification de l'Éditeur</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00674F]">
                    Mentions Légales de la Plateforme
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#2D423B]/85 leading-relaxed">
                  <div className="p-4 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/15 space-y-2">
                    <p><strong>Dénomination sociale :</strong> IIT_STORE MARKETPLACE INTERNATIONAL SAS</p>
                    <p><strong>Capital social :</strong> 50 000 000 FCFA / 76 225 €</p>
                    <p><strong>Siège social Afrique de l'Ouest :</strong> Boulevard de la Marina, Cotonou, République du Bénin</p>
                    <p><strong>Bureau Régional Abidjan :</strong> Boulevard Valéry Giscard d'Estaing, Marcory, Abidjan, Côte d'Ivoire</p>
                    <p><strong>Immatriculation RCCM :</strong> RB/COT/24-B-89102 • NPI : 020241029381</p>
                    <p><strong>Directeur de la Publication :</strong> Direction Générale iit_store</p>
                    <p><strong>Contact électronique :</strong> <a href="mailto:contact@iit-store.com" className="text-[#FF7518] font-bold">contact@iit-store.com</a></p>
                  </div>

                  <h4 className="font-bold text-base text-[#00674F] pt-2">Hébergement & Infrastructure Cloud</h4>
                  <p>
                    La plateforme iit_store est hébergée sur des infrastructures cloud haute disponibilité réparties entre l'Europe (Google Cloud Platform, région europe-west) et l'Afrique de l'Ouest, garantissant un temps de disponibilité (SLA) de 99,9% et une conformité rigoureuse aux normes ISO 27001 et SOC 2.
                  </p>

                  <h4 className="font-bold text-base text-[#00674F] pt-2">Propriété Intellectuelle</h4>
                  <p>
                    La marque « iit_store », les logos, chartes graphiques, photographies de catalogue, architectures de base de données et codes sources composant cette plateforme sont protégés au titre du droit d'auteur et des brevets auprès de l'OAPI (Organisation Africaine de la Propriété Intellectuelle). Toute reproduction totale ou partielle sans accord préalable est formellement interdite.
                  </p>
                </div>
              </div>
            )}

            {/* Section Conditions Générales de Vente (CGV) */}
            {activeSection === 'cgv' && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#00674F]/15 shadow-sm space-y-6 animate-in fade-in">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF7518] uppercase tracking-wider mb-2">
                    <Scale className="w-4 h-4" />
                    <span>Contrat Acheteur / Vendeur</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00674F]">
                    Conditions Générales de Vente (CGV)
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#2D423B]/85 leading-relaxed">
                  <h4 className="font-bold text-sm text-[#00674F]">Article 1 – Champ d’application</h4>
                  <p>
                    Les présentes Conditions Générales régissent l'ensemble des ventes conclues sur la marketplace iit_store entre les acheteurs particuliers ou professionnels et les vendeurs marchands partenaires accrédités.
                  </p>

                  <h4 className="font-bold text-sm text-[#00674F]">Article 2 – Tarifs et Devises</h4>
                  <p>
                    Les prix sont affichés toutes taxes comprises (TTC) en Euros (€) et convertis en temps réel dans les devises ouest-africaines officielles (Franc CFA XOF, Franc CFA XAF, Cedi ghanéen GHS, Naira nigérian NGN, Franc guinéen GNF). Les frais de transport et formalités de douane sont clairement détaillés avant validation définitive du panier.
                  </p>

                  <h4 className="font-bold text-sm text-[#00674F]">Article 3 – Confirmation et Paiement</h4>
                  <p>
                    La commande est réputée ferme et définitive dès validation de l’autorisation de débit bancaire ou accusé de réception du paiement mobile money. Un récapitulatif détaillé avec numéro de suivi (#IIT-...) est instantanément expédié par voie électronique à l’acheteur.
                  </p>

                  <h4 className="font-bold text-sm text-[#00674F]">Article 4 – Expédition & Délais</h4>
                  <p>
                    Les articles sont expédiés sous 24 à 48 heures ouvrées par des transporteurs certifiés (DHL Express, Chronopost International ou réseau logistique express iit_store).
                  </p>
                </div>
              </div>
            )}

            {/* Section Politique de Confidentialité */}
            {activeSection === 'privacy' && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#00674F]/15 shadow-sm space-y-6 animate-in fade-in">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00674F] uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Protection des Données Personnelles</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00674F]">
                    Politique de Confidentialité & Gestion des Cookies
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#2D423B]/85 leading-relaxed">
                  <p>
                    iit_store applique une politique stricte de confidentialité conforme aux dispositions du RGPD européen et aux législations ouest-africaines relatives à la protection des données personnelles (Loi n° 2013-450 en Côte d'Ivoire, Code du Numérique Livre V au Bénin, Loi 2008-12 au Sénégal).
                  </p>

                  <div className="p-4 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/15 space-y-2">
                    <p><strong>1. Données collectées :</strong> Nom, coordonnées postales de livraison, adresse email, historique des commandes, liste de souhaits et identifiants de session sécurisée.</p>
                    <p><strong>2. Finalité :</strong> Traitement des commandes, suivi d'expédition, prévention de la fraude et personnalisation de votre navigation.</p>
                    <p><strong>3. Jamais de revente :</strong> Vos données ne sont jamais cédées, échangées ou vendues à des tiers pour du démarchage commercial publicitaire.</p>
                    <p><strong>4. Exercice de vos droits :</strong> Vous disposez d’un droit permanent d’accès, de rectification et d’effacement de vos données sur simple demande à <a href="mailto:dpo@iit-store.com" className="text-[#FF7518] font-bold">dpo@iit-store.com</a>.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Section Garanties & Retours */}
            {activeSection === 'returns' && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#00674F]/15 shadow-sm space-y-6 animate-in fade-in">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF7518] uppercase tracking-wider mb-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>Satisfaction Garantie</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00674F]">
                    Garantie & Politique de Retours sous 14 Jours
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#2D423B]/85 leading-relaxed">
                  <p>
                    Votre satisfaction est notre engagement fondamental. Si un article commandé ne correspond pas à vos attentes ou présente une non-conformité, vous bénéficiez de notre garantie de remboursement intégrale.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/15 text-center">
                      <span className="block text-2xl font-black text-[#00674F] mb-1">14 jours</span>
                      <span className="text-xs font-bold text-[#2D423B]">Droit de rétractation</span>
                      <p className="text-[11px] text-[#2D423B]/60 mt-1">À compter de la réception de votre colis.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/15 text-center">
                      <span className="block text-2xl font-black text-[#FF7518] mb-1">100%</span>
                      <span className="text-xs font-bold text-[#2D423B]">Remboursement rapide</span>
                      <p className="text-[11px] text-[#2D423B]/60 mt-1">Recrédité sur votre carte ou Mobile Money sous 48h.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/15 text-center">
                      <span className="block text-2xl font-black text-[#00674F] mb-1">2 ans</span>
                      <span className="text-xs font-bold text-[#2D423B]">Garantie légale</span>
                      <p className="text-[11px] text-[#2D423B]/60 mt-1">Contre tout vice caché et défaut de conformité.</p>
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-[#00674F] pt-2">Procédure de retour simplifiée :</h4>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-[#2D423B]/80">
                    <li>Contactez le service client iit_store ou rendez-vous dans l'espace suivi de commande.</li>
                    <li>Téléchargez et imprimez votre étiquette prépayée de retour colis.</li>
                    <li>Remettez l'article dans son emballage d'origine au point relais ou coursier partenaire.</li>
                    <li>Dès contrôle qualitatif, le remboursement est validé immédiatement.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* Bouton d'action bas de page */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-[#00674F]/15">
              <div>
                <h4 className="font-extrabold text-sm text-[#00674F]">Besoin d'effectuer un achat en toute sérénité ?</h4>
                <p className="text-xs text-[#2D423B]/70">Explorez notre sélection de plus de 80 articles authentiques.</p>
              </div>
              <button
                type="button"
                onClick={onExploreCatalog}
                className="px-6 py-3 rounded-xl bg-[#FF7518] hover:bg-[#E6630D] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#FF7518]/25 transition-all cursor-pointer whitespace-nowrap"
              >
                Explorer le catalogue
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
