import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtAccessStrategy, JwtRefreshStrategy } from '../../strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule,
    ConfigModule,
  ],
  exports: [AuthService, JwtAccessStrategy, JwtAccessStrategy, JwtModule],
})
export class AuthModule { }
