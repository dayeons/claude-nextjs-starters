"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { examplesNav } from "@/config/examples"
import { cn } from "@/lib/utils"

// 예제 목차 — 데스크톱은 세로 목록, 모바일은 가로 스크롤
export function ExamplesNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="예제 목차" className="flex gap-6 overflow-x-auto lg:flex-col">
      {examplesNav.map((group) => (
        <div key={group.label} className="flex gap-1 lg:flex-col">
          <p className="hidden px-2 pb-1 text-xs font-medium text-muted-foreground lg:block">
            {group.label}
          </p>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "rounded-md px-2 py-1.5 text-sm whitespace-nowrap text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                pathname === item.href && "bg-muted font-medium text-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}
