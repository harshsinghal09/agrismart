import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import CropTool from './pages/CropTool';
import Fertilizer from './pages/Fertilizer';
import Disease from './pages/Disease';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <LanguageProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#14532d',
            color: '#dcfce7',
            border: '1px solid rgba(22,101,52,0.5)',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#4ade80', secondary: '#14532d' } },
          error: {
            style: { background: '#450a0a', color: '#fecaca', border: '1px solid rgba(127,29,29,0.5)' },
            iconTheme: { primary: '#f87171', secondary: '#450a0a' },
          },
        }}
      />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crop" element={<CropTool />} />
          <Route path="/fertilizer" element={<Fertilizer />} />
          <Route path="/disease" element={<Disease />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="font-display text-6xl font-bold text-green-700 mb-4">404</h1>
                <p className="text-green-400/70 mb-6">Page not found</p>
                <a href="/" className="btn-primary inline-block">Go Home</a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </LanguageProvider>
  );
}
