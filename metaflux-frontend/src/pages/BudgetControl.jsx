import { useState } from 'react';
import { motion } from 'framer-motion';
import BudgetHeader from '../components/BudgetControl/BudgetHeader';
import BudgetTabs from '../components/BudgetControl/BudgetTabs';
import BudgetSummary from '../components/BudgetControl/BudgetSummary';
import BudgetCategoryList from '../components/BudgetControl/BudgetCategoryList';
import BudgetAlertSettings from '../components/BudgetControl/BudgetAlertSettings'; 
import BudgetLimitModal from '../components/BudgetControl/BudgetLimitModal';
import BudgetDelegationPanel from '../components/BudgetControl/BudgetDelegationPanel';
import BackgroundAnimation from '../components/BackgroundAnimation';


const BudgetControl = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDelegationPanel, setShowDelegationPanel] = useState(false);
  
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
  
  // Handler for editing budget limits
  const handleEditLimit = (category) => {
    setSelectedCategory(category);
    setShowLimitModal(true);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <BackgroundAnimation />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants}>
          <BudgetHeader 
            activeTab={activeTab}
            onDelegationClick={() => setShowDelegationPanel(!showDelegationPanel)}
          />
        </motion.div>
        
        {/* Tabs Section */}
        <motion.div variants={itemVariants}>
          <BudgetTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </motion.div>
        
        {/* Summary Cards */}
        <motion.div variants={itemVariants}>
          <BudgetSummary activeTab={activeTab} />
        </motion.div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Budget Categories List */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <BudgetCategoryList 
              activeTab={activeTab} 
              onEditLimit={handleEditLimit}
            />
          </motion.div>
          
          {/* Alert Settings Card */}
          <motion.div variants={itemVariants}>
            <BudgetAlertSettings />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Budget Limit Modal */}
      {showLimitModal && (
        <BudgetLimitModal 
          category={selectedCategory}
          onClose={() => setShowLimitModal(false)}
        />
      )}
      
      {/* Delegation Side Panel */}
      {showDelegationPanel && (
        <BudgetDelegationPanel 
          onClose={() => setShowDelegationPanel(false)}
        />
      )}
    </div>
  );
};

export default BudgetControl;