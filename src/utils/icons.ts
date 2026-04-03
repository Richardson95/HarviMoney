/**
 * SVG icon library — Lucide-style, 24×24 viewBox, stroke-based.
 * All icons use currentColor so they inherit text color.
 */

type IconSize = number | string;

function svg(content: string, size: IconSize = 20): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${content}</svg>`;
}

// ── Finance & Money ──────────────────────────────────────────────
export const iconCoins = (size?: IconSize) =>
  svg(`<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>`, size);

export const iconCreditCard = (size?: IconSize) =>
  svg(`<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>`, size);

export const iconDollarSign = (size?: IconSize) =>
  svg(`<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`, size);

export const iconTrendingUp = (size?: IconSize) =>
  svg(`<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>`, size);

export const iconBarChart = (size?: IconSize) =>
  svg(`<line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>`, size);

// ── People & Identity ────────────────────────────────────────────
export const iconUsers = (size?: IconSize) =>
  svg(`<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`, size);

export const iconIdCard = (size?: IconSize) =>
  svg(`<rect width="20" height="14" x="2" y="5" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M14 9h4"/><path d="M14 13h2"/>`, size);

// ── Documents ────────────────────────────────────────────────────
export const iconClipboard = (size?: IconSize) =>
  svg(`<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h4"/>`, size);

export const iconFolderOpen = (size?: IconSize) =>
  svg(`<path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"/>`, size);

export const iconBriefcase = (size?: IconSize) =>
  svg(`<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" x2="12" y1="12" y2="12"/><line x1="12" x2="12.01" y1="12" y2="12"/>`, size);

// ── Security & Trust ─────────────────────────────────────────────
export const iconShield = (size?: IconSize) =>
  svg(`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`, size);

export const iconShieldCheck = (size?: IconSize) =>
  svg(`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`, size);

export const iconLock = (size?: IconSize) =>
  svg(`<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`, size);

export const iconLockOpen = (size?: IconSize) =>
  svg(`<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>`, size);

// ── UI & Actions ─────────────────────────────────────────────────
export const iconBell = (size?: IconSize) =>
  svg(`<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>`, size);

export const iconSettings = (size?: IconSize) =>
  svg(`<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>`, size);

export const iconZap = (size?: IconSize) =>
  svg(`<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`, size);

export const iconCheckCircle = (size?: IconSize) =>
  svg(`<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`, size);

export const iconCheck = (size?: IconSize) =>
  svg(`<polyline points="20 6 9 17 4 12"/>`, size);

export const iconTarget = (size?: IconSize) =>
  svg(`<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`, size);

// ── Communication ────────────────────────────────────────────────
export const iconMapPin = (size?: IconSize) =>
  svg(`<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`, size);

export const iconPhone = (size?: IconSize) =>
  svg(`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`, size);

export const iconMail = (size?: IconSize) =>
  svg(`<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>`, size);

export const iconClock = (size?: IconSize) =>
  svg(`<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`, size);

// ── Buildings & Finance ──────────────────────────────────────────
export const iconLandmark = (size?: IconSize) =>
  svg(`<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>`, size);

export const iconBuilding = (size?: IconSize) =>
  svg(`<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>`, size);

export const iconSmartphone = (size?: IconSize) =>
  svg(`<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>`, size);

// ── Transport & Assets ───────────────────────────────────────────
export const iconCar = (size?: IconSize) =>
  svg(`<path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="13" rx="2"/><circle cx="9" cy="17" r="1"/><circle cx="15" cy="17" r="1"/><path d="m6 7 1.5-4.5a1 1 0 0 1 .93-.5h7.14a1 1 0 0 1 .93.5L18 7"/>`, size);

// ── Life / Emergency ─────────────────────────────────────────────
export const iconLifeBuoy = (size?: IconSize) =>
  svg(`<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" x2="9.17" y1="4.93" y2="9.17"/><line x1="14.83" x2="19.07" y1="14.83" y2="19.07"/><line x1="14.83" x2="19.07" y1="9.17" y2="4.93"/><line x1="14.83" x2="18.36" y1="9.17" y2="5.64"/><line x1="4.93" x2="9.17" y1="19.07" y2="14.83"/>`, size);

// ── Data & Analytics ─────────────────────────────────────────────
export const iconPieChart = (size?: IconSize) =>
  svg(`<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>`, size);

// ── Arrow ────────────────────────────────────────────────────────
export const iconArrowRight = (size?: IconSize) =>
  svg(`<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`, size);
