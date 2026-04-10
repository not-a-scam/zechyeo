import Header from "./NavBar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useMemo, useState } from "react";
import { projectContent, type ProjectItem } from "../constants/projectContent";

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [markdownContent, setMarkdownContent] = useState<string>("");
    const [isLoadingMarkdown, setIsLoadingMarkdown] = useState(false);
    const [markdownError, setMarkdownError] = useState<string | null>(null);

    const selectedMarkdownKey = useMemo(() => {
        if (!selectedProject) {
            return null;
        }

        return `/assets/projects/${selectedProject.md}`;
    }, [selectedProject]);

    useEffect(() => {
        if (!selectedProject || !selectedMarkdownKey) {
            setMarkdownContent("");
            setMarkdownError(null);
            return;
        }

        const loadMarkdown = async () => {
            setIsLoadingMarkdown(true);
            setMarkdownError(null);

            try {
                const response = await fetch(selectedMarkdownKey);

                if (!response.ok) {
                    throw new Error("Unable to find markdown content for this project.");
                }

                const content = await response.text();
                setMarkdownContent(content);
            } catch {
                setMarkdownError("Failed to load markdown content.");
                setMarkdownContent("");
            } finally {
                setIsLoadingMarkdown(false);
            }
        };

        void loadMarkdown();
    }, [selectedMarkdownKey, selectedProject]);

    useEffect(() => {
        if (!selectedProject) {
            return;
        }

        const onEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedProject(null);
            }
        };

        document.addEventListener("keydown", onEscape);
        return () => document.removeEventListener("keydown", onEscape);
    }, [selectedProject]);

    return (
        <div className="relative w-full h-dvh bg-black flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden scrollbar-hidden cursor-text p-0">
            {/* CRT Effects */}
            <div className="crt-overlay pointer-events-none fixed inset-0 z-20" />
            <div className="scanlines pointer-events-none fixed inset-0 z-20" />
            {/* Curved Screen Effect */}
            <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10" />
            <Header />   

            <main
                className={`relative z-0 w-full max-w-7xl px-6 md:px-12 pt-32 md:pt-40 pb-14 transition-all duration-300 ${selectedProject ? "blur-sm" : ""}`}
                aria-hidden={selectedProject ? "true" : "false"}
            >
                <section className="mb-8 md:mb-12 text-center">
                    <h1 className="text-terminal-cyan text-4xl md:text-6xl tracking-widest uppercase">Projects</h1>
                    <p className="mt-3 md:mt-4 text-terminal-green/85 text-xl md:text-2xl max-w-4xl mx-auto">
                        things i built, what they solve, and the stack behind each one
                    </p>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {projectContent.map((project) => (
                        <button
                            key={project.title}
                            onClick={() => setSelectedProject(project)}
                            className="group text-left w-full rounded-xl border-2 border-terminal-green/55 bg-black/70 p-6 md:p-7 transition-all duration-200 hover:-translate-y-1 hover:border-terminal-cyan hover:shadow-[0_0_20px_rgba(53,255,105,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan cursor-pointer"
                        >
                            <h2 className="text-terminal-cyan text-2xl md:text-3xl tracking-wide chromatic-text">{project.title}</h2>
                            <p className="mt-3 text-white/90 text-lg md:text-2xl leading-tight md:leading-normal tracking-wide">
                                {project.description}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2 md:gap-3">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={`${project.title}-${tech}`}
                                        className="inline-flex items-center rounded-md border border-terminal-green/45 px-3 py-1 text-terminal-green text-base md:text-xl tracking-wide"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </button>
                    ))}
                </section>
            </main>

            {selectedProject && (
                <div
                    className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6 md:px-8"
                    onClick={() => setSelectedProject(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${selectedProject.title} details`}
                >
                    <div
                        className="relative w-full max-w-6xl h-[90dvh] rounded-2xl border-2 border-terminal-cyan bg-black/95 shadow-[0_0_35px_rgba(0,255,255,0.25)] overflow-hidden"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4 px-6 md:px-8 py-5 border-b border-terminal-green/40">
                            <div>
                                <h3 className="text-terminal-cyan text-2xl md:text-4xl leading-none tracking-wider">
                                    {selectedProject.title}
                                </h3>
                                <p className="mt-2 text-terminal-green/80 text-base md:text-xl">
                                    created: {selectedProject.date}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="cursor-pointer px-3 md:px-4 py-1 rounded border border-terminal-red text-terminal-red hover:bg-terminal-red/15 text-lg md:text-2xl"
                                aria-label="Close project details"
                            >
                                close
                            </button>
                        </div>

                        <div className="h-[calc(90dvh-88px)] overflow-y-auto scrollbar-hidden px-6 md:px-8 py-6 md:py-8">
                            {isLoadingMarkdown && (
                                <p className="text-terminal-green text-xl md:text-2xl">Loading project details...</p>
                            )}

                            {markdownError && (
                                <p className="text-terminal-red text-xl md:text-2xl">{markdownError}</p>
                            )}

                            {!isLoadingMarkdown && !markdownError && (
                                <article className="space-y-5 mb-12 text-white text-lg md:text-2xl leading-relaxed tracking-wide">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({ children }) => (
                                                <h1 className="text-terminal-cyan text-4xl md:text-5xl tracking-wider uppercase">{children}</h1>
                                            ),
                                            h2: ({ children }) => (
                                                <h2 className="text-terminal-cyan text-3xl md:text-4xl tracking-wider uppercase pt-2">{children}</h2>
                                            ),
                                            h3: ({ children }) => (
                                                <h3 className="text-terminal-green text-2xl md:text-3xl tracking-wider uppercase">{children}</h3>
                                            ),
                                            p: ({ children }) => <p className="text-white/95">{children}</p>,
                                            ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 text-terminal-green">{children}</ul>,
                                            ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 text-terminal-green">{children}</ol>,
                                            li: ({ children }) => <li className="pl-1">{children}</li>,
                                            blockquote: ({ children }) => (
                                                <blockquote className="border-l-4 border-terminal-cyan/70 pl-4 italic text-terminal-cyan/90">
                                                    {children}
                                                </blockquote>
                                            ),
                                            code: ({ children }) => (
                                                <code className="bg-terminal-dark/70 rounded px-2 py-1 text-terminal-yellow">{children}</code>
                                            ),
                                            pre: ({ children }) => (
                                                <pre className="bg-terminal-dark/70 rounded-lg p-4 overflow-x-auto text-terminal-yellow">
                                                    {children}
                                                </pre>
                                            ),
                                            a: ({ href, children }) => (
                                                href && /\.(mp4|mov|webm|ogg)(\?.*)?$/i.test(href) ? (
                                                    <div className="my-4">
                                                        <video
                                                            controls
                                                            preload="metadata"
                                                            className="w-full rounded-lg border border-terminal-cyan/40 bg-black"
                                                        >
                                                            <source src={href} />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                        <a
                                                            href={href}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="mt-2 inline-block text-terminal-cyan underline hover:text-white"
                                                        >
                                                            Open video in new tab
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <a
                                                        href={href}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-terminal-cyan underline hover:text-white"
                                                    >
                                                        {children}
                                                    </a>
                                                )
                                            ),
                                            table: ({ children }) => (
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full border border-terminal-green/40">{children}</table>
                                                </div>
                                            ),
                                            th: ({ children }) => (
                                                <th className="border border-terminal-green/40 px-3 py-2 text-terminal-cyan text-left">{children}</th>
                                            ),
                                            td: ({ children }) => (
                                                <td className="border border-terminal-green/30 px-3 py-2 text-white">{children}</td>
                                            )
                                        }}
                                    >
                                        {markdownContent}
                                    </ReactMarkdown>
                                </article>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
