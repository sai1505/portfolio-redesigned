import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CodeIcon from '@mui/icons-material/Code';

const Footer = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'GitHub', icon: <GitHubIcon />, url: 'https://github.com/yourusername' },
        { name: 'HackerRank', icon: <CodeIcon />, url: 'https://hackerrank.com/yourusername' },
        { name: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://linkedin.com/in/yourusername' },
        { name: 'YouTube', icon: <YouTubeIcon />, url: 'https://youtube.com/@yourusername' },
    ];

    const isNodeActive = (index) => {
        if (hoveredIndex === null) return false;
        return index <= hoveredIndex;
    };

    const isPointerActive = (index) => {
        if (hoveredIndex === null) return false;
        return index < hoveredIndex;
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .cursor-blink {
          animation: blink 1.2s infinite;
        }
      `}</style>

            <footer className="relative py-8 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-4 sm:px-4 md:px-12 py-1.5 md:py-2 shadow-2xl"
                    >
                        {/* Main Content Container */}
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

                            {/* Left Section - Head Pointer + Copyright */}
                            <div className="flex items-center gap-3">

                                {/* Head Pointer */}
                                <motion.div
                                    initial={{ opacity: 0, x: -9 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="hidden md:flex items-center gap-2"
                                >

                                    <motion.div
                                        animate={{ scale: [1, 1.3, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                                        className="w-2 h-2 rounded-full bg-white/60"
                                    />
                                </motion.div>

                                {/* Copyright */}
                                <div className="flex items-center gap-3 text-sm">

                                    <p className="text-white/80">
                                        © {currentYear} <span className="text-white">BSVR</span>
                                    </p>

                                    <span className="hidden md:inline text-white/20">•</span>

                                    <p className="hidden md:block text-white/40">
                                        Design is the Key
                                    </p>

                                    <span className="hidden md:inline text-white/20">•</span>

                                    <p className="hidden md:block text-white/40">
                                        Crafted with <span className="mono text-white/70">O(∞)</span>
                                    </p>

                                </div>

                            </div>

                            {/* Center Section - Linked List Nodes */}
                            <div className="flex items-center gap-0 rounded-full p-3 md:p-4">
                                {socialLinks.map((social, index) => (
                                    <div key={social.name} className="flex items-center">
                                        {/* Node Container */}
                                        <motion.div
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            className="relative group"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >

                                            {/* Node Link */}
                                            <a
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block relative"
                                            >
                                                {/* Node Circle */}
                                                <motion.div
                                                    animate={{
                                                        borderColor: isNodeActive(index) ? '#fff' : '#444',
                                                        backgroundColor: isNodeActive(index)
                                                            ? 'rgba(255, 255, 255, 0.15)'
                                                            : 'transparent',
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: [0.4, 0, 0.2, 1]
                                                    }}
                                                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2 rounded-full relative overflow-hidden"
                                                >
                                                    {/* Icon */}
                                                    <motion.div
                                                        animate={{
                                                            color: isNodeActive(index) ? '#fff' : '#666',
                                                            scale: isNodeActive(index) ? 1.15 : 1,
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {React.cloneElement(social.icon, {
                                                            sx: { fontSize: { xs: 18, md: 20 } }
                                                        })}
                                                    </motion.div>

                                                    {/* Pulsing active indicator */}
                                                    {isNodeActive(index) && (
                                                        <motion.div
                                                            initial={{ scale: 0.8, opacity: 0.5 }}
                                                            animate={{ scale: 1.5, opacity: 0 }}
                                                            transition={{
                                                                duration: 1.5,
                                                                repeat: Infinity,
                                                                ease: "easeOut"
                                                            }}
                                                            className="absolute inset-0 border-2 border-white rounded-full"
                                                        />
                                                    )}
                                                </motion.div>

                                                {/* Node Label - Below */}
                                                <AnimatePresence>
                                                    {(hoveredIndex === index) && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -5 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap"
                                                        >
                                                            <div className="text-[10px] font-medium text-white px-2 py-1 bg-black/80 border border-white/20 rounded-md">
                                                                {social.name}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </a>
                                        </motion.div>

                                        {/* Pointer Arrow between nodes */}
                                        {index < socialLinks.length - 1 && (
                                            <div className="flex items-center mx-1.5 md:mx-2">
                                                <motion.div
                                                    animate={{
                                                        color: isPointerActive(index) ? '#fff' : '#333',
                                                        x: isPointerActive(index) ? [0, 3, 0] : 0,
                                                    }}
                                                    transition={{
                                                        color: { duration: 0.3 },
                                                        x: { duration: 0.6, repeat: isPointerActive(index) ? Infinity : 0 }
                                                    }}
                                                    className="mono text-base md:text-lg"
                                                >
                                                    →
                                                </motion.div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Final Arrow to NULL */}
                                <div className="flex items-center mx-1.5 md:mx-2">
                                    <motion.div
                                        animate={{
                                            color: hoveredIndex === socialLinks.length - 1 ? '#fff' : '#333',
                                        }}
                                        className="mono text-base md:text-lg"
                                    >
                                        →
                                    </motion.div>
                                </div>

                                {/* NULL Terminator */}
                                <motion.div
                                    animate={{
                                        color: hoveredIndex === socialLinks.length - 1 ? '#fff' : '#555',
                                    }}
                                    className="mono text-xs font-semibold flex items-center gap-1 px-2"
                                >
                                    <span>NULL</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </footer>
        </>
    );
};

export default Footer;