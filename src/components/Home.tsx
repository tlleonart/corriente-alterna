'use client'

import { useEffect, useState } from "react"
import Loader from "./Loader"
import MainContentHome from "./MainContentHome"

export default function HomePage() {
    /* const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const startTime = performance.now()

            const updateProgress = () => {
                const resources = performance.getEntriesByType('resource')
                const totalResources = resources.length
                const loadedResources = resources.filter(r => r.responseEnd > 0).length
                const loadProgress = (loadedResources / totalResources) * 100
                const timeProgress = Math.min((performance.now() - startTime) / 5000 * 100, 100)
                setProgress(Math.max(loadProgress, timeProgress))
            }

            const progressInterval = setInterval(updateProgress, 100)

            const handleLoad = () => {
                clearInterval(progressInterval)
                setProgress(100)
                setTimeout(() => setIsLoading(false), 100)
                setIsLoading(false)
            }

            window.addEventListener('load', handleLoad)

            return () => {
                clearInterval(progressInterval)
                window.removeEventListener('load', handleLoad)
            }
        }
    }, [])
*/
    return (
        <MainContentHome />
    )
}