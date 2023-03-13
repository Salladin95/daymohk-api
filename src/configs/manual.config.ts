import { registerAs } from '@nestjs/config';

export type ManualConfigOptions = { port: number; baseURL: string };
export enum ManualConfigEnum {
  PORT = 'manual.port',
  BASER_URL = 'manual.baseURL',
}

export default registerAs(
  'manual',
  (): ManualConfigOptions => ({
    port: parseInt(process.env.PORT, 10) || 4000,
    baseURL: process.env.BASE_URL || 'http://localhost:4000',
  }),
);
