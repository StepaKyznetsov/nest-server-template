import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create.user.dto';
import { User } from '../utils/sequelize';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) throw new HttpException('This email is already registered', HttpStatus.BAD_REQUEST);
    const hashPassword = await bcrypt.hash(userDto.password, 3);
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword });
    return this.generateToken(user)
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) return user
    throw new HttpException('Some problems with data', HttpStatus.BAD_REQUEST);
  }


}
