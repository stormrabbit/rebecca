import { Controller, Get } from '@nestjs/common';
import { Users } from 'src/entities/Users';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  findAll(): Promise<Users[]> {
    return this.userService.findAll();
  }
}
