import React, { useState } from 'react';
import { X, Copy, Check, QrCode } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

interface ReceiveModalProps {
  onClose: () => void;
}

export function ReceiveModal({ onClose }: ReceiveModalProps) {
  const { currentWallet } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (currentWallet?.address) {
      await navigator.clipboard.writeText(currentWallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card max-w-md w-full p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Receive SOL</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface/50 rounded-lg">
            <X className="h-5 w-5 text-text-secondary" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
            </div>
            <p className="text-text-secondary text-sm">
              Scan this QR code to send SOL to this wallet
            </p>
          </div>
          
          <div>
            <label className="block text-text-accent text-sm font-medium mb-2">
              Wallet Address
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={currentWallet?.address || ''}
                readOnly
                className="input-primary flex-1 font-mono text-sm"
              />
              <button
                onClick={handleCopy}
                className="p-3 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <p className="text-warning text-sm">
              <strong>Important:</strong> Only send SOL and SPL tokens to this address. 
              Sending other cryptocurrencies may result in permanent loss.
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="btn-primary w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}