// AUTO-GENERATED — não editar manualmente
// Fonte: TeamController.java

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TeamDTO } from '../entities/team-dto.model';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getSquadById(teamId: number): Observable<TeamDTO> {
    const params = new HttpParams().set('teamId', teamId.toString());
    return this.http.get<TeamDTO>(`${this.baseUrl}/api/v1/team/squad`, { params });
  }

  getClubByTeamId(teamId: number): Observable<TeamDTO> {
    const params = new HttpParams().set('teamId', teamId.toString());
    return this.http.get<TeamDTO>(`${this.baseUrl}/api/v1/team/club`, { params });
  }
}
