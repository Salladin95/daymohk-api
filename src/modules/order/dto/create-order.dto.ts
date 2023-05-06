import { Transform } from '@nestjs/class-transformer';
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
import { IsDateString } from 'class-validator';

export type Gender = 'man' | 'woman';
const gender = ['man', 'woman'];

export type OrderStatus = 'active' | 'archived' | 'canceled';
const orderStatus = ['active', 'archive'];

export class CreateOrderDto {
  @ApiProperty()
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  birthday: Date;

  @ApiProperty()
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  passportDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

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
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  addressRegistration: string;

  @ApiProperty()
  @IsNumberString()
  @Length(4)
  passportSeries: string;

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

  constructor(partial: Partial<CreateOrderDto>) {
    Object.assign(this, partial);
  }
}
