import { format, formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

// 날짜·숫자 포맷 유틸 — 날짜는 date-fns, 숫자/통화는 내장 Intl API를 사용합니다.

// 예: 2026년 11월 12일
export function formatDate(date: Date | string | number, pattern = "PPP") {
  return format(new Date(date), pattern, { locale: ko })
}

// 예: 3일 전
export function formatRelative(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko })
}

const numberFormatter = new Intl.NumberFormat("ko-KR")
const currencyFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
})

// 예: 1,234,567
export function formatNumber(value: number) {
  return numberFormatter.format(value)
}

// 예: ₩1,234,567
export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}
