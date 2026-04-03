import '../styles/auth.css';
import { login } from '../store/auth.js';
import { navigate } from '../router/index.js';
import { iconLock, iconMail } from '../utils/icons.js';

export function mountSignIn(container: HTMLElement): () => void {
  container.innerHTML = `
    <div class="auth-page">
      <div class="auth-page__bg-orb auth-page__bg-orb--1"></div>
      <div class="auth-page__bg-orb auth-page__bg-orb--2"></div>

      <header class="auth-topbar">
        <a href="#/" class="auth-topbar__logo">
          <div class="auth-topbar__logo-icon">H</div>
          <span class="auth-topbar__logo-text">Harvi<span>Money</span></span>
        </a>
        <span class="auth-topbar__link">
          Don't have an account?
          <a href="#/signup" style="color:#60a5fa;font-weight:600;margin-left:4px;">Sign Up</a>
        </span>
      </header>

      <div class="auth-container">
        <div class="auth-card">
          <h1 class="auth-card__title">Welcome back</h1>
          <p class="auth-card__subtitle">Sign in to your HarviMoney account to manage your loans and repayments.</p>

          <div id="auth-error" style="display:none;" class="form-error" style="margin-bottom:var(--space-lg);padding:var(--space-md);background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:var(--radius-md);font-size:var(--text-sm);">
            Invalid email or password. Please try again.
          </div>

          <form id="signin-form" class="auth-form" novalidate>
            <div class="form-group">
              <label class="form-label" for="si-email">Email Address</label>
              <div class="form-input-wrapper">
                <input
                  type="email"
                  id="si-email"
                  name="email"
                  class="form-input form-input--icon"
                  placeholder="you@company.com"
                  autocomplete="email"
                  required
                />
                <span class="form-input-icon">${iconMail(16)}</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="si-password">
                Password
                <a href="#" style="margin-left:auto;font-size:var(--text-xs);color:#60a5fa;font-weight:500;">Forgot password?</a>
              </label>
              <div class="form-input-wrapper">
                <input
                  type="password"
                  id="si-password"
                  name="password"
                  class="form-input form-input--icon"
                  placeholder="••••••••"
                  autocomplete="current-password"
                  required
                />
                <button type="button" class="form-input-icon" id="toggle-pw" title="Show/hide password">${iconLock(16)}</button>
              </div>
            </div>

            <div style="display:flex;align-items:center;gap:var(--space-sm);margin-top:-4px;">
              <input type="checkbox" id="remember" style="accent-color:var(--color-secondary);width:15px;height:15px;cursor:pointer;">
              <label for="remember" style="font-size:var(--text-sm);color:var(--color-text-secondary);cursor:pointer;">Remember me</label>
            </div>

            <button type="submit" class="btn btn-primary" id="signin-btn" style="width:100%;justify-content:center;padding:0.9rem;">
              <span class="btn-text">Sign In</span>
              <span class="btn-spinner" style="display:none;width:16px;height:16px;border:2px solid rgba(255,255,255,0.4);border-top-color:white;border-radius:50;animation:spin 0.7s linear infinite;"></span>
            </button>
          </form>

          <div class="auth-divider"><span>Demo Credentials</span></div>

          <div style="display:flex;flex-direction:column;gap:var(--space-sm);">
            <button class="demo-btn" data-email="user@harvimoney.ng" data-pw="password123"
              style="padding:0.65rem;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-md);cursor:pointer;color:var(--color-text-secondary);font-size:var(--text-sm);transition:all var(--transition-fast);text-align:left;padding-inline:var(--space-md);">
              <strong style="color:var(--color-text-primary);">User Account</strong> — user@harvimoney.ng / password123
            </button>
            <button class="demo-btn" data-email="admin@harvimoney.ng" data-pw="admin123"
              style="padding:0.65rem;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-md);cursor:pointer;color:var(--color-text-secondary);font-size:var(--text-sm);transition:all var(--transition-fast);text-align:left;padding-inline:var(--space-md);">
              <strong style="color:var(--color-text-primary);">Admin Account</strong> — admin@harvimoney.ng / admin123
            </button>
          </div>

          <div class="auth-footer">
            New to HarviMoney? <a href="#/signup">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  `;

  const form = container.querySelector<HTMLFormElement>('#signin-form')!;
  const btn = container.querySelector<HTMLButtonElement>('#signin-btn')!;
  const errEl = container.querySelector<HTMLElement>('#auth-error')!;
  const emailInput = container.querySelector<HTMLInputElement>('#si-email')!;
  const pwInput = container.querySelector<HTMLInputElement>('#si-password')!;
  const togglePw = container.querySelector<HTMLButtonElement>('#toggle-pw')!;

  // Demo fill buttons
  container.querySelectorAll<HTMLButtonElement>('.demo-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      emailInput.value = btn.dataset['email'] ?? '';
      pwInput.value = btn.dataset['pw'] ?? '';
      emailInput.focus();
    });
  });

  // Toggle password visibility
  togglePw.addEventListener('click', () => {
    pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errEl.style.display = 'none';

    const email = emailInput.value.trim();
    const password = pwInput.value;

    if (!email || !password) return;

    btn.disabled = true;
    const spinner = btn.querySelector<HTMLElement>('.btn-spinner')!;
    const text = btn.querySelector<HTMLElement>('.btn-text')!;
    spinner.style.display = 'inline-block';
    text.style.display = 'none';

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 900));

    const user = login(email, password);

    if (!user) {
      spinner.style.display = 'none';
      text.style.display = 'inline';
      btn.disabled = false;
      errEl.style.display = 'flex';
      errEl.style.gap = '6px';
      errEl.style.alignItems = 'center';
      emailInput.classList.add('error');
      pwInput.classList.add('error');
      return;
    }

    navigate(user.role === 'admin' ? '/admin' : '/dashboard');
  });

  // Clear error on input
  [emailInput, pwInput].forEach((el) => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      errEl.style.display = 'none';
    });
  });

  return () => {};
}
