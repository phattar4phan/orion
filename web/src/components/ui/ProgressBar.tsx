import { motion } from "framer-motion"

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const heights = { sm: "h-1", md: "h-1.5", lg: "h-2" }

export function ProgressBar({ value, max = 100, label, showPercentage = true, size = "md", className = "" }: ProgressBarProps) {
  const pct = Math.min(Math.round((value / max) * 100), 100)

  return (
    <div className={`space-y-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs font-medium text-white/50">{label}</span>}
          {showPercentage && <span className="text-xs text-white/40 tabular-nums">{pct}%</span>}
        </div>
      )}
      <div className={`w-full ${heights[size]} bg-white/[0.04] overflow-hidden`} style={{ borderRadius: 999 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-slate-blue"
          style={{ borderRadius: 999 }}
        />
      </div>
    </div>
  )
}
