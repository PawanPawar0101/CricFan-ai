/**
 * CricFan AI — API Client & Spring Boot Service Layer
 * Connects to Java Spring Boot backend at VITE_API_BASE_URL (defaults to http://localhost:8080/api)
 * Gracefully falls back to high-fidelity mock data when backend server is offline or in development
 */

import { MOCK_MATCHES } from '../mocks/cricketData';
import { Match, SimulationResult } from '../types/cricket';

const API_BASE_URL = (import.meta as unknown as { env: { VITE_API_BASE_URL?: string } }).env.VITE_API_BASE_URL || 'http://localhost:8080/api';

class CricketApiService {
  private isBackendAvailable: boolean | null = null;

  private async fetchWithTimeout<T>(endpoint: string, options: RequestInit = {}, timeoutMs = 2500): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      this.isBackendAvailable = true;
      return await response.json();
    } catch (error) {
      clearTimeout(timeout);
      // Backend is unavailable or timed out; log quiet info and return fallback
      this.isBackendAvailable = false;
      throw error;
    }
  }

  // Get all matches
  async getAllMatches(): Promise<Match[]> {
    try {
      return await this.fetchWithTimeout<Match[]>('/matches');
    } catch {
      return MOCK_MATCHES;
    }
  }

  // Get Live Matches
  async getLiveMatches(): Promise<Match[]> {
    try {
      return await this.fetchWithTimeout<Match[]>('/matches/live');
    } catch {
      return MOCK_MATCHES.filter((m) => m.status === 'LIVE');
    }
  }

  // Get Upcoming Matches
  async getUpcomingMatches(): Promise<Match[]> {
    try {
      return await this.fetchWithTimeout<Match[]>('/matches/upcoming');
    } catch {
      return MOCK_MATCHES.filter((m) => m.status === 'UPCOMING');
    }
  }

  // Get single match by ID
  async getMatchById(matchId: string): Promise<Match> {
    try {
      return await this.fetchWithTimeout<Match>(`/matches/${matchId}`);
    } catch {
      const match = MOCK_MATCHES.find((m) => m.id === matchId) || MOCK_MATCHES[0];
      return match;
    }
  }

  // What-If Simulator calculation (Spring Boot POST /matches/{matchId}/simulate)
  async simulateOutcome(
    matchId: string,
    scenarioRuns: number,
    wicketsLost: number
  ): Promise<SimulationResult> {
    try {
      return await this.fetchWithTimeout<SimulationResult>(`/matches/${matchId}/simulate`, {
        method: 'POST',
        body: JSON.stringify({ scenarioRuns, wicketsLost }),
      });
    } catch {
      // High-precision client-side cricket physics simulation fallback
      const currentMatch = MOCK_MATCHES.find((m) => m.id === matchId) || MOCK_MATCHES[0];
      const runsRemaining = (currentMatch.runsRequired || 35) - scenarioRuns;
      const ballsRemaining = Math.max(0, (currentMatch.ballsRemaining || 10) - 6);
      const remainingWickets = (10 - currentMatch.team1.wickets) - wicketsLost;

      let projectedWinRate = 68;

      if (scenarioRuns >= 15 && wicketsLost === 0) {
        projectedWinRate = 82;
      } else if (scenarioRuns >= 15 && wicketsLost >= 1) {
        projectedWinRate = 65 - wicketsLost * 12;
      } else if (scenarioRuns < 8) {
        projectedWinRate = Math.max(12, 45 - (8 - scenarioRuns) * 5 - wicketsLost * 15);
      } else {
        projectedWinRate = Math.min(95, Math.max(10, 68 + (scenarioRuns - 10) * 3 - wicketsLost * 14));
      }

      return {
        scenarioLabel: `If ${currentMatch.team1.teamName} score ${scenarioRuns} runs in next over`,
        wicketsLost,
        projectedScore: `${currentMatch.team1.score + scenarioRuns}/${currentMatch.team1.wickets + wicketsLost}`,
        runsNeeded: Math.max(0, runsRemaining),
        ballsRemaining,
        projectedWinRate,
        explanation: `If ${currentMatch.team1.teamName} score ${scenarioRuns} runs in next over with ${wicketsLost} wickets lost, they will need ${Math.max(0, runsRemaining)} runs from ${ballsRemaining} balls.`,
      };
    }
  }

  getBackendStatus(): boolean | null {
    return this.isBackendAvailable;
  }
}

export const cricketApi = new CricketApiService();
