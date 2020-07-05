import { Repository, EntityRepository } from 'typeorm';
import { User } from './users.entity';
// import { FaqDTO } from './users.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async listFaqs(): Promise<User[]> {
    return await this.find({
      order: { id: 'DESC' },
    });
  }

  async showUser(userId: string): Promise<User> {
    return await this.findOne({
      where: { id: userId },
      relations: ['lastTouchedBy', 'accountMode'],
    });
  }

  // async createUser(faqDTO: FaqDTO, adminId: string): Promise<string> {
  //   const { id } = await this.save({ ...faqDTO, adminId });
  //   return id;
  // }

  // async updateUser(faqId: string, faqDTO: FaqDTO, lastTouchedById: string): Promise<void> {
  //   await this.update(faqId, { ...faqDTO, lastTouchedById });
  // }

  async deleteUser(userId: string): Promise<void> {
    await this.delete(userId);
  }
}
