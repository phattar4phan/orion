import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5
        bg-charcoal border border-white/[0.06] rounded-lg text-xs text-white/70
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
        whitespace-nowrap z-50">
        {content}
      </div>
    </div>
  );
}
