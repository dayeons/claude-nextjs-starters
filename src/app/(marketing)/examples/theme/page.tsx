import { PageHeader } from "@/components/common/page-header"
import { ThemeDemo } from "@/components/features/examples/theme-demo"

export const metadata = { title: "다크 모드 예제" }

export default function ThemeExamplePage() {
  return (
    <>
      <PageHeader
        title="다크 모드"
        description="next-themes로 라이트·다크·시스템 테마를 지원합니다."
      />
      <ThemeDemo />
    </>
  )
}
