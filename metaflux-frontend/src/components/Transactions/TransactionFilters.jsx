import { useState } from 'react';
import { motion } from 'framer-motion';

const TransactionFilters = ({ filters, setFilters }) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Categories for filter dropdown
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'food', name: 'Food & Dining' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'transport', name: 'Transportation' },
    { id: 'utilities', name: 'Bills & Utilities' },
    { id: 'housing', name: 'Housing' },
    { id: 'travel', name: 'Travel' },
    { id: 'health', name: 'Healthcare' },
    { id: 'other', name: 'Other' }
  ];
  
  // Status options for filter
  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'completed', name: 'Completed' },
    { id: 'pending', name: 'Pending' },
    { id: 'failed', name: 'Failed' },
  ];
  
  // Date range options
  const dateRangeOptions = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' },
    { id: 'all', name: 'All Time' }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const advancedFilterVariants = {
    hidden: { opacity: 0, height: 0, overflow: 'hidden' },
    visible: { 
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3 }
    }
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      searchQuery: e.target.value
    });
  };
  
  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      dateRange: 'month',
      status: 'all',
      category: 'all',
      searchQuery: '',
    });
  };
  
  return (
    <motion.div
      variants={containerVariants}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6"
    >
      {/* Main Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <motion.div variants={itemVariants} className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search transactions..."
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </motion.div>
        
        {/* Date Range Dropdown */}
        <motion.div variants={itemVariants} className="w-full sm:w-48">
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          >
            {dateRangeOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </motion.div>
        
        {/* Toggle Advanced Filters Button */}
        <motion.button
          variants={itemVariants}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="sm:flex-shrink-0 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg text-sm flex items-center justify-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 mr-2 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {showAdvancedFilters ? 'Hide Filters' : 'Advanced Filters'}
        </motion.button>
      </div>
      
      {/* Advanced Filters */}
      <motion.div
        variants={advancedFilterVariants}
        initial="hidden"
        animate={showAdvancedFilters ? "visible" : "hidden"}
        className="mt-4 pt-4 border-t border-gray-700/50"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Status Filter */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              {statusOptions.map(status => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Amount Range Filter - Placeholder for future implementation */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Amount Range</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
          </div>
        </div>
        
        {/* Clear Filters Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-lg text-sm"
          >
            Clear All Filters
          </button>
        </div>
      </motion.div>
      
      {/* Active Filters Display */}
      {(filters.category !== 'all' || filters.status !== 'all' || filters.searchQuery) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.searchQuery && (
            <div className="bg-gray-700/50 rounded-full px-3 py-1 text-xs text-white flex items-center">
              Search: {filters.searchQuery}
              <button 
                onClick={() => handleFilterChange('searchQuery', '')}
                className="ml-2 text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          {filters.category !== 'all' && (
            <div className="bg-gray-700/50 rounded-full px-3 py-1 text-xs text-white flex items-center">
              Category: {categories.find(c => c.id === filters.category)?.name}
              <button 
                onClick={() => handleFilterChange('category', 'all')}
                className="ml-2 text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          {filters.status !== 'all' && (
            <div className="bg-gray-700/50 rounded-full px-3 py-1 text-xs text-white flex items-center">
              Status: {statusOptions.find(s => s.id === filters.status)?.name}
              <button 
                onClick={() => handleFilterChange('status', 'all')}
                className="ml-2 text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TransactionFilters;