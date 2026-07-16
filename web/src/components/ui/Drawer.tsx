import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  children: ReactNode;
  width?: string;
}

export default function Drawer({ isOpen, onClose, side = 'right', children, width = 'w-96' }: DrawerProps) {
  const sideClasses = side === 'right' ? 'right-0' : 'left-0';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={`absolute top-0 bottom-0 ${sideClasses} ${width} bg-off-black border-l border-white/[0.06] p-6`}
            initial={{ x: side === 'right' ? 40 : -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: side === 'right' ? 40 : -40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
