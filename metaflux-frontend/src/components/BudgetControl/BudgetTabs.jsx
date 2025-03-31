import { motion } from 'framer-motion';

const BudgetTabs = ({ activeTab, setActiveTab }) => {
  // Animation for the active tab indicator
  const tabIndicatorVariants = {
    personal: { x: '0%' },
    business: { x: '100%' }
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
          onClick={() => setActiveTab('personal')}
          className={`relative z-10 flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium ${activeTab === 'personal' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Personal
        </button>
        
        <button
          onClick={() => setActiveTab('business')}
          className={`relative z-10 flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium ${activeTab === 'business' ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Business
        </button>
      </div>
    </div>
  );
};

export default BudgetTabs;