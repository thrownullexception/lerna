import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsApiController } from './sessions.api.controller';
import { SessionsRepository } from './sessions.repository';
import { SessionsService } from './sessions.service';

@Module({
  imports: [TypeOrmModule.forFeature([SessionsRepository])],
  controllers: [SessionsApiController],
  providers: [SessionsService],
})
export class SessionsModule {}
