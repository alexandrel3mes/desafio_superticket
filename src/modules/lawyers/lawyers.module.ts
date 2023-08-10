import { Module } from '@nestjs/common';
import { LawyersService } from './lawyers.service';
import { LawyersController } from './lawyers.controller';
import { BidsService } from '../bids/bids.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidEntity } from 'src/entities/bid.entity';
import { UserEntity } from 'src/entities/user.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { OrdersService } from '../orders/orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([BidEntity, UserEntity, OrderEntity])],
  controllers: [LawyersController],
  providers: [LawyersService, BidsService, OrdersService],
})
export class LawyersModule {}
