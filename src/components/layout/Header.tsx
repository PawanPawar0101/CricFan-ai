import React, { useState } from 'react';
import { Radio, Calendar, BarChart2, FlaskConical, Bell, Moon, Sun, User, Check, X, ShieldAlert, Sparkles, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useMatch, AppNav } from '../../context/MatchContext';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { theme, toggleTheme } = useTheme();
  const { currentNav, setCurrentNav, currentMatch, matches, selectMatch } = useMatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMatchSelector, setShowMatchSelector] = useState(false);

  const notifications = [
    { id: '1', title: 'Rohit Sharma reached 50!', time: '10m ago', unread: true },
    { id: '2', title: 'High RRR Alert: 21.00 req / over', time: '2m ago', unread: true },
    { id: '3', title: 'ENG vs SA starts at 7:30 PM', time: '1h ago', unread: false },
  ];

  return (
    <header className="relative w-full z-40 bg-[#0B0F24]/90 dark:bg-[#0B0F24]/95 bg-white/95 border-b border-purple-900/20 dark:border-purple-900/30 border-slate-200 backdrop-blur-md transition-colors duration-200">
      {/* Stadium floodlight beams in background (top-right ambient glow) */}
      <div className="absolute right-0 top-0 w-96 h-16 pointer-events-none overflow-hidden opacity-50 dark:opacity-75">
        <div className="absolute -top-10 right-10 w-80 h-32 bg-gradient-to-bl from-blue-500/20 via-purple-600/15 to-transparent blur-2xl transform rotate-12" />
        <div className="absolute top-0 right-32 w-1.5 h-16 bg-gradient-to-b from-blue-300/40 via-cyan-400/20 to-transparent transform -rotate-45" />
        <div className="absolute top-0 right-24 w-1.5 h-20 bg-gradient-to-b from-purple-300/40 via-indigo-400/20 to-transparent transform -rotate-40" />
      </div>

      <div className="max-w-[1920px] mx-auto px-3 sm:px-5 lg:px-7 h-16 flex items-center justify-between gap-2 md:gap-6">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            onClick={() => setCurrentNav('live')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            {/* Custom Electric Ball / Swirl Icon */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1.5px] shadow-lg shadow-purple-600/20 group-hover:shadow-purple-500/40 transition-all duration-200">
              <div className="w-full h-full bg-[#0A0E23] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400 transform -rotate-12 group-hover:scale-110 transition-transform duration-200">
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                  <path d="M7 7 C 12 10, 12 14, 17 17" fill="none" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M4 12 L 20 12" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {/* Glow accent */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-400/80 rounded-full blur-[2px]" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
                  CricFan
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm shadow-purple-500/30">
                  AI
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                Live Cricket • AI Insights • Match Companion
              </p>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Links / Tabs */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-slate-100 dark:bg-[#121832] p-1 rounded-xl border border-slate-200 dark:border-purple-900/30">
          <button
            onClick={() => setCurrentNav('live')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
              currentNav === 'live'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/40'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${currentNav === 'live' ? 'animate-pulse text-white' : 'text-purple-400'}`} />
            <span>Live Match</span>
          </button>

          <button
            onClick={() => setCurrentNav('matches')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
              currentNav === 'matches'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/40'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Matches</span>
          </button>

          <button
            onClick={() => setCurrentNav('analytics')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
              currentNav === 'analytics'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/40'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => setCurrentNav('simulator')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
              currentNav === 'simulator'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/40'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Simulator</span>
          </button>
        </nav>

        {/* Tablet / Mobile Quick Match Switcher Dropdown in Header */}
        <div className="xl:hidden relative">
          <button
            onClick={() => setShowMatchSelector(!showMatchSelector)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30 text-xs font-medium text-slate-800 dark:text-slate-200"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-semibold">{currentMatch.team1.teamCode} vs {currentMatch.team2.teamCode}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showMatchSelector && (
            <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#0F172E] border border-slate-200 dark:border-purple-900/40 shadow-2xl p-1.5 z-50">
              <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">Select Match</div>
              {matches.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    selectMatch(m.id);
                    setShowMatchSelector(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-left transition-colors ${
                    m.id === currentMatch.id
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{m.team1.teamCode} vs {m.team2.teamCode}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded ${m.status === 'LIVE' ? 'bg-red-500/20 text-red-400' : 'text-slate-400'}`}>
                    {m.status}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Controls (Theme Toggle, Notifications, Profile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Toggle Pill Switch */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative flex items-center justify-between w-14 h-7 p-1 rounded-full bg-slate-200 dark:bg-[#161F3D] border border-slate-300 dark:border-purple-800/40 shadow-inner transition-colors duration-200"
          >
            <Sun className={`w-3.5 h-3.5 text-amber-500 transition-opacity ${theme === 'light' ? 'opacity-100' : 'opacity-40'}`} />
            <Moon className={`w-3.5 h-3.5 text-purple-300 transition-opacity ${theme === 'dark' ? 'opacity-100' : 'opacity-40'}`} />
            <div
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                theme === 'dark' ? 'left-7' : 'left-0.5'
              }`}
            >
              {theme === 'dark' ? (
                <Moon className="w-3 h-3 text-white" />
              ) : (
                <Sun className="w-3 h-3 text-white" />
              )}
            </div>
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30 hover:border-purple-500/40 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#0B0F24]" />
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-[#0F172E] border border-slate-200 dark:border-purple-900/40 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Live Match Alerts</span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#151D38] border border-slate-100 dark:border-slate-800/80 text-xs flex flex-col gap-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {item.title}
                        </span>
                        {item.unread && (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="p-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20 hover:scale-105 transition-transform"
              aria-label="Profile"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Profile / Backend Integration Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#0F172E] border border-slate-200 dark:border-purple-900/40 shadow-2xl p-3 z-50 animate-in fade-in duration-150">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                    CF
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Cricket Analyst</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">cricfan.pro@fan.ai</p>
                  </div>
                </div>

                <div className="py-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                    <span className="text-[11px] font-medium">Spring Boot API</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      Ready: :8080
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                    <span className="text-[11px] font-medium">AI Inference Engine</span>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
