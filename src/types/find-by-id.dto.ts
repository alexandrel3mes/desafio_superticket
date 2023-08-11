import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class FindByIdDto {
  @ApiProperty({
    example: '1',
    description: 'Id procurado',
  })
  @IsNumberString()
  id: number;
}
