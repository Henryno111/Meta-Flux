import { motion } from 'framer-motion';

const RewardsTabs = ({ activeTab, setActiveTab }) => {
  // Animation for the active tab indicator
  const tabIndicatorVariants = {
    nfts: { x: '0%' },
    cashback: { x: '100%' }
  };
  
  return (
    <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-xl p-1.5 max-w-md">
      <div className="relative z-0 flex">
        <motion.div
          className="absolute top-1.5 bottom-1.5 left-0 w-1/2 bg-gray-700/50 rounded-lg"
          variants={tabIndicatorVariants}
          animate={activeTab}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
        />
        
        <button
          onClick={() => setActiveTab('nfts')}
          className={`relative z-10 flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium ${activeTab === 'nfts' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          NFT Badges
        </button>
        
        <button
          onClick={() => setActiveTab('cashback')}
          className={`relative z-10 flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium ${activeTab === 'cashback' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Cashback
        </button>
      </div>
    </div>
  );
};

export default RewardsTabs;