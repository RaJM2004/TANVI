import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ScrollAnimations } from './components/ScrollAnimations';
import { WhatsAppChat } from './components/WhatsAppChat';
import { ScrollToTop } from './components/ScrollToTop';
import './App.css';

// Lazy-load dedicated policy pages
const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const TermsPage = lazy(() =>
  import('./pages/TermsPage').then((m) => ({ default: m.TermsPage }))
);

// Lazy-load Three.js 3D Particle Background for desktop screens only
const ParticleBackground = lazy(() =>
  import('./components/ParticleBackground').then((m) => ({ default: m.ParticleBackground }))
);

function App() {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    // Only mount heavy Three.js canvas on desktop viewports to optimize mobile LCP & TBT
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <Router>
      {/* Auto-scroll to top or target hash on route changes */}
      <ScrollToTop />

      {/* Global Scroll Animations */}
      <ScrollAnimations />

      {/* Three.js Particle Background (Lazy-loaded on desktop; bypassed on mobile to optimize Core Web Vitals) */}
      {isDesktop && (
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
      )}

      <div className="min-h-screen bg-background font-sans selection:bg-[#C28E3A]/30 relative z-[1]">
        {/* Persistent Floating Navigation */}
        <Navigation />

        {/* Multi-Page Routes */}
        <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsPage />} />
          </Routes>
        </Suspense>

        {/* Floating WhatsApp Chatbot Widget */}
        <WhatsAppChat />
      </div>
    </Router>
  );
}

export default App;
