import get from 'lodash-es/get';

export class FavouriteSkillsAndCompletedRoadMapsResponse {
  completedRoadMapIds: string[];
  favouriteSkillIds: string[];

  constructor(jsonObject: object) {
    this.completedRoadMapIds = get(jsonObject, 'completedRoadMapIds');
    this.favouriteSkillIds = get(jsonObject, 'favouriteSkillIds');
  }
}
