import React from 'react';
import { Clock, ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react';

export function TransactionHistory() {
  // Mock transaction data
  const transactions = [
    {
      id: '1',
      type: 'send',
      amount: 0.5,
      address: '7K9M...3R2P',
      date: '2 hours ago',
      status: 'confirmed',
      signature: 'abc123...def456'
    },
    {
      id: '2',
      type: 'receive',
      amount: 1.2,
      address: '9P4L...8X1M',
      date: '1 day ago',
      status: 'confirmed',
      signature: 'ghi789...jkl012'
    },
    {
      id: '3',
      type: 'send',
      amount: 0.1,
      address: '2M8N...5Y7Q',
      date: '3 days ago',
      status: 'confirmed',
      signature: 'mno345...pqr678'
    }
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-text-secondary" />
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-surface/20 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                tx.type === 'send' 
                  ? 'bg-secondary/20 text-secondary' 
                  : 'bg-success/20 text-success'
              }`}>
                {tx.type === 'send' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownLeft className="h-4 w-4" />
                )}
              </div>
              <div>
                <div className="font-medium text-text-primary">
                  {tx.type === 'send' ? 'Sent' : 'Received'}
                </div>
                <div className="text-sm text-text-secondary">
                  {tx.type === 'send' ? 'To' : 'From'} {tx.address}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`font-medium ${
                tx.type === 'send' ? 'text-secondary' : 'text-success'
              }`}>
                {tx.type === 'send' ? '-' : '+'}{tx.amount} SOL
              </div>
              <div className="text-sm text-text-secondary">
                {tx.date}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {transactions.length === 0 && (
        <div className="text-center py-8 text-text-secondary">
          <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No transactions yet</p>
        </div>
      )}
    </div>
  );
}