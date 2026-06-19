// AUTO-GENERATED — não editar manualmente
// Fonte: Player.java

import { Users } from './users.model';
import { Team } from './team.model';

export interface Player {
  id?: number;
  fullName?: string;
  position?: string;
  shirtNumber?: string;
  federationNumber?: string;
  weight?: string;
  height?: string;
  users?: Users;
  teams?: Team[];
}
