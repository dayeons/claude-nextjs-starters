import Link from "next/link"
import { Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

import { siteConfig } from "@/config/site"

type LogoProps = {
  href?: string
  showText?: boolean
  className?: string
  textClassName?: string
}

// 서비스 로고 — 아이콘과 서비스명을 함께 표시합니다.
export function Logo({
  href = "/",
  showText = true,
  className,
  textClassName,
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2 font-semibold", className)}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Rocket className="size-4" />
      </span>
      {showText && (
        <span className={cn("truncate", textClassName)}>{siteConfig.name}</span>
      )}
    </Link>
  )
}
