import React, { useState } from 'react';
import { FlaskConical, Play, Minus, Plus, BarChart2, Loader2, Sparkles } from 'lucide-react';
import { useMatch } from '../../context/MatchContext';

export const WhatIfSimulator: React.FC = () => {
  const {
    currentMatch,
    simulationScenarioRuns,
    setSimulationScenarioRuns,
    simulationWicketsLost,
    setSimulationWicketsLost,
    isSimulating,
    simulationResult,
    executeSimulation,
  } = useMatch();

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('15');

  const scenarios = [
    { id: '15', label: `If ${currentMatch.team1.teamName} score 15 runs in next over`, runs: 15 },
    { id: '20', label: `If ${currentMatch.team1.teamName} score 20 runs in next over (2 Sixes)`, runs: 20 },
    { id: '10', label: `If ${currentMatch.team1.teamName} score 10 runs in next over`, runs: 10 },
    { id: '6', label: `If ${currentMatch.team1.teamName} score 6 runs in next over`, runs: 6 },
    { id: '24', label: `If ${currentMatch.team1.teamName} score 24 runs in next over (Carnage)`, runs: 24 },
  ];

  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedScenarioId(val);
    const found = scenarios.find((s) => s.id === val);
    if (found) {
      setSimulationScenarioRuns(found.runs);
    }
  };

  const incrementWickets = () => {
    if (simulationWicketsLost < 5) {
      setSimulationWicketsLost(simulationWicketsLost + 1);
    }
  };

  const decrementWickets = () => {
    if (simulationWicketsLost > 0) {
      setSimulationWicketsLost(simulationWicketsLost - 1);
    }
  };

  return (
    <div className="rounded-2xl bg-[#0B0F24]/80 dark:bg-[#0B0F24]/90 bg-white/95 border border-slate-200 dark:border-purple-900/30 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-3.5">
        <FlaskConical className="w-4 h-4 text-purple-400" />
        <span className="font-heading tracking-wide">What-If Simulator</span>
      </div>

      <div className="space-y-3.5">
        {/* Scenario Selection Dropdown */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
            Scenario Condition
          </label>
          <div className="relative">
            <select
              value={selectedScenarioId}
              onChange={handleScenarioChange}
              className="w-full appearance-none px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-300 dark:border-purple-900/40 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8 cursor-pointer"
            >
              {scenarios.map((s) => (
                <option key={s.id} value={s.id} className="bg-white dark:bg-[#0F172E] text-slate-900 dark:text-white">
                  {s.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-3 pointer-events-none text-slate-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Wickets Lost Counter */}
        <div className="flex items-center justify-between py-1">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Wickets lost:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={decrementWickets}
              disabled={simulationWicketsLost <= 0}
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#151D3B] border border-slate-300 dark:border-purple-900/40 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-purple-900/50 disabled:opacity-40 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-mono font-bold text-sm text-slate-900 dark:text-white">
              {simulationWicketsLost}
            </span>
            <button
              onClick={incrementWickets}
              disabled={simulationWicketsLost >= 5}
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#151D3B] border border-slate-300 dark:border-purple-900/40 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-purple-900/50 disabled:opacity-40 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Simulate Outcome Action Button */}
        <button
          onClick={executeSimulation}
          disabled={isSimulating}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          {isSimulating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Simulating Spring Boot Model...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Simulate Outcome</span>
            </>
          )}
        </button>

        {/* Green-tinted Result Card (matches screenshot) */}
        {simulationResult && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/30 text-emerald-950 dark:text-emerald-100 shadow-sm animate-in fade-in duration-200">
            <div className="flex items-start gap-2.5">
              <BarChart2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-emerald-900 dark:text-emerald-200 font-medium leading-relaxed">
                  {simulationResult.explanation}
                </p>
                <div className="mt-2 text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-heading">
                  Winning chance: ~{simulationResult.projectedWinRate}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
