import { useState } from 'react';
import { Leaf, MapPin, Cloud, TrendingUp, Droplets, Clock, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { analyzeCrop } from '../services/api';
import { useLang } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfidenceBadge from '../components/ConfidenceBadge';
import VoiceInput from '../components/VoiceInput';

const SOILS = ['Black (Regur)', 'Red Laterite', 'Alluvial', 'Sandy Loam', 'Clay', 'Loamy', 'Saline', 'Peaty', 'Chalky'];
const STATES = ['Andhra Pradesh', 'Assam', 'Bihar', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
const SEASONS = ['Kharif (June–October)', 'Rabi (October–March)', 'Zaid (March–June)', 'Perennial'];

const waterColor = { low: 'text-green-400', medium: 'text-amber-400', high: 'text-blue-400' };

export default function CropTool() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ soilType: '', location: '', season: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.soilType || !form.location || !form.season) {
      toast.error('Please fill all fields.');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await analyzeCrop({ ...form, language: lang });
      setResult(res);
      toast.success('Analysis complete!');
    } catch (e) {
  console.log("🔥 FULL ERROR:", e);
  console.log("🔥 RESPONSE:", e.response);
  console.log("🔥 DATA:", e.response?.data);
  toast.error(e.message);
}
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <span className="badge-green mb-3">AI-Powered</span>
        <h1 className="section-title">{t('crop_title')}</h1>
        <p className="section-subtitle">{t('crop_subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="card sticky top-24">
            <h2 className="font-semibold text-white mb-6 flex items-center gap-2">
              <Leaf size={18} className="text-green-400" /> Farm Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="label">{t('crop_soil')}</label>
                <select className="input-field" value={form.soilType} onChange={(e) => set('soilType', e.target.value)}>
                  <option value="">Select soil type...</option>
                  {SOILS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <div className="label flex items-center justify-between">
                  {t('crop_location')}
                  <VoiceInput onResult={(v) => set('location', v)} />
                </div>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 pointer-events-none" />
                  <select className="input-field pl-9" value={form.location} onChange={(e) => set('location', e.target.value)}>
                    <option value="">Select state...</option>
                    {STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="label">{t('crop_season')}</label>
                <select className="input-field" value={form.season} onChange={(e) => set('season', e.target.value)}>
                  <option value="">Select season...</option>
                  {SEASONS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <button onClick={submit} disabled={loading}
                className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? 'Analyzing...' : t('crop_cta')}
                {!loading && <ChevronRight size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {loading && <LoadingSpinner />}

          {!loading && !result && (
            <div className="flex flex-col items-center justify-center h-64 card border-dashed">
              <Leaf size={40} className="text-green-700 mb-3" />
              <p className="text-green-500/60 text-center">Fill the form and click analyze to get AI-powered crop recommendations.</p>
            </div>
          )}

          {result && (
            <div className="space-y-4 animate-fade-in">
              {/* Summary */}
              <div className="card border-green-700/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">Analysis Summary</h3>
                  <ConfidenceBadge value={result.confidence} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-900/40 rounded-xl p-3">
                    <p className="text-xs text-green-500 mb-1">Best Season</p>
                    <p className="text-sm font-medium text-green-200">{result.bestSeason}</p>
                  </div>
                  <div className="bg-green-900/40 rounded-xl p-3">
                    <p className="text-xs text-green-500 mb-1">Weather Risk</p>
                    <p className="text-sm font-medium text-amber-300">{result.weatherRisk}</p>
                  </div>
                </div>
                {result.soilPreparation && (
                  <div className="mt-3 bg-green-900/30 rounded-xl p-3">
                    <p className="text-xs text-green-500 mb-1">Soil Preparation</p>
                    <p className="text-sm text-green-300/80">{result.soilPreparation}</p>
                  </div>
                )}
              </div>

              {/* Crop cards */}
              <h3 className="font-semibold text-white">Recommended Crops ({result.cropSuggestions?.length})</h3>
              {result.cropSuggestions?.map((crop, i) => (
                <div key={i} className={`card border-green-700/40 hover:border-green-500/50 transition-all duration-200 ${i === 0 ? 'ring-1 ring-green-600/30' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      {i === 0 && <span className="badge-amber text-xs mb-1.5">Best Match</span>}
                      <h4 className="font-semibold text-white text-lg">{crop.name}</h4>
                      <p className="text-green-400/70 text-sm">{crop.variety}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{crop.suitability}%</div>
                      <div className="text-xs text-green-600">suitability</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-green-900/40 rounded-lg p-2 text-center">
                      <TrendingUp size={13} className="text-green-400 mx-auto mb-1" />
                      <p className="text-xs text-green-500">Yield/acre</p>
                      <p className="text-xs font-medium text-green-200">{crop.expectedYield}</p>
                    </div>
                    <div className="bg-green-900/40 rounded-lg p-2 text-center">
                      <Clock size={13} className="text-amber-400 mx-auto mb-1" />
                      <p className="text-xs text-green-500">Duration</p>
                      <p className="text-xs font-medium text-green-200">{crop.growthDuration}</p>
                    </div>
                    <div className="bg-green-900/40 rounded-lg p-2 text-center">
                      <Droplets size={13} className={`mx-auto mb-1 ${waterColor[crop.waterRequirement?.toLowerCase()] || 'text-blue-400'}`} />
                      <p className="text-xs text-green-500">Water</p>
                      <p className="text-xs font-medium text-green-200 capitalize">{crop.waterRequirement}</p>
                    </div>
                  </div>
                  {crop.marketPrice && (
                    <div className="mt-2 text-xs text-green-500">Market price: <span className="text-amber-400 font-medium">{crop.marketPrice}</span></div>
                  )}
                </div>
              ))}

              {/* Tips */}
              {result.tips?.length > 0 && (
                <div className="card">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2"><Cloud size={16} className="text-blue-400" />Expert Tips</h4>
                  <ul className="space-y-2">
                    {result.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-sm text-green-300/70">
                        <span className="text-green-500 mt-0.5">•</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
