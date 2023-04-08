import { Module } from '@nestjs/common';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TariffModule } from '../tariff/tariff.module';
import { DistrictModule } from '../district/district.module';

@Module({
  imports: [TariffModule, DistrictModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule { }
