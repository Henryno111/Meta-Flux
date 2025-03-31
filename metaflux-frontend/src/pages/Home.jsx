import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import FeatureCard from '../components/FeatureCard';
import StepCard from '../components/StepCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundAnimation from '../components/BackgroundAnimation';
import TestimonialCard from '../components/TestimonialCard';
import StatisticCard from '../components/StatisticCard';
import ComparisonTable from '../components/ComparisonTable';
import DemoVideo from '../components/DemoVideo';
import SecurityFeature from '../components/SecurityFeature';
import FAQItem from '../components/FAQItem';
import IntegrationLogo from '../components/IntegrationLogo';

const Home = () => {
  const navigate = useNavigate();
  const { isPending, isConnected, connect } = useWallet();
  const rewardsRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const connectWallet = async () => {
    if (!isConnected) {
      try {
        await connect();
        // Only navigate if connection was successful
        // In a real app, you might want to check isConnected again after connect()
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      // If already connected, just navigate
      navigate('/dashboard');
    }
  };

  const scrollToRewards = () => {
    rewardsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      id: 1,
      title: 'Expense Tracking',
      description: 'Track and categorize all your crypto transactions in one place',
      icon: '📊',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Budgeting',
      description: 'Set spending limits and receive alerts when approaching thresholds',
      icon: '🎯',
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      title: 'Delegation',
      description: 'Assign spending power to team members with customizable limits',
      icon: '👥',
      color: 'from-orange-500 to-pink-600'
    },
    {
      id: 4,
      title: 'Rewards System',
      description: 'Earn NFTs and cashback for responsible financial management',
      icon: '🎁',
      color: 'from-yellow-400 to-red-500'
    }
  ];

  const steps = [
    {
      id: 1,
      title: 'Connect Metamask Wallet',
      description: 'Securely link your wallet to start tracking expenses',
      icon: '🦊'
    },
    {
      id: 2,
      title: 'Track & Categorize Transactions',
      description: 'Automatically organize your spending into categories',
      icon: '🔍'
    },
    {
      id: 3,
      title: 'Set Budgets & Delegation',
      description: 'Create spending limits for yourself and team members',
      icon: '💰'
    },
    {
      id: 4,
      title: 'Earn Rewards',
      description: 'Get NFT badges and cashback for smart financial habits',
      icon: '🏆'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "CFO at BlockTech",
      image: "/images/testimonial1.jpg",
      quote: "MetaFlux has revolutionized how our company manages expenses. The delegation feature has saved us countless hours of approvals while maintaining control.",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Johnson",
      position: "Solo Entrepreneur",
      image: "/images/testimonial2.jpg",
      quote: "As someone who juggles multiple crypto income streams, having all my expenses tracked automatically has been a game-changer for my tax reporting.",
      rating: 5
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      position: "Community Lead at DeFi Alliance",
      image: "/images/testimonial3.jpg",
      quote: "The rewards system actually makes expense management fun! I've earned enough cashback to cover my subscription for the year.",
      rating: 4
    }
  ];

  const statistics = [
    {
      value: "$240M+",
      label: "Transaction Volume Managed",
      icon: "💰",
    },
    {
      value: "65K+",
      label: "Active Users",
      icon: "👥",
    },
    {
      value: "92%",
      label: "Budget Adherence Rate",
      icon: "📈",
    },
    {
      value: "$1.2M",
      label: "Rewards Distributed",
      icon: "🎁",
    }
  ];

  const securityFeatures = [
    {
      title: "Multi-signature Authentication",
      description: "Enterprise-grade security requiring multiple approvals for large transactions",
      icon: "🔐"
    },
    {
      title: "Verax Identity Verification",
      description: "Optional KYC verification for team members with delegation privileges",
      icon: "🛡️"
    },
    {
      title: "Transparent On-chain Records",
      description: "All transactions are recorded on Linea for immutable audit trails",
      icon: "📝"
    },
    {
      title: "Controlled Delegation Limits",
      description: "Set spending caps and expiration dates for delegated permissions",
      icon: "⏱️"
    }
  ];

  const integrations = [
    { name: "Metamask", logo: "/logos/metamask.svg" },
    { name: "Linea", logo: "/logos/linea.svg" },
    { name: "Verax", logo: "/logos/verax.svg" },
    { name: "OpenZeppelin", logo: "/logos/openzeppelin.svg" },
    { name: "QuickBooks", logo: "/logos/quickbooks.svg" },
    { name: "Xero", logo: "/logos/xero.svg" }
  ];

  const faqs = [
    {
      question: "How does MetaFlux integrate with my existing accounting software?",
      answer: "MetaFlux offers API integrations with popular accounting software like QuickBooks and Xero. You can export transaction data in CSV or JSON formats for seamless import into other systems."
    },
    {
      question: "What blockchain networks does MetaFlux support?",
      answer: "Currently, MetaFlux is built on Linea for optimal performance and low gas fees. We plan to expand to additional EVM-compatible chains in the near future based on community demand."
    },
    {
      question: "How are rewards calculated and distributed?",
      answer: "Rewards are earned through responsible financial behaviors like staying within budget, regular expense tracking, and using delegation features. Cashback is calculated as a percentage of your transaction volume and distributed monthly as ERC-20 tokens."
    },
    {
      question: "Can I use MetaFlux for both personal and business expenses?",
      answer: "Absolutely! MetaFlux offers different account types for individual users and businesses. Business accounts include additional features like hierarchical delegation, departmental budgeting, and advanced reporting."
    },
    {
      question: "Is my financial data secure and private?",
      answer: "Yes, MetaFlux is designed with privacy at its core. While transaction data is stored on-chain for verification, sensitive details are encrypted. You always maintain control over what information is shared and with whom."
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden text-white">
      <BackgroundAnimation />
      <Navbar />
      
      {/* Floating scroll indicator */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md cursor-pointer hover:bg-white/20 transition-colors"
        style={{ opacity }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
      
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 pt-28 pb-32 md:pt-40 md:pb-40 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            Manage your crypto expenses with ease!
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            A decentralized platform for tracking expenses, setting budgets, and delegating spending while earning rewards.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={connectWallet}
              disabled={isPending}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z" fill="currentColor"/>
                    <path d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z" fill="currentColor"/>
                  </svg>
                  <span>{isConnected ? 'Dashboard' : 'Connect Wallet'}</span>
                </>
              )}
            </motion.button>
            <motion.button
              onClick={scrollToRewards}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 bg-transparent border border-gray-400 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center"
            >
              <span>Learn More</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-black/60 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Powerful Features</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Everything you need to manage your crypto finances in one place</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={feature.id}
                feature={feature}
                index={index}
                theme="dark"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Demo/Showcase Section */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-black/80 to-gray-900/80 backdrop-blur-md overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">See MetaFlux <br />in Action</h2>
              <p className="text-gray-300 mb-8">
                Watch how easily you can track expenses, set budgets, and delegate spending power to team members—all while earning rewards for responsible financial management.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Automated transaction categorization",
                  "Real-time budget monitoring",
                  "Secure delegation controls",
                  "NFT rewards for financial milestones"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-orange-500 mr-2">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center">
                <span>Watch Full Demo</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                <DemoVideo />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Get started with MetaFlux in four simple steps</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <StepCard 
                key={step.id}
                step={step}
                index={index}
                theme="dark"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-10 py-20 bg-black/60 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <StatisticCard key={index} statistic={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Rewards System Highlight Section */}
      <section ref={rewardsRef} className="relative z-10 py-20 bg-gradient-to-b from-black/80 to-gray-900/80 backdrop-blur-md overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Earn Rewards for Smart Financial Management</h2>
              <p className="text-gray-300 mb-8">
                MetaFlux turns expense tracking from a chore into a rewarding experience. Earn NFT badges and cashback rewards just for managing your finances responsibly.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-2xl mr-4">
                    🏆
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Exclusive NFT Badges</h3>
                    <p className="text-gray-300">Collect unique NFTs for achieving financial goals and milestones that showcase your financial prowess.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-2xl mr-4">
                    💰
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Cashback Rewards</h3>
                    <p className="text-gray-300">Earn up to 3% cashback on all transactions when you stay within your budget goals.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-2xl mr-4">
                    🌟
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Tiered Benefits</h3>
                    <p className="text-gray-300">Unlock premium features and higher rewards as you level up your financial management skills.</p>
                  </div>
                </div>
              </div>
              
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                Explore Rewards Program
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative lg:order-1"
            >
              <div className="relative bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 rounded-lg text-sm font-medium">
                  Rewards Dashboard
                </div>
                
                <h4 className="text-xl font-semibold text-white mb-4">Your Rewards Progress</h4>
                
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Monthly Goal Progress</span>
                    <span className="text-sm font-semibold text-orange-400">78%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '78%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                    ></motion.div>
                  </div>
                </div>
                
                {/* NFT Badges Display */}
                <div className="mb-8">
                  <h5 className="text-sm font-semibold text-gray-300 mb-3">Earned Badges</h5>
                  <div className="flex space-x-4">
                    {['🔍', '💼', '🛡️'].map((emoji, i) => (
                      <motion.div 
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="w-14 h-14 rounded-lg bg-gray-700/70 flex items-center justify-center text-2xl"
                      >
                        {emoji}
                      </motion.div>
                    ))}
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="w-14 h-14 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
                
                {/* Cashback Stats */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-sm font-semibold text-gray-300">Cashback Earned</h5>
                    <span className="text-sm text-gray-400">This Month</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">$42.75</div>
                  <div className="text-sm text-green-500 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    12% from last month
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-orange-500"></div>
                <div className="absolute top-1/4 -right-3 w-6 h-6 rounded-full bg-purple-500"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Features Section */}
      <section className="relative z-10 py-20 bg-black/60 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Enterprise-Grade Security</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Your financial data is protected with the highest security standards</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => (
              <SecurityFeature 
                key={index}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Users Say</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Join thousands of satisfied users who've transformed their financial management</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{testimonials.map((testimonial, index) => (
  <TestimonialCard 
    key={testimonial.id}
    testimonial={testimonial}
    index={index}
  />
))}
</div>
</div>
</section>

{/* Integrations Section */}
<section className="relative z-10 py-20 bg-black/60 backdrop-blur-md">
<div className="container mx-auto px-4">
<motion.div 
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: 0.5 }}
className="text-center mb-16"
>
<h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Seamless Integrations</h2>
<p className="text-gray-300 max-w-2xl mx-auto">Connect with your favorite tools and services</p>
</motion.div>

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
{integrations.map((integration, index) => (
  <IntegrationLogo 
    key={index}
    integration={integration}
    index={index}
  />
))}
</div>
</div>
</section>

{/* Comparison Table Section */}
<section className="relative z-10 py-20 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-md">
<div className="container mx-auto px-4">
<motion.div 
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: 0.5 }}
className="text-center mb-16"
>
<h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose MetaFlux</h2>
<p className="text-gray-300 max-w-2xl mx-auto">See how we compare to traditional expense management solutions</p>
</motion.div>

<ComparisonTable />
</div>
</section>

{/* FAQ Section */}
<section className="relative z-10 py-20 bg-black/60 backdrop-blur-md">
<div className="container mx-auto px-4">
<motion.div 
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: 0.5 }}
className="text-center mb-16"
>
<h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
<p className="text-gray-300 max-w-2xl mx-auto">Everything you need to know about MetaFlux</p>
</motion.div>

<div className="max-w-3xl mx-auto divide-y divide-gray-800">
{faqs.map((faq, index) => (
  <FAQItem 
    key={index}
    faq={faq}
    index={index}
  />
))}
</div>
</div>
</section>

{/* CTA Section */}
<section className="relative z-10 py-20 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-md overflow-hidden">
<div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
<div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

<div className="container mx-auto px-4 max-w-5xl">
<motion.div 
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800/50 rounded-3xl overflow-hidden shadow-2xl"
>
<div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
  <div className="p-8 md:p-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Transform Your Expense Management?</h2>
    <p className="text-gray-300 mb-8">
      Join thousands of individuals and businesses who trust MetaFlux for their crypto expense tracking, budgeting, and rewards.
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <motion.button
        onClick={connectWallet}
        disabled={isPending}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      >
        {isPending ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z" fill="currentColor"/>
              <path d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z" fill="currentColor"/>
            </svg>
            <span>{isConnected ? 'Get Started Free' : 'Connect Wallet'}</span>
          </>
        )}
      </motion.button>
      <button className="px-6 py-4 bg-transparent border border-gray-600 text-white font-medium rounded-xl hover:bg-white/5 transition-colors">
        Schedule a Demo
      </button>
    </div>
    <p className="text-gray-400 text-sm mt-6">No credit card required. Free plan available.</p>
  </div>
  <div className="hidden lg:block relative bg-gradient-to-br from-orange-500/20 to-amber-500/20">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="w-64 h-64 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-6 transform"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="text-white font-semibold">Dashboard Preview</div>
            <div className="text-orange-400 text-sm">Pro Plan</div>
          </div>
          <div className="space-y-4">
            <div className="h-3 bg-white/10 rounded-full w-full"></div>
            <div className="h-3 bg-white/10 rounded-full w-3/4"></div>
            <div className="flex gap-2 mt-8">
              <div className="h-10 w-10 rounded-lg bg-white/10"></div>
              <div className="h-10 w-10 rounded-lg bg-white/10"></div>
              <div className="h-10 w-10 rounded-lg bg-white/10"></div>
            </div>
            <div className="mt-4 h-24 bg-white/10 rounded-lg"></div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, rotate: 10, x: 40, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 5, x: 60, y: -40 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-0 left-0 w-48 h-48 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-4"
        >
          <div className="text-white/80 text-sm font-medium mb-3">Rewards</div>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold text-white">+2.5%</div>
            <div className="text-green-400 text-xs">↑ 12%</div>
          </div>
          <div className="mt-4 h-20 bg-white/10 rounded-lg"></div>
        </motion.div>
      </div>
    </div>
  </div>
</div>
</motion.div>
</div>
</section>

<Footer />
</div>
);
};

export default Home;