# AI 투자 솔루션 — Web Agent Guide

## 프로젝트 개요

**AI 투자 솔루션** 데스크탑 앱의 공식 다운로드 웹사이트.
사용자에게 제품을 소개하고 OS별(Windows, macOS) 설치 파일을 다운로드할 수 있도록 한다.

---

## 기술 스택

- **순수 HTML + CSS + JavaScript** — 빌드 도구·프레임워크 없이 파일만으로 동작
- 별도 서버 불필요 — `index.html`을 브라우저에서 열거나 정적 호스팅으로 배포
- 추후 Next.js로 마이그레이션을 고려하여 구조를 설계

### Next.js 마이그레이션 대비 원칙

- **섹션 단위로 분리**: 각 섹션을 독립적인 구조로 작성하여 나중에 React 컴포넌트로 1:1 전환 가능하도록 한다
- **CSS 클래스 네이밍**: BEM 또는 컴포넌트 기반 네이밍 (`hero`, `hero__title`, `features`, `features__card`) 사용 — Tailwind 전환 시 매핑 용이
- **JavaScript 모듈화**: 기능별로 함수를 분리하여 작성 (`detectOS()`, `initFAQ()`, `initScrollAnimation()` 등)
- **시맨틱 HTML**: `<section>`, `<nav>`, `<header>`, `<footer>` 등 시맨틱 태그 사용 — JSX 전환 시 구조 유지
- **데이터와 뷰 분리**: 에이전트 정보, FAQ 항목 등 반복 데이터는 JS 객체/배열로 정의하고 DOM을 동적 생성 — 추후 props/state로 전환 용이

---

## 프로젝트 구조

```
web/
├── index.html           # 메인 (유일한) HTML 페이지
├── css/
│   └── style.css        # 전체 스타일
├── js/
│   ├── data.js          # 콘텐츠 데이터 (다운로드 URL, 섹션 데이터, FAQ 등)
│   └── main.js          # UI 로직 (OS 감지, 렌더링, FAQ 토글, 스크롤 등)
├── assets/
│   ├── images/
│   │   ├── common/      # 공통 아이콘 (OS 아이콘, favicon, OG 이미지)
│   │   ├── screenshots/ # 앱 미리보기 스크린샷
│   │   ├── features/    # 핵심 기능 카드 이미지
│   │   └── agents/      # 에이전트 카드 이미지
│   └── downloads/       # 설치 파일 또는 외부 다운로드 URL 사용
└── CLAUDE.md            # 이 파일
```

### 파일별 역할

| 파일 | 역할 | Next.js 전환 시 |
|------|------|----------------|
| `index.html` | 전체 페이지 구조, 섹션 배치 | `app/page.tsx` + 레이아웃 |
| `css/style.css` | 모든 스타일 | Tailwind 유틸리티 또는 CSS Modules |
| `js/data.js` | 콘텐츠 데이터 정의 | 그대로 import하여 사용 |
| `js/main.js` | OS 감지, 렌더링, FAQ 아코디언, 스크롤 애니메이션 | hooks + 컴포넌트 로직 |
| `assets/images/` | 정적 이미지 (하위 폴더별 분류) | `public/` 또는 `next/image` |

---

## 제품 정보 (데스크탑 앱)

- **제품명**: AI 투자 솔루션
- **앱 ID**: `com.electron.app`
- **패키지명**: `ai-stock-analytics`
- **지원 플랫폼**: Windows (NSIS 인스톨러), macOS (DMG)
- **기술 스택**: Electron + React + TypeScript
- **핵심 기능**: GPT/Claude AI 모델 기반 멀티 에이전트 주식 분석 및 투자 리포트 생성

### 앱 사용 흐름

```
AI 모델 선택 (GPT/Claude) → CLI 자동 설치 → 인증 → 종목 입력 → 멀티 에이전트 분석 → 투자 리포트
```

### 설치 파일명 규칙

| 플랫폼 | 파일명 | 형식 |
|--------|--------|------|
| Windows | `ai-stock-analytics-setup.exe` | NSIS 인스톨러 |
| macOS | `ai-stock-analytics.dmg` | DMG 디스크 이미지 |

---

## 웹사이트 페이지 구성

싱글 페이지 랜딩으로 구성한다. 각 섹션은 `<section id="섹션명">` 으로 구분하여 앵커 네비게이션을 지원한다.

### 필수 섹션

| 섹션 ID | 내용 | 비고 |
|---------|------|------|
| `hero` | 제품명, 한줄 소개, 메인 CTA 다운로드 버튼 | OS 자동 감지하여 버튼 텍스트 변경 |
| `features` | 핵심 기능 카드 (멀티 에이전트 분석, AI 모델 선택, 리포트 생성 등) | 아이콘 + 제목 + 설명 카드 |
| `agents` | 7개 에이전트 역할 소개 + 분석 파이프라인 시각화 | 파이프라인 다이어그램 포함 |
| `screenshots` | 앱 UI 스크린샷 (모델 선택, 분석 진행, 리포트 화면) | 이미지 슬라이더 또는 그리드 |
| `download` | OS별 다운로드 버튼 (Windows / macOS) + 시스템 요구사항 | OS 감지 + 수동 선택 |
| `faq` | 자주 묻는 질문 아코디언 | JS로 토글 |
| `footer` | 저작권, 관련 링크 | 고정 하단 |

### 네비게이션

- 상단 고정(`sticky`) 네비게이션 바
- 각 섹션으로 부드러운 스크롤 (`scroll-behavior: smooth`)
- 모바일: 햄버거 메뉴

---

## 다운로드 로직

```javascript
// OS 감지 로직 (main.js)
function detectOS() {
  const ua = navigator.userAgent;
  if (ua.includes('Win')) return 'windows';
  if (ua.includes('Mac')) return 'mac';
  return 'other';
}
```

- Hero 섹션: 감지된 OS에 맞는 기본 다운로드 버튼 표시
  - Windows → "Windows용 다운로드 (.exe)"
  - macOS → "macOS용 다운로드 (.dmg)"
  - 기타 → 두 버튼 모두 표시
- Download 섹션: 두 OS 모두 수동 선택 가능
- 다운로드 URL은 `main.js` 상단에 상수로 관리 (추후 CDN/릴리스 URL로 교체 용이)

---

## 7개 에이전트 설명 (콘텐츠용)

| 에이전트 | 한글명 | 아이콘 제안 | 역할 요약 |
|---------|--------|-----------|----------|
| `financial-analyst-kr` | 재무 분석가 | 📊 | 매출 추이, 영업이익률, PER, PBR, ROE, 부채비율 등 재무 건전성 분석 |
| `sector-researcher` | 업종 리서처 | 🏭 | 글로벌 시장 흐름, 경쟁사 비교, 정책·규제, 업종 전망 |
| `news-sentiment-analyst` | 뉴스 분석가 | 📰 | 최근 뉴스 수집, 호재·악재 분류, 시장 심리 판정 |
| `price-analyst` | 기술적 분석가 | 📈 | 이동평균, RSI, MACD, 볼린저밴드, 지지·저항선 |
| `valuation-analyst` | 밸류에이션 분석가 | 💰 | 증권사 목표주가, 적정주가 시나리오 (보수·기준·낙관) |
| `invest-type-classifier` | 투자 유형 분류기 | 🏷️ | 6가지 유형 분류 (성장형, 가치형, 턴어라운드형 등) |
| `aggressive-investment-strategist` | 투자 전략가 | 🎯 | 최종 매수/관망/매도 판정, 목표가·손절가·추천가 |

### 분석 파이프라인 (시각화 참고)

```
Wave 1 (병렬):   재무 분석 ─────┐
                  업종 리서치 ────┤
                  뉴스 분석 ──────┼── Wave 1b: 밸류에이션 분석
                  기술적 분석 ────┘         │
                                           ▼
Wave 2:          투자 유형 분류 → 최종 투자 전략
```

---

## 디자인 가이드

### 색상 (데스크탑 앱과 톤 일치)

```css
:root {
  --primary: #007aff;        /* 앱 accent */
  --primary-hover: #0062cc;
  --primary-light: rgba(0, 122, 255, 0.08);
  --bg-primary: #f2f2f7;     /* 앱 배경 */
  --bg-white: #ffffff;
  --text-primary: #1c1c1e;   /* 앱 텍스트 */
  --text-secondary: #6c6c70;
  --text-tertiary: #aeaeb2;
  --success: #34c759;
  --border: rgba(0, 0, 0, 0.08);
}
```

### 스타일 방향

- iOS 스타일 미니멀 디자인
- 깨끗한 카드 UI, 부드러운 그림자, 둥근 모서리 (`border-radius: 12px~16px`)
- 부드러운 전환 효과 (`transition: 0.3s ease`)
- 한국어 기본 폰트: 시스템 폰트 스택 (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
- 모바일 반응형 필수 (미디어 쿼리: `768px`, `1024px` 브레이크포인트)

---

## 코드 규칙

### HTML

- 시맨틱 태그 필수 (`<section>`, `<nav>`, `<header>`, `<footer>`, `<article>`)
- 각 섹션에 고유 `id` 부여 (앵커 네비게이션용)
- SEO 메타 태그: `title`, `meta description`, `og:title`, `og:description`, `og:image`
- `lang="ko"` 설정
- 외부 리소스 최소화 (폰트, 아이콘은 시스템 리소스 또는 인라인 SVG 사용)

### CSS

- CSS 변수(custom properties) 사용하여 테마 관리
- BEM 또는 섹션 기반 네이밍 (`hero__title`, `features__card`, `download__btn`)
- 모바일 우선 접근: 기본 스타일 → `min-width` 미디어 쿼리로 확장
- 불필요한 `!important` 금지
- 애니메이션은 `transform`, `opacity` 위주 (성능)

### JavaScript

- ES6+ 문법 사용 (const/let, 화살표 함수, 템플릿 리터럴)
- 즉시 실행 또는 `DOMContentLoaded`에서 초기화
- 기능별 함수 분리: `detectOS()`, `initNavigation()`, `initFAQ()`, `initScrollAnimations()`
- 반복 데이터(에이전트 목록, FAQ 등)는 배열/객체로 정의 후 DOM 동적 생성
- 전역 변수 최소화 (IIFE 또는 모듈 패턴)
- 다운로드 URL 등 설정값은 파일 상단에 상수로 모아 관리

---

## 보안 규칙

- 다운로드 링크는 HTTPS만 허용
- 외부 스크립트 최소화
- 인라인 이벤트 핸들러(`onclick` 등) 대신 `addEventListener` 사용
- 사용자 입력이 없는 정적 사이트이므로 XSS 위험 낮음, 그래도 `innerHTML` 사용 시 주의

---

## 개발/배포

```bash
# 로컬 확인 — 파일을 직접 열거나 간단한 서버 사용
open index.html                              # macOS
npx serve .                                  # 또는 간단한 정적 서버
python3 -m http.server 3000                  # Python 서버

# 배포 — 정적 호스팅에 폴더 그대로 업로드
# GitHub Pages, Netlify, Vercel, S3 등
```

---

## 관련 프로젝트

- **데스크탑 앱 소스**: `../desktop/` — Electron 앱
- **빌드 결과물**: `../desktop/dist/` — 패키징된 설치 파일
- **빌드 설정**: `../desktop/electron-builder.yml` — 파일명, 플랫폼 설정 참고
- **앱 디자인 토큰**: `../desktop/src/renderer/src/assets/base.css` — 색상, 간격 변수
