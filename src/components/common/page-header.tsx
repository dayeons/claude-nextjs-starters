import { cn } from "@/lib/utils"

type PageHeaderProps = {
  title: string
  description?: string
  // 우측 액션 영역 (버튼 등)
  actions?: React.ReactNode
  className?: string
}

// 페이지 상단 제목 영역 — 모든 페이지에서 동일한 타이포그래피를 유지합니다.
export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="space-y-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
