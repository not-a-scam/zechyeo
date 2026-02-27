
import { Routes, Route } from 'react-router-dom';
import Terminal from './components/Terminal';
import Contact from './components/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Terminal />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
