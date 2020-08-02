import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqsController } from './faqs.api.controller';
import { AdminFaqsController } from './faqs.admin.controller';
import { FaqsService } from './faqs.service';
import { FaqsRepository } from './faqs.repository';
import { AccountModesModule } from '../account-modes/account-modes.module';

@Module({
  imports: [TypeOrmModule.forFeature([FaqsRepository]), AccountModesModule],
  controllers: [FaqsController, AdminFaqsController],
  providers: [FaqsService],
})
export class FaqsModule {}
