'use client'

import { FC } from "react"
import loader_image from '../../public/ca_loading.png'
import Image from "next/image"

interface LoaderProps {
    progress: number
}

const Loader: FC<LoaderProps> = ({ progress }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-night bg-opacity-50 z-50">
            <div className="text-center">
                <div className="relative w-24 h-24 mb-4">
                    <Image src={loader_image} alt='Loading' layout="fill" className="absolute" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-crayola mix-blend-overlay" style={{
                        clipPath: `inset(${100 - progress}% 0 0 0)`,
                        transition: 'clip-path 0.2s ease-out',
                    }} />
                </div>
                <p className='text-lavander font-bold'>{Math.round(progress)}%</p>
            </div>
        </div>
    )
}

export default Loader