/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import DashboardLayout from './components/DashboardLayout';
import ApprovalFunnel from './components/ApprovalFunnel';
import ComplianceHeatmap from './components/ComplianceHeatmap';
import AuditTimeline from './components/AuditTimeline';
import AIComplianceCheck from './components/AIComplianceCheck';
import CampaignWorkflow from './components/CampaignWorkflow';
import GuidelinesManager from './components/GuidelinesManager';
import AdminVault from './components/AdminVault';
import AIBrainAssistant from './components/AIBrainAssistant';
import { UserRole, ViewType } from './types';
import { ShieldAlert, Zap, Globe } from 'lucide-react';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>('REGIONAL_MANAGER');
  const [activeView, setActiveView] = useState<ViewType>('DASHBOARD');

  const toggleRole = () => {
    setUserRole(prev => prev === 'BRAND_DIRECTOR' ? 'REGIONAL_MANAGER' : 'BRAND_DIRECTOR');
  };

  const isAdmin = userRole === 'BRAND_DIRECTOR';

  const renderContent = () => {
    switch (activeView) {
      case 'DASHBOARD':
        return (
          <div className="flex-1 overflow-y-auto">
            <header className={`h-16 border-b px-8 flex items-center justify-between sticky top-0 z-20 shrink-0 transition-colors duration-500 ${isAdmin ? 'bg-[#121820] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
                <div className="flex items-center space-x-2 text-sm">
                    <span className={`font-semibold capitalize ${isAdmin ? 'text-[#00A1DE]' : 'text-slate-900'}`}>{isAdmin ? 'Command Center' : 'Regional Overview'}</span>
                    <span className="text-slate-500">/</span>
                    <span className="text-slate-500">Action Dashboard</span>
                </div>
                <div className="flex items-center gap-4">
                    {isAdmin ? (
                        <div className="flex items-center bg-[#00A1DE]/10 text-[#00A1DE] px-3 py-1 rounded-full border border-[#00A1DE]/20 text-[10px] font-bold uppercase tracking-wider">
                            <Zap className="w-3 h-3 mr-2 fill-[#00A1DE]" />
                            Strategic Mode Active
                        </div>
                    ) : (
                        <div className="flex items-center bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-100 text-[10px] font-bold uppercase tracking-wider">
                            <ShieldAlert className="w-2 h-2 mr-2 animate-pulse" />
                            3 Alerts
                        </div>
                    )}
                    <button 
                      onClick={() => setActiveView('CAMPAIGNS')} 
                      className="bg-[#00A1DE] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-[#00A1DE]/20"
                    >
                        {isAdmin ? 'Global Review' : 'New Submission'}
                    </button>
                </div>
            </header>

            <div className="p-8 grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    {/* Top Row: Visualizations */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className={`p-6 rounded-2xl border shadow-sm transition-colors duration-500 ${isAdmin ? 'bg-[#121820] border-slate-800' : 'bg-white border-slate-200'}`}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className={`text-xs font-bold uppercase tracking-widest ${isAdmin ? 'text-slate-400' : 'text-slate-400'}`}>Approval Pipeline</h2>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isAdmin ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>REAL-TIME</span>
                            </div>
                            <ApprovalFunnel />
                        </div>
                        <div className={`p-6 rounded-2xl border shadow-sm transition-colors duration-500 ${isAdmin ? 'bg-[#121820] border-slate-800' : 'bg-white border-slate-200'}`}>
                             <div className="flex justify-between items-center mb-6">
                                <h2 className={`text-xs font-bold uppercase tracking-widest ${isAdmin ? 'text-slate-400' : 'text-slate-400'}`}>Market Compliance</h2>
                                <Globe className={`w-4 h-4 ${isAdmin ? 'text-[#00A1DE]' : 'text-slate-300'}`} />
                            </div>
                            <ComplianceHeatmap />
                        </div>
                    </div>

                    {/* Middle Row: Activity / Admin Insights */}
                    {isAdmin ? (
                        <div className="grid grid-cols-1 gap-8">
                             <div className="bg-[#121820] rounded-2xl border border-slate-800 shadow-xl overflow-hidden min-h-[500px]">
                                <AIBrainAssistant />
                             </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Activity Stream</h2>
                                <button onClick={() => setActiveView('AUDIT')} className="text-[10px] text-[#00A1DE] font-bold hover:underline">FULL LOGS</button>
                            </div>
                            <div className="p-6">
                                <AuditPreview />
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <div className={`p-6 rounded-2xl border shadow-xl transition-colors duration-500 ${isAdmin ? 'bg-[#121820] border-slate-800' : 'bg-white border-slate-200'}`}>
                        <AIComplianceCheck />
                    </div>
                    
                    <div className={`p-7 rounded-2xl transition-all duration-500 ${isAdmin ? 'bg-[#00A1DE] text-white shadow-[0_0_30px_rgba(0,161,222,0.15)]' : 'bg-slate-900 text-white'}`}>
                        <div className="flex items-center gap-3 mb-4">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isAdmin ? 'bg-white/20' : 'bg-[#00A1DE]/20 text-[#00A1DE]'}`}>
                              <ShieldAlert className="w-5 h-5" />
                           </div>
                           <h3 className="text-sm font-bold uppercase tracking-widest">System Status</h3>
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed font-medium">
                            {isAdmin 
                              ? 'Strategic mode enabled. All regional audit channels are reporting. Gemini 3.1 Flash is processing distributed logs.'
                              : 'You are viewing Western European assets. Two campaigns are currently awaiting your local review.'}
                        </p>
                        <button 
                          onClick={() => setActiveView('GUIDELINES')} 
                          className={`mt-6 w-full py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                            isAdmin 
                              ? 'bg-white text-slate-900 border border-white' 
                              : 'bg-transparent text-[#00A1DE] border border-[#00A1DE]/20 hover:bg-[#00A1DE]/5'}`}
                        >
                           {isAdmin ? 'Update Global Policies' : 'Review Guidelines'}
                        </button>
                    </div>
                </div>
            </div>
          </div>
        );
      case 'CAMPAIGNS':
        return <CampaignWorkflow />;
      case 'GUIDELINES':
        return <GuidelinesManager />;
      case 'AUDIT':
        return <AuditTimeline />;
      case 'ADMIN_VAULT':
        return <AdminVault />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <DashboardLayout 
      activeView={activeView} 
      setActiveView={setActiveView} 
      userRole={userRole} 
      toggleRole={toggleRole}
    >
      {renderContent()}
    </DashboardLayout>
  );
}

function AuditPreview() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tight px-2">
                <span className="w-24">Timestamp</span>
                <span className="w-32">User</span>
                <span className="flex-1">Action</span>
            </div>
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center justify-between text-xs py-3 px-2 border-b border-slate-50 last:border-0 font-mono hover:bg-slate-50 rounded-lg transition-colors group">
                    <span className="w-24 text-slate-400">14:22:{i}0</span>
                    <span className="w-32 font-bold text-slate-900 group-hover:text-[#00A1DE]">L. Hoffmann</span>
                    <span className="flex-1 text-slate-600">Asset Sync (#KLM-SUM24-{i})</span>
                </div>
            ))}
        </div>
    )
}

