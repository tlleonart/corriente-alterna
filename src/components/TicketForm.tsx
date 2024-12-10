'use client'

import { solicitarTicket } from '@/app/actions'
import { sendGTMEvent } from '@next/third-parties/google'
import { useState } from 'react'

const TicketForm: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [successMsg, setSuccessMsg] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        setError(null)

        const result = await solicitarTicket(formData)

        if (result.success) {
            if (typeof window !== 'undefined' && window.fbq) {
                window.fbq('track', 'Subscribe')
                sendGTMEvent({ event: 'register' })
            }


            setIsLoading(false)
            setSuccessMsg(result.message!)
            setIsSubmitted(true)
        } else {
            console.error(`Error intentando suscribir usuario: ${result.error}`)
            setError(result.error || 'Ocurrió un error desconocido.')
        }
        setIsLoading(false)

    }

    if (isSubmitted) {
        return (
            <div className="bg-green-500 text-white p-4 rounded-md">
                <h2 className="text-2xl font-bold mb-2">¡Registro exitoso!</h2>
                <p>{successMsg}</p>
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
                className="w-full bg-crayola text-lavander font-bold py-2 px-4 hover:bg-orange-600 disabled:bg-gray-600 disabled:hover:none transition-colors"
                disabled={isLoading}
            >
                {isLoading ? "NO CIERRES EL NAVEGADOR" : "SOLICITAR TICKET"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    )
}

export default TicketForm
