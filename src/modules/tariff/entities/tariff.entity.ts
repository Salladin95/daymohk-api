import { ApiProperty } from '@nestjs/swagger';
import { TariffType } from '../dto/create-tariff.dto';

export class Tariff {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: TariffType;

  @ApiProperty()
  title: string;

  @ApiProperty()
  speed: number;

  @ApiProperty()
  cost: number;
}
