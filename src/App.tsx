
import { Routes, Route } from 'react-router-dom';
import Terminal from './components/Terminal';
import Contact from './components/Contact';
import AboutMe from './components/AboutMe';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Terminal />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<AboutMe />} />
      <Route path="*" element={<div className="text-white">404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
