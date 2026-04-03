export type UserRole = 'user' | 'admin';

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  accountNumber: string;
  phone: string;
  employer?: string;
  position?: string;
  salary?: number;
  bankName?: string;
  bankAccount?: string;
  nin?: string;
  avatar?: string;
}

interface StoredSession {
  user: AuthUser;
  token: string;
}

const SESSION_KEY = 'harvi_session';

// ── Mock credential store ───────────────────────────────────────────────────
const CREDENTIALS: Array<{ email: string; password: string; user: AuthUser }> = [
  {
    email: 'user@harvimoney.ng',
    password: 'password123',
    user: {
      id: 'USR-001',
      firstName: 'Adaeze',
      lastName: 'Okafor',
      email: 'user@harvimoney.ng',
      role: 'user',
      accountNumber: 'HM-2024-001234',
      phone: '+234 802 345 6789',
      employer: 'First Bank Nigeria PLC',
      position: 'Senior Operations Manager',
      salary: 450000,
      bankName: 'First Bank Nigeria',
      bankAccount: '3012345678',
      nin: '12345678901',
    },
  },
  {
    email: 'admin@harvimoney.ng',
    password: 'admin123',
    user: {
      id: 'ADM-001',
      firstName: 'Emeka',
      lastName: 'Nwosu',
      email: 'admin@harvimoney.ng',
      role: 'admin',
      accountNumber: 'HM-ADMIN-001',
      phone: '+234 803 111 2222',
      position: 'Credit Risk Officer',
    },
  },
];

// ── Session management ───────────────────────────────────────────────────────
export function login(email: string, password: string): AuthUser | null {
  const match = CREDENTIALS.find(
    (c) => c.email === email.toLowerCase().trim() && c.password === password
  );
  if (!match) return null;

  const session: StoredSession = {
    user: match.user,
    token: `mock-jwt-${Date.now()}`,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return match.user;
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.hash = '#/signin';
}

export function getUser(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: StoredSession = JSON.parse(raw);
    return session.user;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getUser();
}

export function isAdmin(): boolean {
  return getUser()?.role === 'admin';
}

export function requireAuth(role?: UserRole): boolean {
  const user = getUser();
  if (!user) {
    window.location.hash = '#/signin';
    return false;
  }
  if (role && user.role !== role) {
    window.location.hash = user.role === 'admin' ? '#/admin' : '#/dashboard';
    return false;
  }
  return true;
}
