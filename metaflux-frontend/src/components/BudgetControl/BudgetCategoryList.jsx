import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BudgetCategoryList = ({ activeTab, onEditLimit }) => {
  // Mock data for budget categories
  const [personalCategories, setPersonalCategories] = useState([
    { id: 1, name: 'Food & Groceries', budget: 400, spent: 325.75, icon: '🍲' },
    { id: 2, name: 'Entertainment', budget: 200, spent: 187.50, icon: '🎬' },
    { id: 3, name: 'Transportation', budget: 150, spent: 102.30, icon: '🚗' },
    { id: 4, name: 'Shopping', budget: 250, spent: 215.40, icon: '🛍️' },
    { id: 5, name: 'Bills & Utilities', budget: 500, spent: 498.20, icon: '💡' },
  ]);
  
  // Mock data for business delegates
  const [businessDelegates, setBusinessDelegates] = useState([
    { id: 1, name: 'Marketing Team', budget: 3000, spent: 1242.85, members: 3 },
    { id: 2, name: 'Development', budget: 2500, spent: 980.25, members: 5 },
    { id: 3, name: 'Operations', budget: 1500, spent: 725.50, members: 2 },
    { id: 4, name: 'Sales', budget: 1500, spent: 292.25, members: 4 },
  ]);
  
  // State for new category form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', budget: 100, icon: '📊' });
  
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };
  
  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  };
  
  // Calculate percentage spent for progress bar
  const calculatePercentage = (spent, budget) => {
    return (spent / budget) * 100;
  };
  
  // Add new category
  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;
    
    if (activeTab === 'personal') {
      setPersonalCategories([
        ...personalCategories,
        {
          id: Date.now(),
          name: newCategory.name,
          budget: parseFloat(newCategory.budget),
          spent: 0,
          icon: newCategory.icon
        }
      ]);
    }
    
    setNewCategory({ name: '', budget: 100, icon: '📊' });
    setShowAddForm(false);
  };
  
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">
          {activeTab === 'personal' ? 'Budget Categories' : 'Team Budgets'}
        </h2>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3 py-1.5 text-xs rounded-lg bg-gray-700/50 text-white hover:bg-gray-600/50 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {activeTab === 'personal' ? 'Add Category' : 'Add Team Budget'}
        </motion.button>
      </div>
      
      {/* Add New Category Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gray-700/30 rounded-lg overflow-hidden"
          >
            <h3 className="text-white text-sm font-medium mb-3">
              {activeTab === 'personal' ? 'Add New Budget Category' : 'Add New Team Budget'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-1.5 text-sm text-white"
                  placeholder={activeTab === 'personal' ? "e.g. Dining Out" : "e.g. Research Team"}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Budget</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={newCategory.budget}
                  onChange={(e) => setNewCategory({...newCategory, budget: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-1.5 text-sm text-white"
                />
              </div>
            </div>
            <div className="mt-3 flex justify-end space-x-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1 text-xs rounded-md bg-gray-600/50 text-gray-300 hover:bg-gray-500/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-3 py-1 text-xs rounded-md bg-orange-500/70 text-white hover:bg-orange-600/70 transition-colors"
              >
                Add
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Category List */}
      <div className="max-h-96 overflow-y-auto pr-1">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <AnimatePresence>
            {activeTab === 'personal' 
              ? personalCategories.map(category => (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  exit="exit"
                  layout
                  className="bg-gray-700/30 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{category.icon}</span>
                      <div>
                        <h3 className="font-medium text-white">{category.name}</h3>
                        <div className="text-xs text-gray-400 mt-0.5">
                          Spent ${category.spent.toFixed(2)} of ${category.budget.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEditLimit(category)}
                      className="text-xs px-2 py-1 bg-gray-600/50 hover:bg-gray-500/50 text-white rounded-md flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit
                    </motion.button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(calculatePercentage(category.spent, category.budget), 100)}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${
                          calculatePercentage(category.spent, category.budget) < 50 ? 'bg-green-500' : 
                          calculatePercentage(category.spent, category.budget) < 85 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs mt-1">
                      <span className={`${
                        calculatePercentage(category.spent, category.budget) < 50 ? 'text-green-400' : 
                        calculatePercentage(category.spent, category.budget) < 85 ? 'text-yellow-400' : 
                        'text-red-400'
                      }`}>
                        {calculatePercentage(category.spent, category.budget).toFixed(0)}%
                      </span>
                      <span className="text-gray-400">
                        ${(category.budget - category.spent).toFixed(2)} remaining
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
              : businessDelegates.map(delegate => (
                <motion.div
                  key={delegate.id}
                  variants={itemVariants}
                  exit="exit"
                  layout
                  className="bg-gray-700/30 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{delegate.name}</h3>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {delegate.members} team members • Spent ${delegate.spent.toFixed(2)} of ${delegate.budget.toFixed(2)}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEditLimit(delegate)}
                      className="text-xs px-2 py-1 bg-blue-600/50 hover:bg-blue-500/50 text-white rounded-md flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit
                    </motion.button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(calculatePercentage(delegate.spent, delegate.budget), 100)}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${
                          calculatePercentage(delegate.spent, delegate.budget) < 50 ? 'bg-green-500' : 
                          calculatePercentage(delegate.spent, delegate.budget) < 85 ? 'bg-blue-500' : 
                          'bg-purple-500'
                        }`}
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs mt-1">
                      <span className={`${
                        calculatePercentage(delegate.spent, delegate.budget) < 50 ? 'text-green-400' : 
                        calculatePercentage(delegate.spent, delegate.budget) < 85 ? 'text-blue-400' : 
                        'text-purple-400'
                      }`}>
                        {calculatePercentage(delegate.spent, delegate.budget).toFixed(0)}%
                      </span>
                      <span className="text-gray-400">
                        ${(delegate.budget - delegate.spent).toFixed(2)} remaining
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            }
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Blockchain Verification Badge */}
      <div className="mt-4 pt-3 border-t border-gray-700/30 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span className="text-xs text-gray-400">
          Budget data verified via Linea Network & Verax
        </span>
      </div>
    </div>
  );
};

export default BudgetCategoryList;