export enum UserResigsteredBy {
  EMAIL = 1,
  FACEBOOK = 2,
  GOOGLE = 3,
}

export interface ICreateUserDetails {
  email: string;
  username: string;
  password?: string;
  registeredBy: UserResigsteredBy;
  verified: boolean;
}
