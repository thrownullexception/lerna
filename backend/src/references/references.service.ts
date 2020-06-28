import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reference } from './references.entity';
import { UpdateReferenceDTO } from './references.dto';

@Injectable()
export class ReferencesService {
  constructor(
    @InjectRepository(Reference)
    private readonly referenceRepository: Repository<Reference>,
  ) {}

  private async getReference(key: string): Promise<string> {
    return (
      await this.referenceRepository.findOneOrFail({
        where: {
          key,
        },
      })
    ).value;
  }

  async getSignupCoinsBonus(): Promise<number> {
    return +(await this.getReference('signup_coins_bonus'));
  }

  async getPayoutThreshold(): Promise<number> {
    return +(await this.getReference('payout_threshold'));
  }

  async updateReference(
    updateReferenceDTO: UpdateReferenceDTO,
    referenceId: string,
  ): Promise<void> {
    await this.referenceRepository.update(
      { id: referenceId },
      { value: updateReferenceDTO.value },
    );
  }
}
