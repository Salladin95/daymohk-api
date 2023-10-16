import jwtConfig, { JwtConfigOptions } from './jwt.config';
import manualConfig, { ManualConfigOptions } from './manual.config';
import postgresConfig, { PostgresConfigOptions } from './postgress.config';
import mailerConfig, { MailerConfigOptions } from './mailer.config';
import imageKitConfig, {
  ImageKitConfigEnum,
  imageKitOptions,
} from './imageKit.config';

export {
  imageKitConfig,
  ImageKitConfigEnum,
  imageKitOptions,
  jwtConfig,
  JwtConfigOptions,
  mailerConfig,
  MailerConfigOptions,
  manualConfig,
  ManualConfigOptions,
  PostgresConfigOptions,
  postgresConfig,
};
