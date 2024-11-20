import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button className="border-4 border-crayola text-crayola font-bold py-3 px-6 text-xl hover:bg-lavander transition-colors relative" {...props}>
            {children}
        </button>
    )
}

export default Button