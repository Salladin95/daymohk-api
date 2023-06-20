import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { MailerConfigEnum } from 'src/configs/mailer.config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public sendMessage({
    subject,
    text,
    html = `<b>${text}</b>`,
    to = this.configService.get(MailerConfigEnum.TO),
    from = this.configService.get(MailerConfigEnum.FROM),
  }: {
    subject: string;
    text: string;
    html?: string;
    to?: string;
    from?: string;
  }): void {
    this.mailerService
      .sendMail({
        to, // list of receivers
        from, // sender address
        subject, // Subject line
        text, // plaintext body
        html, // HTML body content
      })
      .catch((err) => {
        throw err;
      });
  }
}
