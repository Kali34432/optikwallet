// /src/components/SendModal.tsx
import React, { useState } from 'react';
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import { X, Send, AlertCircle } from 'lucide-react';
import { useWallet } from './hooks/useWallet';

export function SendModal({ onClose }: SendModalProps) {
  const { currentWallet, refreshBalance } = useWallet(); // ✅ fixed
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!recipient || !amount) {
      setError('Please fill in all fields');
      return;
    }

    if (parseFloat(amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    if (parseFloat(amount) > (currentWallet?.balance || 0)) {
      setError('Insufficient balance');
      return;
    }

    setIsSending(true);
    setError('');

    try {
      const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
      const recipientPubkey = new PublicKey(recipient);
      const lamports = Math.floor(parseFloat(amount) * 1e9);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: currentWallet!.keypair.publicKey,
          toPubkey: recipientPubkey,
          lamports
        })
      );

      const signature = await sendAndConfirmTransaction(connection, transaction, [
        currentWallet!.keypair
      ]);

      console.log('✅ Transaction confirmed:', signature);
      onClose();
    } catch (err: any) {
      console.error('❌ Send error:', err);
      setError('Transaction failed: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>Send SOL</h2>
          <button onClick={onClose} style={styles.iconButton}>
            <X size={20} color="#d1d5db" />
          </button>
        </div>

        <div style={styles.form}>
          <label style={styles.label}>Recipient Address</label>
          <input
            type="text"
            placeholder="Enter Solana address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Amount (SOL)</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
          />
          <div style={styles.hint}>
            Balance: {currentWallet?.balance.toFixed(4)} SOL
          </div>

          {error && (
            <div style={styles.error}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div style={styles.actions}>
            <button
              onClick={onClose}
              className="cta-button"
              disabled={isSending}
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              className="cta-button"
              disabled={isSending || !recipient || !amount}
            >
              {isSending ? 'Sending...' : (
                <>
                  <Send size={16} /> Send
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
    padding: '20px'
  },
  modal: {
    background: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 0 20px rgba(59,130,246,0.4)',
    fontFamily: `'Segoe UI', sans-serif`,
    color: 'white'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  iconButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px'
  },
  label: {
    fontSize: '0.9rem',
    color: '#d1d5db'
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #3b82f6',
    backgroundColor: '#111',
    color: 'white',
    fontSize: '1rem',
    outline: 'none'
  },
  hint: {
    fontSize: '0.85rem',
    color: '#9ca3af'
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#ef4444',
    fontSize: '0.9rem'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    gap: '10px'
  }
};
