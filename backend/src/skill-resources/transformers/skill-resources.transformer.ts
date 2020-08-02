import { SkillResource } from '../skill-resources.entity';
import { SkillMediaTypes } from '../../skill-media-types/skill-media-types.types';

export class SkillResourceTransformer {
  id: string;
  title: string;
  link: string;
  mediaType: SkillMediaTypes;
  isFree: boolean;

  constructor(skillResource: SkillResource) {
    this.id = skillResource.id;
    this.title = skillResource.title;
    this.link = skillResource.link;
    this.mediaType = skillResource.mediaType;
  }
}
