import { ApiProperty } from '@nestjs/swagger';

export class ActivityResponse {
  @ApiProperty({
    example: 1,
    description: 'Id do ramo de atividades',
  })
  id: number;

  @ApiProperty({
    example: 'Comércio',
    description: 'Nome do ramo de atividades',
  })
  name: string;
}
