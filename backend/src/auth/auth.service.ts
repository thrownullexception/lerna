import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HashService } from '../shared/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async generateAuthToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  async validateUser(email: string, password: string): Promise<{ id: string }> {
    const user = await this.usersService.getUserDetailsFromEmail(email, [
      'id',
      'password',
    ]);

    if (user && (await this.hashService.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
