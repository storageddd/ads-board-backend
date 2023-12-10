import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'Must be string',
  })
  @MinLength(3, {
    message: 'Min length is 3 symbols',
  })
  @MaxLength(50, {
    message: 'Max length 50 is symbols',
  })
  @ApiProperty()
  username: string;

  @IsString({
    message: 'Must be string',
  })
  @MinLength(8, {
    message: 'Min length is 8 symbols',
  })
  @MaxLength(50, {
    message: 'Max length 50 is symbols',
  })
  @ApiProperty()
  password: string;

  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsEmail()
  @ApiProperty()
  email: string;
}
