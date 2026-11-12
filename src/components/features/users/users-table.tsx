"use client"

import { MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
import { useCopyToClipboard } from "usehooks-ts"

import {
  DataTable,
  SortableHeader,
  type DataTableColumnDef,
} from "@/components/common/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate } from "@/lib/format"
import type { User, UserRole, UserStatus } from "@/lib/mock-data"

const roleLabels: Record<UserRole, string> = {
  admin: "관리자",
  member: "멤버",
  viewer: "뷰어",
}

const statusConfig: Record<
  UserStatus,
  { label: string; variant: "default" | "secondary" | "destructive" }
> = {
  active: { label: "활성", variant: "default" },
  invited: { label: "초대됨", variant: "secondary" },
  suspended: { label: "정지", variant: "destructive" },
}

// 사용자 테이블 컬럼 정의 — 셀 렌더 함수가 있으므로 클라이언트 모듈에 둡니다.
const columns: DataTableColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="이름" />,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: "이메일",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => <SortableHeader column={column} title="권한" />,
    cell: ({ row }) => roleLabels[row.original.role],
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const { label, variant } = statusConfig[row.original.status]
      return <Badge variant={variant}>{label}</Badge>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableHeader column={column} title="가입일" />,
    cell: ({ row }) => formatDate(row.original.createdAt, "yyyy.MM.dd"),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">작업</span>,
    cell: ({ row }) => <UserActions user={row.original} />,
  },
]

// 행별 작업 메뉴 — 클립보드 복사는 usehooks-ts의 useCopyToClipboard 사용
function UserActions({ user }: { user: User }) {
  const [, copy] = useCopyToClipboard()

  async function handleCopy() {
    const ok = await copy(user.id)
    if (ok) toast.success("사용자 ID를 복사했습니다.")
    else toast.error("복사에 실패했습니다.")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" aria-label="작업 메뉴" />}
      >
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopy}>ID 복사</DropdownMenuItem>
        <DropdownMenuItem>상세 보기</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">삭제</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// 사용자 목록 테이블 (서버 컴포넌트 페이지에서 data만 전달)
export function UsersTable({ data }: { data: User[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="이름 또는 이메일 검색..."
    />
  )
}
