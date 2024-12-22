import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from '~/prisma';
import { AuthModule } from '~/modules/auth';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [forwardRef(() => AuthModule), ConfigModule],
  exports: [UserService],
})
export class UserModule {}
