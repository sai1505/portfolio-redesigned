// src/components/Projects.js
import React from 'react';

const projects = [
    { id: 1, title: 'Project One', description: 'A brief and clean description of this project.' },
    { id: 2, title: 'Project Two', description: 'A brief and clean description of this project.' },
    { id: 3, title: 'Project Three', description: 'A brief and clean description of this project.' },
    { id: 4, title: 'Project Four', description: 'A brief and clean description of this project.' },
];

const Projects = () => {
    return (
        <section id="projects" className="min-h-screen py-20 px-6 bg-pure-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-12">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group border-2 border-pure-black p-8 hover:bg-pure-black hover:text-pure-white transition-colors duration-300"
                        >
                            <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                            <p className="text-lg">{project.description}</p>
                            <a href="#" className="inline-block mt-4 font-bold text-lg relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-pure-black group-hover:after:bg-pure-white">
                                View Project
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;