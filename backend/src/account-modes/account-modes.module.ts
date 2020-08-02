import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcccountModesRepository } from './account-modes.repository';
import { AccountModesService } from './account-modes.service';

@Module({
  imports: [TypeOrmModule.forFeature([AcccountModesRepository])],
  controllers: [],
  providers: [AccountModesService],
  exports: [AccountModesService],
})
export class AccountModesModule {}
