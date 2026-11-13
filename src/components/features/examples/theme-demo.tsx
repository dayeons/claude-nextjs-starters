"use client"

import { useSyncExternalStore } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { ThemeToggle } from "@/components/common/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const themeOptions = [
  { value: "light", label: "라이트", icon: Sun },
  { value: "dark", label: "다크", icon: Moon },
  { value: "system", label: "시스템", icon: Monitor },
] as const

// 색상 토큰 스와치 목록 (globals.css의 CSS 변수와 연결)
const tokens = [
  { name: "background", className: "bg-background border" },
  { name: "foreground", className: "bg-foreground" },
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "muted", className: "bg-muted" },
  { name: "accent", className: "bg-accent" },
  { name: "destructive", className: "bg-destructive" },
  { name: "border", className: "bg-border" },
]

// 같은 UI를 고정 테마로 미리보기 — light/dark 클래스가 페이지 테마보다 우선 적용됩니다.
function ThemePreview({ mode }: { mode: "light" | "dark" }) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-background p-4 text-foreground",
        mode
      )}
    >
      <Card>
        <CardHeader>
          <CardTitle>{mode === "dark" ? "다크" : "라이트"} 미리보기</CardTitle>
          <CardDescription>토큰만 바뀌고 컴포넌트는 그대로입니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="입력해 보세요" />
          <div className="flex items-center gap-2">
            <Button size="sm">기본</Button>
            <Button size="sm" variant="outline">
              외곽선
            </Button>
            <Badge variant="secondary">배지</Badge>
            <Switch defaultChecked aria-label="스위치" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 클라이언트 마운트 여부 — 서버에서는 false, 하이드레이션 이후 true
const subscribeNoop = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

// 다크모드 예제 — 테마 선택, 라이트/다크 비교, 색상 토큰
export function ThemeDemo() {
  const { theme, setTheme } = useTheme()
  // theme은 서버 렌더 시 undefined이므로, 선택 상태 표시는 마운트 이후에만 합니다.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot
  )

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">테마 전환</h2>
        <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-6">
          <ThemeToggle />
          <span className="mx-2 h-6 w-px bg-border" />
          {themeOptions.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              size="sm"
              variant={mounted && theme === value ? "default" : "outline"}
              onClick={() => setTheme(value)}
            >
              <Icon />
              {label}
            </Button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">라이트 / 다크 비교</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <ThemePreview mode="light" />
          <ThemePreview mode="dark" />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">색상 토큰</h2>
        <div className="grid grid-cols-2 gap-4 rounded-xl border bg-card p-6 sm:grid-cols-4">
          {tokens.map((token) => (
            <div key={token.name} className="space-y-2">
              <div className={cn("h-12 rounded-md", token.className)} />
              <p className="text-xs text-muted-foreground">{token.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
