import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import puppeteer from 'puppeteer';
import nodemailer from 'nodemailer';
// Definir tipos para el cuerpo de la solicitud
interface GeneratePdfRequestBody {
    nombre: string;
    email: string;
    id: string;
}

// Función para generar el PDF
async function generatePDF(nombre: string, email: string, id: string): Promise<any> {
    // Generar QR como base64
    const qrBase64 = await QRCode.toDataURL(`Nombre: ${nombre}\nEmail: ${email}\nID: ${id}`);

    // HTML dinámico para el PDF
    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap" rel="stylesheet">
      <title>Acreditación</title>
      <style>
        body {
          font-family: 'Bricolage Grotesque', Arial, sans-serif;
          text-align: center;
        }
        .container {
          width: 90%;
          margin: 0 auto;
          padding: 20px;
          border: 2px solid #000;
        }
        img {
          max-width: 200px;
        }
        .qr-code {
          margin: 20px auto;
        }
        .logo {
          filter: grayscale(100%);
          margin: 20px auto;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>CORRIENTE ALTERNA</h1>
        <p>14 Dic' 2024 - 18:00 HS</p>
        <p>Museo de la Ciudad, BV. Oroño 2361</p>
        <hr />
        <h2>${nombre}</h2>
        <p>Email: ${email}</p>
        <div class="qr-code">
          <img src="${qrBase64}" alt="QR Code" />
        </div>
        <p>NRO DE ACREDITACIÓN: ${id}</p>
        <p>CÓDIGO: ${id.toString().padStart(20, '0')}</p>
        <p>ACCESO GENERAL</p>
        <hr />
      </div>
    </body>
    </html>
  `;

    // Crear PDF con Puppeteer
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return pdfBuffer;
}

// Manejo de la solicitud POST
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body: GeneratePdfRequestBody = await req.json();

        const { nombre, email, id } = body;

        if (!nombre || !email || !id) {
            return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
        }

        // Generar PDF
        const pdfBuffer = await generatePDF(nombre, email, id);

        // Configurar Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: '"Corriente Alterna" <noreply@corrientealterna.com>',
            to: email,
            subject: 'LLEGÓ TU ACCESO',
            html: `
              <div style="text-align: center; background-color: #000; color: #fff; padding: 20px; font-family: Arial, sans-serif;">
                <img src="https://www.festivalcorrientealterna.com/mail_body.png" alt="Corriente Alterna" style="max-width: 100%; height: auto; border: none;" />
                <p style="color: #fff; font-size: 14px;">Descarga tu acreditación en el archivo adjunto.</p>
              </div>
            `,
            attachments: [
                {
                    filename: `acreditacion_${id}.pdf`,
                    content: pdfBuffer,
                },
            ],
        };

        // Enviar correo
        await transporter.sendMail(mailOptions);

        // Responder con el PDF descargable
        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="acreditacion_${id}.pdf"`,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
    }
}
