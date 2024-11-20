import { Instagram } from "lucide-react";
import { FC } from "react";

const Footer: FC = () => {
    return (
        <footer className="mb-12 text-sm text-gray-500 flex flex-col justify-center items-center gap-2">
            <a
                href="https://www.instagram.com/corrientealterna"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-crayola hover:text-orange-500 transition-colors"
            >
                <Instagram className="mr-2" />
                Síguenos en Instagram
            </a>
            © 2023 Corriente Alterna. Todos los derechos reservados.
        </footer>
    )
}

export default Footer