import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ManualConfigEnum } from '../../configs/manual.config';
import { FileUploadController } from './fileUpload.controller';
import { AuthModule } from '../auth/auth.module';
import { FileUploadService } from './fileUpload.service';
import { ImageKitModule } from '../imageKit/imageKit.module';

@Module({
  controllers: [FileUploadController],
  imports: [
    AuthModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>(ManualConfigEnum.MULTER_DEST),
      }),
      inject: [ConfigService],
    }),
    ImageKitModule,
  ],
  providers: [FileUploadService],
})
export class FileUploadModule {}
