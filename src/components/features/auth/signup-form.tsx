"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { signupSchema, type SignupInput } from "@/lib/validations/auth"

// 텍스트 입력 필드 정의 — 반복되는 Controller 마크업을 배열로 정리
const textFields = [
  { name: "name", label: "이름", type: "text", autoComplete: "name" },
  { name: "email", label: "이메일", type: "email", autoComplete: "email" },
  { name: "password", label: "비밀번호", type: "password", autoComplete: "new-password" },
  { name: "confirmPassword", label: "비밀번호 확인", type: "password", autoComplete: "new-password" },
] as const

// 회원가입 폼 — 비밀번호 확인, 약관 동의 체크박스 검증 포함
export function SignupForm() {
  const router = useRouter()
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  async function onSubmit(values: SignupInput) {
    // TODO: 실제 회원가입 API(또는 Server Action)로 교체하세요.
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast.success(`${values.name}님, 가입을 환영합니다!`)
    router.push("/dashboard")
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">계정 만들기</CardTitle>
        <CardDescription>아래 정보를 입력해 시작하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            {textFields.map((item) => (
              <Controller
                key={item.name}
                name={item.name}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{item.label}</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type={item.type}
                      autoComplete={item.autoComplete}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
            <Controller
              name="terms"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldLabel htmlFor={field.name} className="font-normal">
                    서비스 이용약관 및 개인정보 처리방침에 동의합니다.
                  </FieldLabel>
                </Field>
              )}
            />
            {form.formState.errors.terms && (
              <FieldError errors={[form.formState.errors.terms]} />
            )}
            <Field>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Spinner />}
                회원가입
              </Button>
              <FieldDescription className="text-center">
                이미 계정이 있으신가요? <Link href="/login">로그인</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
