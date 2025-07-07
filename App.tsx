import React, { useState, useEffect } from 'react';
import { WalletProvider } from './contexts/WalletContext';
import { Header } from './components/Header';
import { WalletDashboard } from './components/WalletDashboard';
import { WalletSetup } from './components/WalletSetup';
import { useWallet } from './hooks/useWallet';

function AppContent() {
  const { currentWallet, wallets, isLoading } = useWallet();
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    if (wallets.length === 0) {
      setShowSetup(true);
    }
  }, [wallets]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-secondary/10"></div>
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {showSetup || !currentWallet ? (
            <WalletSetup onComplete={() => setShowSetup(false)} />
          ) : (
            <WalletDashboard />
          )}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}

export default App;