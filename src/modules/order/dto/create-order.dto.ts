import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsIn,
  IsOptional,
  Length,
  IsNumberString,
} from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type Gender = 'man' | 'woman';
const gender = ['man', 'woman'];

export type OrderStatus = 'active' | 'archive';
const orderStatus = ['active', 'archive'];

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  familyName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  personalName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsIn(gender)
  gender: Gender;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsIn(orderStatus)
  status: OrderStatus;

  @ApiProperty()
  @IsString()
  birthday: string;

  @ApiProperty()
  @IsString()
  passportDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  addressRegistration: string;

  @ApiProperty()
  @IsNumberString()
  @Length(4)
  passportSereies: string;

  @ApiProperty()
  @IsNumberString()
  @Length(6)
  passportNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  passportBranch: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  passportMainPagePhoto: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  passportRegistrationPhoto: string;

  @ApiProperty()
  @IsUUID()
  tariffId: string;

  @ApiProperty()
  @IsUUID()
  districtId: string;
}
