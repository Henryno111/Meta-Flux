import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RewardsCashbackHistory = ({ onClaimCashback }) => {
  // Mock data for cashback transactions
  const [cashbackHistory, setCashbackHistory] = useState([
    { 
      id: 1, 
      amount: 12.50, 
      source: "Monthly spending below 85% of budget", 
      status: "available",
      date: "Mar 28, 2025"
    },
    { 
      id: 2, 
      amount: 18.25, 
      source: "10+ transactions with preferred merchants", 
      status: "available",
      date: "Mar 15, 2025"
    },
    { 
      id: 3, 
      amount: 11.55, 
      source: "Maintained budget categories for 3 months", 
      status: "available",
      date: "Feb 28, 2025"
    },
    { 
      id: 4, 
      amount: 25.75, 
      source: "Quarterly responsible spending bonus", 
      status: "claimed",
      date: "Feb 01, 2025",
      claimDate: "Feb 03, 2025",
      transactionHash: "0x71C...1F3d"
    },
    { 
      id: 5, 
      amount: 15.30, 
      source: "Monthly spending below 85% of budget", 
      status: "claimed",
      date: "Jan 29, 2025",
      claimDate: "Jan 31, 2025",
      transactionHash: "0x35A...9B2c"
    },
  ]);
  
  // Filter settings
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };
  
  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Filter cashback based on status
  const getFilteredCashback = () => {
    let filtered = [...cashbackHistory];
    
    if (filter === 'available') {
      filtered = filtered.filter(item => item.status === 'available');
    } else if (filter === 'claimed') {
      filtered = filtered.filter(item => item.status === 'claimed');
    }
    
    // Sort by date or amount
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'amount') {
      filtered.sort((a, b) => b.amount - a.amount);
    }
    
    return filtered;
  };
  
  const filteredCashback = getFilteredCashback();
  
  // Calculate total available cashback
  const totalAvailable = cashbackHistory
    .filter(item => item.status === 'available')
    .reduce((sum, item) => sum + item.amount, 0);
    
  // Calculate counts for filters
  const availableCount = cashbackHistory.filter(item => item.status === 'available').length;
  const claimedCount = cashbackHistory.filter(item => item.status === 'claimed').length;
  
  // Handle claim all available cashback
  const handleClaimAll = () => {
    if (totalAvailable <= 0) return;
    
    onClaimCashback({
      type: 'all',
      amount: totalAvailable,
      items: cashbackHistory.filter(item => item.status === 'available')
    });
  };
  
  // Handle claim individual cashback
  const handleClaimSingle = (item) => {
    onClaimCashback({
      type: 'single',
      amount: item.amount,
      items: [item]
    });
  };
  
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-lg font-semibold text-white">Cashback History</h2>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === 'all' 
                ? 'bg-gray-600 text-white' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
            }`}
          >
            All
            <span className="ml-1 bg-gray-700 text-xs py-0.5 px-1.5 rounded-md">
              {cashbackHistory.length}
            </span>
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === 'available' 
                ? 'bg-green-500/50 text-white' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
            }`}
          >
            Available
            <span className="ml-1 bg-gray-700 text-xs py-0.5 px-1.5 rounded-md">
              {availableCount}
            </span>
          </button>
          <button
            onClick={() => setFilter('claimed')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === 'claimed' 
                ? 'bg-blue-500/50 text-white' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
            }`}
          >
            Claimed
            <span className="ml-1 bg-gray-700 text-xs py-0.5 px-1.5 rounded-md">
              {claimedCount}
            </span>
          </button>
        </div>
      </div>
      
      {/* Sort controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700/50 border border-gray-600 rounded-md text-xs text-white px-2 py-1"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
        
        {availableCount > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClaimAll}
            className="text-xs px-3 py-1 bg-green-500/70 hover:bg-green-600/70 text-white rounded-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Claim All (${totalAvailable.toFixed(2)})
          </motion.button>
        )}
      </div>
      
      {/* Cashback List */}
      <div className="relative min-h-[200px]">
        <AnimatePresence>
          {filteredCashback.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center text-gray-400"
            >
              No cashback rewards found matching your filter
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {filteredCashback.map((cashback) => (
                <motion.div
                  key={cashback.id}
                  variants={itemVariants}
                  className={`bg-gray-700/30 rounded-lg p-4 ${
                    cashback.status === 'available' ? 'border-l-4 border-green-500/50' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-white">${cashback.amount.toFixed(2)}</h3>
                        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                          cashback.status === 'available' 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {cashback.status === 'available' ? 'Available' : 'Claimed'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300 mt-1">{cashback.source}</div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        Earned: {cashback.date}
                        {cashback.status === 'claimed' && ` • Claimed: ${cashback.claimDate}`}
                      </div>
                    </div>
                    
                    {cashback.status === 'available' ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleClaimSingle(cashback)}
                        className="self-end sm:self-auto text-xs px-3 py-1 bg-green-500/50 hover:bg-green-600/50 text-white rounded-md"
                      >
                        Claim Now
                      </motion.button>
                    ) : (
                      <a 
                        href={`https://explorer.linea.build/tx/${cashback.transactionHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="self-end sm:self-auto text-xs px-3 py-1 bg-gray-600/50 text-gray-300 rounded-md flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Transaction
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700/30 flex justify-between items-center">
        <div className="text-xs text-gray-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Cashback rewards are paid in USDC on Linea
        </div>
        
        <button className="text-xs px-3 py-1 rounded-md bg-blue-500/50 text-white hover:bg-blue-600/50 transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
          </svg>
          Export History
        </button>
      </div>
    </div>
  );
};

export default RewardsCashbackHistory;