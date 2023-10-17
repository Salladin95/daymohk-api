import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImageKitService } from './imageKit.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [ConfigModule],
  providers: [ImageKitService, ConfigService, PrismaService],
  exports: [ImageKitService],
})
export class ImageKitModule {}
