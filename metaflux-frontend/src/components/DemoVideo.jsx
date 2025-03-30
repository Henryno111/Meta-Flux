import { useState } from 'react';
import { motion } from 'framer-motion';

const DemoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlay = () => {
    setIsPlaying(true);
    // In a real implementation, this would trigger the actual video play
  };
  
  return (
    <div className="aspect-video bg-black relative rounded-xl overflow-hidden">
      {/* Placeholder image that would be replaced with actual video */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
        {/* Dashboard mockup elements */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gray-800 flex items-center px-4">
          <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
          <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
          <div className="h-6 w-40 bg-gray-700 rounded"></div>
          <div className="ml-auto flex space-x-2">
            <div className="h-6 w-6 bg-gray-700 rounded"></div>
            <div className="h-6 w-6 bg-gray-700 rounded"></div>
            <div className="h-6 w-6 bg-gray-700 rounded"></div>
          </div>
        </div>
        
        <div className="absolute top-12 left-0 bottom-0 w-48 bg-gray-800">
          <div className="p-4 space-y-2">
            <div className="h-8 w-full bg-gray-700 rounded"></div>
            <div className="h-8 w-full bg-orange-500/30 rounded"></div>
            <div className="h-8 w-full bg-gray-700 rounded"></div>
            <div className="h-8 w-full bg-gray-700 rounded"></div>
          </div>
        </div>
        
        <div className="absolute top-12 left-48 right-0 bottom-0 p-4">
          <div className="p-4 bg-gray-800 rounded-lg h-40">
            <div className="flex justify-between mb-2">
              <div className="h-5 w-32 bg-gray-700 rounded"></div>
              <div className="h-5 w-20 bg-gray-700 rounded"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-24 bg-blue-500/20 rounded"></div>
              <div className="h-24 bg-orange-500/20 rounded"></div>
              <div className="h-24 bg-green-500/20 rounded"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-gray-800 rounded-lg h-32">
              <div className="h-5 w-32 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-700 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-700 rounded mb-2"></div>
              <div className="h-3 w-3/4 bg-gray-700 rounded"></div>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg h-32">
              <div className="h-5 w-32 bg-gray-700 rounded mb-4"></div>
              <div className="flex justify-between">
                <div className="h-16 w-16 bg-amber-500/20 rounded-lg"></div>
                <div className="h-16 w-16 bg-amber-500/20 rounded-lg"></div>
                <div className="h-16 w-16 bg-amber-500/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Play button overlay */}
      {!isPlaying && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            onClick={handlePlay}
            className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default DemoVideo;