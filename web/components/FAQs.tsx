import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What kind of images can I upload?',
    answer: 'Orion accepts datasets of white blood cell images in JPG or PNG format, compressed in a single ZIP file.',
  },
  {
    question: 'Is Orion really free?',
    answer: 'Yes, Orion is completely free to use for academic and research purposes. There are no hidden costs or limitations.',
  },
  {
    question: 'How are the models pre-trained?',
    answer: 'The models are pre-trained on a large, diverse dataset of white blood cell images to ensure high accuracy.',
  },
  {
    question: 'Can I export the results?',
    answer: 'Yes, you can download a detailed report of the analysis, including performance metrics and visualizations for each model.',
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
          Frequently Asked Questions
        </motion.h2>
        <div className="mt-12 max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-800">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-6 w-6" />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-gray-400">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
