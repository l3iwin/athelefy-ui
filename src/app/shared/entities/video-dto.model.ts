// AUTO-GENERATED — não editar manualmente
// Fonte: VideoDTO.java

import { MatchDTO } from './match-dto.model';
import { UsersDTO } from './users-dto.model';
import { VideoTagsDTO } from './video-tags-dto.model';

export interface VideoDTO {
  id?: number;
  url?: string;
  createdAt?: string;
  matchDTO?: MatchDTO;
  uploadedBy?: UsersDTO;
  videoTagDTOS?: VideoTagsDTO[];
}
