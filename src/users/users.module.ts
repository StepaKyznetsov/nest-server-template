import { Module } from '@nestjs/common';
import { User } from '../utils/sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UsersService]
})

export class UsersModule {}
