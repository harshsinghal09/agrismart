import { useState } from 'react';
import { FlaskConical, ChevronRight, AlertTriangle, Leaf, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { adviseFertilizer } from '../services/api';
import { useLang } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfidenceBadge from '../components/ConfidenceBadge';

const CROPS = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Soybean', 'Mustard', 'Groundnut', 'Tomato', 'Onion', 'Potato', 'Chickpea', 'Lentil', 'Bajra', 'Jowar', 'Turmeric', 'Chilli', 'Banana', 'Mango', 'Grapes'];
const SOILS = ['Black (Regur)', 'Red Laterite', 'Alluvial', 'Sandy Loam', 'Clay', 'Loamy', 'Saline', 'Peaty', 'Chalky'];

const typeColor = { organic: 'badge-green', chemical: 'badge-blue', bio: 'badge-amber' };

export default function Fertilizer() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ cropType: '', soilType: '', farmSize: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.cropType || !form.soilType || !form.farmSize) {
      toast.error('Please fill all fields.');
      return;
    }
    if (isNaN(parseFloat(form.farmSize)) || parseFloat(form.farmSize) <= 0) {
      toast.error('Farm size must be a positive number.');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await adviseFertilizer({ ...form, language: lang });
      setResult(res.data);
      toast.success('Fertilizer plan ready!');
    } catch (e) {
      toast.error(e.message || t('error_generic'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-6xl mx-auto">
      <div className="mb-10">
        <span className="badge-amber mb-3">Smart Planning</span>
        <h1 className="section-title">{t('fert_title')}</h1>
        <p className="section-subtitle">{t('fert_subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="card sticky top-24">
            <h2 className="font-semibold text-white mb-6 flex items-center gap-2">
              <FlaskConical size={18} className="text-amber-400" /> Farm Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="label">{t('fert_crop')}</label>
                <select className="input-field" value={form.cropType} onChange={(e) => set('cropType', e.target.value)}>
                  <option value="">Select crop...</option>
                  {CROPS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">{t('fert_soil')}</label>
                <select className="input-field" value={form.soilType} onChange={(e) => set('soilType', e.target.value)}>
                  <option value="">Select soil type...</option>
                  {SOILS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label">{t('fert_size')}</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  className="input-field"
                  placeholder="e.g. 2.5"
                  value={form.farmSize}
                  onChange={(e) => set('farmSize', e.target.value)}
                />
              </div>
              <button onClick={submit} disabled={loading}
                className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? 'Generating plan...' : t('fert_cta')}
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
              <FlaskConical size={40} className="text-amber-700 mb-3" />
              <p className="text-green-500/60 text-center">Enter your farm details to get a personalized fertilizer plan.</p>
            </div>
          )}

          {result && (
            <div className="space-y-4 animate-fade-in">
              {/* Overview */}
              <div className="card border-amber-700/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Fertilizer Plan Overview</h3>
                  <ConfidenceBadge value={result.confidence} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-amber-900/20 border border-amber-700/20 rounded-xl p-3">
                    <DollarSign size={14} className="text-amber-400 mb-1" />
                    <p className="text-xs text-green-500 mb-0.5">Estimated Cost</p>
                    <p className="text-sm font-semibold text-amber-300">{result.totalCost}</p>
                  </div>
                  <div className="bg-green-900/30 rounded-xl p-3">
                    <Leaf size={14} className="text-green-400 mb-1" />
                    <p className="text-xs text-green-500 mb-0.5">Organic Alternatives</p>
                    <p className="text-sm text-green-300">{result.organicAlternatives}</p>
                  </div>
                </div>
                {result.soilAmendments && (
                  <div className="mt-3 bg-green-900/20 rounded-xl p-3">
                    <p className="text-xs text-green-500 mb-1">Soil Amendments</p>
                    <p className="text-sm text-green-300/80">{result.soilAmendments}</p>
                  </div>
                )}
              </div>

              {/* Stage-wise plan */}
              <h3 className="font-semibold text-white">Stage-wise Application Plan</h3>
              {result.fertilizerPlan?.map((stage, i) => (
                <div key={i} className="card border-green-800/40">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 font-bold text-sm flex-shrink-0">{i + 1}</div>
                    <div>
                      <h4 className="font-semibold text-white">{stage.stage}</h4>
                      <p className="text-xs text-green-500">{stage.timing}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {stage.fertilizers?.map((f, j) => (
                      <div key={j} className="flex items-center justify-between bg-green-900/30 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span className={typeColor[f.type?.toLowerCase()] || 'badge-green'}>{f.type}</span>
                          <span className="text-sm text-green-200">{f.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold text-amber-300">{f.quantityPerAcre}</p>
                          <p className="text-xs text-green-500">{f.method}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Precautions */}
              {result.precautions?.length > 0 && (
                <div className="card border-red-800/30 bg-red-950/20">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-400" /> Precautions
                  </h4>
                  <ul className="space-y-2">
                    {result.precautions.map((p, i) => (
                      <li key={i} className="flex gap-2 text-sm text-red-300/70">
                        <span className="text-red-500 mt-0.5">!</span> {p}
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
