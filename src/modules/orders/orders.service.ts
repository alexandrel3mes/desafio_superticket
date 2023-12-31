import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { OrderEntity, OrderStatus } from 'src/entities/order.entity';
import { ReqUser } from 'src/types/req.user.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async create(createOrderDto: CreateOrderDto, reqUser: ReqUser) {
    const user = await this.userRepository.findOneBy({ id: reqUser.user });
    const order = new OrderEntity();

    order.company = user;
    order.description = createOrderDto.description;
    order.status = OrderStatus.CREATED;

    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findYours(reqUser: ReqUser) {
    return reqUser.role === UserRole.COMPANY
      ? this.orderRepository.find({ where: { company: { id: reqUser.user } } })
      : this.orderRepository.find({ where: { lawyer: { id: reqUser.user } } });
  }

  async findOne(id: number) {
    return this.orderRepository.findOneOrFail({
      where: { id },
      relations: {
        lawyer: true,
        company: true,
        bids: true,
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    if (Object.keys(updateOrderDto).length === 0) {
      return true;
    }

    await this.orderRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }
}
