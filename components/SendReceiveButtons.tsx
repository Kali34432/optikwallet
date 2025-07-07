import React from 'react';
import { Send, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface SendReceiveButtonsProps {
  onSend: () => void;
  onReceive: () => void;
}

export function SendReceiveButtons({ onSend, onReceive }: SendReceiveButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={onSend}
        className="glass-card-hover p-6 flex flex-col items-center space-y-3 group"
      >
        <div className="bg-gradient-secondary p-3 rounded-full group-hover:scale-110 transition-transform">
          <ArrowUpRight className="h-6 w-6 text-white" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-text-primary">Send</h3>
          <p className="text-text-secondary text-sm">Transfer SOL & tokens</p>
        </div>
      </button>
      
      <button
        onClick={onReceive}
        className="glass-card-hover p-6 flex flex-col items-center space-y-3 group"
      >
        <div className="bg-gradient-primary p-3 rounded-full group-hover:scale-110 transition-transform">
          <ArrowDownLeft className="h-6 w-6 text-white" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-text-primary">Receive</h3>
          <p className="text-text-secondary text-sm">Get your wallet address</p>
        </div>
      </button>
    </div>
  );
}