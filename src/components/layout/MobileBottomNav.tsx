import React from 'react';
import { Radio, Calendar, BarChart2, FlaskConical } from 'lucide-react';
import { useMatch, AppNav } from '../../context/MatchContext';

export const MobileBottomNav: React.FC = () => {
  const { currentNav, setCurrentNav } = useMatch();

  const navItems: { id: AppNav; label: string; icon: React.ReactNode }[] = [
    { id: 'live', label: 'Live', icon: <Radio className="w-5 h-5" /> },
    { id: 'matches', label: 'Matches', icon: <Calendar className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 className="w-5 h-5" /> },
    { id: 'simulator', label: 'Simulator', icon: <FlaskConical className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B0F24]/95 dark:bg-[#0B0F24]/95 bg-white/95 border-t border-slate-200 dark:border-purple-900/40 backdrop-blur-lg px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentNav(item.id)}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-purple-500 dark:text-purple-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive ? 'bg-purple-500/15 scale-110' : ''
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
