import { ApiProperty } from '@nestjs/swagger';
import { type UserRole } from '@prisma/client';

export class AuthorizedEntity {
  @ApiProperty()
  readonly sub: number;

  @ApiProperty()
  readonly username: number;

  @ApiProperty()
  readonly role: UserRole;

  @ApiProperty()
  readonly access_token: string;
}
