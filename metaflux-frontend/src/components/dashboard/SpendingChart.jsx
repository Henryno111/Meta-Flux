import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SpendingChart = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [budget, setBudget] = useState(1000); // Default monthly budget
  const [showAlert, setShowAlert] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Mock data
  const monthlyData = [
    { name: '1', expense: 42.5 },
    { name: '5', expense: 105.2 },
    { name: '10', expense: 35.6 },
    { name: '15', expense: 180.3 },
    { name: '20', expense: 96.5 },
    { name: '25', expense: 225.8 },
    { name: '30', expense: 159.4 },
  ];
  
  const quarterlyData = [
    { name: 'Jan', expense: 750.6 },
    { name: 'Feb', expense: 820.3 },
    { name: 'Mar', expense: 975.8 },
  ];
  
  const yearlyData = [
    { name: 'Jan', expense: 750.6 },
    { name: 'Feb', expense: 820.3 },
    { name: 'Mar', expense: 975.8 },
    { name: 'Apr', expense: 890.2 },
    { name: 'May', expense: 680.5 },
    { name: 'Jun', expense: 780.4 },
    { name: 'Jul', expense: 920.7 },
    { name: 'Aug', expense: 860.3 },
    { name: 'Sep', expense: 730.8 },
    { name: 'Oct', expense: 785.6 },
    { name: 'Nov', expense: 850.9 },
    { name: 'Dec', expense: 1050.2 },
  ];
  
  const getChartData = () => {
    switch(timeRange) {
      case 'month':
        return monthlyData;
      case 'quarter':
        return quarterlyData;
      case 'year':
        return yearlyData;
      default:
        return monthlyData;
    }
  };
  
  // For mobile, limit the number of data points to avoid overcrowding
  const getMobileData = (data) => {
    if (timeRange === 'year' && data.length > 6) {
      // For yearly data on mobile, show every other month
      return data.filter((_, index) => index % 2 === 0);
    }
    return data;
  };
  
  const data = isMobile ? getMobileData(getChartData()) : getChartData();
  
  // Calculate total spending for the current period
  const totalSpending = data.reduce((sum, item) => sum + item.expense, 0);
  
  // Calculate budget percentage
  const budgetPercentage = (totalSpending / budget) * 100;
  
  // Show alert if spending is above 80% of budget
  useEffect(() => {
    if (budgetPercentage >= 80) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [budgetPercentage]);
  
  // Function to handle budget change
  const handleBudgetChange = (event) => {
    setBudget(parseFloat(event.target.value));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Spending Trends</h2>
        
        <div className="flex w-full sm:w-auto justify-between sm:justify-start space-x-1 sm:space-x-2 bg-gray-700/30 rounded-lg p-1">
          <button
            onClick={() => setTimeRange('month')}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors ${
              timeRange === 'month'
                ? 'bg-orange-500/70 text-white'
                : 'text-gray-400 hover:bg-gray-600/30'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('quarter')}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors ${
              timeRange === 'quarter'
                ? 'bg-orange-500/70 text-white'
                : 'text-gray-400 hover:bg-gray-600/30'
            }`}
          >
            Quarter
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors ${
              timeRange === 'year'
                ? 'bg-orange-500/70 text-white'
                : 'text-gray-400 hover:bg-gray-600/30'
            }`}
          >
            Year
          </button>
        </div>
      </div>
      
      {/* Budget alert banner */}
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 bg-red-500/20 border border-red-500/40 rounded-lg p-3 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-red-100">
            You've spent {budgetPercentage.toFixed(0)}% of your budget for this period.
          </span>
        </motion.div>
      )}
      
      {/* Budget progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">Budget: ${budget.toFixed(2)}</span>
          <span className="text-xs text-gray-400">Spent: ${totalSpending.toFixed(2)}</span>
        </div>
        <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              budgetPercentage < 50 ? 'bg-green-500' : 
              budgetPercentage < 80 ? 'bg-yellow-500' : 
              'bg-red-500'
            }`}
            style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="h-48 sm:h-64 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: isMobile ? 10 : 12, fill: '#9CA3AF' }}
              padding={{ left: 10, right: 10 }}
              interval={isMobile ? 'preserveStartEnd' : 0}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: isMobile ? 10 : 12, fill: '#9CA3AF' }}
              tickFormatter={(value) => `$${value}`}
              width={isMobile ? 35 : 50}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Expense']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                backgroundColor: 'rgba(31, 41, 55, 0.9)',
                color: '#F3F4F6',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                padding: '8px 12px'
              }}
              labelStyle={{ fontSize: isMobile ? 12 : 14 }}
              itemStyle={{ fontSize: isMobile ? 12 : 14 }}
            />
            <Area 
              type="monotone" 
              dataKey="expense" 
              stroke="#F97316" 
              strokeWidth={2}
              fill="url(#colorExpense)" 
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Quick statistics summary for mobile */}
      <div className="mt-4 pt-4 border-t border-gray-700/30 grid grid-cols-3 gap-2 md:hidden">
        <div className="bg-gray-700/30 rounded-lg p-2 text-center">
          <div className="text-xs text-gray-400 mb-1">Average</div>
          <div className="text-sm text-white font-semibold">
            ${(data.reduce((sum, item) => sum + item.expense, 0) / data.length).toFixed(2)}
          </div>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-2 text-center">
          <div className="text-xs text-gray-400 mb-1">Highest</div>
          <div className="text-sm text-white font-semibold">
            ${Math.max(...data.map(item => item.expense)).toFixed(2)}
          </div>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-2 text-center">
          <div className="text-xs text-gray-400 mb-1">Lowest</div>
          <div className="text-sm text-white font-semibold">
            ${Math.min(...data.map(item => item.expense)).toFixed(2)}
          </div>
        </div>
      </div>
      
      {/* Insights panel for larger screens */}
      <div className="hidden md:flex mt-4 pt-4 border-t border-gray-700/30">
        <div className="flex items-center space-x-6">
          <div>
            <span className="text-xs text-gray-400 block mb-1">Average spending</span>
            <span className="text-lg font-semibold text-white">
              ${(data.reduce((sum, item) => sum + item.expense, 0) / data.length).toFixed(2)}
            </span>
          </div>
          <div className="h-8 border-l border-gray-700/50"></div>
          <div>
            <span className="text-xs text-gray-400 block mb-1">Highest expense</span>
            <span className="text-lg font-semibold text-white">
              ${Math.max(...data.map(item => item.expense)).toFixed(2)}
            </span>
          </div>
          <div className="h-8 border-l border-gray-700/50"></div>
          <div>
            <span className="text-xs text-gray-400 block mb-1">Spending trend</span>
            <span className={`text-lg font-semibold ${
              data[data.length - 1].expense > data[0].expense 
                ? 'text-red-400' 
                : 'text-green-400'
            }`}>
              {data[data.length - 1].expense > data[0].expense ? '↑ Increasing' : '↓ Decreasing'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Budget controls */}
      <div className="mt-6 pt-4 border-t border-gray-700/30">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-md font-medium text-white">Budget Settings</h3>
          
          <div className="w-full sm:w-auto flex items-center space-x-3">
            <label htmlFor="budget" className="text-sm text-gray-400">Adjust budget:</label>
            <input
              id="budget"
              type="number"
              min="100"
              step="100"
              value={budget}
              onChange={handleBudgetChange}
              className="bg-gray-700/30 border border-gray-600 rounded-lg px-3 py-1 text-sm text-white w-24"
            />
            <button 
              className="text-xs px-3 py-1 rounded-md bg-orange-500/70 text-white hover:bg-orange-600/70 transition-colors"
              onClick={() => setShowAlert(!showAlert)}
            >
              {showAlert ? 'Hide Alert' : 'Test Alert'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Metamask integration hint for developers */}
      <div className="mt-4 text-xs text-gray-500 italic">
        Note: This component will integrate with Metamask and the Linea network to track real transactions.
      </div>
    </motion.div>
  );
};

export default SpendingChart;