import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqsController } from './faqs.controller';
import { AdminFaqsController } from './faqs.admin.controller';
import { FaqsService } from './faqs.service';
import { Faq } from './faqs.entity';
import { ConfigService } from '../shared/services';
import { ConfigModule } from '../shared/services/config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Faq]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
  ],
  controllers: [FaqsController, AdminFaqsController],
  providers: [FaqsService],
})
export class FaqsModule {}
