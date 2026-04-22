import React, { useState } from 'react';
import { Campaign, WorkflowStage } from '../types';
import { CheckCircle2, Circle, Clock, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';

const STAGES: WorkflowStage[] = ['DRAFT', 'REGIONAL_REVIEW', 'DIRECTOR_SIGN_OFF', 'PUBLISHED'];

const INITIAL_CAMPAIGNS: Campaign[] = [
  { id: '1', name: 'Summer Campaign 2026', region: 'Western Europe', stage: 'REGIONAL_REVIEW', owner: 'L. Hoffmann', deadline: '2026-06-01' },
  { id: '2', name: 'Elite Member Refresh', region: 'North America', stage: 'DRAFT', owner: 'J. Smith', deadline: '2026-05-15' },
  { id: '3', name: 'New Fleet Launch', region: 'Global', stage: 'DIRECTOR_SIGN_OFF', owner: 'M. Rossi', deadline: '2026-04-30', violations: ['Typography mismatch'] },
];

export default function CampaignWorkflow() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);

  const moveStage = (id: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        const currentIndex = STAGES.indexOf(c.stage);
        if (currentIndex < STAGES.length - 1) {
          return { ...c, stage: STAGES[currentIndex + 1] };
        }
      }
      return c;
    }));
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
          <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Campaign Pipeline</h1>
              <p className="text-sm text-slate-500 mt-1">Manage and approve regional brand submissions.</p>
          </div>
          <button className="bg-[#00A1DE] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#008cc2] transition-colors flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              New Submission
          </button>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${campaign.violations ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
                   {campaign.violations ? <AlertCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{campaign.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-bold uppercase py-0.5 px-2 bg-slate-100 rounded-full text-slate-500 tracking-wider">
                      {campaign.region}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Due: {campaign.deadline}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                {/* Workflow Viz */}
                <div className="flex items-center gap-2">
                   {STAGES.map((stage, idx) => {
                     const isCurrent = campaign.stage === stage;
                     const isCompleted = STAGES.indexOf(campaign.stage) > idx;
                     return (
                       <React.Fragment key={stage}>
                         <div className="flex flex-col items-center gap-1">
                            {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : 
                             isCurrent ? <Circle className="w-4 h-4 text-[#00A1DE] fill-[#00A1DE]/20" /> : 
                             <Circle className="w-4 h-4 text-slate-200" />}
                            <span className={`text-[8px] font-bold uppercase tracking-tight ${isCurrent ? 'text-slate-900' : 'text-slate-300'}`}>
                              {stage.split('_')[0]}
                            </span>
                         </div>
                         {idx < STAGES.length - 1 && <ChevronRight className="w-3 h-3 text-slate-200" />}
                       </React.Fragment>
                     );
                   })}
                </div>

                <button 
                  onClick={() => moveStage(campaign.id)}
                  className="px-4 py-2 border border-[#00A1DE] text-[#00A1DE] hover:bg-[#00A1DE]/5 text-xs font-bold rounded-lg transition-colors"
                >
                  Move to Next Stage
                </button>
              </div>
            </div>
            
            {campaign.violations && (
                <div className="px-5 py-3 bg-red-50/50 border-t border-red-50 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-xs font-medium text-red-700">Violation detected: {campaign.violations.join(', ')}</span>
                    <button className="ml-auto text-[10px] font-bold text-red-800 underline">VIEW DETAILS</button>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FileText({ className }: { className?: string }) {
    return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;
}
