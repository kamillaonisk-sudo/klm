import React from 'react';
import { Search, Download, Filter, ArrowUpDown } from 'lucide-react';
import { AuditEvent } from '../types';

const MOCK_AUDITS: AuditEvent[] = [
  { id: '1', timestamp: '2026-04-22 14:22:05', user: 'L. Hoffmann', role: 'REGIONAL_MANAGER', region: 'FRA Agency', action: 'Guideline Acknowledgement', asset: '#KLM-SUM24-001', status: 'SUCCESS' },
  { id: '2', timestamp: '2026-04-22 13:58:12', user: 'M. Rossi', role: 'REGIONAL_MANAGER', region: 'ITA Region', action: 'Violation Triggered (Safe Zone)', asset: '#KLM-BC-LOGO-V3', status: 'FLAGGED' },
  { id: '3', timestamp: '2026-04-22 13:10:44', user: 'S. Chen', role: 'REGIONAL_MANAGER', region: 'SIN Office', action: 'Regional Submission Draft', asset: '#KLM-SUM24-042', status: 'PENDING' },
  { id: '4', timestamp: '2026-04-22 12:05:33', user: 'B. Meer', role: 'BRAND_DIRECTOR', region: 'Global', action: 'Asset Published', asset: '#KLM-LOGO-2026', status: 'SUCCESS' },
  { id: '5', timestamp: '2026-04-22 11:42:12', user: 'J. Smith', role: 'REGIONAL_MANAGER', region: 'US Market', action: 'Asset Download', asset: '#FLY-BLUE-01', status: 'SUCCESS' },
];

export default function AuditTimeline() {
  return (
    <div className="p-8 h-full overflow-hidden flex flex-col">
       <div className="flex justify-between items-center mb-8">
          <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Asset Audit Trail</h1>
              <p className="text-sm text-slate-500 mt-1">Granular log of every interaction with KLM brand assets.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#00A1DE] border border-[#00A1DE]/20 rounded-lg hover:bg-[#00A1DE]/5 transition-colors">
              <Download className="w-4 h-4" />
              Export compliance report
          </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex gap-4">
              <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by asset ID, user, or region..." 
                    className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#00A1DE]/20"
                  />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg">
                  <Filter className="w-3.5 h-3.5" />
                  Filter
              </button>
          </div>

          <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-50/90 backdrop-blur-sm text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-200">
                      <tr>
                          <th className="px-6 py-4 font-bold flex items-center gap-1">Timestamp <ArrowUpDown className="w-3 h-3" /></th>
                          <th className="px-6 py-4 font-bold">User / Role</th>
                          <th className="px-6 py-4 font-bold">Region</th>
                          <th className="px-6 py-4 font-bold">Action Taken</th>
                          <th className="px-6 py-4 font-bold">Asset ID</th>
                          <th className="px-6 py-4 font-bold">Status</th>
                      </tr>
                  </thead>
                  <tbody className="text-xs">
                      {MOCK_AUDITS.map((audit) => (
                          <tr key={audit.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                              <td className="px-6 py-4 text-slate-500 font-mono">{audit.timestamp}</td>
                              <td className="px-6 py-4">
                                  <div className="flex flex-col">
                                      <span className="font-bold text-slate-900 group-hover:text-[#00A1DE] transition-colors">{audit.user}</span>
                                      <span className="text-[10px] text-slate-400 uppercase font-medium">{audit.role.replace('_', ' ')}</span>
                                  </div>
                              </td>
                              <td className="px-6 py-4 font-medium text-slate-700">{audit.region}</td>
                              <td className="px-6 py-4 text-slate-600">{audit.action}</td>
                              <td className="px-6 py-4">
                                  <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">{audit.asset}</span>
                              </td>
                              <td className="px-6 py-4">
                                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                      audit.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-600' : 
                                      audit.status === 'FLAGGED' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                                  }`}>
                                      <div className={`w-1.5 h-1.5 rounded-full ${
                                          audit.status === 'SUCCESS' ? 'bg-emerald-500' : 
                                          audit.status === 'FLAGGED' ? 'bg-red-500' : 'bg-amber-500'
                                      }`} />
                                      {audit.status}
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          
          <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/30">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing 5 of 1,402 entries</span>
              <div className="flex gap-2">
                  <button className="px-3 py-1 border border-slate-200 rounded text-[10px] font-bold text-slate-500 hover:bg-white disabled:opacity-50" disabled>PREV</button>
                  <button className="px-3 py-1 border border-slate-200 rounded text-[10px] font-bold text-slate-500 hover:bg-white">NEXT</button>
              </div>
          </div>
      </div>
    </div>
  );
}
