import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HashService } from '../shared/services';
import { IAuthenticatedUser } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  generateAuthToken(userId: string): string {
    return this.jwtService.sign({ id: userId });
  }

  async validateUserAuthenticationCredentials(
    email: string,
    password: string,
  ): Promise<IAuthenticatedUser> {
    const user = await this.usersService.getUserDetailsFromEmail(email, ['id', 'password']);

    if (user && (await this.hashService.compare(password, user.password))) {
      return { id: user.id };
    }
    return null;
  }

  async validateUserFromUserId(userId: string): Promise<IAuthenticatedUser> {
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
