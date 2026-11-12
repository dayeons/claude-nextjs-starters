import { Skeleton } from "@/components/ui/skeleton"

// 대시보드 페이지 로딩 UI — 데이터 페칭 중 Skeleton으로 레이아웃을 미리 보여줍니다.
export default function DashboardLoading() {
  return (
    <>
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-80 rounded-xl" />
    </>
  )
}
