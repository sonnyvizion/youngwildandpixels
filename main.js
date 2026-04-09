/* ==============================================
   MAIN.JS - Application Entry Point
   ============================================== */

import { initNavigation } from './src/js/modules/navigation.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import lottie from 'lottie-web';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  console.log('Young, Wild & Pixel Agency - Loading...');
  const PAGE_LOADER_ENABLED = true;
  const SITE_LOADER_SEEN_KEY = 'site-loader-seen';

  gsap.registerPlugin(ScrollTrigger);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const homePaths = new Set([
    '',
    '/index.html',
    '/fr',
    '/fr/index.html',
    '/en',
    '/en/index.html',
    '/youngwildandpixels',
    '/youngwildandpixels/index.html',
    '/youngwildandpixels/fr',
    '/youngwildandpixels/fr/index.html',
    '/youngwildandpixels/en',
    '/youngwildandpixels/en/index.html'
  ]);
  const getSiteBase = () => {
    const path = window.location.pathname;
    if (path === '/youngwildandpixels' || path.startsWith('/youngwildandpixels/')) {
      return '/youngwildandpixels';
    }
    return '';
  };
  const isHomePath = () => {
    const path = window.location.pathname.replace(/\/+$/, '');
    return homePaths.has(path);
  };
  const createPageLoader = () => {
    if (!PAGE_LOADER_ENABLED) return null;

    let loader = document.querySelector('#page-loader');
    if (loader) return loader;

    const isFrench = (document.documentElement.lang || '').toLowerCase().startsWith('fr');
    const title = isFrench
      ? `Relax,<br><span class="loader-dks">ca</span> arrive !`
      : `Relax,<br><span class="loader-dks">it's</span> coming!`;

    loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.className = 'page-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = `
      <div class="page-loader-inner">
        <div class="page-loader-title">${title}</div>
        <div class="page-loader-lottie" data-lottie="${getSiteBase()}/img/loader.json" aria-label="Loading animation"></div>
        <div class="page-loader-progress">
          <div class="page-loader-bar">
            <div class="page-loader-bar-fill"></div>
          </div>
          <div class="page-loader-percent">0%</div>
        </div>
      </div>
    `;

    document.body.prepend(loader);
    return loader;
  };
  const resetPageLoader = (loader) => {
    if (!loader) return;

    const barFill = loader.querySelector('.page-loader-bar-fill');
    const percentEl = loader.querySelector('.page-loader-percent');

    gsap.killTweensOf(loader);
    loader.classList.remove('is-active');
    document.body.classList.remove('is-loading');
    gsap.set(loader, { clearProps: 'transform' });

    if (barFill) gsap.set(barFill, { scaleX: 0 });
    if (percentEl) percentEl.textContent = '0%';
  };
  let lastViewportWidth = window.innerWidth;
  const hasMeaningfulResize = () => {
    if (!isTouch) return true;
    const widthDelta = Math.abs(window.innerWidth - lastViewportWidth);
    return widthDelta > 2;
  };
  if (isTouch) {
    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true
    });
  }
  let lenis;
  if (!prefersReducedMotion && !isTouch) {
    lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  // Initialize navigation
  initNavigation();
  if (isHomePath()) {
    createPageLoader();
  }

  // Hero — new editorial layout animations
  const heroTagline = document.querySelector('.hero-tagline');
  const heroPartners = document.querySelector('.hero-partners');
  const heroGalleryCards = document.querySelectorAll('.hero-gallery-card');
  const heroLogos = document.querySelector('.hero-logos');

  const initHeroLogosMarquee = () => {
    if (!heroLogos) return;
    if (heroLogos.dataset.marqueeReady === '1') return;

    const logos = Array.from(heroLogos.querySelectorAll('.hero-logo'));
    if (!logos.length) return;

    const track = document.createElement('div');
    track.className = 'hero-logos-track';

    logos.forEach((logo) => {
      track.appendChild(logo);
    });

    logos.forEach((logo) => {
      const clone = logo.cloneNode(true);
      clone.classList.add('is-clone');
      clone.setAttribute('aria-hidden', 'true');
      clone.alt = '';
      track.appendChild(clone);
    });

    heroLogos.innerHTML = '';
    heroLogos.appendChild(track);
    heroLogos.dataset.marqueeReady = '1';
  };

  initHeroLogosMarquee();

  const heroBrandMark = document.querySelector('.hero-brand-mark');
  if (heroBrandMark && !prefersReducedMotion) {
    gsap.from(heroBrandMark, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.1
    });
  }

  if (heroTagline && !prefersReducedMotion) {
    gsap.from(heroTagline, {
      y: 16,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.28
    });
  }

  if (heroPartners && !prefersReducedMotion) {
    gsap.from(heroPartners.querySelectorAll('.hero-partner'), {
      y: 10,
      opacity: 0,
      duration: 0.5,
      ease: 'power1.out',
      stagger: 0.08,
      delay: 0.5
    });
  }

  if (heroGalleryCards.length && !prefersReducedMotion) {
    gsap.from(heroGalleryCards, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.1,
      delay: 0.6
    });
  }

  // -------------------------------------------------------
  // Hero gallery — canvas-based pixelation on hover
  // Works for both <img> and <video> media types
  // -------------------------------------------------------
  const initPixelateGallery = () => {
    const PIXEL_SIZE = 14; // lower = more pixelated

    document.querySelectorAll('.hero-gallery-card').forEach((card) => {
      const wrapper = card.querySelector('.hero-gallery-img');
      if (!wrapper) return;

      const media = wrapper.querySelector('img, video');
      if (!media) return;

      const projectTitle = (card.querySelector('.hero-gallery-name')?.textContent || '').trim();
      let curtain = wrapper.querySelector('.hero-gallery-curtain');
      if (!curtain) {
        curtain = document.createElement('div');
        curtain.className = 'hero-gallery-curtain';
        const title = document.createElement('span');
        title.className = 'hero-gallery-curtain-title';
        title.textContent = projectTitle;
        curtain.appendChild(title);
        wrapper.appendChild(curtain);
      }
      curtain.classList.remove('is-visible');
      let curtainTimer = null;

      const isVideo = media.tagName === 'VIDEO';

      // Create the canvas overlay once per card
      const canvas = document.createElement('canvas');
      canvas.className = 'pixel-canvas';
      wrapper.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      let rafId = null;
      let pixelSize = 0; // animated from 0 → PIXEL_SIZE → 0

      const drawFrame = () => {
        const w = wrapper.offsetWidth;
        const h = wrapper.offsetHeight;
        if (!w || !h) return;

        // Sample grid resolution based on current animated pixel size
        const ps = Math.max(1, Math.round(pixelSize));
        const cols = Math.ceil(w / ps);
        const rows = Math.ceil(h / ps);

        canvas.width = cols;
        canvas.height = rows;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';

        try {
          ctx.drawImage(media, 0, 0, cols, rows);
        } catch (_) {
          // Silently fail (e.g. video not ready yet)
        }
      };

      const rafLoop = () => {
        drawFrame();
        if (isVideo) rafId = requestAnimationFrame(rafLoop);
      };

      const startPixelate = () => {
        if (prefersReducedMotion) return;
        cancelAnimationFrame(rafId);
        clearTimeout(curtainTimer);
        curtain.classList.remove('is-visible');
        curtainTimer = window.setTimeout(() => {
          curtain.classList.add('is-visible');
        }, 300);

        // Tween pixel size 0 → PIXEL_SIZE
        gsap.to({ ps: 1 }, {
          ps: PIXEL_SIZE,
          duration: 0.35,
          ease: 'power2.out',
          onUpdate: function () {
            pixelSize = this.targets()[0].ps;
            if (!isVideo) drawFrame();
          },
          onStart: () => {
            canvas.classList.add('is-visible');
            if (isVideo) rafLoop();
          }
        });
      };

      const stopPixelate = () => {
        if (prefersReducedMotion) return;
        cancelAnimationFrame(rafId);
        clearTimeout(curtainTimer);
        curtain.classList.remove('is-visible');

        gsap.to({ ps: pixelSize }, {
          ps: 1,
          duration: 0.25,
          ease: 'power1.in',
          onUpdate: function () {
            pixelSize = this.targets()[0].ps;
            if (!isVideo) drawFrame();
          },
          onComplete: () => {
            canvas.classList.remove('is-visible');
          }
        });
      };

      // Touch: skip hover (no mouseenter on touch)
      if (isTouch) return;

      card.addEventListener('mouseenter', startPixelate);
      card.addEventListener('mouseleave', stopPixelate);
    });
  };

  initPixelateGallery();

  // Same pixelation for spotlight
  const initPixelateSpotlight = () => {
    if (isTouch || prefersReducedMotion) return;

    document.querySelectorAll('.hero-spotlight-img-wrap').forEach((wrap) => {
      const media = wrap.querySelector('img, video');
      if (!media) return;
      const card = wrap.closest('.hero-spotlight-card');
      const projectTitle = (card?.querySelector('.hero-spotlight-label')?.textContent || '').trim();

      let curtain = wrap.querySelector('.hero-gallery-curtain');
      if (!curtain) {
        curtain = document.createElement('div');
        curtain.className = 'hero-gallery-curtain';
        const title = document.createElement('span');
        title.className = 'hero-gallery-curtain-title';
        title.textContent = projectTitle;
        curtain.appendChild(title);
        wrap.appendChild(curtain);
      }
      curtain.classList.remove('is-visible');
      let curtainTimer = null;

      const isVideo = media.tagName === 'VIDEO';
      const PIXEL_SIZE = 14;

      const canvas = document.createElement('canvas');
      canvas.className = 'pixel-canvas';
      wrap.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      let rafId = null;
      let pixelSize = 0;

      const drawFrame = () => {
        const w = wrap.offsetWidth;
        const h = wrap.offsetHeight;
        if (!w || !h) return;
        const ps = Math.max(1, Math.round(pixelSize));
        canvas.width = Math.ceil(w / ps);
        canvas.height = Math.ceil(h / ps);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        try { ctx.drawImage(media, 0, 0, canvas.width, canvas.height); } catch (_) {}
      };

      const rafLoop = () => { drawFrame(); if (isVideo) rafId = requestAnimationFrame(rafLoop); };

      wrap.addEventListener('mouseenter', () => {
        cancelAnimationFrame(rafId);
        clearTimeout(curtainTimer);
        curtain.classList.remove('is-visible');
        curtainTimer = window.setTimeout(() => {
          curtain.classList.add('is-visible');
        }, 300);
        gsap.to({ ps: 1 }, {
          ps: PIXEL_SIZE, duration: 0.35, ease: 'power2.out',
          onUpdate: function () { pixelSize = this.targets()[0].ps; if (!isVideo) drawFrame(); },
          onStart: () => { canvas.classList.add('is-visible'); if (isVideo) rafLoop(); }
        });
      });

      wrap.addEventListener('mouseleave', () => {
        cancelAnimationFrame(rafId);
        clearTimeout(curtainTimer);
        curtain.classList.remove('is-visible');
        gsap.to({ ps: pixelSize }, {
          ps: 1, duration: 0.25, ease: 'power1.in',
          onUpdate: function () { pixelSize = this.targets()[0].ps; if (!isVideo) drawFrame(); },
          onComplete: () => { canvas.classList.remove('is-visible'); }
        });
      });
    });
  };

  initPixelateSpotlight();

  const initHomeScrollMediaParallax = () => {
    if (prefersReducedMotion) return;
    if (!document.querySelector('main .hero')) return;

    const targets = [
      { selector: '.hero-gallery-img', shift: 18 },
      { selector: '.hero-spotlight-img-wrap', shift: 16 },
      { selector: '.work-image', shift: 14 },
      { selector: '.ai-intro-media', shift: 14 },
      { selector: '.ai-service-media', shift: 12 },
      { selector: '.hero-display', shift: 10 },
      { selector: '.footer-display', shift: 8 }
    ];

    targets.forEach(({ selector, shift }) => {
      document.querySelectorAll(selector).forEach((element) => {
        gsap.fromTo(
          element,
          { '--media-parallax-y': '0px' },
          {
            '--media-parallax-y': `${-shift}px`,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
              invalidateOnRefresh: true
            }
          }
        );
      });
    });
  };

  initHomeScrollMediaParallax();

  const initImageRevealOnScroll = () => {
    const revealSelectors = [
      '.hero-spotlight-img-wrap',
      '.ai-intro-media',
      '.ai-service-media',
      '.work-card-media',
      '.hero-display',
      '.footer-display'
    ];
    const targets = [
      ...new Set(
        gsap.utils.toArray(revealSelectors.join(',')).filter((element) => {
          if (!(element instanceof HTMLElement)) return false;
          if (element.dataset.revealReady === '1') return false;
          return !element.closest('#page-loader');
        })
      )
    ];

    if (!targets.length) return;

    if (prefersReducedMotion) {
      targets.forEach((element) => {
        element.dataset.revealReady = '1';
        gsap.set(element, { clearProps: 'opacity,visibility,transform' });
      });
      return;
    }

    const playReveal = (element, delay = 0) => {
      gsap.to(element, {
        autoAlpha: 1,
        duration: 0.75,
        delay,
        ease: 'power2.out'
      });
    };

    targets.forEach((element, index) => {
      element.dataset.revealReady = '1';

      gsap.set(element, {
        autoAlpha: 0
      });

      const bounds = element.getBoundingClientRect();
      const isAlreadyVisible = bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0;

      if (isAlreadyVisible) {
        playReveal(element, index * 0.04);
        return;
      }

      ScrollTrigger.create({
        trigger: element,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          playReveal(element, index * 0.02);
        }
      });
    });
  };

  initImageRevealOnScroll();

  // -------------------------------------------------------
  // AI Sections — scroll-triggered animations
  // -------------------------------------------------------
  const initAIAnimations = () => {
    if (prefersReducedMotion) return;

    // Blob parallax
    const blob = document.querySelector('.ai-blob');
    if (blob) {
      gsap.to(blob, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.ai-intro-visual',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Workflow window — float up on entry
    const aiWindow = document.querySelector('.ai-window');
    if (aiWindow) {
      gsap.from(aiWindow, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aiWindow,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Workflow nodes — stagger in
    const nodes = document.querySelectorAll('.ai-node');
    if (nodes.length) {
      gsap.from(nodes, {
        scale: 0.7,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.8)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.ai-window',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Connection lines — draw in
    const lines = document.querySelectorAll('.ai-connections line, .ai-connections path');
    if (lines.length) {
      lines.forEach((line) => {
        const len = line.getTotalLength ? line.getTotalLength() : 200;
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: '.ai-window',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }

    // AI service cards — stagger up
    const serviceCards = document.querySelectorAll('.ai-service-card');
    if (serviceCards.length) {
      gsap.from(serviceCards, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.ai-services-grid',
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  };

  initAIAnimations();

  const introText = document.querySelector('.intro-text');
  const splitIntroLines = () => {
    if (!introText) return [];
    if (!introText.dataset.originalText) {
      introText.dataset.originalText = introText.textContent;
    }
    const rawText = introText.dataset.originalText || '';
    const text = rawText.replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
    if (!text) return [];

    introText.textContent = '';
    const words = text.split(' ');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      words.forEach((word, index) => {
        const wordWrap = document.createElement('span');
        wordWrap.className = 'intro-word-wrap';
        for (const ch of word) {
          const charSpan = document.createElement('span');
          charSpan.className = 'intro-char';
          charSpan.textContent = ch;
          wordWrap.appendChild(charSpan);
        }
        introText.appendChild(wordWrap);
        if (index < words.length - 1) {
          introText.appendChild(document.createTextNode(' '));
        }
      });
      return [introText];
    }

    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'intro-word';
      span.textContent = word;
      introText.appendChild(span);
      if (index < words.length - 1) {
        const space = document.createElement('span');
        space.className = 'intro-space';
        space.textContent = '\u00A0';
        introText.appendChild(space);
      }
    });

    const wordSpans = Array.from(introText.querySelectorAll('.intro-word'));
    const lines = [];
    let currentTop = null;
    let currentLine = [];
    wordSpans.forEach((span) => {
      const top = span.offsetTop;
      if (currentTop === null) currentTop = top;
      if (Math.abs(top - currentTop) > 2) {
        lines.push(currentLine);
        currentLine = [span];
        currentTop = top;
      } else {
        currentLine.push(span);
      }
    });
    if (currentLine.length) lines.push(currentLine);

    introText.innerHTML = '';
    lines.forEach((lineWords) => {
      const line = document.createElement('span');
      line.className = 'intro-line';
      lineWords.forEach((wordSpan, wordIndex) => {
        const word = wordSpan.textContent;
        const wordWrap = document.createElement('span');
        wordWrap.className = 'intro-word-wrap';
        for (const ch of word) {
          const charSpan = document.createElement('span');
          charSpan.className = 'intro-char';
          charSpan.textContent = ch;
          wordWrap.appendChild(charSpan);
        }
        line.appendChild(wordWrap);
        if (wordIndex < lineWords.length - 1) {
          const space = document.createElement('span');
          space.className = 'intro-space';
          space.textContent = '\u00A0';
          line.appendChild(space);
        }
      });
      introText.appendChild(line);
    });

    return Array.from(introText.querySelectorAll('.intro-line'));
  };

  const animateIntroLines = (lines) => {
    if (!lines.length) return;
    const chars = gsap.utils.toArray('.intro-char');
    gsap.timeline({
      scrollTrigger: {
        trigger: '.intro',
        start: 'top 80%',
        end: 'top 10%',
        scrub: true
      }
    })
    .fromTo(chars, { opacity: 0, y: 18, color: '#FFD7CC' }, { opacity: 1, y: 0, color: 'var(--color-text)', stagger: 0.01, ease: 'power1.out' }, 0);
  };

  const initIntroLines = () => {
    const lines = splitIntroLines();
    animateIntroLines(lines);
  };

  if (introText) {
    const ready = document.fonts ? document.fonts.ready : Promise.resolve();
    ready.then(() => {
      initIntroLines();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      if (!hasMeaningfulResize()) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isTouch) lastViewportWidth = window.innerWidth;
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger && st.trigger.classList && st.trigger.classList.contains('intro')) {
            st.kill();
          }
        });
        initIntroLines();
        initMarqueeScroll();
        initWorkScroll();
        ScrollTrigger.refresh();
      }, 150);
    });
  }

  const animatedTextElements = Array.from(document.querySelectorAll('[data-animated-text]'));

  const splitAnimatedText = (element) => {
    if (!element) return [];
    if (!element.dataset.originalHtml) {
      element.dataset.originalHtml = element.innerHTML;
    } else {
      element.innerHTML = element.dataset.originalHtml;
    }

    const wrapper = document.createElement('span');
    wrapper.innerHTML = element.dataset.originalHtml || '';
    const tokens = [];

    const pushSpace = () => {
      if (!tokens.length) return;
      const lastType = tokens[tokens.length - 1].type;
      if (lastType !== 'space' && lastType !== 'break') {
        tokens.push({ type: 'space' });
      }
    };

    const pushTextTokens = (text) => {
      const normalized = text.replace(/\u00A0/g, ' ');
      const parts = normalized.split(/(\s+)/).filter(Boolean);
      parts.forEach((part) => {
        if (/\s+/.test(part)) {
          pushSpace();
        } else {
          tokens.push({ type: 'word', value: part });
        }
      });
    };

    const walkNodes = (nodes) => {
      nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          pushTextTokens(node.textContent || '');
          return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const tag = node.tagName.toLowerCase();
        if (tag === 'br') {
          tokens.push({ type: 'break' });
          return;
        }
        tokens.push({ type: 'element', value: node.cloneNode(true) });
      });
    };

    walkNodes(Array.from(wrapper.childNodes));

    element.innerHTML = '';
    tokens.forEach((token) => {
      if (token.type === 'word') {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'animated-word';
        wordSpan.textContent = token.value;
        element.appendChild(wordSpan);
        return;
      }
      if (token.type === 'element') {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'animated-word';
        wordSpan.appendChild(token.value);
        element.appendChild(wordSpan);
        return;
      }
      if (token.type === 'space') {
        element.appendChild(document.createTextNode(' '));
        return;
      }
      if (token.type === 'break') {
        element.appendChild(document.createElement('br'));
      }
    });

    const wordSpans = Array.from(element.querySelectorAll('.animated-word'));
    if (!wordSpans.length) return [];

    const lines = [];
    let currentTop = null;
    let currentLine = [];
    wordSpans.forEach((wordSpan) => {
      const top = wordSpan.offsetTop;
      if (currentTop === null) currentTop = top;
      if (Math.abs(top - currentTop) > 2) {
        lines.push(currentLine);
        currentLine = [wordSpan];
        currentTop = top;
      } else {
        currentLine.push(wordSpan);
      }
    });
    if (currentLine.length) lines.push(currentLine);

    element.innerHTML = '';
    const lineInners = [];
    lines.forEach((lineWords) => {
      const line = document.createElement('span');
      line.className = 'animated-line';
      const inner = document.createElement('span');
      inner.className = 'animated-line-inner';
      lineWords.forEach((wordSpan, index) => {
        inner.appendChild(wordSpan);
        if (index < lineWords.length - 1) {
          inner.appendChild(document.createTextNode(' '));
        }
      });
      line.appendChild(inner);
      element.appendChild(line);
      lineInners.push(inner);
    });

    return lineInners;
  };

  const initAnimatedText = () => {
    animatedTextElements.forEach((element) => {
      if (element._animatedTextTimeline) {
        element._animatedTextTimeline.kill();
        element._animatedTextTimeline = null;
      }

      const lineInners = splitAnimatedText(element);
      if (!lineInners.length) {
        element.removeAttribute('data-animated-ready');
        return;
      }

      element.dataset.animatedReady = 'true';

      if (prefersReducedMotion) {
        gsap.set(lineInners, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.set(lineInners, { yPercent: 60, opacity: 0 });
      element._animatedTextTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'top 55%',
          toggleActions: 'play none none reverse'
        }
      }).to(lineInners, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.12
      });
    });
  };

  const initHeaderDescriptionsReveal = () => {
    const setupReveal = ({
      container,
      items,
      trigger,
      start = 'top 85%',
      end = 'top 55%',
      delay = 0.12,
      duration = 0.95,
      y = 20,
      stagger = 0.12
    }) => {
      if (!container || !items.length || !trigger) return;
      if (container._textRevealTimeline) {
        container._textRevealTimeline.kill();
        container._textRevealTimeline = null;
      }

      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0, clearProps: 'transform' });
        return;
      }

      gsap.set(items, { opacity: 0, y });
      container._textRevealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end,
          toggleActions: 'play none none reverse'
        }
      }).to(items, {
        opacity: 1,
        y: 0,
        duration,
        ease: 'power3.out',
        stagger
      }, delay);
    };

    // AI headers: description appears just after the animated title
    document
      .querySelectorAll('.ai-intro-desc, .ai-services-desc')
      .forEach((desc) => {
        const header = desc.closest('.ai-intro-header, .ai-services-header');
        const title = header ? header.querySelector('[data-animated-text]') : null;
        setupReveal({
          container: desc,
          items: [desc],
          trigger: title || desc,
          delay: 0.28,
          duration: 1.05,
          y: 26,
          stagger: 0
        });
      });

    // Spotlight meta: label then desc
    document.querySelectorAll('.hero-spotlight-meta').forEach((meta) => {
      const items = Array.from(
        meta.querySelectorAll('.hero-spotlight-label, .hero-spotlight-desc')
      );
      const trigger = meta.closest('.hero-spotlight-card') || meta.closest('.hero-spotlight') || meta;
      setupReveal({
        container: meta,
        items,
        trigger,
        start: 'top 88%',
        end: 'top 58%',
        delay: 0.1,
        duration: 0.95,
        y: 18,
        stagger: 0.1
      });
    });

    // Similar text pairs: gallery name/tag and work name/year
    document.querySelectorAll('.hero-gallery-meta').forEach((meta) => {
      const items = Array.from(
        meta.querySelectorAll('.hero-gallery-name, .hero-gallery-tag')
      );
      const trigger = meta.closest('.hero-gallery-card') || meta;
      setupReveal({
        container: meta,
        items,
        trigger,
        start: 'top 92%',
        end: 'top 62%',
        delay: 0.14,
        duration: 0.85,
        y: 16,
        stagger: 0.08
      });
    });

    document.querySelectorAll('.work-meta').forEach((meta) => {
      const items = Array.from(meta.querySelectorAll('.work-name, .work-year'));
      const trigger = meta.closest('.work-card') || meta;
      setupReveal({
        container: meta,
        items,
        trigger,
        start: 'top 92%',
        end: 'top 62%',
        delay: 0.14,
        duration: 0.85,
        y: 16,
        stagger: 0.08
      });
    });
  };

  if (animatedTextElements.length) {
    const ready = document.fonts ? document.fonts.ready : Promise.resolve();
    ready.then(() => {
      initAnimatedText();
      initHeaderDescriptionsReveal();
      ScrollTrigger.refresh();
    });

    let animatedResizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(animatedResizeTimer);
      animatedResizeTimer = setTimeout(() => {
        initAnimatedText();
        initHeaderDescriptionsReveal();
        ScrollTrigger.refresh();
      }, 150);
    });
  }

  const initHoverSwapLinks = () => {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    const lang = (document.documentElement.lang || 'en').toLowerCase();
    const hoverText = lang.startsWith('fr') ? 'ça arrive !' : 'soon !';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = new Set();

    footer.querySelectorAll('.footer-accordion-panel#footer-social-links a').forEach((link) => {
      targets.add(link);
    });

    footer.querySelectorAll('.footer-col a').forEach((link) => {
      const text = (link.textContent || '').trim().toLowerCase();
      if (text === 'whatsapp' || text === 'phone' || text === 'téléphone' || text === 'telephone') {
        targets.add(link);
      }
    });

    targets.forEach((link) => {
      if (!link.dataset.originalText) {
        link.dataset.originalText = (link.textContent || '').trim();
      }
      if (!link.dataset.hoverText) {
        link.dataset.hoverText = hoverText;
      }
      link.classList.add('hover-soon');

      const setHover = () => {
        link.textContent = link.dataset.hoverText;
        link.classList.add('is-hover');
      };
      const setOriginal = () => {
        link.textContent = link.dataset.originalText;
        link.classList.remove('is-hover');
      };

      link.addEventListener('mouseenter', setHover);
      link.addEventListener('mouseleave', setOriginal);
      link.addEventListener('focus', setHover);
      link.addEventListener('blur', setOriginal);
    });

    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (!isTouch || prefersReducedMotion || targets.size === 0) return;

    const links = Array.from(targets);
    let index = 0;
    const cycle = () => {
      const link = links[index % links.length];
      index += 1;
      link.textContent = link.dataset.hoverText;
      link.classList.add('is-hover');
      setTimeout(() => {
        link.textContent = link.dataset.originalText;
        link.classList.remove('is-hover');
      }, 1200);
    };

    cycle();
    setInterval(cycle, 3500);
  };

  initHoverSwapLinks();

  const introMarquees = document.querySelector('.intro-marquees');
  const workSection = document.querySelector('.work-section');
  const navBar = document.querySelector('nav');
  if (introMarquees) {
    const rootStyles = getComputedStyle(document.documentElement);
    const bgBase = rootStyles.getPropertyValue('--color-bg').trim();
    const bgAlt = rootStyles.getPropertyValue('--color-bg-alt').trim();
    const navBase = navBar ? getComputedStyle(navBar).backgroundColor : null;
    const introBands = document.querySelectorAll('.intro-marquee');
    const introKiss = document.querySelector('.intro-kiss');
    const bgTargets = isTouch
      ? [document.body]
      : [
          document.body,
          ...(workSection ? [workSection] : [])
        ];

    gsap.fromTo(
      bgTargets,
      { backgroundColor: bgBase },
      {
        backgroundColor: bgAlt,
        ease: 'none',
        scrollTrigger: {
          trigger: introMarquees,
          start: 'top 40%',
          end: 'top 10%',
          scrub: true
        }
      }
    );

    if (navBar && navBase) {
      gsap.fromTo(
        navBar,
        { backgroundColor: navBase },
        {
          backgroundColor: bgAlt,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: introMarquees,
            start: 'top 40%',
            end: 'top 10%',
            scrub: true
          }
        }
      );
    }

    if (introBands.length) {
      gsap.fromTo(
        introBands,
        { backgroundColor: bgBase },
        {
          backgroundColor: bgAlt,
          ease: 'none',
          scrollTrigger: {
            trigger: introMarquees,
            start: 'top 40%',
            end: 'top 10%',
            scrub: true
          }
        }
      );
    }

    if (introKiss) {
      gsap.fromTo(
        introKiss,
        { y: 180 },
        {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: introMarquees,
            start: 'top bottom',
            end: 'top 20%',
            scrub: true
          }
        }
      );
    }

    const servicesSection = document.querySelector('.services-section');
    if (servicesSection && navBar && navBase) {
      gsap.fromTo(
        navBar,
        { backgroundColor: bgAlt },
        {
          backgroundColor: navBase,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: servicesSection,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true
          }
        }
      );
    }
  }

  let workScrollTrigger;
  let workTimeline;
  let workPreScrollTrigger;
  let servicesOverlapTween;
  const initWorkScroll = () => {
    if (workScrollTrigger) {
      workScrollTrigger.kill();
      workScrollTrigger = null;
    }
    if (workTimeline) {
      workTimeline.kill();
      workTimeline = null;
    }
    if (workPreScrollTrigger) {
      workPreScrollTrigger.kill();
      workPreScrollTrigger = null;
    }
    if (servicesOverlapTween) {
      servicesOverlapTween.kill();
      servicesOverlapTween = null;
    }

    const workSection = document.querySelector('.work-section');
    const workPin = document.querySelector('.work-pin');
    const workTrack = document.querySelector('.work-track');
    const servicesSection = document.querySelector('.services-section');
    if (!workSection || !workTrack || !workPin) return;
    const isCompact = window.matchMedia('(max-width: 1024px)').matches;

    const getScrollAmount = () => {
      const trackStyles = getComputedStyle(workTrack);
      const paddingRight = parseFloat(trackStyles.paddingRight) || 0;
      return Math.max(0, workTrack.scrollWidth - workPin.clientWidth + paddingRight);
    };
    const getRevealAmount = () => Math.max(0, window.innerHeight);
    const getPreOffset = () => Math.min(120, getScrollAmount() * 0.12);
    const revealDelay = Math.max(0, window.innerHeight * 0.35);
    const fadeAmount = Math.max(0, window.innerHeight * 0.10);
    const fadeAdvance = Math.max(0, window.innerHeight * 0.4);

    gsap.set(workTrack, { x: 0 });
    gsap.set(workSection, { autoAlpha: 1 });
    if (servicesSection) {
      gsap.set(servicesSection, { y: '100vh' });
    }

    if (isCompact) {
      gsap.set(workTrack, { x: 0, clearProps: 'transform' });
      gsap.set(workSection, { clearProps: 'transform' });
      if (servicesSection) {
        gsap.set(servicesSection, { y: 0, clearProps: 'transform' });
      }
      if (servicesSection && workSection) {
        const overlap = Math.min(window.innerHeight * 0.25, 220);
        servicesSection.style.setProperty('--services-overlap', `${overlap}px`);
        servicesOverlapTween = gsap.fromTo(
          servicesSection,
          { y: 0 },
          {
            y: -overlap,
            ease: 'none',
            scrollTrigger: {
              trigger: workSection,
              start: 'bottom bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
      return;
    } else {
      workPreScrollTrigger = gsap.to(workTrack, {
        x: () => -getPreOffset(),
        ease: 'none',
        scrollTrigger: {
          trigger: workSection,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true
        }
      }).scrollTrigger;

      workTimeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: workSection,
          start: 'top top',
          end: () => `+=${getScrollAmount() + getRevealAmount()}`,
          pin: workSection,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      workTimeline.fromTo(
        workTrack,
        { x: () => -getPreOffset() },
        {
          x: () => -(getScrollAmount() + getPreOffset()),
          duration: getScrollAmount(),
          immediateRender: false
        }
      );

      if (servicesSection) {
        workTimeline.to({}, { duration: revealDelay });
        workTimeline.to(
          servicesSection,
          {
            y: 0,
            duration: getRevealAmount()
          },
          '>'
        );
        workTimeline.to(
          workSection,
          { autoAlpha: 0, ease: 'none', duration: fadeAmount },
          `>-${fadeAmount + fadeAdvance}`
        );
      }
    }

    workScrollTrigger = workTimeline.scrollTrigger;

    const footerSpacer = document.querySelector('.footer-spacer');
    if (footerSpacer) {
      footerSpacer.style.height = '0px';
    }
  };

  initWorkScroll();

  const lottieEls = document.querySelectorAll('[data-lottie]');
  lottieEls.forEach((lottieEl) => {
    lottie.loadAnimation({
      container: lottieEl,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: lottieEl.getAttribute('data-lottie')
    });
  });

  const initPageTransitions = () => {
    const links = document.querySelectorAll('a[href]');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (link.hasAttribute('data-no-transition')) return;
      link.addEventListener('click', (event) => {
        if (event.defaultPrevented) return;
        if (link.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin) return;
        sessionStorage.setItem('skip-loader', '1');
      });
    });
  };

  initPageTransitions();

  const initServicesAnchor = () => {
    const links = document.querySelectorAll('a[href="#services"]');
    const services = document.querySelector('#services');
    if (!links.length || !services) return;
    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        services.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  initServicesAnchor();

  const initContactForms = () => {
    document.querySelectorAll('[data-contact-form]').forEach((form) => {
      const status = form.querySelector('[data-contact-status]');
      const submitButton = form.querySelector('button[type="submit"]');

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const formData = new FormData(form);
        const getValue = (key) => (formData.get(key) || '').toString().trim();
        const name = getValue('name');
        const email = getValue('email');
        const company = getValue('company');
        const projectType = getValue('projectType');
        const budget = getValue('budget');
        const timeline = getValue('timeline');
        const message = getValue('message');
        const subjectPrefix = form.dataset.subjectPrefix || 'New inquiry';
        const openingText = form.dataset.statusOpening || 'Opening your email app...';
        const fallbackText =
          form.dataset.statusFallback ||
          'If nothing opened, email us directly at contact@youngwildandpixels.com.';

        const details = [
          ['Name', name],
          ['Email', email],
          ['Company', company],
          ['Project type', projectType],
          ['Budget', budget],
          ['Timeline', timeline],
          ['', ''],
          ['Brief', message]
        ]
          .filter(([, value], index) => value || index === 6)
          .map(([label, value]) => (label ? `${label}: ${value}` : ''))
          .join('\n');

        const subject = [subjectPrefix, name].filter(Boolean).join(' - ');
        const mailtoUrl =
          `mailto:contact@youngwildandpixels.com?subject=${encodeURIComponent(subject)}` +
          `&body=${encodeURIComponent(details)}`;

        if (status) {
          status.textContent = openingText;
        }
        if (submitButton) {
          submitButton.setAttribute('aria-busy', 'true');
        }

        window.location.href = mailtoUrl;

        window.setTimeout(() => {
          if (status) {
            status.textContent = fallbackText;
          }
          if (submitButton) {
            submitButton.removeAttribute('aria-busy');
          }
        }, 900);
      });
    });
  };

  initContactForms();

  const initPageLoader = () => {
    const loader = createPageLoader();
    if (!loader) return;

    const isHome = isHomePath();
    const loaderAlreadySeen = sessionStorage.getItem(SITE_LOADER_SEEN_KEY) === '1';

    if (!isHome || loaderAlreadySeen) {
      resetPageLoader(loader);
      return;
    }

    const navEntry = performance.getEntriesByType('navigation')[0];
    const navType = navEntry ? navEntry.type : 'navigate';
    const isReload = navType === 'reload';

    const ref = document.referrer;
    let cameFromOtherPage = false;
    if (ref) {
      try {
        const refUrl = new URL(ref);
        const refPath = refUrl.pathname.replace(/\/+$/, '');
        const refIsHome = homePaths.has(refPath);
        cameFromOtherPage = refUrl.origin === window.location.origin && !refIsHome;
      } catch {
        // Ignore invalid referrer
      }
    }

    if (cameFromOtherPage && !isReload) {
      resetPageLoader(loader);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const barFill = loader.querySelector('.page-loader-bar-fill');
    const percentEl = loader.querySelector('.page-loader-percent');
    const duration = prefersReducedMotion ? 0 : 2.6;
    const exitDuration = prefersReducedMotion ? 0 : 0.8;

    document.body.classList.add('is-loading');
    loader.classList.add('is-active');
    if (barFill) {
      gsap.to(barFill, { scaleX: 1, duration, ease: 'power1.out' });
    }
    if (percentEl) {
      const progress = { value: 0 };
      gsap.to(progress, {
        value: 100,
        duration,
        ease: 'power1.out',
        onUpdate: () => {
          percentEl.textContent = `${Math.round(progress.value)}%`;
        }
      });
    }

    gsap.to(loader, {
      yPercent: -100,
      duration: exitDuration,
      delay: duration,
      ease: 'power2.inOut',
      onComplete: () => {
        sessionStorage.setItem(SITE_LOADER_SEEN_KEY, '1');
        resetPageLoader(loader);
      }
    });
  };

  initPageLoader();

  const servicesSection = document.querySelector('.services-section');

  const serviceBars = gsap.utils.toArray('.services-bar');
  if (serviceBars.length) {
    gsap.fromTo(
      serviceBars,
      { width: 0 },
      {
        width: 50,
        ease: 'back.out(1.7)',
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  const workOverlays = gsap.utils.toArray('.work-card-overlay');
  if (workOverlays.length) {
    workOverlays.forEach((overlay) => {
      const card = overlay.closest('.work-card');
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      const isInitiallyVisible = bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0;

      if (isInitiallyVisible) {
        gsap.set(overlay, { yPercent: -100 });
        overlay.dataset.hidden = '1';
      }

      gsap.fromTo(
        overlay,
        { yPercent: isInitiallyVisible ? -100 : 0 },
        {
          yPercent: -100,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
            onLeave: () => {
              overlay.dataset.hidden = '1';
            }
          }
        }
      );

      card.addEventListener('mouseenter', () => {
        gsap.to(overlay, { yPercent: 0, duration: 0.45, ease: 'power2.out' });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(overlay, { yPercent: -100, duration: 0.45, ease: 'power2.inOut' });
      });
    });
  }

  const workCards = gsap.utils.toArray('body.work-page .work-card, body.project-page .work-card');
  if (workCards.length) {
    const initiallyVisibleCards = workCards.filter((card) => {
      const bounds = card.getBoundingClientRect();
      return bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0;
    });
    const deferredCards = workCards.filter((card) => !initiallyVisibleCards.includes(card));

    if (initiallyVisibleCards.length) {
      gsap.set(initiallyVisibleCards, { autoAlpha: 1 });
    }

    if (deferredCards.length) {
      gsap.set(deferredCards, { autoAlpha: 0 });
    }

    ScrollTrigger.batch(deferredCards, {
      start: 'top 85%',
      onEnter: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power1.out',
          stagger: 0.1
        }),
      onEnterBack: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power1.out',
          stagger: 0.1
        })
    });
  }

  let marqueeTriggers = [];
  const initMarqueeScroll = () => {
    marqueeTriggers.forEach((trigger) => trigger.kill());
    marqueeTriggers = [];

    const marqueeTracks = document.querySelectorAll('.intro-marquee-track');
    marqueeTracks.forEach((track, index) => {
      const direction = index % 2 === 0 ? -1 : 1;
      let startOffset = track.dataset.marqueeStart ? Number(track.dataset.marqueeStart) : direction * -300;
      let endOffset = track.dataset.marqueeEnd ? Number(track.dataset.marqueeEnd) : direction * -900;

      if (track.dataset.marqueeMode === 'group') {
        const group = track.querySelector('.intro-marquee-group');
        if (group) {
          startOffset = -group.offsetWidth;
          endOffset = 0;
        }
      }

      const extraVw = track.dataset.marqueeVw ? Number(track.dataset.marqueeVw) : 0;
      const extraOffset = (window.innerWidth * extraVw) / 100;
      const tween = gsap.fromTo(
        track,
        { x: startOffset + extraOffset },
        {
          x: endOffset + extraOffset,
          ease: 'none',
          scrollTrigger: {
            trigger: '.intro',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
      if (tween.scrollTrigger) marqueeTriggers.push(tween.scrollTrigger);
    });
  };

  initMarqueeScroll();

  const loopMarqueeTracks = document.querySelectorAll('.hero-marquee-track, .footer-marquee-track');
  const initLoopMarquees = () => {
    loopMarqueeTracks.forEach((track) => {
      if (!track) return;
      const container = track.parentElement;
      if (!container) return;

      if (track._marqueeTween) {
        track._marqueeTween.kill();
        track._marqueeTween = null;
      }
      if (track._marqueeTicker) {
        gsap.ticker.remove(track._marqueeTicker);
        track._marqueeTicker = null;
      }

      const originals = track._marqueeOriginals || Array.from(track.children);
      if (!track._marqueeOriginals) {
        track._marqueeOriginals = originals.map((node) => node.cloneNode(true));
      }

      track.innerHTML = '';
      track._marqueeOriginals.forEach((node) => track.appendChild(node.cloneNode(true)));

      const loopWidth = track.scrollWidth;
      if (!loopWidth) return;

      while (track.scrollWidth < container.clientWidth + loopWidth) {
        track._marqueeOriginals.forEach((node) => track.appendChild(node.cloneNode(true)));
      }

      const speed = track.classList.contains('footer-marquee-track') ? 70 : 85;
      let x = 0;
      gsap.set(track, { x: 0 });
      const ticker = () => {
        const delta = gsap.ticker.deltaRatio(60);
        x -= (speed / 60) * delta;
        if (x <= -loopWidth) x += loopWidth;
        gsap.set(track, { x });
      };
      track._marqueeTicker = ticker;
      gsap.ticker.add(ticker);
    });

    document.body.classList.add('marquee-js');
  };

  const readyForMarquee = document.fonts ? document.fonts.ready : Promise.resolve();
  readyForMarquee.then(() => {
    initLoopMarquees();
  });

  let marqueeResizeTimer;
  window.addEventListener('resize', () => {
    if (!hasMeaningfulResize()) return;
    clearTimeout(marqueeResizeTimer);
    marqueeResizeTimer = setTimeout(() => {
      if (isTouch) lastViewportWidth = window.innerWidth;
      initLoopMarquees();
    }, 150);
  });

  const footerAccordions = document.querySelectorAll('.footer-accordion');
  if (footerAccordions.length) {
    const syncFooterAccordions = () => {
      const isMobile = window.matchMedia('(max-width: 900px)').matches;
      footerAccordions.forEach((accordion) => {
        const toggle = accordion.querySelector('.footer-accordion-toggle');
        if (!toggle) return;
        if (isMobile) {
          accordion.classList.add('is-collapsed');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          accordion.classList.remove('is-collapsed');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    };

    footerAccordions.forEach((accordion) => {
      const toggle = accordion.querySelector('.footer-accordion-toggle');
      if (!toggle) return;
      toggle.addEventListener('click', () => {
        if (!window.matchMedia('(max-width: 900px)').matches) return;
        const isCollapsed = accordion.classList.toggle('is-collapsed');
        toggle.setAttribute('aria-expanded', String(!isCollapsed));
      });
    });
    syncFooterAccordions();
    window.addEventListener('resize', syncFooterAccordions);
  }
  
  console.log('✓ App initialized');
});
