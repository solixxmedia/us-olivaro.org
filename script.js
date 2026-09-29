/* ============================================
   Olivaro — Main JavaScript
   Features: Hidden Affiliate Links, Mobile Menu, FAQ, Scroll Reveal
   ============================================ */

// 🔒 CENTRALIZED ORDER LINK (Change this ONE variable to update ALL CTAs)
const ORDER_LINK = "https://mwebscout.com/13687/178/2/?";

document.addEventListener('DOMContentLoaded', function () {
  console.log("✅ Olivaro Script Loaded!");

  /* 1. HIDE AFFILIATE LINK ON HOVER & WIRE ALL CTAs */
  const ctaButtons = document.querySelectorAll('.order-btn, a[data-cta]');
  console.log("🔗 Found CTA buttons:", ctaButtons.length);
  
  if (ctaButtons.length === 0) {
    console.error("❌ No CTA buttons found! Check your HTML classes.");
    return;
  }
  
  ctaButtons.forEach((btn, index) => {
    // CRITICAL: Use javascript:void(0) instead of # to prevent ANY scrolling
    btn.setAttribute('href', 'javascript:void(0);');
    btn.style.cursor = 'pointer';
    btn.removeAttribute('target'); 
    
    btn.addEventListener('click', function (e) {
      // Stop ALL default behaviors immediately
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      console.log(`🚀 Button ${index + 1} clicked! Opening:`, ORDER_LINK);
      
      // Open in new tab securely
      const newWindow = window.open(ORDER_LINK, '_blank', 'noopener,noreferrer');
      
      // Fallback if popup blocker prevents opening
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        console.warn("⚠️ Popup blocked! Redirecting in same window...");
        window.location.href = ORDER_LINK;
      }
      
      return false; // Extra safety
    }, true); // Use capture phase for maximum priority
  });

  /* 2. MOBILE NAV TOGGLE */
  const navCollapse = document.getElementById('olNavCollapse');
  if (navCollapse) {
    navCollapse.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (typeof bootstrap !== 'undefined') {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        } else {
          navCollapse.classList.remove('show');
        }
      });
    });
  }

  /* 3. SCROLL REVEAL ANIMATION */
  const revealElements = document.querySelectorAll('.ol-card, .ol-pack, .ol-rev, .ol-acc .accordion-item');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  /* 4. STICKY HEADER SHADOW */
  const navbar = document.querySelector('.ol-nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(30, 77, 53, 0.08)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }
});