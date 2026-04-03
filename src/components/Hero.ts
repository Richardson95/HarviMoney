import {
  iconLock,
  iconLandmark,
  iconZap,
  iconCheckCircle,
  iconShieldCheck,
  iconCreditCard,
  iconBuilding,
  iconClipboard,
} from '../utils/icons.js';

export function createHero(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'home';
  section.className = 'hero';
  section.setAttribute('aria-label', 'Hero');

  section.innerHTML = `
    <!-- Background -->
    <div class="hero__orb hero__orb--1" aria-hidden="true"></div>
    <div class="hero__orb hero__orb--2" aria-hidden="true"></div>
    <div class="hero__orb hero__orb--3" aria-hidden="true"></div>
    <div class="hero__grid" aria-hidden="true"></div>

    <div class="container">
      <div class="hero__inner">

        <!-- Content -->
        <div class="hero__content">

          <div class="hero__badge">
            <div class="hero__badge-dot" aria-hidden="true">
              <span class="hero__badge-pulse"></span>
            </div>
            Now accepting corporate loan applications
          </div>

          <h1 class="hero__title">
            <span class="hero__title-line">Smart Lending</span>
            <span class="hero__title-line">for <span class="hero__title-gradient">Corporate</span></span>
            <span class="hero__title-line hero__title-gradient-blue">Clients</span>
          </h1>

          <p class="hero__description">
            HarviMoney delivers secure, scalable, and intelligent loan solutions tailored for
            salary earners and corporate organisations — from application to disbursement, all
            in one seamless platform.
          </p>

          <div class="hero__cta">
            <a href="#contact" class="btn btn-accent btn-lg">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Apply for a Loan
            </a>
            <a href="#features" class="btn btn-ghost btn-lg">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
              </svg>
              See How It Works
            </a>
          </div>

          <div class="hero__trust" role="list" aria-label="Trust indicators">
            <div class="hero__trust-item" role="listitem">
              <div class="hero__trust-icon" aria-hidden="true">${iconLock(16)}</div>
              <span class="hero__trust-text">End-to-end<br>Encrypted</span>
            </div>
            <div class="hero__trust-item" role="listitem">
              <div class="hero__trust-icon" aria-hidden="true">${iconLandmark(16)}</div>
              <span class="hero__trust-text">CBN<br>Compliant</span>
            </div>
            <div class="hero__trust-item" role="listitem">
              <div class="hero__trust-icon" aria-hidden="true">${iconZap(16)}</div>
              <span class="hero__trust-text">24hr<br>Disbursement</span>
            </div>
          </div>
        </div>

        <!-- Visual -->
        <div class="hero__visual" aria-hidden="true">
          <div class="hero__mockup">

            <!-- Floating badge: approval -->
            <div class="hero__float-badge hero__float-badge--approval">
              <div class="float-badge-icon float-badge-icon--green">${iconCheckCircle(16)}</div>
              <div class="float-badge-text">
                <div class="float-badge-label">Loan Status</div>
                <div class="float-badge-value">Approved — ₦2.5M</div>
              </div>
            </div>

            <!-- Dashboard Mockup -->
            <div class="dashboard-mockup">
              <div class="dash-header">
                <div class="dash-logo">
                  <div class="dash-logo-icon">H</div>
                  <span>HarviMoney</span>
                </div>
                <div class="dash-dots">
                  <div class="dash-dot dash-dot--red"></div>
                  <div class="dash-dot dash-dot--yellow"></div>
                  <div class="dash-dot dash-dot--green"></div>
                </div>
              </div>

              <div class="dash-balance-card">
                <div class="dash-balance-label">Outstanding Balance</div>
                <div class="dash-balance-amount">₦1,875,000</div>
                <div class="dash-balance-meta">
                  <span>Original: ₦2,500,000</span>
                  <span class="dash-balance-badge">25% Paid</span>
                </div>
              </div>

              <div class="dash-stats-grid">
                <div class="dash-stat">
                  <div class="dash-stat-label">Next Due</div>
                  <div class="dash-stat-value gold">Apr 28</div>
                </div>
                <div class="dash-stat">
                  <div class="dash-stat-label">Monthly Payment</div>
                  <div class="dash-stat-value">₦125K</div>
                </div>
                <div class="dash-stat">
                  <div class="dash-stat-label">Interest Rate</div>
                  <div class="dash-stat-value">3.5%</div>
                </div>
                <div class="dash-stat">
                  <div class="dash-stat-label">Repayment</div>
                  <div class="dash-stat-value green">On Track</div>
                </div>
              </div>

              <div class="dash-progress-section">
                <div class="dash-progress-label">
                  <span>Repayment Progress</span>
                  <span>25%</span>
                </div>
                <div class="dash-progress-bar">
                  <div class="dash-progress-fill" style="width: 25%;"></div>
                </div>
              </div>

              <div class="dash-transactions">
                <div class="dash-trans-title">Recent Transactions</div>
                <div class="dash-trans-item">
                  <div class="dash-trans-left">
                    <div class="dash-trans-icon dash-trans-icon--green">${iconCreditCard(14)}</div>
                    <div>
                      <div class="dash-trans-name">Direct Debit</div>
                      <div class="dash-trans-date">Mar 28, 2026</div>
                    </div>
                  </div>
                  <div class="dash-trans-amount negative">−₦125,000</div>
                </div>
                <div class="dash-trans-item">
                  <div class="dash-trans-left">
                    <div class="dash-trans-icon dash-trans-icon--blue">${iconBuilding(14)}</div>
                    <div>
                      <div class="dash-trans-name">Loan Disbursed</div>
                      <div class="dash-trans-date">Jan 2, 2026</div>
                    </div>
                  </div>
                  <div class="dash-trans-amount positive">+₦2,500,000</div>
                </div>
                <div class="dash-trans-item">
                  <div class="dash-trans-left">
                    <div class="dash-trans-icon dash-trans-icon--gold">${iconClipboard(14)}</div>
                    <div>
                      <div class="dash-trans-name">Application Fee</div>
                      <div class="dash-trans-date">Dec 28, 2025</div>
                    </div>
                  </div>
                  <div class="dash-trans-amount negative">−₦5,000</div>
                </div>
              </div>
            </div>

            <!-- Floating badge: security -->
            <div class="hero__float-badge hero__float-badge--secure">
              <div class="float-badge-icon float-badge-icon--blue">${iconShieldCheck(16)}</div>
              <div class="float-badge-text">
                <div class="float-badge-label">Security</div>
                <div class="float-badge-value">256-bit SSL Encrypted</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  `;

  return section;
}
