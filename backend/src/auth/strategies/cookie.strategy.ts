import { Strategy } from 'passport-cookie';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IAuthenticatedUser } from '../auth.types';
import { AUTH_CONTANTS } from '../auth.constants';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(private readonly authService: AuthService) {
    super({
      cookieName: AUTH_CONTANTS.AUTH_COOKIE_KEY,
      signed: true,
    });
  }

  async validate(userId: string): Promise<IAuthenticatedUser> {
    return await this.authService.validateUserFromUserId(userId);
  }
}
