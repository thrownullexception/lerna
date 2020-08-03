import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { SkillRoadMap } from '../skill-road-maps/skill-road-maps.entity';

@Entity('user_completed_skill_road_maps')
export class UserCompletedSkillRoadMap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  skillRoadMapId: string;

  @ManyToOne(
    () => User,
    ({ id }) => id,
  )
  user: User;

  @ManyToOne(
    () => SkillRoadMap,
    ({ id }) => id,
  )
  skillRoadMap: SkillRoadMap;
}
