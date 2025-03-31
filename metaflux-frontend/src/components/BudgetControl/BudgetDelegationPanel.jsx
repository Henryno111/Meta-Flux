import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Shortened wallet address display utility
const shortenWalletAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const BudgetDelegationPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('delegates');
  const [newDelegate, setNewDelegate] = useState({ 
    walletAddress: '', 
    name: '', 
    limit: 100,
    category: 'all'
  });
  
  // Mock delegates data
  const [delegates, setDelegates] = useState([
    { id: 1, name: 'Alex Johnson', walletAddress: '0x71C...1F3d', limit: 200, remaining: 120, status: 'active' },
    { id: 2, name: 'Morgan Smith', walletAddress: '0x35A...9B2c', limit: 500, remaining: 300, status: 'active' },
    { id: 3, name: 'Jamie Rivera', walletAddress: '0x92D...4E7f', limit: 150, remaining: 0, status: 'frozen' },
  ]);
  
  // Mock pending requests
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, name: 'Taylor Doe', walletAddress: '0x28F...7C3e', requestedLimit: 300, message: 'For marketing expenses this month' },
    { id: 2, name: 'Casey Wilson', walletAddress: '0x64B...9A1d', requestedLimit: 250, message: 'Office supplies budget' },
  ]);
  
  // Panel animation variants
  const panelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Backdrop animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Handle adding new delegate
  const handleAddDelegate = () => {
    if (!newDelegate.walletAddress || !newDelegate.name) return;
    
    // Add new delegate (in a real app, this would interact with the blockchain)
    setDelegates([
      ...delegates,
      {
        id: Date.now(),
        name: newDelegate.name,
        walletAddress: newDelegate.walletAddress,
        limit: parseFloat(newDelegate.limit),
        remaining: parseFloat(newDelegate.limit),
        status: 'active'
      }
    ]);
    
    // Reset form
    setNewDelegate({ walletAddress: '', name: '', limit: 100, category: 'all' });
    setActiveTab('delegates');
  };
  
  // Handle approval of delegate request
  const handleApproveRequest = (id) => {
    const request = pendingRequests.find(req => req.id === id);
    
    // Add approved delegate
    if (request) {
      setDelegates([
        ...delegates,
        {
          id: Date.now(),
          name: request.name,
          walletAddress: request.walletAddress,
          limit: request.requestedLimit,
          remaining: request.requestedLimit,
          status: 'active'
        }
      ]);
      
      // Remove from pending
      setPendingRequests(pendingRequests.filter(req => req.id !== id));
    }
  };
  
  // Handle rejection of delegate request
  const handleRejectRequest = (id) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
  };
  
  // Handle removal of delegate
  const handleRemoveDelegate = (id) => {
    setDelegates(delegates.filter(delegate => delegate.id !== id));
  };
  
  // Handle toggling delegate status
  const handleToggleStatus = (id) => {
    setDelegates(delegates.map(delegate => 
      delegate.id === id ? 
        {...delegate, status: delegate.status === 'active' ? 'frozen' : 'active'} : 
        delegate
    ));
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      <motion.div
        key="panel"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gray-800 border-l border-gray-700 shadow-xl z-50 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Budget Delegation</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="px-6 pt-4 border-b border-gray-700">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('delegates')}
              className={`pb-3 text-sm font-medium ${
                activeTab === 'delegates' 
                  ? 'text-white border-b-2 border-orange-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Current Delegates
              <span className="ml-2 bg-gray-700 text-xs py-0.5 px-1.5 rounded-md">
                {delegates.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('requests')}
              className={`pb-3 text-sm font-medium ${
                activeTab === 'requests' 
                  ? 'text-white border-b-2 border-orange-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Pending Requests
              {pendingRequests.length > 0 && (
                <span className="ml-2 bg-orange-500/70 text-xs py-0.5 px-1.5 rounded-md">
                  {pendingRequests.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('add')}
              className={`pb-3 text-sm font-medium ${
                activeTab === 'add' 
                  ? 'text-white border-b-2 border-orange-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Add Delegate
            </button>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {/* Current Delegates Tab */}
            {activeTab === 'delegates' && (
              <motion.div
                key="delegates"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {delegates.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">No delegates added yet</div>
                    <button
                      onClick={() => setActiveTab('add')}
                      className="text-sm text-orange-400 hover:text-orange-300"
                    >
                      Add your first delegate
                    </button>
                  </div>
                ) : (
                  delegates.map((delegate) => (
                    <motion.div
                      key={delegate.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className={`bg-gray-700/30 rounded-lg p-4 ${
                        delegate.status === 'frozen' ? 'border border-blue-500/50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white flex items-center">
                            {delegate.name}
                            {delegate.status === 'frozen' && (
                              <span className="ml-2 text-xs bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">
                                Frozen
                              </span>
                            )}
                          </h3>
                          <div className="text-xs text-gray-400 mt-0.5">
                            Wallet: {delegate.walletAddress}
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleToggleStatus(delegate.id)}
                            className={`p-1.5 rounded-md ${
                              delegate.status === 'active' 
                                ? 'text-blue-400 hover:bg-gray-600/50' 
                                : 'text-orange-400 hover:bg-gray-600/50'
                            }`}
                          >
                            {delegate.status === 'active' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                          <button
                            onClick={() => handleRemoveDelegate(delegate.id)}
                            className="p-1.5 text-red-400 hover:bg-gray-600/50 rounded-md"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="bg-gray-700/50 rounded px-3 py-2">
                          <div className="text-xs text-gray-400">Budget Limit</div>
                          <div className="text-white font-medium">${delegate.limit}</div>
                        </div>
                        <div className="bg-gray-700/50 rounded px-3 py-2">
                          <div className="text-xs text-gray-400">Remaining</div>
                          <div className={`font-medium ${delegate.remaining > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${delegate.remaining}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
            
            {/* Pending Requests Tab */}
            {activeTab === 'requests' && (
              <motion.div
                key="requests"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400">No pending requests</div>
                  </div>
                ) : (
                  pendingRequests.map((request) => (
                    <motion.div
                      key={request.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-gray-700/30 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">{request.name}</h3>
                          <div className="text-xs text-gray-400 mt-0.5">
                            Wallet: {request.walletAddress}
                          </div>
                        </div>
                        <div className="bg-orange-500/20 text-orange-300 text-xs px-2 py-0.5 rounded">
                          Requested: ${request.requestedLimit}
                        </div>
                      </div>
                      
                      {request.message && (
                        <div className="mt-2 p-2 bg-gray-700/50 rounded text-sm text-gray-300">
                          "{request.message}"
                        </div>
                      )}
                      
                      <div className="mt-3 flex justify-end space-x-2">
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="px-3 py-1 text-xs bg-gray-600 hover:bg-gray-500 text-white rounded-md"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApproveRequest(request.id)}
                          className="px-3 py-1 text-xs bg-green-500/70 hover:bg-green-600/70 text-white rounded-md"
                        >
                          Approve
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
            
            {/* Add Delegate Tab */}
            {activeTab === 'add' && (
              <motion.div
                key="add"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Wallet Address</label>
                    <input
                      type="text"
                      value={newDelegate.walletAddress}
                      onChange={(e) => setNewDelegate({...newDelegate, walletAddress: e.target.value})}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      placeholder="0x..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Delegate Name</label>
                    <input
                      type="text"
                      value={newDelegate.name}
                      onChange={(e) => setNewDelegate({...newDelegate, name: e.target.value})}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      placeholder="Name or Team"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Spending Limit</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                      <input
                        type="number"
                        min="1"
                        value={newDelegate.limit}
                        onChange={(e) => setNewDelegate({...newDelegate, limit: e.target.value})}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-7 pr-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Expense Category</label>
                    <select
                      value={newDelegate.category}
                      onChange={(e) => setNewDelegate({...newDelegate, category: e.target.value})}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="all">All Categories</option>
                      <option value="marketing">Marketing Only</option>
                      <option value="operations">Operations Only</option>
                      <option value="development">Development Only</option>
                      <option value="office">Office Expenses Only</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="bg-gray-700/30 rounded-lg p-3 mb-4">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-gray-300">
                        Budget delegation uses Linea's Delegation Toolkit to grant spending permissions to specified wallets while maintaining control over limits.
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleAddDelegate}
                    disabled={!newDelegate.walletAddress || !newDelegate.name}
                    className={`w-full py-2 rounded-lg text-white flex items-center justify-center ${
                      !newDelegate.walletAddress || !newDelegate.name
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-orange-500/70 hover:bg-orange-600/70'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Add Delegate
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BudgetDelegationPanel;