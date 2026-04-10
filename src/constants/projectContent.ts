export type ProjectItem = {
    title: string;
    description: string;
    technologies: string[];
    md: string;
    date: string;
};

export const projectContent: ProjectItem[] = [
    {
        title: "Plslorr Catalogue Website",
        description: "A catalogue website for @plslorr, a sticker shop on Instagram. Vibe-coded with lovable then tweaked manually",
        date: "2026-01-29",
        technologies: ["React", "Tailwind CSS", "TypeScript", "Vite", "Lovable"],
        md: "plslorr-catalogue-website.md"
    },
    {
        title: "Word Hunt Destroyer",
        description: "A word hunt solver that uses basic computer vision, graph traversal, and a dictionary to find all valid words in a given word hunt puzzle.",
        date: "2025-11-30",
        technologies: ["Python", "OCR"],
        md: "word-hunt-destroyer.md"
    },
    {
        title: "IsANoob.org",
        description: "An ongoing personal project that allows me to troll my friends",
        date: "2026-04-10",
        technologies: ["React", "Tailwind CSS", "TypeScript", "Vite"],
        md: "isanoob.md"
    },
    {
        title: "FairTerms Browser Extension",
        description: "A Chrome extension that summarises Terms and Conditions and Privacy Policies into clear bullets with a Potential Risks section, fully on-device.",
        date: "2026-04-09",
        technologies: ["React", "TypeScript", "Vite", "web-llm", "Chrome MV3"],
        md: "fairterms.md"
    }
]
