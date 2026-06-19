import { Component, OnDestroy, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { Overlay, OverlayRef, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PlayerDialog, PLAYER_POPUP_DATA } from '../players/player-dialog/player-dialog';
import { RouterLink } from '@angular/router';
import { TeamService } from '../../core/services/team.services';
import { Team, Player } from '../../shared/entities';

export interface SquadMember {
  id: number;
  name: string;
  number?: number;
  subtitle?: string;
  role: 'Player' | 'Staff';
  position: string;
  age: number;
  nationality: string;
  nationalityFlag: string;
  fitness?: number;
  form?: string[];
  status: 'Available' | 'Injured' | 'Suspended' | 'Active';
  avatar: string;
}

export interface CareerEntry {
  club: string;
  period: string;
  appearances: number;
  goals: number;
}

export interface PlayerDetail {
  fullName: string;
  dateOfBirth: string;
  age: number;
  nationality: string;
  height: string;
  weight: string;
  preferredFoot: string;
  contractStart: string;
  contractEnd: string;
  timeRemaining: string;
  jerseyNumber: string;
  squadStatus: string;
  career: CareerEntry[];
}

@Component({
  selector: 'app-squad',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatTabsModule,
    OverlayModule,
    RouterLink,
  ],
  templateUrl: './squad.html',
  styleUrl: './squad.scss',
})
export class Squad implements OnDestroy, OnInit {
  private overlayRef: OverlayRef | null = null;
  private hoverTimer: any = null;
  private closeTimer: any = null;
  team!: Team;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private teamService: TeamService,
  ) {}

  ngOnInit(): void {
    this.teamService.getTeamById(1).subscribe({
      next: (data) => (this.team = data),
      error: (err) => console.error(err),
      complete: () => console.log('Team = ', this.team),
    });
  }

  members: SquadMember[] = [
    {
      id: 1,
      name: 'Marcus Silva',
      number: 10,
      role: 'Player',
      position: 'Forward',
      age: 27,
      nationality: 'Brazil',
      nationalityFlag: '🇧🇷',
      fitness: 92,
      form: ['W', 'W', 'D'],
      status: 'Available',
      avatar: 'MS',
    },
    {
      id: 2,
      name: 'James Mitchell',
      number: 5,
      role: 'Player',
      position: 'Defender',
      age: 29,
      nationality: 'England',
      nationalityFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      fitness: 88,
      form: ['W', 'W', 'W'],
      status: 'Available',
      avatar: 'JM',
    },
    {
      id: 3,
      name: 'Diego Rodriguez',
      number: 8,
      role: 'Player',
      position: 'Midfielder',
      age: 24,
      nationality: 'Spain',
      nationalityFlag: '🇪🇸',
      fitness: 35,
      form: [],
      status: 'Injured',
      avatar: 'DR',
    },
    {
      id: 4,
      name: 'Thomas Weber',
      number: 1,
      role: 'Player',
      position: 'Goalkeeper',
      age: 31,
      nationality: 'Germany',
      nationalityFlag: '🇩🇪',
      fitness: 95,
      form: ['W', 'D', 'W'],
      status: 'Available',
      avatar: 'TW',
    },
    {
      id: 5,
      name: 'Sophie Laurent',
      number: 7,
      role: 'Player',
      position: 'Midfielder',
      age: 25,
      nationality: 'France',
      nationalityFlag: '🇫🇷',
      fitness: 78,
      form: ['W', 'D', 'L'],
      status: 'Suspended',
      avatar: 'SL',
    },
    {
      id: 6,
      name: 'Michael Anderson',
      subtitle: 'Head Coach',
      role: 'Staff',
      position: 'Coach',
      age: 45,
      nationality: 'England',
      nationalityFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      status: 'Active',
      avatar: 'MA',
    },
    {
      id: 7,
      name: 'Emma Wilson',
      subtitle: 'Performance Analyst',
      role: 'Staff',
      position: 'Analyst',
      age: 32,
      nationality: 'USA',
      nationalityFlag: '🇺🇸',
      status: 'Active',
      avatar: 'EW',
    },
    {
      id: 8,
      name: 'Dr. Sarah Chen',
      subtitle: 'Head Physio',
      role: 'Staff',
      position: 'Medical',
      age: 38,
      nationality: 'China',
      nationalityFlag: '🇨🇳',
      status: 'Active',
      avatar: 'SC',
    },
  ];

  playerDetails: Record<number, PlayerDetail> = {
    1: {
      fullName: 'Marcus Silva Santos',
      dateOfBirth: 'March 15, 1997',
      age: 27,
      nationality: 'Brazilian',
      height: '183 cm',
      weight: '78 kg',
      preferredFoot: 'Right',
      contractStart: 'July 1, 2022',
      contractEnd: 'June 30, 2026',
      timeRemaining: '2 years 4 months',
      jerseyNumber: '#10',
      squadStatus: 'First Team',
      career: [
        { club: 'FC United', period: '2022 - Present', appearances: 48, goals: 23 },
        { club: 'São Paulo FC', period: '2018 - 2022', appearances: 112, goals: 41 },
        { club: 'Santos FC Youth', period: '2015 - 2018', appearances: 67, goals: 28 },
      ],
    },
  };

  get filteredMembers(): SquadMember[] {
    return this.members;
  }

  onInfoEnter(event: MouseEvent, player: Player): void {
    clearTimeout(this.closeTimer);

    if (this.overlayRef) return;

    this.hoverTimer = setTimeout(() => {
      const origin = event.target as HTMLElement;

      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(origin)
          .withPositions([
            {
              originX: 'end',
              originY: 'center',
              overlayX: 'start',
              overlayY: 'center',
              offsetX: 8,
            },
            {
              originX: 'start',
              originY: 'center',
              overlayX: 'end',
              overlayY: 'center',
              offsetX: -8,
            },
          ]),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        hasBackdrop: false,
      });

      const injector = this.createInjector({
        player,
        detail: this.playerDetails[1] ?? null,
      });
      const portal = new ComponentPortal(PlayerDialog, null, injector);
      const ref = this.overlayRef.attach(portal);

      // Close when mouse leaves the popup
      ref.location.nativeElement.addEventListener('mouseleave', () => {
        this.closePopup();
      });

      ref.location.nativeElement.addEventListener('mouseenter', () => {
        clearTimeout(this.closeTimer);
      });
    }, 1000);
  }

  onInfoLeave(): void {
    clearTimeout(this.hoverTimer);
    this.closeTimer = setTimeout(() => {
      this.closePopup();
    }, 200);
  }

  private createInjector(data: any) {
    return Injector.create({
      providers: [{ provide: PLAYER_POPUP_DATA, useValue: data }],
      parent: this.injector,
    });
  }

  private closePopup(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.hoverTimer);
    clearTimeout(this.closeTimer);
    this.closePopup();
  }

  getFitnessColor(fitness: number): string {
    if (fitness >= 80) return 'fitness-high';
    if (fitness >= 50) return 'fitness-medium';
    return 'fitness-low';
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Available: 'status-available',
      Injured: 'status-injured',
      Suspended: 'status-suspended',
      Active: 'status-active',
    };
    return map[status] ?? '';
  }

  getFormClass(result: string): string {
    const map: Record<string, string> = { W: 'form-w', D: 'form-d', L: 'form-l' };
    return map[result] ?? '';
  }

  toSlug(name: string | undefined): string {
    console.log('slug: ', name);
    return (name ?? '').toLowerCase().replace(/\s+/g, '-');
  }
}
