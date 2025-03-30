import { motion } from 'framer-motion';

const IntegrationLogo = ({ integration, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 flex items-center justify-center h-24"
    >
      {/* In a real implementation, we would use the actual logo */}
      {/* <img src={integration.logo} alt={integration.name} className="max-h-12" /> */}
      
      {/* Placeholder for demo purposes */}
      <div className="text-center">
        <div className="h-10 w-10 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-md mx-auto mb-2 flex items-center justify-center text-lg">
          {integration.name.charAt(0)}
        </div>
        <div className="text-sm text-gray-300">{integration.name}</div>
      </div>
    </motion.div>
  );
};

export default IntegrationLogo;