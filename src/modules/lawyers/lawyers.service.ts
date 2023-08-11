import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BidEntity, BidStatus } from 'src/entities/bid.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LawyersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(BidEntity)
    private bidRepository: Repository<BidEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async checkBidBeforePatch(bid_id: number) {
    const bid = await this.bidRepository.findOne({ where: { id: bid_id } });
    if (bid.status !== BidStatus.CREATED)
      throw new HttpException(
        'Apenas ofertas iniciais podem ser editadas',
        HttpStatus.BAD_REQUEST,
      );
  }
}
