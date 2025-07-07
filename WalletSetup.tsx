import React, { useState } from 'react';
import { PlusCircle, Wallet, Sparkles } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

interface WalletSetupProps {
  onComplete: () => void;
}

export function WalletSetup({ onComplete }: WalletSetupProps) {
  const [walletName, setWalletName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { createWallet } = useWallet();

  const handleCreateWallet = async () => {
    if (!walletName.trim()) return;
    
    setIsCreating(true);
    try {
      await createWallet(walletName);
      onComplete();
    } catch (error) {
      console.error('Failed to create wallet:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 animate-fade-in">
      <div className="glass-card p-8 text-center">
        <div className="bg-gradient-primary p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Wallet className="h-10 w-10 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold mb-2 gradient-text">
          Welcome to Optik Wallet
        </h2>
        <p className="text-text-secondary mb-8">
          Create your first Solana wallet to get started with the future of decentralized finance.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-text-accent text-sm font-medium mb-2">
              Wallet Name
            </label>
            <input
              type="text"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder="Enter wallet name (e.g., Main Wallet)"
              className="input-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateWallet()}
            />
          </div>
          
          <button
            onClick={handleCreateWallet}
            disabled={!walletName.trim() || isCreating}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Creating Wallet...</span>
              </>
            ) : (
              <>
                <PlusCircle className="h-5 w-5" />
                <span>Create Wallet</span>
              </>
            )}
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-surface/20 rounded-lg">
          <div className="flex items-center justify-center space-x-2 text-text-secondary text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Your keys are stored locally and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}