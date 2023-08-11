import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Motivos pessoais',
    description: 'Descrição da ordem de serviço',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Descrição deve ter no mínimo 3 caracteres' })
  description: string;
}
