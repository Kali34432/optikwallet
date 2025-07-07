import React, { useState } from 'react';
import { BalanceCard } from './BalanceCard';
import { TransactionHistory } from './TransactionHistory';
import { SendReceiveButtons } from './SendReceiveButtons';
import { WalletSelector } from './WalletSelector';
import { SendModal } from './SendModal';
import { ReceiveModal } from './ReceiveModal';

export function WalletDashboard() {
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <WalletSelector />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BalanceCard />
          <SendReceiveButtons 
            onSend={() => setShowSendModal(true)}
            onReceive={() => setShowReceiveModal(true)}
          />
        </div>
        
        <div className="space-y-6">
          <TransactionHistory />
        </div>
      </div>
      
      {showSendModal && (
        <SendModal onClose={() => setShowSendModal(false)} />
      )}
      
      {showReceiveModal && (
        <ReceiveModal onClose={() => setShowReceiveModal(false)} />
      )}
    </div>
  );
}