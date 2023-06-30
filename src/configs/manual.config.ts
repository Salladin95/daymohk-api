import { registerAs } from '@nestjs/config';

export type ManualConfigOptions = {
  port: number;
  baseURL: string;
  throttleTtl: string;
  throttleLimit: string;
};

export enum ManualConfigEnum {
  PORT = 'manual.port',
  BASER_URL = 'manual.baseURL',
  THROTTLE_TTL = 'manual.throttleTtl',
  THROTTLE_LIMIT = 'manual.throttleLimit',
}

export default registerAs(
  'manual',
  (): ManualConfigOptions => ({
    port: parseInt(process.env.PORT, 10) || 4000,
    baseURL: process.env.BASE_URL || 'http://localhost:4000',
    throttleTtl: process.env.THROTTLE_TTL,
    throttleLimit: process.env.THROTTLE_LIMIT,
  }),
);
