import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DownloadIcon from '@mui/icons-material/Download';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

gsap.registerPlugin(ScrollTrigger);

const identities = [
    {
        label: 'App Development',
        description: 'Building scalable, high-quality mobile apps with clean architecture.',
    },
    {
        label: 'UI/UX Design',
        description: 'Designing intuitive and visually polished interfaces for real users.',
    },
    {
        label: 'Tech Agnostic Solution',
        description: 'Choosing the right technology for the problem—and not the other way around.',
    },
    {
        label: 'Performance Optimization',
        description: 'Fixing bottlenecks and speeding up apps, websites, and APIs.',
    },
    {
        label: 'Real-Time Problem Solver',
        description: 'Debugging complex issues and delivering fast, reliable solutions.',
    },
    {
        label: 'Full Stack Web Development',
        description: 'End-to-end web apps—from backend logic to sleek frontend UI.',
    }
];


const education = [
    {
        degree: 'B.Tech Computer Science',
        institution: 'JNTU Kakinada',
        years: '2022 - 2026',
    },
    {
        degree: 'Intermediate (MPC)',
        institution: 'Sri Chaitanya',
        years: '2020 - 2022',
    }
];

export default function About() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const bioRef = useRef(null);
    const identitiesRef = useRef([]);
    const educationRef = useRef([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title entrance
            gsap.from(titleRef.current.children, {
                opacity: 0,
                y: 100,
                duration: 1.2,
                stagger: 0.08,
                ease: 'power4.out',
                delay: 0.3
            });

            // Bio section
            gsap.from(bioRef.current, {
                opacity: 0,
                y: 60,
                duration: 1,
                delay: 0.8,
                ease: 'power3.out'
            });

            // Identity cards scroll trigger
            ScrollTrigger.batch(identitiesRef.current, {
                onEnter: (batch) => {
                    gsap.from(batch, {
                        opacity: 0,
                        y: 80,
                        duration: 0.9,
                        stagger: 0.15,
                        ease: 'power3.out'
                    });
                },
                start: 'top 85%'
            });

            // Education cards
            ScrollTrigger.batch(educationRef.current, {
                onEnter: (batch) => {
                    gsap.from(batch, {
                        opacity: 0,
                        x: -60,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: 'power3.out'
                    });
                },
                start: 'top 85%'
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (index, ref) => {
        setHoveredIndex(index);
        gsap.to(ref, {
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = (ref) => {
        setHoveredIndex(null);
        gsap.to(ref, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
        });
    };

    return (
        <div ref={containerRef} className="min-h-screen pt-32 pb-20 px-8 bg-black">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <h1 ref={titleRef} className="text-6xl md:text-8xl font-black text-white text-center mb-20 tracking-tight"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {['W', 'h', 'o', ' ', 'I', ' ', 'A', 'm'].map((char, i) => (
                        <span key={i} className="inline-block" style={{ marginRight: char === ' ' ? '1.5rem' : '0' }}>
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>

                {/* Bio Section */}
                <div ref={bioRef} className="bg-black border-2 border-white/10 rounded-[3rem] px-8 md:px-16 py-16 mb-20">
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-12 max-w-4xl mx-auto text-center text-justify">
                        Computer Science undergraduate with a deep-seated passion for problem-solving.
                        I leverage hands-on experience in Java, Python, mobile app development, and data science to deliver impactful solutions for real-world challenges.
                        I have a proven record of building scalable projects and am driven by my interests in machine learning, full-stack development, and open-source advocacy.
                    </p>


                    <div className="flex flex-wrap gap-6 justify-center items-center">
                        <a href="/resume.pdf" download
                            className="flex items-center gap-3 px-24 py-4 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-black hover:text-white hover:border-2 hover:border-white transition-all duration-300"
                            style={{ fontFamily: "'Poppins', sans-serif" }}>
                            <DownloadIcon sx={{ fontSize: 20 }} />
                            Resume
                        </a>
                    </div>
                </div>

                {/* Identity Cards with Hover Reveal */}
                <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-16 uppercase tracking-widest"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    What I Do
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    {identities.map((identity, index) => (
                        <div
                            key={identity.label}
                            ref={el => identitiesRef.current[index] = el}
                            onMouseEnter={(e) => handleMouseEnter(index, e.currentTarget)}
                            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                            className="relative bg-black border-2 border-white/10 rounded-3xl p-10 md:p-12 overflow-hidden cursor-default group"
                        >
                            {/* Background reveal overlay */}
                            <div className={`absolute inset-0 bg-white transition-all duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
                                style={{ zIndex: 1 }} />

                            <div className="relative" style={{ zIndex: 2 }}>
                                <h3 className={`text-3xl md:text-4xl font-black mb-6 transition-colors duration-500 ${hoveredIndex === index ? 'text-black' : 'text-white'}`}
                                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    {identity.label}
                                </h3>

                                <p className={`text-base md:text-lg leading-relaxed mb-6 transition-colors duration-500 ${hoveredIndex === index ? 'text-black/80' : 'text-white/70'}`}>
                                    {identity.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Education */}
                <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-16 uppercase tracking-widest"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Education
                </h2>

                <div className="space-y-6 max-w-3xl mx-auto">
                    {education.map((edu, index) => (
                        <div
                            key={edu.degree}
                            ref={el => educationRef.current[index] = el}
                            className="bg-black border-2 border-white/10 rounded-3xl p-8 md:p-10 hover:border-white/30 transition-all duration-300 tracking-wide"
                        >
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2"
                                style={{ fontFamily: "'Poppins', sans-serif" }}>
                                {edu.degree}
                            </h3>
                            <p className="text-white/70 text-lg mb-1">{edu.institution}</p>
                            <p className="text-white/50 text-sm font-mono">{edu.years}</p>
                        </div> 
                    ))}
                </div>
            </div>
        </div>
    );
}
