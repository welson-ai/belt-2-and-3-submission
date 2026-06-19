'use client';

import { useState, useEffect } from 'react';
import { contractService } from '@/lib/contract';
import { Card } from './example-components';

export default function ContractStats() {
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [contractInfo, setContractInfo] = useState<{ admin: string | null; count: number }>({ admin: null, count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

          <button
            onClick={fetchContractData}
            className="w-full bg-stellar-blue hover:bg-stellar-blue-light text-white font-bold py-2 rounded-lg transition-colors"
          >
            Refresh Stats
          </button>
        </div>
      )}
    </Card>
  );
}
