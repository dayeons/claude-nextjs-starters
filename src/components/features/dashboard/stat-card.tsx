import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type StatCardProps = {
  title: string
  value: string
  // 전월 대비 증감률(%)
  change: number
  icon?: LucideIcon
}

// 대시보드 핵심 지표 카드
export function StatCard({ title, value, change, icon: Icon }: StatCardProps) {
  const isPositive = change >= 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          {Icon && <Icon className="size-4" />}
          {title}
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant={isPositive ? "secondary" : "destructive"}>
            <TrendIcon />
            {isPositive ? "+" : ""}
            {change}%
          </Badge>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
