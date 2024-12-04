'use client'

import { useState } from "react"
import MainContentHome from "./MainContentHome"
import Button from "./ui/Button"

export default function HomePage() {
    const [modalClosed, setModalClosed] = useState(false)

    return (
        <>
            {!modalClosed && <div className="h-screen w-screen fixed top-0 z-40 flex justify-center items-center">
                <div className="bg-black opacity-50 h-screen w-screen fixed z-0 " />
                <div className="flex flex-col justify-center h-screen w-screen relative z-50 items-center ">
                    <div className="gap-4 bg-black opacity-100 h-2/3 w-2/3 border-white-[1px] flex flex-col justify-center text-center p-4">
                        <h1 className="text-xl text-crayola"> INFORMACIÓN IMPORTANTE</h1>
                        <p>La locación del evento se trasladó al Museo de la Ciudad (Bv. Oroño 2361). Si ya te acreditaste, no es necesario que vuelvas a llenar el formulario. Las acreditaciones llegarán el 10 de diciembre al mail que ingresaste. Si no recibís tu acreditación, contactate a somoscorrientealterna@gmail.com</p>
                        <Button onClick={() => setModalClosed(true)}>ENTENDIDO</Button>
                    </div>
                </div>
            </div>}
            <MainContentHome />
        </>
    )
}