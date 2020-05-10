import get from 'lodash/fp/get';

import { AccountModeType } from '../auth.types';

export class SignInResponse {
  accountMode: AccountModeType;
  email: string;
  lastName: string;
  firstName: string;
  picture: string;
  id: string;
  token: string;
  constructor(jsonObject: object) {
    this.id = get('id', jsonObject);
    this.token = get('jwt_token', jsonObject);
    this.email = get('email', jsonObject);
    this.lastName = get('last_name', jsonObject);
    this.firstName = get('first_name', jsonObject);
    this.picture = get('picture', jsonObject);
    this.accountMode = get('account_mode', jsonObject);
  }
}
