import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Bug, Upload, X, AlertTriangle, CheckCircle, Leaf, Shield, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { detectDisease } from '../services/api';
import { useLang } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfidenceBadge from '../components/ConfidenceBadge';

const severityConfig = {
  none: { color: 'text-green-400 bg-green-900/30 border-green-700/30', label: 'Healthy' },
  mild: { color: 'text-amber-400 bg-amber-900/30 border-amber-700/30', label: 'Mild' },
  moderate: { color: 'text-orange-400 bg-orange-900/30 border-orange-700/30', label: 'Moderate' },
  severe: { color: 'text-red-400 bg-red-900/30 border-red-700/30', label: 'Severe' },
};

export default function Disease() {
  const { t, lang } = useLang();
  const [image, setImage] = useState(null); // { preview, base64, mimeType }
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onDrop = useCallback((accepted) => {
    const file = accepted[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
      setImage({ preview: dataUrl, base64: match ? match[2] : dataUrl, mimeType: match ? match[1] : file.type });
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: () => toast.error('Invalid file. Use JPG/PNG under 5MB.'),
  });

  const analyze = async () => {
    if (!image) { toast.error('Please upload an image first.'); return; }
    setLoading(true);
    try {
      const res = await detectDisease(image.base64, image.mimeType, lang);
      setResult(res.data);
      toast.success('Analysis complete!');
    } catch (e) {
      toast.error(e.message || t('error_generic'));
    } finally {
      setLoading(false);
    }
  };

  const sev = severityConfig[result?.severity?.toLowerCase()] || severityConfig.mild;
  const isHealthy = result?.diseaseName?.toLowerCase().includes('healthy');

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-6xl mx-auto">
      <div className="mb-10">
        <span className="badge bg-red-900/60 text-red-300 border-red-700/40 mb-3">Vision AI</span>
        <h1 className="section-title">{t('disease_title')}</h1>
        <p className="section-subtitle">{t('disease_subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload panel */}
        <div className="space-y-4">
          <div
            {...getRootProps()}
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
              isDragActive
                ? 'border-green-400 bg-green-900/30'
                : 'border-green-700/50 bg-green-950/40 hover:border-green-600 hover:bg-green-900/20'
            }`}
          >
            <input {...getInputProps()} />
            {image ? (
              <div className="relative">
                <img src={image.preview} alt="Plant" className="max-h-64 mx-auto rounded-xl object-contain" />
                <button
                  onClick={(e) => { e.stopPropagation(); setImage(null); setResult(null); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-900/80 rounded-full flex items-center justify-center text-red-300 hover:bg-red-700 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="py-6">
                <Upload size={40} className="text-green-600 mx-auto mb-4 animate-float" />
                <p className="text-green-300 font-medium mb-1">{t('disease_drop')}</p>
                <p className="text-green-600 text-sm">{t('disease_browse')}</p>
                <p className="text-green-700 text-xs mt-3">JPG, PNG, WebP • Max 5MB</p>
              </div>
            )}
          </div>

          <button onClick={analyze} disabled={!image || loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? 'Detecting disease...' : t('disease_cta')}
            {!loading && <ChevronRight size={16} />}
          </button>

          {/* Tips */}
          <div className="card text-sm space-y-2">
            <p className="font-medium text-green-300 flex items-center gap-2"><Leaf size={14} /> Photo Tips</p>
            {['Take photo in natural daylight', 'Focus on affected leaves or stems', 'Ensure the image is clear and sharp', 'Capture the whole plant if possible'].map((tip) => (
              <p key={tip} className="text-green-500/70 flex gap-2"><span className="text-green-600">•</span>{tip}</p>
            ))}
          </div>
        </div>

        {/* Results panel */}
        <div>
          {loading && <LoadingSpinner message="Analyzing plant health..." />}

          {!loading && !result && (
            <div className="flex flex-col items-center justify-center h-64 card border-dashed">
              <Bug size={40} className="text-red-800 mb-3" />
              <p className="text-green-500/60 text-center">Upload a plant image to detect diseases and get treatment recommendations.</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4 animate-fade-in">
              {/* Disease header */}
              <div className={`card border ${isHealthy ? 'border-green-600/40 bg-green-900/20' : 'border-red-700/30 bg-red-950/20'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {isHealthy
                      ? <CheckCircle size={28} className="text-green-400 flex-shrink-0" />
                      : <AlertTriangle size={28} className="text-red-400 flex-shrink-0" />}
                    <div>
                      <h3 className="font-bold text-xl text-white">{result.diseaseName}</h3>
                      {result.affectedParts?.length > 0 && (
                        <p className="text-xs text-green-500">Affects: {result.affectedParts.join(', ')}</p>
                      )}
                    </div>
                  </div>
                  <ConfidenceBadge value={result.confidence} />
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className={`badge border ${sev.color}`}>{sev.label} Severity</span>
                  {result.spreadRisk && (
                    <span className="badge-amber">Spread Risk: {result.spreadRisk}</span>
                  )}
                  {result.estimatedYieldLoss && !isHealthy && (
                    <span className="badge bg-red-900/40 text-red-300 border-red-700/30">
                      ~{result.estimatedYieldLoss} yield loss
                    </span>
                  )}
                </div>
              </div>

              {/* Symptoms */}
              {result.symptoms?.length > 0 && (
                <div className="card">
                  <h4 className="font-semibold text-white mb-3">{t('symptoms')}</h4>
                  <ul className="space-y-1.5">
                    {result.symptoms.map((s, i) => (
                      <li key={i} className="flex gap-2 text-sm text-green-300/70">
                        <span className="text-amber-500 mt-0.5">•</span> {s}
                      </li>
                    ))}
                  </ul>
                  {result.causes && (
                    <div className="mt-3 bg-green-900/30 rounded-xl p-3">
                      <p className="text-xs text-green-500 mb-1">Causes</p>
                      <p className="text-sm text-green-300/80">{result.causes}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Treatment */}
              {result.treatment && !isHealthy && (
                <div className="card">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Shield size={16} className="text-amber-400" /> {t('treatment')}
                  </h4>
                  {result.treatment.immediate?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-red-400 mb-2">Immediate Actions</p>
                      {result.treatment.immediate.map((a, i) => (
                        <p key={i} className="text-sm text-green-300/80 flex gap-2 mb-1.5"><span className="text-red-400">→</span>{a}</p>
                      ))}
                    </div>
                  )}
                  {result.treatment.chemical?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-blue-400 mb-2">Chemical Treatment</p>
                      {result.treatment.chemical.map((a, i) => (
                        <p key={i} className="text-sm text-green-300/80 flex gap-2 mb-1.5"><span className="text-blue-400">→</span>{a}</p>
                      ))}
                    </div>
                  )}
                  {result.treatment.organic?.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-green-400 mb-2">Organic Treatment</p>
                      {result.treatment.organic.map((a, i) => (
                        <p key={i} className="text-sm text-green-300/80 flex gap-2 mb-1.5"><span className="text-green-400">→</span>{a}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Prevention */}
              {result.prevention?.length > 0 && (
                <div className="card">
                  <h4 className="font-semibold text-white mb-3">{t('prevention')}</h4>
                  <ul className="space-y-1.5">
                    {result.prevention.map((p, i) => (
                      <li key={i} className="flex gap-2 text-sm text-green-300/70">
                        <span className="text-green-500 mt-0.5">✓</span> {p}
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
