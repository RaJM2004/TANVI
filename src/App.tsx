import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ParticleBackground } from './components/ParticleBackground';
import { ScrollAnimations } from './components/ScrollAnimations';
import { WhatsAppChat } from './components/WhatsAppChat';
import { ScrollToTop } from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      {/* Auto-scroll to top or target hash on route changes */}
      <ScrollToTop />

      {/* Global Scroll Animations */}
      <ScrollAnimations />

      {/* Three.js Particle Background */}
      <ParticleBackground />

      <div className="min-h-screen bg-background font-sans selection:bg-[#C28E3A]/30 relative z-[1]">
        {/* Persistent Floating Navigation */}
        <Navigation />

        {/* Multi-Page Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>

        {/* Floating WhatsApp Chatbot Widget */}
        <WhatsAppChat />
      </div>
    </Router>
  );
}

export default App;
