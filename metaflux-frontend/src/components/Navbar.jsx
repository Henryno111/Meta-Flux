import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../hooks/useWallet';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Use the wallet hook to access wallet functionality
  const { 
    address, 
    isConnected, 
    isPending, 
    balance, 
    formatAddress, 
    connect, 
    disconnect 
  } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/budget', label: 'Budget Control' },
    { path: '/rewards', label: 'Rewards Hub' },
    { path: '/transactions', label: 'Transactions' }
  ];

  const isActive = (path) => location.pathname === path;
  
  // Handle wallet connection
  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };
  
  // Handle wallet disconnection
  const handleDisconnect = () => {
    disconnect();
  };
  
  // Dropdown state for wallet menu
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  
  // Function to toggle wallet dropdown
  const toggleWalletDropdown = () => {
    if (isConnected) {
      setShowWalletDropdown(!showWalletDropdown);
    }
  };
  
  // Format balance display
  const formatBalanceDisplay = () => {
    if (!balance) return '0 ETH';
    return `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`;
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        scrolled ? 'bg-black/70 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <motion.span 
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            MetaFlux
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 text-white ${
                isActive(item.path) 
                  ? 'font-medium' 
                  : 'hover:bg-white/10'
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
          
          {/* Wallet Connection Button */}
          <div className="relative ml-6">
            <motion.button 
              onClick={isConnected ? toggleWalletDropdown : handleConnectWallet}
              disabled={isPending}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 ${
                isConnected 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                  : 'bg-gradient-to-r from-orange-500 to-amber-500'
              } text-white font-medium rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center ${
                isPending ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <svg 
                className="w-4 h-4 mr-2" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z" 
                  fill="currentColor"
                />
                <path 
                  d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z" 
                  fill="currentColor"
                />
              </svg>
              
              {isPending ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </div>
              ) : isConnected ? (
                <div className="flex items-center">
                  <span>{formatAddress(address)}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ml-1 transition-transform ${showWalletDropdown ? 'rotate-180' : ''}`}
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
            
            {/* Wallet Dropdown Menu */}
            <AnimatePresence>
              {showWalletDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50"
                >
                  <div className="p-3 border-b border-gray-700">
                    <div className="text-xs text-gray-400">Connected Account</div>
                    <div className="text-sm font-medium text-white truncate mt-1">{address}</div>
                  </div>
                  
                  <div className="p-3 border-b border-gray-700">
                    <div className="text-xs text-gray-400">Balance</div>
                    <div className="text-sm font-medium text-white mt-1">{formatBalanceDisplay()}</div>
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
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.div
            animate={isMenuOpen ? "open" : "closed"}
            className="w-6 h-6 flex flex-col justify-center items-center"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 2 }
              }}
              className="w-6 h-0.5 bg-white mb-1.5 block transition-all duration-300"
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              className="w-6 h-0.5 bg-white mb-1.5 block transition-all duration-300"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -2 }
              }}
              className="w-6 h-0.5 bg-white block transition-all duration-300"
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile Navigation - Fancy Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed top-0 right-0 bottom-0 w-3/4 bg-gray-900 shadow-xl z-50 pt-20"
          >
            <div className="flex flex-col h-full px-6">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`py-4 px-4 rounded-lg ${
                      isActive(item.path)
                        ? 'bg-white/10 text-orange-400'
                        : 'text-white hover:bg-white/5'
                    } transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto mb-8">
                {/* Mobile Connect Button */}
                <button 
                  onClick={() => {
                    if (isConnected) {
                      // If connected, show wallet info
                      // In a real implementation, you might want to show a modal with wallet details
                      handleDisconnect();
                    } else {
                      handleConnectWallet();
                    }
                    setIsMenuOpen(false);
                  }}
                  disabled={isPending}
                  className={`w-full py-3 ${
                    isConnected 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                      : 'bg-gradient-to-r from-orange-500 to-amber-500'
                  } text-white font-medium rounded-lg flex items-center justify-center ${
                    isPending ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  <svg 
                    className="w-4 h-4 mr-2" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z" 
                      fill="currentColor"
                    />
                    <path 
                      d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z" 
                      fill="currentColor"
                    />
                  </svg>
                  
                  {isPending ? (
                    <div className="flex items-center">
                      <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting...
                    </div>
                  ) : isConnected ? (
                    <>Disconnect Wallet</>
                  ) : (
                    <>Connect Wallet</>
                  )}
                </button>
                
                {/* Show wallet information if connected */}
                {isConnected && (
                  <div className="mt-4 p-3 bg-gray-800/60 rounded-lg">
                    <div className="text-xs text-gray-400">Connected as</div>
                    <div className="text-sm font-medium text-white truncate mt-1">{formatAddress(address)}</div>
                    {balance && (
                      <div className="text-xs text-gray-400 mt-2">
                        Balance: {formatBalanceDisplay()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Backdrop for mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;