import {
  Controller,
  UseGuards,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesPermissionsMatchingService } from './role-permissions-matching.service';
import { RolePermissionMatchingDTO } from './role-permissions-matching.dto';
import { AdminPermission } from '../shared/decorators';
import { PermissionsGuard } from '../auth/permissions.guards';

@Controller('roles-permissions-matching')
@UseGuards(AuthGuard('jwt'))
export class RolesPermissionsMatchingController {
  constructor(
    private readonly rolesPermissionsMatchingService: RolesPermissionsMatchingService,
  ) {}

  @Post()
  @AdminPermission('CAN_MATCH_PERMISSION_TO_ROLE')
  @UseGuards(PermissionsGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(
    @Body() rolePermissionMatchingDTO: RolePermissionMatchingDTO,
  ): Promise<void> {
    await this.rolesPermissionsMatchingService.createRolePermissionsMatching(
      rolePermissionMatchingDTO,
    );
  }

  @Delete(':id')
  @AdminPermission('CAN_DELETE_ROLE_PERMISSION_GUARD')
  @UseGuards(PermissionsGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.rolesPermissionsMatchingService.deleteRolePermissionsMatching(
      +id,
    );
  }
}
