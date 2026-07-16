import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'glass', size = 'md', loading, children, className = '', ...props }, ref) => {
    const base =
      'relative inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none';

    const variants: Record<string, string> = {
      primary: 'bg-white text-black hover:bg-white/90',
      glass: 'glass text-white/90 hover:bg-white/[0.06] hover:text-white hover:border-white/[0.10]',
      ghost: 'text-white/50 hover:bg-white/[0.05] hover:text-white/80',
    };

    const sizes: Record<string, string> = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-6 py-3 text-sm',
    };

    return (
      <motion.button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        whileTap={{ scale: 0.98 }}
        {...(props as any)}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
