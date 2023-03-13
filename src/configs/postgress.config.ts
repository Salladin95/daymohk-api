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
export enum PostgressConfigEnum {
  PORT = 'postgress.port',
  URL = 'postgress.baseURL',
  DB = 'postgress.db',
  PASSWORD = 'postgress.password',
  LOGIN = 'postgress.login',
  USER = 'postgress.user',
}

export default registerAs(
  'postgress',
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
