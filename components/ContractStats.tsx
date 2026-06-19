'use client';

import { useState, useEffect } from 'react';
import { contractService, TransactionResult } from '@/lib/contract';
import { Card } from './example-components';

export default function ContractStats() {
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [contractInfo, setContractInfo] = useState<{ admin: string | null; count: number }>({ admin: null, count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentTransaction, setRecentTransaction] = useState<TransactionResult | null>(null);

  const fetchContractData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch transaction count
      const count = await contractService.getTransactionCount();
      setTransactionCount(count);
      
      // Fetch contract info
      const info = await contractService.getInfo();
      setContractInfo(info);
    } catch (err) {
      setError('Failed to fetch contract data');
      console.error('Error fetching contract data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecordPayment = async () => {
    try {
      // This is a demo - in a real implementation, you would get these values from a form
      const result = await contractService.recordPayment(
        'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        100,
        'XLM',
        'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
      );
      
      if (result.hash) {
        setRecentTransaction(result);
      }
    } catch (err) {
      console.error('Error recording payment:', err);
    }
  };

  useEffect(() => {
    fetchContractData();
  }, []);

  return (
    <Card title="Soroban Contract Stats" className="mb-6">
      {loading ? (
        <div className="text-center py-8 text-white/60">
          <p>Loading contract data...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-400">
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-stellar-surface rounded-lg p-4 border border-stellar-blue/20">
            <p className="text-white/60 text-sm mb-1">Total Transactions</p>
            <p className="text-3xl font-bold text-stellar-gold">{transactionCount}</p>
          </div>
          
          <div className="bg-stellar-surface rounded-lg p-4 border border-stellar-blue/20">
            <p className="text-white/60 text-sm mb-1">Contract Admin</p>
            <p className="text-sm text-white font-mono break-all">
              {contractInfo.admin || 'Not set'}
            </p>
          </div>

          {recentTransaction && recentTransaction.hash && (
            <div className="bg-stellar-surface rounded-lg p-4 border border-stellar-gold/30">
              <p className="text-white/60 text-sm mb-1">Recent Transaction</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-xs">Status:</span>
                  <span className={`text-xs font-bold ${recentTransaction.status === 'success' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {recentTransaction.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-xs">Hash:</span>
                  <a
                    href={recentTransaction.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-stellar-gold hover:text-stellar-gold-light font-mono break-all"
                  >
                    {recentTransaction.hash}
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={fetchContractData}
              className="flex-1 bg-stellar-blue hover:bg-stellar-blue-light text-white font-bold py-2 rounded-lg transition-colors"
            >
              Refresh Stats
            </button>
            <button
              onClick={handleRecordPayment}
              className="flex-1 bg-stellar-gold hover:bg-stellar-gold-light text-white font-bold py-2 rounded-lg transition-colors"
            >
              Test Payment
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
