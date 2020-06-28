import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {
  LocalStrategy,
  FacebookTokenStrategy,
  GoogleTokenStrategy,
  JwtStrategy,
} from './strategies';
import { ConfigService, HashService } from '../shared/services';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserVerificationsModule } from '../user-verifications/user-verifications.module';
import { CoinHistoriesModule } from '../coin-histories/coin-histories.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { ConfigModule } from '../shared/services/config/config.module';

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
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    GoogleTokenStrategy,
    FacebookTokenStrategy,
    LocalStrategy,
    AuthService,
    ConfigService,
    HashService,
  ],
})
export class AuthModule {}
