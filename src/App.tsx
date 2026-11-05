/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { MatchProvider, useMatch } from './context/MatchContext';
import { Header } from './components/layout/Header';
import { MatchSidebar } from './components/sidebar/MatchSidebar';
import { ScoreboardCard } from './components/scoreboard/ScoreboardCard';
import { PlayingXIView } from './components/players/PlayingXIView';
import { AIMatchInsight } from './components/insights/AIMatchInsight';
import { WinningProbability } from './components/probability/WinningProbability';
import { WhatIfSimulator } from './components/simulator/WhatIfSimulator';
import { OverviewTab } from './components/tabs/OverviewTab';
import { ScorecardTab } from './components/tabs/ScorecardTab';
import { CommentaryTab } from './components/tabs/CommentaryTab';
import { InsightsTab } from './components/tabs/InsightsTab';
import { MatchesView } from './components/views/MatchesView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { SimulatorView } from './components/views/SimulatorView';
import { MobileBottomNav } from './components/layout/MobileBottomNav';

const DashboardContent: React.FC = () => {
  const { currentNav, activeTab } = useMatch();

  // If user navigated away from 'live' to Matches, Analytics, or Simulator view
  if (currentNav === 'matches') {
    return <MatchesView />;
  }

  if (currentNav === 'analytics') {
    return <AnalyticsView />;
  }

  if (currentNav === 'simulator') {
    return <SimulatorView />;
  }

  // Live Match Dashboard view (recreates screenshot exactly)
  return (
    <div className="flex flex-col xl:flex-row gap-4 lg:gap-5 w-full items-start">
      {/* Column 1: Left Match Sidebar (Desktop >= 1280px visible, on tablet/mobile accessible via header switcher) */}
      <div className="hidden xl:block w-[280px] shrink-0">
        <MatchSidebar />
      </div>

      {/* Column 2: Center Flexible Match Dashboard */}
      <main className="flex-1 w-full min-w-0 flex flex-col gap-4 lg:gap-5">
        {/* Main Scoreboard Card with Ribbon & Navigation Tabs */}
        <ScoreboardCard />

        {/* Dynamic Tab Content (Defaults to Playing XI matching screenshot) */}
        {activeTab === 'playing-xi' && <PlayingXIView />}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'scorecard' && <ScorecardTab />}
        {activeTab === 'commentary' && <CommentaryTab />}
        {activeTab === 'insights' && <InsightsTab />}

        {/* On Mobile & Tablet (< 1280px), Right Panels flow neatly beneath the main match tabs */}
        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <AIMatchInsight />
          <WinningProbability />
          <div className="md:col-span-2 lg:col-span-1">
            <WhatIfSimulator />
          </div>
        </div>
      </main>

      {/* Column 3: Right Insights & Probability & What-If Panel (Desktop >= 1280px) */}
      <aside className="hidden xl:flex w-[350px] 2xl:w-[370px] shrink-0 flex-col gap-4">
        {/* 1. AI Match Insight with Robot mascot */}
        <AIMatchInsight />

        {/* 2. Winning Probability Circular Donut */}
        <WinningProbability />

        {/* 3. What-If Simulator */}
        <WhatIfSimulator />
      </aside>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <MatchProvider>
        <div className="min-h-screen bg-slate-100 dark:bg-[#080B16] text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
          {/* Top Application Header */}
          <Header />

          {/* Main Dashboard Canvas Container */}
          <div className="flex-1 max-w-[1920px] w-full mx-auto px-3 sm:px-5 lg:px-6 py-4 pb-20 md:pb-6">
            <DashboardContent />
          </div>

          {/* Mobile Bottom Navigation Bar (Visible on mobile screens < 768px) */}
          <MobileBottomNav />
        </div>
      </MatchProvider>
    </ThemeProvider>
  );
}
