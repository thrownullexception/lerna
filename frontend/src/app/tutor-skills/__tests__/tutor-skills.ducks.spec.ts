import { AnyAction } from '@reduxjs/toolkit';
import { tutorSkillsSlice, initialState, DOMAIN } from '../../tutor-skills/tutor-skills.ducks';
import { TutorSkillResponse } from '../responses';
import { TutorSkillsSelectors } from '../tutor-skills.selectors';
import { rootStateWrap } from '../../../shared/tests/utils';

const rootDomainStateWrap = rootStateWrap(DOMAIN);

describe('TutorSkillSlice', () => {
  const baseId = 'some unique id';
  const baseTutorSkillResponse = new TutorSkillResponse({
    id: baseId,
    skillId: 'some skill id',
    levelSystemName: 'some level',
    levelDisplayName: 'some level name',
    rate: 1,
    years: 1,
    skillName: 1,
  });

  it('should return the initial state on first run', () => {
    expect(tutorSkillsSlice.reducer(undefined, {} as AnyAction)).toEqual(initialState);
  });

  it('should set tutorSkills', () => {
    const payload = [baseTutorSkillResponse];
    const nextState = rootDomainStateWrap(
      tutorSkillsSlice.reducer(initialState, tutorSkillsSlice.actions.setTutorSkills(payload)),
    );

    expect(TutorSkillsSelectors.selectTutorSkills(nextState)).toMatchInlineSnapshot(`
      Array [
        TutorSkillResponse {
          "id": "some unique id",
          "levelDisplayName": "some level name",
          "levelSystemName": "some level",
          "rate": 1,
          "skillId": "some skill id",
          "skillName": 1,
          "years": 1,
        },
      ]
    `);
  });

  it('should add tutorSkills', () => {
    const payload = baseTutorSkillResponse;
    const nextState = rootDomainStateWrap(
      tutorSkillsSlice.reducer(initialState, tutorSkillsSlice.actions.addTutorSkill(payload)),
    );

    expect(TutorSkillsSelectors.selectTutorSkills(nextState)).toMatchInlineSnapshot(`
      Array [
        TutorSkillResponse {
          "id": "some unique id",
          "levelDisplayName": "some level name",
          "levelSystemName": "some level",
          "rate": 1,
          "skillId": "some skill id",
          "skillName": 1,
          "years": 1,
        },
      ]
    `);
  });

  it('should update tutorSkill', () => {
    const payload = new TutorSkillResponse({
      id: baseId,
      skillId: 'updated skill id',
      levelSystemName: 'updated level id',
      levelDisplayName: 'updates level name',
      rate: 2,
      years: 2,
      skillName: 2,
    });
    const currentState = {
      tutorSkills: [baseTutorSkillResponse],
    };
    const nextState = rootDomainStateWrap(
      tutorSkillsSlice.reducer(currentState, tutorSkillsSlice.actions.updateTutorSkill(payload)),
    );

    expect(TutorSkillsSelectors.selectTutorSkills(nextState)).toMatchInlineSnapshot(`
      Array [
        TutorSkillResponse {
          "id": "some unique id",
          "levelDisplayName": "updates level name",
          "levelSystemName": "updated level id",
          "rate": 2,
          "skillId": "updated skill id",
          "skillName": 2,
          "years": 2,
        },
      ]
    `);
  });

  it('should delete tutorSkill', () => {
    const currentState = {
      tutorSkills: [baseTutorSkillResponse],
    };
    const nextState = rootDomainStateWrap(
      tutorSkillsSlice.reducer(currentState, tutorSkillsSlice.actions.deleteTutorSkill(baseId)),
    );

    expect(TutorSkillsSelectors.selectTutorSkills(nextState)).toMatchInlineSnapshot(`Array []`);
  });
});
