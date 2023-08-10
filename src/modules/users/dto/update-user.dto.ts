import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(3, { message: 'Nome precisa ter no mínimo 3 caracteres' })
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  password: string;
}
