import type React from "react";
import { useEffect, useState } from "react";
import figlet from 'figlet';
import { navLinks } from '../constants/headerConstants';

const Header: React.FC = () => {
    const [headerAsciiArt, setHeaderAsciiArt] = useState('');
    const [asciiBorder, setAsciiBorder] = useState('+-+');

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
    });

    useEffect(() => {
        figlet.text('zech yeo', { font: 'miniwi' }, (err, data) => {
            if (err) {
                console.error('Error generating ASCII art:', err);
                return;
            }
            setHeaderAsciiArt(data?.toString() || 'zech yeo');
        });
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
        </>
    );
};

export default Header;