import { ConfigService } from '@nestjs/config';
import ImageKit from 'imagekit';
import { ImageKitConfigEnum } from '../../configs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageKitProvider {
  imageKit: ImageKit;

  constructor(private readonly configService: ConfigService) {
    this.imageKit = new ImageKit({
      publicKey: configService.get(ImageKitConfigEnum.PUBLIC_KEY),
      privateKey: configService.get(ImageKitConfigEnum.PRIVATE_KEY),
      urlEndpoint: configService.get(ImageKitConfigEnum.URL),
    });
  }

  async uploadImage(file: Express.Multer.File) {
    const upload = this.imageKit.upload(
      {
        file: file.path,
        fileName: file.filename,
      },
      (err: Error, res: unknown) => {
        if (err) {
          console.error(err.message);
        }
        console.log(res);
      },
    );
    console.log(upload);
  }
}
