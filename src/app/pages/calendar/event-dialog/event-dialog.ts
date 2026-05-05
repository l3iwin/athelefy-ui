import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CalendarEvent } from '../calendar';

@Component({
  selector: 'app-event-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './event-dialog.html',
  styleUrl: './event-dialog.scss',
})
export class EventDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CalendarEvent) {}

  getIcon(type: string): string {
    const map: Record<string, string> = {
      match: 'sports_soccer',
      training: 'fitness_center',
      meeting: 'groups',
      assessment: 'monitor_heart',
    };
    return map[type] ?? 'event';
  }
}
