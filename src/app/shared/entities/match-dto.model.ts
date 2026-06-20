// AUTO-GENERATED — não editar manualmente
// Fonte: MatchDTO.java

import { SportDTO } from './sport-dto.model';
import { TeamDTO } from './team-dto.model';

export interface MatchDTO {
  id?: number;
  opponent?: string;
  dateTime?: string;
  location?: string;
  result?: string;
  isPlayingHome?: boolean;
  sportDTO?: SportDTO;
  teamDTO?: TeamDTO;
}
