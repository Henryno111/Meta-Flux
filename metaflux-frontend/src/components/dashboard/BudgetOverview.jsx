import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const BudgetOverview = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Food & Groceries', budget: 400, spent: 325.75, color: '#F97316' },
    { id: 2, category: 'Entertainment', budget: 200, spent: 187.50, color: '#3B82F6' },
    { id: 3, category: 'Transportation', budget: 150, spent: 102.30, color: '#10B981' },
    { id: 4, category: 'Shopping', budget: 250, spent: 215.40, color: '#8B5CF6' },
    { id: 5, category: 'Bills & Utilities', budget: 500, spent: 498.20, color: '#EC4899' },
  ]);
  
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [editingBudgetId, setEditingBudgetId] = useState(null);
  const [editingBudgetValue, setEditingBudgetValue] = useState(0);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryBudget, setNewCategoryBudget] = useState(100);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Calculate totals when budgets change
  useEffect(() => {
    const sumBudget = budgets.reduce((sum, item) => sum + item.budget, 0);
    const sumSpent = budgets.reduce((sum, item) => sum + item.spent, 0);
    
    setTotalBudget(sumBudget);
    setTotalSpent(sumSpent);
  }, [budgets]);
  
  // Check window size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Prepare chart data
  const chartData = budgets.map(item => ({
    name: item.category,
    value: item.spent,
    budget: item.budget,
    percentage: ((item.spent / item.budget) * 100).toFixed(0)
  }));
  
  // Handle budget edit
  const startEditingBudget = (id, currentValue) => {
    setEditingBudgetId(id);
    setEditingBudgetValue(currentValue);
  };
  
  const saveBudgetEdit = () => {
    if (editingBudgetId) {
      setBudgets(budgets.map(budget => 
        budget.id === editingBudgetId 
          ? { ...budget, budget: parseFloat(editingBudgetValue) } 
          : budget
      ));
      setEditingBudgetId(null);
    }
  };
  
  // Handle category addition
  const addNewCategory = () => {
    if (newCategoryName.trim() === '') return;
    
    // Generate a random color
    const colors = ['#F97316', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#EAB308', '#64748B', '#0EA5E9'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Add new category
    const newId = Math.max(...budgets.map(b => b.id), 0) + 1;
    setBudgets([...budgets, {
      id: newId,
      category: newCategoryName,
      budget: parseFloat(newCategoryBudget),
      spent: 0,
      color: randomColor
    }]);
    
    // Reset form
    setNewCategoryName('');
    setNewCategoryBudget(100);
    setIsAddingCategory(false);
  };
  
  // Handle category removal
  const removeCategory = (id) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded-md shadow-md text-sm">
          <p className="font-medium text-white">{data.name}</p>
          <p className="text-gray-300">Spent: ${data.value.toFixed(2)}</p>
          <p className="text-gray-300">Budget: ${data.budget.toFixed(2)}</p>
          <p className={`font-medium ${data.value > data.budget ? 'text-red-400' : 'text-green-400'}`}>
            {data.percentage}% of budget
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Budget Overview</h2>
        
        <div className="flex w-full sm:w-auto justify-end space-x-2">
          <button
            onClick={() => setIsAddingCategory(!isAddingCategory)}
            className="px-3 py-1.5 text-xs sm:text-sm rounded-md bg-gray-700/50 text-white hover:bg-gray-600/60 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Category
          </button>
        </div>
      </div>
      
      {/* Add Category Form */}
      {isAddingCategory && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-gray-700/30 rounded-lg"
        >
          <h3 className="text-white text-sm font-medium mb-3">Add New Budget Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Category Name</label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-1.5 text-sm text-white"
                placeholder="e.g. Dining Out"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Budget Amount</label>
              <input
                type="number"
                min="1"
                step="1"
                value={newCategoryBudget}
                onChange={(e) => setNewCategoryBudget(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-1.5 text-sm text-white"
              />
            </div>
          </div>
          <div className="mt-3 flex justify-end space-x-2">
            <button
              onClick={() => setIsAddingCategory(false)}
              className="px-3 py-1 text-xs rounded-md bg-gray-600/50 text-gray-300 hover:bg-gray-500/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addNewCategory}
              className="px-3 py-1 text-xs rounded-md bg-orange-500/70 text-white hover:bg-orange-600/70 transition-colors"
            >
              Add Category
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart section */}
        <div className="md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-1">Total Budget</div>
              <div className="text-2xl font-bold text-white">${totalBudget.toFixed(2)}</div>
            </div>
            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-1">Total Spent</div>
              <div className="text-2xl font-bold text-white">${totalSpent.toFixed(2)}</div>
              <div className={`text-sm font-medium mt-1 ${totalSpent > totalBudget ? 'text-red-400' : 'text-green-400'}`}>
                {totalSpent > totalBudget 
                  ? `${(((totalSpent - totalBudget) / totalBudget) * 100).toFixed(1)}% over budget` 
                  : `${(((totalBudget - totalSpent) / totalBudget) * 100).toFixed(1)}% remaining`
                }
              </div>
            </div>
          </div>
          
          {/* Chart container with fixed height */}
          <div className="h-56 md:h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 40 : 50}
                  outerRadius={isMobile ? 70 : 80}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  animationDuration={1000}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={budgets[index].color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: '10px' }}
                  formatter={(value) => <span className="text-xs text-gray-300">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Budget categories list */}
        <div className="md:col-span-2">
          <div className="max-h-96 overflow-y-auto pr-1">
            <table className="w-full">
              <thead className="text-xs text-gray-400 border-b border-gray-700/50">
                <tr>
                  <th className="pb-2 text-left">Category</th>
                  <th className="pb-2 text-right">Budget</th>
                  <th className="pb-2 text-right">Spent</th>
                  <th className="pb-2 text-right">Remaining</th>
                  <th className="pb-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {budgets.map((budget) => (
                  <tr key={budget.id} className="text-sm">
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: budget.color }}></div>
                        <span className="text-white font-medium">{budget.category}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      {editingBudgetId === budget.id ? (
                        <div className="flex items-center justify-end">
                          <input
                            type="number"
                            min="1"
                            step="1"
                            value={editingBudgetValue}
                            onChange={(e) => setEditingBudgetValue(e.target.value)}
                            className="w-20 bg-gray-700/50 border border-gray-600 rounded-md px-2 py-1 text-xs text-white text-right"
                          />
                          <button
                            onClick={saveBudgetEdit}
                            className="ml-1 text-green-400 hover:text-green-300"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div 
                          className="text-white cursor-pointer hover:text-orange-300 transition-colors"
                          onClick={() => startEditingBudget(budget.id, budget.budget)}
                        >
                          ${budget.budget.toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="py-3 text-right text-white">${budget.spent.toFixed(2)}</td>
                    <td className="py-3 text-right">
                      <span 
                        className={budget.spent > budget.budget ? 'text-red-400' : 'text-green-400'}
                      >
                        ${(budget.budget - budget.spent).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => removeCategory(budget.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Link to Verax verification */}
          <div className="mt-4 pt-3 border-t border-gray-700/30 flex justify-between items-center">
            <div className="text-xs text-gray-500">
              <span className="inline-block mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 inline -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              Budget data verified via Verax
            </div>
            <button className="text-xs px-3 py-1 rounded-md bg-blue-500/50 text-white hover:bg-blue-600/50 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Sync with Blockchain
            </button>
          </div>
        </div>
      </div>
      
      {/* Metamask delegation hint */}
      <div className="mt-6 pt-4 border-t border-gray-700/30">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center space-x-2">
            <svg width="20" height="20" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.9583 1L19.8242 10.7183L22.2215 4.99099L32.9583 1Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.70752 1L15.6987 10.809L13.4443 4.99098L2.70752 1Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M28.2861 23.7249L24.8099 29.0908L32.3187 31.1572L34.4875 23.8266L28.2861 23.7249Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.17578 23.8266L3.33458 31.1572L10.8433 29.0908L7.3671 23.7249L1.17578 23.8266Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs text-gray-300">Linea Network Delegation</span>
          </div>
          
          <button className="mt-3 sm:mt-0 text-xs px-3 py-1.5 rounded-md bg-orange-500/70 text-white hover:bg-orange-600/70 transition-colors">
            Delegate Budget Management
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetOverview;