import { ApiProperty } from '@nestjs/swagger';

export class District {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  code: string;
}
