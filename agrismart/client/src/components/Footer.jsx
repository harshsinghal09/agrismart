import { Link } from 'react-router-dom';
import { Sprout, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-green-900/50 bg-green-950/80 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <Sprout size={16} className="text-white" />
              </div>
              <span className="font-display text-lg font-bold text-white">AgriSmart <span className="text-amber-400">AI</span></span>
            </div>
            <p className="text-green-400/60 text-sm leading-relaxed max-w-xs">
              Empowering Indian farmers with AI-powered crop recommendations, fertilizer guidance, and real-time disease detection.
            </p>
            <div className="flex gap-3 mt-5">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg border border-green-800/50 hover:border-green-600 flex items-center justify-center text-green-500 hover:text-green-300 transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-green-200 mb-3">Tools</h4>
            <ul className="space-y-2">
              {[['Crop Advisor', '/crop'], ['Fertilizer Planner', '/fertilizer'], ['Disease Detection', '/disease']].map(([label, to]) => (
                <li key={to}><Link to={to} className="text-sm text-green-400/60 hover:text-green-300 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-green-200 mb-3">Company</h4>
            <ul className="space-y-2">
              {[['About Us', '/about'], ['Contact', '/contact'], ['Privacy Policy', '#']].map(([label, to]) => (
                <li key={label}><Link to={to} className="text-sm text-green-400/60 hover:text-green-300 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-green-900/40 mt-8 pt-6 text-center text-xs text-green-600">
          © {new Date().getFullYear()} AgriSmart AI. Built with ❤️ for Indian farmers.
        </div>
      </div>
    </footer>
  );
}
