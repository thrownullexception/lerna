import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ValidationsController } from './validations.controller';

@Module({
  imports: [UsersModule],
  controllers: [ValidationsController],
})
export class ValidationsModule {}
