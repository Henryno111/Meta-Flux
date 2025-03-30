import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BackgroundAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full -z-10 overflow-hidden">
      {/* Dark gradient background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-[#0D1117]"></div>
      
      {/* Hex pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('/hex-pattern.svg')] bg-repeat"></div>
      
      {/* Animated colorful blobs */}
      <div className="absolute inset-0">
        {/* Orange/Red Metamask-inspired shape */}
        <motion.div
          className="absolute top-[15%] left-[15%] h-96 w-96 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 80, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        
        {/* Blue/Purple blob */}
        <motion.div
          className="absolute top-[30%] right-[20%] h-[30rem] w-[30rem] rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -100, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        
        {/* Cyan/Teal blob */}
        <motion.div
          className="absolute bottom-[10%] left-[25%] h-80 w-80 rounded-full bg-gradient-to-r from-cyan-400/30 to-teal-400/30 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 120, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        
        {/* Green/Yellow blob */}
        <motion.div
          className="absolute top-[60%] left-[50%] h-[24rem] w-[24rem] rounded-full bg-gradient-to-r from-green-500/20 to-yellow-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -70, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>
      
      {/* Metamask-inspired floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Fox-shaped elements (simplified) */}
        <motion.div 
          className="absolute w-20 h-20 bg-orange-500/20 rounded-tr-3xl rounded-bl-3xl"
          style={{ 
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)'
          }}
          animate={{
            x: [0, window.innerWidth],
            y: [0, window.innerHeight],
            rotate: [0, 360],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            repeatType: 'loop',
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute w-16 h-16 bg-white/10 rounded-full"
          initial={{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 }}
          animate={{
            x: [window.innerWidth * 0.2, window.innerWidth * 0.8, window.innerWidth * 0.2],
            y: [window.innerHeight * 0.3, window.innerHeight * 0.7, window.innerHeight * 0.3],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'loop',
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute w-24 h-24 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-tr-xl rounded-bl-xl"
          style={{ 
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
          }}
          initial={{ x: window.innerWidth * 0.7, y: window.innerHeight * 0.6 }}
          animate={{
            x: [window.innerWidth * 0.7, window.innerWidth * 0.3, window.innerWidth * 0.7],
            y: [window.innerHeight * 0.6, window.innerHeight * 0.2, window.innerHeight * 0.6],
            rotate: [0, 180, 360],
            opacity: [0.6, 0.4, 0.6]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            repeatType: 'loop',
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Subtle flowing lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7e5f" />
            <stop offset="100%" stopColor="#feb47b" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4facfe" />
            <stop offset="100%" stopColor="#00f2fe" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 V0 H0 V100 Z"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="3"
          initial={{ y: 0 }}
          animate={{ y: [0, -50, 0] }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: 'loop',
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M0,300 C150,200 350,400 500,300 C650,200 850,400 1000,300 V500 H0 V300 Z"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="3"
          initial={{ y: 0 }}
          animate={{ y: [0, 50, 0] }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: 'loop',
            ease: "easeInOut"
          }}
        />
      </svg>
      
      {/* Interactive mouse follower */}
      <motion.div
        className="hidden lg:block absolute w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl pointer-events-none"
        style={{
          x: mousePosition.x - 80,
          y: mousePosition.y - 80,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 150,
          duration: 0.3,
        }}
      />
      
      {/* Star/crypto particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            y: [null, window.innerHeight + 10],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundAnimation;