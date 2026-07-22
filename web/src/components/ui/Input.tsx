import { forwardRef, type InputHTMLAttributes } from "react"
import { Search, X } from "lucide-react"
import { motion } from "framer-motion"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-xs font-medium text-white/50">{label}</label>
        )}
        <input
          ref={ref}
          className={`w-full h-10 px-3.5 bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/20 rounded-xl outline-none transition-colors duration-200 focus:border-white/20 focus:bg-white/[0.05] disabled:opacity-40 disabled:cursor-not-allowed ${error ? "border-red-500/40 focus:border-red-500/60" : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

interface SearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
}

export function SearchField({ value, onChange, onClear, className = "", ...props }: SearchFieldProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
      <input
        value={value}
        onChange={onChange}
        className={`w-full h-10 pl-10 pr-8 bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/20 rounded-xl outline-none transition-colors duration-200 focus:border-white/20 focus:bg-white/[0.05] ${className}`}
        {...props}
      />
      {value && onClear && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-white/30 hover:text-white/60 hover:bg-white/10"
        >
          <X className="h-3 w-3" />
        </motion.button>
      )}
    </div>
  )
}
