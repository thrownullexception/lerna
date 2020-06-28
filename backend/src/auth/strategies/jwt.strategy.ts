import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../../shared/services';
import { UsersService } from '../../users/users.service';

interface IJwtPayload {
  id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJWTSecretKey(),
    });
  }

  async validate({ id: userId }: IJwtPayload): Promise<{ id: string }> {
    const user = await this.usersService.getMultipleFieldsFromUserId(userId, ['id', 'roleId']);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.roleId) {
      return { id: userId };
    }
    return await this.usersService.getUserWithPermission(userId);
  }
}
