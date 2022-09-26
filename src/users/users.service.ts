import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from '../utils/sequelize';
import { UserDto } from './dtos/user.dto';
import { toUserDto } from './helpers/toUserDto';


@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { email, password } = createUserDto;
    const isAlreadyExist = await this.userRepository.findOne({ where: { email } });
    if (isAlreadyExist)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    const user = await this.userRepository.create({ email, password });
    return toUserDto(user);
  };

  async getAllUsers(): Promise<UserDto[]> {
    const users =  await this.userRepository.findAll({ include: { all: true } });
    return users.map(u => toUserDto(u));
  };

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  };

  async updateUserData(email: string, password: string): Promise<any> {
    return await this.userRepository.update({ email, password }, { where: { email } });
  };

  async deleteUser(email: string): Promise<string> {
    await this.userRepository.destroy({where: { email } });
    return 'User was deleted!'
  };
}
