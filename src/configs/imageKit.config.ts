import { registerAs } from '@nestjs/config';

export type imageKitOptions = {
  publicKey: string;
  privateKey: string;
  url: string;
};

export enum ImageKitConfigEnum {
  PUBLIC_KEY = 'imageKit.publicKey',
  PRIVATE_KEY = 'imageKit.privateKey',
  URL = 'imageKit.url',
}

export default registerAs(
  'imageKit',
  (): imageKitOptions => ({
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    publicKey: process.env.IMAGE_KIT_PUB_KEY,
    url: process.env.IMAGE_KIT_URL,
  }),
);
