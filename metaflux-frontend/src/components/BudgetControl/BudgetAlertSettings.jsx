import { useState } from 'react';
import { motion } from 'framer-motion';

const BudgetAlertSettings = () => {
  // Alert settings state
  const [alertSettings, setAlertSettings] = useState({
    emailEnabled: true,
    pushEnabled: true,
    thresholds: [
      { id: 1, percentage: 50, enabled: false },
      { id: 2, percentage: 75, enabled: true },
      { id: 3, percentage: 90, enabled: true },
      { id: 4, percentage: 100, enabled: true },
    ]
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Toggle notification method
  const toggleNotification = (type) => {
    setAlertSettings({
      ...alertSettings,
      [type]: !alertSettings[type]
    });
  };
  
  // Toggle threshold
  const toggleThreshold = (id) => {
    setAlertSettings({
      ...alertSettings,
      thresholds: alertSettings.thresholds.map(threshold => 
        threshold.id === id ? {...threshold, enabled: !threshold.enabled} : threshold
      )
    });
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 h-full"
    >
      <h2 className="text-lg font-semibold text-white mb-4">Budget Alerts</h2>
      
      {/* Alert notification methods */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Notification Methods</h3>
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-white">Email Notifications</span>
            </div>
            <button 
              onClick={() => toggleNotification('emailEnabled')}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                alertSettings.emailEnabled ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  alertSettings.emailEnabled ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="text-sm text-white">Push Notifications</span>
            </div>
            <button 
              onClick={() => toggleNotification('pushEnabled')}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                alertSettings.pushEnabled ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  alertSettings.pushEnabled ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Threshold settings */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-3">Alert Thresholds</h3>
        <div className="space-y-3">
          {alertSettings.thresholds.map((threshold) => (
            <motion.div 
              key={threshold.id} 
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <div 
                  className={`w-2 h-2 rounded-full mr-2 ${
                    threshold.percentage < 75 ? 'bg-green-500' : 
                    threshold.percentage < 90 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}
                />
                <span className="text-sm text-white">
                  {threshold.percentage === 100 
                    ? 'When budget is depleted'
                    : `When ${threshold.percentage}% of budget is used`}
                </span>
              </div>
              <button 
                onClick={() => toggleThreshold(threshold.id)}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                  threshold.enabled ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    threshold.enabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Custom alert note */}
      <motion.div 
        variants={itemVariants}
        className="mt-6 pt-4 border-t border-gray-700/30"
      >
        <div className="bg-gray-700/30 rounded-lg p-3">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-gray-300">
              Smart contract alerts will be triggered automatically when your spending approaches the thresholds you've set. Make sure your notification details are up to date in your profile settings.
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Test alert button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-4 w-full py-2 bg-orange-500/60 hover:bg-orange-600/60 rounded-lg text-white text-sm flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        Test Alert
      </motion.button>
    </motion.div>
  );
};

export default BudgetAlertSettings;