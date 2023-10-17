import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadController } from './fileUpload.controller';
import { AuthModule } from '../auth/auth.module';
import { ImageKitModule } from '../imageKit/imageKit.module';
import multer from 'multer';
import { NewsModule } from '../news/news.module';
import { PrismaService } from '../../prisma/prisma.service';
import { FileUploadService } from './fileUpload.service';

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
