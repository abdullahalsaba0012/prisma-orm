import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create first user
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      password: 'password123', // In a real app, this should be hashed
      posts: {
        create: [
          {
            title: 'First Post by Alice',
            content: 'This is my first post content!',
            slug: 'first-post-by-alice'
          },
          {
            title: 'Second Post by Alice',
            content: 'This is another post by me!',
            slug: 'second-post-by-alice'
          }
        ]
      }
    }
  })

  // Create second user
  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      password: 'password456', // In a real app, this should be hashed
      posts: {
        create: [
          {
            title: 'Bob\'s First Post',
            content: 'Hello world! This is my first post.',
            slug: 'bobs-first-post'
          }
        ]
      }
    }
  })

  console.log({ alice, bob })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }) 