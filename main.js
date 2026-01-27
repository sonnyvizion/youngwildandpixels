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

  gsap.registerPlugin(ScrollTrigger);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
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

  const heroMascot = document.querySelector('.hero-mascot');
  if (heroMascot) {
    gsap.from(heroMascot, {
      y: 40,
      duration: 1,
      ease: 'power1.out'
    });

    gsap.to(heroMascot, {
      y: '-25vw',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  }

  const heroDisplay = document.querySelector('.hero-display');
  if (heroDisplay) {
    gsap.fromTo(
      heroDisplay,
      { y: 20, scale: 0.98 },
      { y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }
    );
  }

  const introText = document.querySelector('.intro-text');
  const splitIntroLines = () => {
    if (!introText) return [];
    const text = introText.textContent.trim();
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
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
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
    const bgTargets = [
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
          pinSpacing: false,
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
    const footer = document.querySelector('.site-footer');
    if (footerSpacer) {
      if (isCompact) {
        footerSpacer.style.height = '0px';
      } else {
        const requiredScroll = getScrollAmount() + getRevealAmount();
        const remainingHeight =
          (servicesSection ? servicesSection.offsetHeight : 0) +
          (footer ? footer.offsetHeight : 0);
        const spacerHeight = Math.max(0, requiredScroll - remainingHeight);
        footerSpacer.style.height = `${spacerHeight}px`;
      }
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

  const initPageLoader = () => {
    const loader = document.querySelector('#page-loader');
    if (!loader) return;

    const path = window.location.pathname.replace(/\/+$/, '');
    const isHome =
      path === '' ||
      path.endsWith('/index.html') ||
      path.endsWith('/youngwildandpixels') ||
      path.endsWith('/youngwildandpixels/index.html');

    if (!isHome) {
      loader.remove();
      return;
    }

    const navEntry = performance.getEntriesByType('navigation')[0];
    const navType = navEntry ? navEntry.type : 'navigate';
    const isReload = navType === 'reload';
    const skipLoader = sessionStorage.getItem('skip-loader') === '1';
    if (skipLoader) sessionStorage.removeItem('skip-loader');

    const ref = document.referrer;
    let cameFromOtherPage = false;
    if (ref) {
      try {
        const refUrl = new URL(ref);
        const refPath = refUrl.pathname.replace(/\/+$/, '');
        const refIsHome =
          refPath === '' ||
          refPath.endsWith('/index.html') ||
          refPath.endsWith('/youngwildandpixels') ||
          refPath.endsWith('/youngwildandpixels/index.html');
        cameFromOtherPage = refUrl.origin === window.location.origin && !refIsHome;
      } catch {
        // Ignore invalid referrer
      }
    }

    if ((cameFromOtherPage || skipLoader) && !isReload) {
      loader.remove();
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
        loader.remove();
        document.body.classList.remove('is-loading');
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

  const servicesPanel = document.querySelector('.services-panel');
  if (servicesPanel) {
    gsap.fromTo(
      servicesPanel,
      { opacity: 0, y: 16, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.6)',
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

      gsap.fromTo(
        overlay,
        { yPercent: 0 },
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

  const workCards = gsap.utils.toArray('.work-card');
  if (workCards.length) {
    gsap.set(workCards, { autoAlpha: 0 });
    ScrollTrigger.batch(workCards, {
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
    clearTimeout(marqueeResizeTimer);
    marqueeResizeTimer = setTimeout(() => {
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
