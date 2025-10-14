// src/components/Skills.js
import React from 'react';

const skills = ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'GSAP', 'HTML5', 'CSS3', 'Git', 'Figma'];

const Skills = () => {
    return (
        <section id="skills" className="py-20 px-6 bg-pure-white">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-5xl font-bold mb-12">Skills</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {skills.map((skill) => (
                        <div key={skill} className="font-bold text-lg border-2 border-pure-black px-6 py-3">
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;