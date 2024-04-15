import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ example: '1', description: 'page number' })
  readonly page: number;

  @ApiProperty({ example: '10', description: 'Number of items per page' })
  readonly limit: number;
}
