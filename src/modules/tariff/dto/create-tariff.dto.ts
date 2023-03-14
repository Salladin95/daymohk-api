import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TariffType } from '../entities/tariff.entity';

const TypesOfTariff = ['WIRED', 'WIRELESS'];
export class CreateTariffDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsIn(TypesOfTariff)
  type: TariffType;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  speed: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cost: number;
}
