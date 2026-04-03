export function initScrollAnimations(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  const animatables = document.querySelectorAll(
    '.animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-scale'
  );

  animatables.forEach((el) => observer.observe(el));
}

export function initNavbarScroll(navbar: HTMLElement): void {
  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

export function initActiveNavLinks(): void {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link[href^="#"], .navbar__mobile-link[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
}

export function smoothScrollTo(target: string): void {
  const el = document.querySelector(target);
  if (!el) return;

  const navbarHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '72',
    10
  );

  const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
  window.scrollTo({ top, behavior: 'smooth' });
}
