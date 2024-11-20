'use client'

import { FC, useEffect, useRef } from "react"
import { X } from 'lucide-react'
import TicketForm from "./TicketForm"

interface TicketFormModalProps {
    isOpen: boolean
    onClose: () => void
}

const TicketFormModal: FC<TicketFormModalProps> = ({
    isOpen,
    onClose
}) => {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick)
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-night p-8 max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-crayola hover:text-white transition-colors"
                    aria-label="Cerrar formulario"
                >
                    <X size={24} />
                </button>
                <h2 className="text-4xl mb-4 text-center text-lavander">SOLICITÁ TU TICKET</h2>
                <TicketForm />
            </div>
        </div>
    )
}

export default TicketFormModal