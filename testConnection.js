const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    try {
        const result = await prisma.ticket.findMany()
        console.log('Conexión exitosa. Tickets encontrados:', result.length)
    } catch (error) {
        console.error('Error de conexión:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()