import {
  LayoutDashboard,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"

// 내비게이션 항목 타입
export type NavItem = {
  title: string
  href: string
  icon?: LucideIcon
  external?: boolean
}

// 마케팅(공개) 영역 상단 메뉴
export const marketingNav: NavItem[] = [
  { title: "기능", href: "/#features" },
  { title: "대시보드", href: "/dashboard" },
  { title: "문서", href: "https://nextjs.org/docs", external: true },
]

// 대시보드 사이드바 메뉴 — 메뉴 추가 시 이 배열에 항목만 추가하면 됩니다.
export const dashboardNav: NavItem[] = [
  { title: "대시보드", href: "/dashboard", icon: LayoutDashboard },
  { title: "사용자", href: "/dashboard/users", icon: Users },
  { title: "설정", href: "/dashboard/settings", icon: Settings },
]

// 현재 경로와 메뉴 경로가 일치하는지 판단 (하위 경로 포함, 루트 메뉴는 정확히 일치할 때만)
export function isActivePath(pathname: string, href: string, exact = false) {
  if (exact) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}
