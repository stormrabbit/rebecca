import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { constants } from './constants';
import { LocalStragety } from './local.strategy';

@Module({
  providers: [UsersService, AuthService, JwtStrategy, LocalStragety],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: constants.secret,
      signOptions: { expiresIn: '8h' }, // token 过期时效
    }),
    UsersModule,
  ],
  exports: [AuthService, JwtStrategy, LocalStragety],
})
export class AuthModule {}
