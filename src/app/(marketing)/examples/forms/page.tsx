import { PageHeader } from "@/components/common/page-header"
import { FormsDemo } from "@/components/features/examples/forms-demo"

export const metadata = { title: "폼 & 검증 예제" }

export default function FormsExamplePage() {
  return (
    <>
      <PageHeader
        title="폼 & 검증"
        description="react-hook-form + zod로 만든 타입 안전한 폼입니다. 비워 두고 제출해 검증 메시지를 확인해 보세요."
      />
      <div className="rounded-xl border bg-card p-6">
        <FormsDemo />
      </div>
      <p className="text-sm text-muted-foreground">
        소스: <code>src/components/features/examples/forms-demo.tsx</code> ·
        스키마: <code>src/lib/validations/example.ts</code>
      </p>
    </>
  )
}
