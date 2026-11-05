/**
 * CricFan AI - TypeScript Data Models
 * Designed to mirror Spring Boot DTOs
 */

export type MatchStatus = 'LIVE' | 'UPCOMING' | 'COMPLETED' | 'INNINGS_BREAK';

export interface PlayerStats {
  id: string;
  name: string;
  shortName: string;
  avatar: string;
  role: 'Batter' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';
  isCaptain?: boolean;
  isWicketKeeper?: boolean;
  status: 'Batting' | 'Out' | 'Yet to bat';
  dismissal?: string;
  // Batting stats
  runs?: number;
  balls?: number;
  strikeRate?: number;
  fours?: number;
  sixes?: number;
  // Bowling stats
  overs?: number;
  maidens?: number;
  runsConceded?: number;
  wickets?: number;
  economy?: number;
  // Current indicators
  isStriker?: boolean;
  isNonStriker?: boolean;
  isCurrentBowler?: boolean;
}

export interface Partnership {
  runs: number;
  balls: number;
  player1: {
    name: string;
    runs: number;
    balls: number;
    avatar: string;
  };
  player2: {
    name: string;
    runs: number;
    balls: number;
    avatar: string;
  };
}

export interface FallOfWicket {
  wicketNumber: number;
  score: number;
  over: string;
  player: string;
}

export interface TeamInnings {
  teamCode: string;
  teamName: string;
  flagUrl: string;
  score: number;
  wickets: number;
  overs: number;
  maxOvers: number;
  isBatting: boolean;
  players: PlayerStats[];
  fallOfWickets: FallOfWicket[];
  extras?: {
    byes: number;
    legByes: number;
    wides: number;
    noBalls: number;
    total: number;
  };
}

export interface CommentaryBall {
  id: string;
  over: number;
  ball: number;
  runs: number;
  type: 'DOT' | 'RUN' | 'FOUR' | 'SIX' | 'WICKET' | 'EXTRA';
  bowler: string;
  batter: string;
  text: string;
  aiNote?: string;
  timestamp: string;
}

export interface MatchInsight {
  headline: string;
  summary: string;
  situation: string;
  requiredRateAnalysis: string;
  battingPressure: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  bowlingAdvantage: 'DOMINANT' | 'FAVORABLE' | 'NEUTRAL' | 'UNDER_PRESSURE';
  turningPoints: string[];
  keyFactors: { label: string; impact: 'HIGH' | 'MEDIUM' | 'LOW'; description: string }[];
}

export interface WinProbability {
  team1Code: string;
  team1Name: string;
  team1Chance: number;
  team2Code: string;
  team2Name: string;
  team2Chance: number;
  summary: string;
  trend: 'RISING' | 'STEADY' | 'DROPPING';
}

export interface SimulationScenario {
  id: string;
  label: string;
  runsToAdd: number;
  ballsUsed: number;
}

export interface SimulationResult {
  scenarioLabel: string;
  wicketsLost: number;
  projectedScore: string;
  runsNeeded: number;
  ballsRemaining: number;
  projectedWinRate: number;
  explanation: string;
}

export interface Match {
  id: string;
  series: string;
  matchNumber: string;
  format: 'T20' | 'ODI' | 'TEST';
  venue: string;
  status: MatchStatus;
  statusNote: string;
  startTime?: string;
  team1: TeamInnings;
  team2: TeamInnings;
  target?: number;
  runsRequired?: number;
  ballsRemaining?: number;
  crr: number;
  rrr?: number;
  currentPartnership: Partnership;
  currentBowler: PlayerStats;
  insight: MatchInsight;
  winProbability: WinProbability;
  commentary: CommentaryBall[];
  runProgression: { over: number; team1Runs: number; team2Runs?: number }[];
}
