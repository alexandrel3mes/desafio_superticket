import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/entities/user.entity';
import { ActivityResponse } from 'src/modules/activities/api-response/activity.response';
import { BidResponse } from 'src/modules/bids/api-response/get-bid.response';
import { GetOrdersReponse } from 'src/modules/orders/api-response/get-orders.response.dto';

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
    enum: UserRole,
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
    type: GetOrdersReponse,
    isArray: true,
    description: 'Ordens de serviço do usuário como empresa',
  })
  companyOrders: GetOrdersReponse[];

  @ApiProperty({
    type: GetOrdersReponse,
    isArray: true,
    description: 'Ordens de serviço do usuário como advogado',
  })
  lawyerOrders: GetOrdersReponse[];

  @ApiProperty({
    type: BidResponse,
    isArray: true,
    description: 'Lances em ordens de serviço do usuário como advogado',
  })
  bids: BidResponse[];
}
