import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const DelegationWidget = () => {
  const [showActions, setShowActions] = useState(null);
  
  // Mock data
  const delegations = [
    {
      id: 1,
      name: 'Sarah M.',
      address: '0x1a2b...8f9d',
      limit: 500,
      spent: 210.25,
      status: 'active',
      timeLeft: '23 days'
    },
    {
      id: 2,
      name: 'John D.',
      address: '0x3c4e...7g8h',
      limit: 300,
      spent: 275.50,
      status: 'active',
      timeLeft: '8 days'
    }
  ];

  const toggleActions = (id) => {
    if (showActions === id) {
      setShowActions(null);
    } else {
      setShowActions(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Active Delegations</h2>
        <Link to="/delegation" className="text-xs sm:text-sm text-orange-400 hover:text-orange-300 flex items-center">
          <span>Manage</span>
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
      
      {delegations.length === 0 ? (
        <div className="text-center py-6">
          <div className="h-16 w-16 rounded-full bg-gray-700/30 flex items-center justify-center text-gray-400 mx-auto mb-3">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
          <p className="text-gray-400 mb-4">No active delegations</p>
          <button className="px-4 py-2 bg-transparent border border-orange-500/50 text-orange-400 font-medium rounded-lg hover:bg-orange-500/10 transition-colors">
            Create Delegation
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {delegations.map((delegation, index) => (
            <motion.div
              key={delegation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-700/20 rounded-lg p-3 sm:p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center text-white text-sm mr-3">
                    {delegation.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-white">{delegation.name}</div>
                    <div className="text-xs text-gray-400">
                      {delegation.address}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`text-xs px-2 py-1 rounded ${
                    delegation.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  } hidden sm:block mr-2`}>
                    {delegation.status === 'active' ? 'Active' : 'Inactive'}
                  </div>
                  <button 
                    onClick={() => toggleActions(delegation.id)} 
                    className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-gray-400">
                    Spending <span className="text-white font-medium">${delegation.spent.toFixed(2)}</span> of <span className="text-white font-medium">${delegation.limit.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {((delegation.spent / delegation.limit) * 100).toFixed(0)}%
                  </div>
                </div>
                
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(delegation.spent / delegation.limit) * 100}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full ${
                      (delegation.spent / delegation.limit) > 0.8 
                        ? 'bg-orange-500' 
                        : 'bg-blue-500'
                    }`}
                  ></motion.div>
                </div>
                
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-xs text-gray-400">
                    <span className="inline-block mr-1">⏱️</span> {delegation.timeLeft} left
                  </div>
                  
                  {/* Mobile: Status badge */}
                  <div className={`text-xs px-2 py-0.5 rounded ${
                    delegation.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  } sm:hidden`}>
                    {delegation.status === 'active' ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
              
              {/* Action menu */}
              {showActions === delegation.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 border-t border-gray-700/30 pt-3 grid grid-cols-2 gap-2"
                >
                  <button className="text-xs text-gray-300 bg-gray-700/30 hover:bg-gray-700/50 px-2 py-1.5 rounded transition-colors flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Modify Limit
                  </button>
                  <button className="text-xs text-gray-300 bg-gray-700/30 hover:bg-gray-700/50 px-2 py-1.5 rounded transition-colors flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    History
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
          
          <button className="w-full mt-4 py-2 flex items-center justify-center bg-transparent border border-gray-700 text-gray-400 hover:text-orange-400 hover:border-orange-500/50 font-medium rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Delegation
          </button>
        </div>
      )}
      
      {/* Empty state for mobile */}
      {delegations.length === 0 && (
        <div className="mt-4 text-center text-xs text-gray-500 sm:hidden">
          Create delegations to allow team members to spend up to a set limit
        </div>
      )}
    </motion.div>
  );
};

export default DelegationWidget;