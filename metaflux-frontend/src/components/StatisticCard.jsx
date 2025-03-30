import { motion } from 'framer-motion';

const StatisticCard = ({ statistic, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-start justify-between">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
          className="h-14 w-14 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full flex items-center justify-center text-2xl mb-4"
        >
          {statistic.icon}
        </motion.div>
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      >
        <div className="text-3xl md:text-4xl font-bold text-white mb-1">{statistic.value}</div>
        <div className="text-gray-400">{statistic.label}</div>
      </motion.div>
    </motion.div>
  );
};

export default StatisticCard;