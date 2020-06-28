import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqsController } from './faqs.controller';
import { AdminFaqsController } from './faqs.admin.controller';
import { FaqsService } from './faqs.service';
import { FaqsRepository } from './faqs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FaqsRepository])],
  controllers: [FaqsController, AdminFaqsController],
  providers: [FaqsService],
})
export class FaqsModule {}
