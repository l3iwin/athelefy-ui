import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviorments/envionment';
import { Team } from '../../shared/entities';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private url = `${environment.apiUrl}/team`;

  constructor(private http: HttpClient) {}

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.url}?teamId=${id}`);
  }
}
