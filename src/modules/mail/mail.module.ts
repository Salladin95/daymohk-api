import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerConfigEnum } from 'src/configs/mailer.config';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: configService.get(MailerConfigEnum.ADMIN),
            pass: configService.get(MailerConfigEnum.PASSWORD),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MailModule { }
