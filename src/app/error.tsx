"use client"

import { useEffect } from "react"
import { TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

// 런타임 에러 경계 — 하위 라우트에서 발생한 에러를 잡아 복구 버튼을 제공합니다.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // TODO: Sentry 등 에러 모니터링 도구로 전송하세요.
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TriangleAlert />
          </EmptyMedia>
          <EmptyTitle>문제가 발생했습니다</EmptyTitle>
          <EmptyDescription>
            일시적인 오류일 수 있습니다. 잠시 후 다시 시도해 주세요.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={reset}>다시 시도</Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
