import get from 'lodash-es/get';

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
    this.id = get(jsonObject, 'id');
    this.token = get(jsonObject, 'jwtToken');
    this.email = get(jsonObject, 'email');
    this.lastName = get(jsonObject, 'lastName');
    this.firstName = get(jsonObject, 'firstName');
    this.picture = get(jsonObject, 'picture');
    this.accountMode = get(jsonObject, 'accountMode') as AccountModeType;
  }
}
