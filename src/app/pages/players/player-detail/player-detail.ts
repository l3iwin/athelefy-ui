import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

interface CareerEntry {
  club: string;
  period: string;
  appearances: number;
  goals: number;
}

interface PlayerData {
  name: string;
  position: string;
  number: number;
  avatar: string;
  status: string;
  age: number;
  nationality: string;
  nationalityFlag: string;
  // Personal
  fullName: string;
  dateOfBirth: string;
  height: string;
  weight: string;
  preferredFoot: string;
  contractStart: string;
  contractEnd: string;
  timeRemaining: string;
  squadStatus: string;
  career: CareerEntry[];
  // Stats overview
  minutesPlayed: number;
  appearances: number;
  primaryPosition: string;
  positionFull: string;
  squadRole: string;
  squadRoleDesc: string;
  averageRating: number;
  leagueAvgRating: number;
  minutesPlayedPct: string;
  // Offensive
  goals: number;
  goalsPer90: string;
  assists: number;
  assistsPer90: string;
  xG: number;
  xGPer90: string;
  xA: number;
  xAPer90: string;
  shots: number;
  shotsOnTargetPct: string;
  // Defensive
  tackles: number;
  tacklesPer90: string;
  interceptions: number;
  interceptionsPer90: string;
  duelsWon: number;
  duelsWonPct: string;
  pressures: number;
  pressuresPer90: string;
  recoveries: number;
  recoveriesPer90: string;
  // Passing
  passAccuracy: string;
  passesCompleted: number;
  progressivePasses: number;
  progressivePassesPer90: string;
  keyPasses: number;
  keyPassesPer90: string;
  passesPerGame: number;
  passesPerGameCompleted: number;
  finalThirdPasses: number;
  finalThirdPassesPer90: string;
  // Match breakdown
  matches: MatchRow[];
}

interface MatchRow {
  date: string;
  opponent: string;
  result: string;
  resultType: 'W' | 'D' | 'L';
  score: string;
  minutes: string;
  goals: number;
  assists: number;
  shots: number;
  rating: number;
}

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
  ],
  templateUrl: './player-detail.html',
  styleUrl: './player-detail.scss',
})
export class PlayerDetail implements OnInit {
  player: PlayerData | null = null;
  selectedSeason = '2023/24';
  selectedCompetition = 'all';

  // Mock data keyed by slug
  private playerDb: Record<string, PlayerData> = {
    'marcus-silva': {
      name: 'Marcus Silva',
      position: 'Forward',
      number: 10,
      avatar: 'MS',
      status: 'Available',
      age: 27,
      nationality: 'Brazil',
      nationalityFlag: '🇧🇷',
      fullName: 'Marcus Silva Santos',
      dateOfBirth: 'March 15, 1997',
      height: '183 cm',
      weight: '78 kg',
      preferredFoot: 'Right',
      contractStart: 'July 1, 2022',
      contractEnd: 'June 30, 2026',
      timeRemaining: '2 years 4 months',
      squadStatus: 'First Team',
      career: [
        { club: 'FC United', period: '2022 - Present', appearances: 48, goals: 23 },
        { club: 'São Paulo FC', period: '2018 - 2022', appearances: 112, goals: 41 },
        { club: 'Santos FC Youth', period: '2015 - 2018', appearances: 67, goals: 28 },
      ],
      minutesPlayed: 2340,
      appearances: 26,
      primaryPosition: 'CF',
      positionFull: 'Central Forward',
      squadRole: 'Starter',
      squadRoleDesc: 'Key player',
      averageRating: 8.2,
      leagueAvgRating: 7.1,
      minutesPlayedPct: '92%',
      goals: 18,
      goalsPer90: '0.69',
      assists: 7,
      assistsPer90: '0.27',
      xG: 15.8,
      xGPer90: '0.61',
      xA: 5.9,
      xAPer90: '0.23',
      shots: 89,
      shotsOnTargetPct: '20.2%',
      tackles: 12,
      tacklesPer90: '0.46',
      interceptions: 8,
      interceptionsPer90: '0.31',
      duelsWon: 142,
      duelsWonPct: '58.2%',
      pressures: 387,
      pressuresPer90: '14.9',
      recoveries: 89,
      recoveriesPer90: '3.4',
      passAccuracy: '78.4%',
      passesCompleted: 432,
      progressivePasses: 89,
      progressivePassesPer90: '3.4',
      keyPasses: 47,
      keyPassesPer90: '1.8',
      passesPerGame: 21.3,
      passesPerGameCompleted: 16.7,
      finalThirdPasses: 156,
      finalThirdPassesPer90: '6.0',
      matches: [
        {
          date: 'Jan 15',
          opponent: 'Liverpool',
          result: 'W 2-1',
          resultType: 'W',
          score: '2-1',
          minutes: "90'",
          goals: 2,
          assists: 0,
          shots: 4,
          rating: 9.2,
        },
        {
          date: 'Jan 10',
          opponent: 'Arsenal',
          result: 'D 1-1',
          resultType: 'D',
          score: '1-1',
          minutes: "78'",
          goals: 1,
          assists: 0,
          shots: 3,
          rating: 7.8,
        },
        {
          date: 'Jan 6',
          opponent: 'Chelsea',
          result: 'W 3-0',
          resultType: 'W',
          score: '3-0',
          minutes: "90'",
          goals: 1,
          assists: 1,
          shots: 5,
          rating: 8.5,
        },
        {
          date: 'Dec 30',
          opponent: 'Man City',
          result: 'L 0-2',
          resultType: 'L',
          score: '0-2',
          minutes: "90'",
          goals: 0,
          assists: 0,
          shots: 2,
          rating: 6.4,
        },
        {
          date: 'Dec 26',
          opponent: 'Tottenham',
          result: 'W 4-1',
          resultType: 'W',
          score: '4-1',
          minutes: "90'",
          goals: 2,
          assists: 1,
          shots: 6,
          rating: 9.1,
        },
      ],
    },
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name') ?? '';
    this.player = this.playerDb[name] ?? null;
  }

  getResultClass(type: string): string {
    const map: Record<string, string> = { W: 'result-w', D: 'result-d', L: 'result-l' };
    return map[type] ?? '';
  }

  getRatingClass(rating: number): string {
    if (rating >= 8) return 'rating-high';
    if (rating >= 7) return 'rating-mid';
    return 'rating-low';
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Available: 'status-available',
      Injured: 'status-injured',
      Suspended: 'status-suspended',
    };
    return map[status] ?? '';
  }

  toSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
  }
}
