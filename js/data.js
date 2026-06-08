/**
 * AI 투자 솔루션 — 데이터 정의
 *
 * 모든 콘텐츠 데이터를 한곳에서 관리합니다.
 * Next.js 전환 시 그대로 import하여 사용할 수 있습니다.
 */

const DOWNLOAD_URLS = {
  windows: 'https://github.com/HYUNJUNEPARK/ai-stock-analyst-desktop/releases/latest/download/ai-stock-analytics-setup-windows.exe',
  mac: 'https://github.com/HYUNJUNEPARK/ai-stock-analyst-desktop/releases/latest/download/ai-stock-analytics-setup-mac.dmg'
};

const SCREENSHOTS_DATA = [
  {
    image: 'assets/images/screenshots/preview-login.png',
    caption: '로그인 및 AI 모델 선택'
  },
  {
    image: 'assets/images/screenshots/preview-prompt.png',
    caption: '종목 입력 및 분석 요청'
  },
  {
    image: 'assets/images/screenshots/preview-process.png',
    caption: 'AI 에이전트 분석 진행',
    objectPosition: 'center 5%'
  },
  {
    image: 'assets/images/screenshots/preview-report.png',
    caption: '투자 리포트 결과'
  }
];

const FEATURES_DATA = [
  {
    image: 'assets/images/features/multi-agent.png',
    title: 'AI 에이전트 분석',
    desc: '7개 전문 AI 에이전트가 재무, 업종, 뉴스, 기술적 분석을 병렬로 수행합니다.'
  },
  {
    image: 'assets/images/features/ai-model-select.png',
    title: 'AI 모델 선택',
    desc: 'GPT 또는 Claude 모델 중 원하는 AI를 선택하여 분석할 수 있습니다.<br>(* Claude는 준비 중)'
  },
  {
    image: 'assets/images/features/report-generation.png',
    title: '투자 리포트 생성',
    desc: '종합 투자 리포트를 자동 생성하고 PDF로 내보낼 수 있습니다.'
  },
  {
    image: 'assets/images/features/parallel-pipeline.png',
    title: '병렬 파이프라인',
    desc: '최대 4개 에이전트가 동시에 분석하여 빠른 결과를 제공합니다.'
  },
  {
    image: 'assets/images/features/invest-type.png',
    title: '투자 유형 분류',
    desc: '성장형, 가치형, 턴어라운드형 등 6가지 유형으로 종목을 자동 분류합니다.'
  },
  {
    image: 'assets/images/features/buy-sell-verdict.png',
    title: '매수/매도 판정',
    desc: '재무 건전성, 업종 방향성, 시장 심리를 종합한 최종 투자 판단을 제시합니다.'
  }
];

const AGENTS_DATA = [
  {
    image: 'assets/images/agents/financial-analyst.png',
    title: '재무 분석가',
    desc: '매출 추이, 영업이익률, PER, PBR, ROE, 부채비율 등 재무 건전성 분석'
  },
  {
    image: 'assets/images/agents/sector-researcher.png',
    title: '업종 리서처',
    desc: '글로벌 시장 흐름, 경쟁사 비교, 정책·규제 변화, 업종 전망 분석'
  },
  {
    image: 'assets/images/agents/news-sentiment.png',
    title: '뉴스 분석가',
    desc: '최근 뉴스 수집, 호재·악재 분류, 시장 심리 판정'
  },
  {
    image: 'assets/images/agents/price-analyst.png',
    title: '기술적 분석가',
    desc: '이동평균, RSI, MACD, 볼린저밴드, 지지·저항선 분석'
  },
  {
    image: 'assets/images/agents/valuation-analyst.png',
    title: '밸류에이션 분석가',
    desc: '증권사 목표주가, 적정주가 시나리오(보수·기준·낙관) 산출'
  },
  {
    image: 'assets/images/agents/invest-classifier.png',
    title: '투자 유형 분류기',
    desc: '6가지 유형(성장형, 가치형, 턴어라운드형 등)으로 분류'
  },
  {
    image: 'assets/images/agents/investment-strategist.png',
    title: '투자 전략가',
    desc: '최종 매수/관망/매도 판정, 목표가·손절가·매수 추천가 제시'
  }
];

const FAQ_DATA = [
  {
    q: 'AI 투자 솔루션은 무료인가요?',
    a: '앱 자체는 무료로 다운로드 가능합니다. 다만 AI 분석 수행을 위해 사용자 계정의 GPT 또는 Claude 권한이 필요하며, 해당 AI 모델 사용료는 각 서비스 제공자의 요금 정책에 따릅니다.'
  },
  {
    q: '개인정보를 수집하나요?',
    a: '아니요, AI 투자 솔루션은 별도의 서버를 운영하지 않으며 모든 분석은 사용자의 PC에서 로컬로 실행됩니다. 개인정보를 수집·저장·전송하지 않습니다. AI 분석 요청은 사용자 본인의 계정(OpenAI, Anthropic)을 통해 직접 이루어집니다.'
  },
  {
    q: '앱 설치 전에 준비해야 할 것이 있나요?',
    a: '네, AI 분석에 필요한 CLI 도구(Claude Code, Codex)가 npm을 통해 설치되므로 Node.js가 사전에 설치되어 있ㄴ어야 합니다. <a href="https://nodejs.org/ko/download" target="_blank" rel="noopener noreferrer">Node.js 공식 사이트</a>에서 LTS 버전을 다운로드하여 설치한 뒤, 터미널에서 <code><b>node -v</b></code>와 <code><b>npm -v</b></code> 명령어로 정상 설치를 확인해 주세요.'
  },
  {
    q: 'Windows에서 설치 파일 다운로드 시 "일반적으로 다운로드되지 않습니다" 경고가 표시됩니다.',
    a: 'Microsoft Edge 브라우저에서 발생하는 보안 경고로, 설치 파일 자체의 문제는 아닙니다.<br><br><a href="https://www.google.com/chrome" target="_blank" rel="noopener noreferrer">Chrome</a> 등 다른 브라우저를 사용하여 다운로드하면 해당 경고 없이 정상적으로 설치 파일을 받을 수 있습니다.'
  },
  {
    q: 'macOS에서 DMG 파일 실행 시 "손상되었기 때문에 열 수 없습니다" 오류가 발생합니다.',
    a: '현재 앱에 Apple 코드 서명이 적용되지 않아 macOS 가 실행을 차단하는 현상입니다. 터미널을 열고 아래 명령어를 입력한 뒤 DMG 파일을 다시 열면 정상 설치할 수 있습니다.<br><br><code><b style="color:#000">xattr -cr ~/Applications/ai-stock-analytics.app</b></code><br><br>위 명령어는 macOS가 인터넷 다운로드 파일에 자동 부여하는 속성을 제거합니다. 정식 출시 이후 Apple 코드 서명 및 공증을 적용하여 별도 조치 없이 바로 실행할 수 있도록 개선할 예정입니다.'
  },
  {
    q: 'GPT와 Claude 중 어떤 모델을 선택해야 하나요?',
    a: '두 모델 모두 우수한 분석 결과를 제공합니다. GPT는 Codex CLI를, Claude는 Claude Code를 활용합니다. 이미 사용 중인 AI 모델이 있다면 해당 모델을 선택하시면 됩니다.'
  },
  {
    q: '분석에 얼마나 걸리나요?',
    a: '최대 4개 에이전트가 병렬로 동작하므로 일반적으로 4~8분 내에 전체 분석이 완료됩니다. 네트워크 상태와 AI 모델 응답 속도에 따라 다소 차이가 있을 수 있습니다.'
  },
  {
    q: '해외 종목도 분석할 수 있나요?',
    a: '네, 한국 주식(KOSPI, KOSDAQ)은 물론 미국 주식(NYSE, NASDAQ)도 분석할 수 있습니다. 종목명 또는 티커(예: AAPL, TSLA)를 입력하면 자동으로 인식하여 분석을 진행합니다.'
  },
  {
    q: '모바일에서도 사용할 수 있나요?',
    a: '현재는 Windows와 macOS 데스크탑 환경에서만 사용할 수 있습니다. 모바일(iOS, Android) 버전은 지원하지 않으며, 향후 지원 여부는 검토 중입니다.'
  }
];

const DOWNLOAD_DATA = [
  {
    os: 'windows',
    icon: 'assets/images/common/win.png',
    title: 'Windows',
    file: 'ai-stock-analytics-setup-windows.exe',
    url: DOWNLOAD_URLS.windows,
    requirements: ['Windows 10 이상', '4GB RAM 이상', '500MB 디스크 여유 공간', '인터넷 연결 필요']
  },
  {
    os: 'mac',
    icon: 'assets/images/common/mac_black.png',
    title: 'macOS',
    file: 'ai-stock-analytics-setup-mac.dmg',
    url: DOWNLOAD_URLS.mac,
    requirements: ['macOS 12 (Monterey) 이상', '4GB RAM 이상', '500MB 디스크 여유 공간', '인터넷 연결 필요']
  }
];

const FOOTER_DATA = {
  links: [
    { href: '#screenshots', label: '미리보기' },
    { href: '#features', label: '기능' },
    { href: '#agents', label: '에이전트' },
    { href: '#download', label: '다운로드' },
    { href: '#faq', label: 'FAQ' }
  ],
  author: 'hyunjune park',
  email: 'june2ac4dev@gmail.com'
};
