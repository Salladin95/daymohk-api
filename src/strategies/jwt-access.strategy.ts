import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTConfigEnum } from 'src/configs/jwt.config';
import { JwtPayload } from 'src/modules/auth/contracts.auth';

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
    return { userId, login, roles };
  }
}
