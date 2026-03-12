import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrapper from '../UI/PageWrapper'

// Nodes tightly clustered — x/y range from ~30–70% of world
const NODES = [
    { id: 'home', label: 'B.S.V.R', fullName: 'Bonamukkala Saivenkata Reddy', sublabel: 'Scalable Systems Engineer', path: '/', x: 50, y: 50, isCenter: true },
    { id: 'about', label: 'ABOUT', sublabel: 'Linked List', path: '/about', x: 25, y: 28 },
    { id: 'skills', label: 'SKILLS', sublabel: 'Binary Tree', path: '/skills', x: 68, y: 27 },
    { id: 'projects', label: 'PROJECTS', sublabel: 'Stack', path: '/projects', x: 77, y: 68 },
    { id: 'contact', label: 'CONTACT', sublabel: 'Hash Table', path: '/contact', x: 25, y: 70 },
]

const EDGES = [
    { from: 'home', to: 'about' },
    { from: 'home', to: 'skills' },
    { from: 'home', to: 'projects' },
    { from: 'home', to: 'contact' },
    { from: 'about', to: 'skills' },
    { from: 'skills', to: 'projects' },
]

const WORLD_W = 2800
const WORLD_H = 1200
const MIN_ZOOM = 0.4
const MAX_ZOOM = 2.5
const ZOOM_STEP = 0.15

function getNodeById(id) {
    return NODES.find(n => n.id === id)
}

export default function Home() {
    const navigate = useNavigate()
    const containerRef = useRef(null)
    const [hoveredNode, setHoveredNode] = useState(null)
    const [tick, setTick] = useState(0)

    // Viewport state: pan + zoom
    const [pan, setPan] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [isPanning, setIsPanning] = useState(false)
    const panStart = useRef({ mx: 0, my: 0, px: 0, py: 0 })
    const didPan = useRef(false)

    const zoomAtPoint = (mx, my, delta) => {
        setZoom(prev => {
            const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta))
            const scale = next / prev

            setPan(p => ({
                x: mx - scale * (mx - p.x),
                y: my - scale * (my - p.y),
            }))

            return next
        })
    }

    // Center canvas on mount
    useEffect(() => {
        const update = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setPan({
                    x: (rect.width - WORLD_W) / 2,
                    y: (rect.height - WORLD_H) / 2,
                })
            }
        }
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    // Edge animation tick
    useEffect(() => {
        const id = setInterval(() => setTick(t => t + 1), 50)
        return () => clearInterval(id)
    }, [])

    // ── Zoom via wheel ────────────────────────────────────────────────────────
    const onWheel = useCallback((e) => {
        e.preventDefault()

        const container = containerRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        const mx = e.clientX - rect.left
        const my = e.clientY - rect.top

        const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
        zoomAtPoint(mx, my, delta)

    }, [])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        el.addEventListener('wheel', onWheel, { passive: false })
        return () => el.removeEventListener('wheel', onWheel)
    }, [onWheel])

    // ── Pan via mouse drag ────────────────────────────────────────────────────
    const onMouseDown = useCallback((e) => {
        if (e.button !== 0) return
        setIsPanning(true)
        didPan.current = false
        panStart.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y }
    }, [pan])

    const onMouseMove = useCallback((e) => {
        if (!isPanning) return
        const dx = e.clientX - panStart.current.mx
        const dy = e.clientY - panStart.current.my
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didPan.current = true
        setPan({ x: panStart.current.px + dx, y: panStart.current.py + dy })
    }, [isPanning])

    const onMouseUp = useCallback(() => setIsPanning(false), [])

    // ── Touch pan ─────────────────────────────────────────────────────────────
    const touchStart = useRef(null)
    const onTouchStart = useCallback((e) => {
        if (e.touches.length !== 1) return
        const t = e.touches[0]
        touchStart.current = { tx: t.clientX, ty: t.clientY, px: pan.x, py: pan.y }
        didPan.current = false
    }, [pan])

    const onTouchMove = useCallback((e) => {
        if (!touchStart.current || e.touches.length !== 1) return
        const t = e.touches[0]
        const dx = t.clientX - touchStart.current.tx
        const dy = t.clientY - touchStart.current.ty
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didPan.current = true
        setPan({ x: touchStart.current.px + dx, y: touchStart.current.py + dy })
    }, [])

    const onTouchEnd = useCallback(() => { touchStart.current = null }, [])

    // ── Zoom button helpers ───────────────────────────────────────────────────
    const zoomIn = () => {
        const container = containerRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        const mx = rect.width / 2
        const my = rect.height / 2

        zoomAtPoint(mx, my, ZOOM_STEP)
    }

    const zoomOut = () => {
        const container = containerRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        const mx = rect.width / 2
        const my = rect.height / 2

        zoomAtPoint(mx, my, -ZOOM_STEP)
    }

    const resetView = () => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        setZoom(1)
        setPan({ x: (rect.width - WORLD_W) / 2, y: (rect.height - WORLD_H) / 2 })
    }

    // ── Node positions ────────────────────────────────────────────────────────
    const getXY = (node) => ({
        x: (node.x / 100) * WORLD_W,
        y: (node.y / 100) * WORLD_H,
    })

    const handleNodeClick = (node) => {
        if (!didPan.current && node.path) navigate(node.path)
    }

    return (
        <PageWrapper>
            {/* Zoom controls */}
            <div className="fixed top-24 right-8 z-20 flex flex-col gap-1 select-none">
                <button
                    onClick={zoomIn}
                    className="w-9 h-9 border border-white/20 bg-black/80 backdrop-blur-sm font-mono text-white/60 hover:text-white hover:border-white/50 transition-all flex items-center justify-center text-lg leading-none"
                    title="Zoom in"
                >+</button>
                <button
                    onClick={zoomOut}
                    className="w-9 h-9 border border-white/20 bg-black/80 backdrop-blur-sm font-mono text-white/60 hover:text-white hover:border-white/50 transition-all flex items-center justify-center text-lg leading-none"
                    title="Zoom out"
                >−</button>
                <button
                    onClick={resetView}
                    className="w-9 h-9 border border-white/15 bg-black/80 backdrop-blur-sm font-mono text-white/30 hover:text-white/70 hover:border-white/40 transition-all flex items-center justify-center text-xs"
                    title="Reset view"
                >⌂</button>
                {/* Zoom level indicator */}
                <div className="mt-1 font-mono text-xs text-white/25 text-center">
                    {Math.round(zoom * 100)}%
                </div>
            </div>

            {/* Canvas container */}
            <div
                ref={containerRef}
                className="fixed inset-0 pt-16 pb-6 overflow-hidden"
                style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Single transform: translate then scale from origin */}
                <motion.svg
                    width={WORLD_W}
                    height={WORLD_H}
                    animate={{
                        x: pan.x,
                        y: pan.y,
                        scale: zoom,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20
                    }}
                    style={{
                        transformOrigin: "0 0",
                        willChange: "transform",
                        userSelect: "none",
                    }}
                >
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                            <polygon points="0 0, 6 3, 0 6" fill="rgba(255,255,255,0.25)" />
                        </marker>
                        <pattern id="world-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
                        </pattern>
                    </defs>

                    <rect width={WORLD_W} height={WORLD_H} fill="url(#world-grid)" />

                    {/* Edges */}
                    {EDGES.map((edge, i) => {
                        const from = getXY(getNodeById(edge.from))
                        const to = getXY(getNodeById(edge.to))
                        const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to
                        const length = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2)
                        return (
                            <g key={i}>
                                <line
                                    x1={from.x} y1={from.y}
                                    x2={to.x} y2={to.y}
                                    stroke={isHighlighted ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.13)'}
                                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                                    strokeDasharray="8 6"
                                    strokeDashoffset={-tick * 0.5}
                                    markerEnd="url(#arrowhead)"
                                    style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                                />
                                <text
                                    x={(from.x + to.x) / 2}
                                    y={(from.y + to.y) / 2 - 12}
                                    fill="rgba(255,255,255,0.15)"
                                    fontSize="13"
                                    fontFamily="JetBrains Mono"
                                    textAnchor="middle"
                                >
                                    {(length / 100).toFixed(2)}w
                                </text>
                            </g>
                        )
                    })}

                    {/* Nodes */}
                    {NODES.map((node) => {
                        const { x, y } = getXY(node)
                        const isHovered = hoveredNode === node.id
                        // Big nodes
                        const r = node.isCenter ? 145 : 105

                        return (
                            <g
                                key={node.id}
                                transform={`translate(${x}, ${y})`}
                                style={{ cursor: node.path ? 'pointer' : 'default' }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                onMouseUp={() => handleNodeClick(node)}
                                onTouchEnd={() => { if (!didPan.current && node.path) navigate(node.path) }}
                            >
                                {/* Outermost fade ring */}
                                <motion.circle
                                    r={r + 50}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.02)"
                                    strokeWidth="1"
                                    animate={{ r: [r + 40, r + 60, r + 40], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: NODES.indexOf(node) * 0.4 + 0.8 }}
                                />
                                {/* Inner pulse ring */}
                                <motion.circle
                                    r={r + 24}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.07)"
                                    strokeWidth="1"
                                    animate={{ r: [r + 16, r + 32, r + 16] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: NODES.indexOf(node) * 0.4 }}
                                />
                                {/* Main node circle */}
                                <motion.circle
                                    r={r}
                                    fill={isHovered ? '#ffffff' : '#000000'}
                                    stroke={isHovered ? '#ffffff' : 'rgba(255,255,255,0.55)'}
                                    strokeWidth={isHovered ? 2.5 : 1.5}
                                    filter={isHovered ? 'url(#glow)' : undefined}
                                    animate={{ scale: isHovered ? 1.04 : 1 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                />
                                {/* Memory address */}
                                <text
                                    y={-r - 16}
                                    fill="rgba(255,255,255,0.2)"
                                    fontSize="13"
                                    fontFamily="JetBrains Mono"
                                    textAnchor="middle"
                                >
                                    node_{node.id}
                                </text>
                                {/* Main label */}
                                <text
                                    y={node.isCenter ? -12 : -8}
                                    fill={isHovered ? '#000000' : '#ffffff'}
                                    fontSize={node.isCenter ? '22' : '17'}
                                    fontFamily="JetBrains Mono"
                                    fontWeight="700"
                                    textAnchor="middle"
                                    letterSpacing="3"
                                    style={{ transition: 'fill 0.2s' }}
                                >
                                    {node.label}
                                </text>

                                {/* Sublabel */}
                                <text
                                    y={node.isCenter ? 18 : 16}
                                    fill={isHovered ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.35)'}
                                    fontSize={node.isCenter ? '14' : '12'}
                                    fontFamily="JetBrains Mono"
                                    textAnchor="middle"
                                    style={{ transition: 'fill 0.2s' }}
                                >
                                    {node.sublabel}
                                </text>

                                {/* Enter prompt */}
                                {node.path && isHovered && (
                                    <text
                                        y={node.isCenter ? 42 : 38}
                                        fill="rgba(0,0,0,0.4)"
                                        fontSize="12"
                                        fontFamily="JetBrains Mono"
                                        textAnchor="middle"
                                    >
                                        → ENTER
                                    </text>
                                )}
                            </g>
                        )
                    })}

                    {hoveredNode === "home" && (() => {
                        const node = getNodeById("home")
                        const { x, y } = getXY(node)

                        const boxWidth = 340
                        const boxHeight = 44
                        const boxX = x - boxWidth / 2
                        const boxY = y - 370

                        return (
                            <motion.g
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                {/* pointer line */}
                                <line
                                    x1={x}
                                    y1={boxY + boxHeight}
                                    x2={x}
                                    y2={y - 150}
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth="1.2"
                                    strokeDasharray="4 4"
                                />

                                {/* message box */}
                                <rect
                                    x={boxX}
                                    y={boxY}
                                    width={boxWidth}
                                    height={boxHeight}
                                    rx="6"
                                    fill="rgba(0,0,0,0.85)"
                                    stroke="rgba(255,255,255,0.25)"
                                    strokeWidth="1"
                                />

                                {/* label */}
                                <text
                                    x={x}
                                    y={boxY + 28}
                                    fill="rgba(255,255,255,0.85)"
                                    fontSize="16"
                                    fontFamily="JetBrains Mono"
                                    textAnchor="middle"
                                >
                                    Bonamukkala Saivenkata Reddy
                                </text>

                                {/* small tag */}
                                <text
                                    x={boxX + 10}
                                    y={boxY - 6}
                                    fill="rgba(255,255,255,0.35)"
                                    fontSize="11"
                                    fontFamily="JetBrains Mono"
                                >
                                    node_fullname
                                </text>
                            </motion.g>
                        )
                    })()}
                </motion.svg>
            </div>

            {/* Bottom right legend */}
            <div className="fixed bottom-8 right-8 font-mono text-xs text-white/20 text-right z-10 pointer-events-none select-none">
                <div>adj. matrix: 5×5</div>
                <div>type: undirected weighted</div>
                <div>traversal: BFS ready</div>
                <div className="mt-1 opacity-40">world: {WORLD_W}×{WORLD_H}</div>
            </div>
        </PageWrapper>
    )
}