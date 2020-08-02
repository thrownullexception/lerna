import { SkillRoadMap } from '../skill-road-maps.entity';

export class SkillRoadMapTransformer {
  id: string;
  level: number;
  order: number;
  title: string;
  description: string;

  constructor(skillRoadMap: SkillRoadMap) {
    this.id = skillRoadMap.id;
    this.level = skillRoadMap.level;
    this.order = skillRoadMap.order;
    this.title = skillRoadMap.title;
    this.description = skillRoadMap.description;
  }
}
