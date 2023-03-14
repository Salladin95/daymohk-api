import { ApiProperty } from '@nestjs/swagger';
export type TariffType = 'WIRED' | 'WIRELESS';

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
