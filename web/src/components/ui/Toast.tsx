import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type = 'info', isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const icons = {
    success: <CheckCircle size={16} className="text-white/80" />,
    error: <XCircle size={16} className="text-white/80" />,
    warning: <AlertCircle size={16} className="text-white/80" />,
    info: <Info size={16} className="text-white/80" />,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 glass shadow-glass-lg px-4 py-3"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        >
          {icons[type]}
          <span className="text-sm text-white/70">{message}</span>
          <button onClick={onClose} className="text-white/30 hover:text-white/60 ml-2">
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
