/**
 * AI 투자 솔루션 — 웹사이트 메인 JavaScript
 *
 * 기능: OS 감지, 다운로드 CTA, Features/Agents/FAQ 동적 렌더링,
 *       네비게이션, 스크롤 애니메이션
 *
 * 데이터는 data.js에서 전역으로 제공됩니다.
 */

(() => {
  'use strict';

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

    const winIcon = `<img src="assets/images/common/win.png" alt="Windows" class="hero__btn-icon">`;
    const macIcon = `<img src="assets/images/common/mac_black.png" alt="macOS" class="hero__btn-icon">`;

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
          <img src="${item.image}" alt="${item.caption}" class="screenshots__image" loading="lazy"${item.objectPosition ? ` style="object-position: ${item.objectPosition}"` : ''}>
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

    container.innerHTML = DOWNLOAD_DATA.map(item => {
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
  // Footer 렌더링
  // ===========================
  function renderFooter() {
    const container = document.querySelector('.footer__container');
    if (!container) return;

    const linksHTML = FOOTER_DATA.links.map(link => `<a href="${link.href}">${link.label}</a>`).join('');

    container.innerHTML = `
      <div class="footer__links">${linksHTML}</div>
      <div class="footer__copyright">
        <p>${FOOTER_DATA.author}</p>
        <p>EMAIL: ${FOOTER_DATA.email}</p>
      </div>
    `;
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
    renderFooter();
    initScreenshots();
    initFAQ();
    initNavigation();
    initScrollAnimations();
  });
})();
