import { useEffect, useRef } from 'react'


export default function CustomCursor() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)

    useEffect(() => {
        const dot = dotRef.current
        const ring = ringRef.current
        let mouseX = 0, mouseY = 0
        let ringX = 0, ringY = 0
        let animId

        const moveCursor = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
            dot.style.left = `${mouseX}px`
            dot.style.top = `${mouseY}px`
        }

        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.12
            ringY += (mouseY - ringY) * 0.12
            ring.style.left = `${ringX}px`
            ring.style.top = `${ringY}px`
            animId = requestAnimationFrame(animateRing)
        }

        const onEnter = () => {
            ring.style.width = '48px'
            ring.style.height = '48px'
            ring.style.borderColor = 'rgba(255,255,255,0.8)'
        }
        const onLeave = () => {
            ring.style.width = '32px'
            ring.style.height = '32px'
            ring.style.borderColor = 'rgba(255,255,255,0.5)'
        }

        document.addEventListener('mousemove', moveCursor)
        document.querySelectorAll('a, button, [data-hoverable]').forEach(el => {
            el.addEventListener('mouseenter', onEnter)
            el.addEventListener('mouseleave', onLeave)
        })
        animId = requestAnimationFrame(animateRing)

        return () => {
            document.removeEventListener('mousemove', moveCursor)
            cancelAnimationFrame(animId)
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    )
}