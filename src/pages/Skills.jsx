import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../UI/PageWrapper'

const BRANCHES = [
    {
        id: 'languages',
        label: 'Languages',
        children: [
            { id: 'java', label: 'Java', level: 80 },
            { id: 'python', label: 'Python', level: 80 },
            { id: 'c', label: 'C', level: 75 },
            { id: 'cpp', label: 'C++', level: 75 },
            { id: 'dart', label: 'Dart', level: 75 },
        ],
    },
    {
        id: 'web_mobile',
        label: 'Web & Mobile',
        children: [
            { id: 'react', label: 'React', level: 70 },
            { id: 'nodejs', label: 'Node.js', level: 50 },
            { id: 'flutter', label: 'Flutter', level: 75 },
            { id: 'android', label: 'Android (Java)', level: 80 },
            { id: 'html_css', label: 'HTML/CSS', level: 80 },
            { id: 'javascript', label: 'JavaScript', level: 80 },
        ],
    },
    {
        id: 'backend_ai',
        label: 'Backend & AI',
        children: [
            { id: 'fastapi', label: 'FastAPI', level: 85 },
            { id: 'langchain', label: 'LangChain', level: 50 },
            { id: 'groq', label: 'Groq LLMs', level: 95 },
        ],
    },
    {
        id: 'database_cloud',
        label: 'Databases & Cloud',
        children: [
            { id: 'mysql', label: 'MySQL', level: 85 },
            { id: 'postgresql', label: 'PostgreSQL', level: 80 },
            { id: 'cloudsql', label: 'Cloud SQL', level: 75 },
        ],
    },
    {
        id: 'tools',
        label: 'Tools',
        children: [
            { id: 'git', label: 'Git', level: 95 },
            { id: 'github', label: 'GitHub', level: 95 },
            { id: 'docker', label: 'Docker', level: 80 },
            { id: 'postman', label: 'Postman', level: 80 },
            { id: 'androidstudio', label: 'Android Studio', level: 80 },
        ],
    }
]

/* ── LeafCard ───────────────────────────────────────────────────────────── */
function LeafCard({ leaf, index, parentHov }) {
    const [hov, setHov] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, delay: index * 0.04 }}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                border: `1px solid ${hov ? '#fff' : parentHov ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.16)'}`,
                background: hov ? '#fff' : '#000',
                transition: 'border-color .15s, background .15s',
                padding: '12px 16px 10px',
                position: 'relative',
                cursor: 'default',
            }}
        >
            <span style={{
                position: 'absolute', top: 4, right: 8,
                fontFamily: 'Inter', fontSize: 8,
                color: hov ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.1)',
            }}>[LEAF]</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                <span className="mt-2" style={{
                    fontFamily: 'Inter', fontSize: 13,
                    color: hov ? '#000' : '#fff', transition: 'color .15s',
                }}>{leaf.label}</span>
                <span style={{
                    fontFamily: 'Inter', fontSize: 11, marginLeft: 10,
                    color: hov ? 'rgba(0,0,0,0.42)' : 'rgba(255,255,255,0.35)', transition: 'color .15s',
                }}>{leaf.level}%</span>
            </div>
            <div style={{ height: 3, background: hov ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.07)' }}>
                <motion.div
                    style={{ height: '100%', background: hov ? 'rgba(0,0,0,0.48)' : 'rgba(255,255,255,0.65)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${leaf.level}%` }}
                    transition={{ duration: 0.7, delay: 0.05 + index * 0.055, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
        </motion.div>
    )
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function Skills() {
    const wrapRef = useRef(null)
    const rootRef = useRef(null)
    const branchRefs = useRef({})
    const leafRefs = useRef({})

    const [rootExpanded, setRootExpanded] = useState(true)
    const [expanded, setExpanded] = useState(() =>
        Object.fromEntries(BRANCHES.map(b => [b.id, true]))
    )
    const [branchHov, setBranchHov] = useState(null)
    const [rootHov, setRootHov] = useState(false)
    const [svgLines, setSvgLines] = useState({ rootToBranch: [], branchToLeaf: [] })
    const [tick, setTick] = useState(0)

    /* measure DOM → SVG lines */
    useLayoutEffect(() => {
        const wrap = wrapRef.current
        const root = rootRef.current
        if (!wrap || !root) return

        const wRect = wrap.getBoundingClientRect()
        const rel = (el) => {
            const r = el.getBoundingClientRect()
            return {
                cx: r.left - wRect.left + r.width / 2,
                cy: r.top - wRect.top + r.height / 2,
                bottom: r.bottom - wRect.top,
                topY: r.top - wRect.top,
            }
        }

        const rr = rel(root)

        const rootToBranch = rootExpanded
            ? BRANCHES.map(b => {
                const el = branchRefs.current[b.id]
                if (!el) return null
                const br = rel(el)
                return { id: b.id, x1: rr.cx, y1: rr.bottom, x2: br.cx, y2: br.topY }
            }).filter(Boolean)
            : []

        const branchToLeaf = []
        if (rootExpanded) {
            BRANCHES.forEach(b => {
                if (!expanded[b.id]) return
                const bEl = branchRefs.current[b.id]
                if (!bEl) return
                const br = rel(bEl)
                b.children.forEach(lf => {
                    const lEl = leafRefs.current[lf.id]
                    if (!lEl) return
                    const lr = rel(lEl)
                    branchToLeaf.push({
                        id: lf.id, branchId: b.id,
                        x1: br.cx, y1: br.bottom,
                        x2: lr.cx, y2: lr.topY,
                    })
                })
            })
        }

        setSvgLines({ rootToBranch, branchToLeaf })
    }, [expanded, rootExpanded, tick])

    useEffect(() => {
        const h = () => setTick(t => t + 1)
        window.addEventListener('resize', h)
        return () => window.removeEventListener('resize', h)
    }, [])

    useEffect(() => {
        const t = setTimeout(() => setTick(t => t + 1), 150)
        return () => clearTimeout(t)
    }, [])

    const allBranchesOpen = BRANCHES.every(b => expanded[b.id])
    const wrapH = wrapRef.current ? wrapRef.current.offsetHeight + 40 : 2000

    const bezier = (x1, y1, x2, y2) => {
        const mid = y1 + (y2 - y1) * 0.5
        return `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`
    }

    return (
        <PageWrapper>
            <div className="px-8 py-14 min-h-screen">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="max-w-screen-2xl mx-auto mb-12 flex items-end justify-between"
                >
                    <div>
                        <div className="font-mono text-xs text-white/30 mb-1 tracking-widest">STRUCTURE: TREE</div>
                        <h1 className="font-mono text-4xl font-black text-white tracking-tight">Skills</h1>
                        <p className="font-mono text-xs text-white/25 mt-2">
              // Click any node to collapse · hover to highlight paths
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                const next = !allBranchesOpen
                                setExpanded(Object.fromEntries(BRANCHES.map(b => [b.id, next])))
                                setTimeout(() => setTick(t => t + 1), 60)
                            }}
                            className="font-mono text-xs border border-white/20 px-4 py-2 text-white/40 hover:text-white hover:border-white/50 transition-all"
                        >
                            {allBranchesOpen ? 'COLLAPSE LEAVES' : 'EXPAND LEAVES'}
                        </button>
                        <button
                            onClick={() => {
                                setRootExpanded(e => !e)
                                setTimeout(() => setTick(t => t + 1), 60)
                            }}
                            className="font-mono text-xs border border-white/20 px-4 py-2 text-white/40 hover:text-white hover:border-white/50 transition-all"
                        >
                            {rootExpanded ? 'COLLAPSE TREE' : 'EXPAND TREE'}
                        </button>
                    </div>
                </motion.div>

                {/* Tree wrapper */}
                <div
                    ref={wrapRef}
                    style={{ position: 'relative', maxWidth: 1400, margin: '0 auto' }}
                >
                    {/* SVG overlay */}
                    <svg style={{
                        position: 'absolute', top: 0, left: 0,
                        width: '100%', height: wrapH,
                        pointerEvents: 'none', overflow: 'visible', zIndex: 2,
                    }}>
                        {/* root → branch */}
                        {svgLines.rootToBranch.map((l, i) => (
                            <motion.path
                                key={`rb-${l.id}`}
                                d={bezier(l.x1, l.y1, l.x2, l.y2)}
                                fill="none"
                                stroke={branchHov === l.id || rootHov
                                    ? 'rgba(255,255,255,0.75)'
                                    : 'rgba(255,255,255,0.3)'}
                                strokeWidth={branchHov === l.id || rootHov ? 2.5 : 1.5}
                                strokeDasharray="8 5"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: 'easeOut' }}
                                style={{ transition: 'stroke .2s, stroke-width .2s' }}
                            />
                        ))}

                        {/* branch → leaf */}
                        {svgLines.branchToLeaf.map((l, i) => (
                            <motion.path
                                key={`bl-${l.id}`}
                                d={bezier(l.x1, l.y1, l.x2, l.y2)}
                                fill="none"
                                stroke={branchHov === l.branchId
                                    ? 'rgba(255,255,255,0.55)'
                                    : 'rgba(255,255,255,0.13)'}
                                strokeWidth={branchHov === l.branchId ? 1.8 : 1}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.4, delay: i * 0.025, ease: 'easeOut' }}
                                style={{ transition: 'stroke .2s, stroke-width .2s' }}
                            />
                        ))}
                    </svg>

                    {/* ROOT node */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 3, marginBottom: 80 }}
                    >
                        <motion.div
                            ref={rootRef}
                            onClick={() => {
                                setRootExpanded(e => !e)
                                setTimeout(() => setTick(t => t + 1), 60)
                            }}
                            onMouseEnter={() => setRootHov(true)}
                            onMouseLeave={() => setRootHov(false)}
                            animate={{ scale: rootHov ? 1.03 : 1 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                            style={{
                                background: '#fff',
                                border: '2px solid #fff',
                                padding: '18px 56px',
                                textAlign: 'center',
                                boxShadow: rootHov ? '0 0 60px rgba(255,255,255,0.22)' : '0 0 40px rgba(255,255,255,0.12)',
                                cursor: 'pointer', userSelect: 'none',
                                transition: 'box-shadow .2s',
                            }}
                        >
                            <div style={{
                                fontFamily: 'Inter', fontSize: 18,
                                fontWeight: 900, color: '#000', letterSpacing: 3,
                            }}>
                                TECHNICAL SKILLS
                            </div>
                            <div style={{
                                fontFamily: 'Inter', fontSize: 10,
                                color: 'rgba(0,0,0,0.4)', marginTop: 5,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            }}>
                                <motion.span
                                    animate={{ rotate: rootExpanded ? 90 : 0 }}
                                    transition={{ duration: 0.22 }}
                                    style={{ display: 'inline-block' }}
                                >▶</motion.span>
                                <span>ROOT · height:2 · branches:{BRANCHES.length} · leaves:{BRANCHES.reduce((s, b) => s + b.children.length, 0)}</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Branch + Leaf columns */}
                    <AnimatePresence>
                        {rootExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                style={{ overflow: 'visible' }}
                                onAnimationComplete={() => setTick(t => t + 1)}
                            >
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: `repeat(${BRANCHES.length}, 1fr)`,
                                    gap: 28,
                                    position: 'relative',
                                    zIndex: 3,
                                }}>
                                    {BRANCHES.map((branch, bi) => {
                                        const isExp = expanded[branch.id]
                                        const isHov = branchHov === branch.id
                                        const avg = Math.round(branch.children.reduce((s, c) => s + c.level, 0) / branch.children.length)

                                        return (
                                            <motion.div
                                                key={branch.id}
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 + bi * 0.07 }}
                                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                            >
                                                {/* Branch node */}
                                                <motion.div
                                                    ref={el => branchRefs.current[branch.id] = el}
                                                    onClick={() => {
                                                        setExpanded(e => ({ ...e, [branch.id]: !e[branch.id] }))
                                                        setTimeout(() => setTick(t => t + 1), 50)
                                                    }}
                                                    onMouseEnter={() => setBranchHov(branch.id)}
                                                    onMouseLeave={() => setBranchHov(null)}
                                                    animate={{ scale: isHov ? 1.04 : 1 }}
                                                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                                                    style={{
                                                        width: '100%',
                                                        padding: '16px 18px 14px',
                                                        border: `${isHov ? 2 : 1.2}px solid ${isHov ? '#fff' : 'rgba(255,255,255,0.42)'}`,
                                                        background: isHov ? '#fff' : '#0a0a0a',
                                                        cursor: 'pointer', userSelect: 'none',
                                                        boxShadow: isHov ? '0 0 32px rgba(255,255,255,0.1)' : 'none',
                                                        transition: 'background .15s, box-shadow .15s, border-color .15s',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    <span style={{
                                                        position: 'absolute', top: 5, right: 9,
                                                        fontFamily: 'Inter', fontSize: 8,
                                                        color: isHov ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.14)',
                                                    }}>[BRANCH]</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                                                        <motion.span
                                                            animate={{ rotate: isExp ? 90 : 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            style={{
                                                                fontFamily: 'Inter', fontSize: 10,
                                                                color: isHov ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.32)',
                                                                display: 'inline-block',
                                                            }}
                                                        >▶</motion.span>
                                                        <span style={{
                                                            fontFamily: 'Inter', fontSize: 14, fontWeight: 700,
                                                            color: isHov ? '#000' : '#fff', transition: 'color .15s',
                                                        }}>{branch.label}</span>
                                                    </div>
                                                    <div style={{
                                                        fontFamily: 'Inter', fontSize: 10, paddingLeft: 18,
                                                        color: isHov ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.28)', transition: 'color .15s',
                                                    }}>{branch.children.length} leaves · avg {avg}%</div>
                                                </motion.div>

                                                {/* Leaves */}
                                                <AnimatePresence>
                                                    {isExp && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                            style={{ overflow: 'visible', width: '100%' }}
                                                            onAnimationComplete={() => setTick(t => t + 1)}
                                                        >
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 56, width: '100%' }}>
                                                                {branch.children.map((leaf, li) => (
                                                                    <div key={leaf.id} ref={el => leafRefs.current[leaf.id] = el}>
                                                                        <LeafCard leaf={leaf} index={li} parentHov={isHov} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </PageWrapper>
    )
}