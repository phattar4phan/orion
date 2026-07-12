const Footer = () => {
  return (
    <footer className="py-8 bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Orion. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
