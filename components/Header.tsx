import React from 'react';
import { Wallet, Settings, Plus } from 'lucide-react';

export function Header() {
  return (
    <header className="glass-card mx-4 mt-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">Optik Wallet</h1>
            <p className="text-text-secondary text-sm">Premium Solana Wallet</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="btn-secondary p-2">
            <Plus className="h-5 w-5" />
          </button>
          <button className="btn-secondary p-2">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}