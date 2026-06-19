// AUTO-GENERATED — não editar manualmente
// Fonte: Video.java

import { Match } from './match.model';
import { Users } from './users.model';
import { VideoTags } from './video-tags.model';

export interface Video {
  id?: number;
  url?: string;
  createdAt?: string;
  match?: Match;
  uploadedBy?: Users;
  videoTags?: VideoTags[];
}
