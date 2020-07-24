import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FixturesService } from './fixtures.service';
import { ConfigService } from '../services';
import { ConfigModule } from '../services/config/config.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
  ],
  providers: [FixturesService],
  exports: [FixturesService],
})
export class TestingModule {}
