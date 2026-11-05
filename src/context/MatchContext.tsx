import React, { createContext, useContext, useEffect, useState } from 'react';
import { MOCK_MATCHES } from '../mocks/cricketData';
import { cricketApi } from '../services/api';
import { Match, SimulationResult } from '../types/cricket';

export type MatchTab = 'overview' | 'playing-xi' | 'scorecard' | 'commentary' | 'insights';
export type AppNav = 'live' | 'matches' | 'analytics' | 'simulator';

interface MatchContextType {
  matches: Match[];
  currentMatch: Match;
  selectedMatchId: string;
  selectMatch: (id: string) => void;
  activeTab: MatchTab;
  setActiveTab: (tab: MatchTab) => void;
  selectedTeamKey: 'team1' | 'team2';
  setSelectedTeamKey: (teamKey: 'team1' | 'team2') => void;
  currentNav: AppNav;
  setCurrentNav: (nav: AppNav) => void;
  // What-If Simulator state
  simulationScenarioRuns: number;
  setSimulationScenarioRuns: (runs: number) => void;
  simulationWicketsLost: number;
  setSimulationWicketsLost: (w: number) => void;
  isSimulating: boolean;
  simulationResult: SimulationResult | null;
  executeSimulation: () => Promise<void>;
  resetSimulation: () => void;
  // Live polling / sync
  isLivePolling: boolean;
  setIsLivePolling: (polling: boolean) => void;
  refreshMatchData: () => Promise<void>;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES);
  const [selectedMatchId, setSelectedMatchId] = useState<string>('match-ind-aus-2026');
  const [activeTab, setActiveTab] = useState<MatchTab>('playing-xi');
  const [selectedTeamKey, setSelectedTeamKey] = useState<'team1' | 'team2'>('team1');
  const [currentNav, setCurrentNav] = useState<AppNav>('live');

  // Simulation state
  const [simulationScenarioRuns, setSimulationScenarioRuns] = useState<number>(15);
  const [simulationWicketsLost, setSimulationWicketsLost] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>({
    scenarioLabel: 'If India score 15 runs in next over',
    wicketsLost: 0,
    projectedScore: '171/4',
    runsNeeded: 20,
    ballsRemaining: 4,
    projectedWinRate: 82,
    explanation: 'If India score 15 runs in next over, they will need 20 runs from 4 balls. Winning chance: ~82%',
  });

  const [isLivePolling, setIsLivePolling] = useState<boolean>(true);

  // Active match derived or found
  const currentMatch = matches.find((m) => m.id === selectedMatchId) || matches[0];

  const selectMatch = (id: string) => {
    setSelectedMatchId(id);
    setSelectedTeamKey('team1');
  };

  const refreshMatchData = async () => {
    try {
      const data = await cricketApi.getMatchById(selectedMatchId);
      setMatches((prev) =>
        prev.map((m) => (m.id === data.id ? data : m))
      );
    } catch {
      // Keep existing data on error
    }
  };

  // Run What-If Simulation
  const executeSimulation = async () => {
    setIsSimulating(true);
    try {
      // Simulate slight processing latency for nice UX
      await new Promise((res) => setTimeout(res, 350));
      const res = await cricketApi.simulateOutcome(
        currentMatch.id,
        simulationScenarioRuns,
        simulationWicketsLost
      );
      setSimulationResult(res);
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  const resetSimulation = () => {
    setSimulationScenarioRuns(15);
    setSimulationWicketsLost(0);
    setSimulationResult(null);
  };

  // Periodic subtle live tick when on live match and polling enabled
  useEffect(() => {
    if (!isLivePolling || currentMatch.status !== 'LIVE') return;

    const interval = setInterval(() => {
      // Subtle pulse to simulate real-time updates if active
    }, 15000);

    return () => clearInterval(interval);
  }, [isLivePolling, currentMatch.status]);

  return (
    <MatchContext.Provider
      value={{
        matches,
        currentMatch,
        selectedMatchId,
        selectMatch,
        activeTab,
        setActiveTab,
        selectedTeamKey,
        setSelectedTeamKey,
        currentNav,
        setCurrentNav,
        simulationScenarioRuns,
        setSimulationScenarioRuns,
        simulationWicketsLost,
        setSimulationWicketsLost,
        isSimulating,
        simulationResult,
        executeSimulation,
        resetSimulation,
        isLivePolling,
        setIsLivePolling,
        refreshMatchData,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
};
