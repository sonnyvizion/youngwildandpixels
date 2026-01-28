/* ==============================================
   Navigation Module - Animated Pill Navigation
   ============================================== */

import gsap from 'gsap';

export function initNavigation() {
  const navLinks = document.querySelectorAll('nav a.nav-link');
  const navPill = document.querySelector('.nav-pill');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  
  // Animate pill to target link
  function animatePillToLink(targetLink) {
    if (!navPill) return;
    
    const linkRect = targetLink.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    
    // Position relative to nav, accounting for pill left offset (5px)
    const posX = (linkRect.left - navRect.left) - 9;
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
}
