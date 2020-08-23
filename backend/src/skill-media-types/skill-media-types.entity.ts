import { Entity } from 'typeorm';
import { SystemValueEntity } from '../shared/entities';

@Entity('skillMediaTypes')
export class SkillMediaType extends SystemValueEntity {}
