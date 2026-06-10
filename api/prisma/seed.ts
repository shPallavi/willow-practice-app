import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed a default user
  const user = await prisma.user.upsert({
    where: { email: 'pallavi@example.com' },
    update: {},
    create: {
      name: 'Pallavi Singh',
      email: 'pallavi@example.com',
      role: 'Admin',
    },
  });
  console.log('Created user:', user);

  // Seed sample blogs
  const blog1 = await prisma.blog.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Welcome to Willow',
      description: 'Getting started with our blog platform',
      content:
        'This is the first blog post on Willow. Stay tuned for more content!',
      author: 'Pallavi Singh',
    },
  });
  console.log('Created blog:', blog1);

  const blog2 = await prisma.blog.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Building with NestJS and Prisma',
      description: 'A guide to building modern APIs',
      content:
        'NestJS combined with Prisma provides a powerful backend development experience with type safety.',
      author: 'Pallavi Singh',
    },
  });
  console.log('Created blog:', blog2);

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
