import type { Metadata } from "next"
import { UserPlus } from "lucide-react"

import { PageHeader } from "@/components/common/page-header"
import { UsersTable } from "@/components/features/users/users-table"
import { Button } from "@/components/ui/button"
import { users } from "@/lib/mock-data"

export const metadata: Metadata = { title: "사용자" }

// 서버 컴포넌트에서 데이터를 준비하고, 상호작용이 필요한 테이블만 클라이언트로 렌더링합니다.
export default function UsersPage() {
  return (
    <>
      <PageHeader
        title="사용자"
        description="서비스에 가입한 사용자 목록입니다."
        actions={
          <Button>
            <UserPlus data-icon="inline-start" />
            사용자 초대
          </Button>
        }
      />
      <UsersTable data={users} />
    </>
  )
}
