import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageWrapper from '../UI/PageWrapper'

const TIMELINE = [
    {
        id: '0x001',
        year: '2018',
        title: 'Education Init',
        subtitle: 'B.Sc. Computer Science',
        desc: 'Enrolled in Computer Science. First exposure to algorithms, data structures, and the beautiful madness of recursion. Wrote my first "Hello World" and never looked back.',
        tags: ['C', 'Python', 'Algorithms', 'Mathematics'],
        type: 'HEAD',
    },
    {
        id: '0x002',
        year: '2019',
        title: 'First Compilation',
        subtitle: 'Discovered Web Development',
        desc: 'Built my first website — a personal page in raw HTML/CSS. Realized I loved making things people could see and touch. Started learning JavaScript obsessively.',
        tags: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
        type: 'NODE',
    },
    {
        id: '0x003',
        year: '2021',
        title: 'Framework Adoption',
        subtitle: 'React & Modern Stack',
        desc: 'Deep-dived into React ecosystem. Component thinking changed how I approach problems. Built my first full-stack project — a real-time task manager.',
        tags: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
        type: 'NODE',
    },
    {
        id: '0x004',
        year: '2022',
        title: 'Production Push',
        subtitle: 'First Real-World Deployment',
        desc: 'Shipped features used by thousands of users. Learned the gap between local dev and production reality. Performance, accessibility, and edge cases became my obsession.',
        tags: ['TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
        type: 'NODE',
    },
    {
        id: '0x005',
        year: '2024',
        title: 'Current State',
        subtitle: 'Full Stack + AI Integration',
        desc: 'Building modern web applications with AI capabilities. Focused on developer experience, system design, and creating tools that other developers love to use.',
        tags: ['Next.js', 'LLM APIs', 'System Design', 'DevEx'],
        type: 'NODE',
    },
    {
        id: '0x006',
        year: 'NEXT',
        title: 'Null Pointer →',
        subtitle: 'Future Goals',
        desc: 'Contributing to open source. Building something that scales. Writing about systems and architecture. The list keeps growing — that\'s the point.',
        tags: ['Open Source', 'Scalability', 'Leadership', '?'],
        type: 'TAIL',
    },
]

function LinkedListNode({ node, index }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
        >
            {/* Node block */}
            <div className="flex items-stretch gap-0">
                {/* Memory address sidebar */}
                <div className="flex flex-col items-center justify-center w-16 shrink-0 border-r border-white/10 pr-4">
                    <span className="font-mono text-xs text-white/20 rotate-[-90deg] whitespace-nowrap tracking-widest">
                        {node.id}
                    </span>
                </div>

                {/* Main node content */}
                <div className="flex-1 border border-white/15 hover:border-white/30 transition-colors duration-300 mx-4 my-2 bg-black group">
                    {/* Node header */}
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-2">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-white/30">{node.type}</span>
                            <span className="w-px h-3 bg-white/15" />
                            <span className="font-mono text-xs text-white/50 tracking-widest">{node.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-mono text-xs text-white/20">next →</span>
                        </div>
                    </div>

                    {/* Node body */}
                    <div className="px-5 py-4">
                        <h3 className="font-mono text-base font-bold text-white tracking-tight mb-1">{node.title}</h3>
                        <p className="font-mono text-xs text-white/40 mb-3 tracking-wide">{node.subtitle}</p>
                        <p className="font-sans text-sm text-white/60 leading-relaxed mb-4">{node.desc}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {node.tags.map(tag => (
                                <span key={tag} className="font-mono text-xs px-2 py-0.5 border border-white/15 text-white/40 hover:border-white/40 hover:text-white/70 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Pointer field */}
                    <div className="border-t border-white/10 px-5 py-2 flex items-center justify-between">
                        <span className="font-mono text-xs text-white/15">data: 0x{(index * 1024).toString(16).toUpperCase().padStart(4, '0')}</span>
                        <span className="font-mono text-xs text-white/15">
                            ptr: {node.type === 'TAIL' ? 'NULL' : `0x${((index + 1) * 1024).toString(16).toUpperCase().padStart(4, '0')}`}
                        </span>
                    </div>
                </div>

                {/* Right pointer visual */}
                <div className="w-16 shrink-0 flex items-center justify-center">
                    {node.type !== 'TAIL' ? (
                        <div className="flex flex-col items-center gap-1">
                            <span className="font-mono text-xs text-white/20">→</span>
                        </div>
                    ) : (
                        <span className="font-mono text-xs text-white/20">∅</span>
                    )}
                </div>
            </div>

            {/* Connector line between nodes */}
            {node.type !== 'TAIL' && (
                <div className="flex ml-16 pl-4">
                    <div className="w-px h-6 bg-white/10 ml-4" />
                    <div className="font-mono text-xs text-white/15 ml-2 flex items-center">traverse()</div>
                </div>
            )}
        </motion.div>
    )
}

export default function About() {
    return (
        <PageWrapper>
            <div className="max-w-3xl mx-auto px-6 py-16">
                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <div className="font-mono text-xs text-white/30 mb-3 tracking-widest">STRUCTURE: LINKED_LIST</div>
                    <h1 className="font-mono text-3xl font-black text-white tracking-tight mb-2">About</h1>
                    <p className="font-mono text-xs text-white/30">
                        {'// Sequential traversal from HEAD → TAIL'}
                    </p>
                    <div className="mt-4 font-mono text-xs text-white/20">
                        <span>LinkedList&lt;Milestone&gt; journey = new LinkedList();</span>
                    </div>
                </motion.div>

                {/* Linked list */}
                <div className="relative">
                    {TIMELINE.map((node, i) => (
                        <LinkedListNode key={node.id} node={node} index={i} />
                    ))}
                </div>

                {/* Footer annotation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 font-mono text-xs text-white/20 border-t border-white/10 pt-6"
                >
                    <div>// End of list traversal</div>
                    <div>// Total nodes: {TIMELINE.length} | Time complexity: O(n)</div>
                    <div>// Space complexity: O(n)</div>
                </motion.div>
            </div>
        </PageWrapper>
    )
}