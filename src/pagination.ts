import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ example: 1, description: 'page number' })
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  @IsNumber()
  @Type(() => Number)
  limit: number;
}
