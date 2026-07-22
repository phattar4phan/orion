interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "error"
  className?: string
}

const variantClasses = {
  default: "bg-white/10 text-white/70 ring-white/10",
  success: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  error: "bg-red-500/10 text-red-400 ring-red-500/20",
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
