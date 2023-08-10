import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Controller('')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.usersService.signup(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.usersService.validateUser(signInDto.email, signInDto.password);
  }
}
