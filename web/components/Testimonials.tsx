import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Orion saved us weeks of work. We were able to quickly identify the best model for our research without any of the usual setup hassle.",
    name: 'Dr. Jane Doe',
    title: 'Lead Researcher, University of Science',
  },
  {
    quote: "An essential tool for any team working with medical imaging. The ability to compare models so easily is a game-changer.",
    name: 'Dr. John Smith',
    title: 'Head of AI, MedTech Inc.',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          What Researchers Are Saying
        </motion.h2>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 bg-white bg-opacity-5 rounded-lg"
            >
              <p className="text-lg text-gray-300">"{testimonial.quote}"</p>
              <div className="mt-4 text-right">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
