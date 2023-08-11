import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({
    example: 'Motivos pessoais',
    description: 'Descrição da ordem de serviço',
  })
  @IsString()
  @MinLength(3)
  description?: string;
}
