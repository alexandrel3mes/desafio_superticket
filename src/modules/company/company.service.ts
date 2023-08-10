import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BidEntity, BidStatus } from 'src/entities/bid.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ReqUser } from 'src/types/req.user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(BidEntity)
    private bidRepository: Repository<BidEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async checkBidBeforePatch(reqUser: ReqUser, bid_id: number) {
    const bid = await this.bidRepository.findOneOrFail({
      where: { id: bid_id },
    });

    if (bid.order.company.id !== reqUser.user) {
      throw new HttpException(
        'Só é possível aceitar ou negar ofertas de suas próprias ordens de serviço',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (bid.status !== BidStatus.CREATED) {
      throw new HttpException(
        'Só é possível aceitar ou negar ofertas iniciais',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
