import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTConfigEnum } from 'src/configs/jwt.config';
import { JwtPayload } from '../contracts.auth';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(JWTConfigEnum.ACCESSTOKENSECRET),
    });
  }

  async validate({ userId, login, roles }: JwtPayload) {
    return { userId, login, roles };
  }
}
