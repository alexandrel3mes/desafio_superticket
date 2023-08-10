import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumberString,
  IsString,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import { UserRole } from 'src/entities/user.entity';
import { DocumentValidator } from 'src/validators/document.validator';
import { PhoneValidator } from 'src/validators/phone.validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Fulano de Tal',
    description: 'Nome do usuário',
  })
  @MinLength(3, { message: 'Nome precisa ter no mínimo 3 caracteres' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'admin@email.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '27998547586',
    description: 'Telefone do usuário',
  })
  @IsNumberString()
  @Validate(PhoneValidator)
  phone: string;

  @ApiProperty({
    example: 'senhaMtoBoa',
    description: 'Senha do usuário',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: UserRole.ADMIN,
    description: 'role do usuário',
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    example: '0485556955',
    description: 'CPF ou CNPJ do usuário',
  })
  @Validate(DocumentValidator)
  @IsNumberString()
  document: string;

  @ApiProperty({
    example: 1,
    description: 'Id do ramo de atividades (caso seja empresa)',
  })
  @ValidateIf((o) => o.role === UserRole.COMPANY)
  @IsInt()
  activity_id?: number;
}
