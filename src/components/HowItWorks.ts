import { iconIdCard, iconFolderOpen, iconLandmark, iconCoins } from '../utils/icons.js';

export function createHowItWorks(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'how-it-works';
  section.className = 'how-it-works section';
  section.setAttribute('aria-label', 'How it works');

  section.innerHTML = `
    <div class="container">
      <div class="how-it-works__content">

        <!-- Steps -->
        <div>
          <div class="section-header">
            <div class="section-label animate-fade-left">The Process</div>
            <h2 class="section-heading animate-fade-left delay-100">
              From application to<br><span class="highlight-blue">disbursement</span>
            </h2>
            <p class="section-subtitle animate-fade-left delay-200">
              Our streamlined process eliminates paperwork delays and ensures your funds
              reach you as quickly as possible.
            </p>
          </div>

          <div class="how-it-works__steps animate-fade-left delay-300">

            <div class="how-it-works__step">
              <div class="step-number step-number--1" aria-hidden="true">1</div>
              <div class="step-content">
                <h3 class="step-content__title">Register & Verify Identity</h3>
                <p class="step-content__description">
                  Create your account and complete identity verification using your NIN
                  via the NIMC platform. Upload your employment details and financial
                  documents to build a complete profile.
                </p>
              </div>
            </div>

            <div class="how-it-works__step">
              <div class="step-number step-number--2" aria-hidden="true">2</div>
              <div class="step-content">
                <h3 class="step-content__title">Apply & Submit Documents</h3>
                <p class="step-content__description">
                  Select your preferred loan product, specify the amount, and submit
                  required documentation including your employment letter, bank
                  statements, and salary schedule.
                </p>
              </div>
            </div>

            <div class="how-it-works__step">
              <div class="step-number step-number--3" aria-hidden="true">3</div>
              <div class="step-content">
                <h3 class="step-content__title">Credit Check & Approval</h3>
                <p class="step-content__description">
                  Our system performs an automated credit bureau check and risk
                  assessment. A credit officer reviews and approves your application
                  — typically within 24 hours.
                </p>
              </div>
            </div>

            <div class="how-it-works__step">
              <div class="step-number step-number--4" aria-hidden="true">4</div>
              <div class="step-content">
                <h3 class="step-content__title">Disbursement & Repayment</h3>
                <p class="step-content__description">
                  Funds are disbursed directly to your account. Repayments are
                  automatically debited from your salary account on the due date —
                  no manual payments needed.
                </p>
              </div>
            </div>

          </div>
        </div>

        <!-- Visual Cards -->
        <div class="how-it-works__visual animate-fade-right delay-200">

          <div class="process-card animate-scale delay-100">
            <div class="process-card__icon" style="background: rgba(37,99,235,0.12); border: 1px solid rgba(37,99,235,0.2); color: #60a5fa;">${iconIdCard(18)}</div>
            <div>
              <div class="process-card__title">NIN Verification</div>
              <div class="process-card__text">Identity confirmed via NIMC database in real-time</div>
            </div>
            <div class="process-card__badge">
              <span class="badge badge-blue">Live</span>
            </div>
          </div>

          <div class="process-card animate-scale delay-200">
            <div class="process-card__icon" style="background: rgba(240,165,0,0.12); border: 1px solid rgba(240,165,0,0.2); color: var(--color-accent);">${iconFolderOpen(18)}</div>
            <div>
              <div class="process-card__title">Document Processing</div>
              <div class="process-card__text">AI-assisted document review and classification</div>
            </div>
            <div class="process-card__badge">
              <span class="badge badge-gold">AI Powered</span>
            </div>
          </div>

          <div class="process-card animate-scale delay-300">
            <div class="process-card__icon" style="background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.2); color: #34d399;">${iconLandmark(18)}</div>
            <div>
              <div class="process-card__title">Credit Bureau Integration</div>
              <div class="process-card__text">Automated credit scoring and risk assessment</div>
            </div>
            <div class="process-card__badge">
              <span class="badge badge-success">Integrated</span>
            </div>
          </div>

          <div class="process-card animate-scale delay-400">
            <div class="process-card__icon" style="background: rgba(139,92,246,0.12); border: 1px solid rgba(139,92,246,0.2); color: #a78bfa;">${iconCoins(18)}</div>
            <div>
              <div class="process-card__title">Direct Debit Setup</div>
              <div class="process-card__text">Salary account linked for seamless auto-repayments</div>
            </div>
            <div class="process-card__badge">
              <span class="badge" style="background: rgba(139,92,246,0.1); color: #a78bfa; border: 1px solid rgba(139,92,246,0.2);">Automated</span>
            </div>
          </div>

          <!-- Stats row -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-top: var(--space-sm);">
            <div class="process-card animate-scale delay-500" style="flex-direction: column; text-align: center; padding: var(--space-lg);">
              <div style="font-family: var(--font-primary); font-size: 2rem; font-weight: 900; background: var(--gradient-blue-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                &lt;24hrs
              </div>
              <div style="font-size: var(--text-xs); color: var(--color-text-secondary); font-weight: 500; margin-top: 4px;">Average Approval</div>
            </div>
            <div class="process-card animate-scale delay-600" style="flex-direction: column; text-align: center; padding: var(--space-lg);">
              <div style="font-family: var(--font-primary); font-size: 2rem; font-weight: 900; background: var(--gradient-accent-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                0 Manual
              </div>
              <div style="font-size: var(--text-xs); color: var(--color-text-secondary); font-weight: 500; margin-top: 4px;">Repayment Steps</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  return section;
}
