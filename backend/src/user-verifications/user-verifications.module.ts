import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVerification } from './user-verifications.entity';
import { UserVerificationService } from './user-verifications.service';
import { HashService } from '../shared/services';

@Module({
  imports: [TypeOrmModule.forFeature([UserVerification])],
  providers: [UserVerificationService, HashService],
  exports: [UserVerificationService],
})
export class UserVerificationsModule {}
