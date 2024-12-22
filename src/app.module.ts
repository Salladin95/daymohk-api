import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import {
  imageKitConfig,
  jwtConfig,
  mailerConfig,
  manualConfig,
  postgresConfig,
} from './configs';

import { AuthModule } from '~/modules/auth';
import { NewsModule } from '~/modules/news';
import { UserModule } from '~/modules/user';
import { MailModule } from '~/modules/mail';
import { ManualConfigEnum } from '~/configs';
import { OrderModule } from '~/modules/order';
import { TariffModule } from '~/modules/tariff';
import { LoggerMiddleware } from '~/middlewares';
import { DistrictModule } from '~/modules/district';
import { FileUploadModule } from '~/modules/fileUpload';

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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
