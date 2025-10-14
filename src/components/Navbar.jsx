import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function SpiderWebLogo() {
    const meshRef = useRef();
    const linesRef = useRef();

    const webGeometry = useMemo(() => {
        const points = [];
        const centerRadius = 0.2;
        const rings = 4;
        const pointsPerRing = 8;

        points.push(new THREE.Vector3(0, 0, 0));

        for (let ring = 1; ring <= rings; ring++) {
            const radius = centerRadius + (ring * 0.15);
            for (let i = 0; i < pointsPerRing; i++) {
                const angle = (i / pointsPerRing) * Math.PI * 2;
                points.push(new THREE.Vector3(
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    (Math.random() - 0.5) * 0.1
                ));
            }
        }

        return points;
    }, []);

    const webLines = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const centerRadius = 0.2;
        const rings = 4;
        const pointsPerRing = 8;

        for (let i = 0; i < pointsPerRing; i++) {
            positions.push(0, 0, 0);

            for (let ring = 1; ring <= rings; ring++) {
                const radius = centerRadius + (ring * 0.15);
                const angle = (i / pointsPerRing) * Math.PI * 2;
                positions.push(
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    (Math.random() - 0.5) * 0.1
                );
            }
        }

        for (let ring = 1; ring <= rings; ring++) {
            const radius = centerRadius + (ring * 0.15);
            for (let i = 0; i < pointsPerRing; i++) {
                const angle1 = (i / pointsPerRing) * Math.PI * 2;
                const angle2 = ((i + 1) / pointsPerRing) * Math.PI * 2;

                positions.push(
                    Math.cos(angle1) * radius,
                    Math.sin(angle1) * radius,
                    (Math.random() - 0.5) * 0.1
                );
                positions.push(
                    Math.cos(angle2) * radius,
                    Math.sin(angle2) * radius,
                    (Math.random() - 0.5) * 0.1
                );
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        return geometry;
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += 0.005;
            const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
            meshRef.current.scale.set(scale, scale, scale);
        }

        if (linesRef.current) {
            linesRef.current.material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <group ref={meshRef}>
                <lineSegments ref={linesRef} geometry={webLines}>
                    <lineBasicMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.6}
                        linewidth={1}
                    />
                </lineSegments>

                {webGeometry.map((point, index) => (
                    <mesh key={index} position={point}>
                        <sphereGeometry args={[0.02, 8, 8]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            transparent
                            opacity={index === 0 ? 1 : 0.8}
                        />
                    </mesh>
                ))}
            </group>
        </Float>
    );
}

// Three.js Geometric Shapes with Parallax Movement
function GeometricShapes({ scrollProgress, mousePosition }) {
    const groupRef = useRef();
    const shapesRefs = useRef([]);
    const { viewport } = useThree();

    const shapes = useMemo(() => {
        return Array.from({ length: 25 }, (_, i) => ({
            id: i,
            type: ['circle', 'square', 'triangle', 'hexagon'][i % 4],
            basePosition: [
                (Math.random() - 0.5) * viewport.width * 2,
                (Math.random() - 0.5) * viewport.height * 2,
                (Math.random() - 0.5) * 15
            ],
            rotation: [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            ],
            scale: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.3
        }));
    }, [viewport.width, viewport.height]);

    useFrame((state) => {
        shapesRefs.current.forEach((shape, index) => {
            if (shape && shapes[index]) {
                shape.rotation.x += 0.001 * (index % 2 === 0 ? 1 : -1);
                shape.rotation.y += 0.002 * (index % 3 === 0 ? 1 : -1);

                const parallaxY = scrollProgress * shapes[index].speed * 5;
                const parallaxX = scrollProgress * shapes[index].speed * 2 * (index % 2 === 0 ? 1 : -1);

                const mouseX = mousePosition.x * shapes[index].speed * 2;
                const mouseY = mousePosition.y * shapes[index].speed * 2;

                shape.position.x = shapes[index].basePosition[0] + parallaxX + mouseX;
                shape.position.y = shapes[index].basePosition[1] + parallaxY + mouseY;
                shape.position.z = shapes[index].basePosition[2];
            }
        });
    });

    const createShape = (type, scale) => {
        switch (type) {
            case 'circle':
                return <ringGeometry args={[scale * 0.8, scale, 32]} />;
            case 'square':
                return <boxGeometry args={[scale, scale, 0.1]} />;
            case 'triangle':
                return <coneGeometry args={[scale, scale * 1.5, 3]} />;
            case 'hexagon':
                return <cylinderGeometry args={[scale, scale, 0.1, 6]} />;
            default:
                return <ringGeometry args={[scale * 0.8, scale, 32]} />;
        }
    };

    return (
        <group ref={groupRef}>
            {shapes.map((shape, index) => (
                <mesh
                    key={shape.id}
                    ref={(el) => (shapesRefs.current[index] = el)}
                    position={shape.basePosition}
                    rotation={shape.rotation}
                    scale={shape.scale}
                >
                    {createShape(shape.type, 1)}
                    <meshBasicMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.4}
                        wireframe
                    />
                </mesh>
            ))}
        </group>
    );
}

export default function Navbar() {
    const [activeLink, setActiveLink] = useState('Home');
    const [morphStyle, setMorphStyle] = useState({ left: 392.101, width: 81.6203 });
    const linksRef = useRef([]);
    const logoRef = useRef(null);
    const navContainerRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const lastScrollY = useRef(0);

    useEffect(() => {
        if (navContainerRef.current) {
            navContainerRef.current.style.opacity = '0';
            navContainerRef.current.style.transform = 'translateY(-50px)';

            setTimeout(() => {
                if (navContainerRef.current) {
                    navContainerRef.current.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    navContainerRef.current.style.opacity = '1';
                    navContainerRef.current.style.transform = 'translateY(0)';
                }
            }, 100);
        }

        // GSAP ScrollTrigger for navbar hide/show
        const showAnim = gsap.from(navContainerRef.current, {
            yPercent: -100,
            paused: true,
            duration: 0.4,
            ease: 'power2.out'
        }).progress(1);

        ScrollTrigger.create({
            start: 'top top',
            end: 'max',
            onUpdate: (self) => {
                if (self.direction === -1) {
                    // Scrolling up - show navbar
                    showAnim.play();
                } else {
                    // Scrolling down - hide navbar
                    showAnim.reverse();
                }
            }
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollY / maxScroll;
            setScrollProgress(progress);

            // Scale effect only when visible
            if (navContainerRef.current && scrollY > 50) {
                navContainerRef.current.style.transform = 'scale(0.95) translateY(0)';
            } else if (navContainerRef.current) {
                navContainerRef.current.style.transform = 'scale(1) translateY(0)';
            }

            lastScrollY.current = scrollY;
        };

        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            setMousePosition({ x, y });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleLinkClick = (link, index) => {
        if (isAnimating) return;

        setActiveLink(link);
        setIsAnimating(true);

        const linkElement = linksRef.current[index];
        if (linkElement && navContainerRef.current) {
            const rect = linkElement.getBoundingClientRect();
            const navRect = navContainerRef.current.getBoundingClientRect();
            const left = rect.left - navRect.left;
            const width = rect.width;

            setMorphStyle({ left: left - 37, width: width + 8 });

            linkElement.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            linkElement.style.transform = 'scale(0.5)';

            setTimeout(() => {
                linkElement.style.transform = 'scale(1)';
                setTimeout(() => setIsAnimating(false), 300);
            }, 100);
        }
    };

    const handleLinkHover = (index, isEntering) => {
        const linkElement = linksRef.current[index];
        if (linkElement) {
            linkElement.style.transition = 'transform 0.3s ease';
            if (isEntering) {
                linkElement.style.transform = 'translateY(-5px) scale(1.05)';
            } else {
                linkElement.style.transform = 'translateY(0) scale(1)';
            }
        }
    };

    const navLinks = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

    return (
        <div className="min-h-10 bg-black relative overflow-hidden">
            {/* Three.js Geometric Background */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden'
                }}
            >
                <Canvas
                    camera={{ position: [0, 0, 15], fov: 75 }}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <ambientLight intensity={0.5} />
                    <GeometricShapes scrollProgress={scrollProgress} mousePosition={mousePosition} />
                </Canvas>
            </div>

            {/* Navbar with GSAP Hide/Show */}
            <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-8">
                <div
                    ref={navContainerRef}
                    className="max-w-4xl mx-auto bg-black backdrop-blur-xl border-2 border-white/10 rounded-full px-8 py-4"
                    style={{
                        transition: 'transform 0.3s ease'
                    }}
                >
                    <div className="flex items-center justify-between relative">
                        <div
                            className="absolute top-1/2 -translate-y-1/2 h-10 bg-white rounded-full -z-10"
                            style={{
                                left: `${morphStyle.left}px`,
                                width: `${morphStyle.width}px`,
                                backdropFilter: 'blur(20px)',
                                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                        />

                        <div ref={logoRef} className="flex items-center gap-3 z-10">
                            <div className="w-10 h-10">
                                <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                                    <ambientLight intensity={0.5} />
                                    <pointLight position={[10, 10, 10]} />
                                    <SpiderWebLogo />
                                </Canvas>
                            </div>
                            <a
                                href="#"
                                className="text-2xl font-black tracking-tight text-white"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                BSVR
                            </a>
                        </div>

                        <div className="flex items-center gap-1">
                            {navLinks.map((link, index) => (
                                <div
                                    key={link}
                                    className="relative px-4 py-2"
                                    ref={el => linksRef.current[index] = el}
                                >
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="text-xs font-bold tracking-wider uppercase cursor-pointer relative z-10"
                                        style={{
                                            fontFamily: "'Poppins', sans-serif",
                                            color: activeLink === link ? '#000000ff' : 'rgba(255, 255, 255, 0.5)',
                                            transition: 'color 0.3s ease'
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLinkClick(link, index);
                                        }}
                                        onMouseEnter={() => handleLinkHover(index, true)}
                                        onMouseLeave={() => handleLinkHover(index, false)}
                                    >
                                        {link}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
