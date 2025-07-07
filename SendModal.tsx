import React, { useState } from 'react';
import { RefreshCw, Eye, EyeOff, TrendingUp } from 'lucide-react';
import { useWallet } from './hooks/useWallet';

export function BalanceCard() {
  const { state, refreshBalance } = useWallet();             // ✅ safe structure
  const currentWallet = state.currentWallet;

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
  const balanceUSD = (balance * 180).toFixed(2); // mock rate

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.iconWrap}>
            <TrendingUp size={20} color="white" />
          </div>
          <h3 style={styles.title}>Wallet Balance</h3>
        </div>

        <div style={styles.actions}>
          <button onClick={() => setIsBalanceVisible(!isBalanceVisible)} style={styles.actionBtn}>
            {isBalanceVisible ? <EyeOff size={16} color="#d1d5db" /> : <Eye size={16} color="#d1d5db" />}
          </button>
          <button onClick={handleRefresh} style={styles.actionBtn} disabled={isRefreshing}>
            <RefreshCw
              size={16}
              color="#d1d5db"
              className={isRefreshing ? 'animate-spin' : ''}
            />
          </button>
        </div>
      </div>

      <div style={styles.balanceText}>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
          {isBalanceVisible ? `${balance.toFixed(4)} SOL` : '•••••• SOL'}
        </div>
        <div style={{ color: '#9ca3af', marginTop: '6px' }}>
          ≈ {isBalanceVisible ? `$${balanceUSD}` : '••••••'} USD
        </div>
      </div>

      <div style={styles.footer}>
        <span style={{ color: '#9ca3af' }}>24h Change</span>
        <span style={{ color: '#10b981', fontWeight: 500 }}>+2.4%</span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 0 20px rgba(59,130,246,0.4)',
    color: 'white',
    maxWidth: '500px',
    margin: '40px auto',
    fontFamily: `'Segoe UI', sans-serif`,
    textAlign: 'center' as const,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  iconWrap: {
    background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
    padding: '10px',
    borderRadius: '8px'
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  actions: {
    display: 'flex',
    gap: '10px'
  },
  actionBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer'
  },
  balanceText: {
    marginTop: '10px',
    marginBottom: '20px'
  },
  footer: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem'
  }
};
