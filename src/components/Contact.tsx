import React from 'react';
import { useFigletText } from '../hooks/useFigletText';
import { contactLinks } from '../constants/contactContents';
import Header from './NavBar';

const Contact: React.FC = () => {
    const contactMeAsciiArt = useFigletText('contact me', { font: 'Modular' });

    return (
        <div className="relative w-full min-h-dvh bg-black flex flex-col items-center justify-start overflow-hidden cursor-text p-0">
            {/* CRT Effects */}
            <div className="crt-overlay pointer-events-none absolute inset-0 z-20" />
            <div className="scanlines pointer-events-none absolute inset-0 z-20" />
            {/* Curved Screen Effect */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10" />

            <Header />

            {/* Main Content (with padding for header) */}
            <div className="flex flex-col items-center gap-4 md:gap-6 z-0 w-full max-w-4xl relative pt-32 md:pt-36">
                {/* ASCII Art Header (now below nav) */}
                <div className="min-h-20 md:min-h-30 flex items-center justify-center w-full overflow-hidden">
                    <pre className="text-terminal-cyan whitespace-pre leading-none tracking-tighter text-[clamp(6px,1.5vw,14px)] md:text-[clamp(10px,2vw,18px)] origin-center scale-[0.85] md:scale-100  select-none">
                        {contactMeAsciiArt}
                    </pre>
                </div>

                <div>
                    <p className="text-white text-center text-sm md:text-2xl tracking-wide px-4">
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
                               className={`flex items-center justify-center p-6 gap-6 rounded-xl text-terminal-cyan/80 chromatic-aberration`}
                        >
                            <div className={`flex items-center gap-4 ${link.color} hover:text-white transition-colors text-2xl md:text-3xl font-bold`}>
                                <span className="mr-3 text-3xl md:text-4xl chromatic-text">{link.icon}</span>
                                <span className="chromatic-text">{link.label}</span>
                            </div>
                        </a>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Contact;
