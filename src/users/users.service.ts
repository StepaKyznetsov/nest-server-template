import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from '../utils/sequelize';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(userDto);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll({ include: { all: true } })
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email }, include: { all: true } })
  }

}
