import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Fulano de Tal',
    description: 'Nome do usuário',
  })
  @MinLength(3, { message: 'Nome precisa ter no mínimo 3 caracteres' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: '$2b$10$.zDTCnMGueSknNeOU0ryFu8Rts/CPTUMnKI/EH725FSN8McxWaAsW',
    description: 'Senha em hash do usuário',
  })
  @IsString()
  @IsOptional()
  password: string;
}
