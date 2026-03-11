import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NAV_NODES = [
    { id: 0, label: "HOME", href: "/home", complexity: "O(1)" },
    { id: 1, label: "ABOUT", href: "/about", complexity: "Θ(1)" },
    { id: 2, label: "SKILLS", href: "/skills", complexity: "O(n)" },
    { id: 3, label: "PROJECTS", href: "/projects", complexity: "O(n log n)" },
    { id: 4, label: "EXPERIENCE", href: "#experience", complexity: "O(t)" }, // t = timeline
    { id: 5, label: "CONTACT", href: "/contact", complexity: "O(1)" },
];

export default function Navbar() {
    const [active, setActive] = useState(0);
    const [hovered, setHovered] = useState(null);
    const [traversing, setTraversing] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNodeClick = (id, href) => {
        if (id === active) return;

        // Graph traversal animation
        setTraversing({ from: active, to: id });
        setTimeout(() => {
            setActive(id);
            setTraversing(null);
            navigate(href);
        }, 450);
        setMenuOpen(false);
    };

    const isTraversed = (id) => {
        if (!traversing) return false;
        const { from, to } = traversing;
        const [lo, hi] = from < to ? [from, to] : [to, from];
        return id >= lo && id <= hi;
    };

    const isEdgeActive = (index) => {
        if (!traversing) return false;
        const { from, to } = traversing;
        const [lo, hi] = from < to ? [from, to] : [to, from];
        return index > lo && index <= hi;
    };

    const navigate = useNavigate();

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4 md:pt-6 pointer-events-none"
            >
                <motion.div
                    animate={{
                        backgroundColor: scrolled
                            ? "rgba(0, 0, 0, 0.85)"
                            : "rgba(0, 0, 0, 0.4)",
                        borderColor: scrolled
                            ? "rgba(255, 255, 255, 0.2)"
                            : "rgba(255, 255, 255, 0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-2xl border rounded-full px-6 md:px-8 py-3 md:py-4 pointer-events-auto"
                    style={{
                        boxShadow: scrolled
                            ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                            : "0 4px 16px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    {/* Logo - DSA Style */}
                    <motion.a
                        href="/home"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNodeClick(0);
                        }}
                        className="flex items-center gap-2 mb-2 relative z-10 no-underline"
                    >

                        {/* arr[0] */}
                        <motion.span
                            className="mono text-[10px] text-gray-500 border border-gray-700 px-2 py-0.5 tracking-wider"
                            whileHover={{ scale: 1.1, color: "#fff" }}
                            transition={{ duration: 0.2 }}
                        >
                            arr[0]
                        </motion.span>

                        {/* DEV.NAME */}
                        <motion.span
                            className="text-lg md:text-2xl font-bold text-white tracking-wider mx-1"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            B.S.V.R
                        </motion.span>

                        {/* * */}
                        <motion.span
                            className="mono text-xs text-gray-500"
                            whileHover={{ rotate: 20, scale: 1.2 }}
                            transition={{ duration: 0.2 }}
                        >
                            *
                        </motion.span>

                    </motion.a>

                    {/* Desktop Navigation - Graph Nodes */}
                    <div className="hidden lg:flex items-center gap-0 rounded-full px-2 py-1 relative">
                        {NAV_NODES.map((node, index) => (
                            <div key={node.id} className="flex items-center">
                                {/* Edge connector between nodes */}
                                {index > 0 && (
                                    <div className="relative h-px w-3 mx-1 mb-5 bg-gray-700 overflow-hidden">
                                        <motion.div
                                            className="absolute top-0 left-0 h-full w-full bg-white"
                                            initial={{ x: "-100%" }}
                                            animate={{
                                                x: isEdgeActive(index) ? "0%" : "-100%",
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                ease: [0.4, 0, 0.2, 1],
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Node */}
                                <motion.a
                                    href={node.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNodeClick(node.id, node.href);
                                    }}
                                    onMouseEnter={() => setHovered(node.id)}
                                    onMouseLeave={() => setHovered(null)}
                                    className="relative px-4 py-2 mb-5 cursor-pointer no-underline flex flex-col items-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Label */}
                                    <motion.span
                                        className="text-[13px] font-semibold tracking-widest block"
                                        animate={{
                                            color:
                                                active === node.id
                                                    ? "#fff"
                                                    : isTraversed(node.id)
                                                        ? "#999"
                                                        : hovered === node.id
                                                            ? "#ccc"
                                                            : "#666",
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {node.label}
                                    </motion.span>

                                    {/* Complexity notation with node circle - shows on hover or active */}
                                    <AnimatePresence>
                                        {(hovered === node.id || active === node.id) && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center justify-center gap-1.5 mt-2 absolute top-full left-1/2 -translate-x-1/2"
                                            >

                                                {/* Complexity text */}
                                                <span
                                                    className={`mono text-[9px] whitespace-nowrap border border-gray-700 px-2 py-0.5 bg-black/80 rounded
                                                        ${active === node.id ? "text-white" : "text-gray-500"}`}
                                                >
                                                    {node.complexity}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Active pill background */}
                                    {active === node.id && (
                                        <motion.div
                                            layoutId="activePillBg"
                                            className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 rounded-full -z-10"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}

                                    {/* Active underline */}
                                    {active === node.id && (
                                        <motion.div
                                            layoutId="activeUnderline"
                                            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </motion.a>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Hamburger */}
                    <motion.button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden flex flex-col justify-center items-center gap-1.5 p-2 relative z-10"
                        aria-label="Toggle menu"
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.span
                            animate={{
                                rotate: menuOpen ? 45 : 0,
                                y: menuOpen ? 8 : 0,
                            }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="block w-6 h-0.5 bg-white rounded-full"
                        />
                        <motion.span
                            animate={{
                                opacity: menuOpen ? 0 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            className="block w-6 h-0.5 bg-white rounded-full"
                        />
                        <motion.span
                            animate={{
                                rotate: menuOpen ? -45 : 0,
                                y: menuOpen ? -8 : 0,
                            }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="block w-6 h-0.5 bg-white rounded-full"
                        />
                    </motion.button>
                </motion.div>

                {/* Mobile Menu - Stack metaphor */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -20 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="lg:hidden max-w-7xl mx-auto mt-2 overflow-hidden pointer-events-auto"
                        >
                            <motion.div
                                className="bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 shadow-xl"
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >

                                {/* Reversed stack order */}
                                {[...NAV_NODES].reverse().map((node, index) => (
                                    <motion.a
                                        key={node.id}
                                        href={node.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNodeClick(node.id, node.href);
                                        }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 no-underline border-l-2 ${active === node.id
                                            ? "bg-white/10 border-white"
                                            : "border-transparent hover:bg-white/5 hover:border-gray-600"
                                            }`}
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Node dot */}
                                        <motion.div
                                            className={`w-1.5 h-1.5 rounded-full border ${active === node.id
                                                ? "bg-white border-white"
                                                : "border-gray-600"
                                                }`}
                                            animate={{
                                                scale: active === node.id ? [1, 1.3, 1] : 1,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                repeat: active === node.id ? Infinity : 0,
                                                repeatDelay: 2,
                                            }}
                                        />

                                        {/* Label */}
                                        <span
                                            className={`text-xs font-semibold tracking-widest ${active === node.id ? "text-white" : "text-gray-500"
                                                }`}
                                        >
                                            {node.label}
                                        </span>

                                        {/* Node index */}
                                        <span className="mono text-[9px] text-gray-700 ml-auto">
                                        </span>

                                        {/* Complexity */}
                                        <span className="mono text-[9px] text-gray-600 border border-gray-800 px-2 py-0.5 rounded">
                                            {node.complexity}
                                        </span>
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
}