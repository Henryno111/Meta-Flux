import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg"
    >
      {/* Quote icon */}
      <div className="text-orange-500 mb-4">
        <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      
      {/* Quote text */}
      <blockquote className="text-gray-300 mb-6">
        "{testimonial.quote}"
      </blockquote>
      
      {/* Star rating */}
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg 
            key={i}
            className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-600'}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {/* User info */}
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 mr-4 flex items-center justify-center text-white font-bold overflow-hidden">
          {/* If we had a real image: <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" /> */}
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-white">{testimonial.name}</div>
          <div className="text-sm text-gray-400">{testimonial.position}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;