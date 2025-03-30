import { motion } from 'framer-motion';
import { useState } from 'react';

const ExpenseSummary = () => {
  const [timeframe, setTimeframe] = useState('month');
  
  // Mock data
  const totalSpent = 1245.67;
  const budget = 2000;
  const percentUsed = (totalSpent / budget) * 100;
  const isWithinBudget = percentUsed <= 75;
  
  const categories = [
    { name: 'Shopping', amount: 450.25, color: 'bg-purple-500', percentage: 36.14 },
    { name: 'Food & Dining', amount: 320.18, color: 'bg-blue-500', percentage: 25.70 },
    { name: 'Transportation', amount: 215.75, color: 'bg-green-500', percentage: 17.32 },
    { name: 'Entertainment', amount: 180.24, color: 'bg-yellow-500', percentage: 14.47 },
    { name: 'Other', amount: 79.25, color: 'bg-gray-500', percentage: 6.36 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Expense Summary</h2>
        <div className="flex space-x-2 w-full sm:w-auto">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-gray-700/30 border-none rounded-lg text-xs sm:text-sm text-gray-300 focus:ring-orange-500 focus:border-orange-500 py-1.5 px-2 sm:py-2 sm:px-3 w-full sm:w-auto"
          >
            <option value="month">Current Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="quarter">Last 3 Months</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-gray-700/30 p-1.5 sm:p-2 rounded-lg text-gray-300 hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Spending progress */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-xs sm:text-sm text-gray-400 mb-1">Total Spent</p>
              <p className="text-xl sm:text-2xl font-bold text-white">${totalSpent.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs sm:text-sm text-gray-400 mb-1">Monthly Budget</p>
              <p className="text-base sm:text-lg font-semibold text-gray-300">${budget.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="relative h-3 sm:h-4 bg-gray-700 rounded-full overflow-hidden mb-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentUsed}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`absolute top-0 left-0 h-full rounded-full ${
                isWithinBudget ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-red-500 to-red-400'
              }`}
            ></motion.div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-sm text-gray-400">
              {percentUsed.toFixed(1)}% used
            </p>
            <p className={`text-xs sm:text-sm font-medium ${isWithinBudget ? 'text-green-400' : 'text-red-400'}`}>
              {isWithinBudget 
                ? `$${(budget - totalSpent).toFixed(2)} remaining` 
                : `$${(totalSpent - budget).toFixed(2)} over budget`}
            </p>
          </div>
        </div>
        
        {/* Category breakdown */}
        <div className="mt-4 lg:mt-0">
          <p className="text-xs sm:text-sm text-gray-400 mb-2">Top Categories</p>
          <div className="space-y-2 sm:space-y-3">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">{category.name}</span>
                  <span className="text-xs sm:text-sm font-semibold text-white">${category.amount.toFixed(2)}</span>
                </div>
                <div className="relative h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`absolute top-0 left-0 h-full ${category.color}`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile-only view for quick stats */}
      <div className="mt-4 pt-4 border-t border-gray-700/30 grid grid-cols-2 gap-2 lg:hidden">
        <div className="bg-gray-700/30 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Largest Expense</div>
          <div className="text-sm text-white font-medium">Shopping</div>
          <div className="text-lg text-white font-bold">$450.25</div>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Budget Status</div>
          <div className="text-sm text-white font-medium">{isWithinBudget ? 'On Track' : 'Over Budget'}</div>
          <div className={`text-lg font-bold ${isWithinBudget ? 'text-green-400' : 'text-red-400'}`}>{percentUsed.toFixed(0)}%</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseSummary;