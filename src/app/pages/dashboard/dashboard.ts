import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

interface TrainingSession {
  day: string;
  title: string;
  time: string;
  intensity: 'Alta' | 'Média' | 'Baixa';
}

interface StatCard {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: string;
  color: string;
}

interface Alert {
  icon: string;
  title: string;
  description: string;
  type: 'warn' | 'danger' | 'info';
}

interface AgendaItem {
  date: string;
  location: string;
  type: 'C' | 'F';
  result?: { home: number; away: number; win: boolean };
  time?: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  items: AgendaItem[] = [
    {
      date: 'Sab 01/01',
      location: 'Pinhal de Frades',
      type: 'C',
      result: { home: 29, away: 28, win: true },
    },
    {
      date: 'Sab 07/01',
      location: 'Pinhal de Frades',
      type: 'F',
      result: { home: 29, away: 28, win: false },
    },
    { date: 'Sab 13/01', location: 'Pinhal de Frades', type: 'C', time: '16:00' },
    { date: 'Sab 20/01', location: 'Pinhal de Frades', type: 'C', time: '21:00' },
    { date: 'Dom 01/01', location: 'Pinhal de Frades', type: 'C', time: '17:00' },
    { date: 'Sab 01/01', location: 'Pinhal de Frades', type: 'C', time: '16:00' },
  ];

  teamForm = ['W', 'W', 'D', 'W', 'L'];

  squadSummary = [
    {
      label: 'Available',
      sub: 'Ready to play',
      count: 23,
      icon: 'check_circle',
      iconClass: 'icon-green',
      countClass: 'count-green',
    },
    {
      label: 'Injured',
      sub: 'Out of action',
      count: 3,
      icon: 'add_circle',
      iconClass: 'icon-red',
      countClass: 'count-red',
    },
    {
      label: 'Suspended',
      sub: 'Cannot play',
      count: 1,
      icon: 'remove_circle',
      iconClass: 'icon-amber',
      countClass: 'count-amber',
    },
    {
      label: 'At Risk',
      sub: 'Physical concerns',
      count: 4,
      icon: 'warning',
      iconClass: 'icon-orange',
      countClass: 'count-orange',
    },
  ];

  trainingSessions: TrainingSession[] = [
    {
      day: 'Monday',
      title: 'Tactical Drills & Possession',
      time: '09:00 - 11:30',
      intensity: 'Alta',
    },
    {
      day: 'Tuesday',
      title: 'Recovery & Video Analysis',
      time: '10:00 - 12:00',
      intensity: 'Baixa',
    },
    {
      day: 'Wednesday',
      title: 'Set Pieces & Finishing',
      time: '09:00 - 11:00',
      intensity: 'Média',
    },
    { day: 'Thursday', title: 'Match Simulation', time: '09:00 - 11:30', intensity: 'Alta' },
  ];

  alerts: Alert[] = [
    {
      icon: 'warning',
      title: 'High Fatigue Level',
      description: '3 players showing elevated fatigue',
      type: 'warn',
    },
    {
      icon: 'description',
      title: 'Contract Expiring',
      description: '2 contracts expire in 3 months',
      type: 'danger',
    },
    {
      icon: 'favorite',
      title: 'Injury Risk',
      description: '4 players at elevated injury risk',
      type: 'info',
    },
  ];

  statCards: StatCard[] = [
    {
      label: 'Expected Goals (xG)',
      value: '2.4',
      delta: '+0.3 vs avg',
      positive: true,
      icon: 'sports_soccer',
      color: '#1a237e',
    },
    {
      label: 'Shots per Match',
      value: '16.8',
      delta: '+2.1 vs avg',
      positive: true,
      icon: 'track_changes',
      color: '#6a1b9a',
    },
    {
      label: 'Avg Possession',
      value: '58%',
      delta: '-3% vs avg',
      positive: false,
      icon: 'pie_chart',
      color: '#0277bd',
    },
    {
      label: 'Defensive Pressure',
      value: '142',
      delta: '+18 vs avg',
      positive: true,
      icon: 'security',
      color: '#2e7d32',
    },
  ];

  getIntensityClass(intensity: string): string {
    const map: Record<string, string> = {
      Alta: 'intensity-alta',
      Média: 'intensity-media',
      Baixa: 'intensity-baixa',
    };
    return map[intensity] ?? '';
  }

  getFormClass(result: string): string {
    const map: Record<string, string> = { W: 'form-w', D: 'form-d', L: 'form-l' };
    return map[result] ?? '';
  }
}
