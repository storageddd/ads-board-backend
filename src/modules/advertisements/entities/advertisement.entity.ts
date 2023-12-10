import { ApiProperty } from '@nestjs/swagger';

export class AdvertisementEntity {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly categoryId: number;

  @ApiProperty()
  readonly userId: number;
}
