import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  Cpu,
  Play,
  BarChart3,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/upload', icon: Upload, label: 'Upload' },
  { path: '/models', icon: Cpu, label: 'Models' },
  { path: '/analysis', icon: Play, label: 'Analysis' },
  { path: '/results', icon: BarChart3, label: 'Results' },
  { path: '/history', icon: History, label: 'History' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-white/[0.06] bg-off-black/50 backdrop-blur-xl"
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-white/[0.04]">
        <motion.div
          className="flex items-center gap-3 overflow-hidden"
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white">
            <Sparkles size={16} className="text-black" strokeWidth={1.5} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="text-sm font-semibold text-white whitespace-nowrap"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
              >
                Orion
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink key={item.path} to={item.path}>
              <motion.div
                className={`relative flex items-center gap-3 px-3 h-10 rounded-lg transition-colors duration-200 overflow-hidden
                  ${isActive ? 'text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'}`}
                whileTap={{ scale: 0.97 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-white/[0.06] rounded-lg"
                    layoutId="sidebar-active"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                <item.icon size={18} strokeWidth={1.5} className="relative z-10 flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      className="text-sm font-medium whitespace-nowrap relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-4 border-t border-white/[0.04]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full h-9 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </motion.aside>
  );
}
