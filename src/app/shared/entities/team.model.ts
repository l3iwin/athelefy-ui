// AUTO-GENERATED — não editar manualmente
// Fonte: Team.java

import { Club } from './club.model';
import { Player } from './player.model';
import { Coach } from './coach.model';

export interface Team {
  id?: number;
  name?: string;
  category?: string;
  sport?: string;
  club?: Club;
  players?: Player[];
  coaches?: Coach[];
}
