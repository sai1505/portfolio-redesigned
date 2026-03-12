import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import PageWrapper from '../UI/PageWrapper'

// ── Data ──────────────────────────────────────────────────────────────────────

const BIO = {
    name: 'BONAMUKKALA SAIVENKATA REDDY',
    handle: 'BSVR',
    location: 'Visakhapatnam, India',
    email: 'vsai1505.bona@gmail.com',
    summary: 'Computer Science undergraduate passionate about problem-solving and building real-world solutions. Experienced in Java, Python, Mobile, Web and Backend development, with AI/ML-integrated projects. Currently learning cloud computing and focused on scalable systems, real-world impact, and continuous improvement.',
    links: [
        { label: 'GitHub', value: 'sai1505', href: 'https://github.com/sai1505' },
        { label: 'LinkedIn', value: 'bonamukkala-saivenkata-reddy', href: 'https://linkedin.com/in/bonamukkala-saivenkata-reddy' },
        { label: 'Email', value: 'vsai1505.bona@gmail.com', href: 'mailto:vsai1505.bona@gmail.com' },
    ],
}

const EDUCATION = [
    {
        id: '0xE001',
        year: '2026',
        title: 'B.Tech — Computer Science & Engineering',
        subtitle: 'Maharaj Vijayaram Gajapathi Raj College of Engineering, Vizianagaram',
        desc: 'Pursuing a four-year undergraduate degree in CSE. Building strong foundations in algorithms, data structures, systems programming, and applied AI. Actively involved in technical clubs and open-source communities on campus.',
        tags: ['CGPA: 8.85'],
        type: 'HEAD',
    },
    {
        id: '0xE002',
        year: '2022',
        title: '12TH Standard',
        subtitle: 'Narayana Junior College, Bangalore',
        desc: 'Completed higher secondary education in PCMC (Physics, Chemistry, Mathematics, Computer Science), strengthening analytical thinking and problem-solving skills.',
        tags: ['Percentage: 86'],
        type: 'NODE',
    },
    {
        id: '0xE003',
        year: '2020',
        title: '10TH Standard',
        subtitle: 'Maithry Vidyanikethan, Bangalore',
        desc: 'Completed secondary education with a strong academic performance, building a solid foundation in Mathematics, Science, and analytical problem-solving.',
        tags: ['Percentage: 89'],
        type: 'TAIL',
    },
]

const AWARDS = [
    {
        id: '0xA001',
        year: 'Sep 2025',
        title: 'Winner — Sankaalp Hackathon',
        subtitle: 'MVGR College, Vizianagaram · ₹10,000 Prize',
        desc: 'Selected among 50+ competing teams. Built NextGenT — an AI multi-agent SDLC automation system that streamlines the entire software development lifecycle using intelligent agents. Won ₹10,000 for real-world innovation.',
        tags: ['AI Agents', 'SDLC', 'NextGenT', '1st Place', '₹10,000'],
        type: 'HEAD',
    },
    {
        id: '0xA002',
        year: 'Oct 2025',
        title: 'Finalist — GPAI Case Club Competition',
        subtitle: 'IIT Madras · Global Partnership on AI',
        desc: 'Proposed AI-driven STEM education solutions addressing learning gaps at scale. Presented to a panel at one of India\'s top institutions, competing with teams from across the country.',
        tags: ['AI', 'STEM Education', 'IIT Madras', 'Finalist'],
        type: 'NODE',
    },
    {
        id: '0xA003',
        year: 'Jan 2025',
        title: 'Finalist — NLP Challenge',
        subtitle: 'IIT Kharagpur · Natural Language Processing',
        desc: 'Developed a mental-health support chatbot that helped 80% of test users dealing with depression and loneliness. Demonstrated measurable real-world impact in a high-stakes NLP competition.',
        tags: ['NLP', 'Mental Health', 'Chatbot', 'IIT Kharagpur', 'Finalist'],
        type: 'NODE',
    },
    {
        id: '0xA004',
        year: 'Dec 2024',
        title: 'Winner — Avishkaar Hackathon',
        subtitle: 'AITAM College, Srikakulam · ₹1,00,000 Prize',
        desc: 'Competed against 50+ teams and won ₹1,00,000 for an innovative prototype with measurable real-world impact. The win validated the project\'s technical depth and practical applicability.',
        tags: ['1st Place', '₹1,00,000', 'Prototype', 'AITAM'],
        type: 'TAIL',
    },
]

const VOLUNTEER = [
    {
        id: '0xV001',
        year: '2024 – Present',
        title: 'Volunteer — MVGR SLC (Swecha SLC)',
        subtitle: 'Student Linux Club · MVGR College',
        desc: 'Active volunteer in the Swecha Student Linux Club chapter at MVGR. Participated in Freedom Fest — an open-source awareness event — where I shared knowledge on open-source philosophy, Linux, and community-driven development with fellow students.',
        tags: ['Open Source', 'Linux', 'Freedom Fest', 'Swecha', 'Ongoing'],
        type: 'HEAD',
    },
    {
        id: '0xV002',
        year: '2025 – Present',
        title: 'Stretch Project — Custom Linux Distribution',
        subtitle: 'Ongoing · Swecha SLC Stretch Activity',
        desc: 'Currently building a custom Linux distro as a stretch activity under the Swecha SLC program. The project involves package management, and creating a student-friendly Linux environment tailored for engineering college use.',
        tags: ['Custom Distro', 'Systems', 'Stretch Activity', 'Active'],
        type: 'TAIL',
    },
]

const RESUME_LINK = 'https://docs.google.com/document/d/13ThEehi02BopZGaJLIjmfOB7plL6Zh7Nki4mxSWrJSY/edit?usp=sharing'

const SECTIONS = [
    { key: 'bio', label: 'BIO', struct: 'RECORD', data: null },
    { key: 'education', label: 'EDUCATION', struct: 'LINKED_LIST', data: EDUCATION },
    { key: 'awards', label: 'AWARDS', struct: 'LINKED_LIST', data: AWARDS },
    { key: 'volunteer', label: 'VOLUNTEER', struct: 'LINKED_LIST', data: VOLUNTEER },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function LinkedListNode({ node, index, total }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
        >
            <div className="flex items-stretch">
                {/* Left: memory address rail */}
                <div className="flex flex-col items-center w-14 shrink-0">
                    {/* Address badge */}
                    <div className="flex items-center justify-center h-10 w-full border-r border-white/10">
                        <span className="font-mono text-[14px] text-white/20 rotate-[-90deg] whitespace-nowrap tracking-widest">
                            {node.id}
                        </span>
                    </div>
                    {/* Vertical connector */}
                    {node.type !== 'TAIL' && (
                        <div className="flex-1 w-px bg-white/8 mx-auto mt-1" style={{ minHeight: 24 }} />
                    )}
                </div>

                {/* Right: node card */}
                <div className="flex-1 ml-3 mb-4">
                    <div className="border border-white/12 hover:border-white/25 transition-colors duration-300 bg-black">
                        {/* Card header */}
                        <div className="flex items-center justify-between border-b border-white/8 px-4 py-2">
                            <div className="flex items-center gap-3">
                                <span className={`font-mono text-[13px] px-1.5 py-0.5 border ${node.type === 'HEAD' ? 'border-white/40 text-white/70' :
                                    node.type === 'TAIL' ? 'border-white/20 text-white/35' :
                                        'border-white/15 text-white/30'
                                    }`}>{node.type}</span>
                                <span className="font-mono text-xs text-white/40 tracking-widest">{node.year}</span>
                            </div>
                            <span className="font-mono text-[15px] text-white/20">
                                {node.type === 'TAIL' ? 'next → NULL' : `next → ${AWARDS[index + 1]?.id ?? '...'}`}
                            </span>
                        </div>

                        {/* Card body */}
                        <div className="px-4 py-4">
                            <h3 className="font-mono text-sm font-bold text-white tracking-tight mb-1">{node.title}</h3>
                            <p className="font-mono text-[16px] text-white/40 mb-3 leading-relaxed">{node.subtitle}</p>
                            <p className="font-sans text-sm text-white/58 leading-relaxed mb-4">{node.desc}</p>
                            <div className="flex flex-wrap gap-1.5">
                                {node.tags.map(tag => (
                                    <span key={tag} className="font-mono text-[15px] px-2 py-0.5 border border-white/12 text-white/35 hover:border-white/35 hover:text-white/65 transition-colors cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card footer: pointer fields */}
                        <div className="border-t border-white/8 px-4 py-1.5 flex items-center justify-between">
                            <span className="font-mono text-[14px] text-white/12">
                                data: 0x{(index * 1024).toString(16).toUpperCase().padStart(4, '0')}
                            </span>
                            <span className="font-mono text-[14px] text-white/12">
                                ptr: {node.type === 'TAIL' ? 'NULL' : `0x${((index + 1) * 1024).toString(16).toUpperCase().padStart(4, '0')}`}
                            </span>
                        </div>
                    </div>

                    {/* traverse() label between nodes */}
                    {node.type !== 'TAIL' && (
                        <div className="flex items-center gap-2 px-2 py-1">
                            <span className="font-mono text-[15px] text-white/15">traverse()</span>
                            <div className="flex-1 h-px bg-white/6" />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

function BioSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Record struct header */}
            <div className="font-mono text-[15px] text-white/25 mb-3">struct Developer {'{'}</div>

            <div className="border border-white/15 hover:border-white/25 transition-colors bg-black">
                {/* Name row */}
                <div className="border-b border-white/8 px-5 py-4 flex items-start justify-between gap-4">
                    <div>
                        <div className="font-mono text-2xl font-black text-white tracking-tight leading-none mb-1">
                            {BIO.name}
                        </div>
                        <div className="font-mono text-sm text-white/35 tracking-widest">{BIO.handle}</div>
                    </div>
                    <div className="font-mono text-[15px] text-white/20 text-right shrink-0">
                        <div>RECORD</div>
                        <div>0xDEV01</div>
                    </div>
                </div>

                {/* Fields */}
                <div className="divide-y divide-white/6">
                    {[
                        { key: 'location', value: BIO.location },
                        { key: 'email', value: BIO.email },
                    ].map(f => (
                        <div key={f.key} className="px-5 py-2.5 flex items-center gap-4">
                            <span className="font-mono text-[16px] text-white/30 w-20 shrink-0">{f.key}:</span>
                            <span className="font-mono text-[16px] text-white/60">{f.value}</span>
                        </div>
                    ))}

                    {/* Links */}
                    {BIO.links.map(l => (
                        <div key={l.label} className="px-5 py-2.5 flex items-center gap-4">
                            <span className="font-mono text-[16px] text-white/30 w-20 shrink-0">{l.label.toLowerCase()}:</span>
                            <a href={l.href} target="_blank" rel="noopener noreferrer"
                                className="font-mono text-[16px] text-white/50 hover:text-white transition-colors border-b border-white/15 hover:border-white/50 pb-px">
                                {l.value}
                            </a>
                        </div>
                    ))}

                    {/* Summary */}
                    <div className="px-5 py-4">
                        <div className="font-mono text-[16px] text-white/30 mb-2">summary:</div>
                        <p className="font-sans text-md text-white/60 leading-relaxed">{BIO.summary}</p>
                    </div>
                </div>
            </div>

            <div className="font-mono text-[15px] text-white/25 mt-3">{'}'} // end struct</div>
        </motion.div>
    )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function About() {
    const [activeSection, setActiveSection] = useState('bio')

    const current = SECTIONS.find(s => s.key === activeSection)

    return (
        <PageWrapper>
            <div className="max-w-screen-2xl mx-auto px-8 py-16">

                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mb-10"
                >
                    <div className="font-mono text-[15px] text-white/30 mb-2 tracking-widest">STRUCTURE: LINKED_LIST</div>
                    <h1 className="font-mono text-4xl font-black text-white tracking-tight mb-1">About Me</h1>
                    <p className="font-mono text-[16px] text-white/25">
                        {'// Four separate lists — select a section to traverse'}
                    </p>
                </motion.div>

                {/* Section tabs + Resume button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center gap-3 mb-10"
                >
                    {/* Tabs */}
                    <div className="flex items-center gap-px border border-white/12 w-fit">
                        {SECTIONS.map((s, i) => (
                            <button
                                key={s.key}
                                onClick={() => setActiveSection(s.key)}
                                className={`relative font-mono text-xs px-4 py-2.5 transition-all ${activeSection === s.key
                                    ? 'bg-white text-black'
                                    : 'text-white/35 hover:text-white/70 hover:bg-white/5'
                                    } ${i !== 0 ? 'border-l border-white/12' : ''}`}
                            >
                                <span className="text-[14px] opacity-50 mr-1">[{s.struct.charAt(0)}]</span>
                                {s.label}
                            </button>
                        ))}
                    </div>

                    {/* Resume button */}
                    <a
                        href={RESUME_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs px-4 py-2.5 border border-white/12 text-white/35 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all flex items-center gap-2"
                    >
                        <span className="text-[14px] opacity-50">[R]</span>
                        RESUME
                        <span className="text-white/20">↗</span>
                    </a>
                </motion.div>

                {/* Section struct label */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Sub-header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="font-mono text-[15px] text-white/25">
                                STRUCTURE: <span className="text-white/45">{current.struct}</span>
                            </div>
                            {current.data && (
                                <div className="font-mono text-[15px] text-white/20">
                                    nodes: {current.data.length} | traversal: O(n)
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        {activeSection === 'bio' && <BioSection />}

                        {current.data && (
                            <div>
                                {/* List init line */}
                                <div className="font-mono text-[15px] text-white/20 mb-4">
                                    LinkedList&lt;{current.label}&gt; list = traverse();
                                </div>
                                {current.data.map((node, i) => (
                                    <LinkedListNode key={node.id} node={node} index={i} total={current.data.length} />
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </PageWrapper>
    )
}