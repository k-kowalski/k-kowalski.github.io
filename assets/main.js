/**
 * Krzysztof Kowalski - Personal Website
 * Minimal JavaScript for smooth interactions
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth scroll for anchor links (if not disabled)
  if (!prefersReducedMotion) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without scrolling
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  // Handle hash navigation on page load (for project deep links)
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }

  // Optional: Add loaded state for fade-in animations
  if (!prefersReducedMotion) {
    document.body.classList.add('js-loaded');
  }

})();
