import { useState, useCallback, createContext, useContext, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react"

type ToastType = "success" | "error" | "warning" | "info"

interface Toast {
  id: string
  type: ToastType
  message: string
}

interface ToastContextValue {
  toast: (type: ToastType, message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}

const icons: Record<ToastType, ReactNode> = {
  success: <CheckCircle className="h-4 w-4 text-emerald-400" />,
  error: <XCircle className="h-4 w-4 text-red-400" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-400" />,
  info: <Info className="h-4 w-4 text-white/60" />,
}

const bgClasses: Record<ToastType, string> = {
  success: "border-emerald-500/20",
  error: "border-red-500/20",
  warning: "border-amber-500/20",
  info: "border-white/10",
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { id, type, message }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              className={`flex items-center gap-2.5 bg-black/90 backdrop-blur-xl border border-white/[0.08] ${bgClasses[t.type]} px-3.5 py-2.5 shadow-glass-sm`}
              style={{ borderRadius: "var(--radius-glass-sm)" }}
              role="alert"
            >
              {icons[t.type]}
              <span className="text-sm text-white/80 flex-1">{t.message}</span>
              <button
                onClick={() => removeToast(t.id)}
                className="p-0.5 rounded text-white/30 hover:text-white/60 transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
