import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { ExamplesNav } from "@/components/features/examples/examples-nav"
import { Container } from "@/components/layout/container"

// 예제 영역 레이아웃 — 메인 복귀 링크 + 좌측 목차 + 본문
export default function ExamplesLayout({ children }: LayoutProps<"/examples">) {
  return (
    <Container className="py-10">
      <Link
        href="/#features"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        메인으로
      </Link>
      <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <ExamplesNav />
        </aside>
        <div className="min-w-0 space-y-10">{children}</div>
      </div>
    </Container>
  )
}
