import { PageHeader } from "@/components/common/page-header"
import { ExampleSection } from "@/components/features/examples/example-section"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

export const metadata = { title: "Checkbox 예제" }

export default function CheckboxExamplePage() {
  return (
    <>
      <PageHeader title="Checkbox" description="체크박스 입력 컴포넌트입니다." />

      <ExampleSection
        title="기본"
        code={`<Field orientation="horizontal">
  <Checkbox id="terms" />
  <FieldLabel htmlFor="terms">이용약관에 동의합니다</FieldLabel>
</Field>`}
      >
        <Field orientation="horizontal">
          <Checkbox id="checkbox-terms" />
          <FieldLabel htmlFor="checkbox-terms">이용약관에 동의합니다</FieldLabel>
        </Field>
      </ExampleSection>

      <ExampleSection
        title="라벨 + 설명"
        code={`<Field orientation="horizontal">
  <Checkbox id="news" defaultChecked />
  <FieldContent>
    <FieldLabel htmlFor="news">뉴스레터 수신</FieldLabel>
    <FieldDescription>월 1회 소식을 보내드립니다.</FieldDescription>
  </FieldContent>
</Field>`}
      >
        <Field orientation="horizontal">
          <Checkbox id="checkbox-news" defaultChecked />
          <FieldContent>
            <FieldLabel htmlFor="checkbox-news">뉴스레터 수신</FieldLabel>
            <FieldDescription>월 1회 소식을 보내드립니다.</FieldDescription>
          </FieldContent>
        </Field>
      </ExampleSection>

      <ExampleSection
        title="체크박스 그룹"
        code={`<FieldSet>
  <FieldLegend variant="label">관심 분야</FieldLegend>
  <FieldGroup className="gap-3">
    <Field orientation="horizontal">
      <Checkbox id="web" defaultChecked />
      <FieldLabel htmlFor="web">웹</FieldLabel>
    </Field>
    ...
  </FieldGroup>
</FieldSet>`}
      >
        <FieldSet>
          <FieldLegend variant="label">관심 분야</FieldLegend>
          <FieldGroup className="gap-3">
            <Field orientation="horizontal">
              <Checkbox id="checkbox-web" defaultChecked />
              <FieldLabel htmlFor="checkbox-web">웹</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="checkbox-app" />
              <FieldLabel htmlFor="checkbox-app">앱</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="checkbox-ai" />
              <FieldLabel htmlFor="checkbox-ai">AI</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </ExampleSection>

      <ExampleSection
        title="비활성"
        code={`<Checkbox disabled />
<Checkbox disabled defaultChecked />`}
      >
        <div className="flex items-center gap-4">
          <Checkbox disabled aria-label="비활성" />
          <Checkbox disabled defaultChecked aria-label="비활성 선택됨" />
        </div>
      </ExampleSection>
    </>
  )
}
