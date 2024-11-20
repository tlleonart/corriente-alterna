import PDFDocument from 'pdfkit'

export async function generateTicket(nombre: string, email: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            size: 'A4',
            bufferPages: true,
        })

        let buffers: Buffer[] = []
        doc.on('data', buffers.push.bind(buffers))
        doc.on('end', () => {
            let pdfData = Buffer.concat(buffers)
            resolve(pdfData)
        })

        // Agregar contenido al PDF
        doc
            .font('Helvetica-Bold')
            .fontSize(24)
            .text('Corriente Alterna - E-Ticket', { align: 'center' })
            .moveDown()
            .font('Helvetica')
            .fontSize(16)
            .text(`Nombre: ${nombre}`, { align: 'left' })
            .text(`Email: ${email}`, { align: 'left' })
            .moveDown()
            .text('Este ticket te da acceso al festival Corriente Alterna.', { align: 'center' })
            .text('Fecha: DD/MM/YYYY', { align: 'center' })
            .text('Lugar: Av. de la Costa Estanislao López 2250, Rosario, Argentina', { align: 'center' })

        doc.end()
    })
}