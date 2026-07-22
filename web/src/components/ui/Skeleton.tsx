interface SkeletonProps {
  className?: string
  style?: React.CSSProperties
}

export function Skeleton({ className = "", style }: SkeletonProps) {
  return (
    <div
      className={`bg-white/[0.04] animate-pulse ${className}`}
      style={{ borderRadius: "var(--radius-glass-sm)", ...style }}
      aria-hidden="true"
    />
  )
}

export function SkeletonLine({ width = "100%" }: { width?: string }) {
  return <Skeleton className="h-4" style={{ width }} />
}

export function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3 p-6 bg-white/[0.02] border border-white/[0.06]" style={{ borderRadius: "var(--radius-glass)" }}>
      <Skeleton className="h-6 w-1/3" />
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonLine key={i} width={`${Math.random() * 30 + 60}%`} />
        ))}
      </div>
    </div>
  )
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-1">
      <div className="flex gap-4 p-3 border-b border-white/[0.04]">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 p-3">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-3 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}
