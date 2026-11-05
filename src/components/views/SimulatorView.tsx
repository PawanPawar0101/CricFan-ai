import React, { useState } from 'react';
import { useMatch } from '../../context/MatchContext';
import { FlaskConical, Play, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SimulatorView: React.FC = () => {
  const { currentMatch } = useMatch();

  const [runsInNextOver, setRunsInNextOver] = useState<number>(15);
  const [wicketsInNextOver, setWicketsInNextOver] = useState<number>(0);
  const [bowlerQuality, setBowlerQuality] = useState<'Starc/Cummins (Pace)' | 'Zampa (Spin)'>('Starc/Cummins (Pace)');
  const [isCalculated, setIsCalculated] = useState(true);

  // Compute probability based on cricket math
  const runsRemaining = Math.max(0, (currentMatch.runsRequired || 35) - runsInNextOver);
  const ballsRemaining = Math.max(0, (currentMatch.ballsRemaining || 10) - 6);

  let winChance = 68;
  if (runsInNextOver >= 20 && wicketsInNextOver === 0) winChance = 92;
  else if (runsInNextOver >= 15 && wicketsInNextOver === 0) winChance = 82;
  else if (runsInNextOver >= 12 && wicketsInNextOver === 0) winChance = 74;
  else if (runsInNextOver <= 8 || wicketsInNextOver >= 2) winChance = Math.max(8, 38 - (wicketsInNextOver * 15));
  else winChance = Math.max(12, 60 + (runsInNextOver - 10) * 2 - (wicketsInNextOver * 14));

  const runSimulation = () => {
    setIsCalculated(true);
    if (winChance >= 80) {
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    }
  };

  const applyPreset = (runs: number, wickets: number) => {
    setRunsInNextOver(runs);
    setWicketsInNextOver(wickets);
    setIsCalculated(true);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto py-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
          AI What-If Simulation Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Simulate death overs, run rate swings, and tactical outcomes using the Spring Boot predictive engine
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#0B0F24]/80 dark:bg-[#0B0F24]/90 bg-white/95 border border-slate-200 dark:border-purple-900/30 shadow-2xl backdrop-blur-md flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-purple-900/20">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-purple-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Scenario Configuration
              </h2>
            </div>
            <button
              onClick={() => {
                setRunsInNextOver(15);
                setWicketsInNextOver(0);
              }}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-purple-400"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              One-Click Match Scenarios
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => applyPreset(15, 0)}
                className="p-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30 text-slate-800 dark:text-slate-200 hover:border-purple-500"
              >
                15 runs, 0 wkt
              </button>
              <button
                onClick={() => applyPreset(22, 0)}
                className="p-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30 text-slate-800 dark:text-slate-200 hover:border-purple-500"
              >
                22 runs (2 6s)
              </button>
              <button
                onClick={() => applyPreset(6, 1)}
                className="p-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30 text-slate-800 dark:text-slate-200 hover:border-purple-500"
              >
                6 runs, 1 wkt
              </button>
              <button
                onClick={() => applyPreset(4, 2)}
                className="p-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30 text-slate-800 dark:text-slate-200 hover:border-purple-500"
              >
                4 runs, 2 wkts
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 dark:text-slate-300">Runs to score in 19th over:</span>
                <span className="font-mono text-purple-400 font-bold text-sm">{runsInNextOver} runs</span>
              </div>
              <input
                type="range"
                min="0"
                max="36"
                value={runsInNextOver}
                onChange={(e) => setRunsInNextOver(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 dark:text-slate-300">Wickets lost in 19th over:</span>
                <span className="font-mono text-rose-400 font-bold text-sm">{wicketsInNextOver} wickets</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={wicketsInNextOver}
                onChange={(e) => setWicketsInNextOver(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={runSimulation}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Compute Predictive AI Model</span>
          </button>
        </div>

        {/* Right: Projected Outcome Card */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0B0F24]/80 dark:bg-[#0B0F24]/90 bg-white/95 border border-slate-200 dark:border-purple-900/30 shadow-2xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white mb-4">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Projected Equation</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Score after 19 ov</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {currentMatch.team1.score + runsInNextOver}/{currentMatch.team1.wickets + wicketsInNextOver}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Equation for 20th over</span>
                <span className="font-mono font-bold text-cyan-400">
                  {runsRemaining} runs from {ballsRemaining} balls
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Required RR final over</span>
                <span className="font-mono font-bold text-rose-400">
                  {ballsRemaining > 0 ? ((runsRemaining / ballsRemaining) * 6).toFixed(1) : '0.0'}
                </span>
              </div>
            </div>

            {/* Win chance visual box */}
            <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/30 text-center">
              <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                Projected Win Probability
              </span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-heading my-1">
                ~{winChance}%
              </div>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                {winChance >= 80
                  ? 'Strongly Favors India to complete the chase.'
                  : winChance >= 50
                  ? 'Balanced contest, final over pressure will decide.'
                  : 'Australia in commanding position.'}
              </p>
            </div>
          </div>

          <div className="mt-4 text-[11px] text-slate-400 text-center">
            Spring Boot DTO: <span className="font-mono">POST /api/matches/{currentMatch.id}/simulate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
