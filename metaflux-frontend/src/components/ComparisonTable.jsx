import { motion } from 'framer-motion';

const ComparisonTable = () => {
  const features = [
    { name: 'Crypto Transaction Support', metaflux: true, traditional: false },
    { name: 'Automated Categorization', metaflux: true, traditional: true },
    { name: 'Budget Tracking', metaflux: true, traditional: true },
    { name: 'On-chain Verification', metaflux: true, traditional: false },
    { name: 'Secure Delegation', metaflux: true, traditional: false },
    { name: 'Rewards & Cashback', metaflux: true, traditional: false },
    { name: 'NFT Collectibles', metaflux: true, traditional: false },
    { name: 'Multi-Wallet Support', metaflux: true, traditional: false },
    { name: 'Real-time Updates', metaflux: true, traditional: true },
    { name: 'Decentralized Storage', metaflux: true, traditional: false },
  ];

  const CheckIcon = () => (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const XIcon = () => (
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-gray-800"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800/70">
              <th className="py-4 px-6 text-left text-gray-300 font-medium">Features</th>
              <th className="py-4 px-6 text-center text-white font-bold">
                <div className="flex items-center justify-center">
                  <div className="h-8 w-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white mr-2">M</div>
                  MetaFlux
                </div>
              </th>
              <th className="py-4 px-6 text-center text-gray-300 font-bold">
                <div className="flex items-center justify-center">
                  <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center text-white mr-2">T</div>
                  Traditional Solutions
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {features.map((feature, index) => (
              <motion.tr 
                key={feature.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={index % 2 === 0 ? 'bg-black/40' : 'bg-gray-900/40'}
              >
                <td className="py-4 px-6 text-left text-gray-300">{feature.name}</td>
                <td className="py-4 px-6 text-center">
                  {feature.metaflux ? <CheckIcon /> : <XIcon />}
                </td>
                <td className="py-4 px-6 text-center">
                  {feature.traditional ? <CheckIcon /> : <XIcon />}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ComparisonTable;