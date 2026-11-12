// 예제 페이지 메타 정보 — 메인 카드 링크, 예제 목차, 목록 페이지에서 공통으로 사용합니다.
export type ExampleItem = {
  title: string
  href: string
  description: string
}

// shadcn/ui 개별 컴포넌트 예제
export const componentExamples: ExampleItem[] = [
  {
    title: "Input",
    href: "/examples/components/input",
    description: "기본 입력, 라벨·설명, 아이콘 그룹, 비활성·오류 상태",
  },
  {
    title: "Textarea",
    href: "/examples/components/textarea",
    description: "여러 줄 입력, 글자 수 안내, 비활성·오류 상태",
  },
  {
    title: "Select",
    href: "/examples/components/select",
    description: "items 기반 선택 상자, 기본값, 비활성 상태",
  },
  {
    title: "Checkbox",
    href: "/examples/components/checkbox",
    description: "단일 체크박스, 라벨·설명, 체크박스 그룹",
  },
  {
    title: "Switch",
    href: "/examples/components/switch",
    description: "토글 스위치, 라벨·설명, 크기와 비활성 상태",
  },
]

// 예제 전체 목차 (좌측 네비게이션)
export const examplesNav: { label: string; items: ExampleItem[] }[] = [
  {
    label: "컴포넌트",
    items: [
      {
        title: "컴포넌트 목록",
        href: "/examples/components",
        description: "shadcn/ui 컴포넌트 예제 모음",
      },
      ...componentExamples,
    ],
  },
  {
    label: "폼 & 테마",
    items: [
      {
        title: "폼 & 검증",
        href: "/examples/forms",
        description: "react-hook-form + zod 종합 폼",
      },
      {
        title: "다크 모드",
        href: "/examples/theme",
        description: "라이트·다크·시스템 테마 전환",
      },
    ],
  },
]
