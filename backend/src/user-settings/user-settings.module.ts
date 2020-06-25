import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettingsService } from './user-settings.service';
import { UserSetting } from './user-settings.entity';
import { UserSettingsController } from './user-settings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserSetting])],
  providers: [UserSettingsService],
  controllers: [UserSettingsController],
  exports: [UserSettingsService],
})
export class UserSettingsModule {}
