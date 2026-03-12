import { useState, useEffect, useRef } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../UI/PageWrapper'

// Real djb2 hash
function djb2(key) {
    let h = 5381
    for (let i = 0; i < key.length; i++) {
        h = ((h << 5) + h) ^ key.charCodeAt(i)
        h = h >>> 0
    }
    return h
}

const CAPACITY = 11  // prime capacity — classic hash table trick

const ENTRIES = [
    { key: 'EMAIL', value: 'vsai1505.bona@gmail.com', hint: 'Send me an email', action: 'mailto:vsai1505.bona@gmail.com' },
    { key: 'GITHUB', value: 'github.com/sai1505', hint: 'Code & contributions', action: 'https://github.com/sai1505' },
    { key: 'LINKEDIN', value: 'linkedin.com/in/bonamukkala-saivenkata-reddy', hint: 'Professional network', action: 'https://linkedin.com/in/bonamukkala-saivenkata-reddy' },
]

// assign each entry a slot via hash
const FILLED = ENTRIES.map(e => ({ ...e, hash: djb2(e.key), slot: djb2(e.key) % CAPACITY }))

// detect collisions (two entries share same slot → chain)
const slotMap = {}
FILLED.forEach(e => { slotMap[e.slot] = (slotMap[e.slot] || 0) + 1 })

// 11 slots — some filled, rest empty
const SLOTS = Array.from({ length: CAPACITY }, (_, i) => ({
    slot: i,
    entries: FILLED.filter(e => e.slot === i),
}))

function hashSteps(key) {
    const codes = key.split('').map(c => c.charCodeAt(0))
    const h = djb2(key)
    return [
        `hash("${key}")`,
        `→ djb2: 0x${h.toString(16).toUpperCase().padStart(8, '0')}`,
        `→ slot = ${h} % ${CAPACITY} = ${h % CAPACITY}`,
    ]
}

/* ─── Filled bucket row ──────────────────────────────────────────────────── */
function BucketRow({ entry, slotIdx, rowIdx, totalInSlot }) {
    const [phase, setPhase] = useState('idle') // idle | hashing | revealed
    const [steps, setSteps] = useState([])
    const [hov, setHov] = useState(false)

    const isRevealed = phase === 'revealed'
    const isHashing = phase === 'hashing'

    const run = () => {
        if (isRevealed) { setPhase('idle'); setSteps([]); return }
        setPhase('hashing')
        const all = hashSteps(entry.key)
        let i = 0
        const iv = setInterval(() => {
            setSteps(all.slice(0, i + 1))
            i++
            if (i >= all.length) { clearInterval(iv); setTimeout(() => setPhase('revealed'), 260) }
        }, 220)
    }

    const isChained = totalInSlot > 1

    return (
        <div>
            <motion.div
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr 130px',
                    borderTop: rowIdx === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)',
                    background: isRevealed ? '#fff' : hov ? 'rgba(255,255,255,0.04)' : 'transparent',
                    transition: 'background .18s',
                    cursor: 'pointer',
                }}
                onClick={run}
            >
                {/* KEY cell */}
                <div style={{
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                    padding: '18px 22px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5,
                }}>
                    <div style={{
                        fontFamily: 'Inter', fontSize: 14, fontWeight: 800,
                        letterSpacing: 2,
                        color: isRevealed ? '#000' : '#fff', transition: 'color .18s',
                    }}>{entry.key}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 9, color: isRevealed ? 'rgba(0,0,0,0.38)' : 'rgba(255,255,255,0.25)' }}>
                        {isHashing ? steps[steps.length - 1] : `0x${entry.hash.toString(16).toUpperCase().padStart(8, '0')}`}
                    </div>
                    {isChained && (
                        <div style={{ fontFamily: 'Inter', fontSize: 8, color: isRevealed ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.25)' }}>
                            ⛓ chained [{rowIdx + 1}/{totalInSlot}]
                        </div>
                    )}
                </div>

                {/* VALUE cell */}
                <div style={{
                    padding: '18px 22px',
                    display: 'flex', alignItems: 'center', gap: 10,
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                }}>
                    <span style={{ fontFamily: 'Inter', fontSize: 11, color: isRevealed ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.25)' }}>→</span>
                    {isRevealed ? (
                        <motion.span
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#000', wordBreak: 'break-all' }}
                        >{entry.value}</motion.span>
                    ) : isHashing ? (
                        <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                            {steps[steps.length - 1] || 'computing…'}
                        </span>
                    ) : (
                        <span style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.15)', letterSpacing: 3 }}>
                            {'•'.repeat(Math.min(entry.value.length, 24))}
                        </span>
                    )}
                </div>

                {/* STATUS cell */}
                <div style={{
                    padding: '18px 18px',
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 6,
                }}>
                    <span style={{
                        fontFamily: 'Inter', fontSize: 9, fontWeight: 700,
                        color: isRevealed ? 'rgba(0,0,0,0.45)' : isHashing ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)',
                    }}>
                        {isRevealed ? '✓ FOUND' : isHashing ? 'HASHING…' : 'get(key)'}
                    </span>
                    <span style={{
                        fontFamily: 'Inter', fontSize: 8,
                        color: isRevealed ? 'rgba(0,0,0,0.28)' : 'rgba(255,255,255,0.18)',
                        border: `1px solid ${isRevealed ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)'}`,
                        padding: '2px 6px',
                    }}>
                        {isRevealed ? '× CLEAR' : 'CLICK'}
                    </span>
                </div>
            </motion.div>

            {/* Revealed: open link row */}
            <AnimatePresence>
                {isRevealed && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        style={{ overflow: 'hidden', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.08)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 22px' }}>
                            <span style={{ fontFamily: 'Inter', fontSize: 10, color: 'rgba(0,0,0,0.4)' }}>{entry.hint}</span>
                            <a
                                href={entry.action} target="_blank" rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                style={{
                                    fontFamily: 'Inter', fontSize: 11, fontWeight: 700,
                                    color: '#000', border: '1.5px solid rgba(0,0,0,0.35)',
                                    padding: '6px 18px', textDecoration: 'none', transition: 'background .15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.07)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >→ OPEN</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

/* ─── One slot row (filled or empty) ────────────────────────────────────── */
function SlotRow({ slot, entries, delay }) {
    const isEmpty = entries.length === 0
    return (
        <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.3, ease: 'easeOut' }}
            style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
        >
            {/* Slot index gutter */}
            <div style={{
                borderRight: '1px solid rgba(255,255,255,0.1)',
                background: isEmpty ? 'transparent' : 'rgba(255,255,255,0.03)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '14px 0',
            }}>
                <span style={{
                    fontFamily: 'Inter',
                    fontSize: 11, fontWeight: 700,
                    color: isEmpty ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.55)',
                    writingMode: 'vertical-rl', letterSpacing: 1,
                }}>
                    [{slot.toString().padStart(2, '0')}]
                </span>
            </div>

            {/* Bucket content */}
            <div>
                {isEmpty ? (
                    /* Empty slot */
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '18px 22px',
                    }}>
                        <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.1)', fontStyle: 'italic' }}>
                            — empty —
                        </span>
                        <span style={{ fontFamily: 'Inter', fontSize: 10, color: 'rgba(255,255,255,0.07)' }}>
                            NULL
                        </span>
                    </div>
                ) : (
                    entries.map((e, i) => (
                        <BucketRow
                            key={e.key}
                            entry={e}
                            slotIdx={slot}
                            rowIdx={i}
                            totalInSlot={entries.length}
                        />
                    ))
                )}
            </div>
        </motion.div>
    )
}

/* ─── Contact Form ───────────────────────────────────────────────────────── */
function ContactForm() {
    const key = import.meta.env.VITE_FORM_ID
    const [state, handleSubmit] = useForm(key)
    const [focused, setFocused] = useState(null)
    const [hov, setHov] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [countdown, setCountdown] = useState(3)
    const formRef = useRef(null)

    // When Formspree reports success, trigger our own success state
    useEffect(() => {
        if (state.succeeded) {
            setShowSuccess(true)
            setCountdown(3)
        }
    }, [state.succeeded])

    // Countdown timer — hides success and resets after 3 seconds
    useEffect(() => {
        if (!showSuccess) return
        if (countdown === 0) {
            setShowSuccess(false)
            // Reset the form fields manually
            if (formRef.current) formRef.current.reset()
            return
        }
        const t = setTimeout(() => setCountdown(c => c - 1), 1000)
        return () => clearTimeout(t)
    }, [showSuccess, countdown])

    const isSending = state.submitting
    const isError = state.errors && Object.keys(state.errors).length > 0

    const inputStyle = (key) => ({
        width: '100%',
        background: 'transparent',
        border: 'none',
        borderBottom: `1px solid ${focused === key ? '#fff' : 'rgba(255,255,255,0.22)'}`,
        outline: 'none',
        padding: '10px 0',
        fontFamily: 'Inter',
        fontSize: 13,
        color: '#fff',
        caretColor: '#fff',
        transition: 'border-color .18s',
        resize: 'none',
    })

    const labelStyle = (key, val) => ({
        fontFamily: 'Inter',
        fontSize: 9, letterSpacing: 2,
        color: focused === key || val ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.3)',
        transition: 'color .18s',
        display: 'block',
        marginBottom: 5,
    })

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-screen-xl mx-auto mt-16"
        >
            {/* Section label */}
            <div className="flex items-center gap-4 mb-8">
                <div className="font-mono text-xs text-white/35 tracking-widest">SEND_MESSAGE</div>
                <div className="flex-1 h-px bg-white/10" />
                <div className="font-mono text-xs text-white/20">// push(Message) → vsai1505.bona@gmail.com</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>

                {/* Left: form or success */}
                <div style={{ border: '1px solid rgba(255,255,255,0.15)', padding: '32px 36px', position: 'relative', overflow: 'hidden' }}>

                    <AnimatePresence mode="wait">
                        {showSuccess ? (
                            /* ── Success state ── */
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                style={{ textAlign: 'center', padding: '24px 0' }}
                            >
                                <div style={{
                                    fontFamily: 'Inter', fontSize: 28, fontWeight: 900,
                                    color: '#fff', marginBottom: 12,
                                }}>
                                    ✓ MESSAGE SENT
                                </div>
                                <div style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>
                                    // push(message) → vsai1505.bona@gmail.com
                                </div>
                                <div style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>
                                    I'll reply within 24h · avg response_time: &lt;24h
                                </div>
                                {/* Countdown bar */}
                                <div style={{ marginTop: 8 }}>
                                    <div style={{ fontFamily: 'Inter', fontSize: 9, color: 'rgba(255,255,255,0.25)', marginBottom: 8, letterSpacing: 1 }}>
                                        FORM RESETS IN {countdown}s
                                    </div>
                                    <div style={{ height: 2, background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                                        <motion.div
                                            style={{ height: '100%', background: 'rgba(255,255,255,0.5)', transformOrigin: 'left' }}
                                            initial={{ scaleX: 1 }}
                                            animate={{ scaleX: 0 }}
                                            transition={{ duration: 3, ease: 'linear' }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            /* ── Form ── */
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div style={{ marginBottom: 28 }}>
                                    <div style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: 1, marginBottom: 6 }}>
                                        Send Me a Message
                                    </div>
                                    <div style={{ fontFamily: 'Inter', fontSize: 10, color: 'rgba(255,255,255,0.28)' }}>
                                        // All fields required · powered by Formspree
                                    </div>
                                </div>

                                <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

                                    {/* Name */}
                                    <div style={{ marginBottom: 24 }}>
                                        <label htmlFor="name" style={labelStyle('name', false)}>YOUR_NAME *</label>
                                        <input
                                            id="name" type="text" name="name" required
                                            placeholder="e.g. John Doe"
                                            onFocus={() => setFocused('name')}
                                            onBlur={() => setFocused(null)}
                                            style={inputStyle('name')}
                                        />
                                        <ValidationError prefix="Name" field="name" errors={state.errors}
                                            style={{ fontFamily: 'Inter', fontSize: 9, color: 'rgba(255,100,100,0.8)', marginTop: 4 }}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div style={{ marginBottom: 24 }}>
                                        <label htmlFor="email" style={labelStyle('email', false)}>YOUR_EMAIL *</label>
                                        <input
                                            id="email" type="email" name="email" required
                                            placeholder="you@example.com"
                                            onFocus={() => setFocused('email')}
                                            onBlur={() => setFocused(null)}
                                            style={inputStyle('email')}
                                        />
                                        <ValidationError prefix="Email" field="email" errors={state.errors}
                                            style={{ fontFamily: 'Inter', fontSize: 9, color: 'rgba(255,100,100,0.8)', marginTop: 4 }}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div style={{ marginBottom: 32 }}>
                                        <label htmlFor="message" style={labelStyle('message', false)}>YOUR_MESSAGE *</label>
                                        <textarea
                                            id="message" name="message" required rows={5}
                                            placeholder="What's on your mind..."
                                            onFocus={() => setFocused('message')}
                                            onBlur={() => setFocused(null)}
                                            style={{ ...inputStyle('message'), display: 'block', lineHeight: 1.7 }}
                                        />
                                        <ValidationError prefix="Message" field="message" errors={state.errors}
                                            style={{ fontFamily: 'Inter', fontSize: 9, color: 'rgba(255,100,100,0.8)', marginTop: 4 }}
                                        />
                                    </div>

                                    {/* Submit */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSending}
                                        onMouseEnter={() => setHov(true)}
                                        onMouseLeave={() => setHov(false)}
                                        animate={{ scale: hov && !isSending ? 1.02 : 1 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                        style={{
                                            width: '100%', padding: '14px',
                                            fontFamily: 'Inter',
                                            fontSize: 12, fontWeight: 800, letterSpacing: 2,
                                            border: '1.5px solid',
                                            cursor: isSending ? 'wait' : 'pointer',
                                            transition: 'background .2s, color .2s, border-color .2s',
                                            ...(isSending
                                                ? { background: 'transparent', color: 'rgba(255,255,255,0.38)', borderColor: 'rgba(255,255,255,0.18)' }
                                                : hov
                                                    ? { background: '#fff', color: '#000', borderColor: '#fff' }
                                                    : { background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }
                                            ),
                                        }}
                                    >
                                        {isSending ? 'SENDING…' : 'Send (Message) →'}
                                    </motion.button>

                                    {isError && (
                                        <div style={{ fontFamily: 'Inter', fontSize: 10, color: 'rgba(255,100,100,0.7)', marginTop: 10, textAlign: 'center' }}>
                                            ✗ Something went wrong — please try again
                                        </div>
                                    )}
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Contact() {
    const loadFactor = FILLED.length / CAPACITY

    return (
        <PageWrapper>
            <div className="px-8 py-14 min-h-screen">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="max-w-screen-xl mx-auto mb-12"
                >
                    <div className="font-mono text-xs text-white/30 mb-2 tracking-widest">STRUCTURE: HASH_TABLE</div>
                    <h1 className="font-mono text-4xl font-black text-white tracking-tight mb-3">Contact</h1>
                    <p className="font-mono text-xs text-white/28">// Click any bucket to run get(key) — O(1) avg lookup · djb2 hash · separate chaining</p>
                    <div className="mt-3 font-mono text-xs text-white/18">
                        HashMap&lt;String, Contact&gt; table = new HashMap(capacity=<span className="text-white/35">{CAPACITY}</span>); <span className="text-white/18">// prime capacity</span>
                    </div>
                </motion.div>

                <div className="max-w-screen-xl mx-auto" style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>

                    {/* ── Side panel ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ width: 230, flexShrink: 0, border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'Inter' }}
                    >
                        <div style={{ padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: 1 }}>TABLE METADATA</div>
                        </div>
                        {[
                            ['capacity', CAPACITY],
                            ['size', FILLED.length],
                            ['empty_slots', CAPACITY - FILLED.length],
                            ['load_factor', loadFactor.toFixed(3)],
                            ['hash_fn', 'djb2'],
                            ['collision', 'chaining'],
                            ['rehash_at', '> 0.75'],
                        ].map(([k, v]) => (
                            <div key={k} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '9px 18px', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)' }}>{k}</span>
                                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.62)', fontWeight: 600 }}>{v}</span>
                            </div>
                        ))}

                        {/* Load factor bar */}
                        <div style={{ padding: '14px 18px 10px' }}>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', marginBottom: 8 }}>load_factor</div>
                            <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', position: 'relative' }}>
                                <motion.div
                                    style={{ height: '100%', background: loadFactor > 0.7 ? '#fff' : 'rgba(255,255,255,0.5)' }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${loadFactor * 100}%` }}
                                    transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                />
                                {/* 0.75 rehash threshold marker */}
                                <div style={{ position: 'absolute', top: -4, bottom: -4, left: '75%', width: 1.5, background: 'rgba(255,255,255,0.35)' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>
                                <span>0.0</span><span>↑ rehash</span><span>1.0</span>
                            </div>
                        </div>

                        {/* Slot occupancy mini-map */}
                        <div style={{ padding: '0 18px 14px' }}>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', marginBottom: 8 }}>slot occupancy</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: 3 }}>
                                {SLOTS.map(s => (
                                    <motion.div
                                        key={s.slot}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + s.slot * 0.05 }}
                                        title={`slot ${s.slot}`}
                                        style={{
                                            height: 14,
                                            background: s.entries.length > 0
                                                ? (s.entries.length > 1 ? '#fff' : 'rgba(255,255,255,0.6)')
                                                : 'rgba(255,255,255,0.07)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                        }}
                                    />
                                ))}
                            </div>
                            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.18)', marginTop: 5 }}>
                                ■ filled &nbsp; ■ chained &nbsp; □ empty
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '10px 18px' }}>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', lineHeight: 1.8 }}>
                                // click any bucket<br />
                                // to run get(key)<br />
                                // value is masked<br />
                                // until hash resolves
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Main hash table ── */}
                    <div style={{ flex: 1 }}>

                        {/* Column headers */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                            style={{
                                display: 'grid', gridTemplateColumns: '64px 180px 1fr 130px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderBottom: 'none',
                                fontFamily: 'Inter',
                            }}
                        >
                            {['SLOT', 'KEY  →  HASH', 'VALUE', 'STATUS'].map((h, i) => (
                                <div key={h} style={{
                                    padding: '10px 22px',
                                    fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: 1, fontWeight: 700,
                                    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                                }}>{h}</div>
                            ))}
                        </motion.div>

                        {/* Slot rows */}
                        <div style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                            {SLOTS.map((s, i) => (
                                <SlotRow
                                    key={s.slot}
                                    slot={s.slot}
                                    entries={s.entries}
                                    delay={0.08 + i * 0.04}
                                />
                            ))}
                        </div>

                        {/* Footer strip */}
                        <div style={{
                            border: '1px solid rgba(255,255,255,0.1)', borderTop: 'none',
                            padding: '8px 22px',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            background: 'rgba(255,255,255,0.02)',
                            fontFamily: 'Inter', fontSize: 9, color: 'rgba(255,255,255,0.22)',
                        }}>
                            <span>get(key): O(1) avg · O(n) worst</span>
                            <span>size={FILLED.length} / capacity={CAPACITY}</span>
                            <span>rehash threshold: 0.75</span>
                        </div>
                    </div>
                </div>

                {/* ── Send Message Form ── */}
                <ContactForm />
            </div>
        </PageWrapper>
    )
}