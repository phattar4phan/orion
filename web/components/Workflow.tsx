import { motion } from 'framer-motion';
import { Upload, TestTube, FileText } from 'lucide-react';

const steps = [
  {
    icon: <Upload className="h-12 w-12 text-white" />,
    title: '1. Upload Dataset',
    description: 'Start by uploading your white blood cell image dataset in a zip file.',
  },
  {
    icon: <TestTube className="h-12 w-12 text-white" />,
    title: '2. Run Analysis',
    description: 'Orion will automatically process your images and run them through the five pre-trained CNN models.',
  },
  {
    icon: <FileText className="h-12 w-12 text-white" />,
    title: '3. Get Results',
    description: 'Receive a detailed report comparing the performance of each model on your dataset.',
  },
];

const Workflow = () => {
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
          How It Works
        </motion.h2>
        <div className="mt-12 grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="inline-block p-4 bg-white bg-opacity-10 rounded-full">
                {step.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
