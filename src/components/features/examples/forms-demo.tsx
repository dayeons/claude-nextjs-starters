"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  exampleFormSchema,
  type ExampleFormInput,
} from "@/lib/validations/example"

const roleItems = [
  { value: "admin", label: "관리자" },
  { value: "member", label: "멤버" },
  { value: "viewer", label: "뷰어" },
]

const defaultValues: ExampleFormInput = {
  name: "",
  email: "",
  role: "member",
  bio: "",
  terms: false,
  notifications: true,
}

// react-hook-form + zod 종합 폼 예제 — 모든 필드를 Controller로 연결합니다.
export function FormsDemo() {
  const form = useForm<ExampleFormInput>({
    resolver: zodResolver(exampleFormSchema),
    defaultValues,
  })

  async function onSubmit(values: ExampleFormInput) {
    // 실제 서비스에서는 API 호출 또는 Server Action으로 교체하세요.
    await new Promise((resolve) => setTimeout(resolve, 600))
    toast.success("폼을 제출했습니다.", {
      description: `${values.name} · ${values.email}`,
    })
    form.reset(defaultValues)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="max-w-lg"
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>이름</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="홍길동"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>이메일</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                placeholder="you@example.com"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="role"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>권한</FieldLabel>
              <Select
                name={field.name}
                items={roleItems}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger id={field.name} className="w-48">
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="bio"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>소개</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                placeholder="간단한 자기소개"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>최대 160자까지 입력할 수 있습니다.</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="notifications"
          control={form.control}
          render={({ field }) => (
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor={field.name}>알림 수신</FieldLabel>
                <FieldDescription>새 소식을 이메일로 받습니다.</FieldDescription>
              </FieldContent>
              <Switch
                id={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </Field>
          )}
        />
        <Controller
          name="terms"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              <FieldContent>
                <FieldLabel htmlFor={field.name}>이용약관에 동의합니다</FieldLabel>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
            </Field>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner />}
            제출
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset(defaultValues)}
          >
            초기화
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
