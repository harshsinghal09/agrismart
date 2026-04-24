import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sprout, Globe } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const navLinks = [
  { key: 'nav_home', to: '/' },
  { key: 'nav_crop', to: '/crop' },
  { key: 'nav_fertilizer', to: '/fertilizer' },
  { key: 'nav_disease', to: '/disease' },
  { key: 'nav_about', to: '/about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, toggleLang, lang } = useLang();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-green-950/95 backdrop-blur-md border-b border-green-800/40 shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-900/50 group-hover:shadow-green-500/30 transition-all duration-300">
              <Sprout size={20} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white">
              AgriSmart <span className="text-amber-400">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ key, to }) => (
              <Link
                key={key}
                to={to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === to
                    ? 'text-green-300 bg-green-900/50'
                    : 'text-green-200/70 hover:text-green-100 hover:bg-green-900/30'
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-green-700/40 text-green-300 hover:border-green-500 hover:text-green-100 transition-all duration-200 text-sm"
            >
              <Globe size={14} />
              {lang === 'en' ? 'हिंदी' : 'EN'}
            </button>
            <Link to="/crop" className="btn-primary text-sm py-2">
              {t('nav_cta')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-green-300 hover:text-white transition-colors p-1"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-green-950/98 backdrop-blur-md border-t border-green-800/40 px-4 py-4 space-y-1">
          {navLinks.map(({ key, to }) => (
            <Link
              key={key}
              to={to}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === to
                  ? 'text-green-300 bg-green-900/50'
                  : 'text-green-200/70 hover:text-green-100 hover:bg-green-900/30'
              }`}
            >
              {t(key)}
            </Link>
          ))}
          <div className="pt-2 flex gap-2">
            <button
              onClick={toggleLang}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-green-700/40 text-green-300 text-sm"
            >
              <Globe size={14} />
              {lang === 'en' ? 'हिंदी' : 'EN'}
            </button>
            <Link to="/crop" className="flex-1 btn-primary text-sm py-2.5 text-center">
              {t('nav_cta')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
