import React, { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

interface SendModalProps {
  onClose: () => void;
}

export function SendModal({ onClose }: SendModalProps) {
  const { currentWallet } = useWallet();
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
      // TODO: Implement actual transaction sending
      await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay
      onClose();
    } catch (err) {
      setError('Failed to send transaction');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card max-w-md w-full p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Send SOL</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface/50 rounded-lg">
            <X className="h-5 w-5 text-text-secondary" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-text-accent text-sm font-medium mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter Solana address"
              className="input-primary"
            />
          </div>
          
          <div>
            <label className="block text-text-accent text-sm font-medium mb-2">
              Amount (SOL)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.0001"
              className="input-primary"
            />
            <div className="text-text-secondary text-sm mt-1">
              Balance: {currentWallet?.balance.toFixed(4)} SOL
            </div>
          </div>
          
          {error && (
            <div className="flex items-center space-x-2 text-error text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="btn-secondary flex-1"
              disabled={isSending}
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={isSending || !recipient || !amount}
              className="btn-primary flex-1 flex items-center justify-center space-x-2"
            >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}