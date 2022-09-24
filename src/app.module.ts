import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './utils/sequelize';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DBNAME,
      models: [User],
      autoLoadModels: true,
    }),
    UsersModule
  ],
  controllers: [],
  providers: [
    UsersService,
    AuthService
  ],
})
export class AppModule {}
