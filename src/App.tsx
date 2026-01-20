import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <div className="max-w-5xl mx-auto px-4">
        {/* Navbar */}
        <nav className="flex justify-between items-center py-8">
          <h3 className="text-xl font-bold"></h3>
          <div className="space-x-6 font-medium">
            <a href="#projects" className="hover:text-sky-400 transition">Projects</a>
            <a href="#contact" className="hover:text-sky-400 transition">Contact</a>
          </div>
        </nav>
        
        <main>
          <Hero />
          <Projects />
        </main>

        <Contact />
      </div>
    </div>
  );
}

export default App;