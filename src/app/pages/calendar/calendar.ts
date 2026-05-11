import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { EventDialog } from './event-dialog/event-dialog';
import { AddEventDialog } from './add-event-dialog/add-event-dialog';

export type EventType = 'match' | 'training' | 'meeting' | 'assessment';

export interface CalendarEvent {
  id: number;
  title: string;
  type: EventType;
  date: Date;
  timeStart: string;
  timeEnd: string;
  location?: string;
  squad?: string;
  staff?: string;
}

interface CalendarDay {
  date: Date;
  currentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {
  constructor(private dialog: MatDialog) {}

  viewMode: 'week' | 'month' = 'month';
  selectedDay = signal<CalendarDay | null>(null);
  currentDate = signal(new Date());

  events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Training',
      type: 'training',
      date: new Date(2026, 3, 2),
      timeStart: '09:00',
      timeEnd: '11:00',
      location: 'Training Ground',
      squad: 'First Team',
      staff: 'Michael Anderson',
    },
    {
      id: 2,
      title: 'Training',
      type: 'training',
      date: new Date(2026, 3, 3),
      timeStart: '09:00',
      timeEnd: '11:00',
      location: 'Training Ground',
      squad: 'First Team',
      staff: 'Michael Anderson',
    },
    {
      id: 3,
      title: 'Training',
      type: 'training',
      date: new Date(2026, 3, 5),
      timeStart: '09:00',
      timeEnd: '11:00',
      location: 'Training Ground',
      squad: 'First Team',
      staff: 'Michael Anderson',
    },
    {
      id: 4,
      title: 'Match',
      type: 'match',
      date: new Date(2026, 3, 7),
      timeStart: '15:00',
      timeEnd: '17:00',
      location: 'Old Trafford Stadium',
      squad: 'First Team (23 players)',
      staff: 'Michael Anderson, Emma Wilson',
    },
    {
      id: 5,
      title: 'Training',
      type: 'training',
      date: new Date(2026, 3, 10),
      timeStart: '09:00',
      timeEnd: '11:00',
      location: 'Training Ground',
      squad: 'First Team',
      staff: 'Michael Anderson',
    },
    {
      id: 6,
      title: 'Assessment',
      type: 'assessment',
      date: new Date(2026, 3, 12),
      timeStart: '10:00',
      timeEnd: '12:00',
      location: 'Medical Centre',
      squad: 'First Team',
      staff: 'Dr. Sarah Chen',
    },
    {
      id: 7,
      title: 'Match Day',
      type: 'match',
      date: new Date(2026, 3, 14),
      timeStart: '15:00',
      timeEnd: '17:00',
      location: 'Old Trafford Stadium',
      squad: 'First Team (23 players)',
      staff: 'Michael Anderson, Emma Wilson',
    },
    {
      id: 8,
      title: 'Meeting',
      type: 'meeting',
      date: new Date(2026, 3, 14),
      timeStart: '13:00',
      timeEnd: '14:00',
      location: 'Conference Room A',
      squad: 'First Team Squad',
      staff: 'Michael Anderson',
    },
    {
      id: 9,
      title: 'Training',
      type: 'training',
      date: new Date(2026, 3, 17),
      timeStart: '10:00',
      timeEnd: '12:00',
      location: 'Training Ground',
      squad: 'First Team',
      staff: 'Michael Anderson',
    },
    {
      id: 10,
      title: 'Training',
      type: 'training',
      date: new Date(2026, 3, 19),
      timeStart: '09:00',
      timeEnd: '11:00',
      location: 'Training Ground',
      squad: 'First Team',
      staff: 'Michael Anderson',
    },
    {
      id: 11,
      title: 'Match',
      type: 'match',
      date: new Date(2026, 3, 21),
      timeStart: '20:00',
      timeEnd: '22:00',
      location: 'Away Stadium',
      squad: 'First Team (23 players)',
      staff: 'Michael Anderson, Emma Wilson',
    },
    {
      id: 12,
      title: 'Training',
      type: 'training',
      date: new Date(2026, 3, 24),
      timeStart: '09:00',
      timeEnd: '11:00',
      location: 'Training Ground',
      squad: 'First Team',
      staff: 'Michael Anderson',
    },
    {
      id: 13,
      title: 'Training',
      type: 'training',
      date: new Date(2026, 6, 26),
      timeStart: '09:00',
      timeEnd: '11:00',
      location: 'Training Ground',
      squad: 'First Team',
      staff: 'Michael Anderson',
    },
    {
      id: 14,
      title: 'Match',
      type: 'match',
      date: new Date(2026, 3, 28),
      timeStart: '15:00',
      timeEnd: '17:00',
      location: 'Home Stadium',
      squad: 'First Team (23 players)',
      staff: 'Michael Anderson, Emma Wilson',
    },
  ];

  weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  get currentMonthLabel(): string {
    return this.currentDate().toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  get calendarDays(): CalendarDay[] {
    const date = this.currentDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Start from Monday
    let startDow = firstDay.getDay();
    startDow = startDow === 0 ? 6 : startDow - 1;

    const days: CalendarDay[] = [];
    const today = new Date();

    // Previous month days
    for (let i = startDow - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push({ date: d, currentMonth: false, isToday: false, events: this.getEventsForDate(d) });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const d = new Date(year, month, i);
      const isToday = d.toDateString() === today.toDateString();
      days.push({ date: d, currentMonth: true, isToday, events: this.getEventsForDate(d) });
    }

    // Next month days to fill grid
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({ date: d, currentMonth: false, isToday: false, events: this.getEventsForDate(d) });
    }

    return days;
  }

  get upcomingEvents(): CalendarEvent[] {
    const today = this.currentDate();
    return this.events
      .filter((e) => e.date >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 3);
  }

  getEventsForDate(date: Date): CalendarEvent[] {
    return this.events.filter((e) => e.date.toDateString() === date.toDateString());
  }

  selectDay(day: CalendarDay): void {
    this.selectedDay.set(day);
  }

  closePanel(): void {
    this.selectedDay.set(null);
  }

  prevMonth(): void {
    const d = this.currentDate();
    this.currentDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextMonth(): void {
    const d = this.currentDate();
    this.currentDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  goToToday(): void {
    this.currentDate.set(new Date());
    this.selectedDay.set(null);
  }

  setView(mode: 'week' | 'month'): void {
    this.viewMode = mode;
  }

  formatDayLabel(date: Date): string {
    return date.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }

  formatUpcomingDate(event: CalendarEvent): string {
    return (
      event.date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) +
      ' • ' +
      event.timeStart
    );
  }

  getEventTypeLabel(type: EventType): string {
    const map: Record<EventType, string> = {
      match: 'Match',
      training: 'Training',
      meeting: 'Meeting',
      assessment: 'Physical Assessment',
    };
    return map[type];
  }

  getEventIcon(type: EventType): string {
    const map: Record<EventType, string> = {
      match: 'sports_soccer',
      training: 'fitness_center',
      meeting: 'groups',
      assessment: 'monitor_heart',
    };
    return map[type];
  }

  isSelectedDay(day: CalendarDay): boolean {
    const sel = this.selectedDay();
    if (!sel) return false;
    return sel.date.toDateString() === day.date.toDateString();
  }

  get weekDates(): Date[] {
    const date = this.currentDate();
    const day = date.getDay();
    const monday = new Date(date);
    const diff = day === 0 ? -6 : 1 - day;
    monday.setDate(date.getDate() + diff);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }

  get weekHours(): string[] {
    return Array.from({ length: 24 }, (_, i) => {
      return `${i.toString().padStart(2, '0')}:00`;
    });
  }

  getEventsForWeekDay(date: Date): CalendarEvent[] {
    return this.events.filter((e) => e.date.toDateString() === date.toDateString());
  }

  getEventTopOffset(timeStart: string): number {
    const [h, m] = timeStart.split(':').map(Number);
    return (h * 60 + m) * (50 / 60);
  }

  getEventHeight(timeStart: string, timeEnd: string): number {
    const [h1, m1] = timeStart.split(':').map(Number);
    const [h2, m2] = timeEnd.split(':').map(Number);
    const duration = h2 * 60 + m2 - (h1 * 60 + m1);
    return Math.max(duration * (50 / 60), 24);
  }

  isWeekToday(date: Date): boolean {
    return date.toDateString() === new Date().toDateString();
  }

  formatWeekDay(date: Date): string {
    return date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  }

  openEvent(event: CalendarEvent): void {
    this.dialog.open(EventDialog, {
      width: '480px',
      data: event,
    });
  }

  prevPeriod(): void {
    const d = this.currentDate();
    if (this.viewMode === 'month') {
      this.currentDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    } else {
      const newDate = new Date(d);
      newDate.setDate(d.getDate() - 7);
      this.currentDate.set(newDate);
    }
  }

  nextPeriod(): void {
    const d = this.currentDate();
    if (this.viewMode === 'month') {
      this.currentDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    } else {
      const newDate = new Date(d);
      newDate.setDate(d.getDate() + 7);
      this.currentDate.set(newDate);
    }
  }

  get periodLabel(): string {
    if (this.viewMode === 'month') {
      return this.currentDate().toLocaleString('en-US', { month: 'long', year: 'numeric' });
    }
    const dates = this.weekDates;
    const first = dates[0];
    const last = dates[6];
    if (first.getMonth() === last.getMonth()) {
      return first.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    }
    return `${first.toLocaleString('en-US', { month: 'short' })} - ${last.toLocaleString('en-US', { month: 'short', year: 'numeric' })}`;
  }

  openAddEvent(): void {
    const ref = this.dialog.open(AddEventDialog, { width: '480px' });
    ref.afterClosed().subscribe((event: CalendarEvent) => {
      if (event) this.events = [...this.events, event];
    });
  }
}
