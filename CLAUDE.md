# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 명령어

```bash
npm install          # 의존성 설치 (package-lock.json 기준)
npm run dev          # 개발 서버 (http://localhost:3000)
npm run build        # 프로덕션 빌드
npm run start        # 빌드 결과 실행
npm run lint         # ESLint (eslint.config.mjs, next core-web-vitals + typescript)
npx tsc --noEmit     # 타입 체크 (npm 스크립트는 없음)
```

- 테스트 러너가 설정되어 있지 않습니다. 단일 테스트 실행 방법도 없으므로, 검증은 `lint` + `tsc --noEmit` + `build`와 `dev` 서버에서의 화면 확인으로 합니다.
- shadcn 컴포넌트 추가: `npx shadcn@latest add <name>` (`components.json`, style `base-nova`, 아이콘 lucide).

## 아키텍처 (큰 그림)

### 라우팅과 레이아웃 (`src/app`)
- 라우트 그룹 3개가 각각 다른 셸을 가집니다. 루트 `app/layout.tsx`는 `<html>`, 폰트, `AppProviders`만 담당하고 헤더/사이드바는 그룹 레이아웃이 담당합니다.
  - `(marketing)` → `SiteHeader` + `SiteFooter`
  - `(auth)` → 중앙 카드 레이아웃 (login, signup)
  - `(dashboard)` → `SidebarProvider` + `AppSidebar` + `DashboardHeader` (`/dashboard/*`)
- `(marketing)/examples/*`는 shadcn 컴포넌트와 폼/테마 예제 모음입니다. 좌측 목차는 `examples/layout.tsx`가 `ExamplesNav`(`components/features/examples/examples-nav.tsx`)로 렌더링합니다.

### 설정 파일이 메뉴와 목록을 구동합니다
- 메뉴는 코드가 아니라 `src/config/nav.ts`의 `marketingNav` / `dashboardNav` 배열이 원천입니다. 사이드바와 헤더는 이 배열을 렌더링합니다.
- 예제 목록은 `src/config/examples.ts`의 `componentExamples` / `examplesNav`가 원천입니다. 메인 카드 링크, 예제 목차, 목록 페이지가 같은 데이터를 씁니다. 예제 페이지를 추가하면 이 파일에도 항목을 넣어야 메뉴에 나타납니다.
- 사이트 이름, URL 등 전역 메타데이터는 `src/config/site.ts`에만 둡니다.

### 컴포넌트 레이어 (import 방향 고정)
- `components/ui` (shadcn 생성물) ← `components/common` ← `components/layout` ← `components/features`
- 상위 레이어가 하위 레이어를 import하는 것만 허용됩니다. 역방향 import는 만들지 마세요.
- `components/providers/app-providers.tsx`가 전역 Context의 유일한 진입점입니다. 새 전역 프로바이더는 여기에 추가합니다.
- 페이지는 서버 컴포넌트로 두고, 상호작용이 필요한 부분만 `"use client"` 컴포넌트로 분리합니다.

### 데이터 흐름 (현재는 목업)
- 모든 데이터는 `src/lib/mock-data.ts`에서 옵니다. 실제 API/Server Action으로 바꿀 때 이 파일과 페이지의 데이터 로딩 지점을 함께 교체합니다.
- 폼 제출 핸들러에는 `TODO`가 남아 있습니다. 제출 결과는 `sonner`의 `toast`로 알리는 패턴이 기본입니다.

### 폼 패턴
- 스키마는 `src/lib/validations/*.ts`에 zod로 작성합니다.
- 폼 컴포넌트(`components/features/**/*-form.tsx`)는 `useForm` + `zodResolver` + `Controller` + shadcn `Field` 조합을 씁니다. `auth/login-form.tsx`가 기준 구현입니다.

## 이 저장소 특유의 함정

- **Base UI 기반 shadcn**: Radix의 `asChild`가 없습니다. 트리거를 다른 요소로 바꿀 때는 `render` prop을 씁니다 (`<DropdownMenuTrigger render={<Button />}>`). 링크를 버튼처럼 보이게 할 때는 `<Link className={buttonVariants()} />`를 씁니다.
- **Cache Components 활성화** (`next.config.ts`의 `cacheComponents: true`): 서버 컴포넌트에서 `new Date()`, `Math.random()` 같은 비결정 값을 바로 쓰면 빌드가 실패합니다. `"use cache"` 또는 `<Suspense>` 경계를 씁니다. 그래서 `mock-data.ts`의 날짜가 고정 값입니다.
- **TanStack Table v9**: 기능은 `tableFeatures()`로 명시 등록합니다. 새 기능(예: 컬럼 숨김)이 필요하면 `components/common/data-table.tsx`의 `dataTableFeatures`에 추가합니다.
- **`next-env.d.ts`, `*.tsbuildinfo`는 gitignore 대상**이지만 로컬에 생성되어 있습니다. 커밋하지 않습니다.
- `AGENTS.md`의 `BEGIN/END` 블록은 `next dev`가 자동으로 다시 씁니다. 지우지 말고 함께 커밋합니다.
