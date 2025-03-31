import { useState } from 'react';
import { motion } from 'framer-motion';
import TransactionHeader from '../components/Transactions/TransactionHeader';
import TransactionFilters from '../components/Transactions/TransactionFilters';
import TransactionTable from '../components/Transactions/TransactionTable';
import TransactionSummary from '../components/Transactions/TransactionSummary';
import TransactionDetailModal from '../components/Transactions/TransactionDetailModal';
import TransactionCategoryModal from '../components/Transactions/TransactionCategoryModal';
import BackgroundAnimation from '../components/BackgroundAnimation';

const Transactions = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'month',
    status: 'all',
    category: 'all',
    searchQuery: '',
  });

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
  
  // Handler for viewing transaction details
  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };
  
  // Handler for updating transaction category
  const handleUpdateCategory = (transaction) => {
    setSelectedTransaction(transaction);
    setShowCategoryModal(true);
  };
  
  // Handler for exporting transactions
  const handleExportTransactions = () => {
    // In a real app, this would trigger a CSV export
    console.log('Exporting transactions as CSV');
    
    // Example notification or confirmation could be shown here
    alert('Transactions exported successfully!');
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
        {/* Header with Back Button */}
        <motion.div variants={itemVariants}>
          <TransactionHeader 
            onExportClick={handleExportTransactions}
          />
        </motion.div>
        
        {/* Transaction Summary */}
        <motion.div variants={itemVariants}>
          <TransactionSummary dateRange={filters.dateRange} />
        </motion.div>
        
        {/* Filters Section */}
        <motion.div variants={itemVariants}>
          <TransactionFilters 
            filters={filters} 
            setFilters={setFilters} 
          />
        </motion.div>
        
        {/* Transactions Table */}
        <motion.div variants={itemVariants}>
          <TransactionTable 
            filters={filters}
            onViewTransaction={handleViewTransaction}
            onUpdateCategory={handleUpdateCategory}
          />
        </motion.div>
      </motion.div>
      
      {/* Transaction Detail Modal */}
      {showDetailModal && (
        <TransactionDetailModal 
          transaction={selectedTransaction}
          onClose={() => setShowDetailModal(false)}
          onUpdateCategory={() => {
            setShowDetailModal(false);
            setShowCategoryModal(true);
          }}
        />
      )}
      
      {/* Transaction Category Modal */}
      {showCategoryModal && (
        <TransactionCategoryModal 
          transaction={selectedTransaction}
          onClose={() => setShowCategoryModal(false)}
        />
      )}
    </div>
  );
};

export default Transactions;