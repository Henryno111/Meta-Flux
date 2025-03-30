import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import BackgroundAnimation from '../components/BackgroundAnimation';
import ExpenseSummary from '../components/dashboard/ExpenseSummary';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import BudgetOverview from '../components/dashboard/BudgetOverview';
import SpendingChart from '../components/dashboard/SpendingChart';
import RewardsWidget from '../components/dashboard/RewardsWidget';
import DelegationWidget from '../components/dashboard/DelegationWidget';
import WalletBalance from '../components/dashboard/WalletBalance';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [_isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    // Simulate loading user data from wallet/API
    const timer = setTimeout(() => {
      setUserName('Alex');
      setIsLoading(false);
    }, 1500);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <BackgroundAnimation />
      
      <DashboardLayout activeTab={activeTab} onTabChange={handleTabChange}>
        {isLoading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <div className="relative">
              <div className="h-16 w-16 md:h-24 md:w-24 rounded-full border-t-2 border-b-2 border-orange-500 animate-spin"></div>
              <div className="absolute top-0 left-0 h-16 w-16 md:h-24 md:w-24 rounded-full border-r-2 border-l-2 border-purple-500 animate-spin animation-delay-500"></div>
            </div>
          </div>
        ) : (
          <div className="p-3 sm:p-4 md:p-6">
            <header className="mb-6 md:mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                  {getGreeting()}, <span className="bg-gradient-to-r from-orange-400 to-amber-500 text-transparent bg-clip-text">{userName}</span>
                </h1>
                <p className="text-sm md:text-base text-gray-400">Here's what's happening with your finances today.</p>
              </motion.div>
            </header>
            
            <div className="mb-4 md:mb-6 overflow-x-auto pb-2">
              <QuickActions />
            </div>
            
            {/* Main dashboard grid - responsive layout */}
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {/* Main content section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Primary column - 2/3 width on large screens */}
                <div className="lg:col-span-2 space-y-4 md:space-y-6 order-2 lg:order-1">
                  <ExpenseSummary />
                  <SpendingChart />
                  <RecentTransactions />
                </div>
                
                {/* Secondary column - 1/3 width on large screens */}
                <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
                  <WalletBalance />
                  <RewardsWidget />
                  <DelegationWidget />
                </div>
              </div>
              
              {/* Full width section */}
              <div className="order-3">
                <BudgetOverview />
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;