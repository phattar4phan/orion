import { motion } from 'framer-motion';
import { Zap, TestTube2, BarChart } from 'lucide-react';

const benefits = [
  {
    icon: <Zap className="h-10 w-10 text-white" />,
    title: 'Instant Results',
    description: 'Get immediate feedback on model performance without any setup or configuration.',
  },
  {
    icon: <TestTube2 className="h-10 w-10 text-white" />,
    title: 'Compare 5 Models',
    description: 'Test your data against five different CNN architectures to find the best fit.',
  },
  {
    icon: <BarChart className="h-10 w-10 text-white" />,
    title: 'Clear Visualizations',
    description: 'Understand the results with easy-to-read charts and performance metrics.',
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Why Use Orion?
        </motion.h2>
        <div className="mt-12 grid md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="inline-block p-4 bg-white bg-opacity-10 rounded-lg">
                {benefit.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
