import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './utils/local.strategy';
import { SessionSerializer } from './utils/session.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    SessionSerializer,
    AuthService,
  ],
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
  ],
  exports: [AuthService]
})
export class AuthModule {}
