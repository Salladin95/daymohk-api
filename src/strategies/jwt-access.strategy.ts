import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { JWTConfigEnum } from '~/configs';
import { JwtPayload } from '~/contracts';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(JWTConfigEnum.ACCESS_TOKEN_SECRET),
    });
  }

  async validate({ userId, login, roles }: JwtPayload) {
    console.log('Validating access token:', { userId, login, roles });
    return { userId, login, roles };
  }
}
