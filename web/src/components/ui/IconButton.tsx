import { motion, type HTMLMotionProps } from "framer-motion"
import { Tooltip } from "./Tooltip"

interface IconButtonProps extends HTMLMotionProps<"button"> {
  tooltip?: string
  active?: boolean
}

export function IconButton({ tooltip, active, className = "", children, ...props }: IconButtonProps) {
  const button = (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center justify-center h-9 w-9 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-colors duration-200 ${active ? "text-white bg-white/[0.08]" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )

  if (tooltip) {
    return <Tooltip content={tooltip}>{button}</Tooltip>
  }

  return button
}
