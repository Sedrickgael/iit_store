/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LeftIllustrationPanel } from './components/LeftIllustrationPanel';
import { LoginForm } from './components/LoginForm';
import { SellerLoginForm } from './components/SellerLoginForm';
import { ForgotPasswordModal } from './components/ForgotPasswordModal';
import { CustomerDashboard } from './components/CustomerDashboard';
import { HomePage } from './components/HomePage';
import { SellerDashboard } from './components/SellerDashboard';
import { ToastContainer, type ToastMessage } from './components/Toast';

export default function App() {
  const [currentView, setCurrentView] = useState<'login' | 'seller-login' | 'seller-dashboard' | 'customer-dashboard' | 'home'>('login');
  const [currentStoreName, setCurrentStoreName] = useState<string>('AVG');
  const [initialHomeTab, setInitialHomeTab] = useState<'catalog' | 'cart' | 'favorites' | 'legal-security' | 'become-seller' | 'order-tracking' | 'faq' | 'seller-dashboard'>('catalog');
  const [customerDashboardTab, setCustomerDashboardTab] = useState<'dashboard' | 'orders' | 'deliveries' | 'wallet' | 'profile'>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { id, type, title, description };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLoginSuccess = (email: string) => {
    setCurrentUserEmail(email);
    setIsLoggedIn(true);
    setCustomerDashboardTab('dashboard');
    setInitialHomeTab('catalog');
    setCurrentView('home');
    addToast(
      'success',
      'Connexion réussie',
      `Bienvenue sur iit_store, ${email}. Explorez dès maintenant le catalogue.`
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserEmail('');
    setCurrentView('login');
    addToast('info', 'Déconnexion', 'Vous avez été déconnecté avec succès.');
  };

  const handleResetPasswordToast = (email: string) => {
    addToast(
      'success',
      'Lien transmis',
      `Les instructions ont été envoyées à ${email}.`
    );
  };

  const handleGoToBecomeSeller = () => {
    setInitialHomeTab('become-seller');
    setCurrentView('home');
    addToast('info', 'Espace Vendeur', 'Ouvrez votre boutique certifiée sur iit_store.');
  };

  // If user is on the Home page
  if (currentView === 'home') {
    return (
      <>
        <HomePage
          onGoToLogin={() => {
            if (isLoggedIn) {
              setCustomerDashboardTab('dashboard');
              setCurrentView('customer-dashboard');
            } else {
              setInitialHomeTab('catalog');
              setCurrentView('login');
            }
          }}
          onGoToSellerLogin={() => {
            setCurrentView('seller-login');
          }}
          onGoToSellerDashboard={() => {
            setCurrentView('seller-dashboard');
          }}
          onGoToCustomerDashboard={(tab = 'dashboard') => {
            setCustomerDashboardTab(tab);
            setCurrentView('customer-dashboard');
          }}
          isLoggedIn={isLoggedIn}
          userEmail={currentUserEmail}
          onLogout={handleLogout}
          onToast={addToast}
          initialTab={initialHomeTab}
        />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  // Customer Dashboard View (Dédié au client avec commandes, livraisons, paiements, profil)
  if (currentView === 'customer-dashboard') {
    return (
      <>
        <CustomerDashboard
          userEmail={currentUserEmail || 'client@iit-store.com'}
          initialTab={customerDashboardTab}
          onBackToShopping={() => {
            setInitialHomeTab('catalog');
            setCurrentView('home');
          }}
          onLogout={handleLogout}
          onToast={addToast}
        />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  // Seller Dashboard Solitary View (Page solitaire selon la capture avec logo préservé)
  if (currentView === 'seller-dashboard') {
    return (
      <>
        <SellerDashboard
          storeName={currentStoreName || 'AVG'}
          onBackToShopping={() => {
            setInitialHomeTab('catalog');
            setCurrentView('home');
          }}
          onLogout={() => {
            handleLogout();
            setCurrentView('seller-login');
          }}
          onToast={addToast}
        />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  // Seller Login & Registration View (Dédiée aux vendeurs)
  if (currentView === 'seller-login') {
    return (
      <div className="min-h-screen bg-white text-[#2D423B] flex flex-col lg:flex-row antialiased">
        {/* À gauche : Illustration inspirante marchand */}
        <LeftIllustrationPanel variant="seller" />

        {/* À droite : Formulaire de connexion et inscription dédié aux vendeurs */}
        <main className="w-full lg:w-1/2 flex items-center justify-center min-h-screen">
          <SellerLoginForm
            onLoginSuccess={(sellerEmail, storeName) => {
              setCurrentUserEmail(sellerEmail);
              setCurrentStoreName(storeName || 'AVG');
              setIsLoggedIn(true);
              setCurrentView('seller-dashboard');
              addToast(
                'success',
                'Espace Boutique activé',
                `Bienvenue ${storeName || 'AVG'} dans votre tableau de bord marchand.`
              );
            }}
            onForgotPasswordClick={() => setIsForgotPasswordOpen(true)}
            onBackToHome={() => {
              setInitialHomeTab('catalog');
              setCurrentView('home');
              addToast('info', 'Accueil', 'Bienvenue sur la marketplace iit_store.');
            }}
            onGoToCustomerLogin={() => {
              setCurrentView('login');
            }}
          />
        </main>

        {/* Boîte de dialogue : Mot de passe oublié */}
        <ForgotPasswordModal
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
          onSuccessToast={handleResetPasswordToast}
        />

        {/* Notifications Toast */}
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    );
  }

  // If logged in and in login view, redirect to catalog home
  if (isLoggedIn) {
    return (
      <>
        <HomePage
          onGoToLogin={() => {
            setCustomerDashboardTab('dashboard');
            setCurrentView('customer-dashboard');
          }}
          onGoToSellerLogin={() => {
            setCurrentView('seller-login');
          }}
          onGoToSellerDashboard={() => {
            setCurrentView('seller-dashboard');
          }}
          onGoToCustomerDashboard={(tab = 'dashboard') => {
            setCustomerDashboardTab(tab);
            setCurrentView('customer-dashboard');
          }}
          isLoggedIn={isLoggedIn}
          userEmail={currentUserEmail}
          onLogout={handleLogout}
          onToast={addToast}
          initialTab="catalog"
        />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  // Login View
  return (
    <div className="min-h-screen bg-white text-[#2D423B] flex flex-col lg:flex-row antialiased">
      {/* À gauche : Belle image d'illustration inspirante */}
      <LeftIllustrationPanel />

      {/* À droite : Formulaire de connexion avec bouton et mot de passe oublié */}
      <main className="w-full lg:w-1/2 flex items-center justify-center min-h-screen">
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onForgotPasswordClick={() => setIsForgotPasswordOpen(true)}
          onBackToHome={() => {
            setInitialHomeTab('catalog');
            setCurrentView('home');
            addToast('info', 'Accueil', 'Bienvenue sur la marketplace iit_store.');
          }}
          onGoToBecomeSeller={handleGoToBecomeSeller}
          onGoToSellerLogin={() => setCurrentView('seller-login')}
        />
      </main>

      {/* Boîte de dialogue : Mot de passe oublié */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onSuccessToast={handleResetPasswordToast}
      />

      {/* Notifications Toast */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
