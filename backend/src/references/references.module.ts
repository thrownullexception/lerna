import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';
import { Reference } from './references.entity';
import { ConfigService } from '../shared/services';
import { ConfigModule } from '../shared/services/config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reference]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
  ],
  controllers: [ReferencesController],
  providers: [ReferencesService],
  exports: [ReferencesService],
})
export class ReferencesModule {}
