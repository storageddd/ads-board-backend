import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
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
}
