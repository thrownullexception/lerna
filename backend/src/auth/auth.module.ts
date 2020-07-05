import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {
  LocalStrategy,
  FacebookTokenStrategy,
  GoogleTokenStrategy,
  JwtStrategy,
  CookieStrategy,
} from './strategies';
import { ConfigService, HashService } from '../shared/services';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthApiController } from './auth.api.controller';
import { UserVerificationsModule } from '../user-verifications/user-verifications.module';
import { CoinHistoriesModule } from '../coin-histories/coin-histories.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { ConfigModule } from '../shared/services/config/config.module';
import { AuthAdminController } from './auth.admin.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    UsersModule,
    ProfilesModule,
    CoinHistoriesModule,
    UserVerificationsModule,
  ],
  controllers: [AuthApiController, AuthAdminController],
  providers: [
    JwtStrategy,
    GoogleTokenStrategy,
    FacebookTokenStrategy,
    CookieStrategy,
    LocalStrategy,
    AuthService,
    ConfigService,
    HashService,
  ],
})
export class AuthModule {}
