const regions = [
  { name: 'Western Europe', score: 92 },
  { name: 'North America', score: 85 },
  { name: 'APAC', score: 72 },
  { name: 'LATAM', score: 68 },
];

export default function ComplianceHeatmap() {
  return (
    <div className="space-y-4">
      {regions.map((r, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="w-32 text-xs font-semibold text-slate-700">{r.name}</span>
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
                className={`h-full ${r.score > 90 ? 'bg-emerald-600' : r.score > 80 ? 'bg-amber-500' : 'bg-red-600'}`} 
                style={{ width: `${r.score}%` }} 
            />
          </div>
          <span className="text-xs font-semibold text-slate-800 tabular-nums">{r.score}%</span>
        </div>
      ))}
    </div>
  );
}
