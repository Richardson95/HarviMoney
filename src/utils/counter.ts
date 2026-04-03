interface CounterOptions {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function animateCounter(
  el: HTMLElement,
  { target, duration = 1800, prefix = '', suffix = '', decimals = 0 }: CounterOptions
): void {
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);
    const current = target * eased;

    el.textContent = prefix + current.toFixed(decimals) + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
  };

  requestAnimationFrame(step);
}

export function initCounters(): void {
  const counterEls = document.querySelectorAll<HTMLElement>('[data-counter]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseFloat(el.dataset['counter'] ?? '0');
          const prefix = el.dataset['prefix'] ?? '';
          const suffix = el.dataset['suffix'] ?? '';
          const decimals = parseInt(el.dataset['decimals'] ?? '0', 10);
          const duration = parseInt(el.dataset['duration'] ?? '1800', 10);

          animateCounter(el, { target, prefix, suffix, decimals, duration });
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterEls.forEach((el) => observer.observe(el));
}
