import { MigrationInterface, QueryRunner } from 'typeorm';
import { UUIDs, BaseSeed } from './base';

export class SeedSkills1597448859550 extends BaseSeed implements MigrationInterface {
  table = 'skills';
  skills = [
    'Backend',
    'Frontend',
    'PHP',
    'Mobile Apps',
    'NodeJS',
    'C#',
    'ReactJS',
    'VueJS',
    'Ruby',
    'Java',
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.data = this.skills.map((skill, index) => ({
      id: UUIDs.skills[index],
      name: skill,
      description: 'Some Meh description',
    }));
    await this.seedDevelopmentData(queryRunner);

    this.data = [
      { parent_id: UUIDs.skills[0], child_id: UUIDs.skills[2], order: 1 },
      { parent_id: UUIDs.skills[0], child_id: UUIDs.skills[4], order: 1 },
      { parent_id: UUIDs.skills[0], child_id: UUIDs.skills[8], order: 1 },
      { parent_id: UUIDs.skills[3], child_id: UUIDs.skills[9], order: 1 },
      { parent_id: UUIDs.skills[1], child_id: UUIDs.skills[7], order: 1 },
      { parent_id: UUIDs.skills[1], child_id: UUIDs.skills[6], order: 1 },
    ];
    await this.seedDevelopmentData(queryRunner, 'skill_hierarchies');

    this.data = [
      { skill_a_id: UUIDs.skills[6], skill_b_id: UUIDs.skills[7] },
      { skill_a_id: UUIDs.skills[2], skill_b_id: UUIDs.skills[8] },
    ];
    await this.seedDevelopmentData(queryRunner, 'skill_relations');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
