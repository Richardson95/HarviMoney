import { smoothScrollTo } from '../utils/animations.js';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Get in Touch', href: '#contact' },
];

export function createNavbar(): HTMLElement {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar';
  navbar.setAttribute('role', 'navigation');
  navbar.setAttribute('aria-label', 'Main navigation');

  navbar.innerHTML = `
    <div class="container navbar__inner">
      <a href="#home" class="navbar__logo" aria-label="HarviMoney Home">
        <div class="navbar__logo-icon" aria-hidden="true">H</div>
        <span class="navbar__logo-text">Harvi<span>Money</span></span>
      </a>

      <ul class="navbar__nav" role="list">
        ${NAV_LINKS.map(
          ({ label, href }) => `
          <li>
            <a href="${href}" class="navbar__link">${label}</a>
          </li>
        `
        ).join('')}
      </ul>

      <div class="navbar__actions">
        <a href="#/signin" class="navbar__signin">Sign In</a>
        <a href="#/signup" class="btn btn-primary btn-sm">Apply Now</a>
        <button
          class="navbar__hamburger"
          aria-label="Toggle menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <div id="mobile-menu" class="navbar__mobile-menu" role="dialog" aria-label="Mobile navigation">
      <ul class="navbar__mobile-nav" role="list">
        ${NAV_LINKS.map(
          ({ label, href }) => `
          <li>
            <a href="${href}" class="navbar__mobile-link">${label}</a>
          </li>
        `
        ).join('')}
      </ul>
      <div class="navbar__mobile-actions">
        <a href="#/signin" class="btn btn-outline" style="text-align:center;justify-content:center;">Sign In</a>
        <a href="#/signup" class="btn btn-primary" style="text-align:center;justify-content:center;">Apply for a Loan</a>
      </div>
    </div>
  `;

  // Hamburger toggle
  const hamburger = navbar.querySelector<HTMLButtonElement>('.navbar__hamburger')!;
  const mobileMenu = navbar.querySelector<HTMLElement>('#mobile-menu')!;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Smooth scroll for anchor links only — exclude #/ app routes
  navbar.querySelectorAll<HTMLAnchorElement>('a[href^="#"]:not([href^="#/"])').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href')!;

      // Close mobile menu
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';

      smoothScrollTo(href);
    });
  });

  // Close mobile menu on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  return navbar;
}
