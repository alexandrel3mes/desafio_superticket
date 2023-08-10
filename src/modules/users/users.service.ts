import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ReqUser } from 'src/types/req.user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  findAll() {
    return `This action returns all users`;
  }

  findOne(reqUser: ReqUser) {
    return this.userRepository.findOne({
      where: { id: reqUser.user },
      relations: {
        activity: true,
        companyOrders: true,
        lawyerOrders: true,
        bids: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
