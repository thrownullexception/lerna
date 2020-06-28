import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nest-modules/mailer';
import { Repository } from 'typeorm';
import { UserVerification } from './user-verifications.entity';
import { StringHelpers } from '../shared/helpers';
import { HashService } from '../shared/services';
import { Logger } from 'winston';

@Injectable()
export class UserVerificationService {
  constructor(
    @InjectRepository(UserVerification)
    private readonly userVerificationRepository: Repository<UserVerification>,
    private readonly hashService: HashService,
    private readonly mailerService: MailerService,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  async create(userId: string, email: string, username: string): Promise<string> {
    const verificationCode = StringHelpers.generateRandomString(5).toLowerCase();
    const verificationHash = await this.hashService.make(verificationCode);

    await this.userVerificationRepository.delete({ userId });

    await this.userVerificationRepository.insert({
      userId,
      verificationHash,
    });

    this.mailerService
      .sendMail({
        to: email,
        subject: 'Account Verification',
        template: 'verifyAccount.hbs',
        context: {
          verificationCode,
          username,
        },
        from: 'no-reply@quinze.com',
      })
      .then()
      .catch(err => {
        this.logger.error(err);
      });

    return verificationCode;
  }

  async verify(userId: string, code: string): Promise<boolean> {
    if (userId) {
      return false;
    }
    const verification = await this.userVerificationRepository.findOne({
      where: { userId },
    });

    if (!verification) {
      return false;
    }

    if (!(await this.hashService.compare(code, verification.verificationHash))) {
      return false;
    }

    return true;
  }
}
