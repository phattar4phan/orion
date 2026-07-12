import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="absolute top-0 left-0 right-0 h-24 bg-black bg-opacity-20 backdrop-blur-lg" />
      <nav className="relative container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">Orion</div>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#benefits" className="text-white hover:text-gray-300">Benefits</a>
          <a href="#features" className="text-white hover:text-gray-300">Features</a>
          <a href="#testimonials" className="text-white hover:text-gray-300">Testimonials</a>
          <a href="#pricing" className="text-white hover:text-gray-300">Pricing</a>
        </div>
        <div className="hidden md:block">
          <button className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            Get Started
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden bg-black bg-opacity-50 backdrop-blur-lg"
        >
          <div className="flex flex-col items-center space-y-4 py-4">
            <a href="#benefits" className="text-white hover:text-gray-300" onClick={toggleMenu}>Benefits</a>
            <a href="#features" className="text-white hover:text-gray-300" onClick={toggleMenu}>Features</a>
            <a href="#testimonials" className="text-white hover:text-gray-300" onClick={toggleMenu}>Testimonials</a>
            <a href="#pricing" className="text-white hover:text-gray-300" onClick={toggleMenu}>Pricing</a>
            <button className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
