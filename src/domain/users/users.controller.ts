import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/entities/Users';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update.dto';
import { UpdateUserResult } from './dto/update.result.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // 查询列表
  @Get('list')
  // @UseGuards(AuthGuard('jwt'))
  retrieveList(): Promise<Users[]> {
    return this.usersService.retrieveList();
  }

  @Get()
  retrieveById(@Query() id: number): Promise<Users> {
    return this.usersService.retrieveById(id);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createDto: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(createDto);
  }

  // 登陆
  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.authService.validateUser(loginDto);
    if (user) {
      return this.authService.createToken(user);
    }
    return {
      msg: '登陆失败',
    };
  }

  // 本地登陆策略
  @Post('loginlocal')
  @UseGuards(AuthGuard('local'))
  loginLocal(@Request() req) {
    const user = req.user;
    if (user) {
      return this.authService.createToken(user);
    }
    throw new UnauthorizedException('登录失败：用户名或密码错误');
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateUser(
    @Param() id: string,
    @Body() updateDto: UpdateUserDto,
  ): Promise<UpdateUserResult> {
    return this.usersService.updateUserById(id, updateDto);
  }

  @Delete(':id')
  deleteUser(@Param() id: number): Promise<any> {
    return this.usersService.deleteUserById(id);
  }
}
