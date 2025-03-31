import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link for navigation
import RewardsTabs from '../components/Rewards/RewardsTabs';
import RewardsSummary from '../components/Rewards/RewardsSummary';
import RewardsNFTCollection from '../components/Rewards/RewardsNFTCollection';
import RewardsCashbackHistory from '../components/Rewards/RewardsCashbackHistory';
import RewardsProgressTracker from '../components/Rewards/RewardsProgressTracker';
import RewardsDetailModal from '../components/Rewards/RewardsDetailModal';
import RewardsClaimModal from '../components/Rewards/RewardsClaimModal';
import BackgroundAnimation from '../components/BackgroundAnimation';

const Rewards = () => {
  const [activeTab, setActiveTab] = useState('nfts');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  // Child element animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  // Back button animation variants
  const backButtonVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3,
        duration: 0.4
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };
  
  // Handler for viewing reward details
  const handleViewReward = (reward) => {
    setSelectedReward(reward);
    setShowDetailModal(true);
  };
  
  // Handler for claiming rewards
  const handleClaimReward = (reward) => {
    setSelectedReward(reward);
    setShowClaimModal(true);
  };
  
  // Custom header with integrated back button
  const HeaderWithBackButton = () => {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Rewards Hub</h1>
          <p className="text-gray-400 mt-1">
            Earn and manage rewards for responsible spending
          </p>
        </div>
        
        <div className="flex space-x-3">
          <motion.div
            variants={backButtonVariants}
            whileHover="hover"
            whileTap="tap"
            className="inline-block"
          >
            <Link 
              to="/" 
              className="px-4 py-2 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-lg text-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500/60 hover:bg-blue-600/60 text-white rounded-lg text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Sync Rewards
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowClaimModal(true)}
            className="px-4 py-2 bg-orange-500/70 hover:bg-orange-600/70 text-white rounded-lg text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Claim Rewards
          </motion.button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 relative">
      <BackgroundAnimation />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Custom Header with Back Button */}
        <motion.div variants={itemVariants}>
          <HeaderWithBackButton />
        </motion.div>
        
        {/* Tabs Section */}
        <motion.div variants={itemVariants}>
          <RewardsTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </motion.div>
        
        {/* Summary Cards */}
        <motion.div variants={itemVariants}>
          <RewardsSummary />
        </motion.div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* NFTs or Cashback History based on active tab */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2"
          >
            {activeTab === 'nfts' ? (
              <RewardsNFTCollection onViewNFT={handleViewReward} />
            ) : (
              <RewardsCashbackHistory onClaimCashback={handleClaimReward} />
            )}
          </motion.div>
          
          {/* Progress Tracker */}
          <motion.div variants={itemVariants}>
            <RewardsProgressTracker activeTab={activeTab} />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Reward Detail Modal */}
      {showDetailModal && (
        <RewardsDetailModal 
          reward={selectedReward}
          onClose={() => setShowDetailModal(false)}
        />
      )}
      
      {/* Claim Reward Modal */}
      {showClaimModal && (
        <RewardsClaimModal 
          reward={selectedReward}
          onClose={() => setShowClaimModal(false)}
        />
      )}
    </div>
  );
};

export default Rewards;