import { motion } from "framer-motion"

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
  count?: number
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, active, onChange, className = "" }: TabsProps) {
  return (
    <nav className={`flex gap-1 p-1 bg-white/[0.02] border border-white/[0.06] ${className}`} style={{ borderRadius: "var(--radius-glass-sm)" }} role="tablist">
      {tabs.map((tab) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            role="tab"
            aria-selected={isActive}
            className={`relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive ? "text-white" : "text-white/40 hover:text-white/70"}`}
          >
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 bg-white/10 border border-white/[0.08] rounded-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            {tab.icon && <span className="relative z-10 h-4 w-4">{tab.icon}</span>}
            <span className="relative z-10">{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`relative z-10 text-[11px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white/80" : "bg-white/5 text-white/30"}`}>
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}
