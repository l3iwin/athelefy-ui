import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventType, CalendarEvent } from '../calendar';

@Component({
  selector: 'app-add-event-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './add-event-dialog.html',
  styleUrl: './add-event-dialog.scss',
})
export class AddEventDialog {
  form = {
    title: '',
    type: 'training' as EventType,
    date: '',
    timeStart: '09:00',
    timeEnd: '11:00',
    location: '',
    squad: '',
    staff: '',
  };

  constructor(public dialogRef: MatDialogRef<AddEventDialog>) {}

  save(): void {
    if (!this.form.title || !this.form.date) return;
    const event: CalendarEvent = {
      id: Date.now(),
      title: this.form.title,
      type: this.form.type,
      date: new Date(this.form.date),
      timeStart: this.form.timeStart,
      timeEnd: this.form.timeEnd,
      location: this.form.location || undefined,
      squad: this.form.squad || undefined,
      staff: this.form.staff || undefined,
    };
    this.dialogRef.close(event);
  }
}
