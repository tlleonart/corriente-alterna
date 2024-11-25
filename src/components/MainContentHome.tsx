import Image from "next/image";
import { FC } from "react";
import { MapPin } from "lucide-react";
import Footer from "./Footer";
import TicketButton from "./TicketButton";
import logo from '../../public/ca_logo.png'
import texture from '../../public/paper-bg.jpg'
import mapa from '../../public/map.png'

const MainContentHome: FC = () => {
    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 mt-10">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-night opacity-80"></div>
                <Image
                    src={texture}
                    alt="Textura"
                    fill
                    quality={100}
                    priority
                    className="object-cover mix-blend-multiply"
                    sizes="100vw"
                />
            </div>
            <div className="relative z-10 flex flex-col min-h-screen">
                <main className="max-w-4xl w-full text-center">
                    <div className="w-full flex justify-center">
                        <Image src={logo} alt='Corriente Alterna' width={300} priority />
                    </div>
                    <div className="">
                        <section className="mb-16 text-center text-crayola mt-2">
                            <p className="text-5xl w-full font-light"><a>WINONA RIDERS</a></p>
                            <p className="text-5xl w-full font-light"><a>DOPPEL GANGS</a></p>
                            <p className="text-xl w-full font-light flex justify-center space-x-2">
                                <a>UTAH</a>
                                <span>|</span>
                                <a>SOLCA</a>
                                <span>|</span>
                                <a>GLADYSON PANTHER</a>
                            </p>
                            <p className="text-xl w-full"><a>EXPLANADA MACRO</a> - 14 DIC´ 2024</p>
                        </section>
                        <TicketButton />
                        <section className="my-16 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-4">Ubicación</h2>
                            <Image
                                src={mapa}
                                alt="Mapa de la ubicación del evento"
                            />
                            <p className="flex items-center justify-center mb-4">
                                <MapPin className="mr-2" />
                                Av. de la Costa Estanislao López 2250, Rosario, Santa Fe
                            </p>
                        </section>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default MainContentHome