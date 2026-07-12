import { motion } from 'framer-motion';

const logos = [
  { name: 'Company A', logo: '/path/to/logoA.svg' },
  { name: 'Company B', logo: '/path/to/logoB.svg' },
  { name: 'Company C', logo: '/path/to/logoC.svg' },
  { name: 'Company D', logo: '/path/to/logoD.svg' },
  { name: 'Company E', logo: '/path/to/logoE.svg' },
];

const SocialProof = () => {
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-gray-400 uppercase tracking-widest"
        >
          Trusted by researchers at
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-x-12 gap-y-6"
        >
          {logos.map((logo, index) => (
            <div key={index} className="text-gray-500 font-semibold text-lg">{logo.name}</div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
