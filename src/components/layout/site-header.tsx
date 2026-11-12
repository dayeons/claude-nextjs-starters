import Link from "next/link"

import { Logo } from "@/components/common/logo"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Container } from "@/components/layout/container"
import { buttonVariants } from "@/components/ui/button"
import { marketingNav } from "@/config/nav"

// 공개(마케팅) 페이지 상단 헤더 — 스크롤 시 상단 고정 + 배경 블러
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container className="flex h-14 items-center gap-4">
        <MobileNav items={marketingNav} />
        <Logo />
        <MainNav items={marketingNav} />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "hidden sm:inline-flex",
            })}
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className={buttonVariants({ size: "sm" })}
          >
            시작하기
          </Link>
        </div>
      </Container>
    </header>
  )
}
