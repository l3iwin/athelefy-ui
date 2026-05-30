import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

export type ExerciseCategory = 'technical' | 'tactical' | 'physical';
export type ExerciseIntensity = 'high' | 'medium' | 'low';

export interface Exercise {
  id: number;
  title: string;
  category: ExerciseCategory;
  intensity: ExerciseIntensity;
  players: string;
  duration: string;
  objective: string;
  icon: string;
  iconBg: string;
  favorite: boolean;
  description: string;
  coachingPoints: string[];
  variations: { title: string; description: string }[];
  equipment: string[];
  fieldSetup: string;
}

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
  ],
  templateUrl: './training.html',
  styleUrl: './training.scss',
})
export class Training {
  activeFilter = signal<string>('all');
  selectedExercise = signal<Exercise | null>(null);
  viewMode: 'grid' | 'list' = 'grid';

  filters = [
    { key: 'all', label: 'All Exercises' },
    { key: 'technical', label: 'Technical' },
    { key: 'tactical', label: 'Tactical' },
    { key: 'physical', label: 'Physical' },
    { key: 'favorites', label: 'Favorites' },
  ];

  exercises: Exercise[] = [
    {
      id: 1,
      title: 'Rondo 4v2',
      category: 'technical',
      intensity: 'medium',
      players: '6 players',
      duration: '15-20 minutes',
      objective: 'Possession & Passing',
      icon: 'help_outline',
      iconBg: '#e3f2fd',
      favorite: false,
      description:
        'Players form a circle with 4 on the outside and 2 in the middle. The outside players maintain possession while the 2 defenders try to win the ball.',
      coachingPoints: [
        'Quick one-touch passing where possible',
        'Body shape open to receive',
        'Support angles at all times',
        'Communication between players',
      ],
      variations: [
        { title: '3v1 Rondo', description: 'Simpler version for younger players' },
        { title: '5v2 Rondo', description: 'More passing options for advanced groups' },
      ],
      equipment: ['10-15 Balls', '8 Cones'],
      fieldSetup: '10x10m grid',
    },
    {
      id: 2,
      title: 'Finishing Drill',
      category: 'technical',
      intensity: 'high',
      players: '8-12 players',
      duration: '20-25 minutes',
      objective: 'Shooting Accuracy',
      icon: 'sports_soccer',
      iconBg: '#e8f5e9',
      favorite: true,
      description:
        'Players are positioned in a line approximately 20 yards from goal. The coach plays balls into various positions in the penalty area. Players must control the ball and finish with one or two touches maximum.\n\nRotate service from both wings and centrally to practice finishing from different angles. Include volleys, half-volleys, and ground shots.',
      coachingPoints: [
        'First touch should set up the shot',
        'Keep head steady and eyes on the ball',
        'Strike through the center of the ball',
        'Follow through towards target',
        'Quick decision making under pressure',
      ],
      variations: [
        {
          title: 'Add Defender',
          description: 'Include a passive defender to increase pressure and realism',
        },
        {
          title: 'Competition Mode',
          description: 'Track goals scored and create teams to compete',
        },
        {
          title: 'Weak Foot Focus',
          description: 'Require players to finish with their weaker foot only',
        },
      ],
      equipment: ['10-15 Balls', '6 Cones', '1 Goal'],
      fieldSetup: 'Half pitch',
    },
    {
      id: 3,
      title: 'High Press System',
      category: 'tactical',
      intensity: 'high',
      players: '11v11',
      duration: '30 minutes',
      objective: 'Defensive Pressing',
      icon: 'compress',
      iconBg: '#f3e5f5',
      favorite: false,
      description:
        'Full team exercise focused on coordinated pressing triggers and defensive shape when out of possession in the opposition half.',
      coachingPoints: [
        'Identify the pressing trigger',
        'First defender applies pressure',
        'Cover shadows to limit passing lanes',
        'Compact shape — no gaps between lines',
      ],
      variations: [
        { title: 'Zonal Press', description: 'Press only in designated zones of the pitch' },
        { title: 'Man-Oriented Press', description: 'Each player marks a specific opponent' },
      ],
      equipment: ['10 Balls', '20 Cones', '2 Goals'],
      fieldSetup: 'Full pitch',
    },
    {
      id: 4,
      title: 'Sprint Intervals',
      category: 'physical',
      intensity: 'high',
      players: 'Full Squad',
      duration: '15 minutes',
      objective: 'Speed & Acceleration',
      icon: 'directions_run',
      iconBg: '#ffebee',
      favorite: false,
      description:
        'Players perform repeated sprint efforts over 20-40 metres with structured rest periods to develop acceleration and top speed.',
      coachingPoints: [
        'Drive arms powerfully',
        'High knee lift on acceleration',
        'Lean forward in first 10 metres',
        'Full recovery between reps',
      ],
      variations: [
        { title: 'With Ball', description: 'Dribble at pace to combine technical work' },
        {
          title: 'Reaction Sprints',
          description: 'Sprint on coach signal to improve reaction time',
        },
      ],
      equipment: ['8 Cones', '1 Stopwatch'],
      fieldSetup: '40m straight',
    },
    {
      id: 5,
      title: 'Build-Up Play',
      category: 'tactical',
      intensity: 'medium',
      players: '8v8',
      duration: '25 minutes',
      objective: 'Ball Progression',
      icon: 'swap_horiz',
      iconBg: '#fff3e0',
      favorite: true,
      description:
        'Structured exercise to develop playing out from the back, progressing through midfield zones into attacking positions.',
      coachingPoints: [
        'Goalkeeper as 11th outfield player',
        'Centre-backs split wide',
        'Midfielders offer angles between lines',
        'Progressive passes forward when available',
      ],
      variations: [
        { title: 'Numerical Advantage', description: 'Add extra player in build-up phase' },
        { title: 'Pressing Overload', description: 'Add extra defender to increase difficulty' },
      ],
      equipment: ['10 Balls', '16 Cones', '2 Goals'],
      fieldSetup: 'Half pitch',
    },
    {
      id: 6,
      title: 'Crossing Practice',
      category: 'technical',
      intensity: 'low',
      players: '6-8 players',
      duration: '20 minutes',
      objective: 'Delivery Accuracy',
      icon: 'compare_arrows',
      iconBg: '#e0f7fa',
      favorite: false,
      description:
        'Wingers and full-backs practice crossing technique from various positions with movement from strikers in the box.',
      coachingPoints: [
        'Approach angle creates space for cross',
        'Head up before delivery',
        'Target near or far post depending on movement',
        'Follow in for rebounds',
      ],
      variations: [
        { title: 'Early Cross', description: 'Deliver before reaching byline' },
        { title: 'Cut-Back', description: 'Pull back to penalty spot for late runners' },
      ],
      equipment: ['15 Balls', '6 Cones', '1 Goal'],
      fieldSetup: 'Wide channels + box',
    },
  ];

  get filteredExercises(): Exercise[] {
    const f = this.activeFilter();
    if (f === 'all') return this.exercises;
    if (f === 'favorites') return this.exercises.filter((e) => e.favorite);
    return this.exercises.filter((e) => e.category === f);
  }

  setFilter(key: string): void {
    this.activeFilter.set(key);
  }

  selectExercise(exercise: Exercise): void {
    this.selectedExercise.set(exercise);
  }

  closeSidebar(): void {
    this.selectedExercise.set(null);
  }

  toggleFavorite(event: Event, exercise: Exercise): void {
    event.stopPropagation();
    exercise.favorite = !exercise.favorite;
  }

  getCategoryClass(category: ExerciseCategory): string {
    const map: Record<ExerciseCategory, string> = {
      technical: 'cat-technical',
      tactical: 'cat-tactical',
      physical: 'cat-physical',
    };
    return map[category];
  }

  getIntensityClass(intensity: ExerciseIntensity): string {
    const map: Record<ExerciseIntensity, string> = {
      high: 'int-high',
      medium: 'int-medium',
      low: 'int-low',
    };
    return map[intensity];
  }

  getIntensityLabel(intensity: ExerciseIntensity): string {
    return intensity.charAt(0).toUpperCase() + intensity.slice(1);
  }

  getCategoryLabel(category: ExerciseCategory): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
}
