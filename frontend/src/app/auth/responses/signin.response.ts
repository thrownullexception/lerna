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
  constructor(jsonObject: Record<string, string>) {
    this.id = get('id', jsonObject);
    this.token = get('jwtToken', jsonObject);
    this.email = get('email', jsonObject);
    this.lastName = get('lastName', jsonObject);
    this.firstName = get('firstName', jsonObject);
    this.picture = get('picture', jsonObject);
    this.accountMode = get('accountMode', jsonObject) as AccountModeType;
  }
}
