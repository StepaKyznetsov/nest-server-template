import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create.user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../users/dtos/user.dto';
import { User } from '../utils/sequelize';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async login(createUserDto: CreateUserDto): Promise<object> {
    const user = await this.validateUser(createUserDto);
    return this.generateToken(user);
  };

  async registration(createUserDto: CreateUserDto): Promise<object> {
    const candidate = await this.usersService.getUserByEmail(createUserDto.email);
    if (candidate) throw new HttpException('This email is already registered', HttpStatus.BAD_REQUEST);
    const user = await this.usersService.createUser(createUserDto);
    return await this.generateToken(user);
  };

  async generateToken({ email, id }: UserDto): Promise<object> {
    const payload = { email, id };
    return {
      payload,
      token: this.jwtService.sign(payload)
    };
  };

  async validateUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(createUserDto.email);
    const passwordEquals = await bcrypt.compare(createUserDto.password, user.password);
    if (user && passwordEquals) return user;
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  };
}
