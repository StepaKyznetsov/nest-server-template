import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create.user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../utils/sequelize';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService) {}

  async validateUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(createUserDto.email);
    const passwordEquals = await bcrypt.compare(createUserDto.password, user.password);
    if (user && passwordEquals) return user;
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  };
}
