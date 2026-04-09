import type React from "react";
import { useEffect, useState } from "react";
import { useFigletText } from '../hooks/useFigletText';
import { navLinks } from '../constants/headerConstants';

const Header: React.FC = () => {
    const headerAsciiArt = useFigletText('zech yeo', { font: 'miniwi' });
    const [asciiBorder, setAsciiBorder] = useState('+-+');

    // Responsive ASCII border
    useEffect(() => {
        function updateBorder() {
            // Estimate characters per line based on window width and monospace font size (8px per char is a rough estimate)
            const charWidth = 8; // px per monospace char (adjust if needed)
            const chars = Math.floor(window.innerWidth / charWidth);

            const scaleFactor = 0.008;

            console.log(`${12/window.innerWidth}`);
            setAsciiBorder('+' + '-'.repeat(chars - Math.floor(window.outerWidth * scaleFactor)) + '+');
        }
        updateBorder();
        window.addEventListener('resize', updateBorder);
        return () => window.removeEventListener('resize', updateBorder);
    });

    return (
        <>
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
                    {navLinks.map((link, idx) => (
                        <div className="flex flex-row items-center gap-6 md:gap-10" key={link.label}>
                            <a
                                href={link.href}
                                className="text-terminal-green text-base md:text-2xl hover:underline hover:text-terminal-green transition-colors"
                            >
                                {link.label}
                            </a>
                            {idx < navLinks.length - 1 && (
                                <span className="h-6 w-px bg-terminal-green mx-2 inline-block" aria-hidden="true"></span>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
            <pre className="w-full text-terminal-green text-xs md:text-sm select-none leading-none mt-0 overflow-hidden whitespace-pre m-0 p-0">
                {asciiBorder}
            </pre>
        </header>
        </>
    );
};

export default Header;