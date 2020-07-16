import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { MailerService } from '@nest-modules/mailer';

interface IMailServiceParameters {
  to: string;
  context: Record<string, string>;
}

interface IMailTemplateParameters {
  subject: string;
  template: string;
}

type IMailPayload = IMailTemplateParameters & IMailServiceParameters;

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendShortListCandidateMail(mailServiceParameters: IMailServiceParameters): Promise<void> {
    return await this.marshMailParameters({ subject: 'Quinze Invite', template: 'invite.hbs' })(
      mailServiceParameters,
    );
  }

  private marshMailParameters = (mailTemplateParameters: IMailTemplateParameters) => (
    mailServiceParameters: IMailServiceParameters,
  ): Promise<void> => {
    return this.sendMail({ ...mailTemplateParameters, ...mailServiceParameters });
  };

  private async sendMail({ to, subject, template, context }: IMailPayload) {
    return await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
      from: this.configService.getMailFromAddress(),
    });
  }
}
