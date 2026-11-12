import { PageHeader } from "@/components/common/page-header"
import { ExampleSection } from "@/components/features/examples/example-section"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export const metadata = { title: "Textarea 예제" }

export default function TextareaExamplePage() {
  return (
    <>
      <PageHeader title="Textarea" description="여러 줄 텍스트 입력 컴포넌트입니다." />

      <ExampleSection
        title="기본"
        code={`<Textarea placeholder="내용을 입력하세요" />`}
      >
        <Textarea placeholder="내용을 입력하세요" className="max-w-md" />
      </ExampleSection>

      <ExampleSection
        title="라벨 + 설명"
        code={`<Field>
  <FieldLabel htmlFor="bio">소개</FieldLabel>
  <Textarea id="bio" placeholder="간단한 자기소개" />
  <FieldDescription>최대 160자까지 입력할 수 있습니다.</FieldDescription>
</Field>`}
      >
        <Field className="max-w-md">
          <FieldLabel htmlFor="textarea-bio">소개</FieldLabel>
          <Textarea id="textarea-bio" placeholder="간단한 자기소개" />
          <FieldDescription>최대 160자까지 입력할 수 있습니다.</FieldDescription>
        </Field>
      </ExampleSection>

      <ExampleSection
        title="비활성 / 오류"
        code={`<Textarea disabled defaultValue="수정할 수 없음" />

<Field data-invalid>
  <Textarea aria-invalid />
  <FieldError>소개는 160자 이하로 입력하세요.</FieldError>
</Field>`}
      >
        <div className="grid max-w-md gap-6">
          <Textarea disabled defaultValue="수정할 수 없음" />
          <Field data-invalid>
            <Textarea aria-invalid defaultValue="너무 긴 내용" />
            <FieldError>소개는 160자 이하로 입력하세요.</FieldError>
          </Field>
        </div>
      </ExampleSection>
    </>
  )
}
