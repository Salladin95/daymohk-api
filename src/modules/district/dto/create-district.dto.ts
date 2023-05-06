import { IsNotEmpty, IsNumberString, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDistrictDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  code: string;
}
