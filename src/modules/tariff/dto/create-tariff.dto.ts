import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export type TariffType = 'wired' | 'wireLess';
const TypesOfTariff = ['wired', 'wireLess'];
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
