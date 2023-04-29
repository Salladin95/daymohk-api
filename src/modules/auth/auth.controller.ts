import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/auth.dto';
import { JwtRefreshAuthGuard } from '../../guards/';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @UsePipes(ValidationPipe)
  async refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto);
  }
}
