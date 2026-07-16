import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export default function IconButton({ icon: Icon, label, onClick, active, className = '' }: IconButtonProps) {
  return (
    <motion.button
      className={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200
        ${active ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'}
        ${className}`}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      title={label}
    >
      <Icon size={18} strokeWidth={1.5} />
    </motion.button>
  );
}
