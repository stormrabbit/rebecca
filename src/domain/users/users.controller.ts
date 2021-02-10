import { Controller, Get } from '@nestjs/common';
import { Users } from 'src/entities/Users';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('list')
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }
}
