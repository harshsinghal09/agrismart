import { Target, Zap, Users, Globe, Award, Heart } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const features = [
  {
    icon: Target,
    title: 'Precision Agriculture',
    desc: 'Our AI analyzes soil type, climate, and regional data to deliver hyper-accurate crop and fertilizer recommendations.',
    color: 'text-green-400 bg-green-900/40',
  },
  {
    icon: Users,
    title: 'Farmer-Centric Design',
    desc: 'Built for India\'s diverse farming community — supports Hindi and English, simple enough for first-time smartphone users.',
    color: 'text-amber-400 bg-amber-900/40',
  },
  {
    icon: Globe,
    title: 'Pan-India Coverage',
    desc: 'Trained on agricultural data from all 28 states covering 100+ crop varieties and 50+ soil-climate combinations.',
    color: 'text-blue-400 bg-blue-900/40',
  },
  {
    icon: Zap,
    title: 'Instant AI Insights',
    desc: 'Get crop recommendations, fertilizer plans, and disease diagnoses in seconds — powered by Google Gemini.',
    color: 'text-purple-400 bg-purple-900/40',
  },
  {
    icon: Award,
    title: '94.7% Accuracy',
    desc: 'Validated against ICAR databases and field trials across multiple seasons and geographies.',
    color: 'text-yellow-400 bg-yellow-900/40',
  },
  {
    icon: Heart,
    title: 'Free for Farmers',
    desc: 'Core features are free forever. We believe every farmer deserves access to world-class agricultural intelligence.',
    color: 'text-red-400 bg-red-900/40',
  },
];

const team = [
  { name: 'Dr. Ravi Kumar', role: 'Chief Agronomist', initials: 'RK' },
  { name: 'Priya Sharma', role: 'AI/ML Lead', initials: 'PS' },
  { name: 'Amit Patel', role: 'Full Stack Engineer', initials: 'AP' },
];

export default function About() {
  const { t } = useLang();
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-6xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-16">
        <span className="badge-green mb-4 mx-auto">Our Mission</span>
        <h1 className="section-title mb-4">{t('about_title')}</h1>
        <p className="section-subtitle max-w-2xl mx-auto">{t('about_subtitle')}</p>
      </div>

      {/* Mission statement */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-900 to-emerald-950 border border-green-700/40 p-10 mb-16 text-center">
        <div className="absolute inset-0 noise-bg opacity-20" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />
        <blockquote className="relative z-10 font-display text-2xl md:text-3xl text-green-100 leading-relaxed max-w-3xl mx-auto">
          "We believe artificial intelligence should work as hard for a farmer in Vidarbha as it does for a hedge fund in Mumbai."
        </blockquote>
        <p className="relative z-10 text-green-400/70 text-sm mt-4">— AgriSmart AI Team</p>
      </div>

      {/* Features */}
      <div className="mb-16">
        <h2 className="section-title text-center mb-3">Why AgriSmart AI?</h2>
        <p className="section-subtitle text-center mb-10">What makes our platform different</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card-hover">
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon size={20} />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-green-400/60 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact stats */}
      <div className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '2.4M+', label: 'Farmers Served' },
            { val: '₹840Cr', label: 'Value Created' },
            { val: '28', label: 'States Covered' },
            { val: '99.9%', label: 'Uptime' },
          ].map(({ val, label }) => (
            <div key={label} className="card text-center bg-gradient-to-br from-green-900/50 to-emerald-950/50">
              <div className="font-display text-3xl font-bold text-amber-400 mb-1">{val}</div>
              <div className="text-xs text-green-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="section-title text-center mb-3">The Team</h2>
        <p className="section-subtitle text-center mb-10">Scientists, engineers and farmers building together</p>
        <div className="grid md:grid-cols-3 gap-5 max-w-2xl mx-auto">
          {team.map(({ name, role, initials }) => (
            <div key={name} className="card text-center hover:border-green-600/50 transition-all duration-200">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-white font-display text-lg font-bold mx-auto mb-3">
                {initials}
              </div>
              <h4 className="font-semibold text-white">{name}</h4>
              <p className="text-green-500/70 text-sm">{role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
