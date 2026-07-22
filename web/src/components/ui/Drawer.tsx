import { useEffect, useRef, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  side?: "left" | "right"
  size?: "sm" | "md" | "lg"
}

const sideClasses = {
  left: "left-0 border-r border-white/[0.06]",
  right: "right-0 border-l border-white/[0.06]",
}

const sizeClasses = {
  sm: "w-72",
  md: "w-80",
  lg: "w-96",
}

export function Drawer({ open, onClose, title, children, side = "right", size = "md" }: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            ref={ref}
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`absolute top-0 bottom-0 ${sideClasses[side]} ${sizeClasses[size]} bg-black/95 backdrop-blur-2xl p-6 flex flex-col`}
            role="dialog"
            aria-modal="true"
            aria-label={title ?? "Drawer"}
          >
            {title && (
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
