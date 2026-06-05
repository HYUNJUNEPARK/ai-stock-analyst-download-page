/**
 * AI 투자 솔루션 — 웹사이트 메인 JavaScript
 *
 * 기능: OS 감지, 다운로드 CTA, Features/Agents/FAQ 동적 렌더링,
 *       네비게이션, 스크롤 애니메이션
 */

(() => {
  'use strict';

  // ===========================
  // 상수 — 다운로드 URL (추후 CDN/릴리스 URL로 교체)
  // ===========================
  const DOWNLOAD_URLS = {
    windows: 'https://github.com/HYUNJUNEPARK/ai-stock-analyst-desktop/releases/latest/download/ai-stock-analytics-setup-windows.exe',
    mac: 'https://github.com/HYUNJUNEPARK/ai-stock-analyst-desktop/releases/latest/download/ai-stock-analytics-setup-mac.dmg'
  };

  // ===========================
  // 데이터 — Screenshots
  // ===========================
  const SCREENSHOTS_DATA = [
    {
      image: 'assets/images/01-preview-login.png',
      caption: '로그인 및 AI 모델 선택'
    },
    {
      image: 'assets/images/02-preview-prompt.png',
      caption: '종목 입력 및 분석 요청'
    },
    {
      image: 'assets/images/03-preview-process.png',
      caption: 'AI 에이전트 분석 진행'
    },
    {
      image: 'assets/images/04-preview-report.png',
      caption: '투자 리포트 결과'
    }
  ];

  // ===========================
  // 데이터 — Features
  // ===========================
  const FEATURES_DATA = [
    {
      image: 'assets/images/01-multi-agent.png',
      title: 'AI 에이전트 분석',
      desc: '7개 전문 AI 에이전트가 재무, 업종, 뉴스, 기술적 분석을 병렬로 수행합니다.'
    },
    {
      image: 'assets/images/02-ai-model-select.png',
      title: 'AI 모델 선택',
      desc: 'GPT 또는 Claude 모델 중 원하는 AI를 선택하여 분석할 수 있습니다.<br>(* Claude는 준비 중)'
    },
    {
      image: 'assets/images/03-report-generation.png',
      title: '투자 리포트 생성',
      desc: '종합 투자 리포트를 자동 생성하고 PDF로 내보낼 수 있습니다.'
    },
    {
      image: 'assets/images/04-parallel-pipeline.png',
      title: '병렬 파이프라인',
      desc: '최대 4개 에이전트가 동시에 분석하여 빠른 결과를 제공합니다.'
    },
    {
      image: 'assets/images/05-invest-type.png',
      title: '투자 유형 분류',
      desc: '성장형, 가치형, 턴어라운드형 등 6가지 유형으로 종목을 자동 분류합니다.'
    },
    {
      image: 'assets/images/06-buy-sell-verdict.png',
      title: '매수/매도 판정',
      desc: '재무 건전성, 업종 방향성, 시장 심리를 종합한 최종 투자 판단을 제시합니다.'
    }
  ];

  // ===========================
  // 데이터 — Agents
  // ===========================
  const AGENTS_DATA = [
    {
      image: 'assets/images/01-financial-analyst.png',
      title: '재무 분석가',
      desc: '매출 추이, 영업이익률, PER, PBR, ROE, 부채비율 등 재무 건전성 분석'
    },
    {
      image: 'assets/images/02-sector-researcher.png',
      title: '업종 리서처',
      desc: '글로벌 시장 흐름, 경쟁사 비교, 정책·규제 변화, 업종 전망 분석'
    },
    {
      image: 'assets/images/03-news-sentiment.png',
      title: '뉴스 분석가',
      desc: '최근 뉴스 수집, 호재·악재 분류, 시장 심리 판정'
    },
    {
      image: 'assets/images/04-price-analyst.png',
      title: '기술적 분석가',
      desc: '이동평균, RSI, MACD, 볼린저밴드, 지지·저항선 분석'
    },
    {
      image: 'assets/images/05-valuation-analyst.png',
      title: '밸류에이션 분석가',
      desc: '증권사 목표주가, 적정주가 시나리오(보수·기준·낙관) 산출'
    },
    {
      image: 'assets/images/06-invest-classifier.png',
      title: '투자 유형 분류기',
      desc: '6가지 유형(성장형, 가치형, 턴어라운드형 등)으로 분류'
    },
    {
      image: 'assets/images/07-investment-strategist.png',
      title: '투자 전략가',
      desc: '최종 매수/관망/매도 판정, 목표가·손절가·매수 추천가 제시'
    }
  ];

  // ===========================
  // 데이터 — FAQ
  // ===========================
  const FAQ_DATA = [
    {
      q: 'AI 투자 솔루션은 무료인가요?',
      a: '앱 자체는 무료로 다운로드 가능합니다. 다만 AI 분석 수행을 위해 사용자 계정의 GPT 또는 Claude 권한이 필요하며, 해당 AI 모델 사용료는 각 서비스 제공자의 요금 정책에 따릅니다.'
    },
    {
      q: '앱 설치 전에 준비해야 할 것이 있나요?',
      a: '네, AI 분석에 필요한 CLI 도구(Claude Code, Codex)가 npm을 통해 설치되므로 Node.js가 사전에 설치되어 있어야 합니다. <a href="https://nodejs.org/ko/download" target="_blank" rel="noopener noreferrer">Node.js 공식 사이트</a>에서 LTS 버전을 다운로드하여 설치한 뒤, 터미널에서 <code><b>node -v</b></code>와 <code><b>npm -v</b></code> 명령어로 정상 설치를 확인해 주세요.'
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
      q: '분석 결과를 어떻게 활용해야 하나요?',
      a: 'AI 분석 결과는 투자 참고 자료로 활용하시기 바랍니다. 최종 투자 판단은 본인의 책임 하에 이루어져야 하며, 어떠한 투자 손실에 대해서도 앱은 책임지지 않습니다.'
    },
    {
      q: '모바일에서도 사용할 수 있나요?',
      a: '현재는 Windows와 macOS 데스크탑 환경에서만 사용할 수 있습니다. 모바일(iOS, Android) 버전은 지원하지 않으며, 향후 지원 여부는 검토 중입니다.'
    }
  ];

  // ===========================
  // 데이터 — Download
  // ===========================
  const DOWNLOAD_DATA = [
    {
      os: 'windows',
      icon: 'assets/images/win.png',
      title: 'Windows',
      file: 'ai-stock-analytics-setup-windows.exe',
      url: DOWNLOAD_URLS.windows,
      requirements: ['Windows 10 이상', '4GB RAM 이상', '500MB 디스크 여유 공간', '인터넷 연결 필요']
    },
    {
      os: 'mac',
      icon: 'assets/images/mac_black.png',
      title: 'macOS',
      file: 'ai-stock-analytics-setup-mac.dmg',
      url: DOWNLOAD_URLS.mac,
      requirements: ['macOS 12 (Monterey) 이상', '4GB RAM 이상', '500MB 디스크 여유 공간', '인터넷 연결 필요']
    }
  ];

  // ===========================
  // OS 감지
  // ===========================
  function isMobile() {
    return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  function detectOS() {
    if (isMobile()) return 'mobile';
    const ua = navigator.userAgent;
    if (ua.includes('Win')) return 'windows';
    if (ua.includes('Mac')) return 'mac';
    return 'other';
  }

  // ===========================
  // Hero CTA 렌더링
  // ===========================
  function renderHeroCTA() {
    const container = document.getElementById('heroCTA');
    if (!container) return;

    const os = detectOS();
    const mobile = os === 'mobile';

    const winIcon = `<img src="assets/images/win.png" alt="Windows" class="hero__btn-icon">`;
    const macIcon = `<img src="assets/images/mac_black.png" alt="macOS" class="hero__btn-icon">`;

    if (mobile) {
      container.innerHTML = `
        <span class="hero__btn hero__btn--disabled">${winIcon} Windows용 다운로드</span>
        <span class="hero__btn hero__btn--disabled">${macIcon} macOS용 다운로드</span>
        <p class="hero__mobile-notice">데스크탑(PC/Mac)에서 다운로드할 수 있습니다.</p>
      `;
      return;
    }

    const winClass = `hero__btn hero__btn--secondary${os === 'windows' ? ' hero__btn--detected' : ''}`;
    const macClass = `hero__btn hero__btn--secondary${os === 'mac' ? ' hero__btn--detected' : ''}`;

    container.innerHTML = `
      <a href="${DOWNLOAD_URLS.windows}" class="${winClass}">${winIcon} Windows용 다운로드</a>
      <a href="${DOWNLOAD_URLS.mac}" class="${macClass}">${macIcon} macOS용 다운로드</a>
    `;
  }

  // ===========================
  // Screenshots 렌더링 + 슬라이더
  // ===========================
  function renderScreenshots() {
    const track = document.getElementById('screenshotsTrack');
    const dotsContainer = document.getElementById('screenshotsDots');
    if (!track || !dotsContainer) return;

    track.innerHTML = SCREENSHOTS_DATA.map(item => `
      <div class="screenshots__slide">
        <div class="screenshots__image-wrap">
          <img src="${item.image}" alt="${item.caption}" class="screenshots__image" loading="lazy">
        </div>
        <p class="screenshots__caption">${item.caption}</p>
      </div>
    `).join('');

    dotsContainer.innerHTML = SCREENSHOTS_DATA.map((_, i) => `
      <button class="screenshots__dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="슬라이드 ${i + 1}"></button>
    `).join('');
  }

  function initScreenshots() {
    const track = document.getElementById('screenshotsTrack');
    const dots = document.getElementById('screenshotsDots');
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    if (!track || !dots) return;

    let current = 0;
    const total = SCREENSHOTS_DATA.length;

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.querySelectorAll('.screenshots__dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    prevBtn?.addEventListener('click', () => goTo(current - 1));
    nextBtn?.addEventListener('click', () => goTo(current + 1));
    dots.addEventListener('click', (e) => {
      const dot = e.target.closest('.screenshots__dot');
      if (dot) goTo(Number(dot.dataset.index));
    });

    // 스와이프 지원
    let startX = 0;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
    track.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    });
  }

  // ===========================
  // Features 렌더링
  // ===========================
  function renderFeatures() {
    const grid = document.getElementById('featuresGrid');
    if (!grid) return;

    grid.innerHTML = FEATURES_DATA.map(item => `
      <article class="features__card fade-in">
        <div class="features__card-image-wrap">
          <img src="${item.image}" alt="${item.title}" class="features__card-image" loading="lazy">
        </div>
        <h3 class="features__card-title">${item.title}</h3>
        <p class="features__card-desc">${item.desc}</p>
      </article>
    `).join('');
  }

  // ===========================
  // Agents 렌더링
  // ===========================
  function renderAgents() {
    const grid = document.getElementById('agentsGrid');
    if (!grid) return;

    grid.innerHTML = AGENTS_DATA.map(item => `
      <article class="agents__card fade-in">
        <div class="agents__card-image-wrap">
          <img src="${item.image}" alt="${item.title}" class="agents__card-image" loading="lazy">
        </div>
        <h3 class="agents__card-title">${item.title}</h3>
        <p class="agents__card-desc">${item.desc}</p>
      </article>
    `).join('');
  }

  // ===========================
  // Download 렌더링
  // ===========================
  function renderDownload() {
    const container = document.getElementById('downloadCards');
    if (!container) return;

    const os = detectOS();

    const mobile = os === 'mobile';

    container.innerHTML = DOWNLOAD_DATA.map((item, i) => {
      const isDetected = !mobile && item.os === os;
      const badgeHTML = isDetected ? '<span class="download__card-badge">사용 중인 OS</span>' : '';

      const reqHTML = item.requirements.map(r => `<li>${r}</li>`).join('');

      let btnHTML;
      if (mobile) {
        btnHTML = `<span class="download__btn download__btn--disabled">다운로드</span>`;
      } else {
        const btnClass = isDetected ? 'download__btn download__btn--primary' : 'download__btn download__btn--secondary';
        btnHTML = `<a href="${item.url}" class="${btnClass}">다운로드</a>`;
      }

      return `
        <div class="download__card fade-in${isDetected ? ' download__card--detected' : ''}">
          ${badgeHTML}
          <img src="${item.icon}" alt="${item.title}" class="download__card-icon">
          <h3 class="download__card-title">${item.title}</h3>
          <p class="download__card-file">${item.file}</p>
          ${btnHTML}
          <div class="download__card-requirements">
            <span class="download__card-requirements-title">시스템 요구사항</span>
            <ul class="download__card-requirements-list">${reqHTML}</ul>
          </div>
        </div>
      `;
    }).join('');

  }

  // ===========================
  // FAQ 렌더링 + 토글
  // ===========================
  function renderFAQ() {
    const list = document.getElementById('faqList');
    if (!list) return;

    list.innerHTML = FAQ_DATA.map(item => `
      <div class="faq__item">
        <button class="faq__question" type="button" aria-expanded="false">
          <span>${item.q}</span>
          <span class="faq__icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </span>
        </button>
        <div class="faq__answer">
          <p class="faq__answer-text">${item.a}</p>
        </div>
      </div>
    `).join('');
  }

  function initFAQ() {
    const list = document.getElementById('faqList');
    if (!list) return;

    list.addEventListener('click', (e) => {
      const button = e.target.closest('.faq__question');
      if (!button) return;

      const item = button.closest('.faq__item');
      const isOpen = item.classList.contains('open');

      // Close all
      list.querySelectorAll('.faq__item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // ===========================
  // Navigation
  // ===========================
  function initNavigation() {
    const hamburger = document.getElementById('navHamburger');
    const menu = document.getElementById('navMenu');

    if (!hamburger || !menu) return;

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      menu.classList.toggle('open');
    });

    // Close menu on link click
    menu.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav__link')) {
        hamburger.classList.remove('open');
        menu.classList.remove('open');
      }
    });

    // Active link on scroll
    const navLinks = document.querySelectorAll('.nav__link');
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 60;

    // 네비게이션 링크가 있는 섹션만 수집
    const navSections = Array.from(navLinks)
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    function updateActiveLink() {
      const atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2;
      let currentId = '';

      if (atBottom) {
        currentId = navSections[navSections.length - 1]?.id || '';
      } else {
        const scrollY = window.scrollY + navHeight + 1;
        for (let i = navSections.length - 1; i >= 0; i--) {
          if (navSections[i].offsetTop <= scrollY) {
            currentId = navSections[i].id;
            break;
          }
        }
      }

      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  // ===========================
  // Scroll Animations
  // ===========================
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  // ===========================
  // 초기화
  // ===========================
  document.addEventListener('DOMContentLoaded', () => {
    renderHeroCTA();
    renderScreenshots();
    renderFeatures();
    renderAgents();
    renderDownload();
    renderFAQ();
    initScreenshots();
    initFAQ();
    initNavigation();
    initScrollAnimations();
  });
})();
