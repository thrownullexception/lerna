import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as Strategy from 'passport-facebook-token';
import { ConfigService } from '../../shared/services';
import { IProviderAuthResponse } from '../../auth/auth.types';

@Injectable()
export class FacebookTokenStrategy extends PassportStrategy(
  Strategy,
  'facebook-token',
) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getFacebookClientID(),
      clientSecret: configService.getFacebookClientSecret(),
    });
  }

  async validate(
    _: string,
    __: string,
    profile: any,
  ): Promise<IProviderAuthResponse> {
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
      image: profile.photos[0].value, // TODO get
    };
  }
}
