import { z } from "zod"

// 폼 예제 검증 스키마 — 이름/이메일/권한/소개/약관/알림
export const exampleFormSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
  email: z.email("올바른 이메일 주소를 입력하세요."),
  role: z.enum(["admin", "member", "viewer"]),
  bio: z.string().max(160, "소개는 160자 이하로 입력하세요.").optional(),
  terms: z.boolean().refine((value) => value, "이용약관에 동의해야 합니다."),
  notifications: z.boolean(),
})

export type ExampleFormInput = z.infer<typeof exampleFormSchema>
