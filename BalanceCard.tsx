import React, { useState } from 'react';
import { RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useWallet } from '../hooks/useWallet.ts';

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
  const balanceUSD = (balance * 180).toFixed(2); // Mock price

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Wallet Balance</h2>

      <div style={styles.balance}>
        {isBalanceVisible ? `${balance.toFixed(4)} SOL` : '•••••• SOL'}
      </div>

      <div style={styles.usd}>
        ≈ {isBalanceVisible ? `$${balanceUSD}` : '••••••'} USD
      </div>

      <div style={styles.buttons}>
        <button className="cta-button" onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
          {isBalanceVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          &nbsp;Show/Hide
        </button>
        <button className="cta-button" onClick={handleRefresh} disabled={isRefreshing}>
          {isRefreshing ? (
            <span className="animate-spin">
              <RefreshCw size={18} />
            </span>
          ) : (
            <RefreshCw size={18} />
          )}
          &nbsp;Refresh
        </button>
      </div>

      <div style={styles.change}>
        +2.4% (24h Change)
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 0 20px rgba(59,130,246,0.4)',
    color: 'white',
    maxWidth: '500px',
    margin: '40px auto',
    fontFamily: `'Segoe UI', sans-serif`,
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
  },
  balance: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  usd: {
    fontSize: '1.1rem',
    color: '#d1d5db',
    marginBottom: '1.5rem',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '1rem',
  },
  change: {
    fontSize: '0.9rem',
    color: '#10b981',
    marginTop: '1rem',
  },
};
