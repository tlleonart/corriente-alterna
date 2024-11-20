'use client'

import { solicitarTicket } from '@/app/actions'
import { useState } from 'react'

const TicketForm: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        setError(null) // Limpiar errores previos

        const result = await solicitarTicket(formData)

        if (result.success) {
            setIsSubmitted(true)
        } else {
            setError(result.error || 'Ocurrió un error desconocido.')
        }
    }

    if (isSubmitted) {
        return (
            <div className="bg-green-500 text-white p-4 rounded-md">
                <h2 className="text-2xl font-bold mb-2">¡Registro exitoso!</h2>
                <p>Revisa tu correo electrónico para la confirmación.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="sr-only">Nombre</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="NOMBRE"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-lavander border-gray-700 text-crayola focus:outline-none focus:ring-2 focus:ring-crayola"
                />
            </div>
            <div>
                <label htmlFor="email" className="sr-only">Correo electrónico</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="CORREO ELECTRÓNICO"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-lavander border-gray-700 text-crayola focus:outline-none focus:ring-2 focus:ring-crayola"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-crayola text-lavander font-bold py-2 px-4 hover:bg-orange-600 transition-colors"
            >
                SOLICITAR TICKET
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    )
}

export default TicketForm
