import Link from "next/link"
import { FileQuestion } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

// 404 페이지 — 존재하지 않는 경로 접근 시 표시
export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestion />
          </EmptyMedia>
          <EmptyTitle>404 · 페이지를 찾을 수 없습니다</EmptyTitle>
          <EmptyDescription>
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/" className={buttonVariants()}>
            홈으로 돌아가기
          </Link>
        </EmptyContent>
      </Empty>
    </main>
  )
}
