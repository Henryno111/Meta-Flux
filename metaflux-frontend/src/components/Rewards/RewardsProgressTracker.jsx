import { useState } from 'react';
import { motion } from 'framer-motion';

const RewardsProgressTracker = ({ activeTab }) => {
  // Mock data for progress tracking
  const [progressData] = useState({
    nfts: {
      nextReward: "Financial Wizard",
      currentProgress: 73,
      totalNeeded: 100,
      description: "Stay under budget for 90 consecutive days",
      estimatedCompletion: "May 02, 2025"
    },
    cashback: {
      nextReward: "5% Bonus Cashback",
      currentProgress: 82,
      totalNeeded: 100,
      description: "Complete 25 more transactions within budget",
      estimatedCompletion: "Apr 15, 2025",
      estimatedAmount: 35.25
    }
  });
  
  // Current progress based on active tab
  const currentProgress = progressData[activeTab];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Progress bar animation variants
  const progressVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: `${currentProgress.currentProgress}%`,
      transition: { duration: 1, ease: "easeOut", delay: 0.3 }
    }
  };
  
  // Calculate percentage progress
  const percentComplete = Math.round((currentProgress.currentProgress / currentProgress.totalNeeded) * 100);
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 h-full"
    >
      <h2 className="text-lg font-semibold text-white mb-4">Next Reward Progress</h2>
      
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex justify-between items-baseline mb-1">
          <div className="text-white font-medium">{currentProgress.nextReward}</div>
          <div className="text-sm text-orange-400">{percentComplete}%</div>
        </div>
        <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
          <motion.div 
            variants={progressVariants}
            className="h-full bg-orange-500"
          />
        </div>
        <div className="mt-2 text-sm text-gray-300">{currentProgress.description}</div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="bg-gray-700/30 rounded-lg p-3 flex items-center">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-gray-400">Estimated completion</div>
            <div className="text-sm text-white">{currentProgress.estimatedCompletion}</div>
          </div>
        </div>
        
        {activeTab === 'cashback' && (
          <div className="bg-gray-700/30 rounded-lg p-3 flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-400">Estimated amount</div>
              <div className="text-sm text-white">${currentProgress.estimatedAmount.toFixed(2)}</div>
            </div>
          </div>
        )}
        
        {activeTab === 'nfts' && (
          <div className="bg-gray-700/30 rounded-lg p-3 flex items-center">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-400">Badge rarity</div>
              <div className="text-sm text-white">Epic</div>
            </div>
          </div>
        )}
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-6">
        <h3 className="text-sm font-medium text-white mb-3">How to Earn Faster</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-orange-500/50 mt-0.5 mr-2"></div>
            <span className="text-sm text-gray-300">
              {activeTab === 'nfts' 
                ? "Maintain consistent spending within budget limits"
                : "Complete more transactions with budget-conscious merchants"}
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-orange-500/50 mt-0.5 mr-2"></div>
            <span className="text-sm text-gray-300">
              {activeTab === 'nfts' 
                ? "Set up alerts to avoid budget overages"
                : "Refer friends to earn bonus cashback percentages"}
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-orange-500/50 mt-0.5 mr-2"></div>
            <span className="text-sm text-gray-300">
              {activeTab === 'nfts' 
                ? "Complete your financial profile for bonus progress"
                : "Use MetaFlux for all your regular expenses"}
            </span>
          </li>
        </ul>
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-6 pt-4 border-t border-gray-700/30">
        <button className="w-full py-2 bg-orange-500/60 hover:bg-orange-600/60 rounded-lg text-white text-sm flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          Complete Challenge
        </button>
      </motion.div>
    </motion.div>
  );
};

export default RewardsProgressTracker;