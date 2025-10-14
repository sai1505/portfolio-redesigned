import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CodeIcon from '@mui/icons-material/Code';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const socialLinks = [
        { name: 'GitHub', icon: <GitHubIcon />, url: 'https://github.com/yourusername' },
        { name: 'HackerRank', icon: <CodeIcon />, url: 'https://hackerrank.com/yourusername' },
        { name: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://linkedin.com/in/yourusername' },
        { name: 'YouTube', icon: <YouTubeIcon />, url: 'https://youtube.com/@yourusername' },
    ];


    return (
        <footer className="relative bg-transparent py-8 px-8">
            <div className="max-w-4xl mx-auto">
                {/* Compact Footer - Single Line Pill */}
                <div
                    className="bg-black backdrop-blur-xl border-2 border-white/10 rounded-full px-8 py-6 shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Copyright - Centered left */}
                        <div className="border-t border-white/10 text-left">
                            <p className="text-sm font-medium text-white/50">
                                © {currentYear} BSVR. All Rights Reserved • Design is the Key.
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center border-2 border-white/20 rounded-full text-white/50 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                                    title={social.name}
                                >
                                    {React.cloneElement(social.icon, {
                                        sx: { fontSize: 20 }
                                    })}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
