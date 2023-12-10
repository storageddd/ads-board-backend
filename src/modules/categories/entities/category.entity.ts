import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;
}
