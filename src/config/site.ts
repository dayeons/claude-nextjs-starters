// 사이트 전역 설정 — 서비스 이름, 설명, 외부 링크 등은 이 파일에서만 관리합니다.
export const siteConfig = {
  name: "Starter Kit",
  description:
    "Next.js 16 · Tailwind CSS · shadcn/ui 기반으로 빠르게 웹 개발을 시작하는 모던 스타터킷",
  url: "http://localhost:3000",
  links: {
    github: "https://github.com",
    docs: "https://nextjs.org/docs",
  },
} as const

export type SiteConfig = typeof siteConfig
