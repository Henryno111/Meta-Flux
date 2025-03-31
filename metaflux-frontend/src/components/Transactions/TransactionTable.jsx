import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionTable = ({ filters, onViewTransaction, onUpdateCategory }) => {
  // Mock transaction data
  const [allTransactions, setAllTransactions] = useState([
    {
      id: 'tx-001',
      date: '2025-03-28',
      merchant: 'Metro Grocery Store',
      amount: 127.84,
      category: 'food',
      status: 'completed',
      txHash: '0x71C...1F3d',
    },
    {
      id: 'tx-002',
      date: '2025-03-26',
      merchant: 'Amazon',
      amount: 89.99,
      category: 'shopping',
      status: 'completed',
      txHash: '0x35A...9B2c',
    },
    {
      id: 'tx-003',
      date: '2025-03-25',
      merchant: 'Netflix',
      amount: 18.99,
      category: 'entertainment',
      status: 'completed',
      txHash: '0x92D...4E7f',
    },
    {
      id: 'tx-004',
      date: '2025-03-22',
      merchant: 'Uber',
      amount: 24.50,
      category: 'transport',
      status: 'completed',
      txHash: '0x28F...7C3e',
    },
    {
      id: 'tx-005',
      date: '2025-03-20',
      merchant: 'Starbucks',
      amount: 7.65,
      category: 'food',
      status: 'completed',
      txHash: '0x64B...9A1d',
    },
    {
      id: 'tx-006',
      date: '2025-03-18',
      merchant: 'Electric Company',
      amount: 142.67,
      category: 'utilities',
      status: 'completed',
      txHash: '0x4C9...8F2b',
    },
    {
      id: 'tx-007',
      date: '2025-03-15',
      merchant: 'Movie Theater',
      amount: 32.00,
      category: 'entertainment',
      status: 'completed',
      txHash: '0x19E...3A7c',
    },
    {
      id: 'tx-008',
      date: '2025-03-12',
      merchant: 'Gas Station',
      amount: 45.30,
      category: 'transport',
      status: 'completed',
      txHash: '0x73F...2D5e',
    },
    {
      id: 'tx-009',
      date: '2025-03-10',
      merchant: 'Online Transfer',
      amount: 500.00,
      category: 'other',
      status: 'pending',
      txHash: '0x56B...1E4g',
    },
    {
      id: 'tx-010',
      date: '2025-03-08',
      merchant: 'Phone Bill',
      amount: 84.99,
      category: 'utilities',
      status: 'failed',
      txHash: '0x82C...9H6j',
    },
    {
      id: 'tx-011',
      date: '2025-03-05',
      merchant: 'Grocery Outlet',
      amount: 95.42,
      category: 'food',
      status: 'completed',
      txHash: '0x37D...5K9l',
    },
    {
      id: 'tx-012',
      date: '2025-03-02',
      merchant: 'Fitness First',
      amount: 89.00,
      category: 'health',
      status: 'completed',
      txHash: '0x93E...6L2m',
    },
  ]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  
  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });
  
  // Format date as MM/DD/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };
  
  // Format number as currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Category display mapping
  const categoryMap = {
    food: { name: 'Food & Dining', icon: '🍔', color: 'bg-green-500/20 text-green-300' },
    shopping: { name: 'Shopping', icon: '🛍️', color: 'bg-blue-500/20 text-blue-300' },
    entertainment: { name: 'Entertainment', icon: '🎬', color: 'bg-purple-500/20 text-purple-300' },
    transport: { name: 'Transportation', icon: '🚗', color: 'bg-yellow-500/20 text-yellow-300' },
    utilities: { name: 'Bills & Utilities', icon: '💡', color: 'bg-red-500/20 text-red-300' },
    housing: { name: 'Housing', icon: '🏠', color: 'bg-indigo-500/20 text-indigo-300' },
    travel: { name: 'Travel', icon: '✈️', color: 'bg-cyan-500/20 text-cyan-300' },
    health: { name: 'Healthcare', icon: '🩺', color: 'bg-pink-500/20 text-pink-300' },
    other: { name: 'Other', icon: '📋', color: 'bg-gray-500/20 text-gray-300' }
  };
  
  // Status display mapping
  const statusMap = {
    completed: { name: 'Completed', color: 'bg-green-500/20 text-green-300' },
    pending: { name: 'Pending', color: 'bg-yellow-500/20 text-yellow-300' },
    failed: { name: 'Failed', color: 'bg-red-500/20 text-red-300' }
  };
  
  // Request sort function
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    // Apply filters
    let filtered = [...allTransactions];
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(tx => 
        tx.merchant.toLowerCase().includes(query) || 
        tx.txHash.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(tx => tx.category === filters.category);
    }
    
    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(tx => tx.status === filters.status);
    }
    
    // Filter by date range
    if (filters.dateRange !== 'all') {
      const now = new Date();
      let startDate;
      
      switch (filters.dateRange) {
        case 'week':
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate = new Date(now);
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          startDate = new Date(now);
          startDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          startDate = new Date(now);
          startDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          startDate = new Date(0); // Beginning of time
      }
      
      filtered = filtered.filter(tx => new Date(tx.date) >= startDate);
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filtered;
  }, [allTransactions, filters, sortConfig]);
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage);
  
  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };
  
  // Animation variants
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Get sort icon based on current sort config
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      );
    }
    
    return sortConfig.direction === 'asc' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };
  
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
      {/* Table header and controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-lg font-semibold text-white">Transaction History</h2>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Show:</span>
          <select 
            value={itemsPerPage} 
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page
            }}
            className="bg-gray-700/50 border border-gray-600 rounded-md text-xs text-white px-2 py-1"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>
      
      {/* Responsive table */}
      <div className="overflow-x-auto">
        <motion.table 
          variants={tableVariants}
          className="w-full min-w-full divide-y divide-gray-700"
        >
          <thead className="bg-gray-700/30">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('date')}>
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  {getSortIcon('date')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('merchant')}>
                <div className="flex items-center space-x-1">
                  <span>Merchant</span>
                  {getSortIcon('merchant')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('amount')}>
                <div className="flex items-center space-x-1">
                  <span>Amount</span>
                  {getSortIcon('amount')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('category')}>
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  {getSortIcon('category')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('status')}>
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/30">
            <AnimatePresence>
              {currentItems.length > 0 ? (
                currentItems.map((transaction) => (
                  <motion.tr 
                    key={transaction.id} 
                    variants={rowVariants}
                    className="hover:bg-gray-700/20 cursor-pointer"
                    onClick={() => onViewTransaction(transaction)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{formatDate(transaction.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{transaction.merchant}</div>
                      <div className="text-xs text-gray-400">Tx: {transaction.txHash}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{formatCurrency(transaction.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryMap[transaction.category]?.color}`}>
                        <span className="mr-1">{categoryMap[transaction.category]?.icon}</span>
                        {categoryMap[transaction.category]?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusMap[transaction.status]?.color}`}>
                        {statusMap[transaction.status]?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateCategory(transaction);
                        }}
                        className="text-orange-400 hover:text-orange-300 ml-3"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center">
                    <div className="text-gray-400">No transactions found matching your filters</div>
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </motion.table>
      </div>
      
      {/* Pagination */}
      {filteredAndSortedTransactions.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-400">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAndSortedTransactions.length)} of {filteredAndSortedTransactions.length} transactions
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md text-sm ${currentPage === 1 ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed' : 'bg-gray-700/50 text-white hover:bg-gray-600/50'}`}
            >
              Previous
            </button>
            
            {/* Page buttons */}
            <div className="hidden sm:flex space-x-1">
              {[...Array(totalPages).keys()].map(number => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`px-3 py-1 rounded-md text-sm ${currentPage === number + 1 ? 'bg-orange-500/70 text-white' : 'bg-gray-700/50 text-white hover:bg-gray-600/50'}`}
                >
                  {number + 1}
                </button>
              ))}
            </div>
            
            {/* Mobile page indicator */}
            <div className="sm:hidden px-3 py-1 rounded-md text-sm bg-gray-700/50 text-white">
              {currentPage} / {totalPages}
            </div>
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md text-sm ${currentPage === totalPages ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed' : 'bg-gray-700/50 text-white hover:bg-gray-600/50'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      {/* Verification notice */}
      <div className="mt-4 pt-3 border-t border-gray-700/30 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span className="text-xs text-gray-500">
          All transactions verified on Linea Network and secured by Metamask
        </span>
      </div>
    </div>
  );
};

export default TransactionTable;