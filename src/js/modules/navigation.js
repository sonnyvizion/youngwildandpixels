/* ==============================================
   Navigation Module - Animated Pill Navigation
   ============================================== */

import gsap from 'gsap';

export function initNavigation() {
  const navLinks = document.querySelectorAll('nav a.nav-link');
  const navPill = document.querySelector('.nav-pill');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const desktopLogo = document.querySelector('.logo');
  const desktopLangSwitch = document.querySelector('.lang-switch--desktop');
  const heroTop = document.querySelector('.hero-top');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (nav && desktopLangSwitch && !nav.querySelector('.lang-switch--menu')) {
    const mobileSwitch = desktopLangSwitch.cloneNode(true);
    mobileSwitch.classList.remove('lang-switch--desktop');
    mobileSwitch.classList.add('lang-switch--menu');
    nav.appendChild(mobileSwitch);
  }

  const desktopLangChars = desktopLangSwitch
    ? Array.from(desktopLangSwitch.querySelectorAll('a')).flatMap((link) => {
        if (!link.dataset.langOriginalText) {
          link.dataset.langOriginalText = link.textContent || '';
        }

        const text = link.dataset.langOriginalText;
        link.textContent = '';

        const textWrap = document.createElement('span');
        textWrap.className = 'section-adlib-text';

        Array.from(text).forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.className = 'section-adlib-char';
          charSpan.textContent = char === ' ' ? '\u00A0' : char;
          textWrap.appendChild(charSpan);
        });

        link.appendChild(textWrap);
        return Array.from(textWrap.querySelectorAll('.section-adlib-char'));
      })
    : [];

  const resetDesktopLangBuild = () => {
    if (!desktopLangChars.length) return;

    gsap.killTweensOf(desktopLangChars);
    gsap.set(desktopLangChars, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)'
    });
  };

  const playDesktopLangBuild = () => {
    if (!desktopLangChars.length || prefersReducedMotion) return;

    gsap.killTweensOf(desktopLangChars);
    gsap.set(desktopLangChars, {
      opacity: 0,
      y: 4,
      filter: 'blur(1.5px)'
    });
    gsap.to(desktopLangChars, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.42,
      ease: 'steps(3)',
      stagger: 0.024,
      overwrite: true
    });
  };

  resetDesktopLangBuild();
  
  // Animate pill to target link
  function animatePillToLink(targetLink) {
    if (!navPill) return;
    
    const linkRect = targetLink.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const pillInset = parseFloat(window.getComputedStyle(navPill).left) || 5;
    
    // Position relative to nav, accounting for the real pill inset.
    const posX = (linkRect.left - navRect.left) - pillInset;
    const width = linkRect.width;
    
    gsap.to(navPill, {
      x: posX,
      width: width,
      duration: 0.6,
      ease: 'back.out(1.4)'
    });
  }
  
  // Set active link based on current page
  function updateActiveLink() {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isActive = href === currentFile || (currentFile === '' && href === 'index.html');
      
      link.classList.toggle('active', isActive);
      
      if (isActive) {
        // Set initial pill position without animation
        gsap.set(navPill, { x: 0, width: 0 });
        // Add pill-active class to active link
        link.classList.add('pill-active');
        // Then animate to active link
        setTimeout(() => animatePillToLink(link), 0);
      }
    });
  }
  
  // Add hover effects to all links
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      // Remove pill-active from all links
      navLinks.forEach(l => l.classList.remove('pill-active'));
      // Add pill-active to current link
      link.classList.add('pill-active');
      animatePillToLink(link);
    });
    
    link.addEventListener('mouseleave', () => {
      link.classList.remove('pill-active');
      // Return pill to active link
      const activeLink = document.querySelector('nav a.nav-link.active');
      if (activeLink) {
        activeLink.classList.add('pill-active');
        animatePillToLink(activeLink);
      }
    });
  });
  
  // Hamburger menu toggle
  if (hamburger) {
    const closeDuration = 420;
    const openMenu = () => {
      nav.classList.remove('closing');
      nav.classList.add('active');
      hamburger.classList.add('active');
      document.body.classList.add('menu-open');
    };
    const closeMenu = () => {
      if (!nav.classList.contains('active')) return;
      nav.classList.add('closing');
      hamburger.classList.remove('active');
      setTimeout(() => {
        nav.classList.remove('active');
        nav.classList.remove('closing');
        document.body.classList.remove('menu-open');
      }, closeDuration);
    };

    hamburger.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
  }
  
  // Initialize on page load
  updateActiveLink();

  // Ensure the pill sits on "Work" for project pages without changing link color.
  if (document.body.classList.contains('project-page')) {
    const activeLink = document.querySelector('nav a.nav-link.active');
    if (activeLink) activeLink.classList.remove('active');
    const workLink = document.querySelector('nav a.nav-link[href="work.html"]');
    if (workLink) {
      workLink.classList.add('active', 'pill-active');
      animatePillToLink(workLink);
    }
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    const activeLink = document.querySelector('nav a.nav-link.active');
    if (activeLink) {
      animatePillToLink(activeLink);
    }
  });

  // ── Nav island hide on scroll-down / show on scroll-up (desktop only) ──
  let lastScrollY = window.scrollY;
  let navHidden = false;
  let desktopLogoVisible = null;
  const DESKTOP_CHROME_TOP_SHOW = '54px';
  const DESKTOP_CHROME_TOP_HIDE = '-100px';
  const DESKTOP_LOGO_OFFSET_SHOW = '0px';
  const DESKTOP_LOGO_OFFSET_HIDE = '-24px';

  const hasDesktopHeroThreshold = () => window.innerWidth > 768 && !!desktopLogo && !!heroTop;

  const isPastHeroTop = () => {
    if (!hasDesktopHeroThreshold()) return true;

    const heroBottom = heroTop.getBoundingClientRect().bottom;
    const revealThreshold = Math.max(54, window.innerHeight * 0.16);
    return heroBottom <= revealThreshold;
  };

  const syncDesktopLogo = ({ immediate = false, duration, ease } = {}) => {
    if (!desktopLogo) return;

    const shouldShow = window.innerWidth <= 768 || isPastHeroTop();
    if (!immediate && desktopLogoVisible === shouldShow) return;

    desktopLogoVisible = shouldShow;

    const vars = shouldShow
      ? { autoAlpha: 1, y: DESKTOP_LOGO_OFFSET_SHOW, pointerEvents: 'auto' }
      : { autoAlpha: 0, y: DESKTOP_LOGO_OFFSET_HIDE, pointerEvents: 'none' };

    if (immediate || prefersReducedMotion) {
      gsap.set(desktopLogo, vars);
      return;
    }

    gsap.to(desktopLogo, {
      ...vars,
      duration: duration ?? (shouldShow ? 0.4 : 0.28),
      ease: ease ?? (shouldShow ? 'power2.out' : 'power2.in'),
      overwrite: true
    });
  };

  const animateDesktopChrome = (topValue, duration, ease) => {
    gsap.to(nav, { top: topValue, duration, ease });
    if (desktopLangSwitch) {
      if (topValue === DESKTOP_CHROME_TOP_HIDE) {
        resetDesktopLangBuild();
      }
      gsap.to(desktopLangSwitch, { top: topValue, duration, ease });
    }
  };

  const onScroll = () => {
    // Only on desktop (mobile uses drawer)
    if (window.innerWidth <= 768) {
      syncDesktopLogo({ immediate: true });
      return;
    }
    // Don't interfere while mobile menu is open
    if (nav.classList.contains('active')) { lastScrollY = window.scrollY; return; }

    const y = window.scrollY;
    const delta = y - lastScrollY;
    if (y < 80) {
      // Always show near top
      if (navHidden) {
        navHidden = false;
        playDesktopLangBuild();
        animateDesktopChrome(DESKTOP_CHROME_TOP_SHOW, 0.4, 'power2.out');
      }
      syncDesktopLogo({ duration: 0.35, ease: 'power2.out' });
    } else if (delta > 6 && !navHidden) {
      // Scrolling down → hide
      navHidden = true;
      animateDesktopChrome(DESKTOP_CHROME_TOP_HIDE, 0.35, 'power2.in');
      syncDesktopLogo({ duration: 0.35, ease: 'power2.in' });
    } else if (delta < -6 && navHidden) {
      // Scrolling up → show
      navHidden = false;
      playDesktopLangBuild();
      animateDesktopChrome(DESKTOP_CHROME_TOP_SHOW, 0.45, 'power2.out');
      syncDesktopLogo({ duration: 0.45, ease: 'power2.out' });
    } else {
      syncDesktopLogo();
    }

    lastScrollY = y;
  };

  if (desktopLogo) {
    syncDesktopLogo({ immediate: true });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (!desktopLogo) return;
    syncDesktopLogo({ immediate: true });
  });
}
