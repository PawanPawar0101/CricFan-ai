import React, { useState } from 'react';
import { Sparkles, ChevronDown, Activity, AlertCircle } from 'lucide-react';
import { useMatch } from '../../context/MatchContext';

export const AIMatchInsight: React.FC = () => {
  const { currentMatch } = useMatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const insight = currentMatch.insight;

  return (
    <div className="rounded-2xl bg-[#0B0F24]/80 dark:bg-[#0B0F24]/90 bg-white/95 border border-slate-200 dark:border-purple-900/30 p-4 sm:p-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

      {/* Header with Sparkles */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-3">
        <Sparkles className="w-4 h-4 text-purple-400 fill-purple-400" />
        <span className="font-heading tracking-wide">AI Match Insight</span>
        <Sparkles className="w-4 h-4 text-purple-400 fill-purple-400" />
      </div>

      {/* Main Content with Robot Mascot */}
      <div className="flex items-start gap-3">
        {/* Insight Text */}
        <div className="flex-1">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
            {insight.summary}
          </p>
        </div>

        {/* 3D Cute Robot Mascot (matches the screenshot 3D white robot with blue visor & AI chest badge!) */}
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="robotBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
              <linearGradient id="visorGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <radialGradient id="chestBadge" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#1E40AF" />
              </radialGradient>
            </defs>

            {/* Antenna with blue orb */}
            <line x1="50" y1="18" x2="50" y2="10" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="8" r="4" fill="#38BDF8" filter="drop-shadow(0 0 4px #38BDF8)" />

            {/* Robot Head (curved rounded rectangle) */}
            <rect x="22" y="18" width="56" height="42" rx="18" fill="url(#robotBody)" stroke="#E2E8F0" strokeWidth="1.5" />

            {/* Glowing Visor */}
            <rect x="28" y="27" width="44" height="24" rx="10" fill="#0F172A" />
            <rect x="30" y="29" width="40" height="20" rx="8" fill="url(#visorGlow)" />
            {/* Friendly eyes */}
            <circle cx="42" cy="39" r="3.5" fill="#FFFFFF" />
            <circle cx="58" cy="39" r="3.5" fill="#FFFFFF" />

            {/* Robot Torso */}
            <path d="M 30,62 L 70,62 L 66,92 L 34,92 Z" fill="url(#robotBody)" stroke="#CBD5E1" strokeWidth="1" />

            {/* Arms */}
            <rect x="18" y="64" width="9" height="20" rx="4" fill="#E2E8F0" />
            <rect x="73" y="64" width="9" height="20" rx="4" fill="#E2E8F0" />

            {/* AI Chest Badge */}
            <circle cx="50" cy="76" r="8" fill="url(#chestBadge)" />
            <text x="50" y="79.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold" fontFamily="sans-serif">
              AI
            </text>
          </svg>
        </div>
      </div>

      {/* Expandable Key Match Factors Toggle */}
      <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-purple-900/20">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline"
        >
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Key Match Changing Factors</span>
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 transform transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isExpanded && (
          <div className="mt-2.5 space-y-2 text-xs animate-in fade-in duration-200">
            {insight.keyFactors.map((factor, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/20 flex flex-col gap-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-100">{factor.label}</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      factor.impact === 'HIGH'
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {factor.impact} Impact
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{factor.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
