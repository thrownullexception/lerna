import get from 'lodash/fp/get';

export class SkillResourceResponse {
  id: string;
  title: string;
  link: string;
  mediaType: string;

  constructor(jsonObject: object) {
    this.id = get('id', jsonObject);
    this.title = get('title', jsonObject);
    this.link = get('link', jsonObject);
    this.mediaType = get('mediaType', jsonObject);
  }
}
