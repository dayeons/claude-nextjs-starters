import { Logo } from "@/components/common/logo"
import { ThemeToggle } from "@/components/common/theme-toggle"

// 인증 영역 레이아웃 — 화면 중앙에 폼 카드를 배치합니다.
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/40 p-6">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Logo />
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
