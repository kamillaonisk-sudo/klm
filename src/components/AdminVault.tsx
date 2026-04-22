import React, { useState, useEffect } from 'react';
import { Lock, ShieldAlert, CheckSquare, BarChart3, MessageSquarePlus, Key, Eye, EyeOff, Settings, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import AIBrainAssistant from './AIBrainAssistant';

export default function AdminVault() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  // For demo, password is 'KLM2026'
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'KLM2026') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const [apiKey, setApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('KLM_CUSTOM_API_KEY');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleSaveApiKey = () => {
    setIsSaving(true);
    localStorage.setItem('KLM_CUSTOM_API_KEY', apiKey);
    setTimeout(() => setIsSaving(false), 800);
  };

  if (!isAuthenticated) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 bg-white rounded-2xl border border-slate-200 shadow-xl"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Decision Maker's Vault</h1>
            <p className="text-sm text-slate-500 mt-2">Sensitive brand governance and strategic audits. Restricted access only.</p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-1">Access Passcode</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-4 pr-12 py-3 bg-slate-50 border ${error ? 'border-red-500 bg-red-50' : 'border-slate-200'} rounded-xl outline-none focus:ring-2 focus:ring-slate-900/10 transition-all font-mono`}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && <p className="text-[10px] text-red-600 font-bold px-1">Invalid credentials. Access denied.</p>}
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-sm tracking-wide hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4 text-[#00A1DE]" />
              Unlock Secure Section
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center">
             <p className="text-[10px] text-slate-400 font-medium">Password hint: KLM2026</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 h-full overflow-y-auto space-y-8 bg-slate-50/50">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
             Strategic Governance Vault
             <span className="bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black">Secure</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">High-level review and automated agency performance auditing.</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Section 1: Up for Review */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 tracking-tight">Executive Review Queue</h3>
             </div>
             <span className="text-[10px] font-bold text-amber-600 uppercase border border-amber-200 px-2 py-0.5 rounded bg-amber-50">3 Pending Decision</span>
          </div>
          <div className="p-0">
             <div className="divide-y divide-slate-100">
                <ReviewItem 
                  title="Global Sustainable Aviation Campaign"
                  requester="Marketing EMEA"
                  priority="CRITICAL"
                  date="Apr 22"
                />
                <ReviewItem 
                  title="Blue Horizon Brand Assets v3.0"
                  requester="Design Lab HQ"
                  priority="HIGH"
                  date="Apr 21"
                />
                <ReviewItem 
                  title="Seasonal Social Media Kit - Q3"
                  requester="Digital Team"
                  priority="NORMAL"
                  date="Apr 20"
                />
             </div>
          </div>
        </div>

        {/* Section 2: AI Agency Audit -> AI Brain Assistant */}
        <div className="col-span-12 lg:col-span-5 flex flex-col min-h-[450px]">
           <AIBrainAssistant />
        </div>

        {/* Section 3: Brand Flexibility Requests */}
        <div className="col-span-12 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00A1DE]/10 text-[#00A1DE] flex items-center justify-center">
                  <MessageSquarePlus className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 tracking-tight">Brand Flexibility Exceptions</h3>
             </div>
             <button className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Historical Requests</button>
          </div>
          <div className="p-6">
             <div className="grid grid-cols-3 gap-6">
                <FlexibilityCard 
                  region="LATAM Market"
                  request="Gradient opacity adjustment for carnival activation"
                  status="PENDING DIRECTOR"
                  date="2h ago"
                />
                <FlexibilityCard 
                  region="Japan Regional"
                  request="Logo scaling exception for micro-print assets"
                  status="UNDER REVIEW"
                  date="5h ago"
                />
                <FlexibilityCard 
                   region="Cargo Division"
                   request="Dark mode variation for terminal displays"
                   status="APPROVED"
                   date="Yesterday"
                   approved
                />
             </div>
          </div>
        </div>

        {/* Section 4: System Configuration */}
        <div className="col-span-12 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <Settings className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 tracking-tight">System Configuration</h3>
             </div>
          </div>
          <div className="p-6">
             <div className="max-w-2xl space-y-4">
                <div>
                   <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block mb-2 px-1">Gemini API Key Override</label>
                   <div className="flex gap-3">
                      <div className="flex-1 relative">
                         <input 
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter custom API key..."
                            className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00A1DE]/10 transition-all font-mono text-sm"
                         />
                         <Key className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      </div>
                      <button 
                         onClick={handleSaveApiKey}
                         disabled={isSaving}
                         className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                            isSaving ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
                         }`}
                      >
                         {isSaving ? (
                            <>
                               <CheckSquare className="w-4 h-4" />
                               Saved
                            </>
                         ) : (
                            <>
                               <Save className="w-4 h-4" />
                               Save Key
                            </>
                         )}
                      </button>
                   </div>
                   <p className="text-[10px] text-slate-400 mt-2 px-1 italic">
                      This key is stored locally in your browser and overrides the system default for this session. Use this for testing or restricted audit access.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ title, requester, priority, date }: { title: string, requester: string, priority: 'CRITICAL' | 'HIGH' | 'NORMAL', date: string }) {
  const priorityColor = priority === 'CRITICAL' ? 'text-red-600 bg-red-50 border-red-100' : priority === 'HIGH' ? 'text-amber-600 bg-amber-50 border-amber-100' : 'text-slate-500 bg-slate-50 border-slate-100';
  
  return (
    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg border border-slate-100 bg-white shadow-sm group-hover:bg-slate-100 transition-all">
          <ShieldAlert className={`w-5 h-5 ${priority === 'CRITICAL' ? 'text-red-500' : 'text-slate-400'}`} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">Requested by <span className="text-slate-600">{requester}</span> • {date}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${priorityColor}`}>
          {priority}
        </span>
        <button className="px-4 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
          REVIEW NOW
        </button>
      </div>
    </div>
  );
}

function AuditMetric({ label, score }: { label: string, score: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <span className="text-xs font-mono font-bold text-[#00A1DE]">{score}</span>
    </div>
  );
}

function FlexibilityCard({ region, request, status, date, approved }: { region: string, request: string, status: string, date: string, approved?: boolean }) {
  return (
    <div className={`p-5 rounded-2xl border ${approved ? 'border-emerald-100 bg-emerald-50/20' : 'border-slate-100 bg-slate-50/40'} flex flex-col h-full`}>
       <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#00A1DE] px-2 py-0.5 bg-[#00A1DE]/5 rounded">{region}</span>
          <span className="text-[9px] font-bold text-slate-400">{date}</span>
       </div>
       <p className="text-[11px] font-bold text-slate-800 leading-relaxed mb-4 flex-1">"{request}"</p>
       <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <span className={`text-[9px] font-bold uppercase tracking-widest ${approved ? 'text-emerald-600' : 'text-amber-500'}`}>{status}</span>
          {!approved && <button className="text-[9px] font-bold text-slate-900 border-b border-slate-900 hover:text-[#00A1DE] hover:border-[#00A1DE] transition-all">DECIDE</button>}
       </div>
    </div>
  );
}
