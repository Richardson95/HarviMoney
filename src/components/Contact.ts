import { iconMapPin, iconPhone, iconMail, iconClock, iconCheckCircle } from '../utils/icons.js';

export function createContact(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'contact';
  section.className = 'contact section';
  section.setAttribute('aria-label', 'Contact us');

  section.innerHTML = `
    <div class="container">
      <div class="contact__inner">

        <!-- Info -->
        <div class="contact__info animate-fade-left">
          <div class="section-label">Get in Touch</div>
          <h2 class="section-heading">
            Ready to get<br><span class="highlight">started?</span>
          </h2>
          <p class="section-subtitle">
            Speak to our lending team or submit your application today. We typically
            respond within 2 business hours.
          </p>

          <div class="contact__info-list">
            <div class="contact__info-item">
              <div class="contact__info-icon" aria-hidden="true">${iconMapPin(20)}</div>
              <div class="contact__info-body">
                <div class="contact__info-label">Office</div>
                <div class="contact__info-value">Plot 12, Adeola Odeku Street<br>Victoria Island, Lagos, Nigeria</div>
              </div>
            </div>
            <div class="contact__info-item">
              <div class="contact__info-icon" aria-hidden="true">${iconPhone(20)}</div>
              <div class="contact__info-body">
                <div class="contact__info-label">Phone</div>
                <div class="contact__info-value">+234 (0) 700 HARVI MONEY</div>
              </div>
            </div>
            <div class="contact__info-item">
              <div class="contact__info-icon" aria-hidden="true">${iconMail(20)}</div>
              <div class="contact__info-body">
                <div class="contact__info-label">Email</div>
                <div class="contact__info-value">loans@harvimoney.ng<br>support@harvimoney.ng</div>
              </div>
            </div>
            <div class="contact__info-item">
              <div class="contact__info-icon" aria-hidden="true">${iconClock(20)}</div>
              <div class="contact__info-body">
                <div class="contact__info-label">Business Hours</div>
                <div class="contact__info-value">Monday – Friday: 8am – 6pm<br>Saturday: 10am – 2pm</div>
              </div>
            </div>
          </div>

          <div class="contact__social" role="list" aria-label="Social media links">
            <a href="#" class="btn-icon" role="listitem" aria-label="LinkedIn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" class="btn-icon" role="listitem" aria-label="Twitter / X">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" class="btn-icon" role="listitem" aria-label="Facebook">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="btn-icon" role="listitem" aria-label="Instagram">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Form -->
        <div class="contact__form-card animate-fade-right">
          <h3 class="contact__form-title">Send us a message</h3>
          <p class="contact__form-subtitle">Fill in your details and we'll connect you with the right team.</p>

          <div id="form-success" class="form__success">
            <div class="form__success-icon" aria-hidden="true">${iconCheckCircle(28)}</div>
            <h4 class="form__success-title">Message Sent!</h4>
            <p class="form__success-text">
              Thank you for reaching out. A member of our lending team will be in
              touch within 2 business hours.
            </p>
          </div>

          <form id="contact-form" class="form" novalidate aria-label="Contact form">
            <div class="form__row">
              <div class="form__group">
                <label class="form__label" for="first-name">First Name <span aria-hidden="true">*</span></label>
                <input
                  type="text"
                  id="first-name"
                  name="firstName"
                  class="form__input"
                  placeholder="Adaeze"
                  required
                  autocomplete="given-name"
                />
              </div>
              <div class="form__group">
                <label class="form__label" for="last-name">Last Name <span aria-hidden="true">*</span></label>
                <input
                  type="text"
                  id="last-name"
                  name="lastName"
                  class="form__input"
                  placeholder="Okafor"
                  required
                  autocomplete="family-name"
                />
              </div>
            </div>

            <div class="form__group">
              <label class="form__label" for="email">Email Address <span aria-hidden="true">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                class="form__input"
                placeholder="adaeze@company.com"
                required
                autocomplete="email"
              />
            </div>

            <div class="form__row">
              <div class="form__group">
                <label class="form__label" for="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  class="form__input"
                  placeholder="+234 800 000 0000"
                  autocomplete="tel"
                />
              </div>
              <div class="form__group">
                <label class="form__label" for="employer">Employer / Company</label>
                <input
                  type="text"
                  id="employer"
                  name="employer"
                  class="form__input"
                  placeholder="Your company name"
                  autocomplete="organization"
                />
              </div>
            </div>

            <div class="form__group">
              <label class="form__label" for="loan-type">Loan Product <span aria-hidden="true">*</span></label>
              <select id="loan-type" name="loanType" class="form__select" required>
                <option value="" disabled selected>Select a loan product</option>
                <option value="salary-advance">Salary Advance Loan</option>
                <option value="term-loan">Term Loan</option>
                <option value="emergency">Emergency Loan</option>
                <option value="asset-finance">Asset Finance</option>
                <option value="general">General Enquiry</option>
              </select>
            </div>

            <div class="form__group">
              <label class="form__label" for="message">Message <span aria-hidden="true">*</span></label>
              <textarea
                id="message"
                name="message"
                class="form__textarea"
                placeholder="Tell us about your loan needs, preferred amount, and any other details..."
                required
                rows="4"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary form__submit" id="submit-btn">
              <span class="btn-text">Send Message</span>
              <span class="btn-spinner" aria-hidden="true"></span>
            </button>
          </form>
        </div>

      </div>
    </div>
  `;

  // Form submission handler
  const form = section.querySelector<HTMLFormElement>('#contact-form')!;
  const submitBtn = section.querySelector<HTMLButtonElement>('#submit-btn')!;
  const successMsg = section.querySelector<HTMLElement>('#form-success')!;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      form.style.display = 'none';
      successMsg.classList.add('show');
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }, 1800);
  });

  return section;
}
