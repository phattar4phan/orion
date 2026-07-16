import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-pure-black noise-bg">
      <Sidebar />
      <div className="pl-[240px] transition-[padding] duration-300">
        <TopBar />
        <main className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Background orbs */}
      <div
        className="glow-orb w-[600px] h-[600px] top-0 right-0"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
      />
      <div
        className="glow-orb w-[400px] h-[400px] bottom-0 left-[240px]"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
      />
    </div>
  );
}
