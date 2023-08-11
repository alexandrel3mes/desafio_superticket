import { ApiProperty } from '@nestjs/swagger';
import { BidStatus } from 'src/entities/bid.entity';
import { OrderStatus } from 'src/entities/order.entity';
import { UserRole } from 'src/entities/user.entity';
import { ActivityResponse } from 'src/modules/auth/api-response/register.response';

export class OrderResponse {
  @ApiProperty({
    example: 1,
    description: 'Id da ordem de serviço',
  })
  id: number;

  @ApiProperty({
    example: 'Motivos pessoais',
    description: 'Descrição da ordem de serviço',
  })
  description: number;

  @ApiProperty({
    example: OrderStatus.CREATED,
    description: 'Status da ordem de serviço',
  })
  status: OrderStatus;

  @ApiProperty({
    example: 10000,
    description: 'Valor do pagamento da ordem de serviço (salvo em centavos)',
  })
  value: number;
}

export class BidResponse {
  @ApiProperty({
    example: 1,
    description: 'Id da ordem de serviço',
  })
  id: number;

  @ApiProperty({
    example: BidStatus.CREATED,
    description: 'Status da ordem de serviço',
  })
  status: BidStatus;

  @ApiProperty({
    example: 10000,
    description: 'Valor da oferta da ordem de serviço (salvo em centavos)',
  })
  value: number;
}

export class MeResponse {
  @ApiProperty({
    example: 1,
    description: 'Id do usuário',
  })
  id: number;

  @ApiProperty({
    example: 'Fulano de Tal',
    description: 'Nome do usuário',
  })
  name: string;

  @ApiProperty({
    example: '27998547586',
    description: 'Telefone do usuário',
  })
  phone: string;

  @ApiProperty({
    example: '$2b$10$.zDTCnMGueSknNeOU0ryFu8Rts/CPTUMnKI/EH725FSN8McxWaAsW',
    description: 'Senha em hash do usuário',
  })
  password: string;

  @ApiProperty({
    example: UserRole.ADMIN,
    description: 'role do usuário',
  })
  role: UserRole;

  @ApiProperty({
    example: '92820982069',
    description: 'CPF ou CNPJ do usuário',
  })
  document: string;

  @ApiProperty({
    example: ActivityResponse,
    isArray: true,
    description: 'Ramo de atividades (caso seja empresa)',
  })
  activity: ActivityResponse;

  @ApiProperty({
    type: OrderResponse,
    isArray: true,
    description: 'Ordens de serviço do usuário como empresa',
  })
  companyOrders: OrderResponse[];

  @ApiProperty({
    type: OrderResponse,
    isArray: true,
    description: 'Ordens de serviço do usuário como advogado',
  })
  lawyerOrders: OrderResponse[];

  @ApiProperty({
    type: BidResponse,
    isArray: true,
    description: 'Lances em ordens de serviço do usuário como advogado',
  })
  bids: BidResponse[];
}
