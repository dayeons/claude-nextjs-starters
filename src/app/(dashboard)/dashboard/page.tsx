import type { Metadata } from "next"
import Link from "next/link"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

import { PageHeader } from "@/components/common/page-header"
import { RecentActivity } from "@/components/features/dashboard/recent-activity"
import { StatCard } from "@/components/features/dashboard/stat-card"
import { buttonVariants } from "@/components/ui/button"
import { formatCurrency, formatNumber } from "@/lib/format"
import { stats } from "@/lib/mock-data"

export const metadata: Metadata = { title: "대시보드" }

// 지표별 아이콘 매핑
const statIcons = {
  revenue: DollarSign,
  users: Users,
  orders: CreditCard,
  active: Activity,
}

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="대시보드"
        description="서비스 현황을 한눈에 확인하세요."
        actions={
          <Link href="/dashboard/users" className={buttonVariants()}>
            사용자 관리
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.key}
            title={stat.title}
            value={
              stat.key === "revenue"
                ? formatCurrency(stat.value)
                : formatNumber(stat.value)
            }
            change={stat.change}
            icon={statIcons[stat.key]}
          />
        ))}
      </div>
      <RecentActivity />
    </>
  )
}
