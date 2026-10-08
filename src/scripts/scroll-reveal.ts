export function initScrollReveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-scroll-reveal]');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (targets.length === 0 || motionPreference.matches || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (!(entry.target instanceof HTMLElement)) return;

        const target = entry.target;
        target.dataset.scrollRevealed = 'true';
        observer.unobserve(target);
      });
    },
    {
      rootMargin: '0px 0px -6% 0px',
      threshold: 0.15,
    },
  );

  document.documentElement.classList.add('has-scroll-reveal');
  targets.forEach((target) => observer.observe(target));
}
