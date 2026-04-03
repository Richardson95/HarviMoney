import { iconCheckCircle, iconZap, iconTarget, iconLock, iconSmartphone } from '../utils/icons.js';

export function createAbout(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'about';
  section.className = 'about section';
  section.setAttribute('aria-label', 'About HarviMoney');

  section.innerHTML = `
    <div class="container">
      <div class="about__inner">

        <!-- Visual -->
        <div class="about__visual animate-fade-left">
          <div class="about__graphic">
            <div class="about__cards-stack">

              <!-- Main card with chart -->
              <div class="about-visual-card about-visual-card--main">
                <div class="about-main-header">
                  <div class="about-main-logo">
                    <div class="about-main-logo-icon">H</div>
                    <span>Portfolio Overview</span>
                  </div>
                  <span class="badge badge-success">
                    <span style="width:6px;height:6px;border-radius:50%;background:#34d399;display:inline-block;"></span>
                    Live
                  </span>
                </div>

                <div class="about-chart" aria-label="Loan disbursement chart" role="img">
                  <div>
                    <div class="about-bar about-bar--1"></div>
                    <div class="about-chart-label">Oct</div>
                  </div>
                  <div>
                    <div class="about-bar about-bar--2"></div>
                    <div class="about-chart-label">Nov</div>
                  </div>
                  <div>
                    <div class="about-bar about-bar--3"></div>
                    <div class="about-chart-label">Dec</div>
                  </div>
                  <div>
                    <div class="about-bar about-bar--4"></div>
                    <div class="about-chart-label">Jan</div>
                  </div>
                  <div>
                    <div class="about-bar about-bar--5"></div>
                    <div class="about-chart-label">Feb</div>
                  </div>
                  <div>
                    <div class="about-bar about-bar--6"></div>
                    <div class="about-chart-label">Mar</div>
                  </div>
                  <div>
                    <div class="about-bar about-bar--7"></div>
                    <div class="about-chart-label">Apr</div>
                  </div>
                </div>

                <div class="about-metric-row">
                  <div class="about-metric">
                    <div class="about-metric-value" style="color: #60a5fa;">₦50B</div>
                    <div class="about-metric-label">Disbursed</div>
                  </div>
                  <div class="about-metric">
                    <div class="about-metric-value" style="color: var(--color-accent);">98.7%</div>
                    <div class="about-metric-label">Recovery</div>
                  </div>
                  <div class="about-metric">
                    <div class="about-metric-value" style="color: #34d399;">25K+</div>
                    <div class="about-metric-label">Clients</div>
                  </div>
                </div>
              </div>

              <!-- Floating card 1 -->
              <div class="about-visual-card about-visual-card--floating-1" aria-hidden="true">
                <div class="float-card-row">
                  <div class="float-card-icon" style="background: rgba(16,185,129,0.12); color: #34d399;">${iconCheckCircle(14)}</div>
                  <div>
                    <div class="float-card-stat" style="color: #34d399;">98.7%</div>
                    <div class="float-card-text">Repayment Success</div>
                  </div>
                </div>
              </div>

              <!-- Floating card 2 -->
              <div class="about-visual-card about-visual-card--floating-2" aria-hidden="true">
                <div class="float-card-row">
                  <div class="float-card-icon" style="background: var(--color-accent-light); color: var(--color-accent);">${iconZap(14)}</div>
                  <div>
                    <div class="float-card-stat" style="color: var(--color-accent);">&lt;24hrs</div>
                    <div class="float-card-text">Avg. Disbursement</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="about__content animate-fade-right">
          <div class="section-label">About HarviMoney</div>
          <h2 class="section-heading">
            Evolving from retail to<br>
            <span class="highlight">corporate lending</span>
          </h2>
          <p class="section-subtitle">
            HarviMoney started as a trusted micro-credit provider for market traders and retail
            borrowers. Today, we are expanding our capabilities into structured corporate lending —
            bringing the same speed, reliability, and innovation to salary earners and organisations.
          </p>
          <p class="section-subtitle" style="margin-top: var(--space-lg);">
            Our proprietary platform integrates directly with the Credit Bureau, NIMC's NIN
            database, and banking infrastructure to deliver loan decisions that are both fast
            and data-driven — protecting both borrower and lender.
          </p>

          <div class="about__values">
            <div class="about-value animate-scale delay-100">
              <div class="about-value__icon" aria-hidden="true">${iconTarget(22)}</div>
              <div class="about-value__title">Precision Credit</div>
              <div class="about-value__text">Data-driven decisions using real bureau scores and verified employment data.</div>
            </div>
            <div class="about-value animate-scale delay-200">
              <div class="about-value__icon" aria-hidden="true">${iconLock(22)}</div>
              <div class="about-value__title">Enterprise Security</div>
              <div class="about-value__text">End-to-end encryption, CBN compliance, and secure authentication.</div>
            </div>
            <div class="about-value animate-scale delay-300">
              <div class="about-value__icon" aria-hidden="true">${iconZap(22)}</div>
              <div class="about-value__title">Automation First</div>
              <div class="about-value__text">From application to repayment — minimal manual intervention.</div>
            </div>
            <div class="about-value animate-scale delay-400">
              <div class="about-value__icon" aria-hidden="true">${iconSmartphone(22)}</div>
              <div class="about-value__title">Future-Ready</div>
              <div class="about-value__text">Built for mobile, API-ready, and designed to scale with your growth.</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  return section;
}
