import { IsString, IsNumber, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdvertisementDto {
  @IsString({
    message: 'Must be string',
  })
  @MinLength(3, {
    message: 'Min length is 3 symbols',
  })
  @MaxLength(120, {
    message: 'Max length 50 is symbols',
  })
  @ApiProperty()
  title: string;

  @IsString({
    message: 'Must be string',
  })
  @MinLength(3, {
    message: 'Min length is 3 symbols',
  })
  @MaxLength(2000, {
    message: 'Max length 2000 is symbols',
  })
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  categoryId: number;
}
