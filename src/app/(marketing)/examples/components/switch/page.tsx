import { PageHeader } from "@/components/common/page-header"
import { ExampleSection } from "@/components/features/examples/example-section"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export const metadata = { title: "Switch 예제" }

export default function SwitchExamplePage() {
  return (
    <>
      <PageHeader title="Switch" description="켜기/끄기 토글 컴포넌트입니다." />

      <ExampleSection
        title="기본"
        code={`<Field orientation="horizontal">
  <Switch id="airplane" />
  <FieldLabel htmlFor="airplane">비행기 모드</FieldLabel>
</Field>`}
      >
        <Field orientation="horizontal" className="w-fit">
          <Switch id="switch-airplane" />
          <FieldLabel htmlFor="switch-airplane">비행기 모드</FieldLabel>
        </Field>
      </ExampleSection>

      <ExampleSection
        title="라벨 + 설명"
        code={`<Field orientation="horizontal">
  <FieldContent>
    <FieldLabel htmlFor="mail">마케팅 이메일 수신</FieldLabel>
    <FieldDescription>새 기능과 소식을 이메일로 받습니다.</FieldDescription>
  </FieldContent>
  <Switch id="mail" defaultChecked />
</Field>`}
      >
        <Field orientation="horizontal" className="max-w-md">
          <FieldContent>
            <FieldLabel htmlFor="switch-mail">마케팅 이메일 수신</FieldLabel>
            <FieldDescription>새 기능과 소식을 이메일로 받습니다.</FieldDescription>
          </FieldContent>
          <Switch id="switch-mail" defaultChecked />
        </Field>
      </ExampleSection>

      <ExampleSection
        title="크기 / 비활성"
        code={`<Switch size="sm" />
<Switch />
<Switch disabled />`}
      >
        <div className="flex items-center gap-4">
          <Switch size="sm" aria-label="작은 크기" />
          <Switch aria-label="기본 크기" />
          <Switch disabled aria-label="비활성" />
        </div>
      </ExampleSection>
    </>
  )
}
