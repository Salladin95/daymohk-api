import { forwardRef, Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [forwardRef(() => AuthModule), ConfigModule],
  exports: [UserService],
})
export class UserModule { }
