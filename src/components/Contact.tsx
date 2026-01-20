import { Mail } from 'lucide-react';

const Contact = () => {
  return (
    <footer id="contact" className="py-24 text-center border-t border-slate-800 mt-20">
      <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
      
      <p className="text-slate-400 mb-8 max-w-lg mx-auto">
        Whether you want to discuss robotics integration, full-stack roles, or linear algebra, my inbox is always open.
      </p>
      
      <a 
        href="mailto:your.email@example.com" 
        className="inline-flex items-center gap-2 bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition duration-300 shadow-lg shadow-sky-500/20"
      >
        <Mail size={20} />
        Email Me
      </a>
    </footer>
  );
};

export default Contact;