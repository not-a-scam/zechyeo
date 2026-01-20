import { Github } from 'lucide-react';

const projects = [
  {
    title: "Botler (Unitree G1)",
    description: "A robotics project for a government showcase featuring a Unitree G1 robot. Features include computer vision integration, custom web-server communication, and digital signage capabilities.",
    tags: ["Robotics", "Computer Vision", "Python", "Websockets"],
    link: "#",
  },
  {
    title: "BiteBuddy",
    description: "A CLI-based food tracking application designed for speed and efficiency. Allows users to track caloric intake and restaurant visits directly from the terminal.",
    tags: ["CLI", "Software Dev", "Data Tracking"],
    link: "#",
  },
  {
    title: "IoT Control System",
    description: "A hardware-software bridge using an ESP32 microcontroller and a custom webserver. Implements MQTT for real-time LED control and status messaging.",
    tags: ["IoT", "Embedded Systems", "ESP32", "MQTT"],
    link: "#",
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-white">Featured Work</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-sky-400 transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-sky-400">{project.title}</h3>
            <p className="text-slate-400 mb-4 leading-relaxed">{project.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs font-mono bg-slate-900 text-sky-300 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            <a href={project.link} className="inline-flex items-center gap-2 text-sm font-medium hover:text-white">
              <Github size={18} /> Code
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;