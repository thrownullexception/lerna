import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { SkillResource } from '../skill-resources/skill-resources.entity';
import { SkillRoadMap } from '../skill-road-maps/skill-road-maps.entity';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ select: false })
  description: string;

  @Column()
  isPath: boolean;

  @Column({ select: false })
  lastTouchedById: string;

  @Column({ select: false })
  createdAt: string;

  @Column({ select: false })
  updatedAt: string;

  @OneToMany(
    () => SkillResource,
    ({ skill }) => skill,
  )
  resources: SkillResource[];

  @OneToMany(
    () => SkillRoadMap,
    ({ skill }) => skill,
  )
  roadMaps: SkillRoadMap[];

  @ManyToMany(() => Skill)
  @JoinTable({
    name: 'skill_relations',
    joinColumn: {
      name: 'skill_a_id',
    },
    inverseJoinColumn: {
      name: 'skill_b_id',
    },
  })
  forwardRelatedSkill: Skill[];

  @ManyToMany(() => Skill)
  @JoinTable({
    name: 'skill_relations',
    joinColumn: {
      name: 'skill_b_id',
    },
    inverseJoinColumn: {
      name: 'skill_a_id',
    },
  })
  backwardRelatedSkill: Skill[];
}
