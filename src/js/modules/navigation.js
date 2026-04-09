/* ==============================================
   Navigation Module - Animated Pill Navigation
   ============================================== */

import gsap from 'gsap';

export function initNavigation() {
  const navLinks = document.querySelectorAll('nav a.nav-link');
  const navPill = document.querySelector('.nav-pill');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const desktopLangSwitch = document.querySelector('.lang-switch--desktop');

  if (nav && desktopLangSwitch && !nav.querySelector('.lang-switch--menu')) {
    const mobileSwitch = desktopLangSwitch.cloneNode(true);
    mobileSwitch.classList.remove('lang-switch--desktop');
    mobileSwitch.classList.add('lang-switch--menu');
    nav.appendChild(mobileSwitch);
  }
  
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
  const NAV_TOP_SHOW = '54px';
  const NAV_TOP_HIDE = '-100px';

  const onScroll = () => {
    // Only on desktop (mobile uses drawer)
    if (window.innerWidth <= 768) return;
    // Don't interfere while mobile menu is open
    if (nav.classList.contains('active')) { lastScrollY = window.scrollY; return; }

    const y = window.scrollY;
    const delta = y - lastScrollY;

    if (y < 80) {
      // Always show near top
      if (navHidden) {
        gsap.to(nav, { top: NAV_TOP_SHOW, duration: 0.4, ease: 'power2.out' });
        navHidden = false;
      }
    } else if (delta > 6 && !navHidden) {
      // Scrolling down → hide
      gsap.to(nav, { top: NAV_TOP_HIDE, duration: 0.35, ease: 'power2.in' });
      navHidden = true;
    } else if (delta < -6 && navHidden) {
      // Scrolling up → show
      gsap.to(nav, { top: NAV_TOP_SHOW, duration: 0.45, ease: 'power2.out' });
      navHidden = false;
    }

    lastScrollY = y;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}
