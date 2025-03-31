import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const RecentTransactions = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock data
  const transactions = [
    {
      id: 'tx1',
      date: '2023-08-15',
      time: '14:32',
      description: 'Online Store Purchase',
      category: 'Shopping',
      amount: -126.50,
      status: 'Completed',
      txHash: '0x7d2a...f83b'
    },
    {
      id: 'tx2',
      date: '2023-08-14',
      time: '20:15',
      description: 'DoorDash Food Delivery',
      category: 'Food & Dining',
      amount: -42.75,
      status: 'Completed',
      txHash: '0x3c8b...e1d7'
    },
    {
      id: 'tx3',
      date: '2023-08-12',
      time: '09:20',
      description: 'Monthly Salary',
      category: 'Income',
      amount: 3200.00,
      status: 'Completed',
      txHash: '0x5e7f...a9c2'
    },
    {
      id: 'tx4',
      date: '2023-08-10',
      time: '17:45',
      description: 'Uber Ride',
      category: 'Transportation',
      amount: -32.50,
      status: 'Completed',
      txHash: '0x2b4d...c6f5'
    }
  ];
  
  // Filter transactions
  const filteredTransactions = activeFilter === 'all' 
    ? transactions 
    : activeFilter === 'expenses' 
      ? transactions.filter(tx => tx.amount < 0)
      : transactions.filter(tx => tx.amount > 0);
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const getCategoryStyle = (category) => {
    switch(category) {
      case 'Shopping':
        return 'bg-purple-500/20 text-purple-400';
      case 'Food & Dining':
        return 'bg-blue-500/20 text-blue-400';
      case 'Income':
        return 'bg-green-500/20 text-green-400';
      case 'Transportation':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  // Mobile card view for transactions
  const renderMobileCard = (tx, index) => (
    <motion.div
      key={tx.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-gray-700/20 rounded-lg p-3 mb-3"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-medium text-white">{tx.description}</div>
          <div className="text-xs text-gray-400">
            {formatDate(tx.date)} • {tx.time}
          </div>
        </div>
        <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getCategoryStyle(tx.category)}`}>
          {tx.category}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-400">
          Tx: {tx.txHash}
        </div>
        <div className={`text-base font-medium ${tx.amount > 0 ? 'text-green-400' : 'text-white'}`}>
          {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} USD
        </div>
      </div>
    </motion.div>
  );
  
  // Desktop table view for transactions
  const renderDesktopTable = () => (
    <div className="overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Date</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Description</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Category</th>
            <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700/30">
          {filteredTransactions.map((tx, index) => (
            <motion.tr
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="hover:bg-gray-700/20 cursor-pointer"
            >
              <td className="py-3 text-sm text-gray-300 whitespace-nowrap">
                <div className="font-medium">{formatDate(tx.date)}</div>
                <div className="text-xs text-gray-500">{tx.time}</div>
              </td>
              <td className="py-3 text-sm text-gray-300">
                <div>{tx.description}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Tx: {tx.txHash}
                </div>
              </td>
              <td className="py-3 text-sm">
                <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getCategoryStyle(tx.category)}`}>
                  {tx.category}
                </span>
              </td>
              <td className={`py-3 text-sm font-medium text-right ${tx.amount > 0 ? 'text-green-400' : 'text-gray-300'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} USD
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Recent Transactions</h2>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-between w-full sm:w-auto px-3 py-1.5 sm:py-2 bg-gray-700/30 rounded-lg text-xs sm:text-sm text-gray-300 hover:bg-gray-700/50"
            >
              <span>
                {activeFilter === 'all' ? 'All Transactions' : 
                 activeFilter === 'expenses' ? 'Expenses Only' : 'Income Only'}
              </span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showFilters && (
              <div className="absolute top-full left-0 right-0 sm:right-auto mt-1 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg z-10 border border-gray-700/50 overflow-hidden">
                <button 
                  onClick={() => {
                    setActiveFilter('all');
                    setShowFilters(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs sm:text-sm transition-colors ${
                    activeFilter === 'all' ? 'bg-gray-700/50 text-white' : 'text-gray-300 hover:bg-gray-700/30'
                  }`}
                >
                  All Transactions
                </button>
                <button 
                  onClick={() => {
                    setActiveFilter('expenses');
                    setShowFilters(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs sm:text-sm transition-colors ${
                    activeFilter === 'expenses' ? 'bg-gray-700/50 text-white' : 'text-gray-300 hover:bg-gray-700/30'
                  }`}
                >
                  Expenses Only
                </button>
                <button 
                  onClick={() => {
                    setActiveFilter('income');
                    setShowFilters(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs sm:text-sm transition-colors ${
                    activeFilter === 'income' ? 'bg-gray-700/50 text-white' : 'text-gray-300 hover:bg-gray-700/30'
                  }`}
                >
                  Income Only
                </button>
              </div>
            )}
          </div>
          
          <Link to="/transactions" className="px-3 py-1.5 sm:py-2 bg-orange-500/20 text-orange-400 rounded-lg text-xs sm:text-sm hover:bg-orange-500/30">
            View All
          </Link>
        </div>
      </div>
      
      {/* Responsive rendering: Mobile cards vs Desktop table */}
      <div className="md:hidden">
        {filteredTransactions.map((tx, index) => renderMobileCard(tx, index))}
      </div>
      <div className="hidden md:block">
        {renderDesktopTable()}
      </div>
      
      {/* Empty state */}
      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700/30 mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <p className="text-gray-400 mb-2">No transactions found</p>
          <p className="text-sm text-gray-500">
            {activeFilter !== 'all' ? 'Try changing your filter' : 'Start tracking your expenses'}
          </p>
        </div>
      )}
      
      {/* Footer with pagination - visible only when there's more data */}
      {filteredTransactions.length > 0 && (
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700/30">
          <p className="text-xs text-gray-400">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>
          <Link to="/transactions" className="text-xs sm:text-sm text-orange-400 hover:text-orange-300 flex items-center">
            <span>See all transactions</span>
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default RecentTransactions;