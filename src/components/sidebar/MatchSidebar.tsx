import React, { useState } from 'react';
import { Zap, Bell, Check, Radio } from 'lucide-react';
import { useMatch } from '../../context/MatchContext';
import { useTheme } from '../../context/ThemeContext';
import { TeamFlag } from '../common/TeamFlag';

export const MatchSidebar: React.FC = () => {
  const { matches, selectedMatchId, selectMatch } = useMatch();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming'>('live');

  const liveMatches = matches.filter((m) => m.status === 'LIVE');
  const upcomingMatches = matches.filter((m) => m.status === 'UPCOMING' || m.status === 'COMPLETED');

  const displayedMatches = activeTab === 'live' ? liveMatches : upcomingMatches;

  return (
    <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-4">
      {/* Container Card */}
      <div className="bg-[#0B0F24]/70 dark:bg-[#0B0F24]/80 bg-white/90 border border-slate-200 dark:border-purple-900/30 rounded-2xl p-3.5 shadow-xl flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Zap className="w-4 h-4 fill-purple-400" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Live & Upcoming
            </h2>
          </div>
        </div>

        {/* Tab Switcher: Live (2) vs Upcoming (4) */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-[#121832] rounded-xl border border-slate-200 dark:border-purple-900/20 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('live')}
            className={`py-1.5 rounded-lg transition-all duration-150 ${
              activeTab === 'live'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Live ({liveMatches.length})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-1.5 rounded-lg transition-all duration-150 ${
              activeTab === 'upcoming'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Upcoming (4)
          </button>
        </div>

        {/* Match Cards List */}
        <div className="flex flex-col gap-2.5">
          {displayedMatches.map((match) => {
            const isSelected = match.id === selectedMatchId;
            const isLive = match.status === 'LIVE';

            return (
              <div
                key={match.id}
                onClick={() => selectMatch(match.id)}
                className={`relative p-3 rounded-xl cursor-pointer transition-all duration-200 text-left border ${
                  isSelected
                    ? 'bg-[#151D3B] dark:bg-[#151D3B] border-purple-500/80 shadow-lg shadow-purple-600/20 ring-1 ring-purple-500/50'
                    : 'bg-slate-50 dark:bg-[#121832] border-slate-200 dark:border-purple-900/20 hover:border-purple-500/40 hover:bg-slate-100 dark:hover:bg-[#151D38]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <TeamFlag teamCode={match.team1.teamCode} size="sm" />
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {match.team1.teamCode} vs {match.team2.teamCode}
                    </span>
                  </div>

                  {isLive ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      LIVE
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="text-slate-400 hover:text-purple-400 transition-colors p-0.5"
                    >
                      <Bell className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                  {match.series}
                </div>

                {isLive ? (
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-800 dark:text-slate-200 pt-1 border-t border-slate-200 dark:border-purple-900/20">
                    <span>
                      {match.team1.teamCode} {match.team1.score}/{match.team1.wickets}{' '}
                      <span className="text-[10px] font-normal text-slate-400">
                        ({match.team1.overs})
                      </span>
                    </span>
                    <span>
                      {match.team2.teamCode} {match.team2.score}/{match.team2.wickets}{' '}
                      <span className="text-[10px] font-normal text-slate-400">
                        ({match.team2.overs})
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200 dark:border-purple-900/20">
                    {match.startTime || match.statusNote}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cricket Stadium Night Artwork Card (matches screenshot visual illustration) */}
      <div className="relative rounded-2xl overflow-hidden border border-purple-900/30 bg-[#0B0F24] p-3 text-white shadow-xl min-h-[170px] flex flex-col justify-end">
        {/* Dynamic Stadium SVG Backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 300 200" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="stadiumSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B0F24" />
                <stop offset="60%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#311042" />
              </linearGradient>
              <radialGradient id="floodLightGlow" cx="20%" cy="20%" r="50%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#818CF8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="laserBeam" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Stadium Sky & Stands */}
            <rect width="300" height="200" fill="url(#stadiumSky)" />
            <circle cx="50" cy="50" r="80" fill="url(#floodLightGlow)" />

            {/* Light Tower on left */}
            <path d="M 40,20 L 60,20 L 52,140 L 48,140 Z" fill="#1E293B" opacity="0.6" />
            <rect x="36" y="16" width="28" height="12" rx="2" fill="#E0F2FE" opacity="0.9" filter="drop-shadow(0 0 6px #38BDF8)" />
            {/* Beams */}
            <polygon points="50,22 140,180 220,180 50,22" fill="url(#laserBeam)" opacity="0.25" />

            {/* Crowd tiers */}
            <path d="M 0,140 Q 150,110 300,140 L 300,200 L 0,200 Z" fill="#0F172A" />
            <path d="M 0,155 Q 150,130 300,155 L 300,200 L 0,200 Z" fill="#090D1A" />
            {/* Subtle crowd bokeh dots */}
            {Array.from({ length: 30 }).map((_, i) => (
              <circle
                key={i}
                cx={(i * 10) + (i % 3) * 4}
                cy={145 + (i % 4) * 3}
                r={1}
                fill={i % 2 === 0 ? '#38BDF8' : '#C084FC'}
                opacity={0.4}
              />
            ))}

            {/* Cricket Pitch Ground */}
            <ellipse cx="160" cy="190" rx="130" ry="35" fill="#14532D" opacity="0.4" />

            {/* Batsman Silhouette with Blue/Purple Rim Light */}
            <g transform="translate(160, 85) scale(0.65)">
              {/* Bat with glow trail */}
              <path d="M 50,20 L 95,-10 L 100,-5 L 55,25 Z" fill="#E0E7FF" filter="drop-shadow(0 0 4px #818CF8)" />
              {/* Helmet & Head */}
              <circle cx="36" cy="38" r="14" fill="#0B0F24" stroke="#60A5FA" strokeWidth="2" />
              {/* Torso in batting stance */}
              <path d="M 28,52 L 48,50 L 54,90 L 26,88 Z" fill="#0B0F24" stroke="#818CF8" strokeWidth="2" />
              {/* Arms */}
              <path d="M 32,54 L 52,22" stroke="#60A5FA" strokeWidth="6" strokeLinecap="round" />
              {/* Legs */}
              <path d="M 32,88 L 18,135" stroke="#0B0F24" strokeWidth="8" strokeLinecap="round" />
              <path d="M 46,88 L 60,135" stroke="#0B0F24" strokeWidth="8" strokeLinecap="round" />
              {/* Pads */}
              <rect x="12" y="105" width="12" height="30" rx="4" fill="#3B82F6" opacity="0.8" />
              <rect x="54" y="105" width="12" height="30" rx="4" fill="#6366F1" opacity="0.8" />
            </g>
          </svg>
        </div>

        {/* Content overlay */}
        <div className="relative z-10">
          <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
            SCG Night Session
          </span>
          <p className="text-xs font-semibold text-white mt-1">
            Stadium Lights On • Pitch Holding Steady
          </p>
        </div>
      </div>

      {/* Mini Theme Selector Previews (matches screenshot exactly at bottom left) */}
      <div className="grid grid-cols-2 gap-2.5 p-2 bg-[#0B0F24]/70 dark:bg-[#0B0F24]/80 bg-white/90 border border-slate-200 dark:border-purple-900/30 rounded-2xl">
        {/* Dark Mode Card */}
        <button
          onClick={() => setTheme('dark')}
          className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all border text-left ${
            theme === 'dark'
              ? 'bg-[#151D3B] border-purple-500 shadow-sm shadow-purple-500/30'
              : 'bg-slate-100 dark:bg-[#121832] border-transparent hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          {/* Miniature Dark UI mockup */}
          <div className="w-full h-11 rounded-lg bg-[#0A0E23] border border-purple-900/40 p-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-3 h-1 rounded bg-purple-500" />
              <div className="w-4 h-1 rounded bg-cyan-400" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-[#151D3B] border border-purple-500/30" />
              <div className="w-6 h-2 rounded bg-slate-700" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-800 dark:text-white">
            <div className="w-3.5 h-3.5 rounded-full bg-purple-600 flex items-center justify-center text-white text-[9px]">
              {theme === 'dark' && <Check className="w-2.5 h-2.5" />}
            </div>
            <span>Dark Mode</span>
          </div>
        </button>

        {/* Light Mode Card */}
        <button
          onClick={() => setTheme('light')}
          className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all border text-left ${
            theme === 'light'
              ? 'bg-purple-50 border-purple-500 shadow-sm shadow-purple-500/30'
              : 'bg-slate-100 dark:bg-[#121832] border-transparent hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          {/* Miniature Light UI mockup */}
          <div className="w-full h-11 rounded-lg bg-white border border-slate-200 p-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-3 h-1 rounded bg-purple-400" />
              <div className="w-4 h-1 rounded bg-blue-500" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-slate-100 border border-slate-200" />
              <div className="w-6 h-2 rounded bg-slate-300" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-800 dark:text-white">
            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[9px] ${
              theme === 'light' ? 'bg-purple-600 text-white border-purple-600' : 'border-slate-400'
            }`}>
              {theme === 'light' && <Check className="w-2.5 h-2.5" />}
            </div>
            <span>Light Mode</span>
          </div>
        </button>
      </div>
    </aside>
  );
};
