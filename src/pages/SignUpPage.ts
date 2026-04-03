import '../styles/auth.css';
import { navigate } from '../router/index.js';
import { iconCheck } from '../utils/icons.js';

interface SignUpData {
  firstName: string; lastName: string; email: string; phone: string; password: string;
  nin: string; ninVerified: boolean;
  employer: string; position: string; salary: string; payDay: string;
  bankName: string; bankAccount: string;
}

const data: SignUpData = {
  firstName: '', lastName: '', email: '', phone: '', password: '',
  nin: '', ninVerified: false,
  employer: '', position: '', salary: '', payDay: '',
  bankName: '', bankAccount: '',
};

const STEPS = ['Account', 'Identity', 'Employment', 'Bank Details'];

function buildStepper(current: number): string {
  return `
    <div class="stepper" style="margin-bottom:var(--space-3xl);">
      ${STEPS.map((label, i) => {
        const cls = i < current ? 'done' : i === current ? 'active' : '';
        return `
          <div class="stepper__step ${cls}">
            <div class="stepper__dot">
              ${i < current ? iconCheck(12) : i + 1}
            </div>
            <span class="stepper__label">${label}</span>
          </div>
          ${i < STEPS.length - 1 ? '' : ''}
        `;
      }).join('')}
    </div>
  `;
}

function step1HTML(): string {
  return `
    ${buildStepper(0)}
    <h2 class="auth-card__title">Create your account</h2>
    <p class="auth-card__subtitle">Start your HarviMoney journey. Fill in your personal details below.</p>
    <div class="auth-form">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="s1-fname">First Name <span class="form-label__req">*</span></label>
          <input id="s1-fname" class="form-input" type="text" placeholder="Adaeze" value="${data.firstName}" autocomplete="given-name" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="s1-lname">Last Name <span class="form-label__req">*</span></label>
          <input id="s1-lname" class="form-input" type="text" placeholder="Okafor" value="${data.lastName}" autocomplete="family-name" required />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="s1-email">Email Address <span class="form-label__req">*</span></label>
        <input id="s1-email" class="form-input" type="email" placeholder="you@company.com" value="${data.email}" autocomplete="email" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="s1-phone">Phone Number <span class="form-label__req">*</span></label>
        <input id="s1-phone" class="form-input" type="tel" placeholder="+234 800 000 0000" value="${data.phone}" autocomplete="tel" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="s1-pw">Password <span class="form-label__req">*</span></label>
        <input id="s1-pw" class="form-input" type="password" placeholder="Minimum 8 characters" value="${data.password}" autocomplete="new-password" required minlength="8" />
        <span class="form-hint">Must be at least 8 characters.</span>
      </div>
      <div class="step-actions">
        <button class="btn btn-primary" id="step-next">Continue</button>
      </div>
      <div class="auth-footer">Already have an account? <a href="#/signin">Sign In</a></div>
    </div>
  `;
}

function step2HTML(): string {
  return `
    ${buildStepper(1)}
    <h2 class="auth-card__title">Verify your identity</h2>
    <p class="auth-card__subtitle">Enter your National Identification Number (NIN) to verify your identity via the NIMC platform.</p>
    <div class="auth-form">
      <div class="form-group">
        <label class="form-label">NIN (11 digits) <span class="form-label__req">*</span></label>
        <div class="nin-verify-row">
          <div class="form-group" style="flex:1;margin:0;">
            <input id="s2-nin" class="form-input" type="text" placeholder="e.g. 12345678901" maxlength="11"
              value="${data.nin}" pattern="[0-9]{11}" />
          </div>
          <button class="btn btn-outline btn-sm" id="verify-nin" style="flex-shrink:0;height:44px;align-self:flex-end;">Verify</button>
        </div>
        <div id="nin-result" style="margin-top:var(--space-sm);display:${data.ninVerified ? 'flex' : 'none'};"
          class="nin-status nin-status--success">
          ${iconCheck(14)} Identity verified successfully
        </div>
        <span class="form-hint">We use the NIMC database to verify your identity. Your NIN is stored securely and encrypted.</span>
      </div>
      <div class="step-actions" style="margin-top:var(--space-lg);">
        <button class="btn btn-outline" id="step-back">Back</button>
        <button class="btn btn-primary" id="step-next" ${data.ninVerified ? '' : 'disabled style="opacity:0.5;cursor:not-allowed;"'}>Continue</button>
      </div>
    </div>
  `;
}

function step3HTML(): string {
  return `
    ${buildStepper(2)}
    <h2 class="auth-card__title">Employment details</h2>
    <p class="auth-card__subtitle">Your employment information is used to determine your loan eligibility and repayment capacity.</p>
    <div class="auth-form">
      <div class="form-group">
        <label class="form-label" for="s3-emp">Employer / Company Name <span class="form-label__req">*</span></label>
        <input id="s3-emp" class="form-input" type="text" placeholder="First Bank Nigeria PLC" value="${data.employer}" required />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="s3-pos">Job Title / Position <span class="form-label__req">*</span></label>
          <input id="s3-pos" class="form-input" type="text" placeholder="Senior Manager" value="${data.position}" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="s3-sal">Monthly Net Salary (₦) <span class="form-label__req">*</span></label>
          <input id="s3-sal" class="form-input" type="number" placeholder="450000" value="${data.salary}" required min="50000" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="s3-pay">Salary Pay Day <span class="form-label__req">*</span></label>
        <select id="s3-pay" class="form-select" required>
          <option value="" disabled ${!data.payDay ? 'selected' : ''}>Select your pay day</option>
          ${Array.from({ length: 28 }, (_, i) => i + 1)
            .map((d) => `<option value="${d}" ${data.payDay === String(d) ? 'selected' : ''}>${d}${['st','nd','rd'][((d-1)%10 < 3 && Math.floor((d-1)/10) !== 1) ? (d-1)%10 : 3]} of every month</option>`)
            .join('')}
        </select>
      </div>
      <div class="step-actions">
        <button class="btn btn-outline" id="step-back">Back</button>
        <button class="btn btn-primary" id="step-next">Continue</button>
      </div>
    </div>
  `;
}

function step4HTML(): string {
  return `
    ${buildStepper(3)}
    <h2 class="auth-card__title">Bank account details</h2>
    <p class="auth-card__subtitle">Link the salary account where your repayments will be automatically debited each month.</p>
    <div class="auth-form">
      <div class="form-group">
        <label class="form-label" for="s4-bank">Bank Name <span class="form-label__req">*</span></label>
        <select id="s4-bank" class="form-select" required>
          <option value="" disabled ${!data.bankName ? 'selected' : ''}>Select your bank</option>
          ${['Access Bank', 'First Bank Nigeria', 'GTBank', 'Zenith Bank', 'UBA', 'Ecobank', 'Fidelity Bank',
             'Sterling Bank', 'Union Bank', 'FCMB', 'Stanbic IBTC', 'Wema Bank', 'Polaris Bank', 'Keystone Bank']
            .map((b) => `<option value="${b}" ${data.bankName === b ? 'selected' : ''}>${b}</option>`)
            .join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="s4-acc">Account Number <span class="form-label__req">*</span></label>
        <input id="s4-acc" class="form-input" type="text" placeholder="10-digit NUBAN number" maxlength="10"
          pattern="[0-9]{10}" value="${data.bankAccount}" required />
        <span class="form-hint">Must be your salary account linked to your employer's payroll.</span>
      </div>
      <div style="background:rgba(37,99,235,0.06);border:1px solid rgba(37,99,235,0.2);border-radius:var(--radius-md);padding:var(--space-md) var(--space-lg);font-size:var(--text-sm);color:#93c5fd;display:flex;gap:var(--space-sm);align-items:flex-start;">
        <span style="flex-shrink:0;margin-top:1px;">${iconCheck(14)}</span>
        <span>By proceeding, you authorise HarviMoney to set up a direct debit mandate on this account for loan repayments as they become due.</span>
      </div>
      <div class="step-actions">
        <button class="btn btn-outline" id="step-back">Back</button>
        <button class="btn btn-accent" id="step-next" style="font-weight:700;">Complete Registration</button>
      </div>
    </div>
  `;
}

export function mountSignUp(container: HTMLElement): () => void {
  let currentStep = 0;

  function render() {
    container.innerHTML = `
      <div class="auth-page">
        <div class="auth-page__bg-orb auth-page__bg-orb--1"></div>
        <div class="auth-page__bg-orb auth-page__bg-orb--2"></div>
        <header class="auth-topbar">
          <a href="#/" class="auth-topbar__logo">
            <div class="auth-topbar__logo-icon">H</div>
            <span class="auth-topbar__logo-text">Harvi<span>Money</span></span>
          </a>
          <span class="auth-topbar__link">Step ${currentStep + 1} of ${STEPS.length}</span>
        </header>
        <div class="auth-container" style="padding-top:var(--space-lg);">
          <div class="auth-card auth-card--wide">
            <div id="step-content">
              ${[step1HTML, step2HTML, step3HTML, step4HTML][currentStep]()}
            </div>
          </div>
        </div>
      </div>
    `;
    attachListeners();
  }

  function attachListeners() {
    const nextBtn = container.querySelector<HTMLButtonElement>('#step-next');
    const backBtn = container.querySelector<HTMLButtonElement>('#step-back');

    backBtn?.addEventListener('click', () => {
      if (currentStep > 0) { currentStep--; render(); }
      else navigate('/signin');
    });

    nextBtn?.addEventListener('click', () => {
      if (!validateStep()) return;
      saveStep();
      if (currentStep < STEPS.length - 1) {
        currentStep++;
        render();
      } else {
        // Complete — store minimal session + redirect
        sessionStorage.setItem('harvi_session', JSON.stringify({
          user: {
            id: 'USR-NEW-' + Date.now(),
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            role: 'user',
            accountNumber: 'HM-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000),
            phone: data.phone,
            employer: data.employer,
            position: data.position,
            salary: Number(data.salary),
            bankName: data.bankName,
            bankAccount: data.bankAccount,
          },
          token: 'mock-jwt-' + Date.now(),
        }));
        navigate('/dashboard');
      }
    });

    // Step 2: NIN verify
    const verifyBtn = container.querySelector<HTMLButtonElement>('#verify-nin');
    verifyBtn?.addEventListener('click', async () => {
      const nin = (container.querySelector<HTMLInputElement>('#s2-nin')?.value ?? '').trim();
      const result = container.querySelector<HTMLElement>('#nin-result')!;
      const nextB = container.querySelector<HTMLButtonElement>('#step-next')!;

      if (nin.length !== 11 || !/^\d+$/.test(nin)) {
        result.className = 'nin-status nin-status--error';
        result.style.display = 'flex';
        result.innerHTML = 'Please enter a valid 11-digit NIN.';
        return;
      }

      verifyBtn.textContent = 'Verifying…';
      verifyBtn.disabled = true;
      await new Promise((r) => setTimeout(r, 1200));

      data.ninVerified = true;
      data.nin = nin;
      result.className = 'nin-status nin-status--success';
      result.style.display = 'flex';
      result.innerHTML = `${iconCheck(14)} Identity verified successfully`;
      nextB.removeAttribute('disabled');
      nextB.style.opacity = '1';
      nextB.style.cursor = 'pointer';
      verifyBtn.textContent = 'Verified';
      verifyBtn.disabled = true;
    });
  }

  function validateStep(): boolean {
    const get = (id: string) => container.querySelector<HTMLInputElement>(`#${id}`)?.value.trim() ?? '';

    if (currentStep === 0) {
      return !!(get('s1-fname') && get('s1-lname') && get('s1-email') && get('s1-phone') && get('s1-pw').length >= 8);
    }
    if (currentStep === 1) return data.ninVerified;
    if (currentStep === 2) return !!(get('s3-emp') && get('s3-pos') && get('s3-sal') && get('s3-pay'));
    if (currentStep === 3) return !!(get('s4-bank') && get('s4-acc').length === 10);
    return true;
  }

  function saveStep() {
    const get = (id: string) => (container.querySelector<HTMLInputElement>(`#${id}`)?.value ?? '').trim();

    if (currentStep === 0) {
      data.firstName = get('s1-fname'); data.lastName = get('s1-lname');
      data.email = get('s1-email'); data.phone = get('s1-phone'); data.password = get('s1-pw');
    } else if (currentStep === 1) {
      data.nin = get('s2-nin');
    } else if (currentStep === 2) {
      data.employer = get('s3-emp'); data.position = get('s3-pos');
      data.salary = get('s3-sal'); data.payDay = get('s3-pay');
    } else if (currentStep === 3) {
      data.bankName = get('s4-bank'); data.bankAccount = get('s4-acc');
    }
  }

  render();
  return () => {};
}
