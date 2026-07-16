interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants: Record<string, string> = {
    default: 'bg-white/[0.06] text-white/60 border-white/[0.06]',
    success: 'bg-white/[0.08] text-white/80 border-white/[0.10]',
    warning: 'bg-white/[0.04] text-white/50 border-white/[0.06]',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-2xs font-medium rounded-full border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
