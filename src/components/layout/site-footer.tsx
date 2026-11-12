import { Logo } from "@/components/common/logo"
import { Container } from "@/components/layout/container"
import { siteConfig } from "@/config/site"

// 공개(마케팅) 페이지 하단 푸터
export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <Logo />
        <p>
          Built with Next.js · Tailwind CSS · shadcn/ui ·{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground"
          >
            GitHub
          </a>
        </p>
      </Container>
    </footer>
  )
}
