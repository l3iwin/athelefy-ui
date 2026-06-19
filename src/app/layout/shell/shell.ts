import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  activeRoute = '';

  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Plantel', route: '/squad' },
    { label: 'Calendário', route: '/calendar' },
    { label: 'Treinos', route: '/training' },
    { label: 'Estatísticas', route: '/statistics' },
  ];

  constructor(private router: Router) {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.activeRoute = e.urlAfterRedirects;
    });
  }

  isActive(route: string): boolean {
    if (route === '/squad') {
      return this.activeRoute.startsWith('/squad') || this.activeRoute.startsWith('/players');
    }
    return this.activeRoute.startsWith(route);
  }
}
