import { Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { ReqUser } from 'src/types/req.user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { BidEntity, BidStatus } from 'src/entities/bid.entity';
import { OrderEntity } from 'src/entities/order.entity';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(BidEntity)
    private bidRepository: Repository<BidEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async create(createBidDto: CreateBidDto, reqUser: ReqUser) {
    const user = await this.userRepository.findOneBy({ id: reqUser.user });
    const order = await this.orderRepository.findOneBy({
      id: createBidDto.order_id,
    });

    const bid = new BidEntity();
    bid.order = order;
    bid.lawyer = user;
    bid.value = createBidDto.value;
    bid.status = BidStatus.CREATED;

    return this.bidRepository.save(bid);
  }

  findAll() {
    return this.bidRepository.find();
  }

  findOne(id: number) {
    return this.bidRepository.findOneBy({ id });
  }

  async update(id: number, updateBidDto: UpdateBidDto) {
    await this.bidRepository.update(id, updateBidDto);
    return this.findOne(id);
  }
}