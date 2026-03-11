import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PAGE_STRUCTURES = {
    '/': 'GRAPH',
    '/about': 'LINKED_LIST',
    '/skills': 'BINARY_TREE',
    '/projects': 'STACK',
    '/contact': 'HASH_TABLE',
}

export default function SystemStatus() {
    const location = useLocation()
    const [time, setTime] = useState(new Date())
    const [memUsage] = useState((Math.random() * 40 + 20).toFixed(1))

    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(t)
    }, [])

    const struct = PAGE_STRUCTURES[location.pathname] || 'UNDEFINED'

    return (
        <div className="fixed top-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 backdrop-blur-sm px-6 py-1.5 flex items-center justify-between font-mono text-[10px] text-white/30 select-none">
            <div className="flex items-center gap-6">
                <span className="text-white/60">SYS:ACTIVE</span>
                <span>STRUCTURE: <span className="text-white/60">{struct}</span></span>
                <span>MEM: <span className="text-white/50">{memUsage}%</span></span>
            </div>
            <div className="flex items-center gap-6">
                <span>PATH: <span className="text-white/50">{location.pathname}</span></span>
                <span>{time.toLocaleTimeString('en-US', { hour12: false })}</span>
            </div>
        </div>
    )
}