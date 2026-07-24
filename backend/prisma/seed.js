const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Clean up
  await prisma.document.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.claim.deleteMany();
  await prisma.policy.deleteMany();
  await prisma.customerProfile.deleteMany();
  await prisma.user.deleteMany();
  
  // Create Users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@shieldlink.com',
      password: 'password123',
      role: 'ADMIN',
      name: 'Alexander Admin',
    }
  });

  const agentUser = await prisma.user.create({
    data: {
      email: 'agent@shieldlink.com',
      password: 'password123',
      role: 'AGENT',
      name: 'Agent Smith',
    }
  });

  const customerUser = await prisma.user.create({
    data: {
      email: 'jonathan.d@example.com',
      password: 'password123',
      role: 'CUSTOMER',
      name: 'Jonathan Davis',
      customers: {
        create: {
          phone: '555-0102',
          address: '123 Fake St'
        }
      }
    },
    include: { customers: true }
  });

  const customerProfile = customerUser.customers[0];

  // Create mock policies for JD
  const policyAuto = await prisma.policy.create({
    data: {
      customerId: customerProfile.id,
      type: 'Auto Comprehensive',
      status: 'Active',
      coverageLimit: 500000,
      premium: 184,
      deductible: 500,
      expiryDate: '2024-10-28'
    }
  });

  const policyHome = await prisma.policy.create({
    data: {
      customerId: customerProfile.id,
      type: 'Homeowners Plus',
      status: 'Active',
      coverageLimit: 1200000,
      premium: 128.50,
      deductible: 1000,
      expiryDate: '2024-12-15'
    }
  });

  // Create Claims
  await prisma.claim.create({
    data: {
      policyId: policyAuto.id,
      customerId: customerProfile.id,
      incidentType: 'Windshield Damage',
      status: 'In Review',
      submittedDate: '2023-10-22',
      estimatedLoss: 12450.00,
      description: 'Rear-end collision occurred at the intersection of 5th Ave and Broadway.'
    }
  });

  // Create Payments
  await prisma.payment.create({
    data: {
      policyId: policyAuto.id,
      customerId: customerProfile.id,
      amount: 184.00,
      date: 'Oct 12, 2023',
      description: 'Premium Payment - Auto',
      status: 'Successful'
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
