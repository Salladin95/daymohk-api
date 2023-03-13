import jwtConfig, { JwtConfigOptions } from './jwt.config';
import manualConfig, { ManualConfigOptions } from './manual.config';
import postgressConfig, { PostgresConfigOptions } from './postgress.config';

enum ConfigEnum {
  MANUAL = 'manual',
  JWT = 'jwt',
  POSTGRESS = 'postgress',
}

export {
  postgressConfig,
  PostgresConfigOptions,
  manualConfig,
  jwtConfig,
  JwtConfigOptions,
  ConfigEnum,
  ManualConfigOptions,
};
