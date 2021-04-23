import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/entities/Users';
import { LoginDto } from '../users/dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<Users | undefined> {
    const user = await this.usersService.retrieveByName(loginDto.name);
    if (user && user.pwd === loginDto.pwd) {
      return user;
    }
    return;
  }
  async validateLocal(username: string, _): Promise<any | undefined> {
    const user: Users = Users.fromObject(
      await this.usersService.retrieveByName(username),
    );

    if (user && user.name) {
      return user;
    }
    return null;
  }

  async createToken(user: Users) {
    const payload = { username: user.name, sub: user.id }; // 使用 sub 属性名保持 id 和 标准一致
    try {
      const token = this.jwtService.sign(payload);
      return {
        token,
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        msg: `账号或密码错误`,
      };
    }
  }
}
