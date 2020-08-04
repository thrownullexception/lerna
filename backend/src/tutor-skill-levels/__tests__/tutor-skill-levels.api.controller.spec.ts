import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { APP_CONSTANTS } from '../../shared/constants';
import { TestingModule } from '../../shared/tests';

import { TutorSkillLevelsModule } from '../tutor-skill-levels.module';

describe('TutorSkillLevels API Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestingModule, TutorSkillLevelsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('API /GET tutor-skill-levels', async () => {
    return request(app.getHttpServer())
      .get(APP_CONSTANTS.API_ROUTES_PREFIX('tutor-skill-levels', '/'))
      .set('Accept', 'application/json')
      .expect(200)
      .expect(({ body }) => {
        expect(body[0]).toMatchInlineSnapshot(`
          Object {
            "displayName": "Beginner",
            "systemName": "level_1",
          }
        `);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
