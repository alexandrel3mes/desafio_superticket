import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { OrdersService } from '../orders/orders.service';
import { UserEntity } from 'src/entities/user.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidEntity } from 'src/entities/bid.entity';
import { BidsService } from '../bids/bids.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity, BidEntity])],
  controllers: [CompanyController],
  providers: [CompanyService, OrdersService, BidsService],
})
export class CompanyModule {}
