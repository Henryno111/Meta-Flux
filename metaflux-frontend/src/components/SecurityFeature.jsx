import { motion } from 'framer-motion';

const SecurityFeature = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg flex items-start"
    >
      <div className="mr-5 flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center text-2xl">
          {feature.icon}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
        <p className="text-gray-300">{feature.description}</p>
      </div>
    </motion.div>
  );
};

export default SecurityFeature;