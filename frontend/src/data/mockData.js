export const initialCustomers = [
  { id: 'JD-99281-X', name: 'Jonathan Davis', initials: 'JD', email: 'jonathan.d@example.com', phone: '555-0102' },
  { id: 'EM-10322-B', name: 'Elena Martinez', initials: 'EM', email: 'elena.m@example.com', phone: '555-0199' },
  { id: 'TR-88211-L', name: 'Thomas Reed', initials: 'TR', email: 'thomas.r@example.com', phone: '555-0144' },
  { id: 'SC-55219-A', name: 'Sarah Chen', initials: 'SC', email: 'sarah.c@example.com', phone: '555-0188' }
];

export const initialPolicies = [
  { id: 'AL-992384-01', customerId: 'JD-99281-X', type: 'Auto Comprehensive', status: 'Active', coverageLimit: 500000, premium: 184, deductible: 500, expiryDate: '2024-10-28' },
  { id: 'HP-441029-05', customerId: 'JD-99281-X', type: 'Homeowners Plus', status: 'Active', coverageLimit: 1200000, premium: 128.50, deductible: 1000, expiryDate: '2024-12-15' },
  { id: 'AL-10322-01', customerId: 'EM-10322-B', type: 'Auto Insurance', status: 'Expiring soon', coverageLimit: 250000, premium: 145, deductible: 1000, expiryDate: '2023-11-05' },
  { id: 'LI-88211-01', customerId: 'TR-88211-L', type: 'Life Insurance', status: 'Cancelled', coverageLimit: 1000000, premium: 85, deductible: 0, expiryDate: '2023-09-01' },
];

export const initialClaims = [
  { id: 'CL-88210', policyId: 'AL-992384-01', customerId: 'JD-99281-X', incidentType: 'Windshield Damage', status: 'In Review', submittedDate: '2023-10-22', estimatedLoss: 12450.00, description: 'Rear-end collision occurred at the intersection of 5th Ave and Broadway.' },
  { id: 'CL-88209', policyId: 'HP-441029-05', customerId: 'JD-99281-X', incidentType: 'Water Damage', status: 'Approved', submittedDate: '2023-10-15', estimatedLoss: 4500.00, description: 'Pipe burst in the kitchen.' }
];

export const initialPayments = [
  { id: 'PAY-1', date: 'Oct 12, 2023', description: 'Premium Payment - Auto', amount: 184.00, status: 'Successful', customerId: 'JD-99281-X' },
  { id: 'PAY-2', date: 'Sep 12, 2023', description: 'Premium Payment - Auto', amount: 184.00, status: 'Successful', customerId: 'JD-99281-X' },
  { id: 'PAY-3', date: 'Aug 12, 2023', description: 'Premium Payment - Auto', amount: 184.00, status: 'Successful', customerId: 'JD-99281-X' }
];

export const systemMetrics = {
  activePolicies: { value: 12482, trend: 12 },
  pendingClaims: { value: 842, trend: -4 },
  premiumCollection: { value: 4200000, trend: 24 },
  customerGrowth: { value: 1104, trend: 8.2 }
};
