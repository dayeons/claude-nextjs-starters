"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { currentUser } from "@/lib/mock-data"
import { profileSchema, type ProfileInput } from "@/lib/validations/profile"

// Select 옵션 — Base UI Select는 items를 넘기면 선택값의 label을 자동 표시합니다.
const roleItems = [
  { value: "admin", label: "관리자" },
  { value: "member", label: "멤버" },
  { value: "viewer", label: "뷰어" },
]

// 프로필 설정 폼 — Input, Select, Textarea, Switch를 react-hook-form과 연결하는 예시
export function ProfileForm() {
  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
      role: "admin",
      bio: "",
      marketingEmails: true,
    },
  })

  async function onSubmit(values: ProfileInput) {
    // TODO: 실제 저장 API(또는 Server Action)로 교체하세요.
    await new Promise((resolve) => setTimeout(resolve, 600))
    toast.success("프로필을 저장했습니다.", {
      description: `${values.name} · ${values.email}`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>프로필</CardTitle>
        <CardDescription>다른 사용자에게 표시되는 정보입니다.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <CardContent>
          <FieldGroup>
            <div className="grid gap-6 sm:grid-cols-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>이름</FieldLabel>
                    <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
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
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
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
                    <SelectTrigger id={field.name} className="w-full sm:w-48">
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
                    placeholder="간단한 자기소개를 입력하세요."
                    className="min-h-24"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldDescription>최대 160자까지 입력할 수 있습니다.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="marketingEmails"
              control={form.control}
              render={({ field }) => (
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>마케팅 이메일 수신</FieldLabel>
                    <FieldDescription>새 기능과 소식을 이메일로 받습니다.</FieldDescription>
                  </FieldContent>
                  <Switch
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className="mt-6 justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            초기화
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner />}
            저장
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
