import React, { useState } from 'react';
import {
  Package,
  Search,
  Truck,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Copy,
} from 'lucide-react';

interface OrderTrackingPageProps {
  onBackToShopping: () => void;
  onToast?: (type: 'success' | 'error' | 'info', title: string, desc?: string) => void;
}

interface TrackingStep {
  date: string;
  time: string;
  title: string;
  location: string;
  isCompleted: boolean;
  isCurrent?: boolean;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  onBackToShopping,
  onToast,
}) => {
  const [trackingNumber, setTrackingNumber] = useState('IIT-89241-BJ');
  const [activeTracking, setActiveTracking] = useState<{
    orderId: string;
    carrier: string;
    destination: string;
    estimatedDelivery: string;
    statusText: string;
    recipient: string;
    itemsCount: number;
    steps: TrackingStep[];
  } | null>({
    orderId: 'IIT-89241-BJ',
    carrier: 'iit_store Express & DHL Africa',
    destination: 'Cotonou, République du Bénin 🇧🇯',
    estimatedDelivery: 'Demain avant 17h00',
    statusText: 'En cours d acheminement au hub local',
    recipient: 'Vincent André',
    itemsCount: 3,
    steps: [
      {
        date: '27 Septembre 2026',
        time: '14:20',
        title: 'Commande validée et paiement confirmé',
        location: 'Plateforme Centrale iit_store',
        isCompleted: true,
      },
      {
        date: '27 Septembre 2026',
        time: '18:45',
        title: 'Colis soigneusement préparé par le vendeur partenaire',
        location: 'Atelier Partenaire - Abidjan',
        isCompleted: true,
      },
      {
        date: '28 Septembre 2026',
        time: '08:15',
        title: 'Dédouanement et transit aérien régional validé',
        location: 'Aéroport International Félix Houphouët-Boigny',
        isCompleted: true,
      },
      {
        date: '28 Septembre 2026',
        time: '11:30',
        title: 'Arrivée au centre de tri régional de Cotonou',
        location: 'Hub Logistique iit_store Cotonou Marina',
        isCompleted: true,
        isCurrent: true,
      },
      {
        date: '29 Septembre 2026',
        time: 'Matin',
        title: 'Remise au coursier pour livraison finale en main propre',
        location: 'Adresse du destinataire',
        isCompleted: false,
      },
    ],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      onToast?.('error', 'Numéro requis', 'Veuillez saisir votre numéro de commande ou de suivi.');
      return;
    }

    const cleanNum = trackingNumber.trim().toUpperCase();

    // Génération dynamique de suivi réaliste
    setActiveTracking({
      orderId: cleanNum,
      carrier: 'iit_store Logistique Partenaire',
      destination: 'Livraison Express Afrique de l Ouest',
      estimatedDelivery: 'Sous 24 à 48 heures ouvrées',
      statusText: 'Colis en cours de traitement logistique prioritaire',
      recipient: 'Client iit_store vérifié',
      itemsCount: 2,
      steps: [
        {
          date: 'Aujourd hui',
          time: '10:00',
          title: 'Paiement sécurisé validé et commande enregistrée',
          location: 'Système iit_store',
          isCompleted: true,
        },
        {
          date: 'Aujourd hui',
          time: '12:30',
          title: 'Colis scellé et étiquette transport émise',
          location: 'Entrepôt d expédition certifié',
          isCompleted: true,
          isCurrent: true,
        },
        {
          date: 'Prochaine étape',
          time: '24h',
          title: 'Prise en charge par le transporteur pour livraison',
          location: 'En route vers votre ville',
          isCompleted: false,
        },
      ],
    });

    onToast?.(
      'success',
      'Suivi actualisé',
      `Informations en temps réel pour le colis ${cleanNum}.`
    );
  };

  const copyToClipboard = () => {
    if (activeTracking?.orderId) {
      navigator.clipboard?.writeText(activeTracking.orderId);
      onToast?.('info', 'Copié', `Numéro de suivi ${activeTracking.orderId} copié.`);
    }
  };

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
            <span className="font-semibold text-[#00674F]">Suivi de colis</span>
          </div>
        </div>

        {/* Titre & Barre de Recherche du Colis */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#00674F]/15 shadow-sm mb-8">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#00674F]/10 text-[#00674F] flex items-center justify-center mx-auto mb-3">
              <Truck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00674F]">
              Suivre l'acheminement de mon colis
            </h1>
            <p className="text-xs sm:text-sm text-[#2D423B]/70 mt-1.5">
              Entrez le numéro de commande reçu par email (ex: <code className="font-mono text-[#00674F] bg-[#F4F7F5] px-1.5 py-0.5 rounded">IIT-89241-BJ</code> ou <code className="font-mono text-[#00674F] bg-[#F4F7F5] px-1.5 py-0.5 rounded">IIT-54210-CI</code>).
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Package className="w-4 h-4 text-[#2D423B]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Ex: IIT-89241-BJ"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#00674F]/25 text-sm font-medium focus:border-[#FF7518] focus:ring-2 focus:ring-[#FF7518]/20 focus:outline-none uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#FF7518] hover:bg-[#E6630D] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#FF7518]/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Rechercher</span>
            </button>
          </form>
        </div>

        {/* Détail du Suivi en Temps Réel */}
        {activeTracking && (
          <div className="bg-white rounded-3xl border border-[#00674F]/15 shadow-sm p-6 sm:p-10 mb-8 space-y-8 animate-in fade-in">
            {/* Entête Colis */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#00674F]/15">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#2D423B]/60 uppercase tracking-wider">
                    Numéro de suivi :
                  </span>
                  <span className="font-mono font-black text-sm text-[#00674F] bg-[#F4F7F5] px-2.5 py-1 rounded-lg">
                    {activeTracking.orderId}
                  </span>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="p-1 hover:bg-[#F4F7F5] rounded-md text-[#2D423B]/50 hover:text-[#00674F] transition-colors cursor-pointer"
                    title="Copier le numéro"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-[#2D423B] mt-2">
                  {activeTracking.statusText}
                </h2>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-[#2D423B]/60 block font-semibold">
                  Date estimée d'arrivée :
                </span>
                <span className="text-sm sm:text-base font-extrabold text-[#FF7518]">
                  {activeTracking.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Fiches de Résumé Logistique */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/10">
                <span className="text-[11px] font-bold text-[#00674F] uppercase tracking-wider block mb-1">
                  Transporteur
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#2D423B] block">
                  {activeTracking.carrier}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/10">
                <span className="text-[11px] font-bold text-[#00674F] uppercase tracking-wider block mb-1">
                  Destination
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#2D423B] block">
                  {activeTracking.destination}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4F7F5] border border-[#00674F]/10">
                <span className="text-[11px] font-bold text-[#00674F] uppercase tracking-wider block mb-1">
                  Destinataire
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#2D423B] block">
                  {activeTracking.recipient} ({activeTracking.itemsCount} articles)
                </span>
              </div>
            </div>

            {/* Timeline verticale des étapes */}
            <div>
              <h3 className="font-extrabold text-sm text-[#00674F] uppercase tracking-wider mb-6">
                Chronologie détaillée de l'expédition
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#00674F]/20">
                {activeTracking.steps.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Pastille timeline */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                        step.isCurrent
                          ? 'bg-[#FF7518] border-white text-white shadow-md ring-4 ring-[#FF7518]/25 scale-110'
                          : step.isCompleted
                          ? 'bg-[#00674F] border-white text-white shadow-xs'
                          : 'bg-white border-neutral-300 text-neutral-300'
                      }`}
                    >
                      {step.isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                    </div>

                    {/* Contenu de l'étape */}
                    <div className="bg-[#F4F7F5]/70 hover:bg-[#F4F7F5] p-4 rounded-2xl border border-[#00674F]/10 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4
                          className={`font-extrabold text-xs sm:text-sm ${
                            step.isCurrent
                              ? 'text-[#FF7518]'
                              : step.isCompleted
                              ? 'text-[#2D423B]'
                              : 'text-[#2D423B]/60'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <span className="text-[11px] font-bold text-[#00674F] whitespace-nowrap">
                          {step.date} • {step.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#2D423B]/70">
                        <MapPin className="w-3.5 h-3.5 text-[#00674F] shrink-0" />
                        <span>{step.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assistance livraison */}
            <div className="border-t border-[#00674F]/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00674F]/10 text-[#00674F] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-extrabold text-xs sm:text-sm text-[#2D423B]">
                    Une question sur la livraison ?
                  </h5>
                  <p className="text-xs text-[#2D423B]/70">
                    Notre équipe logistique répond en direct par téléphone et WhatsApp.
                  </p>
                </div>
              </div>
              <a
                href="tel:+22921000000"
                className="px-5 py-2.5 rounded-xl border border-[#00674F]/25 text-xs font-bold text-[#00674F] hover:bg-[#00674F] hover:text-white transition-all cursor-pointer whitespace-nowrap"
              >
                Contacter le support logistique
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
