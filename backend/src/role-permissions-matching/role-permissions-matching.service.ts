import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermissionMatchingDTO } from './dtos';
import { RolesPermissionMatching } from './role-permissions-matching.entity';

@Injectable()
export class RolesPermissionsMatchingService {
  constructor(
    @InjectRepository(RolesPermissionMatching)
    private readonly rolesPermissionMatchingRepository: Repository<RolesPermissionMatching>,
  ) {}

  async createRolePermissionsMatching(
    rolePermissionMatchingDTO: RolePermissionMatchingDTO,
  ): Promise<void> {
    await this.rolesPermissionMatchingRepository.insert(rolePermissionMatchingDTO);
  }

  async deleteRolePermissionsMatching(rolePermissionMatchingId: number): Promise<void> {
    await this.rolesPermissionMatchingRepository.delete(rolePermissionMatchingId);
  }
}
