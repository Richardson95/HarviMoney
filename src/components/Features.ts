import {
  iconIdCard,
  iconClipboard,
  iconBarChart,
  iconCreditCard,
  iconBell,
  iconSettings,
  iconCheck,
} from '../utils/icons.js';

interface Feature {
  icon: string;
  iconClass: string;
  title: string;
  description: string;
  items: string[];
  accent?: boolean;
}

const features: Feature[] = [
  {
    icon: iconIdCard(24),
    iconClass: 'feature-card__icon-wrap--blue',
    title: 'Secure Onboarding',
    description:
      'Every customer is onboarded through a secure identity verification process using the NIMC NIN platform, ensuring accurate profiling from day one.',
    items: [
      'NIN verification via NIMC platform',
      'Unique account number assignment',
      'Employment & financial profiling',
    ],
  },
  {
    icon: iconClipboard(24),
    iconClass: 'feature-card__icon-wrap--gold',
    title: 'Loan Application',
    description:
      'Apply for multiple loan products through an intuitive interface. Upload documents, track your application, and receive real-time feedback.',
    items: [
      'Multiple loan product options',
      'Document upload & management',
      'Real-time application tracking',
    ],
    accent: true,
  },
  {
    icon: iconBarChart(24),
    iconClass: 'feature-card__icon-wrap--green',
    title: 'User Dashboard',
    description:
      'Every borrower gets a personalised dashboard with live views of loan status, repayment schedules, and full transaction history.',
    items: [
      'Real-time application status',
      'Repayment schedule overview',
      'Historical loan records',
    ],
  },
  {
    icon: iconCreditCard(24),
    iconClass: 'feature-card__icon-wrap--blue',
    title: 'Payment & Recovery',
    description:
      'Automated direct debit linked to salary accounts ensures timely repayments. Smart recovery logic handles missed and failed payments intelligently.',
    items: [
      'ATM/debit card direct debit',
      'Automated salary-day deductions',
      'Smart missed-payment recovery',
    ],
  },
  {
    icon: iconBell(24),
    iconClass: 'feature-card__icon-wrap--purple',
    title: 'Notifications & Alerts',
    description:
      'Stay informed with automated reminders via email and SMS — from upcoming due dates to successful payments and failed transaction alerts.',
    items: [
      'Email & SMS payment reminders',
      'Upcoming due date alerts',
      'Instant payment confirmations',
    ],
  },
  {
    icon: iconSettings(24),
    iconClass: 'feature-card__icon-wrap--rose',
    title: 'Admin & Back Office',
    description:
      'Powerful admin tools for credit officers — manage applications, run risk assessments, monitor repayments, and generate recovery reports.',
    items: [
      'Application approval workflow',
      'Risk assessment & credit scoring',
      'Repayment & recovery monitoring',
    ],
  },
];

export function createFeatures(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'features';
  section.className = 'features section';
  section.setAttribute('aria-label', 'Platform features');

  section.innerHTML = `
    <div class="container">
      <div class="section-header center">
        <div class="section-label animate-fade-up">Platform Features</div>
        <h2 class="section-heading animate-fade-up delay-100">
          Everything you need for<br>
          <span class="highlight">intelligent lending</span>
        </h2>
        <p class="section-subtitle animate-fade-up delay-200">
          From onboarding to recovery, HarviMoney's modular architecture covers the full
          lending lifecycle with enterprise-grade security and automation.
        </p>
      </div>

      <div class="features__grid" role="list">
        ${features
          .map(
            (f, i) => `
          <article
            class="feature-card${f.accent ? ' feature-card--accent' : ''} animate-fade-up delay-${((i % 3) + 1) * 100}"
            role="listitem"
            aria-label="${f.title}"
          >
            <div class="feature-card__number" aria-hidden="true">0${i + 1}</div>
            <div class="feature-card__icon-wrap ${f.iconClass}" aria-hidden="true">${f.icon}</div>
            <h3 class="feature-card__title">${f.title}</h3>
            <p class="feature-card__description">${f.description}</p>
            <ul class="feature-card__list" role="list">
              ${f.items
                .map(
                  (item) => `
                <li class="feature-card__list-item">
                  <span class="feature-card__check" aria-hidden="true">${iconCheck(10)}</span>
                  <span>${item}</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </article>
        `
          )
          .join('')}
      </div>
    </div>
  `;

  return section;
}
