import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermissionMatchingDTO } from './role-permissions-matching.dto';
import { RolesPermissionMatching } from './role-permissions-matching.entity';

@Injectable()
export class RolesPermissionsMatchingService {
  constructor(
    @InjectRepository(RolesPermissionMatching)
    private readonly rolesPermissionMatchingRepository: Repository<
      RolesPermissionMatching
    >,
  ) {}

  async createRolePermissionsMatching(
    rolePermissionMatchingDTO: RolePermissionMatchingDTO,
  ): Promise<number> {
    const created = await this.rolesPermissionMatchingRepository.save(
      rolePermissionMatchingDTO,
    );
    return created.id;
  }

  async deleteRolePermissionsMatching(
    rolePermissionMatchingId: number,
  ): Promise<void> {
    await this.rolesPermissionMatchingRepository.delete(
      rolePermissionMatchingId,
    );
  }
}
