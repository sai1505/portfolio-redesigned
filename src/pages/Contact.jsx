import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../UI/PageWrapper'

const HASH_BUCKETS = [
    {
        key: 'EMAIL',
        hash: '0x4E5A1F',
        value: 'alex@devportfolio.io',
        index: 0,
        hint: 'Primary contact',
        action: 'mailto:alex@devportfolio.io',
        collisions: 0,
    },
    {
        key: 'GITHUB',
        hash: '0x7C3B2A',
        value: 'github.com/alexdev',
        index: 1,
        hint: 'Source code & contributions',
        action: 'https://github.com',
        collisions: 0,
    },
    {
        key: 'LINKEDIN',
        hash: '0x1D8E4C',
        value: 'linkedin.com/in/alexdev',
        index: 2,
        hint: 'Professional network',
        action: 'https://linkedin.com',
        collisions: 0,
    },
    {
        key: 'TWITTER',
        hash: '0xA2F3D0',
        value: '@alexdev_',
        index: 3,
        hint: 'Tech thoughts & updates',
        action: 'https://twitter.com',
        collisions: 1,
    },
    {
        key: 'RESUME',
        hash: '0x6B1C9E',
        value: 'resume.pdf',
        index: 4,
        hint: 'Download CV — PDF format',
        action: '#',
        collisions: 0,
    },
]

function hashAnimation(key) {
    // Visual steps of hashing
    return [
        `hash("${key}")`,
        `→ charCodes: [${key.split('').map(c => c.charCodeAt(0)).join(', ')}]`,
        `→ sum: ${key.split('').reduce((s, c) => s + c.charCodeAt(0), 0)}`,
        `→ mod 16: ${key.split('').reduce((s, c) => s + c.charCodeAt(0), 0) % 16}`,
    ]
}

function HashBucket({ bucket, delay }) {
    const [revealed, setRevealed] = useState(false)
    const [hashing, setHashing] = useState(false)
    const [hashSteps, setHashSteps] = useState([])
    const [stepIndex, setStepIndex] = useState(0)

    const handleReveal = () => {
        if (revealed) {
            setRevealed(false)
            setHashing(false)
            setHashSteps([])
            setStepIndex(0)
            return
        }

        setHashing(true)
        const steps = hashAnimation(bucket.key)

        let i = 0
        const interval = setInterval(() => {
            setHashSteps(steps.slice(0, i + 1))
            setStepIndex(i)
            i++
            if (i >= steps.length) {
                clearInterval(interval)
                setTimeout(() => {
                    setHashing(false)
                    setRevealed(true)
                }, 300)
            }
        }, 200)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="border border-white/15 hover:border-white/25 transition-colors"
        >
            {/* Bucket header */}
            <button
                onClick={handleReveal}
                className="w-full flex items-stretch text-left"
                data-hoverable
            >
                {/* Index column */}
                <div className="w-12 border-r border-white/10 flex items-center justify-center shrink-0 py-4 bg-white/3">
                    <span className="font-mono text-xs text-white/30 rotate-[-90deg] whitespace-nowrap">[{bucket.index}]</span>
                </div>

                {/* Key column */}
                <div className="border-r border-white/10 px-5 py-4 flex items-center w-32 shrink-0">
                    <div>
                        <div className="font-mono text-sm font-bold text-white tracking-widest">{bucket.key}</div>
                        <div className="font-mono text-xs text-white/25 mt-0.5">hash: {bucket.hash}</div>
                    </div>
                </div>

                {/* Value column */}
                <div className="flex-1 px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-white/30">→</span>
                        {revealed ? (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="font-mono text-sm text-white"
                            >
                                {bucket.value}
                            </motion.span>
                        ) : hashing ? (
                            <span className="font-mono text-xs text-white/50">
                                {hashSteps[hashSteps.length - 1] || 'computing...'}
                            </span>
                        ) : (
                            <span className="font-mono text-xs text-white/20 tracking-widest">
                                {'*'.repeat(bucket.value.length > 20 ? 20 : bucket.value.length)}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {bucket.collisions > 0 && (
                            <span className="font-mono text-xs text-white/30 border border-white/15 px-1.5">
                                col: {bucket.collisions}
                            </span>
                        )}
                        <span className="font-mono text-xs text-white/20">
                            {revealed ? 'FOUND' : 'LOOKUP'}
                        </span>
                    </div>
                </div>
            </button>

            {/* Revealed state: action link */}
            <AnimatePresence>
                {revealed && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-white/10"
                    >
                        <div className="px-5 py-3 flex items-center justify-between">
                            <span className="font-mono text-xs text-white/30">{bucket.hint}</span>
                            <a
                                href={bucket.action}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-xs text-white border border-white/30 px-3 py-1.5 hover:bg-white hover:text-black transition-all"
                                onClick={(e) => e.stopPropagation()}
                            >
                                → OPEN
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function Contact() {
    return (
        <PageWrapper>
            <div className="max-w-3xl mx-auto px-6 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="font-mono text-xs text-white/30 mb-3 tracking-widest">STRUCTURE: HASH_TABLE</div>
                    <h1 className="font-mono text-3xl font-black text-white tracking-tight mb-2">Contact</h1>
                    <p className="font-mono text-xs text-white/30">{'// Click any bucket to lookup value — O(1) retrieval'}</p>
                    <div className="mt-3 font-mono text-xs text-white/20">
                        HashMap&lt;String, String&gt; contact = new HashMap();
                    </div>
                </motion.div>

                {/* Hash table header row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center border border-white/20 border-b-0 bg-white/5"
                >
                    <div className="w-12 border-r border-white/10 px-2 py-2 text-center">
                        <span className="font-mono text-xs text-white/40">IDX</span>
                    </div>
                    <div className="w-32 border-r border-white/10 px-5 py-2">
                        <span className="font-mono text-xs text-white/40">KEY</span>
                    </div>
                    <div className="flex-1 px-5 py-2">
                        <span className="font-mono text-xs text-white/40">VALUE (hashed)</span>
                    </div>
                </motion.div>

                {/* Buckets */}
                <div className="flex flex-col gap-px bg-white/8">
                    {HASH_BUCKETS.map((bucket, i) => (
                        <HashBucket key={bucket.key} bucket={bucket} delay={0.1 + i * 0.07} />
                    ))}
                </div>

                {/* Load factor display */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 border border-white/10 px-5 py-4"
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs text-white/40">load_factor</span>
                        <span className="font-mono text-xs text-white/60">{(HASH_BUCKETS.length / 16).toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-white/10 relative">
                        <motion.div
                            className="absolute left-0 top-0 h-full bg-white/50"
                            initial={{ width: 0 }}
                            animate={{ width: `${(HASH_BUCKETS.length / 16) * 100}%` }}
                            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="font-mono text-xs text-white/20">0.0</span>
                        <span className="font-mono text-xs text-white/20">capacity: 16</span>
                        <span className="font-mono text-xs text-white/20">1.0</span>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 font-mono text-xs text-white/20 border-t border-white/10 pt-6"
                >
                    <div>// get(key): O(1) avg | O(n) worst case</div>
                    <div>// collision strategy: separate chaining</div>
                    <div>// Rehash threshold: load_factor {'>'} 0.75</div>
                </motion.div>
            </div>
        </PageWrapper>
    )
}