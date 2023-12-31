import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/entities/user.entity';
import { ActivityResponse } from 'src/modules/activities/api-response/activity.response';

export class RegisterResponse {
  @ApiProperty({
    example: 1,
    description: 'Id do usuário criado',
  })
  id: number;

  @ApiProperty({
    example: 'Fulano de Tal',
    description: 'Nome do usuário criado',
  })
  name: string;

  @ApiProperty({
    example: '27998547586',
    description: 'Telefone do usuário criado',
  })
  phone: string;

  @ApiProperty({
    example: '$2b$10$.zDTCnMGueSknNeOU0ryFu8Rts/CPTUMnKI/EH725FSN8McxWaAsW',
    description: 'Senha em hash do usuário criado',
  })
  password: string;

  @ApiProperty({
    example: UserRole.ADMIN,
    enum: UserRole,
    description: 'role do usuário criado',
  })
  role: string;

  @ApiProperty({
    example: '92820982069',
    description: 'CPF ou CNPJ do usuário criado',
  })
  document: string;

  @ApiProperty({
    example: ActivityResponse,
    description: 'Ramo de atividades (caso seja empresa)',
  })
  activity: ActivityResponse;
}
