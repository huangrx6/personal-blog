import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const email = process.env.ADMIN_EMAIL || 'admin@example.com'

    // Create or update admin user
    const user = await prisma.user.upsert({
        where: { email: email },
        update: {},
        create: {
            email: email,
            name: 'Admin',
            image: '',
        },
    })

    console.log('Created user:', user)
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
