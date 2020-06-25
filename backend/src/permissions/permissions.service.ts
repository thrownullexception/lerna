import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permissions.entity';
import * as permissionsJson from '../../database/json/permissions.json';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async saveAllPermission(): Promise<void> {
    // permissionsJson.forEach(async (permission: string) => {
    //   if (await this.permissionRepository.count({ permission })) {
    //     return;
    //   }
    //   await this.permissionRepository.save({
    //     permission,
    //   });
    // });
  }
}
