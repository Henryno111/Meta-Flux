import { motion, AnimatePresence } from 'framer-motion';

const TransactionDetailModal = ({ transaction, onClose, onUpdateCategory }) => {
  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 } 
    }
  };
  
  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 } 
    }
  };
  
  // Format date as Month DD, YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
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
  
  // Category display mapping
  const categoryMap = {
    food: { name: 'Food & Dining', icon: '🍔', color: 'bg-green-500/20 text-green-300' },
    shopping: { name: 'Shopping', icon: '🛍️', color: 'bg-blue-500/20 text-blue-300' },
    entertainment: { name: 'Entertainment', icon: '🎬', color: 'bg-purple-500/20 text-purple-300' },
    transport: { name: 'Transportation', icon: '🚗', color: 'bg-yellow-500/20 text-yellow-300' },
    utilities: { name: 'Bills & Utilities', icon: '💡', color: 'bg-red-500/20 text-red-300' },
    housing: { name: 'Housing', icon: '🏠', color: 'bg-indigo-500/20 text-indigo-300' },
    travel: { name: 'Travel', icon: '✈️', color: 'bg-cyan-500/20 text-cyan-300' },
    health: { name: 'Healthcare', icon: '🩺', color: 'bg-pink-500/20 text-pink-300' },
    other: { name: 'Other', icon: '📋', color: 'bg-gray-500/20 text-gray-300' }
  };
  
  // Status display mapping
  const statusMap = {
    completed: { name: 'Completed', color: 'bg-green-500/20 text-green-300' },
    pending: { name: 'Pending', color: 'bg-yellow-500/20 text-yellow-300' },
    failed: { name: 'Failed', color: 'bg-red-500/20 text-red-300' }
  };
  
  // Mock gas costs and blockchain details
  const transactionDetails = {
    gasUsed: '0.00042',
    gasPrice: '1.5 Gwei',
    blockNumber: 12345678,
    confirmations: 32,
    network: 'Linea Mainnet',
    timestamp: new Date(transaction?.date).getTime() / 1000,
  };
  
  if (!transaction) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-gray-700 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Transaction Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Transaction Summary */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <span className="text-sm text-gray-400">Transaction ID</span>
                  <div className="text-lg font-medium text-white flex items-center mt-1">
                    <span className="truncate">{transaction.id}</span>
                    <button className="ml-2 text-blue-400 hover:text-blue-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusMap[transaction.status]?.color} mt-2 sm:mt-0`}>
                  {statusMap[transaction.status]?.name}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-400">Merchant</span>
                  <div className="text-lg font-medium text-white mt-1">{transaction.merchant}</div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-400">Amount</span>
                  <div className="text-lg font-medium text-white mt-1">{formatCurrency(transaction.amount)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-400">Date</span>
                  <div className="text-lg font-medium text-white mt-1">{formatDate(transaction.date)}</div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-400">Category</span>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryMap[transaction.category]?.color}`}>
                      <span className="mr-2">{categoryMap[transaction.category]?.icon}</span>
                      {categoryMap[transaction.category]?.name}
                    </span>
                    
                    <button 
                      onClick={onUpdateCategory}
                      className="ml-2 text-orange-400 hover:text-orange-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Blockchain Details */}
            <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-white mb-3">Blockchain Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Transaction Hash</div>
                  <div className="flex items-center">
                    <span className="text-sm text-white truncate">{transaction.txHash}</span>
                    <a 
                      href={`https://explorer.linea.build/tx/${transaction.txHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-400 hover:text-blue-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Network</div>
                  <div className="text-sm text-white">{transactionDetails.network}</div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Block Number</div>
                  <div className="text-sm text-white">{transactionDetails.blockNumber}</div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Confirmations</div>
                  <div className="text-sm text-white">{transactionDetails.confirmations}</div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Gas Used</div>
                  <div className="text-sm text-white">{transactionDetails.gasUsed} ETH</div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Gas Price</div>
                  <div className="text-sm text-white">{transactionDetails.gasPrice}</div>
                </div>
              </div>
            </div>
            
            {/* Notes Section - Placeholder for future implementation */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Transaction Notes</label>
              <textarea 
                placeholder="Add notes about this transaction..."
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none"
                rows="3"
              ></textarea>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="border-t border-gray-700 px-6 py-4 flex justify-between items-center">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
            >
              Close
            </button>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add to Calendar
              </button>
              <button className="px-4 py-2 bg-blue-500/60 hover:bg-blue-600/60 text-white rounded-lg text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                Export Receipt
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionDetailModal;