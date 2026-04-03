import {
  iconShield,
  iconLock,
  iconCheckCircle,
  iconLandmark,
  iconIdCard,
  iconBarChart,
  iconShieldCheck,
} from '../utils/icons.js';

export function createSecurity(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'security';
  section.className = 'security section';
  section.setAttribute('aria-label', 'Security and compliance');

  section.innerHTML = `
    <div class="container">
      <div class="section-header center">
        <div class="section-label animate-fade-up">Trust & Compliance</div>
        <h2 class="section-heading animate-fade-up delay-100">
          Your data, protected<br>at every <span class="highlight">touchpoint</span>
        </h2>
        <p class="section-subtitle animate-fade-up delay-200">
          We hold ourselves to the highest standards of financial data protection, security,
          and regulatory compliance.
        </p>
      </div>

      <div class="security__grid">
        <div class="security-card animate-fade-up delay-100">
          <div class="security-card__icon security-card__icon--shield" aria-hidden="true">${iconShield(28)}</div>
          <h3 class="security-card__title">End-to-End Encryption</h3>
          <p class="security-card__text">
            All data in transit and at rest is protected with AES-256 encryption.
            Your personal and financial information is inaccessible to unauthorised parties.
          </p>
        </div>

        <div class="security-card animate-fade-up delay-200">
          <div class="security-card__icon security-card__icon--lock" aria-hidden="true">${iconLock(28)}</div>
          <h3 class="security-card__title">Secure Authentication</h3>
          <p class="security-card__text">
            Multi-factor authentication, JWT-based session management, and role-based
            access controls ensure only authorised users can access sensitive data.
          </p>
        </div>

        <div class="security-card animate-fade-up delay-300">
          <div class="security-card__icon security-card__icon--verified" aria-hidden="true">${iconCheckCircle(28)}</div>
          <h3 class="security-card__title">Regulatory Compliance</h3>
          <p class="security-card__text">
            Fully compliant with CBN regulations, NDPR data protection standards,
            and Nigerian financial services laws. Regular independent security audits.
          </p>
        </div>
      </div>

      <!-- Compliance Banner -->
      <div class="security__compliance animate-fade-up delay-200">
        <div class="security__compliance-left">
          <h3 class="security__compliance-title">Trusted compliance framework</h3>
          <p class="security__compliance-text">
            HarviMoney operates under the oversight of Nigerian financial regulatory authorities
            and adheres to all applicable data protection and lending regulations.
          </p>
        </div>
        <div class="security__badges" role="list" aria-label="Compliance certifications">
          <div class="compliance-badge" role="listitem">
            <span aria-hidden="true">${iconLandmark(16)}</span>
            <span>CBN Regulated</span>
          </div>
          <div class="compliance-badge" role="listitem">
            <span aria-hidden="true">${iconLock(16)}</span>
            <span>NDPR Compliant</span>
          </div>
          <div class="compliance-badge" role="listitem">
            <span aria-hidden="true">${iconIdCard(16)}</span>
            <span>NIMC Integrated</span>
          </div>
          <div class="compliance-badge" role="listitem">
            <span aria-hidden="true">${iconBarChart(16)}</span>
            <span>Credit Bureau</span>
          </div>
          <div class="compliance-badge" role="listitem">
            <span aria-hidden="true">${iconShieldCheck(16)}</span>
            <span>SSL / TLS 1.3</span>
          </div>
        </div>
      </div>
    </div>
  `;

  return section;
}
