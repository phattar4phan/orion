import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Example Dashboard
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
            <span className="text-gray-500">Example Dashboard Image</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

