import React, { useState } from 'react';
import { Brain, Sparkles, TrendingUp, Users, Lightbulb, MessageCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { generateStrategicReport, StrategicReport, ReportType } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

const REPORT_TYPES: { type: ReportType; label: string; icon: any; color: string; desc: string }[] = [
  { type: 'TREND_ANALYSIS', label: 'Trend Analysis', icon: TrendingUp, color: 'text-blue-500', desc: 'Summary of common brand violations.' },
  { type: 'AGENCY_COACHING', label: 'Agency Coaching', icon: Users, color: 'text-emerald-500', desc: 'Identify regions needing education.' },
  { type: 'CREATIVE_HARVESTING', label: 'Creative Harvesting', icon: Lightbulb, color: 'text-amber-500', desc: 'Innovative ideas from top agencies.' },
  { type: 'FLEXIBILITY_DIALOGUE', label: 'Flexibility Dialogue', icon: MessageCircle, color: 'text-purple-500', desc: 'Pain points and flexibility reasons.' },
];

export default function AIBrainAssistant() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<StrategicReport | null>(null);
  const [selectedType, setSelectedType] = useState<ReportType | null>(null);

  const getReport = async (type: ReportType) => {
    setLoading(true);
    setSelectedType(type);
    try {
      const data = await generateStrategicReport(type);
      setReport(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
            <Brain className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">AI Strategic Assistant</h3>
        </div>
        {report && (
            <button 
                onClick={() => { setReport(null); setSelectedType(null); }}
                className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest flex items-center gap-1"
            >
                <RefreshCw className="w-3 h-3" /> Reset
            </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {!report && !loading ? (
            <motion.div 
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-4">Select Strategic Audit Type</p>
              {REPORT_TYPES.map((item) => (
                <button
                  key={item.type}
                  onClick={() => getReport(item.type)}
                  className="w-full p-4 rounded-xl border border-slate-100 hover:border-[#00A1DE]/30 hover:bg-[#00A1DE]/5 transition-all text-left flex items-center gap-4 group"
                >
                  <div className={`p-2 rounded-lg bg-white shadow-sm border border-slate-50 ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-slate-900">{item.label}</h4>
                    <p className="text-[10px] text-slate-500">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#00A1DE] transition-colors" />
                </button>
              ))}
            </motion.div>
          ) : loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-12 h-12 rounded-2xl border-4 border-slate-100 border-t-[#00A1DE] animate-spin mb-4" />
              <p className="text-xs font-bold text-slate-900">Scanning Audit History...</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Gemini-3 Brain is analyzing trends</p>
            </motion.div>
          ) : (
            <motion.div 
              key="report"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                 {REPORT_TYPES.find(t => t.type === selectedType)?.icon && (
                    <div className={`p-2 rounded-lg bg-slate-50 ${REPORT_TYPES.find(t => t.type === selectedType)?.color}`}>
                        {React.createElement(REPORT_TYPES.find(t => t.type === selectedType)!.icon, { className: "w-5 h-5" })}
                    </div>
                 )}
                 <h4 className="text-sm font-bold text-slate-900">{REPORT_TYPES.find(t => t.type === selectedType)?.label} Report</h4>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{report.summary}"
                </p>
              </div>

              <div className="space-y-4">
                 <h5 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Key Insights</h5>
                 <div className="grid grid-cols-1 gap-2">
                    {report.dataPoints.map((dp, i) => (
                        <div key={i} className="p-3 bg-white border border-slate-100 rounded-lg flex justify-between items-center">
                            <span className="text-[10px] font-medium text-slate-500">{dp.label}</span>
                            <span className="text-xs font-bold text-slate-900">{dp.value}</span>
                        </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-3">
                 <h5 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Actionable Recommendations</h5>
                 <div className="space-y-2">
                    {report.recommendations.map((rec, i) => (
                        <div key={i} className="flex gap-3 text-xs leading-relaxed text-slate-600">
                            <Sparkles className="w-4 h-4 text-[#00A1DE] shrink-0" />
                            <span>{rec}</span>
                        </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
