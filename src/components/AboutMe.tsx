import React from 'react';
import Header from './NavBar';
import { useFigletText } from '../hooks/useFigletText';
import ImageFrame from './ImageFrame';

const AboutMe: React.FC = () => {
    const imagePath = "/assets/images/zech.webp";
    const titleAsciiArt = useFigletText('Hi, I\'m', { font: 'Modular' });
    const nameAsciiArt = useFigletText('Zech', { font: 'Modular' });

    return (
        <div className="relative w-full min-h-dvh bg-black flex flex-col items-center justify-start overflow-hidden cursor-text p-0">
            {/* CRT Effects */}
            <div className="crt-overlay pointer-events-none absolute inset-0 z-20" />
            <div className="scanlines pointer-events-none absolute inset-0 z-20" />
            {/* Curved Screen Effect */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10" />

            <Header />

            {/* Main Content (with padding for header) */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-16 z-0 w-full max-w-7xl relative pt-32 md:pt-40 px-6 md:px-12">
                
                {/* Left Side: Text Content */}
                <div className="flex-1 flex flex-col items-center md:items-start max-w-2xl">
                    <div className="min-h-20 md:min-h-30 flex items-center justify-center md:justify-start w-full overflow-hidden mb-6">
                        <div className="flex flex-row items-center origin-center md:origin-left scale-[0.50] md:scale-85">
                            <pre className="text-terminal-green whitespace-pre leading-none tracking-tighter text-[clamp(6px,1.5vw,14px)] md:text-[clamp(10px,1.8vw,16px)] select-none">
                                {titleAsciiArt}
                            </pre>
                            <pre className="text-terminal-purple whitespace-pre leading-none tracking-tighter text-[clamp(6px,1.5vw,14px)] md:text-[clamp(10px,1.8vw,16px)] select-none ml-4">
                                {nameAsciiArt}
                            </pre>
                        </div>
                    </div>

                    <div>
                        <p className="text-white text-center md:text-left text-lg md:text-2xl md:leading-relaxed tracking-wide">
                            TLDR: I'm a guy who likes to code and make things.
                        </p>
                        <p className="mt-6 text-white text-center md:text-left text-lg md:text-2xl md:leading-relaxed tracking-wide">
                            but the long story is that i've always liked making stuff and ive ended up gaining too many random but useful skills as part of that passion
                        </p>
                        <p className="mt-6 text-white text-center md:text-left text-lg md:text-2xl md:leading-relaxed tracking-wide">
                            from electronics, to CAD, to 3d printing, to sewing, to coding, etc 
                        </p>
                    </div>
                </div>

                {/* Right Side: Retro Window with Image */}
                <ImageFrame 
                    src={imagePath} 
                    alt="Zech" 
                    className="mt-8 md:mt-0"
                />
            </div>
        </div>
    );
};

export default AboutMe;
