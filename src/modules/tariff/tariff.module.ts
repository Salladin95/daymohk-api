import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { TariffController } from './tariff.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [TariffController],
  providers: [TariffService, PrismaService],
})
export class TariffModule { }
