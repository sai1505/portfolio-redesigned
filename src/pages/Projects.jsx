import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../UI/PageWrapper'

const PROJECTS = [
    {
        id: 'p005',
        index: 4,
        title: 'NeuralCanvas',
        subtitle: 'AI-powered design tool',
        year: '2024',
        stack: ['Next.js', 'OpenAI API', 'Fabric.js', 'PostgreSQL'],
        desc: 'Collaborative canvas where AI generates, edits, and suggests design elements in real time. Used by 500+ designers in beta.',
        status: 'PRODUCTION',
        links: { github: '#', live: '#' },
        complexity: 'O(n log n)',
    },
    {
        id: 'p004',
        index: 3,
        title: 'DevFlow',
        subtitle: 'Developer task orchestration',
        year: '2023',
        stack: ['React', 'Node.js', 'Redis', 'WebSockets'],
        desc: 'Real-time task management system for distributed engineering teams. Features live collaboration, dependency tracking, and automated sprint generation.',
        status: 'PRODUCTION',
        links: { github: '#', live: '#' },
        complexity: 'O(n)',
    },
    {
        id: 'p003',
        index: 2,
        title: 'LogLens',
        subtitle: 'Structured log analysis dashboard',
        year: '2023',
        stack: ['React', 'D3.js', 'Python', 'ClickHouse'],
        desc: 'Visual log analysis tool that parses, clusters, and surfaces anomalies from high-volume application logs. Processes 1M+ events/sec.',
        status: 'ARCHIVED',
        links: { github: '#', live: null },
        complexity: 'O(n²)',
    },
    {
        id: 'p002',
        index: 1,
        title: 'SyncDB',
        subtitle: 'Database sync engine',
        year: '2022',
        stack: ['TypeScript', 'PostgreSQL', 'MongoDB', 'Docker'],
        desc: 'Bidirectional database sync engine with conflict resolution for hybrid Postgres/Mongo setups. Battle-tested in 3 production environments.',
        status: 'OPEN SOURCE',
        links: { github: '#', live: null },
        complexity: 'O(n)',
    },
    {
        id: 'p001',
        index: 0,
        title: 'PortalAuth',
        subtitle: 'Auth-as-a-service module',
        year: '2021',
        stack: ['Node.js', 'JWT', 'Redis', 'Express'],
        desc: 'Plug-and-play authentication service with OAuth, 2FA, and session management. First open-source project — 200+ GitHub stars.',
        status: 'DEPRECATED',
        links: { github: '#', live: null },
        complexity: 'O(1)',
    },
]

const STATUS_STYLES = {
    PRODUCTION: 'text-white border-white/40',
    ARCHIVED: 'text-white/40 border-white/20',
    'OPEN SOURCE': 'text-white/70 border-white/30',
    DEPRECATED: 'text-white/20 border-white/10',
}

export default function Projects() {
    const [expandedId, setExpandedId] = useState(null)
    const [popping, setPopping] = useState(false)

    const handleToggle = (id) => {
        if (expandedId === id) {
            setPopping(true)
            setTimeout(() => {
                setExpandedId(null)
                setPopping(false)
            }, 200)
        } else {
            setExpandedId(id)
        }
    }

    return (
        <PageWrapper>
            <div className="max-w-3xl mx-auto px-6 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <div className="font-mono text-xs text-white/30 mb-3 tracking-widest">STRUCTURE: STACK (LIFO)</div>
                    <h1 className="font-mono text-3xl font-black text-white tracking-tight mb-2">Projects</h1>
                    <p className="font-mono text-xs text-white/30">{'// Most recent at TOP — click to inspect stack frame'}</p>
                    <div className="mt-3 font-mono text-xs text-white/20">
                        Stack&lt;Project&gt; work = new Stack(); {'// size: ' + PROJECTS.length}
                    </div>
                </motion.div>

                {/* Stack pointer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-2 px-1"
                >
                    <span className="font-mono text-xs text-white/50">SP →</span>
                    <span className="font-mono text-xs text-white/25">stack.peek() = "{PROJECTS[0].title}"</span>
                </motion.div>

                {/* Stack - TOP first */}
                <div className="relative">
                    {/* Stack outer border */}
                    <div className="border-l border-r border-white/15">
                        {PROJECTS.map((project, i) => {
                            const isExpanded = expandedId === project.id
                            const isTop = i === 0
                            const depth = PROJECTS.length - 1 - i

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative"
                                >
                                    {/* Stack frame */}
                                    <div
                                        className={`border-b border-white/15 ${isTop ? 'border-t border-t-white/30' : ''}`}
                                        style={{
                                            backgroundColor: `rgba(255,255,255,${0.01 + depth * 0.005})`,
                                        }}
                                    >
                                        {/* Frame header */}
                                        <button
                                            onClick={() => handleToggle(project.id)}
                                            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
                                            data-hoverable
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* Stack index */}
                                                <div className="w-8 h-8 border border-white/15 flex items-center justify-center shrink-0">
                                                    <span className="font-mono text-xs text-white/30">{project.index}</span>
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        {isTop && (
                                                            <span className="font-mono text-xs text-white/60 border border-white/30 px-1.5 py-0.5">
                                                                TOP
                                                            </span>
                                                        )}
                                                        <span className="font-mono text-sm font-bold text-white">{project.title}</span>
                                                    </div>
                                                    <span className="font-mono text-xs text-white/35">{project.subtitle}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 shrink-0">
                                                <span className={`font-mono text-xs border px-2 py-0.5 ${STATUS_STYLES[project.status] || 'text-white/30 border-white/15'}`}>
                                                    {project.status}
                                                </span>
                                                <span className="font-mono text-xs text-white/25">{project.year}</span>
                                                <motion.span
                                                    animate={{ rotate: isExpanded ? 45 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="font-mono text-white/40 text-lg leading-none"
                                                >
                                                    +
                                                </motion.span>
                                            </div>
                                        </button>

                                        {/* Expanded content */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="border-t border-white/10 px-5 py-5">
                                                        {/* Frame info */}
                                                        <div className="flex items-center gap-4 mb-4 font-mono text-xs text-white/25">
                                                            <span>frame_id: {project.id}</span>
                                                            <span>complexity: {project.complexity}</span>
                                                            <span>depth: {depth}</span>
                                                        </div>

                                                        {/* Description */}
                                                        <p className="font-sans text-sm text-white/65 leading-relaxed mb-5">{project.desc}</p>

                                                        {/* Stack frame: local variables (tech stack) */}
                                                        <div className="mb-5">
                                                            <div className="font-mono text-xs text-white/25 mb-2">// local variables</div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {project.stack.map(tech => (
                                                                    <span key={tech} className="font-mono text-xs px-2 py-1 border border-white/15 text-white/50 hover:border-white/35 hover:text-white/80 transition-colors">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Links */}
                                                        <div className="flex items-center gap-4">
                                                            <a href={project.links.github} className="font-mono text-xs text-white/40 hover:text-white transition-colors border-b border-white/15 hover:border-white/60 pb-px">
                                                                → GitHub
                                                            </a>
                                                            {project.links.live && (
                                                                <a href={project.links.live} className="font-mono text-xs text-white/40 hover:text-white transition-colors border-b border-white/15 hover:border-white/60 pb-px">
                                                                    → Live Demo
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Stack base */}
                    <div className="border border-t-0 border-white/15 px-5 py-3 flex items-center justify-center">
                        <span className="font-mono text-xs text-white/15">▓▓▓ STACK BASE ▓▓▓</span>
                    </div>
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 font-mono text-xs text-white/20 border-t border-white/10 pt-6"
                >
                    <div>// push(): O(1) | pop(): O(1) | peek(): O(1)</div>
                    <div>// Stack size: {PROJECTS.length} | Max capacity: ∞</div>
                </motion.div>
            </div>
        </PageWrapper>
    )
}