import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RewardsNFTCollection = ({ onViewNFT }) => {
  // Mock data for NFT badges
  const [nftBadges, setNftBadges] = useState([
    { 
      id: 1, 
      name: "Budget Master", 
      description: "Stayed under budget for 30 consecutive days", 
      rarity: "rare", 
      dateEarned: "Mar 15, 2025",
      image: "🎯",
      backgroundColor: "from-purple-500/20 to-blue-500/20"
    },
    { 
      id: 2, 
      name: "Savings Champion", 
      description: "Saved over $500 in a single month", 
      rarity: "epic", 
      dateEarned: "Feb 27, 2025",
      image: "💰",
      backgroundColor: "from-orange-500/20 to-red-500/20"
    },
    { 
      id: 3, 
      name: "Smart Spender", 
      description: "Made 50+ transactions within budget", 
      rarity: "uncommon", 
      dateEarned: "Feb 12, 2025",
      image: "🧠",
      backgroundColor: "from-green-500/20 to-teal-500/20"
    },
    { 
      id: 4, 
      name: "Category Expert", 
      description: "Set up and maintained 5+ budget categories", 
      rarity: "common", 
      dateEarned: "Jan 25, 2025",
      image: "📊",
      backgroundColor: "from-blue-500/20 to-cyan-500/20"
    },
    { 
      id: 5, 
      name: "Early Adopter", 
      description: "One of the first 1000 users on MetaFlux", 
      rarity: "legendary", 
      dateEarned: "Jan 02, 2025",
      image: "🚀",
      backgroundColor: "from-yellow-500/20 to-orange-500/20"
    },
  ]);
  
  // Filter settings
  const [filter, setFilter] = useState('all');
  
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };
  
  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };
  
  // Filter NFTs based on rarity
  const filteredNFTs = filter === 'all' 
    ? nftBadges 
    : nftBadges.filter(nft => nft.rarity === filter);
  
  // Rarity color mapping
  const rarityColors = {
    common: "text-gray-300",
    uncommon: "text-green-300",
    rare: "text-blue-300",
    epic: "text-purple-300",
    legendary: "text-orange-300"
  };
  
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-lg font-semibold text-white">NFT Achievement Badges</h2>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === 'all' 
                ? 'bg-gray-600 text-white' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('legendary')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === 'legendary' 
                ? 'bg-orange-500/50 text-white' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
            }`}
          >
            Legendary
          </button>
          <button
            onClick={() => setFilter('epic')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === 'epic' 
                ? 'bg-purple-500/50 text-white' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
            }`}
          >
            Epic
          </button>
          <button
            onClick={() => setFilter('rare')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === 'rare' 
                ? 'bg-blue-500/50 text-white' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
            }`}
          >
            Rare
          </button>
          <button
            onClick={() => setFilter('uncommon')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === 'uncommon' 
                ? 'bg-green-500/50 text-white' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
            }`}
          >
            Uncommon
          </button>
          <button
            onClick={() => setFilter('common')}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === 'common' 
                ? 'bg-gray-500/50 text-white' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
            }`}
          >
            Common
          </button>
        </div>
      </div>
      
      {/* NFT Grid */}
      <div className="relative min-h-[200px]">
        <AnimatePresence>
          {filteredNFTs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center text-gray-400"
            >
              No badges found matching your filter
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredNFTs.map((nft) => (
                <motion.div
                  key={nft.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`relative bg-gradient-to-br ${nft.backgroundColor} backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 cursor-pointer`}
                  onClick={() => onViewNFT(nft)}
                >
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-gray-800/50 ${rarityColors[nft.rarity]}`}>
                      {nft.rarity.charAt(0).toUpperCase() + nft.rarity.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center mb-3">
                    <div className="text-4xl mb-3">{nft.image}</div>
                    <h3 className="text-lg font-medium text-white text-center">{nft.name}</h3>
                  </div>
                  
                  <p className="text-sm text-gray-300 text-center mb-3">
                    {nft.description}
                  </p>
                  
                  <div className="text-xs text-gray-400 text-center">
                    Earned: {nft.dateEarned}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700/30 flex justify-between items-center">
        <div className="text-xs text-gray-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          NFT badges are stored on Linea Network
        </div>
        
        <button className="text-xs px-3 py-1 rounded-md bg-blue-500/50 text-white hover:bg-blue-600/50 transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export to Wallet
        </button>
      </div>
    </div>
  );
};

export default RewardsNFTCollection;