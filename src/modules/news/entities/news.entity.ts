import { Transform } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class NewsEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  backgroundImage: string;

  @ApiProperty()
  authorId?: string;

  @ApiProperty({ example: 1231245 })
  @Transform(({ value }) => +new Date(value))
  createdAt: Date;

  @ApiProperty({ example: 1112313 })
  @Transform(({ value }) => +new Date(value))
  updatedAt: Date;

  constructor(partial: Partial<NewsEntity>) {
    Object.assign(this, partial);
  }
}

export { NewsEntity };
