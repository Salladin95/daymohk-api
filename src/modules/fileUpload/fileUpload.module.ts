import multer from 'multer';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { PrismaService } from '~/prisma';
import { AuthModule } from '~/modules/auth';
import { NewsModule } from '~/modules/news';
import { ImageKitModule } from '~/modules/imageKit';

import { FileUploadService } from './fileUpload.service';
import { FileUploadController } from './fileUpload.controller';

@Module({
  controllers: [FileUploadController],
  imports: [
    AuthModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: multer.memoryStorage(),
      }),
    }),
    ImageKitModule,
    NewsModule,
  ],
  providers: [PrismaService, FileUploadService],
})
export class FileUploadModule {}
