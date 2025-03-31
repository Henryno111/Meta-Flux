import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children, activeTab, onTabChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Mock notifications
    setNotifications([
      {
        id: 1,
        type: 'alert',
        message: 'You are approaching your monthly budget limit',
        time: '10 min ago',
        read: false
      },
      {
        id: 2,
        type: 'info',
        message: 'Your delegation request was approved',
        time: '2 hours ago',
        read: false
      },
      {
        id: 3,
        type: 'success',
        message: 'You earned a new NFT badge!',
        time: '1 day ago',
        read: true
      }
    ]);

    // Handle scroll effect for header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Handle clicks outside menus to close them
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    // Close sidebar on route change
    setIsSidebarOpen(false);

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    // Handle logout logic
    navigate('/');
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: 'dashboard', path: '/dashboard' },
    { id: 'transactions', label: 'Transactions', icon: 'transactions', path: '/transactions' },
    { id: 'budgeting', label: 'Budgeting', icon: 'budgeting', path: '/budgeting' },
    { id: 'delegation', label: 'Delegation', icon: 'delegation', path: '/delegation' },
    { id: 'rewards', label: 'Rewards', icon: 'rewards', path: '/rewards' },
    { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'dashboard':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        );
      case 'transactions':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
        );
      case 'budgeting':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        );
      case 'delegation':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        );
      case 'rewards':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
          </svg>
        );
      case 'settings':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop - transitions to a narrower version on medium screens */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col w-64 lg:w-72 bg-gray-800/40 backdrop-blur-md border-r border-gray-700/50 z-20 flex-shrink-0"
      >
        <div className="p-4 border-b border-gray-700/50 flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text">
              MetaFlux
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id || location.pathname === item.path
                    ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400'
                    : 'text-gray-300 hover:bg-gray-700/30'
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <span className="mr-3">{getIcon(item.icon)}</span>
                <span className="text-sm md:text-base">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-700/50">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-sm rounded-lg text-gray-300 hover:bg-gray-700/30 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Disconnect Wallet
          </button>
        </div>
      </motion.aside>

      {/* Mobile sidebar with improved animation and backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, type: "spring", damping: 30 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-gray-800/90 backdrop-blur-md z-40 md:hidden"
            >
              <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
                <Link to="/" className="flex items-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text">
                    MetaFlux
                  </span>
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id || location.pathname === item.path
                          ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400'
                          : 'text-gray-300 hover:bg-gray-700/30'
                      }`}
                      onClick={() => {
                        onTabChange(item.id);
                        setIsSidebarOpen(false);
                      }}
                    >
                      <span className="mr-3">{getIcon(item.icon)}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="p-4 border-t border-gray-700/50">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full px-4 py-2 text-sm rounded-lg text-gray-300 hover:bg-gray-700/30 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Disconnect Wallet
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto relative">
        {/* Header - responsive and has scroll effect */}
        <header 
          className={`sticky top-0 z-10 transition-all duration-300 ${
            isScrolled 
              ? 'bg-gray-800/80 backdrop-blur-md shadow-lg' 
              : 'bg-gray-800/40 backdrop-blur-md'
          } border-b border-gray-700/50`}
        >
          <div className="flex h-16 items-center justify-between px-3 sm:px-4 md:px-6">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-400 hover:text-white focus:outline-none p-1"
                onClick={() => setIsSidebarOpen(true)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo for mobile */}
              <div className="md:hidden ml-2">
                <Link to="/" className="flex items-center">
                  <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text">
                    MetaFlux
                  </span>
                </Link>
              </div>

              {/* Search bar - hidden on small screens */}
              <div className="hidden sm:flex ml-4 md:ml-0 relative">
                <div className="flex items-center bg-gray-700/30 rounded-lg px-3 py-2">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="ml-2 bg-transparent border-none outline-none focus:ring-0 text-white text-sm w-28 md:w-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right header elements */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Notifications dropdown */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsUserMenuOpen(false);
                  }}
                  className="text-gray-300 hover:text-white focus:outline-none relative p-1"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-[320px] max-w-[calc(100vw-2rem)] bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg z-50 border border-gray-700/50 overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700/50">
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-[60vh] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-3 text-center text-gray-400 text-sm">
                            No notifications
                          </div>
                        ) : (
                          <div>
                            {notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`px-4 py-3 border-b border-gray-700/50 hover:bg-gray-700/30 ${
                                  !notification.read ? 'bg-gray-700/20' : ''
                                }`}
                              >
                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-3">
                                    {notification.type === 'alert' && (
                                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                      </span>
                                    )}
                                    {notification.type === 'info' && (
                                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      </span>
                                    )}
                                    {notification.type === 'success' && (
                                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-sm text-white">{notification.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="px-4 py-2 border-t border-gray-700/50">
                        <button className="w-full text-center text-sm text-orange-400 hover:text-orange-300">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(!isUserMenuOpen);
                    setIsNotificationsOpen(false);
                  }}
                  className="flex items-center text-gray-300 hover:text-white focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-sm md:text-base">
                    A
                  </div>
                  <svg className="ml-1 h-4 w-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 max-w-[calc(100vw-2rem)] bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg z-50 border border-gray-700/50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-700/50">
                        <p className="text-sm text-white font-medium">Alex</p>
                        <p className="text-xs text-gray-400 mt-1">0x7a23...95b2</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/30 hover:text-white"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Your Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/30 hover:text-white"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/30 hover:text-white"
                        >
                          Disconnect Wallet
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-900/60 backdrop-blur-sm">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;