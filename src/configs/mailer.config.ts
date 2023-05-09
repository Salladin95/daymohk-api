import { registerAs } from '@nestjs/config';

export type MailerConfigOptions = {
  admin: string;
  password: string;
  from: string;
  to: string;
};

export enum MailerConfigEnum {
  ADMIN = 'mailer.admin',
  PASSWORD = 'mailer.password',
  FROM = 'mailer.from',
  TO = 'mailer.to',
}

export default registerAs(
  'mailer',
  (): MailerConfigOptions => ({
    admin: process.env.MAILER_ADMIN,
    password: process.env.MAILER_ADMIN_PASSWORD,
    from: process.env.MAILER_FROM,
    to: process.env.MAILER_TO,
  }),
);
