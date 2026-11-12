// 샘플 목업 데이터 — 실제 API/DB 연동 시 이 파일을 데이터 페칭 로직으로 교체하세요.
// cacheComponents 환경에서 빌드 결과가 결정적이도록 날짜는 고정 값을 사용합니다.

export type UserRole = "admin" | "member" | "viewer"
export type UserStatus = "active" | "invited" | "suspended"

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
}

export const currentUser = {
  name: "김개발",
  email: "dev@example.com",
}

export const stats = [
  { key: "revenue", title: "총 매출", value: 45231000, change: 20.1 },
  { key: "users", title: "신규 가입자", value: 2350, change: 18.2 },
  { key: "orders", title: "주문 수", value: 12234, change: 4.5 },
  { key: "active", title: "활성 사용자", value: 573, change: -2.3 },
] as const

const names = [
  "김민준", "이서연", "박도윤", "최지우", "정하준", "강서윤", "조시우", "윤하은",
  "장예준", "임지민", "한주원", "오채원", "서지호", "신수아", "권현우", "황지아",
  "안건우", "송다은", "류우진", "홍소율", "전태민", "고나연", "문선우", "양유나",
]
const roles: UserRole[] = ["admin", "member", "member", "viewer"]
const statuses: UserStatus[] = ["active", "active", "invited", "suspended"]

export const users: User[] = names.map((name, index) => ({
  id: `USR-${String(index + 1).padStart(4, "0")}`,
  name,
  email: `user${index + 1}@example.com`,
  role: roles[index % roles.length],
  status: statuses[index % statuses.length],
  createdAt: `2026-${String((index % 10) + 1).padStart(2, "0")}-${String((index % 27) + 1).padStart(2, "0")}`,
}))

export const recentActivities = users.slice(0, 5).map((user, index) => ({
  id: `ACT-${index + 1}`,
  user: user.name,
  email: user.email,
  action: ["회원가입", "결제 완료", "프로필 수정", "비밀번호 변경", "로그인"][index],
  amount: [0, 129000, 0, 0, 0][index],
  date: user.createdAt,
}))
