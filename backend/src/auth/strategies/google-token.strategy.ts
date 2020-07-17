import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-token';
import { ConfigService } from '../../shared/services';
import { IProviderAuthResponse } from '../../auth/auth.types';
import get from 'lodash/fp/get';

@Injectable()
export class GoogleTokenStrategy extends PassportStrategy(Strategy, 'google-token') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getGoogleClientID(),
      clientSecret: configService.getGoogleClientSecret(),
    });
  }

  async validate(
    _: string,
    __: string,
    profile: Record<string, unknown>,
  ): Promise<IProviderAuthResponse> {
    return {
      email: get(['emails', 0, 'value'], profile),
      name: get(['displayName'], profile) as string,
      image: get(['photos', 0, 'value'], profile),
    };
  }
}
