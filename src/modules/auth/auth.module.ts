import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from '~/modules/user';
import { JwtAccessStrategy, JwtRefreshStrategy } from '~/strategies';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

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
export class AuthModule {}
