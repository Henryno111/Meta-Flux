import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const RewardsWidget = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data
  const earnedCashback = 42.75;
  const monthlyGoal = 75;
  const currentProgress = 58;
  const badges = [
    { id: 1, emoji: '🏆', name: 'Budget Master', earned: true },
    { id: 2, emoji: '🔍', name: 'Analytics Pro', earned: true },
    { id: 3, emoji: '💰', name: 'Saving Expert', earned: false }
  ];
  
  const handleClaimRewards = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Would handle success here
    }, 1500);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Rewards</h2>
        <Link to="/rewards" className="text-xs sm:text-sm text-orange-400 hover:text-orange-300">
          View All
        </Link>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <div className="text-xs sm:text-sm text-gray-400">Monthly Goal Progress</div>
          <div className="text-xs sm:text-sm font-medium text-orange-400">{currentProgress}%</div>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${currentProgress}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
          ></motion.div>
        </div>
        <div className="text-xs text-gray-400">
          Complete {monthlyGoal - currentProgress}% more to unlock your next reward
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs sm:text-sm text-gray-400">Earned Badges</div>
          <button className="text-xs text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              className={`group relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-lg ${
                badge.earned 
                  ? 'bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-xl sm:text-2xl' 
                  : 'bg-gray-700/40 text-gray-600 border-2 border-dashed border-gray-600'
              }`}
            >
              {badge.earned ? badge.emoji : '?'}
              
              {/* Tooltip */}
              <div className="hidden group-hover:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded whitespace-nowrap">
                {badge.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs sm:text-sm text-gray-300">Cashback Earned</div>
          <div className="text-xs text-gray-400">This Month</div>
        </div>
        <div className="text-xl sm:text-2xl font-bold text-white mb-1">${earnedCashback.toFixed(2)}</div>
        <div className="text-xs text-green-400 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          12% from last month
        </div>
      </div>
      
      <div className="mt-4">
        <button 
          onClick={handleClaimRewards}
          disabled={isLoading}
          className="w-full py-2 bg-transparent border border-orange-500/50 text-orange-400 font-medium rounded-lg hover:bg-orange-500/10 transition-colors flex items-center justify-center relative"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Claim Rewards
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default RewardsWidget;