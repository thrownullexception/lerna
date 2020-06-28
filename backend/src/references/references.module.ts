import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';
import { Reference } from './references.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reference])],
  controllers: [ReferencesController],
  providers: [ReferencesService],
  exports: [ReferencesService],
})
export class ReferencesModule {}
