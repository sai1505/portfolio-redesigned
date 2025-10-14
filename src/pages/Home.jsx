import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EmailIcon from '@mui/icons-material/Email';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
    { title: 'About', icon: <PersonIcon />, href: '#about' },
    { title: 'Projects', icon: <CodeOffIcon />, href: '#projects' },
    { title: 'Skills', icon: <WorkIcon />, href: '#skills' },
    { title: 'Contact', icon: <ContactMailIcon />, href: '#contact' },
];

export default function Home() {
    const heroRef = useRef(null);
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descriptionRef = useRef(null);
    const roleRef = useRef(null);
    const buttonsRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero container entrance - fade in only
            gsap.from(containerRef.current, {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: 'power4.out',
                delay: 0.2
            });

            // Master timeline for text
            const tl = gsap.timeline({ delay: 0.5 });

            // Title letters
            tl.from(titleRef.current.children, {
                opacity: 0,
                y: 80,
                duration: 1,
                stagger: 0.08,
                ease: 'power4.out'
            })
                .from(subtitleRef.current, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.6')
                .from(roleRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.5')
                .from(descriptionRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: 'power2.out'
                }, '-=0.5')
                .from(buttonsRef.current.children, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power3.out'
                }, '-=0.4');

            // Cards - simple fade up on scroll
            ScrollTrigger.batch(cardsRef.current, {
                onEnter: (batch) => {
                    gsap.from(batch, {
                        opacity: 0,
                        y: 60,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        overwrite: true
                    });
                },
                start: 'top 90%',
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={heroRef} className="relative pt-32 pb-20 px-8" style={{ zIndex: 10 }}>
            <div className="max-w-6xl mx-auto">
                {/* Hero Content - No Disappearing */}
                <div
                    ref={containerRef}
                    className="bg-black backdrop-blur-xl border-2 border-white/10 rounded-[3rem] px-8 md:px-16 py-12 md:py-20 mb-16 relative"
                >
                    <div className="text-center">
                        {/* Animated Hello */}
                        <h1
                            ref={titleRef}
                            className="text-5xl md:text-8xl font-black mb-6 text-white tracking-tight"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            {['H', 'e', 'l', 'l', 'o', ','].map((char, i) => (
                                <span key={i} className="inline-block">
                                    {char}
                                </span>
                            ))}
                        </h1>

                        {/* Main Title */}
                        <h2
                            ref={subtitleRef}
                            className="text-2xl md:text-5xl font-black text-white mb-4"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            I'm <span className="text-white">Bonamukkala Saivenkata Reddy</span>
                        </h2>

                        {/* Role */}
                        <p
                            ref={roleRef}
                            className="text-lg md:text-2xl text-white font-bold mb-6 uppercase tracking-widest"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Tech-Driven Problem Solver
                        </p>

                        {/* Description */}
                        <p
                            ref={descriptionRef}
                            className="text-sm md:text-base text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            Technology is my toolkit, not my identity. I solve real-world problems by choosing what works — mobile, web, cloud, or code from scratch.
                        </p>

                        {/* Buttons */}
                        <div
                            ref={buttonsRef}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <a
                                href="#contact"
                                className="group flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white hover:border-2 hover:border-white transition-all duration-300"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                <EmailIcon sx={{ fontSize: 22 }} />
                                Get in Touch
                            </a>
                            <a
                                href="#projects"
                                className="flex items-center gap-3 px-10 py-5 border-2 border-white text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                <CodeOffIcon sx={{ fontSize: 22 }} />
                                View My Work
                            </a>
                        </div>
                    </div>
                </div>

                {/* Quick Links Cards - With Text Labels */}
                <div className="grid grid-cols-4 md:grid-cols-4 gap-5 md:gap-9">
                    {quickLinks.map((link, index) => (
                        <a
                            key={link.title}
                            href={link.href}
                            ref={el => cardsRef.current[index] = el}
                            className="group block"
                        >
                            <div className="bg-black backdrop-blur-xl border-2 border-white/10 rounded-3xl p-6 text-center hover:bg-white hover:border-white transition-all duration-300">
                                {/* Icon */}
                                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-white rounded-2xl border-2 border-white/10 group-hover:bg-black group-hover:border-black transition-all duration-300">
                                    {React.cloneElement(link.icon, {
                                        sx: {
                                            fontSize: 32,
                                            color: 'black',
                                        },
                                        className: 'group-hover:!text-white transition-all duration-300'
                                    })}
                                </div>

                                {/* Title */}
                                <p
                                    className="text-xs md:text-sm font-black text-white uppercase tracking-widest group-hover:text-black transition-all duration-300"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    {link.title}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
