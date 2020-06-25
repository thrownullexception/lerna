import { Controller, OnApplicationBootstrap } from '@nestjs/common';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController implements OnApplicationBootstrap {
  constructor(private readonly permissionsService: PermissionsService) {}

  onApplicationBootstrap() {
    this.permissionsService.saveAllPermission();
  }
}
