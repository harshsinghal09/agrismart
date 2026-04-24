export default function ConfidenceBadge({ value }) {
  const pct = parseInt(value) || 0;
  const color = pct >= 80 ? 'text-green-400 border-green-700/50 bg-green-900/40'
    : pct >= 60 ? 'text-amber-400 border-amber-700/50 bg-amber-900/40'
    : 'text-red-400 border-red-700/50 bg-red-900/40';

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {value || `${pct}%`} Confidence
    </span>
  );
}
