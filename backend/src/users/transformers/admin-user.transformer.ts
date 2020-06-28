import { User } from '../users.entity';
import { GenderTypes } from '../../genders/genders.types';

export class AdminUserTransformer {
  id: string;
  email: string;
  username: string;
  verified: boolean;
  nicename: string;
  gender: GenderTypes;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.verified = user.verified;
    if (user.profile) {
      this.nicename = user.profile.firstName;
      this.gender = user.profile.gender;
    }
  }
}
