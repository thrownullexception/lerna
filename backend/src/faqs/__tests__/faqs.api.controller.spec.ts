import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FixturesService, TestingModule } from '../../shared/tests';
import { APP_CONSTANTS } from '../../shared/constants';

import { FaqsModule } from '../faqs.module';

describe('Faqs API Controller', () => {
  let app: INestApplication;
  let fixturesService: FixturesService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestingModule, FaqsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    fixturesService = moduleRef.get<FixturesService>(FixturesService);
  });

  beforeEach(async () => {
    await fixturesService.resetEntityFixtures('Faq', 'faqs');
  });

  it('API /GET faqs', async () => {
    return request(app.getHttpServer())
      .get(APP_CONSTANTS.API_ROUTES_PREFIX('faqs', '/'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchInlineSnapshot(`
          Array [
            Object {
              "answer": "Answer 1",
              "id": "c351ee24-9a21-44ac-ae92-766769f80233",
              "question": "Question For Tutor 1",
            },
            Object {
              "answer": "Answer 2",
              "id": "b80bc459-8879-4a3d-822e-2c255c9832f3",
              "question": "Question For Student 2",
            },
          ]
        `);
      });
  });

  it('/GET faqs?account_mode=tutor', async () => {
    return request(app.getHttpServer())
      .get(APP_CONSTANTS.API_ROUTES_PREFIX('faqs?account_mode=tutor', '/'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchInlineSnapshot(`
          Array [
            Object {
              "answer": "Answer 1",
              "id": "c351ee24-9a21-44ac-ae92-766769f80233",
              "question": "Question For Tutor 1",
            },
          ]
        `);
      });
  });

  it('/GET faqs?account_mode=student', async () => {
    return request(app.getHttpServer())
      .get(APP_CONSTANTS.API_ROUTES_PREFIX('faqs?account_mode=student', '/'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchInlineSnapshot(`
          Array [
            Object {
              "answer": "Answer 2",
              "id": "b80bc459-8879-4a3d-822e-2c255c9832f3",
              "question": "Question For Student 2",
            },
          ]
        `);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
