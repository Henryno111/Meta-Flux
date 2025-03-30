import { motion } from 'framer-motion';

const FeatureCard = ({ feature, index, theme = 'light' }) => {
  const isDark = theme === 'dark';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className={`${
        isDark 
          ? 'bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm text-white' 
          : 'bg-white text-gray-800'
      } rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300`}
    >
      <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
      <div className="p-6">
        <div className="text-4xl mb-4">{feature.icon}</div>
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {feature.title}
        </h3>
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;