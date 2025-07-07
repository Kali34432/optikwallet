import React, { useEffect } from 'react';
import { RefreshCw, Eye, EyeOff, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';

export function BalanceCard() {
  const { currentWallet, refreshBalance } = useWallet();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!currentWallet) return;
    
    setIsRefreshing(true);
    try {
      await refreshBalance(currentWallet.address);
    } finally {
      setIsRefreshing(false);
    }
  };

  const balance = currentWallet?.balance || 0;
  const balanceUSD = (balance * 180).toFixed(2); // Mock SOL price

  return (
    <div className="glass-card p-6 hover:bg-surface/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold">Total Balance</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsBalanceVisible(!isBalanceVisible)}
            className="p-2 hover:bg-surface/50 rounded-lg transition-colors"
          >
            {isBalanceVisible ? (
              <EyeOff className="h-4 w-4 text-text-secondary" />
            ) : (
              <Eye className="h-4 w-4 text-text-secondary" />
            )}
          </button>
          
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 hover:bg-surface/50 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 text-text-secondary ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-text-primary">
            {isBalanceVisible ? `${balance.toFixed(4)}` : '••••••'}
          </span>
          <span className="text-text-secondary font-medium">SOL</span>
        </div>
        
        <div className="text-text-secondary">
          ≈ ${isBalanceVisible ? balanceUSD : '••••••'} USD
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-surface/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">24h Change</span>
          <span className="text-success font-medium">+2.4%</span>
        </div>
      </div>
    </div>
  );
}

.cta button {
  margin: 0 10px;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: linear-gradient(to right, #06b6d4, #3b82f6);
  color: white;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.cta button:hover {
  transform: scale(1.05);
  opacity: 0.95;
}

.starburst {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, #60a5fa, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 5;
  color: white;
  box-shadow: 0 0 20px rgba(96, 165, 250, 0.75);
  transition: transform 0.2s ease;
}

.starburst:hover {
  transform: scale(1.15);
  background: radial-gradient(circle, #93c5fd, #3b82f6);
}
