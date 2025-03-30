import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/budgeting', label: 'Budget Control' },
    { path: '/rewards', label: 'Rewards Hub' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        scrolled ? 'bg-black/70 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <motion.span 
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            MetaFlux
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 text-white ${
                isActive(item.path) 
                  ? 'font-medium' 
                  : 'hover:bg-white/10'
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-6 px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z" 
                fill="currentColor"
              />
              <path 
                d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z" 
                fill="currentColor"
              />
            </svg>
            Connect Wallet
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.div
            animate={isMenuOpen ? "open" : "closed"}
            className="w-6 h-6 flex flex-col justify-center items-center"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 2 }
              }}
              className="w-6 h-0.5 bg-white mb-1.5 block transition-all duration-300"
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              className="w-6 h-0.5 bg-white mb-1.5 block transition-all duration-300"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -2 }
              }}
              className="w-6 h-0.5 bg-white block transition-all duration-300"
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile Navigation - Fancy Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed top-0 right-0 bottom-0 w-3/4 bg-gray-900 shadow-xl z-50 pt-20"
          >
        <div className="flex flex-col h-full px-6">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`py-4 px-4 rounded-lg ${
                  isActive(item.path)
                    ? 'bg-white/10 text-orange-400'
                    : 'text-white hover:bg-white/5'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto mb-8">
                          <button 
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg 
                className="w-4 h-4 mr-2" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z" 
                  fill="currentColor"
                />
                <path 
                  d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z" 
                  fill="currentColor"
                />
              </svg>
              Connect Wallet
            </button>
          </div>
        </div>
      </motion.div>
      )}
      
      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;