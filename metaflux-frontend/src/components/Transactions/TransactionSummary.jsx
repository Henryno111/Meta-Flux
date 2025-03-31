import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TransactionSummary = ({ dateRange }) => {
  // Mock data for transaction summary
  const [summaryData, setSummaryData] = useState({
    month: {
      totalSpent: 2345.67,
      transactionCount: 42,
      averageTransaction: 55.85,
      largestTransaction: 423.50
    },
    quarter: {
      totalSpent: 6892.34,
      transactionCount: 127,
      averageTransaction: 54.27,
      largestTransaction: 750.00
    },
    year: {
      totalSpent: 28546.90,
      transactionCount: 483,
      averageTransaction: 59.10,
      largestTransaction: 2150.75
    }
  });
  
  // Current data based on selected date range
  const currentData = summaryData[dateRange] || summaryData.month;
  
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
  };
  
  // Format number as currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Calculate spending comparison to previous period
  // (This would normally come from backend, mocked here)
  const getSpendingComparison = () => {
    const comparisons = {
      month: 12.5, // 12.5% increase from last month
      quarter: -5.3, // 5.3% decrease from last quarter
      year: 8.7 // 8.7% increase from last year
    };
    
    return comparisons[dateRange] || 0;
  };
  
  const spendingComparison = getSpendingComparison();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Spent Card */}
      <motion.div 
        variants={cardVariants}
        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
      >
        <div className="text-gray-400 text-sm mb-1">Total Spent</div>
        <div className="flex items-baseline">
          <div className="text-2xl font-bold text-white">{formatCurrency(currentData.totalSpent)}</div>
          <div className={`ml-2 text-xs ${spendingComparison >= 0 ? 'text-red-400' : 'text-green-400'}`}>
            {spendingComparison >= 0 ? '↑' : '↓'} {Math.abs(spendingComparison)}%
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          {dateRange === 'month' && 'Total spent this month'}
          {dateRange === 'quarter' && 'Total spent this quarter'}
          {dateRange === 'year' && 'Total spent this year'}
        </div>
      </motion.div>
      
      {/* Transaction Count Card */}
      <motion.div 
        variants={cardVariants}
        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
      >
        <div className="text-gray-400 text-sm mb-1">Transactions</div>
        <div className="text-2xl font-bold text-white">{currentData.transactionCount}</div>
        <div className="mt-3 text-xs text-gray-500">
          Number of transactions
        </div>
      </motion.div>
      
      {/* Average Transaction Card */}
      <motion.div 
        variants={cardVariants}
        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
      >
        <div className="text-gray-400 text-sm mb-1">Average Transaction</div>
        <div className="text-2xl font-bold text-white">{formatCurrency(currentData.averageTransaction)}</div>
        <div className="mt-3 text-xs text-gray-500">
          Average amount per transaction
        </div>
      </motion.div>
      
      {/* Largest Transaction Card */}
      <motion.div 
        variants={cardVariants}
        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
      >
        <div className="text-gray-400 text-sm mb-1">Largest Transaction</div>
        <div className="text-2xl font-bold text-white">{formatCurrency(currentData.largestTransaction)}</div>
        <div className="mt-3 text-xs text-gray-500">
          Highest single transaction amount
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionSummary;