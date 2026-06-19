// AUTO-GENERATED — não editar manualmente
// Fonte: Match.java

import { Competition } from './competition.model';
import { Team } from './team.model';

export interface Match {
  id?: number;
  opponent?: string;
  dateTime?: string;
  location?: string;
  result?: string;
  isPlayingHome?: boolean;
  season?: string;
  round?: string;
  competition?: Competition;
  team?: Team;
}
