import jwtConfig, { JwtConfigOptions } from './jwt.config';
import manualConfig, { ManualConfigOptions } from './manual.config';
import postgressConfig, { PostgresConfigOptions } from './postgress.config';
import mailerConfig, { MailerConfigOptions } from './mailer.config';

enum ConfigEnum {
  MANUAL = 'manual',
  JWT = 'jwt',
  POSTGRESS = 'postgress',
  MAILER = 'mailer',
}

export {
  ConfigEnum,
  jwtConfig,
  JwtConfigOptions,
  mailerConfig,
  MailerConfigOptions,
  manualConfig,
  ManualConfigOptions,
  PostgresConfigOptions,
  postgressConfig,
};
