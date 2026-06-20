// AUTO-GENERATED — não editar manualmente
// Fonte: EventsDTO.java

import { TeamDTO } from './team-dto.model';

export interface EventsDTO {
  id?: number;
  type?: string;
  title?: string;
  startDateTime?: string;
  endDateTime?: string;
  location?: string;
  teamDTO?: TeamDTO;
}
