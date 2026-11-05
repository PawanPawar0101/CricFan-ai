# CricFan AI — Premium Responsive Live Cricket Dashboard

A live cricket match companion and analytics dashboard built with **React**, **TypeScript**, **Tailwind CSS**, and **Recharts**. Recreates the three-column layout, glowing purple/midnight aesthetic, 3D AI mascot, winning probability ring, and interactive What-If Simulator from the reference design.

---

## 🌟 Key Features

1. **Exact Reference Design & Visual Identity**:
   - Midnight navy background (`#080B16`) with glowing violet and electric cyan borders.
   - Stadium floodlight beam background with subtle overhead stadium lighting.
   - Custom illuminated SVG cricket stadium night artwork with batsman silhouette.
   - 3D white robot AI mascot with glowing visor and `AI` badge.
   - Dual theme system (Dark Mode & Light Mode) with instant toggle and preview cards.

2. **Responsive Layouts**:
   - **Desktop (1280px+)**: 3-column layout (Left Match Sidebar ~280px, Center Scoreboard & Performance ~flexible, Right AI Insights & Simulator ~360px).
   - **Tablet (768px - 1279px)**: Collapsible sidebar with header quick-switcher, full-width scoreboard, and balanced 2-column analytics grid.
   - **Mobile (< 768px)**: Mobile-first layout with horizontally scrollable tabs, compact player performance cards, vertically stacked AI panels, and thumb-friendly bottom navigation.

3. **Live Match Center**:
   - **Hero Scoreboard**: Displays teams, tournament info, venue, scores, overs, target, CRR, and Required Run Rate.
   - **Dynamic Match Tabs**: Overview (Recharts Worm Graph), Playing XI, Scorecard (Innings 1 & 2), AI Commentary (Ball-by-Ball with boundary badges), and Strategic Insights.
   - **Playing XI & Player Performance**: Strike rates, boundaries (4s/6s), dismissals, current partnership (`80 runs off 46 balls`), current bowler figures (`P. Cummins 3.2-0-28-1`), and fall of wickets timeline.

4. **AI-Powered Analytics & Simulation**:
   - **Winning Probability**: Animated circular donut gauge showing India 68% vs Australia 32%.
   - **What-If Simulator**: Interactive scenario tester (`If India score 15 runs in next over`, wicket steppers, live outcome projection).
   - **AI Match Insight**: Situation analysis, batting pressure gauges, and key turning factors.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4 with `@custom-variant dark`
- **Charts**: Recharts & custom animated SVGs
- **Icons**: Lucide React
- **Backend Ready**: Configured for Java Spring Boot (`VITE_API_BASE_URL`)

---

## 🔌 Java Spring Boot Integration Guide

The frontend communicates with your Java Spring Boot backend via `src/services/api.ts`.

### 1. Environment Variable
Create a `.env` file or export:
```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

### 2. Proposed Spring Boot REST Endpoints

```
GET  /api/matches              # List all matches
GET  /api/matches/live         # Filter live matches
GET  /api/matches/upcoming     # Filter upcoming fixtures
GET  /api/matches/{matchId}    # Full match details, scorecard, & player stats
POST /api/matches/{matchId}/simulate # What-If Simulation endpoint
```

### 3. Sample Spring Boot Controller
```java
package com.cricfan.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "*") // Adjust in production
public class MatchController {

    @GetMapping("/live")
    public ResponseEntity<?> getLiveMatches() {
        return ResponseEntity.ok(matchService.getLiveMatches());
    }

    @GetMapping("/{matchId}")
    public ResponseEntity<?> getMatchDetails(@PathVariable String matchId) {
        return ResponseEntity.ok(matchService.getMatchById(matchId));
    }

    @PostMapping("/{matchId}/simulate")
    public ResponseEntity<?> simulateOutcome(
            @PathVariable String matchId,
            @RequestBody SimulationRequest request) {
        return ResponseEntity.ok(simulatorService.calculateProjection(matchId, request));
    }
}
```

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Verify the production build artifacts inside `dist/`.
