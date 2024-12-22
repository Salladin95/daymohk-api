import { Injectable } from '@nestjs/common';

import { NewsService } from '~/modules/news';
import { ImageKitService } from '~/modules/imageKit';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly imageKitService: ImageKitService,
    private readonly newsService: NewsService,
    private readonly prisma: PrismaService,
  ) {}

  async uploadNewsFile(file: Express.Multer.File, id: string) {
    await this.newsService.findOne(id);
    const { url, fileId } = await this.imageKitService.uploadFile(file, id);
    return this.prisma.imageKitFile.create({
      data: { url, fileId, newsId: id },
    });
  }

  async updateNewsFile(file: Express.Multer.File, id: string) {
    const news = await this.newsService.findOne(id);
    await this.imageKitService.removeFile(news.backgroundImage.fileId);
    return this.uploadNewsFile(file, id);
  }
}
