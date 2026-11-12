import { Mail, Search } from "lucide-react"

import { PageHeader } from "@/components/common/page-header"
import { ExampleSection } from "@/components/features/examples/example-section"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export const metadata = { title: "Input 예제" }

export default function InputExamplePage() {
  return (
    <>
      <PageHeader title="Input" description="한 줄 텍스트 입력 컴포넌트입니다." />

      <ExampleSection
        title="기본"
        code={`<Input placeholder="이름을 입력하세요" />`}
      >
        <Input placeholder="이름을 입력하세요" className="max-w-sm" />
      </ExampleSection>

      <ExampleSection
        title="라벨 + 설명"
        description="Field로 라벨과 도움말을 묶습니다."
        code={`<Field>
  <FieldLabel htmlFor="email">이메일</FieldLabel>
  <Input id="email" type="email" placeholder="you@example.com" />
  <FieldDescription>로그인에 사용하는 주소입니다.</FieldDescription>
</Field>`}
      >
        <Field className="max-w-sm">
          <FieldLabel htmlFor="input-email">이메일</FieldLabel>
          <Input id="input-email" type="email" placeholder="you@example.com" />
          <FieldDescription>로그인에 사용하는 주소입니다.</FieldDescription>
        </Field>
      </ExampleSection>

      <ExampleSection
        title="아이콘 그룹"
        description="InputGroup으로 앞/뒤에 아이콘을 붙입니다."
        code={`<InputGroup>
  <InputGroupAddon>
    <Search />
  </InputGroupAddon>
  <InputGroupInput placeholder="검색" />
</InputGroup>`}
      >
        <div className="grid max-w-sm gap-4">
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="검색" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>
            <InputGroupInput type="email" placeholder="이메일" />
          </InputGroup>
        </div>
      </ExampleSection>

      <ExampleSection
        title="비활성 / 오류"
        description="disabled와 aria-invalid로 상태를 표현합니다."
        code={`<Input disabled value="수정할 수 없음" />

<Field data-invalid>
  <FieldLabel htmlFor="bad">이메일</FieldLabel>
  <Input id="bad" aria-invalid defaultValue="abc" />
  <FieldError>올바른 이메일 주소를 입력하세요.</FieldError>
</Field>`}
      >
        <div className="grid max-w-sm gap-6">
          <Input disabled defaultValue="수정할 수 없음" />
          <Field data-invalid>
            <FieldLabel htmlFor="input-bad">이메일</FieldLabel>
            <Input id="input-bad" aria-invalid defaultValue="abc" />
            <FieldError>올바른 이메일 주소를 입력하세요.</FieldError>
          </Field>
        </div>
      </ExampleSection>
    </>
  )
}
