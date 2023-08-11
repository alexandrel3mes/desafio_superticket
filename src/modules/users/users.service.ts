import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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

  async update(reqUser: ReqUser, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(updateUserDto.password, salt);
      updateUserDto.password = hash;
    }

    if (Object.keys(updateUserDto).length === 0) return true;

    await this.userRepository.update({ id: reqUser.user }, updateUserDto);
    return this.findOne(reqUser);
  }
}
