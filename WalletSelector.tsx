import React, { useState } from 'react';
import { ChevronDown, Wallet, Plus } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

export function WalletSelector() {
  const { currentWallet, wallets, switchWallet } = useWallet();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentWallet) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card-hover p-4 w-full flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-text-primary">{currentWallet.name}</h3>
            <p className="text-text-secondary text-sm">
              {currentWallet.address.slice(0, 8)}...{currentWallet.address.slice(-8)}
            </p>
          </div>
        </div>
        
        <ChevronDown className={`h-5 w-5 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card border border-surface/50 rounded-lg z-10">
          <div className="p-2 space-y-1">
            {wallets.map((wallet) => (
              <button
                key={wallet.address}
                onClick={() => {
                  switchWallet(wallet);
                  setIsOpen(false);
                }}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  wallet.address === currentWallet.address
                    ? 'bg-primary/20 text-primary'
                    : 'hover:bg-surface/50 text-text-primary'
                }`}
              >
                <div className="font-medium">{wallet.name}</div>
                <div className="text-sm text-text-secondary">
                  {wallet.address.slice(0, 8)}...{wallet.address.slice(-8)}
                </div>
              </button>
            ))}
            
            <div className="border-t border-surface/30 pt-2">
              <button className="w-full p-3 rounded-lg text-left hover:bg-surface/50 transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4 text-text-secondary" />
                <span className="text-text-secondary">Add New Wallet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}