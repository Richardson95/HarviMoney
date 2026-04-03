export function createFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.setAttribute('role', 'contentinfo');
  footer.setAttribute('aria-label', 'Site footer');

  footer.innerHTML = `
    <div class="container">

      <!-- Newsletter -->
      <div class="footer__newsletter animate-fade-up">
        <div class="footer__newsletter-text">
          <div class="footer__newsletter-title">Stay in the loop</div>
          <div class="footer__newsletter-subtitle">Get updates on new loan products and platform features.</div>
        </div>
        <form class="footer__newsletter-form" id="newsletter-form" novalidate aria-label="Newsletter signup">
          <input
            type="email"
            class="footer__newsletter-input"
            placeholder="Enter your email address"
            required
            aria-label="Email for newsletter"
          />
          <button type="submit" class="btn btn-primary btn-sm">Subscribe</button>
        </form>
      </div>

      <!-- Top Grid -->
      <div class="footer__top">

        <!-- Brand -->
        <div class="footer__brand">
          <div class="footer__logo">
            <div class="footer__logo-icon" aria-hidden="true">H</div>
            <span class="footer__logo-text">Harvi<span>Money</span></span>
          </div>
          <p class="footer__tagline">
            Intelligent lending solutions for corporate clients and salary earners in Nigeria.
          </p>
          <nav class="footer__social" aria-label="Social media">
            <a href="#" class="footer__social-link" aria-label="LinkedIn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" class="footer__social-link" aria-label="Twitter">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" class="footer__social-link" aria-label="Facebook">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </nav>
        </div>

        <!-- Products -->
        <div class="footer__column">
          <h3 class="footer__column-title">Loan Products</h3>
          <ul class="footer__links" role="list">
            <li><a href="#services" class="footer__link">Salary Advance</a></li>
            <li><a href="#services" class="footer__link">Term Loan</a></li>
            <li><a href="#services" class="footer__link">Emergency Loan</a></li>
            <li>
              <a href="#services" class="footer__link">
                Asset Finance
                <span class="footer__link-badge">New</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div class="footer__column">
          <h3 class="footer__column-title">Company</h3>
          <ul class="footer__links" role="list">
            <li><a href="#about" class="footer__link">About Us</a></li>
            <li><a href="#security" class="footer__link">Security</a></li>
            <li><a href="#" class="footer__link">Careers</a></li>
            <li><a href="#contact" class="footer__link">Press</a></li>
            <li><a href="#contact" class="footer__link">Partners</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div class="footer__column">
          <h3 class="footer__column-title">Support</h3>
          <ul class="footer__links" role="list">
            <li><a href="#contact" class="footer__link">Contact Us</a></li>
            <li><a href="#" class="footer__link">Help Centre</a></li>
            <li><a href="#" class="footer__link">Loan Calculator</a></li>
            <li><a href="#" class="footer__link">FAQs</a></li>
            <li><a href="#" class="footer__link">Report Fraud</a></li>
          </ul>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="footer__bottom">
        <p class="footer__copyright">
          &copy; ${new Date().getFullYear()} HarviMoney. All rights reserved.<br>
          <a href="#">HarviMoney Microfinance Bank Ltd</a> — RC: 1234567
        </p>
        <nav class="footer__legal" aria-label="Legal links">
          <a href="#" class="footer__legal-link">Privacy Policy</a>
          <a href="#" class="footer__legal-link">Terms of Service</a>
          <a href="#" class="footer__legal-link">Cookie Policy</a>
          <a href="#" class="footer__legal-link">Regulatory</a>
        </nav>
      </div>

    </div>
  `;

  // Newsletter form
  const form = footer.querySelector<HTMLFormElement>('#newsletter-form')!;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>('input')!;
    const btn = form.querySelector<HTMLButtonElement>('button')!;

    if (input.value && input.validity.valid) {
      btn.textContent = 'Subscribed';
      btn.style.background = 'var(--gradient-gold)';
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
      }, 3000);
    }
  });

  // Smooth scroll for footer nav links
  footer.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const navHeight = 72;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  return footer;
}
