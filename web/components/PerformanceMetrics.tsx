import { motion } from 'framer-motion';

const metrics = [
  {
    name: 'Accuracy',
    description: 'The proportion of true results (both true positives and true negatives) among the total number of cases examined.',
  },
  {
    name: 'Precision',
    description: 'The proportion of true positives among all positive results.',
  },
  {
    name: 'Recall',
    description: 'The proportion of true positives among all actual positives.',
  },
];

const PerformanceMetrics = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Understanding the Metrics
        </motion.h2>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 bg-white bg-opacity-5 rounded-2xl"
            >
              <h3 className="text-xl font-bold">{metric.name}</h3>
              <p className="mt-2 text-gray-400">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceMetrics;
