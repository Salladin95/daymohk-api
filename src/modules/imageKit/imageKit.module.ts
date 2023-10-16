import { Module } from '@nestjs/common';
import { ImageKitProvider } from './imageKit.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ImageKitProvider, ConfigService],
  exports: [ImageKitProvider],
})
export class ImageKitModule {}
