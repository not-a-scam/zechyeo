import figlet from 'figlet';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TERMINAL_CONTENT } from '../constants/terminalContent';

type TerminalStep = 'IDLE' | 'NAME' | 'TAGLINE' | 'DIVIDER' | 'QUESTION' | 'OPTIONS' | 'COMPLETE';

const Terminal: React.FC = () => {
    const [step, setStep] = useState<TerminalStep>('IDLE');
    const [name, setName] = useState<string>("");
    const [tagline, setTagline] = useState<string>("");
    const [divider, setDivider] = useState<string>("");
    const [dynamicDivider, setDynamicDivider] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const [visibleOptionsCount, setVisibleOptionsCount] = useState<number>(0);
    const [userInput, setUserInput] = useState<string>("");
    const navigate = useNavigate();
    
    const inputRef = useRef<HTMLInputElement>(null);
    const { 
        targetName, 
        targetTagline, 
        targetQuestion, 
        targetOptions, 
        TYPING_SPEEDS,
        TIMINGS 
    } = TERMINAL_CONTENT;

    // Initialize figlet and calculate dynamic divider
    useEffect(() => {
        figlet.defaults({ fontPath: "/fonts" });
        
        const calculateDivider = () => {
            const width = window.innerWidth;
            const padding = 64; // px-8 (32px * 2)
            const maxContainerWidth = 896; // max-w-4xl
            const availableWidth = Math.min(width, maxContainerWidth) - padding;
            
            const isMobile = width < 768;
            const fontSize = isMobile ? 18 : 20; // text-lg (18px) vs text-xl (20px)
            const tracking = isMobile ? 0.3 * fontSize : 0.5 * fontSize;
            
            const span = document.createElement('span');
            span.style.fontFamily = '"VT323", monospace';
            span.style.fontSize = `${fontSize}px`;
            span.style.letterSpacing = `${tracking}px`;
            span.style.visibility = 'hidden';
            span.style.position = 'absolute';
            span.style.whiteSpace = 'nowrap';
            span.innerText = '-';
            document.body.appendChild(span);
            const charWidth = span.getBoundingClientRect().width;
            document.body.removeChild(span);
            
            if (charWidth > 0) {
                const count = Math.floor(availableWidth / charWidth);
                setDynamicDivider("-".repeat(Math.max(2, count)));
            }
        };

        calculateDivider();
        window.addEventListener('resize', calculateDivider);

        const timer = setTimeout(() => setStep('NAME'), TIMINGS.INITIAL_DELAY);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculateDivider);
        };
    }, [TIMINGS.INITIAL_DELAY]);

    // Name Typing (Figlet)
    useEffect(() => {
        if (step !== 'NAME') return;

        let nameIndex = 0;
        let isCancelled = false;

        const typeName = () => {
            if (isCancelled) return;
            
            const currentText = targetName.slice(0, nameIndex);
            figlet.text(currentText, { font: "Modular" }, (err, data) => {
                if (err) {
                    console.error('Figlet error:', err);
                    return;
                }
                if (data) setName(data);
                
                if (nameIndex < targetName.length) {
                    nameIndex++;
                    setTimeout(typeName, TYPING_SPEEDS.NAME);
                } else {
                    setTimeout(() => setStep('TAGLINE'), TIMINGS.NAME_FINISH_PAUSE);
                }
            });
        };

        typeName();
        return () => { isCancelled = true; };
    }, [step, targetName, TYPING_SPEEDS.NAME, TIMINGS.NAME_FINISH_PAUSE]);

    // Generic Typewriter for Tagline, Divider, and Question
    useEffect(() => {
        const typingSteps: TerminalStep[] = ['TAGLINE', 'DIVIDER', 'QUESTION'];
        if (!typingSteps.includes(step)) return;

        let target = "";
        let setFn: React.Dispatch<React.SetStateAction<string>> = () => {};
        let speed = TYPING_SPEEDS.QUESTION;
        let nextStep: TerminalStep = 'OPTIONS';

        if (step === 'TAGLINE') {
            target = targetTagline;
            setFn = setTagline;
            speed = TYPING_SPEEDS.TAGLINE;
            nextStep = 'DIVIDER';
        } else if (step === 'DIVIDER') {
            target = dynamicDivider
            setFn = setDivider;
            speed = TYPING_SPEEDS.DIVIDER;
            nextStep = 'QUESTION';
        } else if (step === 'QUESTION') {
            target = targetQuestion;
            setFn = setQuestion;
            speed = TYPING_SPEEDS.QUESTION;
            nextStep = 'OPTIONS';
        }

        let index = 0;
        const interval = setInterval(() => {
            setFn(target.slice(0, index + 1));
            index++;
            if (index >= target.length) {
                clearInterval(interval);
                setTimeout(() => setStep(nextStep), TIMINGS.STEP_PAUSE);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [step, targetTagline, targetQuestion, dynamicDivider, TYPING_SPEEDS, TIMINGS.STEP_PAUSE]);

    // Options Appearing
    useEffect(() => {
        if (step !== 'OPTIONS') return;

        let count = 0;
        const interval = setInterval(() => {
            count++;
            setVisibleOptionsCount(count);
            if (count >= targetOptions.length) {
                clearInterval(interval);
                setStep('COMPLETE');
            }
        }, TYPING_SPEEDS.OPTIONS);

        return () => clearInterval(interval);
    }, [step, targetOptions.length, TYPING_SPEEDS.OPTIONS]);

    // Focus input on complete
    useEffect(() => {
        if (step === 'COMPLETE') {
            inputRef.current?.focus();
        }
    }, [step]);

    const handleNavigate = useCallback((option: string) => {
        const path = `/${option.toLowerCase().replace(/\s+/g, '-')}`;
        navigate(path);
    }, [navigate]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const input = userInput.trim().toLowerCase();
            const optionIndex = parseInt(input) - 1;
            
            if (!isNaN(optionIndex) && targetOptions[optionIndex]) {
                handleNavigate(targetOptions[optionIndex]);
            } else {
                const matchedOption = targetOptions.find(opt => opt.toLowerCase() === input);
                if (matchedOption) {
                    handleNavigate(matchedOption);
                }
            }
            setUserInput("");
        }
    };

    const isStepDone = (currentStep: TerminalStep) => {
        const steps: TerminalStep[] = ['IDLE', 'NAME', 'TAGLINE', 'DIVIDER', 'QUESTION', 'OPTIONS', 'COMPLETE'];
        return steps.indexOf(step) > steps.indexOf(currentStep);
    };

    const isStepActive = (currentStep: TerminalStep) => step === currentStep;

    return (
        <div 
            className="relative w-full h-dvh bg-black flex flex-col items-center justify-center overflow-hidden cursor-text p-4"
            onClick={() => inputRef.current?.focus()}
        >
            {/* CRT Effects */}
            <div className="crt-overlay" />
            <div className="scanlines" />
            
            {/* Curved Screen Effect */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10" />
            
            <div className="flex flex-col items-center gap-4 md:gap-6 z-0 w-full max-w-4xl relative">
                {/* Name printer */}
                <div className="min-h-20 md:min-h-30 flex items-center justify-center w-full overflow-hidden">
                    <pre className="text-terminal-green whitespace-pre leading-none tracking-tighter text-[clamp(6px,1.5vw,14px)] md:text-[clamp(10px,2vw,18px)] origin-center scale-[0.85] md:scale-100">
                        {name}
                        {isStepActive('NAME') && (
                            <span className="animate-terminal-blink ml-1 border-l-[0.5em] border-terminal-green">&nbsp;</span>
                        )}
                    </pre>
                </div>
                
                {/* Tagline printer */}
                {(isStepDone('NAME') || isStepActive('TAGLINE')) && (
                    <div className="flex flex-col items-center w-full min-h-7 px-4">
                        <p className="text-terminal-green text-sm md:text-lg tracking-wider text-center whitespace-normal md:whitespace-nowrap">
                            {tagline}
                            {isStepActive('TAGLINE') && (
                                <span className="animate-terminal-blink ml-1 border-l-2 border-terminal-green">&nbsp;</span>
                            )}
                        </p>
                    </div>
                )}

                {/* Divider printer */}
                {(isStepDone('TAGLINE') || isStepActive('DIVIDER')) && (
                    <div className="flex flex-col items-center w-full min-h-4 opacity-50 px-8">
                        <p className="text-terminal-green text-lg md:text-xl tracking-[0.3em] md:tracking-[0.5em] text-center break-all">
                            {divider}
                            {isStepActive('DIVIDER') && (
                                <span className="animate-terminal-blink ml-1 border-l-2 border-terminal-green">&nbsp;</span>
                            )}
                        </p>
                    </div>
                )}

                {/* Question printer */}
                {(isStepDone('DIVIDER') || isStepActive('QUESTION')) && (
                    <div className="flex flex-col items-center w-full opacity-90 min-h-10 px-4">
                        <p className="text-terminal-green/90 text-xl md:text-3xl text-center tracking-tight leading-tight">
                            {question}
                            {isStepActive('QUESTION') && (
                                <span className="animate-terminal-blink ml-1 l-2 border-terminal-green">&nbsp;</span>
                            )}
                        </p>
                    </div>
                )}

                {/* Options printer */}
                {(isStepDone('QUESTION') || isStepActive('OPTIONS') || isStepActive('COMPLETE')) && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex flex-row flex-wrap items-center justify-center gap-x-6 md:gap-x-12 gap-y-2 md:gap-y-4 min-h-15 px-4">
                            {targetOptions.slice(0, visibleOptionsCount).map((option, index) => (
                                <button
                                    key={option}
                                    onClick={() => handleNavigate(option)}
                                    className="p-2 md:p-4 text-terminal-cyan/80 rounded-md hover:text-terminal-cyan text-lg md:text-xl tracking-widest transition-all hover:-translate-y-1 group cursor-pointer text-center border-none bg-transparent hover:outline-terminal-cyan hover:outline-2 focus:outline-terminal-cyan focus:outline-2 focus:outline-offset-4"
                                >
                                    <span className="mr-1 md:mr-2 text-terminal-cyan">{index + 1}.</span>
                                    <span className="decoration-terminal-cyan">{option}</span>
                                    {isStepActive('OPTIONS') && index === visibleOptionsCount - 1 && (
                                        <span className="animate-terminal-blink ml-2 border-l-2 border-terminal-cyan">&nbsp;</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {isStepActive('COMPLETE') && (
                            <p className="text-terminal-green/60 text-[10px] md:text-sm italic tracking-widest animate-pulse mt-2 text-center px-4">
                                or type out anything that comes to mind and let the LLM decide!
                            </p>
                        )}
                    </div>
                )}

                {/* Input */}
                {isStepActive('COMPLETE') && (
                    <div className="flex items-center gap-2 md:gap-3 text-lg md:text-2xl text-terminal-green w-full justify-start mt-4 px-2 overflow-hidden">
                        <span className="opacity-50 tracking-widest shrink-0">&gt;</span>
                        <div className="relative flex-1 max-w-125">
                            <input
                                ref={inputRef}
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none text-terminal-green w-full caret-transparent"
                                spellCheck="false"
                                autoComplete="off"
                                autoFocus
                            />
                            <span className="absolute left-0 top-0 pointer-events-none truncate whitespace-nowrap max-w-full">
                                {userInput}
                                <span className="animate-terminal-blink ml-0 border-l-2 border-terminal-green">&nbsp;</span>
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Terminal;
