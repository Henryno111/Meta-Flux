import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BudgetSummary = ({ activeTab }) => {
  // Mock data - would be replaced with actual data from API/context
  const [summaryData, setSummaryData] = useState({
    personal: {
      totalBudget: 1500,
      totalSpent: 875.32,
      categories: 6,
      alerts: 2
    },
    business: {
      totalBudget: 8500,
      totalSpent: 3240.85,
      delegates: 4,
      pendingApprovals: 3
    }
  });
  
  // Get current data based on active tab
  const currentData = summaryData[activeTab];
  
  // Calculate remaining budget and percentage spent
  const remainingBudget = currentData.totalBudget - currentData.totalSpent;
  const percentageSpent = (currentData.totalSpent / currentData.totalBudget) * 100;
  
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
  };
  
  // Progress bar animation variants
  const progressVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: `${Math.min(percentageSpent, 100)}%`,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Budget Card */}
      <motion.div 
        variants={cardVariants}
        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
      >
        <div className="text-gray-400 text-sm mb-1">Total Budget</div>
        <div className="text-2xl font-bold text-white">${currentData.totalBudget.toLocaleString()}</div>
        <div className="mt-3 text-xs text-gray-500">
          {activeTab === 'personal' 
            ? 'Your monthly spending limit'
            : 'Company spending limit'}
        </div>
      </motion.div>
      
      {/* Spent/Remaining Card */}
      <motion.div 
        variants={cardVariants}
        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
      >
        <div className="text-gray-400 text-sm mb-1">
          {remainingBudget >= 0 ? 'Remaining Budget' : 'Over Budget'}
        </div>
        <div className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          ${Math.abs(remainingBudget).toLocaleString()}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
            <div>Spent: ${currentData.totalSpent.toLocaleString()}</div>
            <div>{percentageSpent.toFixed(0)}%</div>
          </div>
          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <motion.div 
              variants={progressVariants}
              className={`h-full ${
                percentageSpent < 50 ? 'bg-green-500' : 
                percentageSpent < 85 ? 'bg-yellow-500' : 
                'bg-red-500'
              }`}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Third Card - Categories or Delegates */}
      <motion.div 
        variants={cardVariants}
        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
      >
        <div className="text-gray-400 text-sm mb-1">
          {activeTab === 'personal' ? 'Categories' : 'Delegates'}
        </div>
        <div className="text-2xl font-bold text-white">
          {activeTab === 'personal' ? currentData.categories : currentData.delegates}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          {activeTab === 'personal' 
            ? 'Active budget categories'
            : 'Team members with budgets'}
        </div>
      </motion.div>
      
      {/* Fourth Card - Alerts or Pending Approvals */}
      <motion.div 
        variants={cardVariants}
        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
      >
        <div className="text-gray-400 text-sm mb-1">
          {activeTab === 'personal' ? 'Active Alerts' : 'Pending Approvals'}
        </div>
        <div className="flex items-center">
          <div className="text-2xl font-bold text-white">
            {activeTab === 'personal' ? currentData.alerts : currentData.pendingApprovals}
          </div>
          {(activeTab === 'personal' && currentData.alerts > 0) || 
           (activeTab === 'business' && currentData.pendingApprovals > 0) ? (
            <div className="ml-2 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
           ) : null}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          {activeTab === 'personal' 
            ? 'Budget limit notifications'
            : 'Requests awaiting approval'}
        </div>
      </motion.div>
    </div>
  );
};

export default BudgetSummary;