import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionCategoryModal = ({ transaction, onClose }) => {
  // Get existing category or default to 'other'
  const [selectedCategory, setSelectedCategory] = useState(transaction?.category || 'other');
  
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
  
  // Category item variants for staggered animation
  const categoryItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Category options with icons and display names
  const categories = [
    { id: 'food', name: 'Food & Dining', icon: '🍔', color: 'from-green-500/20 to-green-600/20' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: 'from-blue-500/20 to-blue-600/20' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: 'from-purple-500/20 to-purple-600/20' },
    { id: 'transport', name: 'Transportation', icon: '🚗', color: 'from-yellow-500/20 to-yellow-600/20' },
    { id: 'utilities', name: 'Bills & Utilities', icon: '💡', color: 'from-red-500/20 to-red-600/20' },
    { id: 'housing', name: 'Housing', icon: '🏠', color: 'from-indigo-500/20 to-indigo-600/20' },
    { id: 'travel', name: 'Travel', icon: '✈️', color: 'from-cyan-500/20 to-cyan-600/20' },
    { id: 'health', name: 'Healthcare', icon: '🩺', color: 'from-pink-500/20 to-pink-600/20' },
    { id: 'other', name: 'Other', icon: '📋', color: 'from-gray-500/20 to-gray-600/20' }
  ];
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Handle save button click
  const handleSave = () => {
    // In a real app, this would update the transaction in the backend
    console.log(`Updated transaction ${transaction.id} category to ${selectedCategory}`);
    onClose();
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
          className="bg-gray-800 border border-gray-700 rounded-xl max-w-lg w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-gray-700 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Update Transaction Category</h2>
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
              <div className="text-sm text-gray-400 mb-1">Transaction</div>
              <div className="flex items-center justify-between">
                <div className="text-lg font-medium text-white">{transaction.merchant}</div>
                <div className="text-lg font-medium text-white">{formatCurrency(transaction.amount)}</div>
              </div>
            </div>
            
            {/* Category Selection */}
            <div>
              <div className="text-sm text-gray-400 mb-4">Select Category</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    variants={categoryItemVariants}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`relative bg-gradient-to-br ${category.color} border ${
                      selectedCategory === category.id 
                        ? 'border-orange-500/70' 
                        : 'border-gray-700/50'
                    } rounded-lg p-4 flex flex-col items-center justify-center transition-colors h-24`}
                  >
                    {selectedCategory === category.id && (
                      <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500"></span>
                    )}
                    <span className="text-2xl mb-2">{category.icon}</span>
                    <span className="text-sm text-white text-center">{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Auto-categorization note */}
            <div className="mt-6 bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-300">
                  Future transactions from <strong>{transaction.merchant}</strong> will be automatically categorized as <strong>{categories.find(c => c.id === selectedCategory)?.name}</strong>.
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="border-t border-gray-700 px-6 py-4 flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
            >
              Cancel
            </button>
            
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-orange-500/70 hover:bg-orange-600/70 text-white rounded-lg text-sm"
            >
              Save Category
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionCategoryModal;