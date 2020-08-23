import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { TutorSkillsActions } from '../tutor-skills.actions';

const mockStore = configureMockStore([thunk]);

describe('TutorSkillsActions', () => {
  afterAll(() => mockAxios.reset());

  it('getTutorSkills', async () => {
    const store = mockStore({});

    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            id: 'some id',
            skillId: 'some skill id',
            levelDisplayName: 'some level name',
            levelSystemName: 'some level',
            rate: 1,
            years: 1,
            skillName: 1,
          },
        ],
      }),
    );

    await store.dispatch(TutorSkillsActions.getTutorSkills());

    expect(mockAxios.get).toHaveBeenCalledWith('tutor-skills');

    expect(store.getActions()).toMatchInlineSnapshot(`
      Array [
        Object {
          "payload": undefined,
          "type": "requestStatus/dataRequestStarted",
        },
        Object {
          "payload": Array [
            TutorSkillResponse {
              "id": "some id",
              "levelDisplayName": "some level name",
              "levelSystemName": "some level",
              "rate": 1,
              "skillId": "some skill id",
              "skillName": 1,
              "years": 1,
            },
          ],
          "type": "tutorSkills/setTutorSkills",
        },
        Object {
          "payload": undefined,
          "type": "requestStatus/dataRequestEnded",
        },
      ]
    `);
  });
});
