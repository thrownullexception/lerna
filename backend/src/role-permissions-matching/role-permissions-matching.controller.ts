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
  async create(@Body() rolePermissionMatchingDTO: RolePermissionMatchingDTO) {
    const rolePermissionMatchingId = await this.rolesPermissionsMatchingService.createRolePermissionsMatching(
      rolePermissionMatchingDTO,
    );
    return { data: rolePermissionMatchingId };
  }

  @Delete(':id')
  @AdminPermission('CAN_DELETE_ROLE_PERMISSION_GUARD')
  @UseGuards(PermissionsGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.rolesPermissionsMatchingService.deleteRolePermissionsMatching(
      +id,
    );
  }
}
