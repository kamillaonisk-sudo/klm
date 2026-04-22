import React, { useState } from 'react';
import { BrandGuideline } from '../types';
import { Sparkles, History, CheckCircle, FileText, Download } from 'lucide-react';

const GUIDELINES: BrandGuideline[] = [
  { version: '2.4.1', publishedAt: '2026-04-10', mandatory: true, content: 'Updated Logo Safe Zone requirements for digital banners. All existing assets must be updated by Q3.' },
  { version: '2.4.0', publishedAt: '2026-02-15', mandatory: true, content: 'Introduction of the new SkyBlue palette for seasonal campaigns.' },
];

export default function GuidelinesManager() {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
          <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Brand Guidelines</h1>
              <p className="text-sm text-slate-500 mt-1">Official source for all KLM brand assets and rules.</p>
          </div>
          <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                  <History className="w-4 h-4" />
                  Version History
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#00A1DE] rounded-lg hover:bg-[#008cc2]">
                  <Download className="w-4 h-4" />
                  Download Complete Kit
              </button>
          </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-6">
           <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                  <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-100 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      LATEST VERSION
                  </div>
               </div>
               
               <div className="flex items-center gap-3 text-[#00A1DE] mb-4">
                  <Sparkles className="w-6 h-6" />
                  <span className="text-lg font-bold">Version {GUIDELINES[0].version}</span>
               </div>
               
               <h2 className="text-xl font-bold text-slate-900 mb-4">Updated Safety Zones & Mobile Layouts</h2>
               
               <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed">
                    {GUIDELINES[0].content}
                    <br /><br />
                    This version includes granular updates for the mobile experience, specifically resizing the "KLM Horizon" element to ensure maximum readability on small viewports. 
                    <br /><br />
                    <strong>Key Changes:</strong>
                    <ul className="mt-2 list-disc pl-5">
                        <li>Safety margin increased by 5px for all SVG logo exports.</li>
                        <li>Typography weight adjusted for lower contrast displays.</li>
                        <li>Revised hex codes for Blue Horizon gradient.</li>
                    </ul>
                  </p>
               </div>

               <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${acknowledged ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                          <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                          <p className="text-sm font-bold text-slate-900">{acknowledged ? 'Guidelines Acknowledged' : 'Acknowledgement Required'}</p>
                          <p className="text-xs text-slate-500">Must be signed off by all regional directors.</p>
                      </div>
                  </div>
                  {!acknowledged && (
                      <button 
                         onClick={() => setAcknowledged(true)}
                         className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
                      >
                         Acknowledge Update
                      </button>
                  )}
               </div>
           </div>
        </div>

        <div className="col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Regional Compliance</h3>
                <div className="space-y-4">
                    <RegionAck name="Western Europe" acknowledged />
                    <RegionAck name="North America" acknowledged />
                    <RegionAck name="APAC" acknowledged={false} />
                    <RegionAck name="LATAM" acknowledged={false} />
                </div>
                <button className="w-full mt-6 py-2 text-[10px] font-bold text-[#00A1DE] border border-[#00A1DE]/20 rounded uppercase tracking-wider hover:bg-[#00A1DE]/5">
                    Send Global Reminder
                </button>
            </div>
            
            <div className="bg-[#00A1DE]/5 border border-[#00A1DE]/10 rounded-xl p-6">
                <div className="flex items-center gap-3 text-[#00A1DE] mb-4">
                     <FileText className="w-5 h-5" />
                     <span className="font-bold">Summary Report</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-bold tracking-tight">
                    Next Audit Cycle: May 2026<br />
                    System Monitoring: Enabled<br />
                    Violation Alerting: Active
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}

function RegionAck({ name, acknowledged }: { name: string, acknowledged: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700">{name}</span>
            <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${acknowledged ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                {acknowledged ? 'SIGNED' : 'PENDING'}
            </div>
        </div>
    );
}
