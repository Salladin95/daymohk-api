import { Module } from '@nestjs/common';

import { PrismaService } from '~/prisma';
import { AuthModule } from '~/modules/auth';
import { MailModule } from '~/modules/mail';
import { TariffModule } from '~/modules/tariff';
import { DistrictModule } from '~/modules/district';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [TariffModule, DistrictModule, AuthModule, MailModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule {}
