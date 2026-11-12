import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/lib/format"
import { recentActivities } from "@/lib/mock-data"

// 최근 활동 목록 — 정렬/검색이 필요 없는 단순 표는 shadcn Table을 직접 사용합니다.
export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 활동</CardTitle>
        <CardDescription>최근 5건의 사용자 활동입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>사용자</TableHead>
              <TableHead>활동</TableHead>
              <TableHead className="hidden sm:table-cell">일자</TableHead>
              <TableHead className="text-right">금액</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback>{activity.user.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div className="grid">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-xs text-muted-foreground">
                        {activity.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {formatDate(activity.date)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {activity.amount ? formatCurrency(activity.amount) : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
