import React, { useState, useEffect } from 'react';
import figlet from 'figlet';
import { contactLinks } from '../constants/contactContents';

const navLinks = [
    { label: 'About Me', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

const Contact: React.FC = () => {
    const [headerAsciiArt, setHeaderAsciiArt] = useState('');
    const [contactMeAsciiArt, setContactMeAsciiArt] = useState('');
    const [asciiBorder, setAsciiBorder] = useState('+-------------------------------------------------------------------------------+');

    // Responsive ASCII border
    useEffect(() => {
        function updateBorder() {
            // Estimate characters per line based on window width and monospace font size (8px per char is a rough estimate)
            const charWidth = 8; // px per monospace char (adjust if needed)
            const minChars = 30;
            const maxChars = 200;
            const chars = Math.max(minChars, Math.min(maxChars, Math.floor(window.innerWidth / charWidth)));
            setAsciiBorder('+' + '-'.repeat(chars - 12) + '+');
        }
        updateBorder();
        window.addEventListener('resize', updateBorder);
        return () => window.removeEventListener('resize', updateBorder);
    }, []);

    useEffect(() => {
        figlet.text('contact me', { font: 'Modular' }, (err, data) => {
            if (err) {
                console.error('Error generating ASCII art:', err);
                return;
            }
            setContactMeAsciiArt(data?.toString() || 'Contact Me');
        });

        figlet.text('zech yeo', { font: 'miniwi' }, (err, data) => {
            if (err) {
                console.error('Error generating ASCII art:', err);
                return;
            }
            setHeaderAsciiArt(data?.toString() || 'zech yeo');
        });
    });

    return (
        <div className="relative w-full min-h-dvh bg-black flex flex-col items-center justify-start overflow-hidden cursor-text p-0">
            {/* CRT Effects */}
            <div className="crt-overlay pointer-events-none absolute inset-0 z-20" />
            <div className="scanlines pointer-events-none absolute inset-0 z-20" />
            {/* Curved Screen Effect */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10" />

            {/* Fixed Header */}
            <header className="fixed top-0 left-0 w-full z-30 flex flex-col ">
                {/* Responsive ASCII box border header */}
                <pre className="w-full text-terminal-green text-xs md:text-sm select-none leading-none mb-0 overflow-hidden whitespace-pre m-0 p-0">
                    {asciiBorder}
                </pre>
                <div className="flex items-center justify-between w-full px-6 py-2 bg-black border-l-2 border-r-2 border-terminal-green">
                    <button
                        className='cursor-pointer'
                        onClick={() => { window.location.href = '/'; }}
                        aria-label="Go to home"
                    >
                        <pre className="text-terminal-green font-mono text-xs md:text-sm font-bold leading-none m-0 p-0 select-none bg-transparent border-none shadow-none whitespace-pre" style={{lineHeight:1}}>
                            {headerAsciiArt}
                        </pre>
                    </button>
                    <nav className="flex gap-6 md:gap-10">
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-terminal-cyan text-base md:text-lg hover:underline hover:text-terminal-green transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
                <pre className="w-full text-terminal-green text-xs md:text-sm select-none leading-none mt-0 overflow-hidden whitespace-pre m-0 p-0">
                    {asciiBorder}
                </pre>
            </header>

            {/* Main Content (with padding for header) */}
            <div className="flex flex-col items-center gap-4 md:gap-6 z-0 w-full max-w-4xl relative pt-32 md:pt-36">
                {/* ASCII Art Header (now below nav) */}
                <div className="min-h-20 md:min-h-30 flex items-center justify-center w-full overflow-hidden">
                    <pre className="text-white whitespace-pre leading-none tracking-tighter text-[clamp(6px,1.5vw,14px)] md:text-[clamp(10px,2vw,18px)] origin-center scale-[0.85] md:scale-100  select-none">
                        {contactMeAsciiArt}
                    </pre>
                </div>

                <div>
                    <p className="text-white text-center text-sm md:text-base tracking-wide max-w-2xl px-4">
                        I'm always open to connecting and collaborating! Whether you have a project in mind, want to chat about tech, or just want to say hi, feel free to reach out through any of the platforms below. Looking forward to hearing from you!
                    </p>
                </div>

                {/* Contact Links */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4 px-2">
                    {contactLinks.map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center p-6 gap-6 rounded-xl text-terminal-cyan/80`}
                        >
                            <div className={`flex items-center gap-4 ${link.color} hover:text-white transition-colors text-2xl md:text-3xl font-bold`}>
                                <span className="mr-3 text-3xl md:text-4xl">{link.icon}</span>
                                <span>{link.label}</span>
                            </div>
                        </a>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Contact;
