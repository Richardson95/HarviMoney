import { iconCoins, iconUsers, iconTrendingUp, iconZap } from '../utils/icons.js';

export function createStats(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'stats';
  section.setAttribute('aria-label', 'Key statistics');

  const stats = [
    {
      icon: iconCoins(20),
      iconClass: 'stats__icon--gold',
      number: '50',
      prefix: '₦',
      suffix: 'B+',
      numberClass: 'stats__number--gold',
      label: 'Loans Disbursed',
      sublabel: 'Total portfolio value',
      decimals: 0,
    },
    {
      icon: iconUsers(20),
      iconClass: 'stats__icon--blue',
      number: '25000',
      prefix: '',
      suffix: '+',
      numberClass: 'stats__number--blue',
      label: 'Corporate Clients',
      sublabel: 'Active borrowers',
      decimals: 0,
    },
    {
      icon: iconTrendingUp(20),
      iconClass: 'stats__icon--green',
      number: '98.7',
      prefix: '',
      suffix: '%',
      numberClass: 'stats__number--green',
      label: 'Recovery Rate',
      sublabel: 'Automated repayments',
      decimals: 1,
    },
    {
      icon: iconZap(20),
      iconClass: 'stats__icon--purple',
      number: '24',
      prefix: '<',
      suffix: 'hrs',
      numberClass: 'stats__number--white',
      label: 'Disbursement Time',
      sublabel: 'After approval',
      decimals: 0,
    },
  ];

  section.innerHTML = `
    <div class="container">
      <div class="stats__grid" role="list" aria-label="Statistics">
        ${stats
          .map(
            (s, i) => `
          <div class="stats__item animate-fade-up delay-${(i + 1) * 100}" role="listitem">
            <div class="stats__icon ${s.iconClass}" aria-hidden="true">${s.icon}</div>
            <div
              class="stats__number ${s.numberClass}"
              data-counter="${s.number}"
              data-prefix="${s.prefix}"
              data-suffix="${s.suffix}"
              data-decimals="${s.decimals}"
              data-duration="1600"
              aria-label="${s.prefix}${s.number}${s.suffix} ${s.label}"
            >${s.prefix}0${s.suffix}</div>
            <div class="stats__label">${s.label}</div>
            <div class="stats__sublabel">${s.sublabel}</div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;

  return section;
}
