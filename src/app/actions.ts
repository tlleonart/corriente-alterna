'use server'

import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

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

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        // Enviar el correo
        await transporter.sendMail({
            from: '"Corriente Alterna" <noreply@corrientealterna.com>',
            to: email,
            subject: 'Tu registro para Corriente Alterna',
            text: `Hola ${nombre},\n\nGracias por registrarte para Corriente Alterna. Tu registro ha sido confirmado.\n\nPronto recibirás tu acreditación. ¡Nos vemos en el festival!`,
            html: `<p>Hola ${nombre},</p><p>Gracias por registrarte para Corriente Alterna. Tu registro ha sido confirmado.</p><p>Pronto recibirás tu acreditación. ¡Nos vemos en el festival!</p>`,
        })


        return { success: true }
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('Unique constraint failed on the fields: (`email`)')
        ) {
            return { error: 'Este correo electrónico ya está registrado.' }
        }

        console.error(`Error en server action: ${error}`)

        return { error: 'Hubo un error al procesar tu solicitud. Inténtalo de nuevo más tarde.' }
    }
}
