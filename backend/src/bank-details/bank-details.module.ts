import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankDetailsService } from './bank-details.service';
import { BankDetail } from './bank-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankDetail])],
  controllers: [],
  providers: [BankDetailsService],
  exports: [BankDetailsService],
})
export class BankDetailsModule {}
