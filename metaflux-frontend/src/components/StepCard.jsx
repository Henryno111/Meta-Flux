import { motion } from 'framer-motion';

const StepCard = ({ step, index, theme = 'light' }) => {
  const isDark = theme === 'dark';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${
        isDark 
          ? 'bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm text-white' 
          : 'bg-white text-gray-800'
      } rounded-2xl shadow-md overflow-hidden relative`}
    >
      <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-semibold rounded-bl-2xl">
        {step.id}
      </div>
      <div className="p-6 pt-10">
        <div className="text-4xl mb-4">{step.icon}</div>
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {step.title}
        </h3>
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

export default StepCard;