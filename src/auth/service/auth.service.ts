import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(user: CreateUserDto): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return await this.userRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const foundUser = await this.userRepository.findOneBy({ email });
    if (foundUser) {
      if (bcrypt.compareSync(password, foundUser.password)) {
        return {
          email: foundUser.email,
          id: foundUser.id,
          role: foundUser.role,
        };
      }

      throw new UnauthorizedException();
    }
    throw new UnauthorizedException();
  }
}
