import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthGuard } from '@nestjs/passport';
import { FixturesService, mockJWTGuard, TestingModule } from '../../shared/tests';
import { APP_CONSTANTS } from '../../shared/constants';

import { UserCompletedSkillRoadMapsModule } from '../user-completed-skill-road-maps.module';
import { UserCompletedSkillRoadMap } from '../user-completed-skill-road-maps.entity';
import { getRepository } from 'typeorm';
import { UserCompletedSkillRoadMapsRepository } from '../user-completed-skill-road-maps.repository';

describe('UserCompletedSkillRoadMaps API Controller', () => {
  let app: INestApplication;
  let fixturesService: FixturesService;
  const SKILL_ROAD_MAP_ID = 'e001b1e8-c885-442a-8098-3d23e8561962';
  const USER_ID = 'c351ee24-9a21-44ac-ae92-766769f80233';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestingModule, UserCompletedSkillRoadMapsModule],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue(mockJWTGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    fixturesService = moduleRef.get<FixturesService>(FixturesService);
  });

  beforeEach(async () => {
    await fixturesService.resetEntityFixtures(
      UserCompletedSkillRoadMap,
      'user-completed-skill-road-maps',
    );
  });

  it('API /POST user-completed-skill-road-maps', async () => {
    return request(app.getHttpServer())
      .post(APP_CONSTANTS.API_ROUTES_PREFIX('user-completed-skill-road-maps', '/'))
      .send({
        id: 'e001b1e8-c885-442a-8098-3d23e8561962',
        userId: USER_ID,
        skillRoadMapId: SKILL_ROAD_MAP_ID,
      })
      .set('Accept', 'application/json')
      .expect(201)
      .then(async () => {
        expect(await getRepository(UserCompletedSkillRoadMap).find()).toMatchInlineSnapshot(`
          Array [
            UserCompletedSkillRoadMap {
              "id": "e001b1e8-c885-442a-8098-3d23e8561962",
              "skillRoadMapId": "e001b1e8-c885-442a-8098-3d23e8561962",
              "userId": "c351ee24-9a21-44ac-ae92-766769f80233",
            },
          ]
        `);
      });
  });

  it('API /DELETE user-completed-skill-road-maps', async () => {
    return request(app.getHttpServer())
      .delete(
        APP_CONSTANTS.API_ROUTES_PREFIX(`user-completed-skill-road-maps/${SKILL_ROAD_MAP_ID}`, '/'),
      )
      .set('Accept', 'application/json')
      .expect(204)
      .then(async () => {
        expect(await getRepository(UserCompletedSkillRoadMap).find()).toMatchInlineSnapshot(
          `Array []`,
        );
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
