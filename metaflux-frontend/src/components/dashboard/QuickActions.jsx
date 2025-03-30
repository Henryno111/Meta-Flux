import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const QuickActions = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const actions = [
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      label: 'Add Expense',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      label: 'Add Income',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      label: 'Transfer',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      label: 'Reports',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Recurring',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // For mobile view, we'll show a simplified version
  const renderMobileVersion = () => (
    <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
      {actions.map((action, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex flex-col items-center justify-center p-3 bg-gradient-to-r ${action.color} rounded-xl shadow-md text-white min-w-[80px] flex-shrink-0`}
        >
          <span className="mb-1">{action.icon}</span>
          <span className="text-xs font-medium whitespace-nowrap">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );

  // For larger screens, show a more detailed version
  const renderDesktopVersion = () => (
    <div className="flex flex-wrap gap-3 md:gap-4">
      {actions.map((action, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center px-4 py-3 bg-gradient-to-r ${action.color} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white min-w-[140px] md:min-w-[160px]`}
        >
          <span className="mr-3">{action.icon}</span>
          <span className="font-medium text-sm sm:text-base">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );

  return (
    <>
      {/* Show different layouts based on screen size */}
      <div className="md:hidden">
        {renderMobileVersion()}
      </div>
      <div className="hidden md:block">
        {renderDesktopVersion()}
      </div>

      {/* Visible only on small devices - quick add button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="md:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center shadow-lg z-20"
      >
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </motion.button>
    </>
  );
};

export default QuickActions;