import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  imageKitConfig,
  jwtConfig,
  mailerConfig,
  manualConfig,
  postgresConfig,
} from './configs';

import { DistrictModule } from './modules/district/district.module';
import { NewsModule } from './modules/news/news.module';
import { OrderModule } from './modules/order/order.module';
import { TariffModule } from './modules/tariff/tariff.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './modules/mail/mail.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ManualConfigEnum } from './configs/manual.config';
import { APP_GUARD } from '@nestjs/core';
import { FileUploadModule } from './modules/fileUpload/fileUpload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        manualConfig,
        jwtConfig,
        postgresConfig,
        mailerConfig,
        imageKitConfig,
      ],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get(ManualConfigEnum.THROTTLE_TTL),
        limit: config.get(ManualConfigEnum.THROTTLE_LIMIT),
      }),
    }),
    NewsModule,
    TariffModule,
    DistrictModule,
    OrderModule,
    AuthModule,
    UserModule,
    MailModule,
    FileUploadModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [],
})
export class AppModule {}
