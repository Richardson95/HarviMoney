import '../styles/app-layout.css';
import '../styles/admin.css';
import { getUser, logout } from '../store/auth.js';
import { navigate } from '../router/index.js';
import { loanApplications, allRepayments, customers, formatCurrency, formatDate, type LoanApplication } from '../store/mockData.js';
import {
  iconBarChart, iconClipboard, iconUsers, iconCoins, iconSettings,
  iconArrowRight, iconCheck, iconShield, iconBell, iconTrendingUp,
  iconLock, iconLifeBuoy, iconClock,
} from '../utils/icons.js';

type AdminView = 'overview' | 'applications' | 'customers' | 'repayments' | 'recovery';

const NAV_ITEMS: Array<{ id: AdminView; label: string; icon: string; badge?: number }> = [
  { id: 'overview', label: 'Overview', icon: iconBarChart(18) },
  { id: 'applications', label: 'Applications', icon: iconClipboard(18), badge: loanApplications.filter((l) => l.status === 'pending' || l.status === 'under_review').length },
  { id: 'customers', label: 'Customers', icon: iconUsers(18) },
  { id: 'repayments', label: 'Repayments', icon: iconCoins(18) },
  { id: 'recovery', label: 'Recovery', icon: iconLifeBuoy(18), badge: allRepayments.filter((r) => r.status === 'missed').length },
];

export function mountAdmin(container: HTMLElement): () => void {
  const _u = getUser();
  if (!_u || _u.role !== 'admin') { navigate('/signin'); return () => {}; }
  const user = _u; // narrowed to non-null AuthUser; TypeScript preserves this in closures

  let view: AdminView = 'overview';
  const hash = window.location.hash;
  if (hash.includes('/applications')) view = 'applications';
  else if (hash.includes('/customers')) view = 'customers';
  else if (hash.includes('/repayments')) view = 'repayments';
  else if (hash.includes('/recovery')) view = 'recovery';

  let filterTab = 'all';

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  // In-memory status overrides for demo approve/reject
  const statusOverrides: Record<string, LoanApplication['status']> = {};

  function getStatus(loan: LoanApplication): LoanApplication['status'] {
    return statusOverrides[loan.id] ?? loan.status;
  }

  function renderShell(): string {
    return `
      <div class="app-shell app-shell--admin">
        <aside class="sidebar" id="admin-sidebar" aria-label="Admin navigation">
          <a href="#/" class="sidebar__logo">
            <div class="sidebar__logo-icon">H</div>
            <span class="sidebar__logo-text">Harvi<span>Money</span></span>
          </a>
          <div class="sidebar__section">
            <div class="sidebar__section-label">Admin Panel</div>
            <nav class="sidebar__nav" role="list">
              ${NAV_ITEMS.map((item) => `
                <button class="sidebar__link ${view === item.id ? 'active' : ''}" data-view="${item.id}" role="listitem">
                  <span class="sidebar__link-icon">${item.icon}</span>
                  <span>${item.label}</span>
                  ${item.badge ? `<span class="sidebar__link-badge">${item.badge}</span>` : ''}
                </button>
              `).join('')}
            </nav>
          </div>
          <div class="sidebar__section" style="margin-top:auto;flex:0;">
            <div class="sidebar__section-label">System</div>
            <nav class="sidebar__nav">
              <button class="sidebar__link">
                <span class="sidebar__link-icon">${iconSettings(18)}</span>
                <span>Settings</span>
              </button>
              <button class="sidebar__link">
                <span class="sidebar__link-icon">${iconShield(18)}</span>
                <span>Audit Log</span>
              </button>
            </nav>
          </div>
          <div class="sidebar__footer">
            <div class="sidebar__user">
              <div class="sidebar__avatar" style="background:var(--gradient-gold);color:var(--color-primary);">${initials}</div>
              <div class="sidebar__user-info">
                <div class="sidebar__user-name">${user.firstName} ${user.lastName}</div>
                <div class="sidebar__user-role">${user.position ?? 'Admin'}</div>
              </div>
              <button class="sidebar__logout" id="logout-btn" title="Log out">${iconArrowRight(16)}</button>
            </div>
          </div>
        </aside>
        <div class="sidebar-overlay" id="sidebar-overlay"></div>

        <div class="app-main">
          <header class="app-topbar">
            <div class="app-topbar__left">
              <button class="app-topbar__hamburger" id="hamburger">${iconClipboard(20)}</button>
              <h1 class="app-topbar__title" id="page-title">${getViewTitle(view)}</h1>
            </div>
            <div class="app-topbar__right">
              <button class="topbar-icon-btn">
                ${iconBell(18)}
                <span class="topbar-notif-dot"></span>
              </button>
              <button class="topbar-user">
                <div class="topbar-avatar" style="background:var(--gradient-gold);color:var(--color-primary);">${initials}</div>
                <span class="topbar-username">${user.firstName}</span>
              </button>
            </div>
          </header>
          <main class="app-content" id="admin-content"></main>
        </div>
      </div>
      <div id="modal-root"></div>
    `;
  }

  function getViewTitle(v: AdminView): string {
    return { overview: 'Admin Overview', applications: 'Loan Applications', customers: 'Customers', repayments: 'Repayments', recovery: 'Recovery Management' }[v];
  }

  function renderView(v: AdminView): string {
    switch (v) {
      case 'overview': return renderOverview();
      case 'applications': return renderApplications();
      case 'customers': return renderCustomers();
      case 'repayments': return renderRepayments();
      case 'recovery': return renderRecovery();
    }
  }

  function renderOverview(): string {
    const active = loanApplications.filter((l) => getStatus(l) === 'active').length;
    const pending = loanApplications.filter((l) => ['pending','under_review'].includes(getStatus(l))).length;
    const totalDisbursed = loanApplications.filter((l) => ['active','completed'].includes(getStatus(l))).reduce((s, l) => s + l.amount, 0);
    const missed = allRepayments.filter((r) => r.status === 'missed').length;
    const total = allRepayments.filter((r) => r.status !== 'upcoming').length;
    const recoveryRate = total > 0 ? Math.round(((total - missed) / total) * 1000) / 10 : 100;

    return `
      <div class="admin-stats">
        <div class="admin-stat-card">
          <div class="admin-stat-icon" style="background:var(--color-secondary-light);color:#60a5fa;">${iconCoins(22)}</div>
          <div class="admin-stat-body">
            <div class="admin-stat-value">${formatCurrency(totalDisbursed)}</div>
            <div class="admin-stat-label">Total Disbursed</div>
            <div class="admin-stat-change admin-stat-change--up">${iconTrendingUp(10)} +12.4% this month</div>
          </div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-icon" style="background:rgba(245,158,11,0.1);color:#fbbf24;">${iconClipboard(22)}</div>
          <div class="admin-stat-body">
            <div class="admin-stat-value">${pending}</div>
            <div class="admin-stat-label">Pending Review</div>
            <div class="admin-stat-change admin-stat-change--up">${iconClock(10)} Awaiting decision</div>
          </div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-icon" style="background:rgba(16,185,129,0.1);color:#34d399;">${iconTrendingUp(22)}</div>
          <div class="admin-stat-body">
            <div class="admin-stat-value">${recoveryRate}%</div>
            <div class="admin-stat-label">Recovery Rate</div>
            <div class="admin-stat-change admin-stat-change--up">${iconCheck(10)} On target</div>
          </div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-icon" style="background:rgba(139,92,246,0.1);color:#a78bfa;">${iconUsers(22)}</div>
          <div class="admin-stat-body">
            <div class="admin-stat-value">${active}</div>
            <div class="admin-stat-label">Active Loans</div>
            <div class="admin-stat-change admin-stat-change--up">${iconTrendingUp(10)} ${customers.length} customers</div>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:var(--space-xl);">
        <!-- Recent Applications -->
        <div class="admin-table-wrap">
          <div class="section-card__header" style="padding:var(--space-xl);">
            <span class="section-card__title">Recent Applications</span>
            <button class="section-card__action" data-view="applications">View all</button>
          </div>
          <div style="overflow-x:auto;">
            <table class="admin-table" style="min-width:500px;">
              <thead>
                <tr><th>Applicant</th><th>Product</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                ${loanApplications.slice(0,5).map((l) => `
                  <tr data-loan="${l.id}">
                    <td>
                      <div class="col-primary">${l.applicantName}</div>
                      <div class="col-id">${l.accountNumber}</div>
                    </td>
                    <td>${l.product}</td>
                    <td class="col-amount">${formatCurrency(l.amount)}</td>
                    <td><span class="status-badge status-badge--${getStatus(l)}">${getStatus(l).replace('_',' ')}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Missed Repayments -->
        <div class="admin-table-wrap">
          <div class="section-card__header" style="padding:var(--space-xl);">
            <span class="section-card__title">Missed Payments</span>
            <button class="section-card__action" data-view="recovery">View all</button>
          </div>
          <div style="padding:var(--space-md);">
            ${allRepayments.filter((r) => r.status === 'missed').map((r) => `
              <div class="recovery-card" style="margin-bottom:var(--space-md);">
                <div class="recovery-card__icon">${iconLifeBuoy(20)}</div>
                <div class="recovery-card__info">
                  <div class="recovery-card__name">${r.applicantName}</div>
                  <div class="recovery-card__meta">${r.accountNumber} · Due ${formatDate(r.dueDate)}</div>
                </div>
                <div>
                  <div class="recovery-card__amount">${formatCurrency(r.amount)}</div>
                  <div class="recovery-card__days">${Math.round((Date.now() - new Date(r.dueDate).getTime()) / 86400000)}d overdue</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderApplications(): string {
    const tabs = ['all', 'pending', 'under_review', 'approved', 'active', 'rejected', 'completed'];
    const filtered = filterTab === 'all'
      ? loanApplications
      : loanApplications.filter((l) => getStatus(l) === filterTab);

    return `
      <div class="page-header">
        <div>
          <div class="page-header__title">Loan Applications</div>
          <div class="page-header__subtitle">${loanApplications.length} total applications</div>
        </div>
        <div class="page-header__actions">
          <button class="btn btn-outline btn-sm">${iconTrendingUp(14)} Export CSV</button>
        </div>
      </div>

      <div class="filter-tabs">
        ${tabs.map((tab) => {
          const count = tab === 'all' ? loanApplications.length : loanApplications.filter((l) => getStatus(l) === tab).length;
          return `<button class="filter-tab ${filterTab === tab ? 'active' : ''}" data-filter="${tab}">${tab.replace('_',' ')} ${count > 0 ? `<span style="opacity:0.6;font-size:10px;">(${count})</span>` : ''}</button>`;
        }).join('')}
      </div>

      <div class="admin-table-wrap">
        <div class="admin-table-scroll">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Applicant</th><th>Employer</th><th>Product</th><th>Amount</th>
                <th>Date Applied</th><th>Credit Score</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `<tr><td colspan="8" style="text-align:center;padding:3rem;color:var(--color-text-muted);">No applications found</td></tr>` :
                filtered.map((l) => {
                  const s = getStatus(l);
                  const score = l.creditScore ?? 0;
                  const scoreClass = score >= 700 ? 'col-score--high' : score >= 600 ? 'col-score--mid' : 'col-score--low';
                  const canAct = s === 'pending' || s === 'under_review';
                  return `
                    <tr>
                      <td>
                        <div class="col-primary">${l.applicantName}</div>
                        <div class="col-id">${l.id} · ${l.accountNumber}</div>
                      </td>
                      <td>${l.employer}</td>
                      <td>${l.product}</td>
                      <td class="col-amount">${formatCurrency(l.amount)}</td>
                      <td class="col-date">${formatDate(l.appliedDate)}</td>
                      <td class="col-score ${scoreClass}">${score}</td>
                      <td><span class="status-badge status-badge--${s}">${s.replace('_',' ')}</span></td>
                      <td>
                        <div class="table-actions">
                          <button class="table-btn table-btn--view" data-modal="${l.id}">Review</button>
                          ${canAct ? `
                            <button class="table-btn table-btn--approve" data-action="approve" data-loan="${l.id}">Approve</button>
                            <button class="table-btn table-btn--reject" data-action="reject" data-loan="${l.id}">Reject</button>
                          ` : ''}
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderCustomers(): string {
    return `
      <div class="page-header">
        <div>
          <div class="page-header__title">Registered Customers</div>
          <div class="page-header__subtitle">${customers.length} customers</div>
        </div>
        <button class="btn btn-outline btn-sm">${iconTrendingUp(14)} Export</button>
      </div>
      <div class="admin-table-wrap">
        <div class="admin-table-scroll">
          <table class="admin-table">
            <thead>
              <tr><th>Customer</th><th>Employer</th><th>Salary</th><th>Active Loans</th><th>Total Borrowed</th><th>Credit Score</th><th>Joined</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${customers.map((c) => {
                const score = c.creditScore;
                const scoreClass = score >= 700 ? 'col-score--high' : score >= 600 ? 'col-score--mid' : 'col-score--low';
                return `
                  <tr>
                    <td>
                      <div class="col-primary">${c.name}</div>
                      <div class="col-id">${c.accountNumber} · ${c.phone}</div>
                    </td>
                    <td>${c.employer}</td>
                    <td class="col-amount">${formatCurrency(c.salary)}</td>
                    <td style="text-align:center;">${c.activeLoans}</td>
                    <td class="col-amount">${formatCurrency(c.totalBorrowed)}</td>
                    <td class="col-score ${scoreClass}">${score}</td>
                    <td class="col-date">${formatDate(c.joinDate)}</td>
                    <td><span class="status-badge status-badge--${c.status}">${c.status}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderRepayments(): string {
    return `
      <div class="page-header">
        <div>
          <div class="page-header__title">Repayment Monitoring</div>
          <div class="page-header__subtitle">${allRepayments.length} scheduled payments</div>
        </div>
        <button class="btn btn-outline btn-sm">${iconTrendingUp(14)} Export</button>
      </div>
      <div class="admin-table-wrap">
        <div class="admin-table-scroll">
          <table class="admin-table">
            <thead>
              <tr><th>Applicant</th><th>Loan ID</th><th>Amount</th><th>Due Date</th><th>Paid Date</th><th>Method</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${allRepayments.map((r) => `
                <tr>
                  <td>
                    <div class="col-primary">${r.applicantName}</div>
                    <div class="col-id">${r.accountNumber}</div>
                  </td>
                  <td class="col-id">${r.loanId}</td>
                  <td class="col-amount">${formatCurrency(r.amount)}</td>
                  <td class="col-date">${formatDate(r.dueDate)}</td>
                  <td class="col-date">${r.paidDate ? formatDate(r.paidDate) : '—'}</td>
                  <td>${r.method ?? '—'}</td>
                  <td><span class="status-badge status-badge--${r.status}">${r.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderRecovery(): string {
    const missed = allRepayments.filter((r) => r.status === 'missed');
    return `
      <div class="page-header">
        <div>
          <div class="page-header__title">Recovery Management</div>
          <div class="page-header__subtitle">${missed.length} missed payments requiring action</div>
        </div>
        <button class="btn btn-primary btn-sm">${iconBell(14)} Send All Reminders</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-lg);margin-bottom:var(--space-2xl);">
        ${[
          { label: 'Missed Payments', value: missed.length, color: '#f87171', bg: 'rgba(239,68,68,0.1)' },
          { label: 'Total Overdue', value: formatCurrency(missed.reduce((s,r)=>s+r.amount,0)), color: '#fbbf24', bg: 'rgba(245,158,11,0.1)' },
          { label: 'Recovery Actions Sent', value: 4, color: '#34d399', bg: 'rgba(16,185,129,0.1)' },
        ].map((stat) => `
          <div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-xl);padding:var(--space-xl);">
            <div style="font-size:var(--text-xs);font-weight:600;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:var(--space-sm);">${stat.label}</div>
            <div style="font-family:var(--font-primary);font-size:var(--text-2xl);font-weight:800;color:${stat.color};">${stat.value}</div>
          </div>
        `).join('')}
      </div>
      <div style="display:flex;flex-direction:column;gap:var(--space-md);">
        ${missed.map((r) => {
          const daysOverdue = Math.round((Date.now() - new Date(r.dueDate).getTime()) / 86400000);
          return `
            <div class="recovery-card">
              <div class="recovery-card__icon">${iconLifeBuoy(20)}</div>
              <div class="recovery-card__info">
                <div class="recovery-card__name">${r.applicantName}</div>
                <div class="recovery-card__meta">${r.accountNumber} · Loan: ${r.loanId} · Due: ${formatDate(r.dueDate)}</div>
              </div>
              <div style="flex:1;"></div>
              <div style="text-align:right;margin-right:var(--space-lg);">
                <div class="recovery-card__amount">${formatCurrency(r.amount)}</div>
                <div class="recovery-card__days">${daysOverdue} days overdue</div>
              </div>
              <div style="display:flex;gap:var(--space-sm);">
                <button class="table-btn table-btn--view">${iconBell(12)} Remind</button>
                <button class="table-btn table-btn--approve">Debit Now</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function openModal(loanId: string) {
    const loan = loanApplications.find((l) => l.id === loanId);
    if (!loan) return;
    const score = loan.creditScore ?? 0;
    const scoreColor = score >= 700 ? '#34d399' : score >= 600 ? '#fbbf24' : '#f87171';
    const scorePct = Math.min(100, Math.round((score / 850) * 100));
    const s = getStatus(loan);
    const canAct = s === 'pending' || s === 'under_review';

    const modalRoot = container.querySelector('#modal-root')!;
    modalRoot.innerHTML = `
      <div class="modal-overlay" id="modal-overlay">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="modal__header">
            <h2 class="modal__title" id="modal-title">Application Review — ${loan.id}</h2>
            <button class="modal__close" id="modal-close">✕</button>
          </div>
          <div class="modal__body">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-xl);">
              <div>
                <div style="font-family:var(--font-primary);font-size:var(--text-xl);font-weight:800;color:var(--color-text-primary);">${loan.applicantName}</div>
                <div style="font-size:var(--text-sm);color:var(--color-text-muted);">${loan.accountNumber}</div>
              </div>
              <span class="status-badge status-badge--${s}">${s.replace('_',' ')}</span>
            </div>

            <div class="detail-grid">
              ${[
                ['Loan Product', loan.product],
                ['Employer', loan.employer],
                ['Loan Amount', formatCurrency(loan.amount)],
                ['Tenure', `${loan.tenure} months`],
                ['Monthly Payment', formatCurrency(loan.monthlyPayment)],
                ['Interest Rate', `${loan.interestRate}%/month`],
                ['Purpose', loan.purpose],
                ['Date Applied', formatDate(loan.appliedDate)],
              ].map(([label, value]) => `
                <div class="detail-item">
                  <div class="detail-item__label">${label}</div>
                  <div class="detail-item__value ${label === 'Loan Amount' ? 'detail-item__value--large' : ''}">${value}</div>
                </div>
              `).join('')}
            </div>

            <div style="margin-bottom:var(--space-xl);">
              <div style="display:flex;justify-content:space-between;font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-sm);">
                <span style="color:var(--color-text-secondary);">Credit Score</span>
                <span style="color:${scoreColor};">${score} / 850</span>
              </div>
              <div class="credit-score-bar">
                <div class="credit-score-fill" style="width:${scorePct}%;background:${scoreColor};"></div>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--color-text-muted);margin-top:4px;">
                <span>Poor (300)</span><span>Fair (580)</span><span>Good (670)</span><span>Excellent (850)</span>
              </div>
            </div>

            ${loan.notes ? `
              <div style="background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-md) var(--space-lg);font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.7;margin-bottom:var(--space-lg);">
                <strong style="color:var(--color-text-primary);display:block;margin-bottom:4px;">Notes</strong>
                ${loan.notes}
              </div>
            ` : ''}

            ${canAct ? `
              <div class="form-group">
                <label class="form-label">Decision Notes (optional)</label>
                <textarea class="decision-area" id="decision-notes" placeholder="Add notes about this decision…"></textarea>
              </div>
            ` : ''}
          </div>
          <div class="modal__footer">
            <button class="btn btn-outline" id="modal-close-btn">Close</button>
            ${canAct ? `
              <button class="btn" id="modal-reject" style="background:rgba(239,68,68,0.1);border:1.5px solid rgba(239,68,68,0.3);color:#f87171;font-weight:600;flex:1;justify-content:center;">Reject Application</button>
              <button class="btn btn-primary" id="modal-approve" style="flex:1.2;justify-content:center;">Approve Application</button>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    // Modal close
    const closeModal = () => { modalRoot.innerHTML = ''; };
    container.querySelector('#modal-close')?.addEventListener('click', closeModal);
    container.querySelector('#modal-close-btn')?.addEventListener('click', closeModal);
    container.querySelector('#modal-overlay')?.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).id === 'modal-overlay') closeModal();
    });

    // Approve
    container.querySelector('#modal-approve')?.addEventListener('click', async () => {
      const btn = container.querySelector<HTMLButtonElement>('#modal-approve')!;
      btn.textContent = 'Approving…'; btn.disabled = true;
      await new Promise((r) => setTimeout(r, 900));
      statusOverrides[loan.id] = 'approved';
      closeModal();
      updateView('applications');
      showToast('Application approved successfully', 'success');
    });

    // Reject
    container.querySelector('#modal-reject')?.addEventListener('click', async () => {
      const btn = container.querySelector<HTMLButtonElement>('#modal-reject')!;
      btn.textContent = 'Rejecting…'; btn.disabled = true;
      await new Promise((r) => setTimeout(r, 900));
      statusOverrides[loan.id] = 'rejected';
      closeModal();
      updateView('applications');
      showToast('Application rejected', 'error');
    });
  }

  function showToast(message: string, type: 'success' | 'error') {
    const toast = document.createElement('div');
    toast.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;background:${type === 'success' ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)'};color:white;padding:0.85rem 1.5rem;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:600;box-shadow:var(--shadow-lg);display:flex;align-items:center;gap:8px;animation:fadeInUp 0.3s ease;`;
    toast.innerHTML = `${type === 'success' ? iconCheck(16) : iconLock(16)} ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  function updateView(v: AdminView) {
    view = v;
    const content = container.querySelector<HTMLElement>('#admin-content');
    const title = container.querySelector<HTMLElement>('#page-title');
    if (content) content.innerHTML = renderView(v);
    if (title) title.textContent = getViewTitle(v);

    container.querySelectorAll<HTMLElement>('.sidebar__link').forEach((link) => {
      link.classList.toggle('active', link.dataset['view'] === v);
    });
    attachViewListeners();
  }

  function attachViewListeners() {
    // Sidebar nav
    container.querySelectorAll<HTMLButtonElement>('.sidebar__link[data-view]').forEach((btn) => {
      btn.addEventListener('click', () => updateView(btn.dataset['view'] as AdminView));
    });

    // Generic data-view
    container.querySelectorAll<HTMLElement>('[data-view]:not(.sidebar__link)').forEach((el) => {
      el.addEventListener('click', () => updateView((el as HTMLElement).dataset['view'] as AdminView));
    });

    // Logout
    container.querySelector('#logout-btn')?.addEventListener('click', logout);

    // Hamburger
    const hamburger = container.querySelector('#hamburger');
    const sidebar = container.querySelector('#admin-sidebar');
    const overlay = container.querySelector('#sidebar-overlay');
    hamburger?.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
      overlay?.classList.toggle('visible');
    });
    overlay?.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('visible');
    });

    // Filter tabs
    container.querySelectorAll<HTMLButtonElement>('.filter-tab[data-filter]').forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTab = tab.dataset['filter'] ?? 'all';
        updateView('applications');
      });
    });

    // Review modal
    container.querySelectorAll<HTMLButtonElement>('[data-modal]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(btn.dataset['modal'] ?? '');
      });
    });

    // Quick approve/reject buttons in table
    container.querySelectorAll<HTMLButtonElement>('[data-action][data-loan]').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const action = btn.dataset['action'] as 'approve' | 'reject';
        const loanId = btn.dataset['loan'] ?? '';
        btn.textContent = action === 'approve' ? 'Approving…' : 'Rejecting…';
        btn.disabled = true;
        await new Promise((r) => setTimeout(r, 700));
        statusOverrides[loanId] = action === 'approve' ? 'approved' : 'rejected';
        updateView('applications');
        showToast(`Application ${action === 'approve' ? 'approved' : 'rejected'}`, action === 'approve' ? 'success' : 'error');
      });
    });
  }

  // Render
  container.innerHTML = renderShell();
  const content = container.querySelector<HTMLElement>('#admin-content');
  if (content) content.innerHTML = renderView(view);
  attachViewListeners();

  return () => {};
}
