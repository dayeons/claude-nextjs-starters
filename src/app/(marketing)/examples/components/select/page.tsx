import { PageHeader } from "@/components/common/page-header"
import { ExampleSection } from "@/components/features/examples/example-section"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata = { title: "Select 예제" }

// Base UI Select는 items를 넘기면 선택된 값의 label을 자동으로 표시합니다.
const roleItems = [
  { value: "admin", label: "관리자" },
  { value: "member", label: "멤버" },
  { value: "viewer", label: "뷰어" },
]

const roleCode = `const roleItems = [
  { value: "admin", label: "관리자" },
  { value: "member", label: "멤버" },
  { value: "viewer", label: "뷰어" },
]`

export default function SelectExamplePage() {
  return (
    <>
      <PageHeader title="Select" description="items 기반 선택 상자입니다." />

      <ExampleSection
        title="기본"
        code={`${roleCode}

<Select items={roleItems}>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="권한 선택" />
  </SelectTrigger>
  <SelectContent>
    {roleItems.map((item) => (
      <SelectItem key={item.value} value={item.value}>
        {item.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>`}
      >
        <Select items={roleItems}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="권한 선택" />
          </SelectTrigger>
          <SelectContent>
            {roleItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ExampleSection>

      <ExampleSection
        title="기본값 + 라벨"
        code={`<Field>
  <FieldLabel htmlFor="role">권한</FieldLabel>
  <Select items={roleItems} defaultValue="member">
    <SelectTrigger id="role" className="w-48">
      <SelectValue />
    </SelectTrigger>
    ...
  </Select>
  <FieldDescription>가입 후 변경할 수 있습니다.</FieldDescription>
</Field>`}
      >
        <Field className="max-w-xs">
          <FieldLabel htmlFor="select-role">권한</FieldLabel>
          <Select items={roleItems} defaultValue="member">
            <SelectTrigger id="select-role" className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {roleItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldDescription>가입 후 변경할 수 있습니다.</FieldDescription>
        </Field>
      </ExampleSection>

      <ExampleSection
        title="비활성"
        code={`<Select items={roleItems} defaultValue="viewer" disabled>
  ...
</Select>`}
      >
        <Select items={roleItems} defaultValue="viewer" disabled>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roleItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ExampleSection>
    </>
  )
}
