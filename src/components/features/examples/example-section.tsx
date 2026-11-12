import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ExampleSectionProps = {
  title: string
  description?: string
  // 코드 탭에 표시할 예제 소스
  code: string
  children: React.ReactNode
}

// 예제 한 건을 [미리보기 | 코드] 탭으로 보여주는 래퍼
export function ExampleSection({
  title,
  description,
  code,
  children,
}: ExampleSectionProps) {
  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">미리보기</TabsTrigger>
          <TabsTrigger value="code">코드</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div className="rounded-xl border bg-card p-6">{children}</div>
        </TabsContent>
        <TabsContent value="code">
          <pre className="overflow-x-auto rounded-xl border bg-muted p-4 text-xs leading-relaxed">
            <code>{code.trim()}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </section>
  )
}
