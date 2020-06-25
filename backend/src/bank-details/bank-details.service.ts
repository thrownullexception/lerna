import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankDetail } from './bank-details.entity';
import { UpdateBankDetailsDTO } from '../users/dtos';

@Injectable()
export class BankDetailsService {
  constructor(
    @InjectRepository(BankDetail)
    private readonly bankDetailRepository: Repository<BankDetail>,
  ) {}

  async updateBankDetails(
    userId: number,
    bankDetailsDTO: UpdateBankDetailsDTO,
  ): Promise<void> {
    await this.bankDetailRepository.update({ userId }, bankDetailsDTO);
  }

  async createForNewUser(userId: number): Promise<void> {
    await this.bankDetailRepository.insert({ userId });
  }
}
