// src/components/Contact.js
import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="h-[60vh] flex flex-col items-center justify-center text-center py-20 px-6 bg-pure-white">
            <h2 className="text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-2xl max-w-2xl mb-8">
                Have a project in mind or just want to say hello? I’d love to hear from you.
            </p>
            <a href="mailto:your-email@example.com" className="font-bold text-xl border-2 border-pure-black px-8 py-4 hover:bg-pure-black hover:text-pure-white transition-colors duration-300">
                Say Hello
            </a>
        </section>
    );
};

export default Contact;