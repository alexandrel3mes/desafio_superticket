import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BidEntity, BidStatus } from 'src/entities/bid.entity';
import { OrderEntity, OrderStatus } from 'src/entities/order.entity';
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

  async checkOrderBeforePatch(
    reqUser: ReqUser,
    order_id: number,
    finish = null,
    patch = null,
  ) {
    const order = await this.orderRepository.findOneOrFail({
      where: { id: order_id },
      relations: {
        company: true,
      },
    });

    if (order.company.id !== reqUser.user) {
      throw new HttpException(
        'Só é possível editar suas próprias ordens de serviço',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (patch) await this.checkOrder(order);
    if (finish) await this.checkOrderBeforeFinish(order);
  }

  async checkOrder(order: OrderEntity) {
    if (order.status !== OrderStatus.CREATED) {
      throw new HttpException(
        'Só é possível editar ordens com status inicial',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async checkOrderBeforeFinish(order: OrderEntity) {
    if (order.status !== OrderStatus.IN_PROGRESS) {
      throw new HttpException(
        'Só é possível finalizar ordens com status em progresso',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async checkBidBeforePatch(reqUser: ReqUser, bid_id: number) {
    const bid = await this.bidRepository.findOneOrFail({
      where: { id: bid_id },
      relations: {
        order: { company: true },
      },
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
