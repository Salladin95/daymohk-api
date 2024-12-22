import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';

import { UserRole } from '~/contracts';

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  roles: UserRole[];

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty({ example: 1 })
  version: number;

  @ApiProperty({ example: 1231245 })
  @Transform(({ value }) => +new Date(value))
  createdAt: Date;

  @ApiProperty({ example: 1112313 })
  @Transform(({ value }) => +new Date(value))
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
