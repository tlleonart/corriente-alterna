'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type ActionResult = {
    success?: boolean;
    error?: string;
}

export async function solicitarTicket(formData: FormData): Promise<ActionResult> {
    const nombre = formData.get('name') as string | null
    const email = formData.get('email') as string | null

    if (!nombre || !email) {
        return { error: 'Por favor, completa todos los campos.' }
    }

    try {
        // Intentar crear el ticket en la base de datos
        await prisma.ticket.create({
            data: { nombre, email },
        })

        return { success: true }
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('Unique constraint failed on the fields: (`email`)')
        ) {
            return { error: 'Este correo electrónico ya está registrado.' }
        }

        return { error: 'Hubo un error al procesar tu solicitud. Inténtalo de nuevo más tarde.' }
    }
}
