export type LoanStatus = 'pending' | 'under_review' | 'approved' | 'active' | 'rejected' | 'completed';
export type PaymentStatus = 'paid' | 'pending' | 'missed' | 'upcoming';

export interface LoanApplication {
  id: string;
  userId: string;
  applicantName: string;
  accountNumber: string;
  employer: string;
  product: string;
  amount: number;
  tenure: number;
  purpose: string;
  interestRate: number;
  monthlyPayment: number;
  outstanding: number;
  status: LoanStatus;
  appliedDate: string;
  approvedDate?: string;
  disbursedDate?: string;
  nextPaymentDate?: string;
  creditScore?: number;
  notes?: string;
}

export interface RepaymentEntry {
  id: string;
  loanId: string;
  applicantName: string;
  accountNumber: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  method?: string;
}

export interface Transaction {
  id: string;
  type: 'debit' | 'credit' | 'fee';
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountNumber: string;
  employer: string;
  salary: number;
  joinDate: string;
  activeLoans: number;
  totalBorrowed: number;
  creditScore: number;
  status: 'active' | 'inactive' | 'blacklisted';
}

// ── Loan Applications ────────────────────────────────────────────────────────
export const loanApplications: LoanApplication[] = [
  {
    id: 'LOAN-2026-0089',
    userId: 'USR-001',
    applicantName: 'Adaeze Okafor',
    accountNumber: 'HM-2024-001234',
    employer: 'First Bank Nigeria PLC',
    product: 'Term Loan',
    amount: 2500000,
    tenure: 24,
    purpose: 'Property down payment',
    interestRate: 3.5,
    monthlyPayment: 125000,
    outstanding: 1875000,
    status: 'active',
    appliedDate: '2025-12-20',
    approvedDate: '2025-12-28',
    disbursedDate: '2026-01-02',
    nextPaymentDate: '2026-04-28',
    creditScore: 742,
    notes: 'Excellent credit profile. Approved with standard terms.',
  },
  {
    id: 'LOAN-2026-0102',
    userId: 'USR-002',
    applicantName: 'Chukwuemeka Adeyemi',
    accountNumber: 'HM-2025-002341',
    employer: 'Zenith Bank Nigeria',
    product: 'Term Loan',
    amount: 3000000,
    tenure: 36,
    purpose: 'Business expansion',
    interestRate: 3.5,
    monthlyPayment: 107143,
    outstanding: 3000000,
    status: 'under_review',
    appliedDate: '2026-03-28',
    creditScore: 698,
  },
  {
    id: 'LOAN-2026-0103',
    userId: 'USR-003',
    applicantName: 'Fatima Abubakar',
    accountNumber: 'HM-2025-003102',
    employer: 'MTN Nigeria Communications',
    product: 'Salary Advance',
    amount: 800000,
    tenure: 3,
    purpose: 'Medical expenses',
    interestRate: 3.5,
    monthlyPayment: 285600,
    outstanding: 800000,
    status: 'pending',
    appliedDate: '2026-04-01',
    creditScore: 711,
  },
  {
    id: 'LOAN-2026-0098',
    userId: 'USR-004',
    applicantName: 'David Taiwo',
    accountNumber: 'HM-2024-004567',
    employer: 'Dangote Cement PLC',
    product: 'Emergency Loan',
    amount: 1500000,
    tenure: 6,
    purpose: 'Home renovation',
    interestRate: 3.5,
    monthlyPayment: 285000,
    outstanding: 0,
    status: 'rejected',
    appliedDate: '2026-03-15',
    creditScore: 521,
    notes: 'Rejected: Credit score below minimum threshold. Multiple missed payments on existing facilities.',
  },
  {
    id: 'LOAN-2026-0107',
    userId: 'USR-005',
    applicantName: 'Grace Eze',
    accountNumber: 'HM-2025-005891',
    employer: 'Nigerian Breweries PLC',
    product: 'Asset Finance',
    amount: 5000000,
    tenure: 48,
    purpose: 'Vehicle purchase',
    interestRate: 3.0,
    monthlyPayment: 138900,
    outstanding: 5000000,
    status: 'pending',
    appliedDate: '2026-04-02',
    creditScore: 763,
  },
  {
    id: 'LOAN-2026-0091',
    userId: 'USR-006',
    applicantName: 'Seun Bello',
    accountNumber: 'HM-2024-006123',
    employer: 'Access Bank PLC',
    product: 'Salary Advance',
    amount: 450000,
    tenure: 2,
    purpose: 'School fees',
    interestRate: 3.5,
    monthlyPayment: 237375,
    outstanding: 0,
    status: 'completed',
    appliedDate: '2025-11-10',
    approvedDate: '2025-11-12',
    disbursedDate: '2025-11-14',
    creditScore: 728,
    notes: 'Fully repaid. Clean record.',
  },
];

// ── User transactions ────────────────────────────────────────────────────────
export const userTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    type: 'debit',
    description: 'Monthly Repayment — LOAN-2026-0089',
    amount: 125000,
    date: '2026-03-28',
    status: 'completed',
    reference: 'HM-DD-20260328-001',
  },
  {
    id: 'TXN-002',
    type: 'debit',
    description: 'Monthly Repayment — LOAN-2026-0089',
    amount: 125000,
    date: '2026-02-28',
    status: 'completed',
    reference: 'HM-DD-20260228-001',
  },
  {
    id: 'TXN-003',
    type: 'debit',
    description: 'Monthly Repayment — LOAN-2026-0089',
    amount: 125000,
    date: '2026-01-28',
    status: 'completed',
    reference: 'HM-DD-20260128-001',
  },
  {
    id: 'TXN-004',
    type: 'credit',
    description: 'Loan Disbursement — LOAN-2026-0089',
    amount: 2500000,
    date: '2026-01-02',
    status: 'completed',
    reference: 'HM-DISB-20260102-089',
  },
  {
    id: 'TXN-005',
    type: 'fee',
    description: 'Application Processing Fee',
    amount: 5000,
    date: '2025-12-28',
    status: 'completed',
    reference: 'HM-FEE-20251228-001',
  },
];

// ── Repayment schedule ────────────────────────────────────────────────────────
export const repaymentSchedule: RepaymentEntry[] = [
  { id: 'REP-001', loanId: 'LOAN-2026-0089', applicantName: 'Adaeze Okafor', accountNumber: 'HM-2024-001234', amount: 125000, dueDate: '2026-01-28', paidDate: '2026-01-28', status: 'paid', method: 'Direct Debit' },
  { id: 'REP-002', loanId: 'LOAN-2026-0089', applicantName: 'Adaeze Okafor', accountNumber: 'HM-2024-001234', amount: 125000, dueDate: '2026-02-28', paidDate: '2026-02-28', status: 'paid', method: 'Direct Debit' },
  { id: 'REP-003', loanId: 'LOAN-2026-0089', applicantName: 'Adaeze Okafor', accountNumber: 'HM-2024-001234', amount: 125000, dueDate: '2026-03-28', paidDate: '2026-03-28', status: 'paid', method: 'Direct Debit' },
  { id: 'REP-004', loanId: 'LOAN-2026-0089', applicantName: 'Adaeze Okafor', accountNumber: 'HM-2024-001234', amount: 125000, dueDate: '2026-04-28', status: 'upcoming' },
  { id: 'REP-005', loanId: 'LOAN-2026-0089', applicantName: 'Adaeze Okafor', accountNumber: 'HM-2024-001234', amount: 125000, dueDate: '2026-05-28', status: 'upcoming' },
  { id: 'REP-006', loanId: 'LOAN-2026-0089', applicantName: 'Adaeze Okafor', accountNumber: 'HM-2024-001234', amount: 125000, dueDate: '2026-06-28', status: 'upcoming' },
];

// ── All repayments (admin view) ───────────────────────────────────────────────
export const allRepayments: RepaymentEntry[] = [
  { id: 'AREP-001', loanId: 'LOAN-2026-0089', applicantName: 'Adaeze Okafor', accountNumber: 'HM-2024-001234', amount: 125000, dueDate: '2026-04-28', status: 'upcoming' },
  { id: 'AREP-002', loanId: 'LOAN-2026-0091', applicantName: 'Seun Bello', accountNumber: 'HM-2024-006123', amount: 237375, dueDate: '2026-04-25', paidDate: '2026-04-25', status: 'paid', method: 'Direct Debit' },
  { id: 'AREP-003', loanId: 'LOAN-2025-0072', applicantName: 'Kemi Adisa', accountNumber: 'HM-2024-009821', amount: 89000, dueDate: '2026-04-20', status: 'missed' },
  { id: 'AREP-004', loanId: 'LOAN-2025-0068', applicantName: 'Tunde Olawale', accountNumber: 'HM-2024-007345', amount: 210000, dueDate: '2026-04-15', paidDate: '2026-04-15', status: 'paid', method: 'Direct Debit' },
  { id: 'AREP-005', loanId: 'LOAN-2025-0079', applicantName: 'Ngozi Obi', accountNumber: 'HM-2024-008901', amount: 156000, dueDate: '2026-04-10', status: 'missed' },
  { id: 'AREP-006', loanId: 'LOAN-2026-0089', applicantName: 'Adaeze Okafor', accountNumber: 'HM-2024-001234', amount: 125000, dueDate: '2026-03-28', paidDate: '2026-03-28', status: 'paid', method: 'Direct Debit' },
];

// ── Customers ─────────────────────────────────────────────────────────────────
export const customers: Customer[] = [
  { id: 'USR-001', name: 'Adaeze Okafor', email: 'user@harvimoney.ng', phone: '+234 802 345 6789', accountNumber: 'HM-2024-001234', employer: 'First Bank Nigeria PLC', salary: 450000, joinDate: '2024-08-15', activeLoans: 1, totalBorrowed: 2500000, creditScore: 742, status: 'active' },
  { id: 'USR-002', name: 'Chukwuemeka Adeyemi', email: 'c.adeyemi@zenithbank.com', phone: '+234 803 456 7890', accountNumber: 'HM-2025-002341', employer: 'Zenith Bank Nigeria', salary: 520000, joinDate: '2025-02-10', activeLoans: 0, totalBorrowed: 0, creditScore: 698, status: 'active' },
  { id: 'USR-003', name: 'Fatima Abubakar', email: 'f.abubakar@mtn.ng', phone: '+234 805 567 8901', accountNumber: 'HM-2025-003102', employer: 'MTN Nigeria Communications', salary: 380000, joinDate: '2025-03-22', activeLoans: 0, totalBorrowed: 0, creditScore: 711, status: 'active' },
  { id: 'USR-004', name: 'David Taiwo', email: 'd.taiwo@dangote.com', phone: '+234 806 678 9012', accountNumber: 'HM-2024-004567', employer: 'Dangote Cement PLC', salary: 310000, joinDate: '2024-11-05', activeLoans: 0, totalBorrowed: 0, creditScore: 521, status: 'inactive' },
  { id: 'USR-005', name: 'Grace Eze', email: 'g.eze@nbplc.com', phone: '+234 807 789 0123', accountNumber: 'HM-2025-005891', employer: 'Nigerian Breweries PLC', salary: 620000, joinDate: '2025-05-18', activeLoans: 0, totalBorrowed: 0, creditScore: 763, status: 'active' },
  { id: 'USR-006', name: 'Seun Bello', email: 's.bello@accessbank.com', phone: '+234 808 890 1234', accountNumber: 'HM-2024-006123', employer: 'Access Bank PLC', salary: 290000, joinDate: '2024-09-30', activeLoans: 0, totalBorrowed: 450000, creditScore: 728, status: 'active' },
];

export function formatCurrency(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG');
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
