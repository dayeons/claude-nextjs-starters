import { z } from "zod"

// 프로필 설정 폼 검증 스키마
export const profileSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
  email: z.email("올바른 이메일 주소를 입력하세요."),
  role: z.enum(["admin", "member", "viewer"]),
  bio: z.string().max(160, "소개는 160자 이하로 입력하세요.").optional(),
  marketingEmails: z.boolean(),
})

export type ProfileInput = z.infer<typeof profileSchema>
