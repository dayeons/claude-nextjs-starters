# Next.js 모던 웹 스타터킷

Next.js 16 App Router · Tailwind CSS v4 · TypeScript · shadcn/ui · lucide-react 기반으로 **바로 기능 개발을 시작할 수 있는** 범용 웹 스타터킷입니다.
마케팅 / 인증 / 대시보드 레이아웃과 폼, 데이터 테이블, 다크 모드가 미리 구성되어 있습니다.

## 시작하기

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
```

| 경로 | 설명 |
|---|---|
| `/` | 랜딩 페이지 (Hero · 기능 소개 · CTA) |
| `/login`, `/signup` | 인증 폼 (react-hook-form + zod 검증) |
| `/dashboard` | 통계 카드 + 최근 활동 테이블 |
| `/dashboard/users` | 정렬·검색·페이지네이션 데이터 테이블 |
| `/dashboard/settings` | 탭 + 프로필 폼 + 확인 다이얼로그 |

## 기술 스택

| 분류 | 사용 기술 |
|---|---|
| 프레임워크 | Next.js 16 (App Router, React Compiler, Cache Components) |
| 스타일 | Tailwind CSS v4, tw-animate-css |
| UI | shadcn/ui (`base-nova` 스타일, **Base UI** 기반), lucide-react |
| 유틸리티 | 아래 "유틸리티 라이브러리" 참고 |

### 유틸리티 라이브러리 — 바퀴를 재발명하지 않습니다

| 용도 | 라이브러리 | 사용 위치 |
|---|---|---|
| className 병합 | `cn` (shadcn 공식) | `src/lib/utils.ts` |
| 다크 모드 | `next-themes` | `components/providers/theme-provider.tsx` |
| 폼 상태 | `react-hook-form` + `@hookform/resolvers` | `components/features/**/*-form.tsx` |
| 스키마 검증 | `zod` | `src/lib/validations/` |
| 토스트 | `sonner` | `toast()` 어디서나 호출 |
| 테이블 로직 | `@tanstack/react-table` v9 | `components/common/data-table.tsx` |
| 날짜 포맷 | `date-fns` (ko 로케일) | `src/lib/format.ts` |
| 공통 훅 | `usehooks-ts` | debounce, clipboard, mediaQuery 등 |

> 숫자·통화 포맷은 브라우저 내장 `Intl.NumberFormat`을 사용합니다.

## 폴더 구조

```
src/
├─ app/
│  ├─ layout.tsx              # 루트: 폰트, 메타데이터, AppProviders
│  ├─ not-found.tsx · error.tsx
│  ├─ (marketing)/            # 헤더 + 푸터 레이아웃
│  ├─ (auth)/                 # 중앙 카드 레이아웃 (login, signup)
│  └─ (dashboard)/            # 사이드바 레이아웃 (dashboard/*)
├─ components/
│  ├─ ui/                     # L1 shadcn 컴포넌트 (CLI 생성)
│  ├─ common/                 # L2 공용 조합 컴포넌트
│  ├─ layout/                 # L3 레이아웃 컴포넌트
│  ├─ features/               # L4 도메인 전용 컴포넌트
│  └─ providers/              # 전역 Context
├─ config/                    # site.ts, nav.ts
├─ hooks/                     # 커스텀 훅
└─ lib/                       # utils, format, validations, mock-data
```

### 컴포넌트 계층과 의존 규칙

| 레이어 | 폴더 | 역할 | 예시 |
|---|---|---|---|
| L1 Primitive | `components/ui` | shadcn이 생성한 기본 UI. 직접 수정 최소화 | Button, Card, Input |
| L2 Shared | `components/common` | 도메인과 무관한 재사용 조합 | Logo, ThemeToggle, PageHeader, ConfirmDialog, DataTable |
| L3 Layout | `components/layout` | 페이지 골격 | SiteHeader, SiteFooter, AppSidebar, DashboardHeader, Container |
| L4 Feature | `components/features` | 특정 화면·도메인 전용 | LoginForm, StatCard, UsersTable, ProfileForm |

- import 방향은 **`features → layout / common → ui`** 로만 흐릅니다. (하위 레이어가 상위 레이어를 import하지 않음)
- 페이지(`app/**/page.tsx`)는 서버 컴포넌트로 두고 데이터를 준비한 뒤, 상호작용이 필요한 부분만 `"use client"` 컴포넌트로 분리합니다.

## 설치된 shadcn 컴포넌트 (우선순위별)

| 우선순위 | 컴포넌트 |
|---|---|
| P0 기반 | button, card, input, label, separator, dropdown-menu, sheet, avatar, badge, skeleton, spinner, sonner, tooltip |
| P1 레이아웃·폼 | navigation-menu, sidebar, breadcrumb, field, input-group, textarea, select, checkbox, switch, dialog, alert-dialog, tabs, scroll-area |
| P2 데이터·피드백 | table, pagination, alert, empty, popover, command, progress, accordion |
| P3 필요 시 추가 | calendar, chart, carousel, hover-card 등 |

```bash
npx shadcn@latest add calendar   # 컴포넌트 추가
```

## 자주 하는 작업

### 사이드바 / 헤더 메뉴 추가
`src/config/nav.ts`의 `dashboardNav` 또는 `marketingNav` 배열에 항목을 추가합니다.

```ts
{ title: "주문", href: "/dashboard/orders", icon: ShoppingCart }
```

### 대시보드 페이지 추가
`src/app/(dashboard)/dashboard/orders/page.tsx`를 만들고 `PageHeader`로 시작합니다. 사이드바·헤더·브레드크럼은 자동으로 적용됩니다.

### 폼 만들기
1. `src/lib/validations/`에 zod 스키마 작성
2. `useForm({ resolver: zodResolver(schema) })` + `Controller` + shadcn `Field` 조합 (`login-form.tsx` 참고)
3. 제출 결과는 `toast.success()`로 안내

### 데이터 테이블 만들기
`DataTableColumnDef<T>[]`로 컬럼을 정의하고 `<DataTable columns={...} data={...} />`를 렌더링합니다. (`features/users/users-table.tsx` 참고)
TanStack Table v9은 기능을 `tableFeatures()`로 명시 등록하는 방식이므로, 컬럼 숨김 등 기능이 더 필요하면 `data-table.tsx`의 `dataTableFeatures`에 추가하세요.

## 주의 사항

- **Base UI 스타일**: Radix의 `asChild` 대신 `render` prop을 사용합니다.
  ```tsx
  <DropdownMenuTrigger render={<Button variant="ghost" />}>열기</DropdownMenuTrigger>
  ```
  링크를 버튼 모양으로 만들 때는 `<Link className={buttonVariants()} />`를 사용합니다.
- **Cache Components 활성화**: 서버 컴포넌트에서 `new Date()`, `Math.random()` 등 비결정 값을 바로 사용하면 빌드 에러가 납니다. `"use cache"` 또는 `<Suspense>` 경계를 활용하세요.
- 목업 데이터(`src/lib/mock-data.ts`)와 폼 제출의 `TODO` 부분을 실제 API / Server Action으로 교체하세요.

## 추천 확장 라이브러리 (필요 시)

| 용도 | 라이브러리 |
|---|---|
| 서버 상태 / 캐싱 | `@tanstack/react-query` |
| 전역 클라이언트 상태 | `zustand` |
| URL 쿼리 상태 | `nuqs` |
| 차트 | `npx shadcn@latest add chart` (recharts) |
| 인증 | `better-auth`, `next-auth` |
