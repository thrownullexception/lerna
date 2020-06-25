import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-token';
import { ConfigService } from '../../shared/services';
import { IProviderAuthResponse } from '../../auth/auth.types';

@Injectable()
export class GoogleTokenStrategy extends PassportStrategy(
  Strategy,
  'google-token',
) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getGoogleClientID(),
      clientSecret: configService.getGoogleClientSecret(),
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
