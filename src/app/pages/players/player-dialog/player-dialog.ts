import { Component, Inject, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { SquadMember, PlayerDetail } from '../../squad/squad';

export const PLAYER_POPUP_DATA = new InjectionToken<{
  member: SquadMember;
  detail: PlayerDetail | null;
}>('PLAYER_POPUP_DATA');

@Component({
  selector: 'app-player-popup',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDividerModule, MatTabsModule],
  templateUrl: './player-dialog.html',
  styleUrl: './player-dialog.scss',
})
export class PlayerDialog {
  constructor(
    @Inject(PLAYER_POPUP_DATA) public data: { member: SquadMember; detail: PlayerDetail | null },
  ) {}

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Available: 'status-available',
      Injured: 'status-injured',
      Suspended: 'status-suspended',
      Active: 'status-active',
    };
    return map[status] ?? '';
  }
}
