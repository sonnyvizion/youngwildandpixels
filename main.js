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
  const lenis = new Lenis({
    smooth: true,
    lerp: 0.08
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Initialize navigation
  initNavigation();

  const heroMascot = document.querySelector('.hero-mascot');
  if (heroMascot) {
    gsap.from(heroMascot, {
      y: 40,
      duration: 1,
      ease: 'power1.out'
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
        for (const ch of word) {
          const charSpan = document.createElement('span');
          charSpan.className = 'intro-char';
          charSpan.textContent = ch;
          line.appendChild(charSpan);
        }
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
  if (introMarquees) {
    const rootStyles = getComputedStyle(document.documentElement);
    const bgBase = rootStyles.getPropertyValue('--color-bg').trim();
    const bgAlt = rootStyles.getPropertyValue('--color-bg-alt').trim();
    const introBands = document.querySelectorAll('.intro-marquee');
    const bgTargets = workSection ? [document.body, workSection] : [document.body];

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
  }

  let workScrollTrigger;
  let workPreScrollTrigger;
  const initWorkScroll = () => {
    if (workScrollTrigger) {
      workScrollTrigger.kill();
      workScrollTrigger = null;
    }
    if (workPreScrollTrigger) {
      workPreScrollTrigger.kill();
      workPreScrollTrigger = null;
    }

    const workSection = document.querySelector('.work-section');
    const workPin = document.querySelector('.work-pin');
    const workTrack = document.querySelector('.work-track');
    if (!workSection || !workTrack || !workPin) return;

    const getScrollAmount = () => {
      const endPadding = Math.max(0, workPin.clientWidth * 0.16);
      return Math.max(0, workTrack.scrollWidth - workPin.clientWidth + endPadding);
    };
    const preOffset = () => Math.min(160, getScrollAmount() * 0.2);

    workPreScrollTrigger = gsap.to(workTrack, {
      x: () => -preOffset(),
      ease: 'none',
      scrollTrigger: {
        trigger: workSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    }).scrollTrigger;

    workScrollTrigger = gsap.fromTo(
      workTrack,
      { x: () => -preOffset() },
      {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: workSection,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      }
    ).scrollTrigger;
  };

  initWorkScroll();

  const lottieEl = document.querySelector('[data-lottie]');
  if (lottieEl) {
    lottie.loadAnimation({
      container: lottieEl,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: lottieEl.getAttribute('data-lottie')
    });
  }

  const servicesSection = document.querySelector('.services-section');
  if (workSection && servicesSection) {
    gsap.set(servicesSection, { y: '100vh' });
    gsap.to(servicesSection, {
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: servicesSection,
        start: 'top bottom-=20vh',
        end: 'top top',
        scrub: true,
        pin: workSection,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onLeave: () => {
          gsap.set(workSection, { autoAlpha: 0, pointerEvents: 'none' });
        },
        onEnterBack: () => {
          gsap.set(workSection, { autoAlpha: 1, pointerEvents: 'auto' });
        }
      }
    });
  }

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
  
  console.log('✓ App initialized');
});
