import '../styles/app-layout.css';
import '../styles/dashboard.css';
import '../styles/auth.css';
import { getUser, logout } from '../store/auth.js';
import { navigate } from '../router/index.js';
import {
  loanApplications, userTransactions, repaymentSchedule,
  formatCurrency, formatDate,
} from '../store/mockData.js';
import {
  iconBarChart, iconCreditCard, iconClipboard, iconBell, iconSettings,
  iconArrowRight, iconCheck, iconZap, iconCoins, iconBriefcase,
  iconTrendingUp, iconLock, iconFolderOpen,
} from '../utils/icons.js';

type DashView = 'overview' | 'loans' | 'apply' | 'payments' | 'profile';

const NAV_ITEMS: Array<{ id: DashView; label: string; icon: string; badge?: string }> = [
  { id: 'overview', label: 'Overview', icon: iconBarChart(18) },
  { id: 'loans', label: 'My Loans', icon: iconCreditCard(18) },
  { id: 'apply', label: 'Apply for Loan', icon: iconClipboard(18), badge: 'New' },
  { id: 'payments', label: 'Payments', icon: iconCoins(18) },
  { id: 'profile', label: 'Profile & Settings', icon: iconSettings(18) },
];

export function mountDashboard(container: HTMLElement): () => void {
  const _u = getUser();
  if (!_u) { navigate('/signin'); return () => {}; }
  const user = _u; // narrowed to non-null; TypeScript preserves this type in closures

  let view: DashView = 'overview';
  const hash = window.location.hash;
  if (hash.includes('/apply')) view = 'apply';
  else if (hash.includes('/loans')) view = 'loans';
  else if (hash.includes('/payments')) view = 'payments';
  else if (hash.includes('/profile')) view = 'profile';

  const activeLoan = loanApplications.find((l) => l.userId === 'USR-001' && l.status === 'active');
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  function renderShell(): string {
    return `
      <div class="app-shell">
        <!-- Sidebar -->
        <aside class="sidebar" id="dash-sidebar" aria-label="Dashboard navigation">
          <a href="#/" class="sidebar__logo">
            <div class="sidebar__logo-icon">H</div>
            <span class="sidebar__logo-text">Harvi<span>Money</span></span>
          </a>
          <div class="sidebar__section">
            <div class="sidebar__section-label">Menu</div>
            <nav class="sidebar__nav" role="list">
              ${NAV_ITEMS.map((item) => `
                <button
                  class="sidebar__link ${view === item.id ? 'active' : ''}"
                  data-view="${item.id}"
                  role="listitem"
                  aria-current="${view === item.id ? 'page' : 'false'}"
                >
                  <span class="sidebar__link-icon">${item.icon}</span>
                  <span>${item.label}</span>
                  ${item.badge ? `<span class="sidebar__link-badge sidebar__link-badge--gold">${item.badge}</span>` : ''}
                </button>
              `).join('')}
            </nav>
          </div>
          <div class="sidebar__footer">
            <div class="sidebar__user">
              <div class="sidebar__avatar">${initials}</div>
              <div class="sidebar__user-info">
                <div class="sidebar__user-name">${user.firstName} ${user.lastName}</div>
                <div class="sidebar__user-role">${user.accountNumber}</div>
              </div>
              <button class="sidebar__logout" id="logout-btn" title="Log out" aria-label="Log out">${iconArrowRight(16)}</button>
            </div>
          </div>
        </aside>
        <div class="sidebar-overlay" id="sidebar-overlay"></div>

        <!-- Main -->
        <div class="app-main">
          <header class="app-topbar">
            <div class="app-topbar__left">
              <button class="app-topbar__hamburger" id="hamburger" aria-label="Toggle sidebar">${iconBriefcase(20)}</button>
              <h1 class="app-topbar__title" id="page-title">${getViewTitle(view)}</h1>
            </div>
            <div class="app-topbar__right">
              <button class="topbar-icon-btn" aria-label="Notifications">
                ${iconBell(18)}
                <span class="topbar-notif-dot"></span>
              </button>
              <button class="topbar-user" id="topbar-user-btn">
                <div class="topbar-avatar">${initials}</div>
                <span class="topbar-username">${user.firstName}</span>
              </button>
            </div>
          </header>
          <main class="app-content" id="dash-content"></main>
        </div>
      </div>
    `;
  }

  function getViewTitle(v: DashView): string {
    return { overview: 'Dashboard', loans: 'My Loans', apply: 'Apply for Loan', payments: 'Payment History', profile: 'Profile & Settings' }[v];
  }

  function renderView(v: DashView): string {
    switch (v) {
      case 'overview': return renderOverview();
      case 'loans': return renderLoans();
      case 'apply': return renderApply();
      case 'payments': return renderPayments();
      case 'profile': return renderProfile();
    }
  }

  function renderOverview(): string {
    const paid = activeLoan ? 3 : 0;
    const total = activeLoan?.tenure ?? 24;
    const pct = Math.round((paid / total) * 100);

    return `
      <div class="overview-grid">
        <div class="overview-card overview-card--blue">
          <div class="overview-card__header">
            <div class="overview-card__icon overview-card__icon--blue">${iconCoins(20)}</div>
            <span class="overview-card__trend overview-card__trend--neutral">Active</span>
          </div>
          <div class="overview-card__label">Outstanding Balance</div>
          <div class="overview-card__value">${activeLoan ? formatCurrency(activeLoan.outstanding) : '—'}</div>
          <div class="overview-card__sub">Loan #${activeLoan?.id ?? 'N/A'}</div>
        </div>
        <div class="overview-card overview-card--gold">
          <div class="overview-card__header">
            <div class="overview-card__icon overview-card__icon--gold">${iconClipboard(20)}</div>
            <span class="overview-card__trend overview-card__trend--up">On Track</span>
          </div>
          <div class="overview-card__label">Next Payment</div>
          <div class="overview-card__value">${activeLoan ? formatCurrency(activeLoan.monthlyPayment) : '—'}</div>
          <div class="overview-card__sub">${activeLoan?.nextPaymentDate ? formatDate(activeLoan.nextPaymentDate) : '—'}</div>
        </div>
        <div class="overview-card overview-card--green">
          <div class="overview-card__header">
            <div class="overview-card__icon overview-card__icon--green">${iconTrendingUp(20)}</div>
            <span class="overview-card__trend overview-card__trend--up">+${pct}%</span>
          </div>
          <div class="overview-card__label">Repayment Progress</div>
          <div class="overview-card__value">${paid}/${total}</div>
          <div class="overview-card__sub">Instalments completed</div>
        </div>
        <div class="overview-card overview-card--purple">
          <div class="overview-card__header">
            <div class="overview-card__icon overview-card__icon--purple">${iconZap(20)}</div>
            <span class="overview-card__trend overview-card__trend--neutral">CBN Rate</span>
          </div>
          <div class="overview-card__label">Interest Rate</div>
          <div class="overview-card__value">${activeLoan?.interestRate ?? 3.5}%</div>
          <div class="overview-card__sub">Per month flat rate</div>
        </div>
      </div>

      ${activeLoan ? `
        <div class="active-loan-card">
          <div class="active-loan-header">
            <div>
              <div class="active-loan-title">${activeLoan.product}</div>
              <div class="active-loan-id">${activeLoan.id}</div>
            </div>
            <span class="status-badge status-badge--active">Active</span>
          </div>
          <div class="active-loan-amount">${formatCurrency(activeLoan.outstanding)}</div>
          <div class="active-loan-meta">
            <div class="active-loan-meta-item">
              <div class="active-loan-meta-label">Original Amount</div>
              <div class="active-loan-meta-value">${formatCurrency(activeLoan.amount)}</div>
            </div>
            <div class="active-loan-meta-item">
              <div class="active-loan-meta-label">Monthly Payment</div>
              <div class="active-loan-meta-value">${formatCurrency(activeLoan.monthlyPayment)}</div>
            </div>
            <div class="active-loan-meta-item">
              <div class="active-loan-meta-label">Tenure</div>
              <div class="active-loan-meta-value">${activeLoan.tenure} months</div>
            </div>
            <div class="active-loan-meta-item">
              <div class="active-loan-meta-label">Disbursed</div>
              <div class="active-loan-meta-value">${formatDate(activeLoan.disbursedDate!)}</div>
            </div>
          </div>
          <div class="active-loan-progress">
            <div class="active-loan-progress-labels">
              <span>Repayment Progress</span>
              <span>${pct}% (${paid} of ${total} payments)</span>
            </div>
            <div class="active-loan-progress-bar">
              <div class="active-loan-progress-fill" style="width:${pct}%;"></div>
            </div>
          </div>
        </div>
      ` : `
        <div class="section-card" style="margin-bottom:var(--space-2xl);">
          <div class="empty-state">
            <div class="empty-state__icon">${iconCreditCard(28)}</div>
            <div class="empty-state__title">No Active Loans</div>
            <p class="empty-state__text">You don't have any active loans yet. Apply for a loan to get started.</p>
            <button class="btn btn-primary" data-view="apply">Apply for a Loan</button>
          </div>
        </div>
      `}

      <div class="dash-two-col">
        <!-- Repayment schedule -->
        <div class="section-card">
          <div class="section-card__header">
            <span class="section-card__title">Repayment Schedule</span>
            <button class="section-card__action" data-view="payments">View all</button>
          </div>
          <div class="overflow-x-auto">
            <table class="data-table" style="min-width:460px;">
              <thead>
                <tr>
                  <th>#</th><th>Due Date</th><th>Amount</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${repaymentSchedule.map((r, i) => `
                  <tr>
                    <td class="col-date">${i + 1}</td>
                    <td class="col-date">${formatDate(r.dueDate)}</td>
                    <td class="col-amount">${formatCurrency(r.amount)}</td>
                    <td><span class="status-badge status-badge--${r.status}">${r.status === 'paid' ? 'Paid' : r.status === 'upcoming' ? 'Upcoming' : r.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Quick actions + recent transactions -->
        <div style="display:flex;flex-direction:column;gap:var(--space-xl);">
          <div class="section-card">
            <div class="section-card__header">
              <span class="section-card__title">Quick Actions</span>
            </div>
            <div class="quick-actions">
              <button class="quick-action" data-view="apply">
                <div class="quick-action__icon" style="background:var(--color-secondary-light);color:#60a5fa;">${iconClipboard(18)}</div>
                Apply for Loan
              </button>
              <button class="quick-action" data-view="payments">
                <div class="quick-action__icon" style="background:var(--color-accent-light);color:var(--color-accent);">${iconCoins(18)}</div>
                View Payments
              </button>
              <button class="quick-action" data-view="loans">
                <div class="quick-action__icon" style="background:rgba(16,185,129,0.1);color:#34d399;">${iconCreditCard(18)}</div>
                My Loans
              </button>
              <button class="quick-action" data-view="profile">
                <div class="quick-action__icon" style="background:rgba(139,92,246,0.1);color:#a78bfa;">${iconSettings(18)}</div>
                Profile
              </button>
            </div>
          </div>

          <div class="section-card">
            <div class="section-card__header">
              <span class="section-card__title">Recent Transactions</span>
              <button class="section-card__action" data-view="payments">View all</button>
            </div>
            ${userTransactions.slice(0, 3).map((tx) => `
              <div class="transaction-item">
                <div class="transaction-item__left">
                  <div class="transaction-item__icon transaction-item__icon--${tx.type}">
                    ${tx.type === 'credit' ? iconCoins(18) : tx.type === 'debit' ? iconCreditCard(18) : iconClipboard(16)}
                  </div>
                  <div>
                    <div class="transaction-item__desc">${tx.description}</div>
                    <div class="transaction-item__ref">${tx.reference}</div>
                  </div>
                </div>
                <div>
                  <div class="transaction-item__amount transaction-item__amount--${tx.type}">
                    ${tx.type === 'credit' ? '+' : '−'}${formatCurrency(tx.amount)}
                  </div>
                  <div style="font-size:10px;color:var(--color-text-muted);text-align:right;">${formatDate(tx.date)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderLoans(): string {
    const userLoans = loanApplications.filter((l) => l.userId === 'USR-001');
    return `
      <div class="section-card">
        <div class="section-card__header">
          <span class="section-card__title">All Loan Applications</span>
          <button class="btn btn-primary btn-sm" data-view="apply">${iconClipboard(14)} New Application</button>
        </div>
        ${userLoans.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state__icon">${iconCreditCard(28)}</div>
            <div class="empty-state__title">No loan history</div>
            <p class="empty-state__text">You haven't applied for any loans yet.</p>
            <button class="btn btn-primary" data-view="apply">Apply Now</button>
          </div>
        ` : `
          <div style="overflow-x:auto;">
            <table class="data-table" style="min-width:700px;">
              <thead>
                <tr><th>Loan ID</th><th>Product</th><th>Amount</th><th>Tenure</th><th>Applied</th><th>Status</th></tr>
              </thead>
              <tbody>
                ${userLoans.map((l) => `
                  <tr>
                    <td style="font-size:11px;color:var(--color-text-muted);">${l.id}</td>
                    <td style="font-weight:600;color:var(--color-text-primary);">${l.product}</td>
                    <td class="col-amount">${formatCurrency(l.amount)}</td>
                    <td>${l.tenure} months</td>
                    <td class="col-date">${formatDate(l.appliedDate)}</td>
                    <td><span class="status-badge status-badge--${l.status}">${l.status.replace('_',' ')}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;
  }

  let applyStep = 0;
  let selectedProduct = '';
  let loanAmount = 500000;
  let loanTenure = 12;

  function renderApply(): string {
    const products = [
      { id: 'salary', name: 'Salary Advance', range: 'Up to 3× salary', icon: iconBriefcase(22), color: 'var(--color-secondary-light)', textColor: '#60a5fa' },
      { id: 'term', name: 'Term Loan', range: '₦500K – ₦10M', icon: iconTrendingUp(22), color: 'var(--color-accent-light)', textColor: 'var(--color-accent)' },
      { id: 'emergency', name: 'Emergency Loan', range: 'Up to ₦1.5M', icon: iconZap(22), color: 'rgba(16,185,129,0.1)', textColor: '#34d399' },
      { id: 'asset', name: 'Asset Finance', range: 'Up to ₦20M', icon: iconCreditCard(22), color: 'rgba(139,92,246,0.1)', textColor: '#a78bfa' },
    ];

    const stepContent = () => {
      if (applyStep === 0) return `
        <h3 style="font-family:var(--font-primary);font-size:var(--text-xl);font-weight:700;color:var(--color-text-primary);margin-bottom:var(--space-sm);">Select a Loan Product</h3>
        <p style="font-size:var(--text-sm);color:var(--color-text-secondary);margin-bottom:var(--space-xl);">Choose the loan type that best matches your needs.</p>
        <div class="product-grid">
          ${products.map((p) => `
            <div class="product-card ${selectedProduct === p.id ? 'selected' : ''}" data-product="${p.id}">
              <div class="product-card__icon" style="background:${p.color};color:${p.textColor};">${p.icon}</div>
              <div class="product-card__name">${p.name}</div>
              <div class="product-card__range">${p.range}</div>
              <div class="product-card__check">${iconCheck(10)}</div>
            </div>
          `).join('')}
        </div>
        <div class="step-actions" style="margin-top:var(--space-2xl);">
          <button class="btn btn-primary" id="apply-next" ${!selectedProduct ? 'disabled style="opacity:0.5;"' : ''}>Continue</button>
        </div>
      `;

      if (applyStep === 1) {
        const monthly = Math.round(loanAmount * (1 + loanTenure * 0.035) / loanTenure);
        return `
          <h3 style="font-family:var(--font-primary);font-size:var(--text-xl);font-weight:700;color:var(--color-text-primary);margin-bottom:var(--space-sm);">Loan Details</h3>
          <p style="font-size:var(--text-sm);color:var(--color-text-secondary);margin-bottom:var(--space-xl);">Specify your loan amount and repayment tenure.</p>
          <div style="display:flex;flex-direction:column;gap:var(--space-xl);">
            <div>
              <label class="form-label" style="margin-bottom:var(--space-md);">Loan Amount</label>
              <div class="salary-display" id="amount-display">${formatCurrency(loanAmount)}</div>
              <input type="range" class="amount-slider" id="amount-range"
                min="100000" max="10000000" step="50000" value="${loanAmount}" />
              <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--color-text-muted);margin-top:6px;">
                <span>₦100,000</span><span>₦10,000,000</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="tenure-select">Repayment Tenure</label>
              <select id="tenure-select" class="form-select">
                ${[3,6,12,18,24,36,48].map((m) => `<option value="${m}" ${loanTenure === m ? 'selected' : ''}>${m} months</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="purpose-input">Loan Purpose <span class="form-label__req">*</span></label>
              <input id="purpose-input" class="form-input" type="text" placeholder="e.g. Property down payment, school fees..." />
            </div>
            <div style="background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-lg);display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-md);text-align:center;">
              <div>
                <div style="font-size:10px;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px;">Est. Monthly</div>
                <div style="font-family:var(--font-primary);font-weight:800;color:var(--color-accent);" id="monthly-est">${formatCurrency(monthly)}</div>
              </div>
              <div>
                <div style="font-size:10px;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px;">Interest Rate</div>
                <div style="font-family:var(--font-primary);font-weight:800;color:var(--color-text-primary);">3.5% / month</div>
              </div>
              <div>
                <div style="font-size:10px;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px;">Total Repayment</div>
                <div style="font-family:var(--font-primary);font-weight:800;color:var(--color-text-primary);" id="total-est">${formatCurrency(monthly * loanTenure)}</div>
              </div>
            </div>
          </div>
          <div class="step-actions" style="margin-top:var(--space-xl);">
            <button class="btn btn-outline" id="apply-back">Back</button>
            <button class="btn btn-primary" id="apply-next">Continue</button>
          </div>
        `;
      }

      if (applyStep === 2) return `
        <h3 style="font-family:var(--font-primary);font-size:var(--text-xl);font-weight:700;color:var(--color-text-primary);margin-bottom:var(--space-sm);">Upload Documents</h3>
        <p style="font-size:var(--text-sm);color:var(--color-text-secondary);margin-bottom:var(--space-xl);">Upload clear, legible copies of the required documents.</p>
        <div style="display:flex;flex-direction:column;gap:var(--space-lg);">
          ${[
            { id: 'emp-letter', label: 'Employment Letter', hint: 'On company letterhead, signed by HR' },
            { id: 'bank-stmt', label: 'Bank Statement (6 months)', hint: 'Most recent 6 months from your salary account' },
            { id: 'id-card', label: 'Valid Government ID', hint: 'National ID, Passport, or Driver\'s Licence' },
          ].map((doc) => `
            <div>
              <label class="form-label" style="margin-bottom:var(--space-sm);">${doc.label} <span class="form-label__req">*</span></label>
              <div class="file-upload-area" id="upload-${doc.id}">
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" data-doc="${doc.id}" />
                <div class="file-upload-icon">${iconFolderOpen(20)}</div>
                <div class="file-upload-label">Click to upload or drag & drop</div>
                <div class="file-upload-hint">${doc.hint} · PDF, JPG or PNG · Max 5MB</div>
                <div class="file-upload-filename" id="fname-${doc.id}" style="display:none;"></div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="step-actions" style="margin-top:var(--space-xl);">
          <button class="btn btn-outline" id="apply-back">Back</button>
          <button class="btn btn-primary" id="apply-next">Continue</button>
        </div>
      `;

      if (applyStep === 3) {
        const productName = products.find((p) => p.id === selectedProduct)?.name ?? selectedProduct;
        const monthly = Math.round(loanAmount * (1 + loanTenure * 0.035) / loanTenure);
        return `
          <h3 style="font-family:var(--font-primary);font-size:var(--text-xl);font-weight:700;color:var(--color-text-primary);margin-bottom:var(--space-sm);">Review & Submit</h3>
          <p style="font-size:var(--text-sm);color:var(--color-text-secondary);margin-bottom:var(--space-xl);">Review your application before submission.</p>
          <div class="review-summary">
            ${[
              ['Loan Product', productName],
              ['Applicant Name', `${user.firstName} ${user.lastName}`],
              ['Account Number', user.accountNumber],
              ['Employer', user.employer ?? '—'],
              ['Loan Amount', formatCurrency(loanAmount)],
              ['Tenure', `${loanTenure} months`],
              ['Monthly Payment (Est.)', formatCurrency(monthly)],
              ['Interest Rate', '3.5% per month'],
            ].map(([label, value]) => `
              <div class="review-summary__row">
                <span class="review-summary__label">${label}</span>
                <span class="review-summary__value ${label === 'Loan Amount' ? 'accent' : ''}">${value}</span>
              </div>
            `).join('')}
          </div>
          <div style="background:rgba(37,99,235,0.06);border:1px solid rgba(37,99,235,0.2);border-radius:var(--radius-md);padding:var(--space-md) var(--space-lg);font-size:var(--text-xs);color:#93c5fd;margin-top:var(--space-xl);line-height:1.7;">
            By submitting this application, you confirm that all information provided is accurate and you authorise HarviMoney to perform a credit bureau check.
          </div>
          <div class="step-actions" style="margin-top:var(--space-xl);">
            <button class="btn btn-outline" id="apply-back">Back</button>
            <button class="btn btn-accent" id="apply-submit" style="font-weight:700;">Submit Application</button>
          </div>
        `;
      }

      return '';
    };

    return `
      <div style="max-width:640px;">
        <div style="display:flex;align-items:center;gap:0;margin-bottom:var(--space-3xl);">
          ${['Choose Product','Loan Details','Documents','Review'].map((label, i) => `
            <div style="display:flex;align-items:center;flex:1;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
                <div style="width:32px;height:32px;border-radius:50%;border:2px solid ${i < applyStep ? '#10B981' : i === applyStep ? 'var(--color-secondary)' : 'var(--color-border)'};background:${i < applyStep ? '#10B981' : i === applyStep ? 'var(--color-secondary)' : 'var(--color-surface-2)'};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${i <= applyStep ? 'white' : 'var(--color-text-muted)'};">
                  ${i < applyStep ? iconCheck(12) : i + 1}
                </div>
                <span style="font-size:10px;font-weight:600;color:${i === applyStep ? '#60a5fa' : i < applyStep ? '#34d399' : 'var(--color-text-muted)'};">${label}</span>
              </div>
              ${i < 3 ? `<div style="flex:1;height:2px;background:${i < applyStep ? '#10B981' : 'var(--color-border)'};margin:0 8px;margin-bottom:20px;"></div>` : ''}
            </div>
          `).join('')}
        </div>
        <div id="apply-step-content">${stepContent()}</div>
      </div>
    `;
  }

  function renderPayments(): string {
    return `
      <div class="section-card">
        <div class="section-card__header">
          <span class="section-card__title">All Transactions</span>
          <span style="font-size:var(--text-xs);color:var(--color-text-muted);">${userTransactions.length} records</span>
        </div>
        <div style="overflow-x:auto;">
          <table class="data-table" style="min-width:600px;">
            <thead>
              <tr><th>Description</th><th>Date</th><th>Amount</th><th>Reference</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${userTransactions.map((tx) => `
                <tr>
                  <td style="font-weight:500;color:var(--color-text-primary);">${tx.description}</td>
                  <td class="col-date">${formatDate(tx.date)}</td>
                  <td class="col-amount" style="color:${tx.type === 'credit' ? '#34d399' : tx.type === 'debit' ? '#f87171' : 'var(--color-text-muted)'};">
                    ${tx.type === 'credit' ? '+' : '−'}${formatCurrency(tx.amount)}
                  </td>
                  <td style="font-size:11px;color:var(--color-text-muted);">${tx.reference}</td>
                  <td><span class="status-badge status-badge--${tx.status}">${tx.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderProfile(): string {
    return `
      <div style="max-width:720px;">
        <div class="profile-card">
          <div class="profile-banner">
            <div class="profile-avatar-wrap">
              <div class="profile-avatar">${initials}</div>
            </div>
          </div>
          <div class="profile-info">
            <div class="profile-name">${user.firstName} ${user.lastName}</div>
            <span class="status-badge status-badge--active">Verified Customer</span>
            <div class="profile-meta">
              <div class="profile-meta-item">${iconBriefcase(14)}<span>${user.employer ?? '—'}</span></div>
              <div class="profile-meta-item">${iconCoins(14)}<span>${user.accountNumber}</span></div>
            </div>
          </div>
          <div class="profile-fields-grid">
            ${[
              ['Full Name', `${user.firstName} ${user.lastName}`],
              ['Email Address', user.email],
              ['Phone Number', user.phone],
              ['Employer', user.employer ?? '—'],
              ['Job Title', user.position ?? '—'],
              ['Monthly Salary', user.salary ? formatCurrency(user.salary) : '—'],
              ['Bank', user.bankName ?? '—'],
              ['Account Number', user.bankAccount ?? '—'],
            ].map(([label, value]) => `
              <div class="profile-field">
                <div class="profile-field__label">${label}</div>
                <div class="profile-field__value">${value}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div style="display:flex;gap:var(--space-md);">
          <button class="btn btn-outline">${iconLock(16)} Change Password</button>
          <button class="btn btn-outline" style="color:#f87171;border-color:rgba(239,68,68,0.3);" id="profile-logout">Log Out</button>
        </div>
      </div>
    `;
  }

  function updateView(v: DashView) {
    view = v;
    const content = container.querySelector<HTMLElement>('#dash-content');
    const title = container.querySelector<HTMLElement>('#page-title');
    if (content) content.innerHTML = renderView(v);
    if (title) title.textContent = getViewTitle(v);

    container.querySelectorAll<HTMLElement>('.sidebar__link').forEach((link) => {
      link.classList.toggle('active', link.dataset['view'] === v);
      link.setAttribute('aria-current', link.dataset['view'] === v ? 'page' : 'false');
    });

    attachViewListeners();
  }

  function attachViewListeners() {
    // Sidebar nav
    container.querySelectorAll<HTMLButtonElement>('.sidebar__link[data-view]').forEach((btn) => {
      btn.addEventListener('click', () => updateView(btn.dataset['view'] as DashView));
    });

    // Generic data-view buttons
    container.querySelectorAll<HTMLButtonElement>('[data-view]').forEach((btn) => {
      btn.addEventListener('click', () => updateView(btn.dataset['view'] as DashView));
    });

    // Logout
    container.querySelector('#logout-btn')?.addEventListener('click', logout);
    container.querySelector('#profile-logout')?.addEventListener('click', logout);

    // Hamburger
    const hamburger = container.querySelector('#hamburger');
    const sidebar = container.querySelector('#dash-sidebar');
    const overlay = container.querySelector('#sidebar-overlay');
    hamburger?.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
      overlay?.classList.toggle('visible');
    });
    overlay?.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('visible');
    });

    // Apply form: product cards
    container.querySelectorAll<HTMLElement>('.product-card').forEach((card) => {
      card.addEventListener('click', () => {
        selectedProduct = card.dataset['product'] ?? '';
        container.querySelectorAll('.product-card').forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        const next = container.querySelector<HTMLButtonElement>('#apply-next');
        if (next) { next.removeAttribute('disabled'); next.style.opacity = '1'; }
      });
    });

    // Apply nav
    container.querySelector('#apply-next')?.addEventListener('click', () => {
      if (applyStep < 3) { applyStep++; updateView('apply'); }
    });
    container.querySelector('#apply-back')?.addEventListener('click', () => {
      if (applyStep > 0) { applyStep--; updateView('apply'); }
    });

    // Submit
    container.querySelector('#apply-submit')?.addEventListener('click', async () => {
      const btn = container.querySelector<HTMLButtonElement>('#apply-submit')!;
      btn.textContent = 'Submitting…'; btn.disabled = true;
      await new Promise((r) => setTimeout(r, 1400));
      applyStep = 0; selectedProduct = '';
      const content = container.querySelector<HTMLElement>('#dash-content');
      if (content) content.innerHTML = `
        <div class="section-card" style="max-width:520px;">
          <div class="empty-state">
            <div class="empty-state__icon" style="background:rgba(16,185,129,0.12);border-color:rgba(16,185,129,0.25);color:#34d399;">${iconCheck(28)}</div>
            <div class="empty-state__title">Application Submitted!</div>
            <p class="empty-state__text">Your loan application has been submitted successfully. Our credit team will review it and respond within 24 hours.</p>
            <button class="btn btn-primary" data-view="overview" style="margin-top:var(--space-md);">Back to Dashboard</button>
          </div>
        </div>
      `;
      container.querySelector('[data-view="overview"]')?.addEventListener('click', () => updateView('overview'));
    });

    // Amount slider
    const slider = container.querySelector<HTMLInputElement>('#amount-range');
    slider?.addEventListener('input', () => {
      loanAmount = Number(slider.value);
      const display = container.querySelector('#amount-display');
      const tenure = Number((container.querySelector<HTMLSelectElement>('#tenure-select'))?.value ?? loanTenure);
      const monthly = Math.round(loanAmount * (1 + tenure * 0.035) / tenure);
      if (display) display.textContent = formatCurrency(loanAmount);
      const monthlyEl = container.querySelector('#monthly-est');
      const totalEl = container.querySelector('#total-est');
      if (monthlyEl) monthlyEl.textContent = formatCurrency(monthly);
      if (totalEl) totalEl.textContent = formatCurrency(monthly * tenure);
    });

    const tenureSelect = container.querySelector<HTMLSelectElement>('#tenure-select');
    tenureSelect?.addEventListener('change', () => {
      loanTenure = Number(tenureSelect.value);
      const monthly = Math.round(loanAmount * (1 + loanTenure * 0.035) / loanTenure);
      const monthlyEl = container.querySelector('#monthly-est');
      const totalEl = container.querySelector('#total-est');
      if (monthlyEl) monthlyEl.textContent = formatCurrency(monthly);
      if (totalEl) totalEl.textContent = formatCurrency(monthly * loanTenure);
    });

    // File uploads
    container.querySelectorAll<HTMLInputElement>('input[type="file"]').forEach((input) => {
      input.addEventListener('change', () => {
        const file = input.files?.[0];
        const doc = input.dataset['doc'];
        if (file && doc) {
          const area = container.querySelector(`#upload-${doc}`);
          const fname = container.querySelector(`#fname-${doc}`);
          area?.classList.add('has-file');
          if (fname) { (fname as HTMLElement).style.display = 'block'; fname.textContent = file.name; }
        }
      });
    });
  }

  // Initial render
  container.innerHTML = renderShell();
  const content = container.querySelector<HTMLElement>('#dash-content');
  if (content) content.innerHTML = renderView(view);
  attachViewListeners();

  return () => {};
}
