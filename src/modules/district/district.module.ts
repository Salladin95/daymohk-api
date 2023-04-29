import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [DistrictController],
  providers: [DistrictService, PrismaService],
  exports: [DistrictService],
  imports: [AuthModule],
})
export class DistrictModule {}
