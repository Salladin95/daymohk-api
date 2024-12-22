import { registerAs } from '@nestjs/config';

export type PostgresConfigOptions = {
  user: string;
  login: string;
  password: string;
  db: string;
  port: number;
  host: string;
  url: string;
};

export enum PostgresConfigEnum {
  PORT = 'postgres.port',
  URL = 'postgres.baseURL',
  DB = 'postgres.db',
  PASSWORD = 'postgres.password',
  LOGIN = 'postgres.login',
  USER = 'postgres.user',
}

export const postgresConfig = registerAs(
  'postgres',
  (): PostgresConfigOptions => ({
    port: parseInt(process.env.POSTGRES_PORT, 10),
    url: process.env.POSTGRES_URL,
    host: process.env.POSTGRES_HOST,
    db: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    login: process.env.POSTGRES_LOGIN,
    user: process.env.POSTGRES_USER,
  }),
);
