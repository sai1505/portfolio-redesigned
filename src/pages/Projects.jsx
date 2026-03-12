import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../UI/PageWrapper'
const PROJECTS = [
    {
        id: 'p011',
        title: 'XCropAI',
        subtitle: 'AI Crop Disease Detection Platform',
        year: '2025',
        stack: ['React', 'Supabase', 'PostgreSQL', 'GROQ Models', 'FastAPI'],
        desc: 'AI-driven crop disease detection and advisory platform using multimodal LLMs. Built scalable FastAPI services that cut manual analysis time by 60%.',
        type: 'WEBSITE',
        links: {
            github: 'https://github.com/sai1505/XCropAI'
        },
        complexity: 'O(n)',
    },

    {
        id: 'p010',
        title: 'Tax Suthradhar',
        subtitle: 'AI Tax Alert & Compliance System',
        year: '2025',
        stack: ['React.js', 'Node.js', 'Express.js', 'LangChain', 'GROQ Models', 'Cloudflare-R2', 'Docling', 'FastAPI'],
        desc: 'Tracks 100+ tax policies and automates compliance 70% faster with 100% legal accuracy using AI agents.',
        type: 'WEBSITE',
        links: {
            github: 'https://github.com/sai1505/TaxSuthradhar'
        },
        complexity: 'O(n)',
    },

    {
        id: 'p009',
        title: 'Therapy Chatbot',
        subtitle: 'AI Mental Health Support Assistant',
        year: '2025',
        stack: ['HTML', 'CSS', 'JS', 'Cohere API', 'Python', 'Flask'],
        desc: 'A compassionate AI companion offering a safe space and a listening ear for when users feel depressed or lonely.',
        type: 'WEBSITE',
        links: {
            github: 'https://github.com/sai1505/DBMS_PROJECT'
        },
        complexity: 'O(n)',
    },

    {
        id: 'p008',
        title: 'Sky Stream',
        subtitle: 'Android Video Streaming App',
        year: '2025',
        stack: ['Java', 'Android Studio', 'Google Drive API'],
        desc: 'Android app to stream videos directly from Google Drive links with secure access and optimized playback.',
        type: 'ANDROID_APP',
        links: {
            github: 'https://github.com/sai1505/SkyStreamwebsite'
        },
        complexity: 'O(1)',
    },

    {
        id: 'p007',
        title: 'Digitalized Finance',
        subtitle: 'Banking Web Application',
        year: '2024',
        stack: ['HTML', 'CSS', 'JS', 'PHP', 'MySQL'],
        desc: 'A responsive banking website supporting debit/credit transactions, loan systems, and a secure login system.',
        type: 'WEBSITE',
        links: {
            github: 'https://github.com/sai1505/DBMS_PROJECT'
        },
        complexity: 'O(n)',
    },

    {
        id: 'p006',
        title: 'PDF Language Converter',
        subtitle: 'OCR Document Translation Tool',
        year: '2024',
        stack: ['HTML', 'CSS', 'JS', 'Flask', 'Python'],
        desc: 'A real-time PDF language converter translating English PDFs to Telugu using OCR technology.',
        type: 'WEBSITE',
        links: {
            github: 'https://github.com/sai1505/AITTPBL'
        },
        complexity: 'O(n)',
    },

    {
        id: 'p005',
        title: 'ATM System',
        subtitle: 'Java Banking Simulation',
        year: '2024',
        stack: ['Java Swing', 'Java JDBC', 'MySQL'],
        desc: 'A Java-based ATM system implementing banking operations using UML-based design.',
        type: 'WEBSITE',
        links: {
            github: 'https://github.com/sai1505/pblOOP'
        },
        complexity: 'O(n)',
    },

    {
        id: 'p004',
        title: 'To Do List App',
        subtitle: 'Android Task Manager',
        year: '2024',
        stack: ['Android Studio', 'XML', 'Java'],
        desc: 'A productivity app allowing users to create, manage, and delete daily tasks efficiently.',
        type: 'ANDROID_APP',
        links: {
            github: 'https://github.com/sai1505/CodSoftAssignment01'
        },
        complexity: 'O(1)',
    },

    {
        id: 'p003',
        title: 'Random Quotes App',
        subtitle: 'Daily Motivation Android App',
        year: '2024',
        stack: ['Android Studio', 'XML', 'Java'],
        desc: 'Displays inspirational quotes to motivate users and refresh their mindset daily.',
        type: 'ANDROID_APP',
        links: {
            github: 'https://github.com/sai1505/CodSoftAssignment02'
        },
        complexity: 'O(1)',
    },

    {
        id: 'p002',
        title: 'Alarms App',
        subtitle: 'Android Alarm Manager',
        year: '2024',
        stack: ['Android Studio', 'XML', 'Java'],
        desc: 'A simple Android application to set and manage alarms efficiently.',
        type: 'ANDROID_APP',
        links: {
            github: 'https://github.com/sai1505/CodSoftAssignment03'
        },
        complexity: 'O(1)',
    },
]

const type_COLORS = {
    PRODUCTION: { border: 'rgba(255,255,255,0.55)', color: '#fff' },
    COMPLETE: { border: 'rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.7)' },
    ARCHIVED: { border: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.4)' },
    DEPRECATED: { border: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.2)' },
}

// How many items deep is this from the top (index 0 = top of stack)
const STACK_SIZE = PROJECTS.length

export default function Projects() {
    const [expandedId, setExpandedId] = useState(null)
    const [pushing, setPushing] = useState(false)  // animate push
    const [popping, setPopping] = useState(null)   // id being popped

    const toggle = (id) => {
        if (expandedId === id) {
            // POP animation: slide up then close
            setPopping(id)
            setTimeout(() => {
                setExpandedId(null)
                setPopping(null)
            }, 320)
        } else {
            // PUSH animation: briefly show push indicator
            setPushing(true)
            setTimeout(() => setPushing(false), 400)
            setExpandedId(id)
        }
    }

    return (
        <PageWrapper>
            <div className="max-w-4xl mx-auto px-8 py-16">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="font-mono text-xs text-white/30 mb-3 tracking-widest">STRUCTURE: STACK (LIFO)</div>
                    <h1 className="font-mono text-4xl font-black text-white tracking-tight mb-3">Projects</h1>
                    <p className="font-mono text-xs text-white/30">// Most recent on TOP — click frame to PUSH/POP inspect</p>
                    <div className="mt-4 font-mono text-xs text-white/18">
                        Stack&lt;Project&gt; work = new Stack(); <span className="text-white/25">// size: {STACK_SIZE}</span>
                    </div>
                </motion.div>

                {/* ── Stack pointer + operation indicator ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center justify-between mb-3 px-1"
                >
                    <div className="flex items-center gap-4 font-mono text-xs">
                        <span className="text-white/55">SP →</span>
                        <span className="text-white/30">stack.peek() = <span className="text-white/55">"{PROJECTS[0].title}"</span></span>
                    </div>

                    {/* Operation flash */}
                    <AnimatePresence>
                        {pushing && (
                            <motion.span
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="font-mono text-xs text-white/60 border border-white/20 px-2 py-0.5"
                            >
                                PUSH ↓
                            </motion.span>
                        )}
                        {popping && (
                            <motion.span
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="font-mono text-xs text-white/60 border border-white/20 px-2 py-0.5"
                            >
                                POP ↑
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* ── Stack visual ── */}
                <div className="relative">

                    {/* Left rail — memory address lane */}
                    <div
                        className="absolute left-0 top-0 bottom-0 flex flex-col justify-around items-center py-4"
                        style={{ width: 52, borderRight: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        {PROJECTS.map((p, i) => (
                            <div key={p.id} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span
                                    className="font-mono text-white/18"
                                    style={{ fontSize: 9, writingMode: 'vertical-rl', letterSpacing: 1 }}
                                >
                                    0x{((STACK_SIZE - i) * 0x400).toString(16).toUpperCase().padStart(4, '0')}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Stack frames */}
                    <div style={{ marginLeft: 52 }}>

                        {/* TOP label */}
                        <div className="flex items-center gap-3 mb-0 px-5 py-2 border border-b-0 border-white/20 bg-white/3">
                            <span className="font-mono text-xs text-white/50 tracking-widest">▲ TOP OF STACK</span>
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="font-mono text-xs text-white/25">LIFO</span>
                        </div>

                        {/* Frames */}
                        {PROJECTS.map((project, i) => {
                            const isExpanded = expandedId === project.id
                            const isTop = i === 0
                            const depth = STACK_SIZE - 1 - i  // 0 = bottom
                            const isPopping = popping === project.id
                            const sc = type_COLORS[project.type] || type_COLORS.ARCHIVED

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: -24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {/* frame wrapper — subtle depth tint */}
                                    <div
                                        style={{
                                            borderLeft: '1px solid rgba(255,255,255,0.15)',
                                            borderRight: '1px solid rgba(255,255,255,0.15)',
                                            borderBottom: '1px solid rgba(255,255,255,0.15)',
                                            borderTop: isTop ? '1px solid rgba(255,255,255,0.3)' : 'none',
                                            background: `rgba(255,255,255,${0.012 + depth * 0.008})`,
                                            position: 'relative',
                                        }}
                                    >
                                        {/* depth ruler on right edge */}
                                        <div
                                            className="absolute right-0 top-0 bottom-0 flex items-center justify-center"
                                            style={{ width: 22, borderLeft: '1px solid rgba(255,255,255,0.06)' }}
                                        >
                                            <span
                                                className="font-mono text-white/15"
                                                style={{ fontSize: 8, writingMode: 'vertical-rl' }}
                                            >
                                                depth:{depth}
                                            </span>
                                        </div>

                                        {/* clickable header */}
                                        <button
                                            onClick={() => toggle(project.id)}
                                            className="w-full text-left transition-colors hover:bg-white/4"
                                            style={{ paddingRight: 30 }}
                                        >
                                            <div className="flex items-center gap-5 px-6 py-5">

                                                {/* index badge */}
                                                <div
                                                    className="shrink-0 flex items-center justify-center"
                                                    style={{
                                                        width: 44, height: 44,
                                                        border: `1px solid ${isTop ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}`,
                                                    }}
                                                >
                                                    <span className="font-mono text-sm font-bold text-white/50">{STACK_SIZE - 1 - i}</span>
                                                </div>

                                                {/* title block */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                        {isTop && (
                                                            <span
                                                                className="font-mono text-xs px-2 py-0.5 shrink-0"
                                                                style={{ border: '1px solid rgba(255,255,255,0.45)', color: 'rgba(255,255,255,0.8)' }}
                                                            >
                                                                TOP
                                                            </span>
                                                        )}
                                                        <span className="font-mono text-lg font-black text-white tracking-tight">{project.title}</span>
                                                    </div>
                                                    <span className="font-mono text-xs text-white/38">{project.subtitle}</span>
                                                </div>

                                                {/* meta */}
                                                <div className="flex items-center gap-4 shrink-0">
                                                    <span
                                                        className="font-mono text-xs px-2.5 py-1"
                                                        style={{ border: `1px solid ${sc.border}`, color: sc.color }}
                                                    >
                                                        {project.type}
                                                    </span>
                                                    <span className="font-mono text-xs text-white/28">{project.year}</span>

                                                    {/* +/× toggle with push/pop visual */}
                                                    <motion.div
                                                        animate={{
                                                            rotate: isExpanded ? 45 : 0,
                                                            y: isPopping ? -6 : 0,
                                                        }}
                                                        transition={{ duration: 0.22 }}
                                                        className="font-mono text-2xl text-white/35 leading-none w-6 text-center"
                                                    >
                                                        +
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </button>

                                        {/* expanded frame body */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                                                    className="overflow-hidden"
                                                    style={{ paddingRight: 30 }}
                                                >
                                                    <div
                                                        className="px-6 py-6"
                                                        style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
                                                    >
                                                        {/* frame metadata row */}
                                                        <div className="flex flex-wrap gap-5 mb-5 font-mono text-xs text-white/28">
                                                            <span>frame_id: <span className="text-white/45">{project.id}</span></span>
                                                            <span>complexity: <span className="text-white/45">{project.complexity}</span></span>
                                                            <span>depth: <span className="text-white/45">{depth}</span></span>
                                                            <span>pushed: <span className="text-white/45">{project.year}</span></span>
                                                        </div>

                                                        {/* description */}
                                                        <p className="font-sans text-base text-white/65 leading-relaxed mb-6">
                                                            {project.desc}
                                                        </p>

                                                        {/* local variables = tech stack */}
                                                        <div className="mb-6">
                                                            <div className="font-mono text-xs text-white/28 mb-3">
                                                                {'// local variables (stack frame)'}
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {project.stack.map(tech => (
                                                                    <motion.span
                                                                        key={tech}
                                                                        initial={{ opacity: 0, scale: 0.85 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        transition={{ duration: 0.2 }}
                                                                        className="font-mono text-xs px-3 py-1.5 border border-white/15 text-white/52 hover:border-white/40 hover:text-white/85 transition-colors cursor-default"
                                                                    >
                                                                        {tech}
                                                                    </motion.span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* links */}
                                                        <div className="flex items-center gap-5">
                                                            <a
                                                                href={project.links.github}
                                                                target="_blank" rel="noopener noreferrer"
                                                                className="font-mono text-sm text-white/45 hover:text-white transition-colors"
                                                                style={{ borderBottom: '1px solid rgba(255,255,255,0.18)', paddingBottom: 1 }}
                                                            >
                                                                → GitHub
                                                            </a>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )
                        })}

                        {/* Stack base */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-center gap-4 py-3"
                            style={{
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderTop: 'none',
                                background: 'rgba(255,255,255,0.015)',
                            }}
                        >
                            <span className="font-mono text-xs text-white/18 tracking-widest">▓▓▓</span>
                            <span className="font-mono text-xs text-white/22 tracking-widest">STACK BASE — addr:0x0000</span>
                            <span className="font-mono text-xs text-white/18 tracking-widest">▓▓▓</span>
                        </motion.div>

                        {/* BOTTOM label */}
                        <div className="flex items-center gap-3 mt-0 px-5 py-2">
                            <span className="font-mono text-xs text-white/22 tracking-widest">▼ BOTTOM</span>
                            <div className="flex-1 h-px bg-white/8" />
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}