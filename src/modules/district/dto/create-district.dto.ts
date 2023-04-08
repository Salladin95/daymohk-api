import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDistrictDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  district: string;
}
