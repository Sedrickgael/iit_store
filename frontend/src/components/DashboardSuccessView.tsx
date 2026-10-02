import React from 'react';
import { LogOut, Store, CheckCircle2, ArrowRight } from 'lucide-react';

interface DashboardSuccessViewProps {
  userEmail: string;
  onLogout: () => void;
  onGoToHome?: () => void;
  onGoToSellerDashboard?: () => void;
}

export const DashboardSuccessView: React.FC<DashboardSuccessViewProps> = ({
  userEmail,
  onLogout,
  onGoToHome,
  onGoToSellerDashboard,
}) => {
  return (
    <div className="min-h-screen bg-white text-[#2D423B] flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-[#00674F]/15 bg-white/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00674F] flex items-center justify-center text-white shadow-sm shadow-[#00674F]/20">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-[#00674F] tracking-tight">
                iit_store
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] text-[#00674F] font-bold tracking-wider uppercase bg-[#00674F]/10 px-2 py-0.5 rounded-full border border-[#00674F]/20">
                Marketplace
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#F4F7F5] border border-[#00674F]/25 text-xs font-bold text-[#2D423B] hover:text-[#00674F] transition-colors cursor-pointer shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </header>

      {/* Main Area */}
      <main className="max-w-xl mx-auto w-full px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="bg-white border border-[#00674F]/20 rounded-3xl p-8 sm:p-10 shadow-xl shadow-[#2D423B]/10 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-5 shadow-xs">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-extrabold text-[#00674F] tracking-tight">
            Connecté à iit_store
          </h1>
          <p className="mt-2 text-sm text-[#2D423B]/80">
            Vous êtes authentifié avec succès en tant que :
          </p>
          <div className="mt-3 px-3.5 py-1.5 bg-[#F4F7F5] rounded-xl border border-[#00674F]/20 inline-block font-mono text-xs text-[#00674F] font-bold shadow-xs">
            {userEmail}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            {onGoToHome && (
              <button
                type="button"
                onClick={onGoToHome}
                className="py-2.5 px-5 bg-[#FF7518] hover:bg-[#E6630D] text-white font-bold text-sm rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-md shadow-[#FF7518]/25"
              >
                <span>Accéder au catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onLogout}
              className="py-2.5 px-5 bg-white hover:bg-[#F4F7F5] text-[#2D423B] hover:text-[#00674F] font-bold text-sm rounded-xl transition-all border border-[#00674F]/25 inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Se déconnecter</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#00674F]/15 py-6 px-6 text-center text-xs text-[#2D423B]/70 bg-white">
        <p>© 2026 iit_store. Tous droits réservés.</p>
      </footer>
    </div>
  );
};
