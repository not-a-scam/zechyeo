const Hero = () => {
  return (
    <section className="py-24 md:py-32 max-w-3xl">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
        Hi, I'm a Software Developer & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Robotics Enthusiast.</span>
      </h1>
      
      <p className="text-xl text-slate-400 mb-10 leading-relaxed">
        I build full-stack applications and explore the frontier of robotics.
        Currently bridging the gap between hardware control and user-friendly software.
      </p>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-3">
        {['TypeScript', 'Python', 'ROS2', 'React', 'Linux'].map((tech) => (
          <span 
            key={tech} 
            className="px-4 py-2 bg-slate-800 text-sky-300 rounded-full text-sm font-medium border border-slate-700"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Hero;