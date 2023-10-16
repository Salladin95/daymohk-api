import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';

@Injectable()
export class FileUploadService {
  // constructor(private readonly imageKitService: ImageKit) {}

  async uploadFile(file: Express.Multer.File, id: string) {
    console.log('FILE UPLOAD SERVICE');
    // console.log(this.imageKitService);
  }
}
