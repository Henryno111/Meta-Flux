import { motion } from 'framer-motion';
import { useState } from 'react';

const WalletBalance = () => {
  const [showValues, setShowValues] = useState(true);
  
  // Mock data
  const balances = [
    { currency: 'ℓUSD', balance: 635.42, usdValue: 635.42, icon: '💵', color: 'bg-blue-500/20 text-blue-400', change: 1.2 },
    { currency: 'USDC', balance: 390.18, usdValue: 390.18, icon: '💰', color: 'bg-green-500/20 text-green-400', change: -0.5 },
    { currency: 'ETH', balance: 0.15, usdValue: 285.75, icon: '💎', color: 'bg-purple-500/20 text-purple-400', change: 3.8 }
  ];
  
  const totalUsdValue = balances.reduce((sum, balance) => sum + balance.usdValue, 0);
  
  // Function to format balances when hidden
  const formatHiddenBalance = (balance) => {
    return '•••••';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Wallet Balance</h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowValues(!showValues)} 
            className="p-1.5 text-gray-400 hover:text-white rounded-md"
            title={showValues ? "Hide values" : "Show values"}
          >
            {showValues ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
          <button className="text-xs sm:text-sm text-orange-400 hover:text-orange-300 flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>
      
      <div className="mb-4 pb-4 border-b border-gray-700/30">
        <div className="text-xs sm:text-sm text-gray-400 mb-1">Total Balance (USD)</div>
        <div className="flex items-center">
          <div className="text-xl sm:text-2xl font-bold text-white">
            {showValues ? `$${totalUsdValue.toFixed(2)}` : formatHiddenBalance(totalUsdValue)}
          </div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="ml-2 px-1.5 py-0.5 text-xs font-medium rounded bg-green-500/20 text-green-400"
          >
            +1.8%
          </motion.div>
        </div>
      </div>
      
      <div className="space-y-4">
        {balances.map((item, index) => (
          <motion.div
            key={item.currency}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex justify-between items-center"
          >
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${item.color}`}>
                {item.icon}
              </div>
              <div>
                <div className="font-medium text-white">{item.currency}</div>
                <div className="text-xs text-gray-400">
                  {showValues ? `$${item.usdValue.toFixed(2)}` : formatHiddenBalance(item.usdValue)}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="font-medium text-white">
                {showValues ? item.balance.toFixed(item.currency === 'ETH' ? 4 : 2) : formatHiddenBalance(item.balance)}
              </div>
              <div className={`text-xs flex items-center ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {item.change >= 0 ? '↑' : '↓'} {Math.abs(item.change)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-2">
        <button className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center">
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Deposit
        </button>
        <button className="flex-1 py-2 bg-transparent border border-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-700/30 transition-colors flex items-center justify-center">
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Withdraw
        </button>
      </div>
      
      {/* QR code button for mobile */}
      <div className="mt-3 flex justify-center sm:hidden">
        <button className="py-2 px-4 bg-gray-700/30 text-gray-300 rounded-lg text-xs hover:bg-gray-700/50 flex items-center">
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          Show Wallet QR
        </button>
      </div>
    </motion.div>
  );
};

export default WalletBalance;