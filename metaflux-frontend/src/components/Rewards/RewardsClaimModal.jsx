import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RewardsClaimModal = ({ reward, onClose }) => {
  const [claimStep, setClaimStep] = useState('confirm'); // confirm, processing, success
  const [walletAddress, setWalletAddress] = useState('0x71C...1F3d'); // Default wallet (would be from connected wallet)
  
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
  
  // Calculate total amount if claiming multiple rewards
  const getTotalAmount = () => {
    if (!reward) return 0;
    
    if (reward.type === 'all' || reward.type === 'single') {
      return reward.amount;
    }
    
    // If it's a single reward item
    return reward.amount || 0;
  };
  
  // Handle claim submission
  const handleClaim = () => {
    setClaimStep('processing');
    
    // Simulate processing delay
    setTimeout(() => {
      setClaimStep('success');
    }, 2000);
  };
  
  // Gas fee estimation (would be dynamic in real app)
  const estimatedGasFee = 0.05; // in USD
  const totalAmount = getTotalAmount();
  
  if (!reward && !totalAmount) return null;
  
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
            <h2 className="text-lg font-semibold text-white">
              {claimStep === 'confirm' && 'Claim Cashback Rewards'}
              {claimStep === 'processing' && 'Processing Claim'}
              {claimStep === 'success' && 'Claim Successful'}
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white"
              disabled={claimStep === 'processing'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Confirm Step */}
              {claimStep === 'confirm' && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-1">
                      ${totalAmount.toFixed(2)} USDC
                    </h3>
                    <p className="text-gray-400">
                      {reward?.type === 'all' ? 'All available cashback' : 'Cashback reward'}
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">Rewards amount</span>
                        <span className="text-white">${totalAmount.toFixed(2)} USDC</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-2">
                        <span className="text-gray-300">Gas fee (estimated)</span>
                        <span className="text-white">${estimatedGasFee} USDC</span>
                      </div>
                      <div className="border-t border-gray-600 my-2 pt-2">
                        <div className="flex justify-between items-center font-medium">
                          <span className="text-gray-300">You will receive</span>
                          <span className="text-white">${(totalAmount - estimatedGasFee).toFixed(2)} USDC</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Destination Wallet</label>
                      <div className="flex">
                        <input
                          type="text"
                          value={walletAddress}
                          onChange={(e) => setWalletAddress(e.target.value)}
                          className="flex-1 bg-gray-700/50 border border-gray-600 rounded-l-lg px-3 py-2 text-white"
                          placeholder="0x..."
                        />
                        <button className="bg-gray-600 text-white px-3 py-2 rounded-r-lg text-sm">
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-6">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-gray-300">
                        Claiming your rewards will initiate a transaction on Linea Network. Make sure your MetaMask is connected and has enough ETH for gas fees.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleClaim}
                      className="flex-1 px-4 py-2 bg-green-500/70 hover:bg-green-600/70 text-white rounded-lg flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Claim Now
                    </button>
                  </div>
                </motion.div>
              )}
              
              {/* Processing Step */}
              {claimStep === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 text-center"
                >
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mb-4"></div>
                  <h3 className="text-xl font-medium text-white mb-2">Processing Your Claim</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">
                    Please wait while we process your transaction on the Linea Network. This should only take a moment.
                  </p>
                </motion.div>
              )}
              
              {/* Success Step */}
              {claimStep === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-6 text-center"
                >
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  
                  <h3 className="text-xl font-medium text-white mb-2">Claim Successful!</h3>
                  <p className="text-gray-400 max-w-xs mx-auto mb-4">
                    ${totalAmount.toFixed(2)} USDC has been successfully sent to your wallet.
                  </p>
                  
                  <div className="bg-gray-700/30 rounded-lg p-3 mb-6 text-left max-w-xs mx-auto">
                    <div className="text-xs text-gray-400 mb-1">Transaction Hash</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white truncate mr-2">0x71C9B3e5c8718F4a02A63C...5F3d</div>
                      <button className="text-blue-400 hover:text-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="px-8 py-2 bg-orange-500/70 hover:bg-orange-600/70 text-white rounded-lg"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RewardsClaimModal;