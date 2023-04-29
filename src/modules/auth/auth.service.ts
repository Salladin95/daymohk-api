import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import {
  invalidTokenMsg,
  passwordsDontMatchMsg,
  userNotExist,
} from 'src/utils/messages';
import { checkPassword } from 'src/utils/bcrypt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './contracts.auth';
import { RefreshDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login({ login, password }: LoginDto) {
    const user = await this.userService.findOneByLogin(login);

    if (!user) {
      throw new ForbiddenException(userNotExist);
    }

    const passwordMatch = await checkPassword(password, user.password);

    if (!passwordMatch) {
      throw new ForbiddenException(passwordsDontMatchMsg);
    }

    const tokens = await this.getTokens({
      userId: user.id,
      login: user.login,
      roles: user.roles,
    });
    return tokens;
  }

  async refresh({ refreshToken }: RefreshDto) {
    try {
      const { login, userId, roles } = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.config.get('jwt.refreshTokenSecret'),
          ignoreExpiration: false,
        },
      );
      const tokens = await this.getTokens({ userId, login, roles });
      return tokens;
    } catch {
      throw new ForbiddenException(invalidTokenMsg);
    }
  }

  async getTokens(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get('jwt.accessTokenSecret'),
      expiresIn: this.config.get('jwt.accessTokenExpiresIn'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get('jwt.refreshTokenSecret'),
      expiresIn: this.config.get('jwt.refreshTokenExpiresIn'),
    });
    return { accessToken, refreshToken };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }
}
