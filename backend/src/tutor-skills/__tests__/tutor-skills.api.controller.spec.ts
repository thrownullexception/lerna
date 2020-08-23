import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthGuard } from '@nestjs/passport';
import { FixturesService, mockJWTGuard, TestingModule, FIXTURE_IDS } from '../../shared/tests';
import { APP_CONSTANTS } from '../../shared/constants';

import { getRepository } from 'typeorm';
import { TutorSkillsModule } from '../tutor-skills.module';
import { TutorSkill } from '../tutor-skills.entity';
import { SkillLevels } from '../../skill-levels/skill-levels.types';

describe('TutorSkills API Controller', () => {
  let app: INestApplication;
  let fixturesService: FixturesService;
  const TUTOR_SKILL_ID = '7211b9c5-8017-4d64-a2bd-76a2105b0a4f';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestingModule, TutorSkillsModule],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue(mockJWTGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    fixturesService = moduleRef.get<FixturesService>(FixturesService);
    await fixturesService.resetEntityFixtures(TutorSkill, 'tutor-skills');
  });

  it('/POST tutor-skills', async () => {
    return request(app.getHttpServer())
      .post(APP_CONSTANTS.API_ROUTES_PREFIX('tutor-skills', '/'))
      .send({
        id: TUTOR_SKILL_ID,
        userId: FIXTURE_IDS.USERS[0],
        skillId: FIXTURE_IDS.SKILLS[0],
        levelSystemName: SkillLevels.Level2,
        rate: 50,
        years: 4,
      })
      .set('Accept', 'application/json')
      .expect(201)
      .then(async () => {
        expect(await getRepository(TutorSkill).find()).toMatchInlineSnapshot(`
          Array [
            TutorSkill {
              "id": "7211b9c5-8017-4d64-a2bd-76a2105b0a4f",
              "levelSystemName": "level_2",
              "rate": 50,
              "skillId": "49eca663-4727-424f-9f9d-b7838c8f7dff",
              "userId": "c351ee24-9a21-44ac-ae92-766769f80233",
              "years": 4,
            },
          ]
        `);
      });
  });

  it('/PATCH tutor-skills', async () => {
    return request(app.getHttpServer())
      .patch(APP_CONSTANTS.API_ROUTES_PREFIX(`tutor-skills/${TUTOR_SKILL_ID}`, '/'))
      .send({
        userId: FIXTURE_IDS.USERS[0],
        skillId: FIXTURE_IDS.SKILLS[1],
        levelSystemName: SkillLevels.Level2,
        rate: 15,
        years: 34,
      })
      .set('Accept', 'application/json')
      .expect(204)
      .then(async () => {
        expect(await getRepository(TutorSkill).find()).toMatchInlineSnapshot(`
          Array [
            TutorSkill {
              "id": "7211b9c5-8017-4d64-a2bd-76a2105b0a4f",
              "levelSystemName": "level_2",
              "rate": 15,
              "skillId": "507378a4-53ac-4f70-acda-ff15111c989b",
              "userId": "c351ee24-9a21-44ac-ae92-766769f80233",
              "years": 34,
            },
          ]
        `);
      });
  });

  it('/GET tutor-skills', async () => {
    return request(app.getHttpServer())
      .get(APP_CONSTANTS.API_ROUTES_PREFIX('tutor-skills', '/'))
      .set('Accept', 'application/json')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchInlineSnapshot(`
          Array [
            Object {
              "id": "7211b9c5-8017-4d64-a2bd-76a2105b0a4f",
              "levelDisplayName": "Intermediate",
              "levelSystemName": "level_2",
              "rate": 15,
              "skillId": "507378a4-53ac-4f70-acda-ff15111c989b",
              "skillName": "Skill B",
              "years": 34,
            },
          ]
        `);
      });
  });

  it('/DELETE tutor-skills', async () => {
    return request(app.getHttpServer())
      .delete(APP_CONSTANTS.API_ROUTES_PREFIX(`tutor-skills/${TUTOR_SKILL_ID}`, '/'))
      .set('Accept', 'application/json')
      .expect(204)
      .then(async () => {
        expect(await getRepository(TutorSkill).find()).toMatchInlineSnapshot(`Array []`);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
