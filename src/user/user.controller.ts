import { Controller, Get } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
