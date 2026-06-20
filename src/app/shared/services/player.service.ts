// AUTO-GENERATED — não editar manualmente
// Fonte: PlayerController.java

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PlayerSummaryDTO } from '../entities/player-summary-dto.model';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getPlayersByTeamId(teamId: number): Observable<PlayerSummaryDTO[]> {
    const params = new HttpParams().set('teamId', teamId.toString());
    return this.http.get<PlayerSummaryDTO[]>(`${this.baseUrl}/api/v1/player`, { params });
  }
}
