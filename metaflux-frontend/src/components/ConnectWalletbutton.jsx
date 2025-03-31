import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../hooks/useWallet';

const ConnectWalletButton = () => {
  const { 
    address, 
    isConnected, 
    isPending, 
    balance, 
    formatAddress, 
    connect, 
    disconnect 
  } = useWallet();
  
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleToggleDropdown = () => {
    if (isConnected) {
      setShowDropdown(!showDropdown);
    }
  };
  
  const handleConnect = () => {
    connect();
  };
  
  const handleDisconnect = () => {
    disconnect();
    setShowDropdown(false);
  };
  
  // Format balance to display
  const formatBalance = () => {
    if (!balance) return '0 ETH';
    return `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`;
  };
  
  // Button animation variants
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    connect: { backgroundColor: 'rgba(249, 115, 22, 0.7)' },
    connected: { backgroundColor: 'rgba(16, 185, 129, 0.7)' }
  };
  
  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: { 
        duration: 0.2,
      }
    }
  };
  
  return (
    <div className="relative">
      <motion.button
        onClick={isConnected ? handleToggleDropdown : handleConnect}
        variants={buttonVariants}
        initial={isConnected ? "connected" : "connect"}
        whileHover="hover"
        whileTap="tap"
        className={`px-4 py-2 rounded-lg text-sm text-white flex items-center ${
          isPending ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        disabled={isPending}
      >
        {/* Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 mr-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
          />
        </svg>
        
        {/* Button text */}
        {isPending ? (
          <>Loading...</>
        ) : isConnected ? (
          <div className="flex items-center">
            <span>{formatAddress(address)}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 ml-1 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        ) : (
          <>Connect Wallet</>
        )}
      </motion.button>
      
      {/* Dropdown Menu */}
      <AnimatePresence>
        {showDropdown && isConnected && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50"
          >
            <div className="p-3 border-b border-gray-700">
              <div className="text-xs text-gray-400">Connected Account</div>
              <div className="text-sm font-medium text-white truncate mt-1">{address}</div>
            </div>
            
            <div className="p-3 border-b border-gray-700">
              <div className="text-xs text-gray-400">Balance</div>
              <div className="text-sm font-medium text-white mt-1">{formatBalance()}</div>
            </div>
            
            <div className="p-2">
              <button 
                onClick={handleDisconnect}
                className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-700/50 rounded-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Disconnect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectWalletButton;