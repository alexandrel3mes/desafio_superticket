import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin@email.com',
    description: 'Email do usuário',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'senhaMtoBoaMesmo',
    description: 'Senha do usuário',
  })
  @IsString()
  password: string;
}
