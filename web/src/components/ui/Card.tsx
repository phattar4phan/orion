import { motion, type HTMLMotionProps } from "framer-motion"

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  hover?: boolean
  padding?: "none" | "sm" | "md" | "lg"
}

const paddingClasses = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
}

export function Card({ children, hover = false, padding = "md", className = "", ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.15 }}
      className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] shadow-glass-sm hover:border-slate-blue/20 hover:shadow-[0_0_28px_4px_rgba(149,167,176,0.08)] focus-within:border-slate-blue/20 focus-within:shadow-[0_0_28px_4px_rgba(149,167,176,0.08)] transition-all duration-200 ${paddingClasses[padding]} ${className}`}
      style={{ borderRadius: "var(--radius-glass)" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
