import { iconBriefcase, iconTrendingUp, iconLifeBuoy, iconCar } from '../utils/icons.js';

export function createServices(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'services';
  section.className = 'services section';
  section.setAttribute('aria-label', 'Our services');

  section.innerHTML = `
    <div class="container">
      <div class="services__inner">

        <!-- Sticky Header -->
        <div class="services__sticky">
          <div class="section-label animate-fade-left">Our Services</div>
          <h2 class="section-heading animate-fade-left delay-100">
            Comprehensive<br>loan <span class="highlight">solutions</span>
          </h2>
          <p class="section-subtitle animate-fade-left delay-200">
            We offer a range of structured loan products designed specifically for
            the needs of salaried corporate employees.
          </p>

          <div class="services__cta-group animate-fade-left delay-300">
            <a href="#contact" class="btn btn-primary">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              Start Application
            </a>
            <a href="#contact" class="btn btn-outline">Talk to an Advisor</a>
          </div>
        </div>

        <!-- Service Cards -->
        <div class="services__cards">

          <article class="service-item animate-fade-right delay-100" aria-label="Salary Advance Loan">
            <div class="service-item__icon" style="background: rgba(37,99,235,0.12); border: 1px solid rgba(37,99,235,0.2); color: #60a5fa;" aria-hidden="true">${iconBriefcase(24)}</div>
            <div class="service-item__body">
              <div class="service-item__header">
                <h3 class="service-item__title">Salary Advance Loan</h3>
                <span class="badge badge-blue">Popular</span>
              </div>
              <p class="service-item__description">
                Access up to 3 months of your gross salary before payday. Ideal for urgent
                financial needs with flexible repayment tied to your pay schedule. Fast
                approval, zero collateral for verified salary earners.
              </p>
              <div class="service-item__tags">
                <span class="service-item__tag">Up to 3x monthly salary</span>
                <span class="service-item__tag">1–3 months tenure</span>
                <span class="service-item__tag">Auto-debit repayment</span>
              </div>
            </div>
          </article>

          <article class="service-item service-item--gold animate-fade-right delay-200" aria-label="Term Loan">
            <div class="service-item__icon" style="background: rgba(240,165,0,0.12); border: 1px solid rgba(240,165,0,0.2); color: var(--color-accent);" aria-hidden="true">${iconTrendingUp(24)}</div>
            <div class="service-item__body">
              <div class="service-item__header">
                <h3 class="service-item__title">Term Loan</h3>
                <span class="badge badge-gold">High Value</span>
              </div>
              <p class="service-item__description">
                Structured loan facilities for larger financial goals — from property
                down payments to business investments. Repaid over 12–36 months with
                competitive interest rates and automated monthly deductions.
              </p>
              <div class="service-item__tags">
                <span class="service-item__tag">₦500K – ₦10M</span>
                <span class="service-item__tag">12–36 months tenure</span>
                <span class="service-item__tag">Credit bureau checked</span>
              </div>
            </div>
          </article>

          <article class="service-item animate-fade-right delay-300" aria-label="Emergency Loan">
            <div class="service-item__icon" style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: #f87171;" aria-hidden="true">${iconLifeBuoy(24)}</div>
            <div class="service-item__body">
              <div class="service-item__header">
                <h3 class="service-item__title">Emergency Loan</h3>
                <span class="badge badge-success">Fast Track</span>
              </div>
              <p class="service-item__description">
                Designed for urgent medical, educational, or unexpected expenses. Streamlined
                application with 6-hour decision and same-day disbursement for pre-verified
                customers with a clean repayment record.
              </p>
              <div class="service-item__tags">
                <span class="service-item__tag">Same-day disbursement</span>
                <span class="service-item__tag">Up to ₦1.5M</span>
                <span class="service-item__tag">6-hour approval</span>
              </div>
            </div>
          </article>

          <article class="service-item animate-fade-right delay-400" aria-label="Asset Finance">
            <div class="service-item__icon" style="background: rgba(139,92,246,0.12); border: 1px solid rgba(139,92,246,0.2); color: #a78bfa;" aria-hidden="true">${iconCar(24)}</div>
            <div class="service-item__body">
              <div class="service-item__header">
                <h3 class="service-item__title">Asset Finance</h3>
                <span class="badge" style="background: rgba(139,92,246,0.1); color: #a78bfa; border: 1px solid rgba(139,92,246,0.2);">New</span>
              </div>
              <p class="service-item__description">
                Finance vehicles, electronics, and equipment through our structured asset
                finance product. The purchased asset serves as implicit collateral, enabling
                higher loan amounts at lower interest rates.
              </p>
              <div class="service-item__tags">
                <span class="service-item__tag">Vehicle & equipment finance</span>
                <span class="service-item__tag">Up to ₦20M</span>
                <span class="service-item__tag">24–48 months tenure</span>
              </div>
            </div>
          </article>

        </div>
      </div>
    </div>
  `;

  return section;
}
