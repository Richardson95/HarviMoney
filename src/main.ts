// ── Global styles ─────────────────────────────────────────────────────────────
import './styles/variables.css';
import './styles/reset.css';
import './styles/animations.css';
import './styles/main.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/stats.css';
import './styles/features.css';
import './styles/how-it-works.css';
import './styles/services.css';
import './styles/about.css';
import './styles/security.css';
import './styles/contact.css';
import './styles/footer.css';
import './styles/auth.css';
import './styles/app-layout.css';
import './styles/dashboard.css';
import './styles/admin.css';

// ── Landing page components ───────────────────────────────────────────────────
import { createNavbar } from './components/Navbar.js';
import { createHero } from './components/Hero.js';
import { createStats } from './components/Stats.js';
import { createFeatures } from './components/Features.js';
import { createHowItWorks } from './components/HowItWorks.js';
import { createServices } from './components/Services.js';
import { createAbout } from './components/About.js';
import { createSecurity } from './components/Security.js';
import { createContact } from './components/Contact.js';
import { createFooter } from './components/Footer.js';
import { initScrollAnimations, initNavbarScroll, initActiveNavLinks } from './utils/animations.js';
import { initCounters } from './utils/counter.js';

// ── Router & pages ────────────────────────────────────────────────────────────
import { registerRoute, initRouter } from './router/index.js';
import { mountSignIn } from './pages/SignInPage.js';
import { mountSignUp } from './pages/SignUpPage.js';
import { mountDashboard } from './pages/DashboardPage.js';
import { mountAdmin } from './pages/AdminPage.js';

// ── Landing page mount ────────────────────────────────────────────────────────
function mountLanding(container: HTMLElement): () => void {
  container.innerHTML = '';

  const navbar = createNavbar();
  const main = document.createElement('main');
  main.id = 'main-content';

  [
    createHero(),
    createStats(),
    createFeatures(),
    createHowItWorks(),
    createServices(),
    createAbout(),
    createSecurity(),
    createContact(),
  ].forEach((s) => main.appendChild(s));

  container.appendChild(navbar);
  container.appendChild(main);
  container.appendChild(createFooter());

  initNavbarScroll(navbar);
  initScrollAnimations();
  initActiveNavLinks();
  initCounters();

  // Scroll to anchor when landing via #anchor (not #/route)
  const hash = window.location.hash;
  if (hash && !hash.startsWith('#/')) {
    requestAnimationFrame(() => {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Accessibility: skip-to-content link (once per session)
  if (!document.getElementById('skip-link')) {
    const skipLink = document.createElement('a');
    skipLink.id = 'skip-link';
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText =
      'position:fixed;top:1rem;left:1rem;z-index:9999;background:var(--color-secondary);' +
      'color:white;padding:.5rem 1rem;border-radius:4px;font-weight:600;font-size:.875rem;';
    skipLink.addEventListener('focus', () => skipLink.classList.remove('sr-only'));
    skipLink.addEventListener('blur', () => skipLink.classList.add('sr-only'));
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  return () => {};
}

// ── Route table ───────────────────────────────────────────────────────────────
registerRoute(/^\/$/, mountLanding);
registerRoute(/^\/signin$/, mountSignIn);
registerRoute(/^\/signup$/, mountSignUp);
registerRoute(/^\/dashboard/, mountDashboard, { requiresAuth: true });
registerRoute(/^\/admin/, mountAdmin, { requiresAuth: true, requiresAdmin: true });

// ── Boot ──────────────────────────────────────────────────────────────────────
initRouter();
