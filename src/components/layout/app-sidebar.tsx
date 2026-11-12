"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Logo } from "@/components/common/logo"
import { NavUser } from "@/components/layout/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { dashboardNav, isActivePath } from "@/config/nav"
import { currentUser } from "@/lib/mock-data"

// 대시보드 좌측 사이드바 — 메뉴 항목은 config/nav.ts의 dashboardNav에서 관리합니다.
export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo
          href="/dashboard"
          className="py-1.5"
          // 아이콘 모드로 접혔을 때 서비스명 숨김
          textClassName="group-data-[collapsible=icon]:hidden"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    // 루트 메뉴(/dashboard)는 정확히 일치할 때만 활성화
                    isActive={isActivePath(
                      pathname,
                      item.href,
                      item.href === "/dashboard"
                    )}
                    render={<Link href={item.href} />}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
