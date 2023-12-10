import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;
}
