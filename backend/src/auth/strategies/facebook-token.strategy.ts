import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as Strategy from 'passport-facebook-token';
import { ConfigService } from '../../shared/services';
import { IProviderAuthResponse } from '../../auth/auth.types';
import get from 'lodash/fp/get';

@Injectable()
export class FacebookTokenStrategy extends PassportStrategy(Strategy, 'facebook-token') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getFacebookClientID(),
      clientSecret: configService.getFacebookClientSecret(),
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
