'use client'

import { FC, useState } from "react"
import Button from "./ui/Button"
import Badge from "./ui/Badge"
import TicketFormModal from "./TicketFormModal"

const TicketButton: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
        <>
            <Button onClick={() => setIsModalOpen(true)}>
                ACREDITATE
                <Badge className="absolute rotate-6 -top-2 -right-2 font-light">
                    ¡Es gratis!
                </Badge>
            </Button>
            <TicketFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}

export default TicketButton