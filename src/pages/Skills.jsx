import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../UI/PageWrapper'

const TREE = {
    id: 'root',
    label: 'Technical Skills',
    type: 'root',
    children: [
        {
            id: 'frontend',
            label: 'Frontend',
            type: 'branch',
            children: [
                { id: 'react', label: 'React', level: 95, type: 'leaf' },
                { id: 'nextjs', label: 'Next.js', level: 88, type: 'leaf' },
                { id: 'typescript', label: 'TypeScript', level: 85, type: 'leaf' },
                { id: 'tailwind', label: 'Tailwind', level: 92, type: 'leaf' },
                { id: 'framer', label: 'Framer Motion', level: 80, type: 'leaf' },
            ],
        },
        {
            id: 'backend',
            label: 'Backend',
            type: 'branch',
            children: [
                { id: 'node', label: 'Node.js', level: 85, type: 'leaf' },
                { id: 'express', label: 'Express', level: 82, type: 'leaf' },
                { id: 'postgres', label: 'PostgreSQL', level: 78, type: 'leaf' },
                { id: 'mongo', label: 'MongoDB', level: 80, type: 'leaf' },
                { id: 'redis', label: 'Redis', level: 70, type: 'leaf' },
            ],
        },
        {
            id: 'tools',
            label: 'Tools & DevOps',
            type: 'branch',
            children: [
                { id: 'git', label: 'Git', level: 90, type: 'leaf' },
                { id: 'docker', label: 'Docker', level: 75, type: 'leaf' },
                { id: 'aws', label: 'AWS', level: 68, type: 'leaf' },
                { id: 'linux', label: 'Linux', level: 80, type: 'leaf' },
            ],
        },
        {
            id: 'ai',
            label: 'AI / ML',
            type: 'branch',
            children: [
                { id: 'llm', label: 'LLM APIs', level: 82, type: 'leaf' },
                { id: 'langchain', label: 'LangChain', level: 70, type: 'leaf' },
                { id: 'python', label: 'Python', level: 75, type: 'leaf' },
                { id: 'numpy', label: 'NumPy/Pandas', level: 65, type: 'leaf' },
            ],
        },
    ],
}

function LeafNode({ node, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25, delay }}
            className="flex items-center gap-3 py-2 px-3 hover:bg-white/5 transition-colors group"
        >
            {/* Tree branch lines */}
            <span className="font-mono text-white/20 text-xs">└─</span>

            {/* Skill label */}
            <span className="font-mono text-sm text-white/70 group-hover:text-white transition-colors w-32 shrink-0">
                {node.label}
            </span>

            {/* Level bar */}
            <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
                    <motion.div
                        className="absolute left-0 top-0 h-full bg-white/60"
                        initial={{ width: 0 }}
                        animate={{ width: `${node.level}%` }}
                        transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                </div>
                <span className="font-mono text-xs text-white/30 w-8 text-right">{node.level}</span>
            </div>
        </motion.div>
    )
}

function BranchNode({ node, depth = 0 }) {
    const [expanded, setExpanded] = useState(false)
    const totalChildren = node.children?.length || 0
    const avgLevel = node.children
        ? Math.round(node.children.reduce((s, c) => s + (c.level || 0), 0) / totalChildren)
        : 0

    return (
        <div className="border border-white/10 hover:border-white/20 transition-colors">
            {/* Branch header - clickable */}
            <button
                onClick={() => setExpanded(e => !e)}
                className="w-full flex items-center justify-between px-5 py-4 text-left group hover:bg-white/3 transition-colors"
                data-hoverable
            >
                <div className="flex items-center gap-4">
                    {/* Expand indicator */}
                    <motion.span
                        animate={{ rotate: expanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-mono text-xs text-white/40 group-hover:text-white/70 transition-colors"
                    >
                        ▶
                    </motion.span>

                    {/* Branch label */}
                    <div>
                        <div className="font-mono text-sm font-bold text-white tracking-wide">{node.label}</div>
                        <div className="font-mono text-xs text-white/25 mt-0.5">
                            children: {totalChildren} | avg_proficiency: {avgLevel}
                        </div>
                    </div>
                </div>

                {/* Node type indicator */}
                <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-white/20">[{node.type.toUpperCase()}]</span>
                    <div className="w-8 h-8 border border-white/15 flex items-center justify-center">
                        <span className="font-mono text-xs text-white/40">{totalChildren}</span>
                    </div>
                </div>
            </button>

            {/* Children (leaves) */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-white/10 px-4 py-2"
                    >
                        {node.children.map((child, i) => (
                            <LeafNode key={child.id} node={child} delay={i * 0.04} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function Skills() {
    const [allExpanded, setAllExpanded] = useState(false)

    return (
        <PageWrapper>
            <div className="max-w-3xl mx-auto px-6 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="font-mono text-xs text-white/30 mb-3 tracking-widest">STRUCTURE: BINARY_TREE</div>
                    <h1 className="font-mono text-3xl font-black text-white tracking-tight mb-2">Skills</h1>
                    <p className="font-mono text-xs text-white/30">{'// Hierarchical skill map — click branches to expand'}</p>
                    <div className="mt-3 font-mono text-xs text-white/20">
                        Tree&lt;Skill&gt; root = new Tree("Technical Skills");
                    </div>
                </motion.div>

                {/* Tree root node */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                >
                    <div className="border border-white/30 px-5 py-4 flex items-center justify-between bg-black">
                        <div>
                            <div className="font-mono text-lg font-black text-white tracking-tight">{TREE.label}</div>
                            <div className="font-mono text-xs text-white/30 mt-0.5">ROOT NODE | height: 2 | branches: {TREE.children.length}</div>
                        </div>
                        <div className="font-mono text-xs text-white border border-white/30 px-3 py-1.5">
                            [ROOT]
                        </div>
                    </div>

                    {/* Root connector */}
                    <div className="flex justify-center">
                        <div className="w-px h-6 bg-white/20" />
                    </div>

                    {/* Branch grid */}
                    <div className="grid grid-cols-1 gap-px bg-white/10">
                        {TREE.children.map((branch, i) => (
                            <motion.div
                                key={branch.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.08 }}
                            >
                                <BranchNode node={branch} depth={1} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="font-mono text-xs text-white/20 border-t border-white/10 pt-6 mt-8"
                >
                    <div>// In-order traversal: left → root → right</div>
                    <div>// Search: O(log n) | Insert: O(log n)</div>
                    <div>// Total leaf nodes: {TREE.children.reduce((s, b) => s + b.children.length, 0)}</div>
                </motion.div>
            </div>
        </PageWrapper>
    )
}