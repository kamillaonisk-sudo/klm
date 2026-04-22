import React, { useState } from 'react';
import { checkBrandCompliance, ComplianceResult } from '../services/geminiService';
import { AlertTriangle, CheckCircle, Info, Loader2, Wand2 } from 'lucide-react';

export default function AIComplianceCheck() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState<ComplianceResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await checkBrandCompliance(content);
      setResult(res);
    } catch (error) {
      console.error('Compliance check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          AI Compliance Scanner
        </label>
        <textarea
          className="w-full h-32 p-4 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#00A1DE] focus:border-transparent outline-none resize-none"
          placeholder="Paste campaign copy or image descriptions here for compliance scanning..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleCheck}
          disabled={loading || !content.trim()}
          className="w-full flex items-center justify-center gap-2 bg-[#00A1DE] hover:bg-[#008cc2] text-white py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Wand2 className="w-4 h-4" />
          )}
          Run AI Violation Scan
        </button>
      </div>

      {result && (
        <div className={`p-5 rounded-lg border ${result.isCompliant ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'} transition-all animate-in fade-in slide-in-from-top-4`}>
          <div className="flex items-start gap-3">
            {result.isCompliant ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
            ) : (
              <AlertTriangle className={`w-5 h-5 mt-0.5 ${result.severity === 'high' ? 'text-red-600' : 'text-amber-500'}`} />
            )}
            <div className="flex-1">
              <h3 className={`text-sm font-bold ${result.isCompliant ? 'text-emerald-800' : 'text-red-800'}`}>
                {result.isCompliant ? 'Brand Compliant' : `Violations Detected (${result.severity} severity)`}
              </h3>
              
              {!result.isCompliant && (
                <ul className="mt-2 space-y-1">
                  {result.violations.map((v, i) => (
                    <li key={i} className="text-xs text-red-700 flex items-center gap-2">
                      <span className="w-1 h-1 bg-red-400 rounded-full" />
                      {v}
                    </li>
                  ))}
                </ul>
              )}

              {result.suggestions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-black/5">
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1 mb-2">
                    <Info className="w-3 h-3" /> Fix Suggestions
                  </p>
                  <ul className="space-y-1">
                    {result.suggestions.map((s, i) => (
                      <li key={i} className="text-xs text-slate-600">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
