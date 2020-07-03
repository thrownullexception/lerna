import { SkillHierarchy } from './skill-hierarchies.entity';

export class SkillHierarchyTransformer {
  id: string;
  parentId: string;
  childId: string;
  order: number;

  constructor(skillHierarchy: SkillHierarchy) {
    this.id = skillHierarchy.id;
    this.parentId = skillHierarchy.parentId;
    this.childId = skillHierarchy.childId;
    this.order = skillHierarchy.order;
  }
}
