import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, FlaskConical, Bug, Shield, Zap, Users, Star, MapPin } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const stats = [
  { key: 'stat_farmers', value: '2.4M+', icon: Users },
  { key: 'stat_accuracy', value: '94.7%', icon: Star },
  { key: 'stat_regions', value: '28', icon: MapPin },
  { key: 'stat_rating', value: '4.9/5', icon: Star },
];

const features = [
  {
    icon: Leaf,
    title: 'Smart Crop Advisor',
    desc: 'AI-powered crop recommendations based on soil type, location, and season. Get expected yields and market insights.',
    to: '/crop',
    color: 'from-green-500/20 to-emerald-500/5 border-green-600/30',
    iconBg: 'bg-green-500/20 text-green-400',
  },
  {
    icon: FlaskConical,
    title: 'Fertilizer Planner',
    desc: 'Get a complete NPK plan with stage-wise application schedules, quantities, and cost estimates for your farm.',
    to: '/fertilizer',
    color: 'from-amber-500/20 to-yellow-500/5 border-amber-600/30',
    iconBg: 'bg-amber-500/20 text-amber-400',
  },
  {
    icon: Bug,
    title: 'Disease Detection',
    desc: 'Upload a plant photo and get instant AI diagnosis with disease name, confidence score, and treatment plan.',
    to: '/disease',
    color: 'from-red-500/20 to-rose-500/5 border-red-600/30',
    iconBg: 'bg-red-500/20 text-red-400',
  },
];

export default function Home() {
  const { t } = useLang();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 noise-bg opacity-40" />
        {/* Decorative circles */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-600/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">


          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight text-shadow animate-slide-up mb-6">
            {t('hero_title').split(' for ')[0]}
            <br />
            <span className="gradient-text">for Better Yield</span>
          </h1>

          <p className="text-xl text-green-200/70 max-w-2xl mx-auto leading-relaxed animate-slide-up animate-delay-200 mb-10">
            {t('hero_subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animate-delay-300">
            <Link to="/crop" className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4">
              {t('hero_cta')}
              <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn-outline flex items-center justify-center gap-2 text-base px-8 py-4">
              {t('hero_learn')}
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <div className="w-5 h-9 border-2 border-green-600/50 rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2.5 bg-green-400 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ key, value, icon: Icon }) => (
              <div key={key} className="card text-center group hover:border-green-600/60 transition-all duration-300">
                <div className="w-10 h-10 bg-green-900/60 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-green-800/60 transition-colors">
                  <Icon size={18} className="text-green-400" />
                </div>
                <div className="font-display text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-xs text-green-400/60">{t(key)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="badge-green mb-4 mx-auto">Our Tools</span>
          <h2 className="section-title">Everything a farmer needs</h2>
          <p className="section-subtitle">Three AI-powered tools working together for maximum yield</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, to, color, iconBg }) => (
            <Link key={to} to={to}
              className={`group block p-6 rounded-2xl border bg-gradient-to-br ${color} backdrop-blur-sm hover:-translate-y-2 transition-all duration-300`}>
              <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">{title}</h3>
              <p className="text-green-300/60 text-sm leading-relaxed mb-4">{desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-400 group-hover:text-green-300 transition-colors">
                Try it now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-900 via-emerald-900 to-green-800 border border-green-700/40 p-10 text-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 noise-bg" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
          <Shield size={32} className="text-amber-400 mx-auto mb-4 relative z-10" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 relative z-10">
            Ready to grow smarter?
          </h2>
          <p className="text-green-200/70 mb-8 relative z-10">Join millions of farmers already using AI to boost their harvest.</p>
          <Link to="/crop" className="btn-primary inline-flex items-center gap-2 relative z-10 text-base px-8 py-4">
            Start Free Analysis <ArrowRight size=18 />
          </Link>
        </div>
      </section>
    </div>
  );
}
