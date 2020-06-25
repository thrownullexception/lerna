import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinHistoryService } from './coin-histories.service';
import { CoinHistory } from './coin-histories.entity';
import { AdminCoinsHistoryController } from './coins-histories.admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CoinHistory])],
  providers: [CoinHistoryService],
  controllers: [AdminCoinsHistoryController],
  exports: [CoinHistoryService],
})
export class CoinHistoriesModule {}
