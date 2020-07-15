import { Entity } from 'typeorm';
import { SystemValueEntity } from 'src/shared/entities';

@Entity('skill_media_types')
export class SkillMediaType extends SystemValueEntity {}
