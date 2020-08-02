import { Injectable } from '@nestjs/common';
import { SelectOptionTransformer } from '../shared/transformers';
import { SkillMediaTypesRepository } from './skill-media-types.repository';
import { SkillMediaType } from './skill-media-types.entity';

@Injectable()
export class SkillMediaTypesService {
  constructor(private readonly skillMediaTypesRepository: SkillMediaTypesRepository) {}

  async listSkillMediaTypes(): Promise<SkillMediaType[]> {
    return await this.skillMediaTypesRepository.listSkillMediaTypes();
  }

  async listSkillMediaTypesAsSelectOptions(): Promise<SelectOptionTransformer[]> {
    return (await this.skillMediaTypesRepository.listSkillMediaTypes()).map(
      skillMediaType => new SelectOptionTransformer(skillMediaType),
    );
  }
}
