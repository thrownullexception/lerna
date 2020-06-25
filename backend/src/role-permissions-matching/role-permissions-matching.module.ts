import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesPermissionsMatchingService } from './role-permissions-matching.service';
import { RolesPermissionMatching } from './role-permissions-matching.entity';
import { RolesPermissionsMatchingController } from './role-permissions-matching.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RolesPermissionMatching])],
  providers: [RolesPermissionsMatchingService],
  controllers: [RolesPermissionsMatchingController],
})
export class RolesPermissionsMatchingModule {}
