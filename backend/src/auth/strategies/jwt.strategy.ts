import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../shared/services';
import { AuthService } from '../auth.service';
import { IAuthenticatedUser } from '../auth.types';

interface IJwtPayload {
  id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJWTSecretKey(),
    });
  }

  async validate({ id: userId }: IJwtPayload): Promise<IAuthenticatedUser> {
    return await this.authService.validateUserFromUserId(userId);
  }
}
