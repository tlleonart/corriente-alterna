'use server'

import { prisma } from '@/lib/prisma';

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
        const ticket = await prisma.ticket.create({
            data: { nombre, email },
        });

        // Generar y enviar el PDF a través del endpoint
        const response = await fetch(`https://www.festivalcorrientealterna.com/api/generate-pdf`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, id: ticket.id }),
        });

        if (!response.ok) {
            console.error(`Error al generar el PDF: ${await response.text()}`);
            return { error: 'Hubo un problema al generar tu acreditación. Inténtalo más tarde.' };
        }

        await prisma.ticket.update({
            where: { id: ticket.id },
            data: { pdfSent: true },
        });

        return { success: true };
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
