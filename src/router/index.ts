import { getUser } from '../store/auth.js';

type MountFn = (container: HTMLElement) => (() => void) | void;

interface Route {
  pattern: RegExp;
  mount: MountFn;
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
}

let currentCleanup: (() => void) | null = null;
const routes: Route[] = [];

export function registerRoute(
  pattern: RegExp,
  mount: MountFn,
  options?: { requiresAuth?: boolean; requiresAdmin?: boolean }
): void {
  routes.push({ pattern, mount, ...options });
}

export function navigate(path: string): void {
  window.location.hash = path.startsWith('#') ? path : `#${path}`;
}

function resolve(): void {
  const hash = window.location.hash || '#/';
  // If the hash doesn't look like a route (no leading #/), stay on landing
  const path = hash.startsWith('#/') ? hash.slice(1) : '/';

  const app = document.getElementById('app');
  if (!app) return;

  // Run cleanup from previous page
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }
  app.innerHTML = '';

  // Find matching route — try longest match first
  const sorted = [...routes].sort(
    (a, b) => b.pattern.source.length - a.pattern.source.length
  );
  const match = sorted.find((r) => r.pattern.test(path));

  if (!match) {
    navigate('/');
    return;
  }

  // Auth guards
  const user = getUser();
  if (match.requiresAuth && !user) {
    navigate('/signin');
    return;
  }
  if (match.requiresAdmin && user?.role !== 'admin') {
    navigate('/dashboard');
    return;
  }

  const cleanup = match.mount(app);
  if (typeof cleanup === 'function') {
    currentCleanup = cleanup;
  }
}

export function initRouter(): void {
  window.addEventListener('hashchange', resolve);
  resolve();
}
