import get from 'lodash-es/get';

export class SkillResourceResponse {
  id: string;
  title: string;
  link: string;
  mediaType: string;

  constructor(jsonObject: object) {
    this.id = get(jsonObject, 'id');
    this.title = get(jsonObject, 'title');
    this.link = get(jsonObject, 'link');
    this.mediaType = get(jsonObject, 'mediaType');
  }
}
