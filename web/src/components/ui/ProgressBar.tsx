import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

export default function ProgressBar({ value, label, className = '' }: ProgressBarProps) {
  return (
    <div className={`${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/50">{label}</span>
          <span className="text-xs text-white/40 font-mono">{Math.round(value)}%</span>
        </div>
      )}
      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white/30 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
