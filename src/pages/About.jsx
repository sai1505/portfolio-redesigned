// src/components/About.js
import React from 'react';

const About = () => {
    return (
        <section id="about" className="min-h-screen flex items-center py-20 px-6 bg-pure-white">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-5xl font-bold mb-6">About Me</h2>
                    <p className="text-xl leading-relaxed">
                        I'm a developer passionate about creating clean, functional, and visually appealing web experiences. My design philosophy is rooted in minimalism, focusing on typography, white space, and impactful simplicity. I build with React, Tailwind CSS, and a strong cup of coffee.
                    </p>
                </div>
                <div className="w-full h-80 border-2 border-pure-black flex items-center justify-center">
                    <span className="font-bold text-lg">Your Image Placeholder</span>
                </div>
            </div>
        </section>
    );
};

export default About;