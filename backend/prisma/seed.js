const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle', 'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Edward', 'Deborah'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];
const policyTypes = ['Auto Comprehensive', 'Homeowners Plus', 'Life Term 20yr', 'Health Standard', 'Renter\'s Basic', 'Commercial Liability'];
const incidentTypes = ['Windshield Damage', 'Water Leak', 'Fire Damage', 'Theft', 'Collision', 'Medical Emergency', 'Property Damage'];
const claimStatuses = ['In Review', 'Approved', 'Rejected'];
const statuses = ['Active', 'Expiring soon', 'Cancelled'];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  console.log('Cleaning up database...');
  await prisma.document.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.claim.deleteMany();
  await prisma.policy.deleteMany();
  await prisma.customerProfile.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('Seeding initial users...');
  // Create Core Users
  await prisma.user.create({
    data: { email: 'admin@shieldlink.com', password: 'password123', role: 'ADMIN', name: 'Alexander Admin' }
  });

  await prisma.user.create({
    data: { email: 'agent@shieldlink.com', password: 'password123', role: 'AGENT', name: 'Agent Smith' }
  });

  await prisma.user.create({
    data: {
      email: 'jonathan.d@example.com',
      password: 'password123',
      role: 'CUSTOMER',
      name: 'Jonathan Davis',
      customers: { create: { phone: '555-0102', address: '123 Fake St' } }
    }
  });

  console.log('Generating 10 random customers, policies, claims, and payments...');
  
  for (let i = 0; i < 10; i++) {
    const fn = randomItem(firstNames);
    const ln = randomItem(lastNames);
    const name = `${fn} ${ln}`;
    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${randomNumber(1, 999)}@example.com`;
    
    const customerUser = await prisma.user.create({
      data: {
        email,
        password: 'password123',
        role: 'CUSTOMER',
        name,
        customers: {
          create: {
            phone: `555-${randomNumber(1000, 9999)}`,
            address: `${randomNumber(100, 9999)} ${randomItem(['Oak', 'Maple', 'Pine', 'Cedar', 'Elm'])} St`
          }
        }
      },
      include: { customers: true }
    });

    const customerProfile = customerUser.customers[0];
    
    // Create 1 to 3 policies per customer
    const numPolicies = randomNumber(1, 3);
    for (let p = 0; p < numPolicies; p++) {
      const premium = randomNumber(50, 400);
      const policy = await prisma.policy.create({
        data: {
          customerId: customerProfile.id,
          type: randomItem(policyTypes),
          status: Math.random() > 0.8 ? 'Cancelled' : 'Active',
          coverageLimit: randomNumber(100, 1000) * 1000,
          premium: premium,
          deductible: randomNumber(1, 10) * 100,
          expiryDate: `202${randomNumber(5, 7)}-${String(randomNumber(1, 12)).padStart(2, '0')}-${String(randomNumber(1, 28)).padStart(2, '0')}`
        }
      });

      // Create initial payment for policy
      await prisma.payment.create({
        data: {
          policyId: policy.id,
          customerId: customerProfile.id,
          amount: premium,
          date: `2024-${String(randomNumber(1, 12)).padStart(2, '0')}-${String(randomNumber(1, 28)).padStart(2, '0')}`,
          description: `Premium Payment - ${policy.type}`,
          status: 'Successful'
        }
      });

      // 40% chance of a claim per policy
      if (Math.random() < 0.4) {
        await prisma.claim.create({
          data: {
            policyId: policy.id,
            customerId: customerProfile.id,
            incidentType: randomItem(incidentTypes),
            status: randomItem(claimStatuses),
            submittedDate: `2024-${String(randomNumber(1, 12)).padStart(2, '0')}-${String(randomNumber(1, 28)).padStart(2, '0')}`,
            estimatedLoss: randomNumber(10, 500) * 100,
            description: 'Incident occurred suddenly and was reported immediately.'
          }
        });
      }
    }
  }

  console.log('Seeding finished successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
