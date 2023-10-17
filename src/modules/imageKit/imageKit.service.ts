import { BadRequestException, Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';
import { ConfigService } from '@nestjs/config';
import { ImageKitConfigEnum } from '../../configs';
import { retrieveFileExtension } from './utils';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ImageKitService {
  private imageKit: ImageKit;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.imageKit = new ImageKit({
      publicKey: configService.get(ImageKitConfigEnum.PUBLIC_KEY),
      privateKey: configService.get(ImageKitConfigEnum.PRIVATE_KEY),
      urlEndpoint: configService.get(ImageKitConfigEnum.URL),
    });
  }

  async uploadFile(file: Express.Multer.File, id: string) {
    const fileName = `${id}.${retrieveFileExtension(file.originalname)}`;
    try {
      const { $ResponseMetadata, ...rest } = await this.imageKit.upload({
        file: file.buffer,
        fileName,
      });
      return rest;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async removeFile(fileId: string) {
    await this.imageKit.deleteFile(fileId);
    await this.prisma.imageKitFile.delete({
      where: { fileId },
    });
  }
}
