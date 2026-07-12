import { motion } from 'framer-motion';

const technologies = [
  'PyTorch',
  'tqdm',
  'rich',
  'Python',
  'CUDA',
  'Kaggle',
];

const TechStack = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Built With
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-4"
        >
          {technologies.map((tech, index) => (
            <div key={index} className="text-gray-400 font-semibold text-lg">{tech}</div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
