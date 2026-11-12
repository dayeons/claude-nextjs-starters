import Link from "next/link"
import {
  ArrowRight,
  Blocks,
  FormInput,
  LayoutDashboard,
  Moon,
  Table2,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { siteConfig } from "@/config/site"

// 랜딩 페이지 기능 소개 목록
const features: {
  icon: LucideIcon
  title: string
  description: string
  // 예제 서브페이지 경로 — 있으면 카드에 "예제 보기" 버튼 표시
  href?: string
}[] = [
  {
    icon: Zap,
    title: "Next.js 16 App Router",
    description: "React Compiler, Cache Components 등 최신 기능이 설정되어 있습니다.",
  },
  {
    icon: Blocks,
    title: "shadcn/ui 컴포넌트",
    description: "우선순위별로 엄선된 30여 개의 컴포넌트가 설치되어 있습니다.",
    href: "/examples/components",
  },
  {
    icon: LayoutDashboard,
    title: "레이아웃 3종",
    description: "마케팅, 인증, 대시보드 레이아웃을 라우트 그룹으로 제공합니다.",
  },
  {
    icon: FormInput,
    title: "폼 & 검증",
    description: "react-hook-form + zod 조합으로 타입 안전한 폼을 만듭니다.",
    href: "/examples/forms",
  },
  {
    icon: Table2,
    title: "데이터 테이블",
    description: "TanStack Table 기반 정렬·검색·페이지네이션 테이블을 제공합니다.",
  },
  {
    icon: Moon,
    title: "다크 모드",
    description: "next-themes로 라이트·다크·시스템 테마를 지원합니다.",
    href: "/examples/theme",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero 섹션 */}
      <section className="py-20 sm:py-32">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Badge variant="secondary">Next.js 16 · Tailwind v4 · shadcn/ui</Badge>
          <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            아이디어를 바로 웹으로,
            <br />
            {siteConfig.name}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground text-balance">
            {siteConfig.description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
              대시보드 보기
              <ArrowRight data-icon="inline-end" />
            </Link>
            <a
              href={siteConfig.links.docs}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Next.js 문서
            </a>
          </div>
        </Container>
      </section>

      {/* 기능 소개 섹션 */}
      <section id="features" className="scroll-mt-14 border-t bg-muted/30 py-20">
        <Container className="space-y-10">
          <div className="space-y-2 text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              필요한 것은 모두 준비되어 있습니다
            </h2>
            <p className="text-muted-foreground">
              설정에 시간을 쓰지 말고, 바로 기능 개발을 시작하세요.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description, href }) => (
              <Card key={title} className="justify-between">
                <CardHeader>
                  <span className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                {href && (
                  <CardFooter>
                    <Link
                      href={href}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      예제 보기
                      <ArrowRight data-icon="inline-end" />
                    </Link>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            지금 바로 시작하세요
          </h2>
          <p className="text-muted-foreground">
            회원가입 폼과 검증 로직이 이미 준비되어 있습니다.
          </p>
          <Link href="/signup" className={buttonVariants({ size: "lg" })}>
            무료로 시작하기
          </Link>
        </Container>
      </section>
    </>
  )
}
