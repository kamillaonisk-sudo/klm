import { LayoutDashboard, ShieldCheck, Clock, FileText, Settings, LogOut, UserCircle, Lock, MonitorCheck } from 'lucide-react';
import React from 'react';
import { UserRole, ViewType } from '../types';

interface NavItemProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick: () => void;
  restricted?: boolean;
}

const NavItem = ({ icon: Icon, label, active, onClick, restricted }: NavItemProps) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all relative ${
      active 
        ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/20' 
        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-[#00A1DE]' : 'opacity-70'}`} />
    {label}
    {restricted && !active && <Lock className="w-3 h-3 absolute right-3 opacity-30" />}
  </button>
);

interface Props {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  userRole: UserRole;
  toggleRole: () => void;
}

export default function DashboardLayout({ children, activeView, setActiveView, userRole, toggleRole }: Props) {
  const isAdmin = userRole === 'BRAND_DIRECTOR';

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-500 overflow-hidden h-screen ${isAdmin ? 'bg-[#0A0E14]' : 'bg-slate-50'}`}>
      <aside className={`w-64 flex-shrink-0 border-r p-0 flex flex-col transition-colors duration-500 ${isAdmin ? 'bg-[#121820] border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className={`flex h-16 items-center px-6 border-b ${isAdmin ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className={`h-8 w-8 rounded flex items-center justify-center ${isAdmin ? 'bg-[#00A1DE]' : 'bg-[#00A1DE]'}`}>
                <div className="h-4 w-4 border-2 border-white rounded-sm"></div>
            </div>
            <span className={`ml-3 font-bold tracking-tight ${isAdmin ? 'text-white' : 'text-[#00A1DE]'}`}>KLM {isAdmin ? 'DIRECTOR' : 'BRAND'}</span>
        </div>
        
        {/* Command Center Toggle */}
        <div className={`px-4 py-6 border-b ${isAdmin ? 'border-slate-800 bg-[#0A0E14]/50' : 'border-slate-50'}`}>
           <div className="flex items-center justify-between mb-4 px-2">
              <p className={`text-[10px] uppercase font-bold tracking-widest ${isAdmin ? 'text-[#00A1DE]' : 'text-slate-400'}`}>System Mode</p>
              {isAdmin && <span className="flex h-2 w-2 rounded-full bg-[#00A1DE] animate-pulse" />}
           </div>
           
           <button 
             onClick={toggleRole}
             className={`w-full flex items-center justify-between p-2 rounded-xl border transition-all ${
               isAdmin 
                 ? 'bg-slate-900 border-[#00A1DE]/40 text-white shadow-[0_0_15px_rgba(0,161,222,0.1)]' 
                 : 'bg-slate-100 border-slate-200 text-slate-600'
             }`}
           >
              <div className="flex items-center gap-2">
                 {isAdmin ? <MonitorCheck className="w-4 h-4 text-[#00A1DE]" /> : <UserCircle className="w-4 h-4" />}
                 <span className="text-xs font-bold">{isAdmin ? 'Command Center' : 'User View'}</span>
              </div>
              <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${isAdmin ? 'bg-[#00A1DE]' : 'bg-slate-300'}`}>
                 <div className={`w-3 h-3 bg-white rounded-full transition-transform transform ${isAdmin ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
           </button>
        </div>

        <nav className="p-4 flex-1 space-y-1">
          <NavItem active={activeView === 'DASHBOARD'} onClick={() => setActiveView('DASHBOARD')} icon={LayoutDashboard} label="Dashboard" />
          <NavItem active={activeView === 'CAMPAIGNS'} onClick={() => setActiveView('CAMPAIGNS')} icon={FileText} label="Campaigns" />
          <NavItem active={activeView === 'GUIDELINES'} onClick={() => setActiveView('GUIDELINES')} icon={ShieldCheck} label="Guidelines" />
          <NavItem active={activeView === 'AUDIT'} onClick={() => setActiveView('AUDIT')} icon={Clock} label="Audit Trail" />
          <NavItem restricted active={activeView === 'ADMIN_VAULT'} onClick={() => setActiveView('ADMIN_VAULT')} icon={Lock} label="Admin Vault" />
        </nav>

        <div className={`p-4 border-t ${isAdmin ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
          <div className="flex items-center gap-3 px-2 py-3">
             <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isAdmin ? 'bg-[#00A1DE]/20 text-[#00A1DE]' : 'bg-[#00A1DE]/10 text-[#00A1DE]'}`}>
                <UserCircle className="w-6 h-6" />
             </div>
             <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold truncate ${isAdmin ? 'text-white' : 'text-slate-900'}`}>B. van der Meer</p>
                <p className={`text-[10px] uppercase font-medium ${isAdmin ? 'text-[#00A1DE]' : 'text-slate-500'}`}>{isAdmin ? 'Global Director' : 'Regional Lead'}</p>
             </div>
          </div>
        </div>
      </aside>
      <main className={`flex-1 flex flex-col overflow-hidden transition-colors duration-500 ${isAdmin ? 'bg-[#0A0E14]' : 'bg-slate-50/30'}`}>
        {children}
      </main>
    </div>
  );
}
