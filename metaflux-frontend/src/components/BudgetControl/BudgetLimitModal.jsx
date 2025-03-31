import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BudgetLimitModal = ({ category, onClose }) => {
  const [limit, setLimit] = useState(category ? category.budget : 0);
  const [recurrence, setRecurrence] = useState('monthly');
  const [alerts, setAlerts] = useState(true);
  const [smartContractEnabled, setSmartContractEnabled] = useState(true);
  
  // Update limit when category changes
  useEffect(() => {
    if (category) {
      setLimit(category.budget);
    }
  }, [category]);
  
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
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the budget limit
    console.log({
      categoryId: category?.id,
      newLimit: parseFloat(limit),
      recurrence,
      alerts,
      smartContractEnabled
    });
    onClose();
  };
  
  if (!category) return null;
  
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
          className="bg-gray-800 border border-gray-700 rounded-xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-gray-700 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Edit Budget Limit</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-5">
              {/* Category Info */}
              <div className="flex items-center">
                <span className="text-2xl mr-3">
                  {category.icon ? category.icon : '🏷️'}
                </span>
                <div>
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-medium">{category.name}</div>
                </div>
              </div>
              
              {/* Budget Limit */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Budget Limit</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-7 pr-3 py-2 text-white"
                  />
                </div>
              </div>
              
              {/* Recurrence */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Recurrence</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRecurrence('daily')}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      recurrence === 'daily' 
                        ? 'bg-orange-500/70 text-white' 
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    Daily
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecurrence('weekly')}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      recurrence === 'weekly' 
                        ? 'bg-orange-500/70 text-white' 
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecurrence('monthly')}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      recurrence === 'monthly' 
                        ? 'bg-orange-500/70 text-white' 
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
              
              {/* Advanced Options */}
              <div className="space-y-3 pt-3 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="text-sm text-white">Enable Alerts</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setAlerts(!alerts)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                      alerts ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        alerts ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm text-white">Smart Contract Enforcement</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSmartContractEnabled(!smartContractEnabled)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                      smartContractEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        smartContractEnabled ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              {/* Gas fee notice */}
              {smartContractEnabled && (
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-gray-300">
                      Setting up a budget limit with smart contract enforcement will require a one-time gas fee (estimated: $0.05-0.15 on Linea).
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500/70 hover:bg-orange-600/70 text-white rounded-lg text-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BudgetLimitModal;