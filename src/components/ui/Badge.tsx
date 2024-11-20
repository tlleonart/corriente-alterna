import clsx from "clsx";
import { FC, ReactNode } from "react";

interface BadgeProps {
    children: ReactNode
    className: string
}

const Badge: FC<BadgeProps> = ({ children, className }) => {
    return (
        <span className={clsx(className, 'bg-white text-crayola text-xs font-bold px-2 py-1 rounded-full')}>
            {children}
        </span>
    )
}

export default Badge