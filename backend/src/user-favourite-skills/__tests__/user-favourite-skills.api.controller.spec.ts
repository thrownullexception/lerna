import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthGuard } from '@nestjs/passport';
import { FixturesService, mockJWTGuard, TestingModule } from '../../shared/tests';
import { APP_CONSTANTS } from '../../shared/constants';

import { getRepository } from 'typeorm';
import { UserFavouriteSkillsModule } from '../user-favourite-skills.module';
import { UserFavouriteSkill } from '../user-favourite-skills.entity';

describe('UserFavouriteSkills API Controller', () => {
  let app: INestApplication;
  let fixturesService: FixturesService;
  const SKILL_ID = '49eca663-4727-424f-9f9d-b7838c8f7dff';
  const USER_ID = 'c351ee24-9a21-44ac-ae92-766769f80233';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestingModule, UserFavouriteSkillsModule],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue(mockJWTGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    fixturesService = moduleRef.get<FixturesService>(FixturesService);
  });

  beforeEach(async () => {
    await fixturesService.resetEntityFixtures(UserFavouriteSkill, 'user-favourite-skills');
  });

  it('API /POST user-favourite-skills', async () => {
    return request(app.getHttpServer())
      .post(APP_CONSTANTS.API_ROUTES_PREFIX('user-favourite-skills', '/'))
      .send({
        id: '035f03cc-e45b-4441-90de-dd9deed62854',
        userId: USER_ID,
        skillId: SKILL_ID,
      })
      .set('Accept', 'application/json')
      .expect(201)
      .then(async () => {
        expect(await getRepository(UserFavouriteSkill).find()).toMatchInlineSnapshot(`
          Array [
            UserFavouriteSkill {
              "id": "035f03cc-e45b-4441-90de-dd9deed62854",
              "skillId": "49eca663-4727-424f-9f9d-b7838c8f7dff",
              "userId": "c351ee24-9a21-44ac-ae92-766769f80233",
            },
          ]
        `);
      });
  });

  it('API /DELETE user-favourite-skills', async () => {
    return request(app.getHttpServer())
      .delete(APP_CONSTANTS.API_ROUTES_PREFIX(`user-favourite-skills/${SKILL_ID}`, '/'))
      .set('Accept', 'application/json')
      .expect(204)
      .then(async () => {
        expect(await getRepository(UserFavouriteSkill).find()).toMatchInlineSnapshot(`Array []`);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
