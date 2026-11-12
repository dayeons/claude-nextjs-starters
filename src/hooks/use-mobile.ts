import { useMediaQuery } from "usehooks-ts"

const MOBILE_BREAKPOINT = 768

// 모바일 화면(768px 미만) 여부 — shadcn Sidebar가 사용하는 훅입니다.
// 직접 matchMedia를 구독하는 대신 검증된 usehooks-ts의 useMediaQuery를 사용합니다.
// SSR 하이드레이션 불일치를 피하기 위해 초기값은 false로 시작합니다.
export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`, {
    initializeWithValue: false,
  })
}
