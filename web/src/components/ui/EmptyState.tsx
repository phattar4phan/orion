import type { ReactNode } from "react"

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <div className="mb-4 p-3 bg-white/[0.03] border border-white/[0.06] text-white/30" style={{ borderRadius: "var(--radius-glass-sm)" }}>
          {icon}
        </div>
      )}
      <h3 className="text-sm font-medium text-white/60">{title}</h3>
      {description && <p className="mt-1.5 text-xs text-white/30 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
