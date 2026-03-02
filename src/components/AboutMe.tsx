import React from 'react';
import Header from './NavBar';
import { useFigletText } from '../hooks/useFigletText';

const AboutMe: React.FC = () => {

    const aboutMeAsciiArt = useFigletText('about me', { font: 'Modular' });

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
                <div className="min-h-20 md:min-h-30 flex items-center justify-center w-full overflow-hidden">
                    <pre className="text-terminal-green whitespace-pre leading-none tracking-tighter text-[clamp(6px,1.5vw,14px)] md:text-[clamp(10px,2vw,18px)] origin-center scale-[0.85] md:scale-100  select-none">
                        {aboutMeAsciiArt}
                    </pre>
                </div>

                <div>
                    <p className="text-white text-center text-sm md:text-2xl tracking-wide px-4">
                        I'm Zech, a passionate software engineer with a love for crafting elegant solutions to complex problems. With a background in full-stack development, I enjoy working on projects that challenge me to learn and grow. When I'm not coding, you can find me exploring the latest tech trends, gaming, or indulging in my love for sci-fi. I'm always eager to connect with fellow developers and collaborate on exciting projects!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
