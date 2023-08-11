import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidEntity } from 'src/entities/bid.entity';
import { UserEntity } from 'src/entities/user.entity';
import { OrderEntity } from 'src/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BidEntity, UserEntity, OrderEntity])],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
