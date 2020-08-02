import { Injectable } from '@nestjs/common';
import { AcccountModesRepository } from './account-modes.repository';
import { AccountMode } from './account-modes.entity';
import { SelectOptionTransformer } from '../shared/transformers';

@Injectable()
export class AccountModesService {
  constructor(private readonly acccountModesRepository: AcccountModesRepository) {}

  async listAccountModes(): Promise<AccountMode[]> {
    return await this.acccountModesRepository.listAccountModes();
  }

  async listAccountModesAsSelectOptions(): Promise<SelectOptionTransformer[]> {
    return (await this.acccountModesRepository.listAccountModes()).map(
      accountMode => new SelectOptionTransformer(accountMode),
    );
  }
}
