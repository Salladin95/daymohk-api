import { IsNotEmpty, IsString } from 'class-validator';

export class AccessDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class RefreshDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
