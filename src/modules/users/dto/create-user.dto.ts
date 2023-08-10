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
  @MinLength(3, { message: 'Nome precisa ter no mínimo 3 caracteres' })
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  @Validate(PhoneValidator)
  phone: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @Validate(DocumentValidator)
  @IsNumberString()
  document: string;

  @ValidateIf((o) => o.role === UserRole.COMPANY)
  @IsInt()
  activity_id?: number;
}
