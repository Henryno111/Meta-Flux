import { motion, AnimatePresence } from 'framer-motion';

const RewardsDetailModal = ({ reward, onClose }) => {
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
  
  // Function to get the rarity's text color
  const getRarityColor = (rarity) => {
    const colors = {
      common: "text-gray-300",
      uncommon: "text-green-300",
      rare: "text-blue-300",
      epic: "text-purple-300",
      legendary: "text-orange-300"
    };
    return colors[rarity] || "text-white";
  };
  
  // Metadata badge specifications
  const badgeMetadata = {
    tokenId: `#${reward?.id || '000'}`,
    creator: "MetaFlux Finance",
    chain: "Linea Network",
    contractAddress: "0x71C...1F3d",
    mintDate: reward?.dateEarned || "Unknown",
  };
  
  if (!reward) return null;
  
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
          className="bg-gray-800 border border-gray-700 rounded-xl max-w-lg w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-gray-700 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">NFT Badge Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Badge Image */}
              <div className={`w-full md:w-1/2 aspect-square bg-gradient-to-br ${reward.backgroundColor} backdrop-blur-sm border border-gray-700/50 rounded-xl flex flex-col items-center justify-center p-4`}>
                <div className="text-7xl mb-4">{reward.image}</div>
                <h3 className="text-xl font-bold text-white text-center mb-2">{reward.name}</h3>
                <div className={`text-sm px-2 py-0.5 rounded-full bg-gray-800/70 ${getRarityColor(reward.rarity)}`}>
                  {reward.rarity.charAt(0).toUpperCase() + reward.rarity.slice(1)}
                </div>
              </div>
              
              {/* Badge Details */}
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-medium text-white mb-3">Achievement Details</h3>
                <p className="text-gray-300 mb-4">{reward.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Earned On</h4>
                    <p className="text-white">{reward.dateEarned}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Badge Benefits</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-1 h-1 rounded-full bg-orange-500 mt-1.5 mr-2"></div>
                        <span>Enhanced cashback rates for specific categories</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-1 h-1 rounded-full bg-orange-500 mt-1.5 mr-2"></div>
                        <span>Social proof of financial responsibility</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-1 h-1 rounded-full bg-orange-500 mt-1.5 mr-2"></div>
                        <span>Unlocks special platform features</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Metadata */}
                <div className="mt-6">
                  <h4 className="text-sm text-gray-400 mb-2">Token Metadata</h4>
                  <div className="bg-gray-700/30 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-gray-400">Token ID:</div>
                      <div className="text-white">{badgeMetadata.tokenId}</div>
                      
                      <div className="text-gray-400">Creator:</div>
                      <div className="text-white">{badgeMetadata.creator}</div>
                      
                      <div className="text-gray-400">Network:</div>
                      <div className="text-white">{badgeMetadata.chain}</div>
                      
                      <div className="text-gray-400">Contract:</div>
                      <div className="text-white truncate">{badgeMetadata.contractAddress}</div>
                      
                      <div className="text-gray-400">Mint Date:</div>
                      <div className="text-white">{badgeMetadata.mintDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="border-t border-gray-700 px-6 py-4 flex justify-between items-center">
            <a 
              href={`https://explorer.linea.build/token/${badgeMetadata.contractAddress}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-400 hover:underline flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View on Blockchain
            </a>
            
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm">
                Share Badge
              </button>
              <button className="px-4 py-2 bg-blue-500/60 hover:bg-blue-600/60 text-white rounded-lg text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export to Wallet
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RewardsDetailModal;