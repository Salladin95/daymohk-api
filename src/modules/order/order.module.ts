import { Module } from '@nestjs/common';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TariffModule } from '../tariff/tariff.module';
import { DistrictModule } from '../district/district.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TariffModule, DistrictModule, AuthModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule { }
