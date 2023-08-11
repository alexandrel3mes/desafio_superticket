import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty({
    example: 'Comércio',
    description: 'Nome do ramo de atividades',
  })
  @IsString()
  name: string;
}
