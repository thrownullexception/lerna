import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { HashService } from '../shared/services';
import { ProfilesModule } from '../profiles/profiles.module';
import { AdminUsersController } from './users.admin.controller';
import { BankDetailsModule } from '../bank-details/bank-details.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProfilesModule, UsersModule, BankDetailsModule],
  controllers: [AdminUsersController, UsersController],
  providers: [UsersService, HashService],
  exports: [UsersService],
})
export class UsersModule {}
