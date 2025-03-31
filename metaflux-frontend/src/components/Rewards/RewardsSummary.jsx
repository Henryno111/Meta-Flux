import { useState } from 'react';
import { motion } from 'framer-motion';

const RewardsSummary = () => {
  // Mock data for rewards summary
  const [summaryData] = useState({
    totalCashback: 185.75,
    pendingCashback: 42.30,
    nftBadges: 7,
    streak: 24
  });
  
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
  };
  
  // Streak badge animation
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Cashback Card */}
      <motion.div 
        variants={cardVariants}
        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
      >
        <div className="text-gray-400 text-sm mb-1">Total Cashback Earned</div>
        <div className="text-2xl font-bold text-white">${summaryData.totalCashback.toFixed(2)}</div>
        <div className="mt-3 text-xs text-gray-500">
          Lifetime rewards from responsible spending
        </div>
      </motion.div>
      
      {/* Pending Cashback Card */}
      <motion.div 
        variants={cardVariants}
        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
      >
        <div className="text-gray-400 text-sm mb-1">Available to Claim</div>
        <div className="text-2xl font-bold text-green-400">${summaryData.pendingCashback.toFixed(2)}</div>
        <div className="mt-3 flex justify-between items-center">
          <div className="text-xs text-gray-500">Ready for withdrawal</div>
          {summaryData.pendingCashback > 0 && (
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          )}
        </div>
      </motion.div>
      
      {/* NFT Badges Card */}
      <motion.div 
        variants={cardVariants}
        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
      >
        <div className="text-gray-400 text-sm mb-1">NFT Badges Earned</div>
        <div className="flex items-center">
          <div className="text-2xl font-bold text-white">{summaryData.nftBadges}</div>
          {summaryData.nftBadges > 5 && (
            <span className="ml-2 text-xs bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">
              Collector
            </span>
          )}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          Achievement badges for spending milestones
        </div>
      </motion.div>
      
      {/* Spending Streak Card */}
      <motion.div 
        variants={cardVariants}
        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 relative overflow-hidden"
      >
        <div className="text-gray-400 text-sm mb-1">Current Streak</div>
        <div className="flex items-center">
          <div className="text-2xl font-bold text-white">{summaryData.streak} Days</div>
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="absolute right-4 top-4 w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center"
          >
            <div className="text-xl">🔥</div>
          </motion.div>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          Consecutive days within budget
        </div>
      </motion.div>
    </div>
  );
};

export default RewardsSummary;