import Link from "next/link"

import { PageHeader } from "@/components/common/page-header"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { componentExamples } from "@/config/examples"

export const metadata = { title: "컴포넌트 예제" }

// shadcn/ui 컴포넌트 예제 목록
export default function ComponentsIndexPage() {
  return (
    <>
      <PageHeader
        title="shadcn/ui 컴포넌트"
        description="대시보드에서 사용하는 폼 컴포넌트의 사용 예제입니다."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {componentExamples.map((item) => (
          <Link key={item.href} href={item.href} className="group">
            <Card className="h-full transition-colors group-hover:bg-muted/50">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
